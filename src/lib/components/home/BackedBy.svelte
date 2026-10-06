<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { topImageUrl } from '$lib/components/top/TopImage.svelte';

	const currentLanguage = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[currentLanguage].top.awards);

	// width is each image's width at height=100px, so the browser can reserve
	// layout space before the image loads (avoids CLS).
	const logos = [
		{
			name: 'Industrie 4.0',
			dark: '/images/supports/dark/industrie4.0_dark.webp',
			darkWidth: 276,
			light: '/images/supports/white/industrie4.0_white.webp',
			lightWidth: 276
		},
		{
			name: 'Deep Tech Pioneers',
			dark: '/images/supports/dark/Deep-Tech-Pioneers_dark.webp',
			darkWidth: 100,
			light: '/images/supports/white/Deep-Tech-Pioneers_white.webp',
			lightWidth: 100
		},
		{
			name: 'HEC CDL',
			dark: '/images/supports/dark/hec_cdl_dark.webp',
			darkWidth: 276,
			light: '/images/supports/white/hec_cdl.webp',
			lightWidth: 322
		},
		{
			name: 'Station F',
			dark: '/images/supports/dark/station_f_dark.webp',
			darkWidth: 276,
			light: '/images/supports/white/station_f_white.webp',
			lightWidth: 276
		},
		{
			name: 'Tokyo5G',
			dark: '/images/supports/dark/Tokyo5G_dark.webp',
			darkWidth: 276,
			light: '/images/supports/white/Tokyo5G_white.webp',
			lightWidth: 276
		}
	];

	// CEATEC AWARD logo (gold, works on light and dark backgrounds): one file in
	// src/lib/assets/top/, SVG preferred; transparent WebP or PNG also accepted.
	const ceatec = { name: 'CEATEC AWARD 2026' };
	const ceatecSrc =
		topImageUrl('logo-ceatec-award.svg') ??
		topImageUrl('logo-ceatec-award.webp') ??
		topImageUrl('logo-ceatec-award.png');
</script>

<section class="bg-z-bg-sub text-z-text py-10 lg:py-12">
	<div class="z-container">
		<h2 class="mb-6 text-center text-[16px] font-bold lg:text-[20px]">
			{t.title}
		</h2>
		<ul class="mx-auto grid max-w-[1192px] grid-cols-3 gap-2 lg:grid-cols-6">
			<li class="flex h-[53px] items-center justify-center px-2 lg:h-[67px]">
				{#if ceatecSrc}
					<img
						src={ceatecSrc}
						alt={ceatec.name}
						class="block h-full max-w-full object-contain"
						loading="lazy"
						decoding="async"
						width="160"
						height="56"
					/>
				{:else}
					<!-- TODO(images): placeholder until the CEATEC AWARD logo is added -->
					<span
						class="text-z-text-sub text-center text-[13px] leading-tight font-bold lg:text-[16px]"
					>
						{ceatec.name}
					</span>
				{/if}
			</li>
			{#each logos as logo (logo.name)}
				<li class="flex h-[53px] items-center justify-center px-2 lg:h-[67px]">
					<img
						src={logo.light}
						alt={logo.name}
						class="block h-full max-w-full object-contain opacity-80 transition-opacity hover:opacity-100 dark:hidden"
						loading="lazy"
						decoding="async"
						width={logo.lightWidth}
						height="100"
					/>
					<img
						src={logo.dark}
						alt={logo.name}
						class="hidden h-full max-w-full object-contain opacity-80 transition-opacity hover:opacity-100 dark:block"
						loading="lazy"
						decoding="async"
						width={logo.darkWidth}
						height="100"
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
