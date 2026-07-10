<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackEvent } from '$lib/analytics';
	import { buttonVariants } from '$lib/components/ui/button';
	import { X } from 'lucide-svelte';

	const DISMISS_KEY = 'sf_card_dismissed_at';
	const SEEN_KEY = 'sf_card_seen';
	const DISMISS_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const t = $derived(translations[lang].solutionFinder.card);
	// Invitational, not interruptive — never on the finder itself.
	const onFinder = $derived($page.route.id?.includes('/solution-finder') ?? false);

	let visible = $state(false);

	onMount(() => {
		if (!browser) return;
		try {
			const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
			if (dismissedAt && Date.now() - dismissedAt < DISMISS_MS) return;
			if (sessionStorage.getItem(SEEN_KEY)) return;
		} catch {
			return;
		}

		let shown = false;
		const show = () => {
			if (shown || onFinder) return;
			shown = true;
			visible = true;
			try {
				sessionStorage.setItem(SEEN_KEY, '1');
			} catch {
				/* ignore */
			}
			trackEvent('Finder: Card Shown');
			cleanup();
		};

		// Trigger on 50% scroll depth, 45s dwell, or desktop exit-intent.
		const onScroll = () => {
			const doc = document.documentElement;
			const depth = (window.scrollY + window.innerHeight) / doc.scrollHeight;
			if (depth >= 0.5) show();
		};
		const onMouseOut = (e: MouseEvent) => {
			if (e.clientY <= 0) show();
		};
		const timer = setTimeout(show, 45_000);
		const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
		window.addEventListener('scroll', onScroll, { passive: true });
		if (isDesktop) document.addEventListener('mouseout', onMouseOut);

		function cleanup() {
			clearTimeout(timer);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('mouseout', onMouseOut);
		}
		return cleanup;
	});

	function dismiss() {
		visible = false;
		try {
			localStorage.setItem(DISMISS_KEY, String(Date.now()));
		} catch {
			/* ignore */
		}
		trackEvent('Finder: Card Dismissed');
	}
</script>

{#if visible && !onFinder}
	<div
		class="border-border bg-card motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-xl border p-5 shadow-lg"
		role="dialog"
		aria-label={t.heading}
	>
		<button
			type="button"
			onclick={dismiss}
			aria-label={t.dismiss}
			class="text-muted-foreground hover:text-foreground absolute top-3 right-3"
		>
			<X class="size-4" />
		</button>
		<h2 class="pr-6 text-base font-bold">{t.heading}</h2>
		<p class="text-muted-foreground mt-1 text-sm">{t.text}</p>
		<a
			href={`/${lang}/solution-finder/?utm_source=site&utm_medium=slidein&utm_campaign=slide_in_card`}
			class={`${buttonVariants({ size: 'sm' })} mt-4 w-full`}
			onclick={() => trackEvent('Finder: Card Clicked')}
		>
			{t.button}
		</a>
	</div>
{/if}
