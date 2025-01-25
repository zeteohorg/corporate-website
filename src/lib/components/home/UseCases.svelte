<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let lang = $derived($page.params.lang ?? 'en');
	let t = $derived(translations[lang as keyof typeof translations]);
</script>

<section id="use-cases" class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-12">{t.home.useCases.title}</h2>
		<div class="grid md:grid-cols-3 gap-8">
			{#each t.home.useCases.items as useCase}
				<div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
					<h3 class="text-xl font-semibold mb-4">{useCase.title}</h3>
					<p class="text-gray-600">{useCase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
