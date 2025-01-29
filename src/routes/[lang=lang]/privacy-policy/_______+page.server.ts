import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		lang: params.lang
	};
};

// Enable prerendering for this route
export const prerender = true;
