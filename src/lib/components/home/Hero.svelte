<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	let lang = $derived($page.params.lang ?? 'en');
	let t = $derived(translations[lang as keyof typeof translations]);
</script>

<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<h1 class="mb-6 text-center text-5xl font-bold">
			{t.home.hero.title}
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-center text-xl text-gray-600">
			{t.home.hero.subtitle}
		</p>
		<div class="text-center">
			<a
				href="#use-cases"
				class="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700"
			>
				{t.home.hero.cta}
			</a>
		</div>
	</div>
</section>
