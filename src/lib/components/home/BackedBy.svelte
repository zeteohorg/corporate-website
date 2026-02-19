<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[currentLanguage].home.backedBy);

	const rows = [
		[
			{
				name: 'Industrie 4.0',
				dark: '/images/supports/dark/industrie4.0_dark.png',
				light: '/images/supports/white/industrie4.0_white.png'
			},
			{
				name: 'Deep Tech Pioneers',
				dark: '/images/supports/dark/Deep-Tech-Pioneers_dark.png',
				light: '/images/supports/white/Deep-Tech-Pioneers_white.png'
			},
			{
				name: 'HEC CDL',
				dark: '/images/supports/dark/hec_cdl_dark.png',
				light: '/images/supports/white/hec_cdl.png'
			}
		],
		[
			{
				name: 'Station F',
				dark: '/images/supports/dark/station_f_dark.png',
				light: '/images/supports/white/station_f_white.png',
			},
			{
				name: 'Tokyo5G',
				dark: '/images/supports/dark/Tokyo5G_dark.png',
				light: '/images/supports/white/Tokyo5G_white.png'
			},

		]
	];
</script>

<section class="py-12 sm:py-16 bg-white dark:bg-[#0a0a0a]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="mb-10 text-center text-3xl font-bold sm:text-4xl">
			{t.title}
		</h2>
		<div class="flex flex-col items-center gap-10 sm:gap-12">
			{#each rows as row}
				<div class="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
					{#each row as logo}
						{#if logo}
							<img
								src={$theme === 'dark' ? logo.dark : logo.light}
								alt={logo.name}
								style="height: {logo.height ?? 100}px"
								class="w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
								loading="lazy"
								decoding="async"
								height={logo.height ?? 100}
							/>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
