<script lang="ts" module>
	// Images for the top page live in src/lib/assets/top/ under the file names in
	// docs/spec.md「画像・アセット」. Until a file is added, a placeholder frame of the
	// same size is rendered, so dropping the file in is the only step needed.
	const files = import.meta.glob('/src/lib/assets/top/*.{webp,jpg,jpeg,png,svg}', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	export function topImageUrl(name: string): string | undefined {
		return files[`/src/lib/assets/top/${name}`];
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		name,
		alt,
		width,
		height,
		mobileName,
		eager = false,
		dark = false,
		class: className
	}: {
		/** File name in src/lib/assets/top/ */
		name: string;
		alt: string;
		/** Intrinsic display size (the files are 2x) */
		width: number;
		height: number;
		/** Optional differently-cropped file for < 768px */
		mobileName?: string;
		/** First-view image: no lazy loading, high fetch priority */
		eager?: boolean;
		/** Placeholder colours for dark sections */
		dark?: boolean;
		/** Sizing classes for the frame (height, radius, …) */
		class?: string;
	} = $props();

	const src = $derived(topImageUrl(name));
	const mobileSrc = $derived(mobileName ? topImageUrl(mobileName) : undefined);
</script>

{#if src}
	<picture
		class={cn('block overflow-hidden', dark ? 'bg-z-dark-surface' : 'bg-z-placeholder', className)}
	>
		{#if mobileSrc}
			<source media="(max-width: 767px)" srcset={mobileSrc} />
		{/if}
		<img
			{src}
			{alt}
			{width}
			{height}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
			decoding="async"
			class="h-full w-full object-cover"
		/>
	</picture>
{:else}
	<!-- TODO(images): placeholder until src/lib/assets/top/{name} is added -->
	<div
		role="img"
		aria-label={alt}
		data-missing-image={name}
		class={cn(
			'flex items-center justify-center border border-dashed p-4 text-center text-xs',
			dark
				? 'bg-z-dark-surface border-z-dark-border text-z-on-dark-caption'
				: 'bg-z-placeholder border-z-border-strong text-z-text-caption',
			className
		)}
	>
		<span aria-hidden="true">{alt}</span>
	</div>
{/if}
