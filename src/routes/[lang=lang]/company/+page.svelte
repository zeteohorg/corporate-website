<script lang="ts">
	import Hero from '$lib/components/team/Hero.svelte';
	import Team from '$lib/components/team/Team.svelte';
	import CompanyInfo from './CompanyInfo.svelte';
	export let data;
	const { translations: t } = data;
</script>

<div class="w-full">
	<Hero
		title={t.company.hero.title}
		subtitle={t.company.hero.subtitle}
		wearableTitle={t.company.hero.wearableTitle}
		wearableDescription={t.company.hero.wearableDescription}
	/>
	<Team translations={t.company.team} />
	<CompanyInfo />
</div>
