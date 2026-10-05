<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Download, Mail } from 'lucide-svelte';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { PRESS_LOGOS, PRESS_RELEASES, releaseDownloads } from '$lib/data/press';
	import { SITE_ORIGIN } from '$lib/origin';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].press);
	const canonicalUrl = $derived(`${SITE_ORIGIN}/${lang}/press/`);

	const DOWNLOAD_EVENT = 'Press Kit: Download';
	const releases = PRESS_RELEASES.map(releaseDownloads);

	const formatDate = (iso: string) => iso.replaceAll('-', '.');

	function formatSize(bytes: number) {
		if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
		return `${Math.max(1, Math.round(bytes / 1024))} KB`;
	}

	const fileName = (url: string) => url.split('/').pop() ?? url;
</script>

<svelte:head>
	<title>{t.meta.title} | Zeteoh</title>
	<meta name="description" content={t.meta.description} />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{SITE_ORIGIN}/og/og-default.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:url" content={canonicalUrl} />
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

{#snippet downloadLink(file: { url: string; size: number } | null, label: string, release: string)}
	{#if file}
		<a
			href={file.url}
			download={fileName(file.url)}
			class={buttonVariants({ variant: 'outline', class: 'h-auto min-h-11 justify-start' })}
			use:trackClick={{ name: DOWNLOAD_EVENT, props: { file: fileName(file.url), release } }}
		>
			<Download aria-hidden="true" />
			<span class="whitespace-normal">{label}</span>
			<span class="text-muted-foreground text-xs">{formatSize(file.size)}</span>
		</a>
	{:else}
		<span
			class={buttonVariants({
				variant: 'outline',
				class: 'text-muted-foreground pointer-events-none h-auto min-h-11 justify-start'
			})}
			aria-disabled="true"
		>
			<Download aria-hidden="true" />
			<span class="whitespace-normal">{label}</span>
			<span class="text-xs">{t.preparing}</span>
		</span>
	{/if}
{/snippet}

<div class="container mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-10 text-3xl font-bold sm:text-4xl">{t.title}</h1>

	<section aria-labelledby="press-releases" class="mb-14">
		<h2 id="press-releases" class="mb-6 text-2xl font-semibold">{t.releasesTitle}</h2>

		<div class="space-y-6">
			{#each releases as release (release.id)}
				{@const copy = t.releases[release.id]}
				<Card.Root>
					<Card.Header>
						<time datetime={release.date} class="text-muted-foreground text-sm">
							{formatDate(release.date)}
						</time>
						<h3 class="mt-1 text-lg leading-relaxed font-semibold">{copy.title}</h3>
					</Card.Header>
					<Card.Content class="space-y-6">
						<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							{@render downloadLink(release.pdf, t.pressRelease, release.id)}
							{@render downloadLink(release.zip, t.downloadAll, release.id)}
						</div>

						<ul class="grid gap-6 sm:grid-cols-2">
							{#each release.images as image, i (image.name)}
								<li class="space-y-3">
									<div class="bg-muted aspect-video overflow-hidden rounded-lg border">
										{#if image.file}
											<img
												src={image.thumb?.url ?? image.file.url}
												alt={copy.images[i]}
												width="800"
												height="450"
												loading="lazy"
												decoding="async"
												class="h-full w-full object-contain"
											/>
										{:else}
											<div
												class="text-muted-foreground flex h-full items-center justify-center text-sm"
											>
												{t.preparing}
											</div>
										{/if}
									</div>
									<p class="text-sm">{copy.images[i]}</p>
									{@render downloadLink(image.file, t.download, release.id)}
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<section aria-labelledby="press-logo" class="mb-14">
		<h2 id="press-logo" class="mb-6 text-2xl font-semibold">{t.logoTitle}</h2>
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each PRESS_LOGOS as logo (logo.key)}
				<li class="space-y-3">
					<div
						class="flex aspect-video items-center justify-center rounded-lg border p-8 {logo.key ===
						'white'
							? 'bg-neutral-900'
							: 'bg-white'}"
					>
						<img
							src={logo.src}
							alt={t.logos[logo.key]}
							width="736"
							height="206"
							loading="lazy"
							class="h-auto max-h-16 w-auto"
						/>
					</div>
					<a
						href={logo.src}
						download={logo.download}
						class={buttonVariants({ variant: 'outline', class: 'h-auto min-h-11 justify-start' })}
						use:trackClick={{
							name: DOWNLOAD_EVENT,
							props: { file: logo.download, release: 'logo' }
						}}
					>
						<Download aria-hidden="true" />
						<span class="whitespace-normal">{t.logos[logo.key]}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="press-company" class="mb-14">
		<h2 id="press-company" class="mb-6 text-2xl font-semibold">{t.companyTitle}</h2>
		<dl class="divide-y border-y">
			{#each t.company as row (row.label)}
				<div class="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
					<dt class="text-muted-foreground text-sm font-medium">{row.label}</dt>
					<dd class="whitespace-pre-line">{row.value}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section aria-labelledby="press-contact" class="mb-14">
		<h2 id="press-contact" class="mb-6 text-2xl font-semibold">{t.contactTitle}</h2>
		<p>{t.contact}</p>
		<p class="mt-2">
			<a
				href="mailto:{t.email}"
				class="text-primary inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline"
			>
				<Mail class="size-4" aria-hidden="true" />
				{t.email}
			</a>
		</p>
	</section>

	<p class="text-muted-foreground text-sm">{t.usage}</p>
</div>
