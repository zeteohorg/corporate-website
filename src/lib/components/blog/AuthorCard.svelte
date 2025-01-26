<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Twitter, Github, Linkedin } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { Author } from '$lib/data/authors';

	let { author } = $props<{ author: Author }>();

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const bio = $derived(author.bio[currentLanguage as keyof typeof author.bio]);
	const title = $derived(author.title?.[currentLanguage as keyof typeof author.title]);
</script>

<Card.Root>
	<Card.Content class="flex gap-4 p-6">
		<img
			src={author.avatar}
			alt={author.name}
			class="size-16 rounded-full object-cover"
			width={64}
			height={64}
		/>
		<div class="flex-1">
			<div class="flex items-center justify-between">
				<div>
					<Card.Title>{author.name}</Card.Title>
					{#if title}
						<p class="mt-1 text-sm text-muted-foreground">{title}</p>
					{/if}
				</div>
				{#if author.social}
					<div class="flex gap-1">
						{#if author.social.twitter}
							<a
								href={author.social.twitter}
								target="_blank"
								rel="noopener noreferrer"
								class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-8')}
								aria-label="Twitter"
							>
								<Twitter class="size-4" />
							</a>
						{/if}
						{#if author.social.github}
							<a
								href={author.social.github}
								target="_blank"
								rel="noopener noreferrer"
								class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-8')}
								aria-label="GitHub"
							>
								<Github class="size-4" />
							</a>
						{/if}
						{#if author.social.linkedin}
							<a
								href={author.social.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-8')}
								aria-label="LinkedIn"
							>
								<Linkedin class="size-4" />
							</a>
						{/if}
					</div>
				{/if}
			</div>
			<Card.Description class="mt-2">
				{bio}
			</Card.Description>
		</div>
	</Card.Content>
</Card.Root>
