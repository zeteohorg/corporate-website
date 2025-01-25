import { loadMarkdownFiles } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';

	const [blogPosts, newsPosts] = await Promise.all([
		loadMarkdownFiles(`/blog/${lang}`),
		loadMarkdownFiles(`/news/${lang}`)
	]);

	return {
		blogPosts,
		newsPosts
	};
};
