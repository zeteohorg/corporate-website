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
