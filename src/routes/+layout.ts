import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { building } from '$app/environment';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = ({ url }) => {
	// Don't redirect for API routes or during prerendering of language-specific routes
	if (url.pathname.startsWith('/sitemap.xml') || (building && url.pathname.match(/^\/(en|ja)/))) {
		return {};
	}

	// If we're not at the root and not a language route, redirect to language version
	if (!url.pathname.match(/^\/(en|ja)/) && url.pathname !== '/') {
		const preferredLang = getPreferredLang();
		throw redirect(307, `/${preferredLang}${url.pathname}`);
	}

	// If we're at the root, redirect based on language preference
	if (url.pathname === '/') {
		const preferredLang = getPreferredLang();
		throw redirect(307, `/${preferredLang}${url.pathname}`);
	}

	return {};
};

function getPreferredLang(): string {
	if (!browser) return 'en';

	const storedLang = localStorage.getItem('preferredLanguage');
	if (storedLang === 'ja' || storedLang === 'en') {
		return storedLang;
	}

	const browserLang = navigator.language.split('-')[0];
	return browserLang === 'ja' ? 'ja' : 'en';
}
