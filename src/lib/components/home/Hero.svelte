<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].home.hero);
</script>

<div class="relative">
	{#if currentLanguage === 'en'}
		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[var(--primary)] to-[var(--destructive)] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>
	{/if}

	<div
		class="container mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40"
	>
		<div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
			<h1 class="mt-10 max-w-lg text-4xl font-bold tracking-tight sm:text-6xl">
				{t.title}
			</h1>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				{t.subtitle}
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				<a href="/{currentLanguage}/get-started" class={buttonVariants({ size: 'lg' })}>
					{t.getStarted}
				</a>
				<a href="/{currentLanguage}/learn-more" class="text-sm font-semibold leading-6">
					{t.learnMore} <span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
		<div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
			<picture>
				<source srcset="/images/dashboard_hero.webp" type="image/webp" />
				<img
					src="/images/dashboard_hero.png"
					alt="App screenshot"
					width="1920"
					height="1080"
					class="mx-auto w-[22.875rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[34.875rem]"
				/>
			</picture>
		</div>
	</div>

	{#if currentLanguage === 'en'}
		<div
			class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[var(--primary)] to-[var(--destructive)] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>
	{/if}
</div>
