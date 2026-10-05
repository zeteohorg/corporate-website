<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS } from '$lib/config/top';
	import HeroVisual from './HeroVisual.svelte';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.hero);
</script>

<section id="top" aria-labelledby="hero-heading" class="bg-z-bg text-z-text">
	<!-- One column on every width: eyebrow → title → subtitle → image → buttons -->
	<div class="z-container pt-6 pb-8 md:pt-12 lg:pt-[72px] lg:pb-12">
		<p class="z-eyebrow text-z-accent-text text-center">
			<span class="md:hidden">
				{t.awardLines[0]}<br />{t.awardLines[1]}
			</span>
			<span class="hidden md:inline">
				{t.award}<span class="mx-3 opacity-60" aria-hidden="true">｜</span>{t.launch}
			</span>
		</p>

		<h1 id="hero-heading" class="z-h1 mx-auto mt-3 max-w-[900px] text-center lg:mt-4">{t.title}</h1>

		<p
			class="text-z-text-sub mx-auto mt-4 max-w-[760px] text-center text-[15px] leading-[1.6] lg:mt-5 lg:text-[18px]"
		>
			{t.subtitle}
		</p>

		<HeroVisual
			backgroundAlt={t.background.alt}
			workerAlt={t.image.alt}
			class="mt-6 h-[240px] w-full rounded-xl md:h-[360px] lg:mt-8 lg:h-[440px]"
		/>

		<!-- Side by side from tablet up; stacked on phones, where two don't fit -->
		<div class="mt-6 flex flex-col gap-3 md:flex-row lg:mt-8 lg:justify-center">
			<a
				href={TOP_LINKS.poc}
				class="z-btn z-btn-primary text-[16px]"
				use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'hero' } }}
				data-hero-cta
			>
				{t.primary}
			</a>
			<a href={TOP_LINKS.trails} class="z-btn z-btn-secondary text-[16px]">
				{t.secondary}
			</a>
		</div>
	</div>
</section>
