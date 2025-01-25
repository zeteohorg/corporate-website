// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// MDX module declarations
declare module '*.md' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}

declare module '*.mdx' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}

export {};
