<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { TOP_LINKS } from '$lib/config/top';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.evidence);
	const newsHref = $derived(`/${lang}/news/${TOP_LINKS.evidenceNewsSlug}/`);
</script>

<!-- Text only: the Central Japan Railway logo and Shinkansen photos must not be used -->
<section id="evidence" aria-labelledby="evidence-heading" class="bg-z-bg-sub text-z-text z-section">
	<div class="z-container">
		<p class="z-eyebrow text-z-accent-text">{t.eyebrow}</p>
		<h2 id="evidence-heading" class="z-h2 mt-2">{t.title}</h2>

		<div class="bg-z-dark text-z-on-dark mt-6 rounded-xl p-5 md:p-7 lg:mt-8">
			<p class="text-z-on-dark-sub text-[13px] leading-normal">{t.main.company}</p>
			<h3 class="mt-1 text-[16px] leading-normal font-bold md:text-[18px]">{t.main.result}</h3>
			<p class="text-z-on-dark-sub mt-2 flex flex-wrap items-center gap-x-4 text-[13px]">
				<span>{t.main.date}</span>
				<a
					href={newsHref}
					class="text-z-on-dark inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white"
				>
					→ {t.main.link}
				</a>
			</p>
		</div>

		<ul class="mt-4 grid gap-4 md:grid-cols-2">
			{#each t.items as item (item.label)}
				<li class="bg-z-bg border-z-border rounded-xl border p-5 md:p-6">
					<p class="text-z-text-caption text-[13px] leading-normal">{item.label}</p>
					<p class="mt-1 text-[15px] leading-[1.6]">{item.body}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
