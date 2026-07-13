// Presentation helpers for the Solution Finder UI. Kept framework-free so they
// can be reused by the report and the (future) pillar page.

import type { Lang } from '$lib/data/solution-finder/types';

/** Human-readable JPY. JA uses 万/億 units; EN uses ¥…M. */
export function formatJpy(n: number, lang: Lang): string {
	if (lang === 'ja') {
		// Below ¥10,000 the 万 unit would round to nonsense (¥5,000 → 1万円).
		if (n < 10_000) return `${Math.round(n).toLocaleString('ja-JP')}円`;
		const man = Math.round(n / 10_000);
		if (man >= 10_000) {
			const oku = Math.floor(man / 10_000);
			const rest = man % 10_000;
			return rest ? `${oku}億${rest.toLocaleString('ja-JP')}万円` : `${oku}億円`;
		}
		return `${man.toLocaleString('ja-JP')}万円`;
	}
	if (n >= 1_000_000) return `¥${(n / 1_000_000).toFixed(1)}M`;
	return `¥${Math.round(n).toLocaleString('en-US')}`;
}

/** Low–high TCO range as a single string. */
export function formatRange(low: number, high: number, lang: Lang): string {
	const sep = lang === 'ja' ? '〜' : ' – ';
	return `${formatJpy(low, lang)}${sep}${formatJpy(high, lang)}`;
}

/** Replace {key} placeholders in an i18n string. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
