<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">{t.common.nav.company}</h1>

	<div class="prose prose-slate max-w-none">
		{#if currentLanguage === 'en'}
			<p>Your company description in English</p>
			<!-- Add more English content -->
		{:else}
			<p>会社概要</p>
			<!-- Add more Japanese content -->
		{/if}
	</div>
</div>
