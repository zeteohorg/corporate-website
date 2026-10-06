<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackEvent } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS } from '$lib/config/top';
	import { cn } from '$lib/utils';
	import ProductCard from './ProductCard.svelte';
	import TopImage from './TopImage.svelte';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.products);

	const tabs = ['trails', 'astra'] as const;
	type Tab = (typeof tabs)[number];

	// Without JS (or before hydration) both cards are shown; tabs only appear once mounted.
	let enhanced = $state(false);
	let selected = $state<Tab>('trails');
	const tabEls: Record<Tab, HTMLButtonElement | undefined> = {
		trails: undefined,
		astra: undefined
	};

	onMount(() => {
		enhanced = true;
	});

	function select(tab: Tab) {
		if (tab === selected) return;
		selected = tab;
		trackEvent(TOP_EVENTS.productTab, { tab });
	}

	async function onKeydown(event: KeyboardEvent) {
		const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
		const edge =
			event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[tabs.length - 1] : null;
		if (!step && !edge) return;
		event.preventDefault();
		const next = edge ?? tabs[(tabs.indexOf(selected) + step + tabs.length) % tabs.length];
		select(next);
		await tick();
		tabEls[next]?.focus();
	}

	const cards = $derived([
		{
			key: 'trails' as const,
			product: t.trails,
			image: 'product-trails.webp',
			href: TOP_LINKS.trails
		},
		{ key: 'astra' as const, product: t.astra, image: 'product-astra.webp', href: TOP_LINKS.astra }
	]);
</script>

<section id="products" aria-labelledby="products-heading" class="bg-z-bg-sub text-z-text z-section">
	<div class="z-container">
		<div class="max-w-[760px]">
			<p class="z-eyebrow text-z-accent-text">{t.eyebrow}</p>
			<h2 id="products-heading" class="z-h2 mt-2">{t.title}</h2>
			<p class="z-lead text-z-text-sub mt-3 lg:mt-4">{t.lead}</p>
		</div>

		{#if enhanced}
			<!-- Phone & tablet only (spec「プロダクトのタブ」) -->
			<div
				role="tablist"
				aria-label={t.tabsLabel}
				tabindex="-1"
				class="bg-z-chip mt-6 grid grid-cols-2 gap-1 rounded-[10px] p-1 lg:hidden"
				onkeydown={onKeydown}
			>
				{#each cards as card (card.key)}
					<button
						bind:this={tabEls[card.key]}
						type="button"
						role="tab"
						id="product-tab-{card.key}"
						aria-selected={selected === card.key}
						aria-controls="product-panel-{card.key}"
						tabindex={selected === card.key ? 0 : -1}
						class={cn(
							'focus-visible:outline-z-accent min-h-11 rounded-lg text-[15px] font-bold focus-visible:outline-2',
							selected === card.key ? 'bg-z-bg text-z-text shadow-sm' : 'text-z-text-sub'
						)}
						onclick={() => select(card.key)}
					>
						{card.product.name}
					</button>
				{/each}
			</div>
		{/if}

		<!--
			With tabs, both panels share one grid cell so the area keeps the taller
			card's height and the content below doesn't jump when switching.
		-->
		<div
			class={cn(
				'mt-4 grid gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-6',
				enhanced && 'max-lg:[&>*]:col-start-1 max-lg:[&>*]:row-start-1'
			)}
		>
			{#each cards as card (card.key)}
				<div
					id="product-panel-{card.key}"
					role={enhanced ? 'tabpanel' : undefined}
					aria-labelledby={enhanced ? `product-tab-${card.key}` : undefined}
					class={cn(enhanced && selected !== card.key && 'max-lg:invisible')}
				>
					<ProductCard
						product={card.product}
						image={card.image}
						href={card.href}
						featured={card.key === 'astra'}
					/>
				</div>
			{/each}
		</div>

		<ul class="mt-6 grid grid-cols-2 gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-4">
			{#each t.scenes as scene (scene.key)}
				<li>
					<TopImage
						name="scene-{scene.key}.webp"
						alt={scene.label}
						width={400}
						height={300}
						class="h-24 w-full rounded-lg lg:h-[120px]"
					/>
					<p class="mt-2 text-center text-[13px] lg:text-[14px]" aria-hidden="true">
						{scene.label}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
