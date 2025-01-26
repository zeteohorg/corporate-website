<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].product);
</script>

<section class="bg-gradient-to-b from-background to-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h2 class="whitespace-pre-line text-4xl font-bold tracking-tight lg:text-5xl">
					{t.title}
				</h2>
				<p class="mt-4 text-xl text-muted-foreground">
					{t.subtitle}
				</p>
				<p class="mt-6 whitespace-pre-line text-lg leading-8 text-muted-foreground">
					{t.description}
				</p>
			</div>
			<div class="relative">
				<picture>
					<source srcset="/images/dashboard_image.webp" type="image/webp" />
					<img
						src="/images/dashboard_image.png"
						alt="TRAILS Dashboard"
						class="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
						width={1000}
						height={600}
						loading="lazy"
						decoding="async"
					/>
				</picture>
			</div>
		</div>
	</div>
</section>
