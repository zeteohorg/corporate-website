<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[currentLanguage].home.backedBy);

	// width is derived from each image's actual aspect ratio at height=100px,
	// so the browser can reserve layout space before the image loads (avoids CLS).
	const rows = [
		[
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
			}
		],
		[
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
		]
	];
</script>

<section class="bg-white py-12 sm:py-16 dark:bg-[#0a0a0a]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="mb-10 text-center text-3xl font-bold sm:text-4xl">
			{t.title}
		</h2>
		<div class="flex flex-col items-center gap-10 sm:gap-12">
			{#each rows as row}
				<div class="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
					{#each row as logo}
						<img
							src={logo.light}
							alt={logo.name}
							class="block object-contain opacity-70 transition-opacity hover:opacity-100 dark:hidden"
							style="height: 100px"
							loading="lazy"
							decoding="async"
							width={logo.lightWidth}
							height="100"
						/>
						<img
							src={logo.dark}
							alt={logo.name}
							class="hidden object-contain opacity-70 transition-opacity hover:opacity-100 dark:block"
							style="height: 100px"
							loading="lazy"
							decoding="async"
							width={logo.darkWidth}
							height="100"
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
