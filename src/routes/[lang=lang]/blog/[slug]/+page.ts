import { loadPost } from '$lib/utils/blog';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const csr = false;
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await loadPost(params.lang, params.slug);
		if (!post) {
			throw error(404, 'Post not found');
		}
		return {
			post,
			meta: {
				title: post.title,
				description: post.description
			}
		};
	} catch (e) {
		console.error('Error loading blog post:', e);
		throw error(500, 'Failed to load blog post');
	}
};
