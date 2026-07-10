import { describe, expect, it } from 'vitest';
import { computeTco, computeWasteLoss } from './cost';
import type { Answers } from './types';

function answers(overrides: Partial<Answers> = {}): Answers {
	return {
		facility: 'factory',
		targets: ['workers'],
		area: '10000_50000',
		people: '100_500',
		accuracy: '1_3m',
		constraints: [],
		timeline: '3mo',
		budget: '1_5m',
		...overrides
	};
}

describe('computeTco — ranges', () => {
	it('produces a −20% / +30% band around the total', () => {
		const r = computeTco('trails', answers());
		expect(r.low).toBe(Math.round(r.total * 0.8));
		expect(r.high).toBe(Math.round(r.total * 1.3));
		expect(r.total).toBe(r.capex + r.opex3yr);
	});

	it('TRAILS is dramatically cheaper CAPEX than UWB at scale', () => {
		const a = answers({ area: '10000_50000' });
		expect(computeTco('trails', a).capex).toBeLessThan(computeTco('uwb', a).capex);
	});
});

describe('computeTco — multi-floor multiplier', () => {
	it('multiplies fixed-infrastructure CAPEX by covered floors', () => {
		const single = answers();
		const multi = answers({ constraints: ['multi_floor'], floors: 'three_five' });
		const uwbSingle = computeTco('uwb', single).capex;
		const uwbMulti = computeTco('uwb', multi).capex;
		expect(uwbMulti).toBeGreaterThan(uwbSingle);
	});

	it('exempts TRAILS from the floor multiplier', () => {
		const single = answers();
		const multi = answers({ constraints: ['multi_floor'], floors: 'six_plus' });
		expect(computeTco('trails', multi).capex).toBe(computeTco('trails', single).capex);
	});
});

describe('computeTco — quote-based flags', () => {
	it('flags camera and visual SLAM as quote-based estimates', () => {
		expect(computeTco('camera', answers()).quoteBased).toBe(true);
		expect(computeTco('visual_slam', answers({ vehicles: '5_20' })).quoteBased).toBe(true);
	});
});

describe('computeWasteLoss', () => {
	it('computes P × wage × 30% × on-floor factor', () => {
		const w = computeWasteLoss(answers({ people: '100_500' }));
		// 300 people × ¥4M × 0.30 × 0.55 = ¥198,000,000
		expect(w.people).toBe(300);
		expect(w.annualLoss).toBe(198_000_000);
	});
});
