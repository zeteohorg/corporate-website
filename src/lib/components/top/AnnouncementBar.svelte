<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS, topHref } from '$lib/config/top';

	let { onTopPage = false }: { onTopPage?: boolean } = $props();

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.announcement);
</script>

<a
	href={topHref(lang, TOP_LINKS.poc, onTopPage)}
	class="bg-z-dark text-z-on-dark flex min-h-11 items-center justify-center gap-3 px-4 py-3 text-center font-bold focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
	use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'announcement' } }}
>
	<span
		class="bg-z-accent hidden shrink-0 rounded-full px-2.5 py-0.5 text-[14px] leading-normal text-white md:inline-block"
	>
		{t.badge}
	</span>
	<span class="hidden text-[14px] leading-normal md:inline">{t.full}</span>
	<span class="truncate text-[12px] leading-normal md:hidden">{t.short}</span>
</a>
