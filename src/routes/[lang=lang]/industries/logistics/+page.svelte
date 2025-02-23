<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { MapPin } from 'lucide-svelte';

	export let data: PageData;
	const { translations, lang } = data;
	const logistics = translations.logistics;
</script>

<div
	class="relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
>
	<div class="absolute inset-0 -z-10 overflow-hidden">
		<svg
			class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="e813992c-7d03-4cc4-a2bd-151760b470a0"
					width="200"
					height="200"
					x="50%"
					y="-1"
					patternUnits="userSpaceOnUse"
				>
					<path d="M100 200V.5M.5 .5H200" fill="none" />
				</pattern>
			</defs>
			<svg x="50%" y="-1" class="overflow-visible fill-gray-50">
				<path
					d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
					stroke-width="0"
				/>
			</svg>
			<rect
				width="100%"
				height="100%"
				stroke-width="0"
				fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
			/>
		</svg>
	</div>
	<div
		class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
	>
		<div
			class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
		>
			<div class="lg:pr-4">
				<div class="lg:max-w-lg">
					<p class="text-base/7 font-semibold text-red-500">{logistics.title}</p>
					<h1 class="text-prett mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
						{logistics.subtitle}
					</h1>
					<p class="mt-6 text-base/8 text-muted-foreground">
						{logistics.challenges.text}
					</p>
				</div>
			</div>
		</div>
		<div
			class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
		>
			<img
				src="/images/usecase/logistics.webp"
				alt="Construction site overview"
				width="1024"
				height="576"
				class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
				loading="eager"
				decoding="async"
			/>
		</div>
		<div
			class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
		>
			<div class="lg:pr-4">
				<div class="max-w-xl text-base/7 lg:max-w-lg">
					<p>{logistics.challenges.title}：</p>
					<ul role="list" class="mt-8 space-y-8">
						{#each logistics.challenges.items as item}
							<li class="flex gap-x-3 text-muted-foreground">
								<MapPin size={20} strokeWidth={2.5} class="h-6 w-6 flex-shrink-0 text-red-500" />
								<span><strong class="font-semibold">{item.title}</strong> {item.description}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto px-4 py-12 md:px-6">
	<div class="container mx-auto px-4 md:px-6">
		<div class="mb-12 space-y-4 text-center">
			<h1 class="text-3xl font-bold tracking-tight">{logistics.solutions.title}</h1>
			<p class="mx-auto max-w-[900px] text-lg text-muted-foreground">
				{logistics.solutions.subtitle}
			</p>
		</div>
	</div>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each logistics.solutions.items as item}
			<Card.Root>
				<Card.Header>
					<Card.Title>
						<span class="text-2xl font-bold tracking-tight">{item.title}</span>
					</Card.Title>
					<Card.Description>
						<span class="inline-block pt-4 text-sm text-muted-foreground">{item.description}</span>
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
</div>
