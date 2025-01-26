<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].howItWorks);
</script>

<section class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-16 text-center text-3xl font-bold sm:text-4xl">{t.title}</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="order-2 md:order-1">
				<div class="space-y-12">
					{#each t.steps as step, i}
						<div class="relative pl-9">
							<div
								class="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
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
				<picture>
					<source srcset="/images/how_it_works.webp" type="image/webp" />
					<img
						src="/images/how_it_works.png"
						alt="How TRAILS works"
						class="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
						width={800}
						height={600}
						loading="lazy"
						decoding="async"
					/>
				</picture>
			</div>
		</div>
	</div>
</section>
