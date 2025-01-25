<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	interface Image {
		url: string;
		alt: string;
		caption?: string;
	}

	let { images } = $props<{ images: Image[] }>();
	let currentIndex = $state(0);
	let dialogOpen = $state(false);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function previous() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!dialogOpen) return;

		switch (event.key) {
			case 'ArrowRight':
				next();
				break;
			case 'ArrowLeft':
				previous();
				break;
			case 'Escape':
				dialogOpen = false;
				break;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="my-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
	{#each images as image, i}
		<button
			onclick={() => {
				currentIndex = i;
				dialogOpen = true;
			}}
			class="group relative aspect-square overflow-hidden rounded-lg bg-muted"
		>
			<img
				src={image.url}
				alt={image.alt}
				class="size-full object-cover transition-transform duration-300 group-hover:scale-110"
				loading="lazy"
			/>
		</button>
	{/each}
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="sm:max-w-3xl">
		<div class="relative aspect-video">
			<img
				src={images[currentIndex].url}
				alt={images[currentIndex].alt}
				class="size-full object-contain"
			/>

			<button
				onclick={() => (dialogOpen = false)}
				class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'absolute right-2 top-2')}
			>
				<X class="size-4" />
			</button>

			<button
				onclick={previous}
				class={cn(
					buttonVariants({ variant: 'ghost', size: 'icon' }),
					'absolute left-2 top-1/2 -translate-y-1/2'
				)}
			>
				<ChevronLeft class="size-4" />
			</button>

			<button
				onclick={next}
				class={cn(
					buttonVariants({ variant: 'ghost', size: 'icon' }),
					'absolute right-2 top-1/2 -translate-y-1/2'
				)}
			>
				<ChevronRight class="size-4" />
			</button>
		</div>

		{#if images[currentIndex].caption}
			<p class="mt-2 text-center text-sm text-muted-foreground">
				{images[currentIndex].caption}
			</p>
		{/if}
	</Dialog.Content>
</Dialog.Root>
