import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeUnwrapImages from 'rehype-unwrap-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
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
			layout: {
				blog: 'src/lib/layouts/blog.svelte',
				news: 'src/lib/layouts/news.svelte'
			},
			frontmatter: {
				marker: '-',
				type: 'yaml'
			}
		})
	]
};

export default config;
