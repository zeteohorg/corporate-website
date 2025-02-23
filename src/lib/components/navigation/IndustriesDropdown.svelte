<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Translation } from '$lib/i18n/types';
	import { page } from '$app/stores';

	// デフォルトの翻訳データ構造を完全に定義
	const defaultTranslations: Translation['common'] = {
		nav: {
			industries: {
				title: 'Industries',
				construction: 'Construction',
				logistics: 'Logistics',
				factory: 'Factory'
			},
			blog: 'Blog',
			news: 'News',
			company: 'Company',
			solutions: 'Solutions'
		},
		contact: {
			title: 'Contact',
			name: '',
			email: '',
			company: '',
			jobTitle: '',
			message: '',
			submit: '',
			success: '',
			required: '',
			inquiryType: {
				label: '',
				placeholder: '',
				options: {
					demo: '',
					vendor: '',
					other: ''
				}
			},
			errors: {
				required: '',
				invalidEmail: ''
			}
		},
		footer: {
			company: '',
			product: '',
			resources: '',
			legal: '',
			social: '',
			copyright: '',
			links: {
				about: '',
				careers: '',
				contact: '',
				pricing: '',
				features: '',
				documentation: '',
				blog: '',
				news: '',
				privacyPolicy: '',
				terms: ''
			}
		}
	};

	export let translations: Translation['common'] = defaultTranslations;
	let isOpen = false;

	$: safeTranslations = {
		...defaultTranslations,
		...(translations || {})
	};
</script>

<div class="relative" role="navigation" aria-label="Industries navigation">
	<button
		class="flex items-center gap-x-1 text-sm font-semibold leading-6"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
		aria-haspopup="true"
		aria-controls="industries-menu"
	>
		<span>{safeTranslations.nav.industries.title}</span>
		<svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#if isOpen}
		<nav
			id="industries-menu"
			class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4"
			transition:fade={{ duration: 100 }}
			onmouseleave={() => (isOpen = false)}
		>
			<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
				<ul class="relative grid gap-6 bg-background px-5 py-6 sm:gap-8 sm:p-8">
					<li>
						<a
							href="/{$page.params.lang}/industries/construction"
							class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-accent"
						>
							<div class="ml-4">
								<p class="text-base font-medium">
									{safeTranslations.nav.industries.construction}
								</p>
							</div>
						</a>
					</li>
					<li>
						<a
							href="/{$page.params.lang}/industries/factory"
							class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-accent"
						>
							<div class="ml-4">
								<p class="text-base font-medium">
									{safeTranslations.nav.industries.factory}
								</p>
							</div>
						</a>
					</li>
					<li>
						<a
							href="/{$page.params.lang}/industries/logistics"
							class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-accent"
						>
							<div class="ml-4">
								<p class="text-base font-medium">
									{safeTranslations.nav.industries.logistics}
								</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	{/if}
</div>
