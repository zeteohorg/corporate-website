<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { VISION_CLOSING_VISIBLE } from '$lib/config/top';
	import { cn } from '$lib/utils';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.vision);
</script>

<!-- Dark section; in dark mode it matches the Astra block (#0A0A0A) -->
<section
	id="vision"
	aria-labelledby="vision-heading"
	class="bg-z-dark dark:bg-z-bg text-z-on-dark z-section"
>
	<div class="z-container">
		<div class="max-w-[820px]">
			<p class="z-eyebrow text-z-on-dark-accent">{t.eyebrow}</p>
			<h2 id="vision-heading" class="z-h2 mt-2">{t.title}</h2>
			<p class="z-lead text-z-on-dark-sub mt-3 lg:mt-4">{t.body}</p>
		</div>

		<!-- Steps flow left to right on PC (→) and top to bottom on phones (↓) -->
		<ol
			class="mt-8 flex flex-col items-stretch gap-2 lg:mt-10 lg:flex-row lg:items-stretch lg:gap-3"
		>
			{#each t.steps as step, i (step.title)}
				{#if i > 0}
					<li
						aria-hidden="true"
						class="text-z-on-dark-caption self-center text-[18px] leading-none"
					>
						<span class="lg:hidden">↓</span><span class="hidden lg:inline">→</span>
					</li>
				{/if}
				<li
					class={cn(
						'flex-1 rounded-[10px] p-5 lg:p-6',
						i === 0 ? 'bg-z-accent text-white' : 'border-z-dark-border border'
					)}
				>
					<h3 class="text-[16px] leading-normal font-bold lg:text-[18px]">{step.title}</h3>
					<p
						class={cn(
							'mt-1 text-[13px] leading-[1.6] lg:text-[14px]',
							i === 0 ? 'text-white' : 'text-z-on-dark-sub'
						)}
					>
						{step.body}
					</p>
				</li>
			{/each}
		</ol>

		{#if VISION_CLOSING_VISIBLE}
			<p class="mt-8 text-[15px] leading-[1.6] font-bold lg:mt-10 lg:text-[16px]">{t.closing}</p>
		{/if}
	</div>
</section>
