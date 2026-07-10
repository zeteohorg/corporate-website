import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import {
	buildLeadFields,
	computeServer,
	reportEmailHtml,
	scoreLead,
	type Lead
} from '$lib/server/solution-finder';
import { translations } from '$lib/i18n/translations';
import type { Answers } from '$lib/data/solution-finder/types';

export const prerender = false;

// --- request validation -----------------------------------------------------

const answersSchema = z.object({
	facility: z.enum(['factory', 'warehouse', 'construction', 'hospital_office', 'other']).optional(),
	targets: z.array(z.enum(['workers', 'vehicles', 'tools', 'visitors'])).default([]),
	area: z.enum(['lt2000', '2000_10000', '10000_50000', 'gt50000']).optional(),
	people: z.enum(['lt20', '20_100', '100_500', 'gt500']).optional(),
	vehicles: z.enum(['lt5', '5_20', 'gt20']).optional(),
	accuracy: z.enum(['zone', '1_3m', '30cm']).optional(),
	constraints: z
		.array(z.enum(['metal', 'no_install', 'frequent_layout', 'multi_floor', 'harsh', 'none']))
		.default([]),
	floors: z.enum(['one', 'two', 'three_five', 'six_plus']).optional(),
	timeline: z.enum(['1mo', '3mo', '6mo_plus']).optional(),
	budget: z.enum(['lt1m', '1_5m', 'gt5m', 'undecided']).optional(),
	privacyConcern: z.boolean().optional()
});

const payloadSchema = z.object({
	lead: z.object({
		email: z.string().email(),
		name: z.string().min(1),
		phone: z.string().optional(),
		company: z.string().optional(),
		consent: z.literal(true),
		newsletter: z.boolean().optional()
	}),
	answers: answersSchema,
	utm: z.record(z.string(), z.string()).optional(),
	lang: z.enum(['en', 'ja'])
});

// --- external sinks ----------------------------------------------------------

/** EU/other data centers submit to api-<region>.hsforms.com; US (na1) uses api.hsforms.com. */
function hubspotHost(region: string): string {
	return region && region !== 'na1' && region !== 'us'
		? `https://api-${region}.hsforms.com`
		: 'https://api.hsforms.com';
}

async function toHubspot(
	fields: Record<string, string>,
	utm: Record<string, string>,
	portalId: string,
	formGuid: string,
	region: string,
	pageUri: string
): Promise<void> {
	const endpoint = `${hubspotHost(region)}/submissions/v3/integration/submit/${portalId}/${formGuid}`;
	const post = async (payload: Record<string, string>) => {
		const res = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				fields: Object.entries(payload).map(([name, value]) => ({ name, value })),
				context: { pageUri, pageName: 'Solution Finder' }
			})
		});
		return { ok: res.ok, status: res.status, text: res.ok ? '' : await res.text() };
	};

	const payload: Record<string, string> = { ...fields, ...utm };
	let r = await post(payload);

	// HubSpot rejects the whole submission if any field isn't on the form. If it
	// complains, drop the offending fields (never the email) and retry once so a
	// missing property doesn't lose the entire lead.
	if (!r.ok && r.status === 400) {
		const bad = Object.keys(payload).filter(
			(k) => k !== 'email' && (r.text.includes(`fields.${k}`) || r.text.includes(`'${k}'`))
		);
		if (bad.length) {
			for (const k of bad) delete payload[k];
			r = await post(payload);
		}
	}
	if (!r.ok) throw new Error(`HubSpot ${r.status}: ${r.text}`);
}

async function toNetlify(fields: Record<string, string>, origin: string): Promise<void> {
	const body = new URLSearchParams({ 'form-name': 'solution-finder', ...fields }).toString();
	const res = await fetch(`${origin}/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});
	if (!res.ok) throw new Error(`Netlify Forms ${res.status}`);
}

async function sendReportEmail(
	apiKey: string,
	from: string,
	to: string,
	subject: string,
	html: string
): Promise<void> {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ from, to, subject, html })
	});
	if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

// --- handler -----------------------------------------------------------------

export const POST: RequestHandler = async ({ request, url }) => {
	let parsed;
	try {
		parsed = payloadSchema.parse(await request.json());
	} catch {
		return json({ ok: false, error: 'invalid_payload' }, { status: 400 });
	}

	const { lead, answers, lang } = parsed;
	const utm = parsed.utm ?? {};
	const computed = computeServer(answers as Answers);
	const fields = buildLeadFields(lead as Lead, answers as Answers, computed, lang);
	const score = scoreLead(lead as Lead, answers as Answers);

	// 1 — capture the lead (HubSpot primary, Netlify Forms fallback).
	// Portal ID + form GUID are public (they appear in HubSpot's embed snippet),
	// so they ship as defaults; override via env if the form changes.
	// Portal ID + form GUID come from Netlify env vars — never hardcoded. Netlify
	// secrets scanning fails the build if an env-var value appears literally in
	// source, and reading via $env/dynamic/private keeps them out of the bundle.
	// Canonical submit host (api.hsforms.com) routes by portal ID for all regions;
	// set HUBSPOT_REGION only if HubSpot ever requires a regional host.
	const portalId = env.HUBSPOT_PORTAL_ID;
	const formGuid = env.HUBSPOT_FORM_GUID;
	const region = env.HUBSPOT_REGION || '';
	let captured = false;
	if (portalId && formGuid) {
		try {
			await toHubspot(fields, utm, portalId, formGuid, region, url.href);
			captured = true;
		} catch (err) {
			console.error('[solution-finder] HubSpot submit failed:', err);
		}
	}
	if (!captured) {
		try {
			await toNetlify({ ...fields, ...utm }, url.origin);
			captured = true;
		} catch (err) {
			console.error('[solution-finder] Netlify Forms fallback failed:', err);
		}
	}

	// 2 — email the report (best-effort; never blocks lead capture).
	let emailSent = false;
	if (env.RESEND_API_KEY) {
		try {
			// Strip wrapping quotes/whitespace — a common env-var paste mistake that
			// Resend rejects with a 422 "invalid from" error.
			const from = (env.REPORT_FROM_EMAIL || 'zeteoh <reports@zeteoh.com>')
				.trim()
				.replace(/^["']|["']$/g, '')
				.trim();
			const subject = translations[lang].solutionFinder.report.title;
			await sendReportEmail(
				env.RESEND_API_KEY,
				from,
				lead.email,
				subject,
				reportEmailHtml(answers as Answers, computed, lang)
			);
			emailSent = true;
		} catch (err) {
			console.error('[solution-finder] Resend email failed:', err);
		}
	}

	// Signal hot leads for the sales workflow (score ≥ 70, §7.2).
	if (score >= 70) console.info('[solution-finder] HOT lead', { email: lead.email, score });

	// Lead captured somewhere → success. If both sinks failed, 502 so the client
	// shows a retry (it still unlocks the on-screen report regardless).
	return json({ ok: captured, emailSent, score }, { status: captured ? 200 : 502 });
};
