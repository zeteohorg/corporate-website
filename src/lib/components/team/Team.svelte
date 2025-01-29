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
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each translations.members as member}
				<Card class="overflow-hidden border-0 bg-transparent">
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
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>
