import { compile } from 'mdsvex';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { content } = await request.json();

		const result = await compile(content, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
			extension: '.mdx'
		});

		if (!result) {
			throw new Error('Failed to compile MDX');
		}

		return json({
			html: result.code || '',
			components: Object.keys(result.data?.imports || {})
		});
	} catch (error) {
		console.error('Error processing MDX:', error);
		return json({ error: 'Failed to process MDX' }, { status: 500 });
	}
};
