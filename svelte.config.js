import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkCallout from '@r4ai/remark-callout';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: true,
			strict: true
		}),
		alias: {
			$lib: 'src/lib'
		},
		prerender: {
			entries: [
				'/',
				'/en',
				'/ja',
				'/en/blog/*',
				'/ja/blog/*',
				'/en/privacy-policy',
				'/ja/privacy-policy',
				'/en/company',
				'/ja/company',
				'/sitemap.xml',
				'/en/news/*',
				'/ja/news/*'
			],
			handleHttpError: ({ path, referrer, message }) => {
				if (path.startsWith('/images/')) return;
				console.warn(`${path} referred from ${referrer}: ${message}`);
			},
			handleMissingId: 'warn'
		}
	},
	extensions: ['.svelte', '.md', '.mdx'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.mdx'],
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
			remarkPlugins: [remarkGfm, [remarkCallout]],
			frontmatter: {
				type: 'yaml',
				marker: '-'
			}
		})
	]
};

export default config;
