import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { building } from '$app/environment';

export const prerender = true;
export const trailingSlash = 'always';

const KNOWN_LANGUAGES = ['en', 'ja'] as const;
type ValidLanguage = (typeof KNOWN_LANGUAGES)[number];

function isValidLanguage(lang: string): lang is ValidLanguage {
	return KNOWN_LANGUAGES.includes(lang as ValidLanguage);
}

export const load: LayoutLoad = ({ url }) => {
	// Don't redirect when building sitemap or prerendering known language routes
	if (url.pathname.startsWith('/sitemap.xml') || (building && url.pathname.match(/^\/(en|ja)/))) {
		return {};
	}

	// Skip redirect if we're already on a language route
	if (url.pathname.match(/^\/(en|ja)/)) {
		return {};
	}

	// Handle root path
	if (url.pathname === '/') {
		const preferredLang = getPreferredLang();
		throw redirect(307, `/${preferredLang}`);
	}

	// Redirect all other routes to preferred language
	const preferredLang = getPreferredLang();
	throw redirect(307, `/${preferredLang}${url.pathname}`);
};

function getPreferredLang(): ValidLanguage {
	if (!browser) return 'en';

	// Check for stored preference
	const storedLang = localStorage.getItem('preferredLanguage');
	if (storedLang && isValidLanguage(storedLang)) {
		return storedLang;
	}

	// Check browser languages
	const browserLangs = navigator.languages || [navigator.language];
	for (const lang of browserLangs) {
		const primaryLang = lang.split('-')[0].toLowerCase();
		if (primaryLang === 'ja') return 'ja';
	}

	// Default to English
	return 'en';
}
