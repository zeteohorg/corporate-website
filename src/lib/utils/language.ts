import { browser } from '$app/environment';

export function getPreferredLanguage(): 'en' | 'ja' {
	if (!browser) return 'en';

	// Check localStorage first
	const storedLang = localStorage.getItem('preferredLanguage');
	if (storedLang === 'ja' || storedLang === 'en') {
		return storedLang as 'en' | 'ja';
	}

	// Check browser languages
	const browserLangs = navigator.languages || [navigator.language];
	for (const lang of browserLangs) {
		const primaryLang = lang.split('-')[0].toLowerCase();
		if (primaryLang === 'ja') return 'ja';
	}

	return 'en';
}

/** The same page in the other language: /ja/blog/ ↔ /en/blog/ */
export function otherLanguage(lang: string): 'en' | 'ja' {
	return lang === 'ja' ? 'en' : 'ja';
}

/**
 * Language switch target. Blog/news posts don't always exist in both languages
 * (their page data carries `alternateLang: null` then), so those fall back to
 * the other language's listing page instead of a 404.
 */
export function otherLanguagePath(
	pathname: string,
	lang: string,
	alternateLang?: string | null
): string {
	const other = otherLanguage(lang);
	const rest = pathname.replace(/^\/(ja|en)/, '') || '/';
	const post = rest.match(/^\/(blog|news)\/[^/]+/);
	if (post && alternateLang === null) return `/${other}/${post[1]}/`;
	return `/${other}${rest}`;
}
