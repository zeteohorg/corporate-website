<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS } from '$lib/config/top';
	import TopImage from './TopImage.svelte';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.astra);

	const rdImages = ['rd-hand-pose.webp', 'rd-3d-reconstruction.webp'];
</script>

<section
	id="astra"
	aria-labelledby="astra-heading"
	class="bg-z-dark dark:bg-z-bg text-z-on-dark z-section"
>
	<div class="z-container">
		<div class="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
			<div>
				<p class="z-eyebrow text-z-on-dark-accent">{t.eyebrow}</p>
				<h2 id="astra-heading" class="z-h2 mt-2 max-md:text-[24px]">{t.title}</h2>
				<p class="z-lead text-z-on-dark-sub mt-3 lg:mt-4">{t.lead}</p>
			</div>
			<TopImage
				name="astra-digitaltwin.webp"
				mobileName="astra-digitaltwin-sp.webp"
				alt={t.image.alt}
				width={560}
				height={340}
				dark
				class="h-[220px] w-full rounded-xl md:aspect-[1120/680] md:h-auto"
			/>
		</div>

		<ol class="mt-8 grid gap-3 lg:mt-10 lg:grid-cols-3 lg:gap-4">
			{#each t.values as value, i (value.title)}
				<li
					class="border-z-dark-border flex gap-3 rounded-[10px] border p-4 lg:flex-col lg:gap-0 lg:p-6"
				>
					<span
						class="font-z-mono text-z-on-dark-accent text-[14px] leading-[1.6] lg:text-[16px]"
						aria-hidden="true"
					>
						{String(i + 1).padStart(2, '0')}
					</span>
					<div class="lg:mt-3">
						<h3 class="text-[15px] leading-normal font-bold lg:text-[17px]">{value.title}</h3>
						<p class="text-z-on-dark-sub mt-1 text-[13px] leading-[1.6] lg:mt-2 lg:text-[14px]">
							{value.body}
						</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="mt-8 lg:mt-12">
			<p class="text-[14px] leading-[1.6] lg:text-[15px]">
				<strong class="block font-bold md:mr-3 md:inline">{t.rd.title}</strong>
				<span class="text-z-on-dark-sub">{t.rd.lead}</span>
			</p>
			<!-- Phone: horizontal scroll with the second card peeking in; tablet+: two columns -->
			<!-- Focusable so keyboard users can scroll it -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				role="region"
				aria-label={t.rd.title}
				tabindex="0"
				class="-mx-4 mt-3 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 pb-2 focus-visible:outline-2 focus-visible:outline-white md:mx-0 md:overflow-visible md:px-0 md:pb-0"
			>
				<ul class="flex gap-[10px] md:grid md:grid-cols-2 md:gap-4">
					{#each t.rd.items as item, i (item.caption)}
						<li class="w-[280px] shrink-0 snap-start md:w-auto">
							<figure>
								<TopImage
									name={rdImages[i]}
									alt={item.image.alt}
									width={560}
									height={315}
									dark
									class="h-[158px] w-full rounded-lg md:aspect-video md:h-auto"
								/>
								<figcaption
									class="text-z-on-dark-sub mt-2 text-[12px] leading-normal lg:text-[13px]"
								>
									{item.caption}
								</figcaption>
							</figure>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-6 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
			<p class="text-z-on-dark-caption text-[11px] leading-normal lg:text-[12px]">{t.note}</p>
			<a
				href={TOP_LINKS.poc}
				class="z-btn z-btn-primary w-full shrink-0 text-[16px] lg:w-auto"
				use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'astra' } }}
			>
				{t.cta}
			</a>
		</div>
	</div>
</section>
