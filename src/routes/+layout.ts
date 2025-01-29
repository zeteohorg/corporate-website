import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

export const load: LayoutLoad = ({ url }) => {
	// Don't redirect for API routes
	if (url.pathname.startsWith('/sitemap.xml')) {
		return {};
	}

	// If we're not at the root, or we're handling a non-GET request, do nothing
	if (url.pathname !== '/') {
		return {};
	}

	// Determine preferred language
	let preferredLang = 'en';

	if (browser) {
		const storedLang = localStorage.getItem('preferredLanguage');
		if (storedLang === 'ja' || storedLang === 'en') {
			preferredLang = storedLang;
		} else {
			const browserLang = navigator.language.split('-')[0];
			preferredLang = browserLang === 'ja' ? 'ja' : 'en';
		}
	}

	// Redirect to the preferred language version
	throw redirect(307, `/${preferredLang}${url.pathname}`);
};
