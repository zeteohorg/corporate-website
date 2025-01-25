<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let lang = $derived($page.params.lang ?? 'en');
	let t = $derived(translations[lang as keyof typeof translations]);
</script>

<section id="use-cases" class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-bold">{t.home.useCases.title}</h2>
		<div class="grid gap-8 md:grid-cols-3">
			{#each t.home.useCases.items as useCase}
				<div class="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
					<h3 class="mb-4 text-xl font-semibold">{useCase.title}</h3>
					<p class="text-gray-600">{useCase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
