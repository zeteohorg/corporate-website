// Waste-loss model — the visitor's own economics, kept independent of any
// technology cost model (§5). Pure function, no ¥ figures for competitors.

import type { Answers, PeopleBand, WasteLoss } from './types';

/** Representative tracked-people count per band. */
export const PEOPLE_N: Record<PeopleBand, number> = {
	lt20: 15,
	'20_100': 60,
	'100_500': 300,
	gt500: 700
};

const WASTE = { wage: 4_000_000, wastePct: 0.3, onFloorFactor: 0.55 };

const round = (n: number) => Math.round(n);

/** Annual waste-loss estimate: P × wage × 30% × on-floor factor (§3.3). */
export function computeWasteLoss(a: Answers): WasteLoss {
	const people = PEOPLE_N[a.people ?? '20_100'];
	const { wage, wastePct, onFloorFactor } = WASTE;
	return { people, annualLoss: round(people * wage * wastePct * onFloorFactor) };
}
