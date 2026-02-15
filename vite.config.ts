import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// Add optimizeDeps to handle mdsvex
	optimizeDeps: {
		exclude: ['mdsvex']
	},
	ssr: {
		noExternal: ['mdsvex']
	}
});
