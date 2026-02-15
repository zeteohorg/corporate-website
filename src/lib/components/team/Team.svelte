<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { CompanyTranslation } from '$lib/i18n/types';
	export let translations: CompanyTranslation['team'];
</script>

<section class="dark:bg-background bg-violet-50 py-24">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center space-y-4 text-center">
			<h2 class="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
				{translations.title}
			</h2>
			<p class="text-muted-foreground mx-auto max-w-[700px] md:text-base">
				{translations.subtitle}
			</p>
		</div>

		<div class="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6">
			{#each translations.members as member}
				<Card
					class="bg-card w-full overflow-hidden border-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
				>
					<CardContent class="p-6">
						<div
							class="relative mx-auto mb-6 aspect-square h-48 w-48 overflow-hidden rounded-full bg-[#FF4E4E]"
						>
							<img
								src={member.image}
								alt={member.alt}
								class="h-full w-full object-cover"
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div class="text-center">
							<h3 class="text-foreground text-lg font-semibold">
								{member.name}
							</h3>
							<p class="text-muted-foreground mt-1 text-sm">
								{member.title}
							</p>
							<p class="text-muted-foreground mt-1 text-sm">
								{member.location}
							</p>
							<p class="text-foreground mt-1 text-sm">
								{member.background}
							</p>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>
