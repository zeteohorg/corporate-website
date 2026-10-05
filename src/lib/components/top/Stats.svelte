<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const stats = $derived(translations[lang].top.stats);
</script>

<section
	aria-label={lang === 'ja' ? '数値' : 'Key figures'}
	class="bg-z-bg text-z-text pb-12 lg:pb-16"
>
	<ul class="z-container grid grid-cols-2 gap-2 md:gap-4">
		{#each stats as stat (stat.value)}
			<li class="border-z-border rounded-[10px] border p-[14px] md:p-6">
				<p class="font-z-mono text-[26px] leading-[1.2] font-medium lg:text-[40px]">{stat.value}</p>
				<p class="text-z-text-sub mt-2 text-[11px] leading-normal md:text-[14px] lg:mt-3">
					{stat.label}
				</p>
				{#if stat.note}
					<p class="text-z-text-caption mt-1 text-[11px] leading-normal md:text-[12px]">
						{stat.note}
					</p>
				{/if}
			</li>
		{/each}
	</ul>
</section>
