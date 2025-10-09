<script lang="ts">
	import Hero from '$lib/components/team/Hero.svelte';
	import Team from '$lib/components/team/Team.svelte';
	import CompanyInfo from './CompanyInfo.svelte';
	import CompanySolution from './CompanySolution.svelte';
	import CompanyFuture from './CompanyFuture.svelte';
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
	<CompanySolution solutions={t.company.solution} />
	<CompanyFuture future={t.company.future} />
	<Team translations={t.company.team} />
	<CompanyInfo />
</div>
