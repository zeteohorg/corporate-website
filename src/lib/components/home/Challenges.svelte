<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { Ban, DollarSign, Wrench } from 'lucide-svelte';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].challenges);

	const icons = [DollarSign, Wrench, Ban];
</script>

<section class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-4 text-2xl font-bold sm:text-3xl">{t.title}</h2>
			<p class="text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="mt-16 grid gap-8 md:grid-cols-3">
			{#each t.items as item, i}
				<div
					class="group bg-card relative rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md"
				>
					<div
						class="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
					>
						{#if i === 0}
							<DollarSign class="size-6" />
						{:else if i === 1}
							<Wrench class="size-6" />
						{:else}
							<Ban class="size-6" />
						{/if}
					</div>
					<h3 class="mb-2 text-xl font-semibold">{item.title}</h3>
					<p class="text-muted-foreground">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
