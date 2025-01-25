import { compile } from 'mdsvex';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { content } = await request.json();
		const result = await compile(content, {
			remarkPlugins: [],
			rehypePlugins: []
		});

		return json({ html: result?.code || '' });
	} catch (error) {
		console.error('Error processing MDX:', error);
		return json({ error: 'Failed to process MDX' }, { status: 500 });
	}
};
