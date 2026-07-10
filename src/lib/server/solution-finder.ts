// Server-side lead processing for the Solution Finder. Kept free of Kit/env
// imports so the mapping + email builder are unit-testable; the +server.ts
// endpoint owns the network calls (HubSpot, Netlify Forms, Resend) and secrets.

import { recommend, verdictTechs, computeTco, computeWasteLoss } from '$lib/data/solution-finder';
import type {
	Answers,
	Lang,
	TcoResult,
	TechId,
	Verdict,
	WasteLoss
} from '$lib/data/solution-finder/types';
import { translations } from '$lib/i18n/translations';
import { formatJpy, formatRange, interpolate } from '$lib/components/solution-finder/format';

export interface Lead {
	email: string;
	name: string;
	phone?: string;
	company?: string;
	consent: boolean;
	newsletter?: boolean;
}

export interface Computed {
	verdict: Verdict;
	tco: Partial<Record<TechId, TcoResult>>;
	wasteLoss: WasteLoss;
}

/** Re-run the engine server-side (never trust the client for CRM data). */
export function computeServer(answers: Answers): Computed {
	const verdict = recommend(answers);
	const tco: Partial<Record<TechId, TcoResult>> = {};
	for (const id of verdictTechs(verdict)) tco[id] = computeTco(id, answers);
	return { verdict, tco, wasteLoss: computeWasteLoss(answers) };
}

function tcoString(tco: Partial<Record<TechId, TcoResult>>, tech: TechId, lang: Lang): string {
	const r = tco[tech];
	if (!r || (r.quoteBased && r.total === 0)) return 'quote';
	return formatRange(r.low, r.high, lang);
}

/** Flat sf_* property set for HubSpot + the Netlify Forms fallback. */
export function buildLeadFields(
	lead: Lead,
	answers: Answers,
	c: Computed,
	lang: Lang
): Record<string, string> {
	return {
		email: lead.email,
		firstname: lead.name,
		phone: lead.phone ?? '',
		company: lead.company ?? '',
		sf_lang: lang,
		sf_vertical: answers.facility ?? '',
		sf_area_band: answers.area ?? '',
		sf_headcount_band: answers.people ?? '',
		sf_accuracy_need: answers.accuracy ?? '',
		sf_constraints: answers.constraints.filter((x) => x !== 'none').join(';'),
		sf_timeline: answers.timeline ?? '',
		sf_budget_band: answers.budget ?? '',
		sf_recommended_tech: c.verdict.primary.tech,
		sf_estimated_tco: tcoString(c.tco, c.verdict.primary.tech, lang),
		sf_privacy_concern:
			answers.privacyConcern === undefined ? '' : answers.privacyConcern ? 'yes' : 'no'
	};
}

/** Lead score (§7.2). Returned so the endpoint can flag hot leads. */
export function scoreLead(lead: Lead, answers: Answers): number {
	let score = 0;
	if (answers.timeline === '1mo' || answers.timeline === '3mo') score += 30;
	if (answers.budget === '1_5m' || answers.budget === 'gt5m') score += 20;
	if (answers.people === '100_500' || answers.people === 'gt500') score += 20;
	if (answers.facility === 'factory' || answers.facility === 'warehouse') score += 15;
	if (answers.accuracy === '1_3m') score += 15;
	const domain = lead.email.split('@')[1]?.toLowerCase() ?? '';
	const freeMail = /gmail|yahoo|icloud|outlook|hotmail|live|aol|docomo|au\.com|ezweb|softbank/.test(
		domain
	);
	if (!freeMail) score += 10;
	if (freeMail && !lead.company?.trim()) score -= 15;
	return score;
}

/** Bilingual HTML email with the recommendation + TCO summary + vendor list. */
export function reportEmailHtml(answers: Answers, c: Computed, lang: Lang): string {
	const t = translations[lang].solutionFinder;
	const name = (id: TechId) => t.tech[id]?.name ?? id;
	const techs = verdictTechs(c.verdict);

	const rows = techs
		.map((id) => {
			const r = c.tco[id];
			const cost = r && r.total ? formatRange(r.low, r.high, lang) : t.cost.quoteBased;
			return `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee">${name(id)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right">${cost}</td></tr>`;
		})
		.join('');

	const waste = interpolate(t.waste.headline, { amount: formatJpy(c.wasteLoss.annualLoss, lang) });

	return `<!doctype html><html><body style="font-family:system-ui,-apple-system,'Noto Sans JP',sans-serif;color:#1a1a1a;line-height:1.6">
	<div style="max-width:560px;margin:0 auto;padding:24px">
		<h1 style="font-size:20px">${t.report.title}</h1>
		<h2 style="font-size:16px;color:#ff3b3b">${name(c.verdict.primary.tech)}</h2>
		<p style="color:#555">${t.reasons[c.verdict.primary.reasonKey]}</p>
		<p style="background:#fff5f5;border:1px solid #ffd5d5;border-radius:8px;padding:12px;font-weight:600">${waste}</p>
		<h3 style="font-size:14px">${t.report.tcoHeading}</h3>
		<table style="width:100%;border-collapse:collapse;font-size:14px"><tbody>${rows}</tbody></table>
		<p style="font-size:12px;color:#888">${t.cost.disclaimer}</p>
		<p style="margin-top:24px"><a href="https://meetings-eu1.hubspot.com/satomi-le-guilly?utm_source=solution_finder&utm_medium=email" style="background:#ff3b3b;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">${t.report.pocCta}</a></p>
	</div>
	</body></html>`;
}
