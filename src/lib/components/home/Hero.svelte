<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].home.hero);

	let isContentVisible = $state(false);
	let isMobile = $state(false);
	let observer: IntersectionObserver;
	let contentRef: HTMLDivElement;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isContentVisible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (contentRef && isMobile) {
			observer.observe(contentRef);
		} else {
			isContentVisible = true;
		}

		return () => {
			window.removeEventListener('resize', checkMobile);
			if (observer) {
				observer.disconnect();
			}
		};
	});

	function checkMobile() {
		isMobile = window.innerWidth < 640;
		if (!isMobile) {
			isContentVisible = true;
		}
	}
</script>

<div class="relative min-h-[100vh] sm:min-h-0">
	<!-- Top halo -->
	<div
		class="absolute left-1/2 -z-10 h-[100px] w-[100px] -translate-x-1/2 transform-gpu overflow-hidden blur-[96px] sm:top-[100px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--destructive))] to-[hsl(var(--primary))] opacity-50"
		></div>
	</div>

	<div
		class="container mx-auto px-4 py-12 sm:px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-32"
	>
		<!-- Hero Content -->
		<div
			class="mx-auto flex min-h-[80vh] max-w-2xl flex-col justify-center sm:min-h-0 lg:mx-0 lg:flex-auto"
		>
			<h1 class="mt-4 text-5xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
				{t.title}
			</h1>
			<p class="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
				{t.subtitle}
			</p>
			<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-x-6">
				<a
					href="https://meetings-eu1.hubspot.com/satomi-le-guilly"
					target="_blank"
					class={buttonVariants({ size: 'lg' })}
				>
					{t.getStarted}
				</a>
				<a
					href="/{currentLanguage}/learn-more"
					class="flex items-center justify-center text-sm font-semibold leading-6 sm:justify-start"
				>
					{t.learnMore}
					<span aria-hidden="true" class="ml-1">→</span>
				</a>
			</div>
		</div>

		<!-- Dashboard Image -->
		<div
			bind:this={contentRef}
			class="mt-12 lg:mt-0 lg:flex-shrink-0 lg:flex-grow {isMobile ? 'hidden' : ''}"
		>
			{#if isContentVisible}
				<div class="relative mx-auto max-w-[550px]" transition:fade={{ duration: 300 }}>
					<picture>
						<source
							media="(max-width: 639px)"
							srcset="/images/dashboard_hero.webp"
							type="image/webp"
						/>
						<source
							media="(max-width: 639px)"
							srcset="/images/dashboard_hero.png"
							type="image/png"
						/>
						<source
							media="(max-width: 1023px)"
							srcset="/images/dashboard_hero.webp"
							type="image/webp"
						/>
						<source
							media="(max-width: 1023px)"
							srcset="/images/dashboard_hero.png"
							type="image/png"
						/>
						<source srcset="/images/dashboard_hero.webp" type="image/webp" />
						<img
							src="/images/dashboard_hero.png"
							alt="Dashboard screenshot"
							width="1280"
							height="800"
							class="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[34.875rem]"
							loading="eager"
							decoding="async"
						/>
					</picture>
				</div>
			{/if}
		</div>
	</div>

	<!-- Bottom halo -->
	<div
		class="absolute bottom-[100px] left-1/2 -z-10 h-[100px] w-[300px] -translate-x-1/2 transform-gpu overflow-hidden blur-[64px] sm:bottom-[300px] {isMobile
			? 'hidden'
			: ''}"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--destructive))] opacity-50"
		></div>
	</div>
</div>
