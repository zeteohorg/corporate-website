import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Add optimizeDeps to handle mdsvex
	optimizeDeps: {
		exclude: ['mdsvex']
	},
	ssr: {
		noExternal: ['mdsvex']
	}
});
