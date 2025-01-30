import { compile } from 'mdsvex';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import remarkGfm from 'remark-gfm';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { content } = await request.json();

		const result = await compile(content, {
			remarkPlugins: [remarkGfm],
			extension: '.mdx'
		});

		return json({
			html: result?.code || '',
			components: Object.keys(result?.data?.imports || {})
		});
	} catch (error) {
		console.error('Error processing MDX:', error);
		return json({ error: 'Failed to process MDX' }, { status: 500 });
	}
};
