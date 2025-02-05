import { loadMarkdownFiles } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';

	try {
		const [blogPosts, newsPosts] = await Promise.all([
			loadMarkdownFiles(`blog/${lang}`), // Remove /src/content/ prefix
			loadMarkdownFiles(`news/${lang}`) // Remove /src/content/ prefix
		]);

		return {
			blogPosts: blogPosts || [],
			newsPosts: newsPosts || []
		};
	} catch (error) {
		console.error('[page.server.ts] Error loading posts:', error);
		return {
			blogPosts: [],
			newsPosts: []
		};
	}
};
