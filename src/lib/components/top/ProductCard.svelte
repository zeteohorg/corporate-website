<script lang="ts">
	import type { ProductCopy } from '$lib/i18n/translations/top';
	import { cn } from '$lib/utils';
	import TopImage from './TopImage.svelte';

	let {
		product,
		image,
		href,
		featured = false
	}: {
		product: ProductCopy;
		/** File name in src/lib/assets/top/ */
		image: string;
		href: string;
		/** Astra: red frame and red status badge */
		featured?: boolean;
	} = $props();
</script>

<article
	class={cn(
		'bg-z-bg text-z-text flex h-full flex-col rounded-xl p-[18px] md:p-7',
		featured ? 'border-z-accent border-[1.5px]' : 'border-z-border border'
	)}
>
	<div class="flex items-center justify-between gap-3">
		<h3 class="text-[22px] leading-tight font-black md:text-[26px]">{product.name}</h3>
		<span
			class={cn(
				'shrink-0 rounded-full px-2.5 py-1 text-[11px] leading-none font-bold md:text-[12px]',
				featured ? 'bg-z-accent text-white' : 'bg-z-chip text-z-text'
			)}
		>
			{product.status}
		</span>
	</div>

	<TopImage
		name={image}
		alt={product.image.alt}
		width={540}
		height={200}
		class="mt-4 h-[140px] w-full rounded-lg md:mt-5 md:h-[200px]"
	/>

	<p class="mt-4 text-[15px] leading-normal font-bold md:mt-5 md:text-[17px]">{product.catch}</p>
	<p class="text-z-text-caption mt-2 text-[12px] leading-normal">{product.scale}</p>
	<p class="mt-3 text-[14px] leading-[1.6] md:text-[15px]">{product.records}</p>

	<ul class="mt-3 flex flex-wrap gap-2">
		{#each product.tags as tag (tag)}
			<li
				class="border-z-border-strong text-z-text-sub rounded border px-2 py-1 text-[12px] leading-normal"
			>
				{tag}
			</li>
		{/each}
	</ul>

	<a
		{href}
		class="focus-visible:outline-z-accent mt-auto inline-flex min-h-11 items-center self-start pt-5 text-[15px] font-bold hover:underline focus-visible:outline-2"
	>
		{product.link}
	</a>
</article>
