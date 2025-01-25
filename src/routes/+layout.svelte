<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { getPreferredLanguage } from '$lib/utils/language';
	import { goto } from '$app/navigation';

	let { children } = $props();

	$effect(() => {
		if (browser && $page.url.pathname === '/') {
			const preferredLang = getPreferredLanguage();
			goto(`/${preferredLang}`);
		}
	});
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		{@render children?.()}
	</main>
</div>
