<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';

	const switchLanguage = () => {
		const currentLang = $page.params.lang;
		const newLang = currentLang === 'ja' ? 'en' : 'ja';
		const path = $page.url.pathname.replace(/^\/(ja|en)/, '');
		window.location.href = `/${newLang}${path || ''}`;
	};
</script>

<header class="border-b">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<a href="/{$page.params.lang}" class="text-xl font-bold">YourCompany</a>
			<nav class="flex items-center space-x-4">
				<a href="/{$page.params.lang}/blog" class={buttonVariants({ variant: 'ghost' })}>Blog</a>
				<a href="/{$page.params.lang}/news" class={buttonVariants({ variant: 'ghost' })}>News</a>
				<a href="/{$page.params.lang}/company" class={buttonVariants({ variant: 'ghost' })}
					>Company</a
				>
				<ThemeToggle />
				<button on:click={switchLanguage} class={buttonVariants({ variant: 'outline' })}>
					{$page.params.lang === 'ja' ? 'EN' : '日本語'}
				</button>
			</nav>
		</div>
	</div>
</header>
