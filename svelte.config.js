import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import adapter from '@sveltejs/adapter-netlify';
import { glob } from 'glob';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: true
		}),
		alias: {
			$lib: 'src/lib'
		},
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s from non-language routes that will be redirected
				if (message.includes('404') && !path.match(/^\/(en|ja)\//)) {
					return;
				}
				throw new Error(`${message} (${path})${referrer ? ` (linked from ${referrer})` : ''}`);
			},
			entries: ['/en', '/ja', '/en/privacy-policy', '/ja/privacy-policy', ...getBlogEntries()]
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

function getBlogEntries() {
	// Get all MDX files from the content directory
	const blogFiles = glob.sync('src/content/blog/**/*.mdx');

	// Transform file paths into route paths
	return blogFiles
		.map((file) => {
			// Extract language and slug from file path
			const match = file.match(/blog\/(en|ja)\/(.+)\.mdx$/);
			if (!match) return null;

			const [, lang, slug] = match;
			return `/${lang}/blog/${slug}`;
		})
		.filter(Boolean);
}

export default config;
