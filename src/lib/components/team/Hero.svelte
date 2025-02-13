<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let wearableTitle: string;
	export let wearableDescription: string;
</script>

<section
	class="relative flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-24"
	aria-label="Hero section"
>
	<!-- Gradient halo background effect -->
	<div
		class="absolute left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 transform-gpu overflow-hidden blur-[80px] sm:top-[100px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[48rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--destructive))] to-[hsl(var(--primary))] opacity-90"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-4xl space-y-8 text-center sm:space-y-12 md:space-y-16">
		<div>
			<h1
				class="mb-4 text-3xl font-bold leading-normal text-foreground sm:mb-6 sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl"
				data-sveltekit-preload-data
			>
				{title}
			</h1>
			<p
				class="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
				data-sveltekit-preload-data
			>
				{subtitle}
			</p>
		</div>

		<div class="space-y-4 sm:space-y-6">
			<h2 class="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
				{wearableTitle}
			</h2>
			<p class="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
				{wearableDescription}
			</p>
		</div>
	</div>
</section>
