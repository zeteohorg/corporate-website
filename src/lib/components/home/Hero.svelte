<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { buttonVariants } from '$lib/components/ui/button';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].home.hero);
</script>

<div class="relative">
	<!-- Top halo -->
	<div
		class="absolute left-1/2 top-[100px] -z-10 h-[100px] w-[100px] -translate-x-1/2 transform-gpu overflow-hidden blur-[96px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--destructive))] to-[hsl(var(--primary))] opacity-50"
		></div>
	</div>

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
					{t.learnMore}
					<span aria-hidden="true">→</span>
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

	<!-- Bottom halo -->
	<div
		class="absolute bottom-[300px] left-1/2 -z-10 h-[100px] w-[300px] -translate-x-1/2 transform-gpu overflow-hidden blur-[64px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--destructive))] opacity-50"
		></div>
	</div>
</div>
