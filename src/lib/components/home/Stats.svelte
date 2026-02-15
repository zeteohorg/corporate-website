<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[currentLanguage].home.hero);
</script>

<section class="py-16 sm:py-20" style="background-color: #0a0a0a;">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
				{#each t.stats as stat}
					<div
						class="rounded-xl border border-white/10 p-6 text-center transition-all hover:border-white/20"
						style="background-color: #0a0a0a;"
					>
						<div class="mb-2 text-3xl font-bold sm:text-4xl {stat.colorClass ?? 'text-primary'}">
							{stat.value}
						</div>
						<p class="text-muted-foreground text-sm leading-relaxed">
							{stat.label}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
