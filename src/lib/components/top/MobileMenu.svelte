<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS, topHref } from '$lib/config/top';
	import { otherLanguage, otherLanguagePath } from '$lib/utils/language';
	import { mobileMenuOpen } from '$lib/stores/top';
	import Logo from '../Logo.svelte';

	let { onTopPage = false }: { onTopPage?: boolean } = $props();

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].top.nav);
	const href = (anchor: string) => topHref(lang, anchor, onTopPage);

	const INDUSTRIES = ['factory', 'construction', 'logistics'] as const;
	const industryLabels = $derived(translations[lang].common.nav.industries);

	let open = $state(false);
	let pendingAnchor: string | null = null;

	$effect(() => {
		mobileMenuOpen.set(open);
	});

	// In-page links: close first, then move once the scroll lock is released.
	function onLinkClick(event: MouseEvent) {
		const target = (event.currentTarget as HTMLAnchorElement).getAttribute('href') ?? '';
		if (target.startsWith('#')) {
			event.preventDefault();
			pendingAnchor = target;
		}
		open = false;
	}

	function onOpenChangeComplete(isOpen: boolean) {
		if (isOpen || !pendingAnchor) return;
		const anchor = pendingAnchor;
		pendingAnchor = null;
		document.querySelector(anchor)?.scrollIntoView();
		history.pushState(history.state, '', anchor);
	}

	const rowClass =
		'border-z-menu-divider flex items-center justify-between gap-3 border-b text-[16px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-z-accent';
</script>

<Dialog.Root bind:open {onOpenChangeComplete}>
	<Dialog.Trigger
		aria-label={t.openMenu}
		aria-controls="mobile-menu"
		class="border-z-border text-z-text focus-visible:outline-z-accent inline-flex size-11 items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2"
	>
		<Menu class="size-5" aria-hidden="true" />
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Content
			id="mobile-menu"
			class="bg-z-bg text-z-text fixed inset-0 z-[60] flex flex-col overflow-y-auto"
			aria-describedby={undefined}
		>
			<Dialog.Title class="sr-only">{t.menuTitle}</Dialog.Title>

			<div class="border-z-border flex h-16 shrink-0 items-center justify-between border-b px-4">
				<a href="/{lang}/" onclick={onLinkClick} class="flex items-center">
					<Logo />
				</a>
				<Dialog.Close
					aria-label={t.closeMenu}
					class="border-z-border focus-visible:outline-z-accent inline-flex size-11 items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<X class="size-5" aria-hidden="true" />
				</Dialog.Close>
			</div>

			<nav class="flex-1 px-4">
				<p class="text-z-text-caption pt-6 pb-1 text-[12px] font-bold">{t.products}</p>
				<ul>
					<li>
						<a
							href={href(TOP_LINKS.trails)}
							onclick={onLinkClick}
							class="{rowClass} h-14 font-bold"
						>
							<span class="text-[18px]">{t.trails}</span>
							<span class="text-z-text-sub text-[12px] font-normal">{t.trailsNote}</span>
						</a>
					</li>
					<li>
						<a href={href(TOP_LINKS.astra)} onclick={onLinkClick} class="{rowClass} h-14 font-bold">
							<span class="text-[18px]">{t.astra}</span>
							<span class="bg-z-accent rounded-full px-2 py-0.5 text-[11px] text-white">
								{t.astraBadge}
							</span>
						</a>
					</li>
				</ul>
				<p class="text-z-text-caption pt-6 pb-1 text-[12px] font-bold">{t.useCases}</p>
				<ul>
					{#each INDUSTRIES as industry (industry)}
						<li>
							<a href="/{lang}/industries/{industry}" onclick={onLinkClick} class="{rowClass} h-13">
								{industryLabels[industry]}
							</a>
						</li>
					{/each}
				</ul>
				<ul class="mt-4">
					<li>
						<a href="/{lang}/blog" onclick={onLinkClick} class="{rowClass} h-13">Blog</a>
					</li>
					<li>
						<a href="/{lang}/news" onclick={onLinkClick} class="{rowClass} h-13">News</a>
					</li>
					<li>
						<a href="/{lang}/company" onclick={onLinkClick} class="{rowClass} h-13"> Company </a>
					</li>
				</ul>
			</nav>

			<div
				class="bg-z-bg sticky bottom-0 shrink-0 px-4 pt-4"
				style="padding-bottom: calc(16px + env(safe-area-inset-bottom))"
			>
				<div class="mb-3 flex items-center gap-2 text-[14px]">
					<span class="border-z-text border-b-2 font-bold" aria-current="true">
						{lang === 'ja' ? '日本語' : 'EN'}
					</span>
					<span class="text-z-text-caption" aria-hidden="true">/</span>
					<a
						href={otherLanguagePath($page.url.pathname, lang, $page.data.alternateLang)}
						hreflang={otherLanguage(lang)}
						lang={otherLanguage(lang)}
						class="inline-flex min-h-11 items-center px-1"
						use:trackClick={{ name: TOP_EVENTS.langSwitch, props: { to: otherLanguage(lang) } }}
					>
						{lang === 'ja' ? 'EN' : '日本語'}
					</a>
				</div>
				<a
					href={href(TOP_LINKS.poc)}
					onclick={onLinkClick}
					class="z-btn z-btn-primary w-full text-[16px]"
					use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'menu' } }}
				>
					{translations[lang].top.hero.primary}
				</a>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
