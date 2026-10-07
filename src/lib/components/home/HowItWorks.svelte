<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].howItWorks);
</script>

<section class="py-20">
	<div class="z-container">
		<h2 class="mb-16 text-center text-3xl font-bold sm:text-3xl">{t.title}</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="order-2 md:order-1">
				<div class="space-y-12">
					{#each t.steps as step, i}
						<div class="relative pl-9">
							<div
								class="bg-primary text-primary-foreground absolute top-0 left-0 flex size-6 items-center justify-center rounded-full text-sm font-bold"
							>
								{i + 1}
							</div>
							<h3 class="mb-2 text-xl font-semibold">{step.title}</h3>
							<p class="text-muted-foreground">{step.description}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="order-1 md:order-2">
				<img
					src="/images/how-it-works-v2.webp"
					alt={t.imageAlt}
					class="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
					width={1300}
					height={565}
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	</div>
</section>
