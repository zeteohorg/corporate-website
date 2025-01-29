import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ['path', 'fs', 'module', 'util', 'buffer'],
			globals: {
				Buffer: true,
				global: true,
				process: true
			}
		})
	],
	optimizeDeps: {
		include: ['mdsvex', 'yaml', '@r4ai/remark-callout'],
		exclude: []
	},
	build: {
		target: 'esnext',
		assetsInlineLimit: 4096,
		rollupOptions: {
			output: {
				manualChunks: {
					'mdx-components': [
						'rehype-slug',
						'rehype-autolink-headings',
						'remark-gfm',
						'@r4ai/remark-callout'
					]
				}
			}
		}
	},
	server: {
		fs: {
			// Allow serving files from outside the project root
			allow: ['static', 'src/content']
		}
	},
	ssr: {
		noExternal: [
			'mdsvex',
			'remark-gfm',
			'rehype-slug',
			'rehype-autolink-headings',
			'@r4ai/remark-callout'
		]
	}
});
