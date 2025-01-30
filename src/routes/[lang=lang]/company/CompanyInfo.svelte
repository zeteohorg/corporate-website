<script lang="ts">
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	const currentLanguage = $derived($page.params.lang ?? 'en');
	const t = $derived(translations[currentLanguage]);

	const infoItems = $derived([
		t.company.info.companyName,
		t.company.info.founded,
		t.company.info.capital,
		t.company.info.location,
		t.company.info.business
	]);
</script>

<div class="container mx-auto px-4 pb-24 pt-8">
	<Card class="mx-auto max-w-4xl bg-background">
		<CardHeader>
			<CardTitle class="text-center text-3xl font-bold">
				{t.company.info.title}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="grid gap-4 md:grid-cols-2">
				{#each infoItems as item}
					<div class="border-b border-border pb-4 last:border-0 last:pb-0">
						<div class="mb-1 font-medium text-foreground/80">
							{item.label}
						</div>
						<div class="whitespace-pre-line text-foreground">
							{item.value}
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>
</div>
