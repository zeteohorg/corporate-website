import type { PageLoad } from './$types';
import { translations } from '$lib/i18n/translations';
import type { Lang } from '$lib/data/solution-finder/types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const lang = params.lang as Lang;
	return { lang, translations: translations[lang] };
};
