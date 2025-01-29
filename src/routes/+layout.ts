import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';
import { redirectToLanguage } from '$lib/utils/language';

export const prerender = true;
export const ssr = false;
export const csr = false;

export const load: LayoutLoad = ({ url }) => {
	// Don't redirect for API routes or sitemap
	if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/sitemap.xml')) {
		return {};
	}

	if (browser) {
		redirectToLanguage(url.pathname);
	}

	return {};
};
