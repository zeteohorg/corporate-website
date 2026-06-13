import { defineConfig } from 'vitest/config';

// Isolated config for fast unit tests of pure modules (no Svelte/Kit pipeline).
// Component/integration coverage lives in Playwright (`npm run test:integration`).
export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts']
	}
});
