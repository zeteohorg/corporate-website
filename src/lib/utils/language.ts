import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export type Language = 'en' | 'ja';

export function getPreferredLanguage(): Language {
	if (!browser) return 'en';

	const storedLang = localStorage.getItem('preferredLanguage');
	if (storedLang === 'ja' || storedLang === 'en') {
		return storedLang;
	}

	const browserLangs = navigator.languages || [navigator.language];
	for (const lang of browserLangs) {
		const primaryLang = lang.split('-')[0].toLowerCase();
		if (primaryLang === 'ja') return 'ja';
	}

	return 'en';
}

export function setLanguage(lang: Language) {
	if (browser) {
		localStorage.setItem('preferredLanguage', lang);
	}
}

export function redirectToLanguage(currentPath: string) {
	if (!browser) return;

	const lang = getPreferredLanguage();
	const currentLang = currentPath.split('/')[1];

	// Only redirect if we're at root or current language differs
	if (currentPath === '/' || (currentLang !== 'en' && currentLang !== 'ja')) {
		goto(`/${lang}${currentPath === '/' ? '' : currentPath}`);
	}
}
