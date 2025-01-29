import { loadMarkdownFiles } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';
	const posts = await loadMarkdownFiles('/blog/', lang);
	return { posts };
};
