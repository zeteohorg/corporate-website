<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from './ThemeToggle.svelte';
	import { MobileNav } from './ui/mobile-nav';

	const switchLanguage = () => {
		const currentLang = $page.params.lang;
		const newLang = currentLang === 'ja' ? 'en' : 'ja';
		const path = $page.url.pathname.replace(/^\/(ja|en)/, '');
		window.location.href = `/${newLang}${path || ''}`;
	};
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<a href="/{$page.params.lang}" class="flex items-center space-x-2">
				<picture>
					{#if $theme === 'dark'}
						<source srcset="/images/kana-logo-white.webp" type="image/webp" />
						<img
							src="/images/kana-logo-white.png"
							alt="Kana"
							class="h-8 w-auto"
							height="32"
							width="100"
							loading="eager"
							decoding="async"
						/>
					{:else}
						<source srcset="/images/kana-logo-bl.webp" type="image/webp" />
						<img
							src="/images/kana-logo-bl.png"
							alt="Kana"
							class="h-8 w-auto"
							height="32"
							width="100"
							loading="eager"
							decoding="async"
						/>
					{/if}
				</picture>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden items-center space-x-4 lg:flex">
				<a href="/{$page.params.lang}/blog" class={buttonVariants({ variant: 'ghost' })}> Blog </a>
				<a href="/{$page.params.lang}/news" class={buttonVariants({ variant: 'ghost' })}> News </a>
				<a href="/{$page.params.lang}/company" class={buttonVariants({ variant: 'ghost' })}>
					Company
				</a>
				<ThemeToggle />
				<button on:click={switchLanguage} class={buttonVariants({ variant: 'outline' })}>
					{$page.params.lang === 'ja' ? 'EN' : '日本語'}
				</button>
			</nav>

			<!-- Mobile Navigation -->
			<div class="lg:hidden">
				<MobileNav />
			</div>
		</div>
	</div>
</header>
