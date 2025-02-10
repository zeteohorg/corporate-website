<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { CompanyTranslation } from '$lib/i18n/types';

	export let translations: CompanyTranslation['team'];
</script>

<section class="bg-background py-24 text-foreground">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center space-y-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
				{translations.title}
			</h2>
			<p class="mx-auto max-w-[700px] text-gray-100 md:text-base">
				{translations.subtitle}
			</p>
		</div>
		<div class="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6">
			{#each translations.members as member}
				<Card
					class="w-full overflow-hidden border-0 bg-transparent sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
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
							<h3 class="text-lg font-semibold">
								{member.name}
							</h3>
							<p class="mt-1 text-sm text-gray-400">
								{member.title}
							</p>
							<p class="mt-1 text-sm text-gray-400">
								{member.location}
							</p>
							<p class="mt-1 text-sm text-white">
								{member.background}
							</p>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>
