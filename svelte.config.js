import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: true
		  }),
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
			// Remove the layout configuration as we're handling it in the route
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
