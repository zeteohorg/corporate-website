<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { getPreferredLanguage } from '$lib/utils/language';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			if ($page.url.pathname === '/') {
				const preferredLang = getPreferredLanguage();
				goto(`/${preferredLang}`);
			}

			// Initialize theme
			if ($theme === 'dark') {
				document.documentElement.classList.add('dark');
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
