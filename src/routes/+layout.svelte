<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AnnouncementBar from '$lib/components/top/AnnouncementBar.svelte';
	import { isAnnouncementVisible } from '$lib/config/top';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { getPreferredLanguage } from '$lib/utils/language';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';

	let { children } = $props();

	const onTopPage = $derived($page.route.id === '/[lang=lang]');
	// Shared component; only the top page shows it for now (spec §1).
	const showAnnouncement = $derived(onTopPage && isAnnouncementVisible());

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
	{#if showAnnouncement}
		<AnnouncementBar {onTopPage} />
	{/if}
	<Header {onTopPage} />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
