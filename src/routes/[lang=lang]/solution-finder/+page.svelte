<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { trackEvent } from '$lib/analytics';
	import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-svelte';

	import ProgressBar from '$lib/components/solution-finder/ProgressBar.svelte';
	import QuestionStep from '$lib/components/solution-finder/QuestionStep.svelte';
	import VerdictCard from '$lib/components/solution-finder/VerdictCard.svelte';
	import NoFitCard from '$lib/components/solution-finder/NoFitCard.svelte';
	import WasteBanner from '$lib/components/solution-finder/WasteBanner.svelte';
	import LeadGate from '$lib/components/solution-finder/LeadGate.svelte';
	import SlidePack from '$lib/components/solution-finder/SlidePack.svelte';
	import { captureUtm, type Utm } from '$lib/components/solution-finder/attribution';
	import { interpolate } from '$lib/components/solution-finder/format';

	import {
		recommend,
		computeWasteLoss,
		activeSteps,
		isAnswered,
		type Answers,
		type Verdict,
		type WasteLoss
	} from '$lib/data/solution-finder';
	import type { QuestionDef } from '$lib/data/solution-finder/questions';

	let { data } = $props();
	const t = $derived(data.translations.solutionFinder);
	const lang = $derived(data.lang);

	type Phase = 'intro' | 'quiz' | 'result';
	let phase = $state<Phase>('intro');
	let answers = $state<Answers>({ targets: [], constraints: [] });
	let stepIndex = $state(0);
	let utm = $state<Utm>({});

	let verdict = $state<Verdict | null>(null);
	let wasteLoss = $state<WasteLoss | null>(null);
	let unlocked = $state(false);
	let deliveryFailed = $state(false);

	const steps = $derived(activeSteps(answers));
	const current = $derived(steps[Math.min(stepIndex, steps.length - 1)]);
	const entryPoint = $derived(utm.utm_source ?? 'direct');

	onMount(() => {
		utm = captureUtm();
	});

	// --- helpers -----------------------------------------------------------

	function stepValue(step: QuestionDef): string | string[] | undefined {
		if (step.id === 'privacyConcern') {
			return answers.privacyConcern === undefined
				? undefined
				: answers.privacyConcern
					? 'yes'
					: 'no';
		}
		return answers[step.id] as string | string[] | undefined;
	}

	function optionsFor(step: QuestionDef) {
		const q = t.questions[step.id];
		return step.options.map((value) => ({
			value,
			label: q.options[value],
			example: q.examples?.[value]
		}));
	}

	function trackStep(step: QuestionDef, answer: string) {
		trackEvent('Finder: Step', { step: String(step.id), answer });
	}

	// --- flow control ------------------------------------------------------

	function start() {
		phase = 'quiz';
		stepIndex = 0;
		trackEvent('Finder: Start', { entry_point: entryPoint });
	}

	function select(step: QuestionDef, value: string) {
		if (step.kind === 'multi') {
			toggleMulti(step, value);
			return;
		}
		if (step.id === 'privacyConcern') {
			answers.privacyConcern = value === 'yes';
		} else {
			(answers as unknown as Record<string, unknown>)[step.id] = value;
		}
		trackStep(step, value);
		// Tap-only fast flow: single-select auto-advances after brief feedback.
		setTimeout(next, 220);
	}

	function toggleMulti(step: QuestionDef, value: string) {
		const arr = ((answers as unknown as Record<string, unknown>)[step.id] as string[]) ?? [];
		let nextArr: string[];
		if (arr.includes(value)) {
			nextArr = arr.filter((v) => v !== value);
		} else if (step.id === 'constraints' && value === 'none') {
			nextArr = ['none']; // "none" is exclusive
		} else {
			nextArr = [...arr.filter((v) => v !== 'none'), value];
		}
		(answers as unknown as Record<string, unknown>)[step.id] = nextArr;
	}

	function canAdvance(): boolean {
		return current ? isAnswered(current, answers) : false;
	}

	function next() {
		if (stepIndex >= steps.length - 1) {
			finish();
			return;
		}
		stepIndex += 1;
	}

	function back() {
		if (stepIndex === 0) {
			phase = 'intro';
			return;
		}
		stepIndex -= 1;
	}

	function finish() {
		const v = recommend(answers);
		verdict = v;
		wasteLoss = computeWasteLoss(answers);
		phase = 'result';
		trackEvent('Finder: Verdict', { tech: v.primary.tech });
		trackEvent('Finder: Gate Viewed');
	}

	function restart() {
		answers = { targets: [], constraints: [] };
		stepIndex = 0;
		verdict = null;
		unlocked = false;
		deliveryFailed = false;
		phase = 'intro';
	}

	// Abandonment: fire once if the user leaves mid-quiz.
	$effect(() => {
		if (phase !== 'quiz') return;
		const handler = () => trackEvent('Finder: Abandoned', { last_step: String(current?.id ?? '') });
		window.addEventListener('beforeunload', handler);
		return () => window.removeEventListener('beforeunload', handler);
	});
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
</svelte:head>

