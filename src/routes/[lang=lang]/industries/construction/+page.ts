import type { PageLoad } from './$types';
import { translations } from '$lib/i18n/translations';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const lang = params.lang;
	return {
		lang,
		translations: translations[lang]
	};
};
