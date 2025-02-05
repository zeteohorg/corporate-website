import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import adapter from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Don't fail build on 404s for language paths
				if (message.includes('404') && !path.match(/^\/(en|ja)/)) {
					return;
				}
				throw new Error(`${message} (${path})${referrer ? ` (linked from ${referrer})` : ''}`);
			},
			// Prerender all pages
			entries: ['*'],
			// Enable crawling for dynamic routes
			crawl: true,
			// Handle all routes as static
			handleMissingId: 'ignore'
		},
		alias: {
			$lib: 'src/lib'
		}
	},
	extensions: ['.svelte', '.md', '.mdx'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.mdx'],
			rehypePlugins: [rehypeSlug, rehypeUnwrapImages],
			remarkPlugins: [remarkToc],
			smartypants: {
				dashes: 'oldschool'
			},
			frontmatter: {
				marker: '-',
				type: 'yaml'
			}
		})
	]
};

export default config;
