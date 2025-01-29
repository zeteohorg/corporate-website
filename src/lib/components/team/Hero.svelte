<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let wearableTitle: string;
	export let wearableDescription: string;
</script>

<section
	class="relative flex h-[80vh] w-full flex-col items-center justify-center px-4 py-24 md:py-32"
	aria-label="Hero section"
>
	<!-- Gradient halo background effect -->
	<div
		class="absolute left-1/2 -z-10 h-[100px] w-[100px] -translate-x-1/2 transform-gpu overflow-hidden blur-[96px] sm:top-[100px]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[hsl(var(--destructive))] to-[hsl(var(--primary))] opacity-50"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-4xl space-y-16 text-center">
		<div>
			<h1
				class="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-5xl"
				data-sveltekit-preload-data
			>
				{title}
			</h1>
			<p
				class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200 md:text-base"
				data-sveltekit-preload-data
			>
				{subtitle}
			</p>
		</div>

		<div class="space-y-6">
			<h2 class="text-2xl font-semibold text-white md:text-3xl">
				{wearableTitle}
			</h2>
			<p class="mx-auto max-w-3xl text-base leading-relaxed text-gray-200">
				{wearableDescription}
			</p>
		</div>
	</div>
</section>
