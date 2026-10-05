<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	import IndustriesDropdown from './navigation/IndustriesDropdown.svelte';
	import ProductsDropdown from './navigation/ProductsDropdown.svelte';
	import MobileMenu from './top/MobileMenu.svelte';
	import Logo from './Logo.svelte';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS, topHref } from '$lib/config/top';
	import { otherLanguage, otherLanguagePath } from '$lib/utils/language';

	let { onTopPage = false }: { onTopPage?: boolean } = $props();

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang]);
	const nav = $derived(t.top.nav);
	const href = (anchor: string) => topHref(lang, anchor, onTopPage);
</script>

<header
	class="bg-z-bg/95 supports-backdrop-filter:bg-z-bg/80 border-z-border sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="z-container">
		<div class="flex h-16 items-center justify-between gap-3">
			<a href="/{lang}/" class="flex items-center">
				<Logo />
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden items-center gap-1 lg:flex">
				<ProductsDropdown
					label={nav.products}
					hint={nav.productsHint}
					items={[
						{ label: nav.trails, href: href(TOP_LINKS.trails) },
						{ label: nav.astra, href: href(TOP_LINKS.astra) }
					]}
				/>
				<IndustriesDropdown translations={t.common} />
				<a href="/{lang}/blog" class={buttonVariants({ variant: 'ghost' })}> Blog </a>
				<a href="/{lang}/news" class={buttonVariants({ variant: 'ghost' })}> News </a>
				<a href="/{lang}/company" class={buttonVariants({ variant: 'ghost' })}> Company </a>
				<ThemeToggle />
				<a
					href={otherLanguagePath($page.url.pathname, lang, $page.data.alternateLang)}
					hreflang={otherLanguage(lang)}
					lang={otherLanguage(lang)}
					class={buttonVariants({ variant: 'ghost' })}
					use:trackClick={{ name: TOP_EVENTS.langSwitch, props: { to: otherLanguage(lang) } }}
				>
					{nav.langSwitch}
				</a>
				<a
					href={href(TOP_LINKS.poc)}
					class="z-btn z-btn-primary ml-2 min-h-11 text-[14px]"
					use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'header' } }}
				>
					{nav.apply}
				</a>
			</nav>

			<!-- Mobile / tablet: apply button stays visible next to the menu button -->
			<div class="flex items-center gap-2 lg:hidden">
				<a
					href={href(TOP_LINKS.poc)}
					class="z-btn z-btn-primary min-h-11 px-4 text-[13px]"
					use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'header' } }}
				>
					{nav.applyShort}
				</a>
				<MobileMenu {onTopPage} />
			</div>
		</div>
	</div>
</header>
