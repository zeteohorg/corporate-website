<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu, ChevronDown } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { buttonVariants } from '$lib/components/ui/button';
	import ThemeToggle from '../../ThemeToggle.svelte';
	import { translations } from '$lib/i18n/translations';
	import { cn } from '$lib/utils';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(
		translations[currentLanguage]?.common?.nav ?? {
			blog: 'Blog',
			news: 'News',
			company: 'Company'
		}
	);

	const industries = ['factory'] as const;
	let industriesExpanded = $state(false);

	function switchLanguage() {
		const currentLang = $page.params.lang;
		const newLang = currentLang === 'ja' ? 'en' : 'ja';
		const path = $page.url.pathname.replace(/^\/(ja|en)/, '');
		window.location.href = `/${newLang}${path || ''}`;
	}
</script>

<div class="lg:hidden">
	<Sheet.Root>
		{#snippet trigger()}
			<span class={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label="Toggle menu">
				<Menu class="h-6 w-6" />
				<span class="sr-only">Open menu</span>
			</span>
		{/snippet}

		<Sheet.Trigger>
			{#key trigger}
				{@render trigger()}
			{/key}
		</Sheet.Trigger>

		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Menu</Sheet.Title>
			</Sheet.Header>

			<nav class="mt-4 flex flex-col space-y-4">
				<a
					href="/{currentLanguage}/"
					class={buttonVariants({ variant: 'ghost', class: 'w-full justify-start' })}
				>
					{t?.solutions || 'Solutions'}
				</a>

				<!-- Industries Section -->
				<div>
					<button
						onclick={() => (industriesExpanded = !industriesExpanded)}
						class={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-between')}
						aria-expanded={industriesExpanded}
					>
						<span>{t?.industries?.title || 'Use Cases'}</span>
						<ChevronDown
							class={cn('h-4 w-4 transition-transform', industriesExpanded && 'rotate-180')}
						/>
					</button>

					{#if industriesExpanded}
						<div class="mt-1 ml-4 space-y-1">
							{#each industries as industry}
								<a
									href="/{currentLanguage}/industries/{industry}"
									class={buttonVariants({
										variant: 'ghost',
										class: 'w-full justify-start text-sm'
									})}
								>
									{t?.industries?.[industry] || industry}
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<a
					href="/{currentLanguage}/blog"
					class={buttonVariants({ variant: 'ghost', class: 'w-full justify-start' })}
				>
					{t?.blog || 'Blog'}
				</a>
				<a
					href="/{currentLanguage}/news"
					class={buttonVariants({ variant: 'ghost', class: 'w-full justify-start' })}
				>
					{t?.news || 'News'}
				</a>
				<a
					href="/{currentLanguage}/company"
					class={buttonVariants({ variant: 'ghost', class: 'w-full justify-start' })}
				>
					{t?.company || 'Company'}
				</a>

				<div class="flex items-center space-x-4 pt-4">
					<ThemeToggle />
					<button onclick={switchLanguage} class={buttonVariants({ variant: 'outline' })}>
						{$page.params.lang === 'ja' ? 'EN' : '日本語'}
					</button>
				</div>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
</div>
