import { describe, expect, it } from 'vitest';
import { computeWasteLoss } from './waste';
import { TRAILS_PRICING } from './pricing';
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

describe('computeWasteLoss', () => {
	it('computes P × wage × 30% × on-floor factor', () => {
		const w = computeWasteLoss(answers({ people: '100_500' }));
		// 300 people × ¥4M × 0.30 × 0.55 = ¥198,000,000
		expect(w.people).toBe(300);
		expect(w.annualLoss).toBe(198_000_000);
	});

	it('TRAILS pricing constants are the published figures', () => {
		expect(TRAILS_PRICING).toEqual({ setup: 500_000, perDeviceMo: 5_000, handset: 30_000 });
	});
});
