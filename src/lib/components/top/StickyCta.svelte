<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { trackClick } from '$lib/analytics';
	import { TOP_EVENTS, TOP_LINKS } from '$lib/config/top';
	import { mobileMenuOpen } from '$lib/stores/top';
	import { cn } from '$lib/utils';

	const lang = $derived(($page.params.lang ?? 'en') as keyof typeof translations);
	const label = $derived(translations[lang].top.hero.primary);

	// Shown on phones once the hero CTA has scrolled away, hidden again when the
	// PoC section is on screen or the menu is open (spec「固定CTAバー」).
	let heroCtaVisible = $state(true);
	let pocVisible = $state(false);
	const visible = $derived(!heroCtaVisible && !pocVisible && !$mobileMenuOpen);

	onMount(() => {
		const heroCta = document.querySelector('[data-hero-cta]');
		const poc = document.getElementById('poc');
		if (!heroCta || !poc) return;

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === heroCta) heroCtaVisible = entry.isIntersecting;
				if (entry.target === poc) pocVisible = entry.isIntersecting;
			}
		});
		observer.observe(heroCta);
		observer.observe(poc);
		return () => observer.disconnect();
	});

	// Keep the end of the page (footer) clear of the bar while it is shown
	$effect(() => {
		document.documentElement.classList.toggle('sticky-cta-visible', visible);
		return () => document.documentElement.classList.remove('sticky-cta-visible');
	});
</script>

<div
	class={cn(
		'bg-z-bg border-z-border fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-2.5 transition-transform duration-200 md:hidden',
		visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
	)}
	style="padding-bottom: calc(10px + env(safe-area-inset-bottom))"
	aria-hidden={!visible}
	inert={!visible}
>
	<a
		href={TOP_LINKS.poc}
		class="z-btn z-btn-primary w-full text-[16px]"
		use:trackClick={{ name: TOP_EVENTS.ctaClick, props: { location: 'sticky' } }}
	>
		{label}
	</a>
</div>
