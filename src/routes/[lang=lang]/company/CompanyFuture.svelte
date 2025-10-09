<script lang="ts">
	export let future: {
		title: string;
		description: string;
	};
</script>

<section class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-8 text-3xl font-bold sm:text-4xl">{future.title}</h2>
			<p class="text-lg leading-relaxed text-muted-foreground">{future.description}</p>
		</div>
	</div>
</section>