/**
 * Settings for the top page (/ja/, /en/) — docs/spec.md.
 * Values the client may change at or after launch live here, not in components.
 */

/** In-page link targets. Swap for sub-page URLs once those pages exist. */
export const TOP_LINKS = {
	poc: '#poc',
	trails: '#products',
	astra: '#astra',
	/** 東海旅客鉄道株式会社の検証のニュース記事 (slug; language prefix is added per page) */
	evidenceNewsSlug: '2026-06-09'
} as const;

/** Resolve an in-page anchor so it also works from other pages (e.g. `/ja/#poc`). */
export function topHref(lang: string, anchor: string, onTopPage: boolean): string {
	return onTopPage ? anchor : `/${lang}/${anchor}`;
}

/** お知らせバー (未確定事項 #13: 当面は表示し続ける) */
export const ANNOUNCEMENT = {
	enabled: true,
	/** ISO date-time; hide after this moment. null = no end. */
	endsAt: null as string | null
};

export function isAnnouncementVisible(now: Date = new Date()): boolean {
	if (!ANNOUNCEMENT.enabled) return false;
	return ANNOUNCEMENT.endsAt === null || now < new Date(ANNOUNCEMENT.endsAt);
}

/**
 * Plausible event names (spec「計測」). Follows the existing "Area: Action"
 * convention (e.g. 'CTA: Request Pilot', 'Contact Form: Submit').
 */
export const TOP_EVENTS = {
	/** props.location: announcement | header | hero | astra | menu | sticky */
	ctaClick: 'CTA: Apply PoC',
	/** props.tab: trails | astra */
	productTab: 'Product Tab: Switch',
	/** props.to: ja | en */
	langSwitch: 'Language: Switch'
} as const;

export type CtaLocation = 'announcement' | 'header' | 'hero' | 'astra' | 'menu' | 'sticky';

/** ビジョン締めの一文「現場で取得したデータは、お客様の資産です。」(未確定事項 #2) */
export const VISION_CLOSING_VISIBLE = true;

/**
 * News posts highlighted with a NEW label and red frame on the top page
 * (未確定事項 #13). Add the award news slug when it's published; the highlight
 * ends at `until` (ISO date-time) or never if null.
 */
export const NEWS_HIGHLIGHT = {
	/** CEATEC AWARD 2026 news (2026-10-06) */
	slugs: ['2026-10-06'] as string[],
	/** Until the end of October 2026 (JST), when press coverage has settled */
	until: '2026-11-01T00:00:00+09:00' as string | null
};

export function isHighlightedPost(slug: string, now: Date = new Date()): boolean {
	if (!NEWS_HIGHLIGHT.slugs.includes(slug)) return false;
	return NEWS_HIGHLIGHT.until === null || now < new Date(NEWS_HIGHLIGHT.until);
}
