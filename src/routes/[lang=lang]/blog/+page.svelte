<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { translations } from '$lib/i18n/translations';

	let { data } = $props<{ data: PageData }>();
	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
</script>

<div class="container mx-auto px-4 py-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{currentLanguage}">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{t.blog.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<h1 class="mb-8 text-4xl font-bold">{t.blog.title}</h1>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<a
				href="/{$page.params.lang}/blog/{post.slug}"
				class="block rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
			>
				<h2 class="mb-2 text-2xl font-semibold">{post.title}</h2>
				<p class="mb-4 text-gray-600">{post.description}</p>
				<time class="text-sm text-gray-500">
					{new Date(post.date).toLocaleDateString()}
				</time>
			</a>
		{/each}
	</div>
</div>
