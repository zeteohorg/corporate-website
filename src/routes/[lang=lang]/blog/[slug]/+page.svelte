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
				<Breadcrumb.Link href="/{currentLanguage}/blog">{t.blog.title}</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{data.metadata.title}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<article class="prose prose-slate mx-auto max-w-3xl">
		<h1>{data.metadata.title}</h1>
		<div class="mb-8 text-sm text-gray-500">
			Published on {new Date(data.metadata.date).toLocaleDateString()}
		</div>
		{@html data.html}
	</article>
</div>
