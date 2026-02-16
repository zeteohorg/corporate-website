<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage].product);
</script>

<section class="from-background to-muted/50 bg-gradient-to-b py-20">
	<div class="container mx-auto px-4">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h2 class="text-4xl font-bold tracking-tight whitespace-pre-line lg:text-3xl">
					{t.title}
				</h2>
				<p class="text-muted-foreground mt-4 text-lg font-bold">
					{t.subtitle}
				</p>
				<p class="text-muted-foreground mt-6 text-base leading-8 whitespace-pre-line">
					{t.description}
				</p>
			</div>
			<div class="relative">
				<picture>
					<source srcset="/images/dashboard_image.webp" type="image/webp" />
					<img
						src="/images/dashboard_image.png"
						alt="TRAILS Dashboard"
						class="w-full ring-gray-400/10"
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
