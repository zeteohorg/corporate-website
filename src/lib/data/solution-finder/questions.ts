// Question flow (§5.2). Structure only — every visible label lives in the
// `solutionFinder.questions.<id>` i18n namespace. Conditional steps (people /
// vehicle counts, floor count, privacy) declare a `visibleWhen` predicate; the
// UI walks `activeSteps()` so the progress bar counts only the steps shown.

import type { Answers } from './types';

export type QuestionKind = 'single' | 'multi';

export interface QuestionDef {
	/** Answer key on `Answers` this step writes to. */
	id: keyof Answers;
	kind: QuestionKind;
	/** Option value ids; labels resolved via i18n `questions.<id>.options.<value>`. */
	options: string[];
	visibleWhen?: (a: Answers) => boolean;
	/** Skippable (renders a "skip" affordance and never blocks progress). */
	optional?: boolean;
}

const hasWorkers = (a: Answers) => a.targets.includes('workers') || a.targets.includes('visitors');
const hasVehicles = (a: Answers) => a.targets.includes('vehicles');

export const STEPS: QuestionDef[] = [
	{
		id: 'facility',
		kind: 'single',
		options: ['factory', 'warehouse', 'construction', 'hospital_office', 'other']
	},
	{ id: 'targets', kind: 'multi', options: ['workers', 'vehicles', 'tools', 'visitors'] },
	{ id: 'area', kind: 'single', options: ['lt2000', '2000_10000', '10000_50000', 'gt50000'] },
	{
		id: 'people',
		kind: 'single',
		options: ['lt20', '20_100', '100_500', 'gt500'],
		visibleWhen: hasWorkers
	},
	{ id: 'vehicles', kind: 'single', options: ['lt5', '5_20', 'gt20'], visibleWhen: hasVehicles },
	{ id: 'accuracy', kind: 'single', options: ['zone', '1_3m', '30cm'] },
	{
		id: 'constraints',
		kind: 'multi',
		options: ['metal', 'no_install', 'frequent_layout', 'multi_floor', 'harsh', 'none']
	},
	{
		id: 'floors',
		kind: 'single',
		options: ['two', 'three_five', 'six_plus'],
		visibleWhen: (a) => a.constraints.includes('multi_floor')
	},
	{ id: 'timeline', kind: 'single', options: ['1mo', '3mo', '6mo_plus'] },
	{ id: 'budget', kind: 'single', options: ['lt1m', '1_5m', 'gt5m', 'undecided'] },
	{
		id: 'privacyConcern',
		kind: 'single',
		options: ['yes', 'no'],
		optional: true,
		visibleWhen: (a) => a.facility === 'factory' || a.facility === 'warehouse'
	}
];

/** The ordered steps currently applicable given the answers so far. */
export function activeSteps(a: Answers): QuestionDef[] {
	return STEPS.filter((s) => !s.visibleWhen || s.visibleWhen(a));
}

/** Whether a step has a usable answer (for the "next" gate). */
export function isAnswered(step: QuestionDef, a: Answers): boolean {
	if (step.optional) return true;
	const v = a[step.id];
	if (step.kind === 'multi') return Array.isArray(v) && v.length > 0;
	return v !== undefined && v !== null;
}
