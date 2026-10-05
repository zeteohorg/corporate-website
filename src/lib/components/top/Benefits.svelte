<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.benefits);
</script>

<section aria-labelledby="benefits-heading" class="bg-z-bg text-z-text z-section">
	<div class="z-container">
		<p class="z-eyebrow text-z-accent-text">{t.eyebrow}</p>
		<h2 id="benefits-heading" class="z-h2 mt-2">{t.title}</h2>

		<ul class="mt-6 grid gap-6 md:grid-cols-3 md:gap-4 lg:mt-10">
			{#each t.items as item (item.title)}
				<li class="border-z-text border-t-[3px] pt-4 lg:pt-5">
					<h3 class="text-[16px] leading-normal font-bold lg:text-[18px]">{item.title}</h3>
					<p class="text-z-text-sub mt-2 text-[14px] leading-[1.6] lg:text-[15px]">{item.body}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
