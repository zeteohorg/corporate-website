// Server-side lead processing for the Solution Finder. Kept free of Kit/env
// imports so the mapping + email builder are unit-testable; the +server.ts
// endpoint owns the network calls (HubSpot, Netlify Forms, Resend) and secrets.

import { recommend, verdictTechs, computeWasteLoss, techById, TRAILS_PRICING } from '$lib/data/solution-finder';
import type { Answers, Lang, TechId, Verdict, WasteLoss } from '$lib/data/solution-finder/types';
import { translations } from '$lib/i18n/translations';
import { formatJpy, interpolate } from '$lib/components/solution-finder/format';

export interface Lead {
	email: string;
	name: string;
	phone?: string;
	company?: string;
	department?: string;
	consent: boolean;
	newsletter?: boolean;
}

export interface Computed {
	verdict: Verdict;
	wasteLoss: WasteLoss;
}

/** Re-run the engine server-side (never trust the client for CRM data). */
export function computeServer(answers: Answers): Computed {
	const verdict = recommend(answers);
	return { verdict, wasteLoss: computeWasteLoss(answers) };
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
		sf_device_availability: answers.device ?? '',
		sf_timeline: answers.timeline ?? '',
		sf_budget_band: answers.budget ?? '',
		sf_recommended_tech: c.verdict.primary.tech,
		sf_department_title: lead.department ?? ''
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
	// Poor TRAILS fit (no smartphone/tag carried) is a routing signal, not a
	// disqualifier — still worth a same-hour follow-up if everything else is hot.
	if (answers.device === 'tag_only' || answers.device === 'nothing') score -= 10;
	const domain = lead.email.split('@')[1]?.toLowerCase() ?? '';
	const freeMail = /gmail|yahoo|icloud|outlook|hotmail|live|aol|docomo|au\.com|ezweb|softbank/.test(
		domain
	);
	if (!freeMail) score += 10;
	if (freeMail && !lead.company?.trim()) score -= 15;
	return score;
}

/** Bilingual HTML email: verdict + honest exclusions + deployment profile +
 * waste banner + TRAILS pricing (champion mode only) + slide-pack + CTA. */
export function reportEmailHtml(answers: Answers, c: Computed, lang: Lang): string {
	const t = translations[lang].solutionFinder;
	const name = (id: TechId) => t.tech[id]?.name ?? id;
	const { verdict, wasteLoss } = c;

	const deployRow = (label: string, value: string) =>
		`<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${value}</td></tr>`;

	const meta = techById(verdict.primary.tech);
	const deployTable = meta
		? `<table style="width:100%;border-collapse:collapse;font-size:13px">${[
				deployRow(t.deploy.infra, t.deploy.values.infra[meta.infra]),
				deployRow(t.deploy.deployTime, t.deploy.values.deployTime[meta.deployTime]),
				deployRow(t.deploy.maintenance, t.deploy.values.maintenance[meta.maintenance]),
				deployRow(t.deploy.carrier, t.deploy.values.carrier[meta.carrier]),
				deployRow(t.deploy.infraCost, t.costTiers[meta.infraCost]),
				deployRow(t.deploy.hardwareCost, t.costTiers[meta.hardwareCost])
			].join('')}</tbody></table>`
		: '';

	const exclusionRows = verdict.excluded
		.map(
			(ex) =>
				`<li><span style="font-weight:600">${name(ex.tech)}</span> — ${t.reasons[ex.reasonKey]}</li>`
		)
		.join('');

	const waste = interpolate(t.waste.headline, { amount: formatJpy(wasteLoss.annualLoss, lang) });

	const pricingBlock = verdict.championMode
		? `<p style="background:#f5f8ff;border:1px solid #d5e0ff;border-radius:8px;padding:12px">
			<strong>${t.pricing.heading}</strong><br/>
			${t.pricing.setup}: ${formatJpy(TRAILS_PRICING.setup, lang)} ／ ${t.pricing.perDevice}: ${formatJpy(TRAILS_PRICING.perDeviceMo, lang)}<br/>
			<span style="font-size:12px;color:#888">${t.pricing.handsetNote}</span>
		</p>`
		: '';

	return `<!doctype html><html><body style="font-family:system-ui,-apple-system,'Noto Sans JP',sans-serif;color:#1a1a1a;line-height:1.6">
	<div style="max-width:560px;margin:0 auto;padding:24px">
		<h1 style="font-size:20px">${t.report.title}</h1>
		<h2 style="font-size:16px;color:#ff3b3b">${name(verdict.primary.tech)}</h2>
		<p style="color:#555">${t.reasons[verdict.primary.reasonKey]}</p>
		<p style="background:#fff5f5;border:1px solid #ffd5d5;border-radius:8px;padding:12px;font-weight:600">${waste}</p>
		${deployTable}
		${pricingBlock}
		${
			exclusionRows
				? `<h3 style="font-size:14px">${t.verdict.notRecommendedTitle}</h3><ul style="font-size:13px;color:#555">${exclusionRows}</ul>`
				: ''
		}
		<p style="font-size:13px;color:#555">${t.slides.attribution}</p>
		<p style="margin-top:24px"><a href="https://meetings-eu1.hubspot.com/satomi-le-guilly?utm_source=solution_finder&utm_medium=email" style="background:#ff3b3b;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">${t.report.pocCta}</a></p>
	</div>
	</body></html>`;
}
