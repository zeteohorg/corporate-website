<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import UseCases from '$lib/components/home/UseCases.svelte';
	import ContactForm from '$lib/components/home/ContactForm.svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/i18n/translations';

	const currentLanguage = $derived($page.params.lang);
	const t = $derived(translations[currentLanguage]);
</script>

<Hero />
<UseCases />
<ContactForm />
