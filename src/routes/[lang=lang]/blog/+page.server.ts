import { loadMarkdownFiles } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const posts = await loadMarkdownFiles(`/blog/${params.lang}`);
		return { posts };
	} catch (e) {
		console.error('Error loading blog posts:', e);
		throw error(404, 'Blog posts not found');
	}
};
