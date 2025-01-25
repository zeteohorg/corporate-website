import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createThemeStore() {
	const { subscribe, set } = writable(getInitialTheme());

	return {
		subscribe,
		toggle: () => {
			const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
			document.documentElement.classList.toggle('dark');
			if (browser) {
				localStorage.setItem('theme', newTheme);
			}
			set(newTheme);
		}
	};
}

function getInitialTheme(): string {
	if (!browser) return 'light';
	return (
		localStorage.getItem('theme') ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	);
}

export const theme = createThemeStore();
