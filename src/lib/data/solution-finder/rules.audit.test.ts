// Exhaustive enumeration audit (spec §9.2). Catches rigged-feeling or dead
// branches: never throws, every verdict has a primary, TRAILS share stays in
// a plausible band (neither suspiciously dominant nor suspiciously absent),
// and every non-GNSS tech is reachable somewhere in the answer space.

import { describe, expect, it } from 'vitest';
import { recommend } from './rules';
import { TECHS } from './tech';
import type { Accuracy, Answers, Constraint, DeviceAvailability, TechId, Timeline } from './types';

const ACCURACIES: Accuracy[] = ['zone', '1_3m', '30cm'];
const DEVICES: DeviceAvailability[] = ['company_phones', 'can_issue', 'tag_only', 'nothing'];
const TIMELINES: Timeline[] = ['1mo', '3mo', '6mo_plus'];
const AREAS: Answers['area'][] = ['lt2000', '2000_10000', '10000_50000', 'gt50000'];
const TARGET_SETS: Answers['targets'][] = [
	['workers'],
	['vehicles'],
	['tools'],
	['workers', 'vehicles']
];
const CONSTRAINT_SETS: Constraint[][] = [
	[],
	['metal'],
	['no_install'],
	['temporary'],
	['metal', 'multi_floor'],
	['temporary', 'metal'],
	['frequent_layout']
];

describe('exhaustive enumeration audit (spec §9.2)', () => {
	it('never throws, always returns ≥1 recommendation, and the distribution stays honest', () => {
		const primaryCounts = new Map<TechId, number>();
		const reachable = new Set<TechId>();
		let total = 0;
		let noFitCount = 0;

		for (const accuracy of ACCURACIES) {
			for (const device of DEVICES) {
				for (const timeline of TIMELINES) {
					for (const area of AREAS) {
						for (const targets of TARGET_SETS) {
							for (const constraints of CONSTRAINT_SETS) {
								const a: Answers = {
									facility: 'factory',
									targets,
									area,
									people: '20_100',
									vehicles: targets.includes('vehicles') ? '5_20' : undefined,
									accuracy,
									constraints,
									floors: constraints.includes('multi_floor') ? 'two' : undefined,
									device,
									timeline
								};
								total += 1;
								let v: ReturnType<typeof recommend>;
								expect(() => (v = recommend(a))).not.toThrow();
								v = recommend(a);
								expect(v.primary).toBeTruthy();
								primaryCounts.set(v.primary.tech, (primaryCounts.get(v.primary.tech) ?? 0) + 1);
								reachable.add(v.primary.tech);
								for (const alt of v.alternatives) reachable.add(alt.tech);
								for (const ex of v.excluded) reachable.add(ex.tech);
								if (v.noFit) noFitCount += 1;
							}
						}
					}
				}
			}
		}

		const distribution = Object.fromEntries(
			[...primaryCounts.entries()]
				.sort((a, b) => b[1] - a[1])
				.map(([tech, count]) => [tech, `${count} (${((count / total) * 100).toFixed(1)}%)`])
		);
		console.info('[solution-finder audit] total combinations:', total);
		console.info('[solution-finder audit] primary distribution:', distribution);
		console.info(
			'[solution-finder audit] no-fit rate:',
			`${noFitCount} (${((noFitCount / total) * 100).toFixed(1)}%)`
		);

		const trailsShare = (primaryCounts.get('trails') ?? 0) / total;
		expect(trailsShare).toBeGreaterThan(0.25);
		expect(trailsShare).toBeLessThan(0.6);

		for (const t of TECHS) {
			if (t.id === 'gnss') continue;
			expect(reachable.has(t.id), `${t.id} is never reachable as primary/alternative/exclusion`).toBe(
				true
			);
		}
	});
});
