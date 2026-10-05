<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.problem);
</script>

<section id="problem" aria-labelledby="problem-heading" class="bg-z-bg text-z-text z-section">
	<div class="z-container">
		<div class="max-w-[760px]">
			<p class="z-eyebrow text-z-accent-text">{t.eyebrow}</p>
			<h2 id="problem-heading" class="z-h2 mt-2">{t.title}</h2>
			<p class="z-lead text-z-text-sub mt-3 lg:mt-4">{t.lead}</p>
		</div>

		<!-- Light vs dark contrast is the point of this section: the eye goes to "not recorded" -->
		<div class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-4 lg:mt-8">
			<div class="bg-z-bg-sub rounded-[10px] p-[18px] md:p-7">
				<h3 class="text-[15px] leading-normal font-bold md:text-[17px]">{t.recorded.title}</h3>
				<ul
					class="text-z-text-sub mt-2 space-y-2 text-[14px] leading-[1.6] md:mt-3 md:space-y-3 md:text-[15px]"
				>
					{#each t.recorded.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<!-- In dark mode the two backgrounds are close, so a red frame keeps the emphasis -->
			<div
				class="bg-z-dark dark:border-z-accent rounded-[10px] p-[18px] md:p-7 dark:border-[1.5px]"
			>
				<h3 class="text-z-on-dark-accent text-[15px] leading-normal font-bold md:text-[17px]">
					{t.notRecorded.title}
				</h3>
				<ul
					class="text-z-on-dark mt-2 space-y-2 text-[14px] leading-[1.6] font-medium md:mt-3 md:space-y-3 md:text-[15px]"
				>
					{#each t.notRecorded.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>

		<p class="mt-6 text-[14px] leading-[1.6] font-bold md:text-[16px] lg:mt-8">{t.closing}</p>
	</div>
</section>
