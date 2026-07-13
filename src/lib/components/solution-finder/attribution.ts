// First-party UTM capture. We deliberately do NOT load the HubSpot tracking
// pixel (privacy positioning §12); instead we read UTM params from the landing
// URL client-side and forward them server-side with the lead.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = 'sf_utm';

/** Capture UTM params from the current URL, persisting the first-touch set. */
export function captureUtm(): Utm {
	if (typeof window === 'undefined') return {};
	const params = new URLSearchParams(window.location.search);
	const fromUrl: Utm = {};
	for (const k of UTM_KEYS) {
		const v = params.get(k);
		if (v) fromUrl[k] = v;
	}
	try {
		if (Object.keys(fromUrl).length > 0) {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
			return fromUrl;
		}
		const stored = sessionStorage.getItem(STORAGE_KEY);
		return stored ? (JSON.parse(stored) as Utm) : {};
	} catch {
		return fromUrl;
	}
}