<main class="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
	{#if phase === 'intro'}
		<div class="text-center">
			<span class="text-primary text-sm font-semibold tracking-wide uppercase"
				>{t.intro.eyebrow}</span
			>
			<h1 class="mt-3 text-3xl font-bold whitespace-pre-line sm:text-4xl lg:text-5xl">
				{t.intro.title}
			</h1>
			<p class="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg text-pretty">
				{t.intro.subtitle}
			</p>
			<div class="mt-8">
				<Button size="lg" class="min-h-[52px] px-10 text-lg" onclick={start}>
					{t.intro.start}
					<ArrowRight class="ml-2 size-5" />
				</Button>
				<p class="text-muted-foreground mt-3 text-sm">{t.intro.time}</p>
			</div>
		</div>
	{:else if phase === 'quiz' && current}
		<ProgressBar
			current={stepIndex + 1}
			total={steps.length}
			label={interpolate(t.progress.stepOf, { n: stepIndex + 1, m: steps.length })}
		/>

		<QuestionStep
			title={t.questions[current.id].title}
			hint={t.questions[current.id].hint}
			trustNote={t.questions[current.id].trustNote}
			options={optionsFor(current)}
			value={stepValue(current)}
			multi={current.kind === 'multi'}
			onselect={(v) => select(current, v)}
		/>

		<div class="mt-8 flex items-center justify-between">
			<Button variant="ghost" onclick={back}>
				<ArrowLeft class="mr-2 size-4" />
				{t.nav.back}
			</Button>

			<div class="flex items-center gap-2">
				{#if current.optional}
					<Button variant="ghost" onclick={next}>{t.nav.skip}</Button>
				{/if}
				<!-- Multi-select needs an explicit advance; single-select auto-advances. -->
				{#if current.kind === 'multi'}
					<Button onclick={next} disabled={!canAdvance()}>
						{stepIndex >= steps.length - 1 ? t.nav.seeResult : t.nav.next}
						<ArrowRight class="ml-2 size-4" />
					</Button>
				{/if}
			</div>
		</div>
	{:else if phase === 'result' && verdict && wasteLoss}
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold sm:text-3xl">{t.verdict.title}</h1>
			<Button variant="ghost" size="sm" onclick={restart}>
				<RotateCcw class="mr-2 size-4" />
				{t.nav.restart}
			</Button>
		</div>

		<div class="mt-6 space-y-8">
			{#if verdict.noFit}
				<NoFitCard {verdict} {t} />
			{:else}
				<VerdictCard {verdict} {t} {lang} />
			{/if}
			<WasteBanner
				annualLoss={wasteLoss.annualLoss}
				{lang}
				headline={t.waste.headline}
				note={t.waste.note}
			/>

			{#if unlocked}
				{#if deliveryFailed}
					<p
						class="border-destructive/40 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm"
						role="alert"
					>
						{t.gate.error}
					</p>
				{/if}
				<SlidePack {verdict} {answers} {wasteLoss} {t} {lang} />
			{:else}
				<LeadGate
					{t}
					{lang}
					{answers}
					{utm}
					recommendedTech={verdict.primary.tech}
					onunlock={(delivered) => {
						unlocked = true;
						deliveryFailed = !delivered;
					}}
				/>
				<div class="text-center">
					<a
						href="https://meetings-eu1.hubspot.com/satomi-le-guilly?utm_source=solution_finder&utm_medium=verdict&utm_campaign=solution_finder_hot"
						class="text-muted-foreground hover:text-foreground text-sm underline"
						onclick={() => trackEvent('Finder: Hot CTA', { tech: verdict?.primary.tech ?? '' })}
					>
						{t.verdict.hotCta}
					</a>
				</div>
			{/if}
		</div>
	{/if}
</main>
