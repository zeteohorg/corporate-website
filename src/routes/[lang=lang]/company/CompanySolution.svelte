<script lang="ts">
	export let solutions: {
		title: string;
		subtitle: string;
		features: Array<{
			title: string;
			description: string;
		}>;
	};
</script>

<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-4 text-3xl font-bold sm:text-4xl">{solutions.title}</h2>
			<p class="mb-12 text-lg text-muted-foreground">{solutions.subtitle}</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each solutions.features as feature}
				<div class="rounded-lg bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
					<h3 class="mb-4 text-xl font-semibold text-card-foreground">{feature.title}</h3>
					<p class="text-muted-foreground">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>