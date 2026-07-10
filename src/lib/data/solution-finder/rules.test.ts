import { describe, expect, it } from 'vitest';
import { recommend } from './rules';
import type { Answers } from './types';

/** Build a complete answer set with sensible defaults, overridable per test. */
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

describe('recommend — honesty mechanic', () => {
	it('cm-level requirement → UWB, and TRAILS is explicitly excluded', () => {
		const v = recommend(answers({ accuracy: '30cm' }));
		expect(v.primary.tech).toBe('uwb');
		expect(v.championMode).toBe(false);
		expect(v.excluded.map((e) => e.tech)).toContain('trails');
		expect(v.excluded.find((e) => e.tech === 'trails')?.reasonKey).toBe('trailsNotCmLevel');
	});

	it('cm-level in a small, low-budget site → BLE-AoA instead of UWB', () => {
		const v = recommend(answers({ accuracy: '30cm', budget: 'lt1m', area: 'lt2000' }));
		expect(v.primary.tech).toBe('ble_aoa');
		expect(v.excluded.map((e) => e.tech)).toContain('trails');
	});
});

describe('recommend — TRAILS-winning branches', () => {
	it('工事NG / no-install constraint → TRAILS', () => {
		const v = recommend(answers({ constraints: ['no_install'] }));
		expect(v.primary.tech).toBe('trails');
		expect(v.primary.reasonKey).toBe('noInstallTrails');
		expect(v.championMode).toBe(true);
	});

	it('sub-1-month timeline → TRAILS', () => {
		const v = recommend(answers({ timeline: '1mo' }));
		expect(v.primary.tech).toBe('trails');
	});

	it('metal-heavy environment at 1–3 m → TRAILS (RF degradation)', () => {
		const v = recommend(answers({ constraints: ['metal'], accuracy: '1_3m' }));
		expect(v.primary.tech).toBe('trails');
		expect(v.primary.reasonKey).toBe('metalDegradesRssi');
	});
});

describe('recommend — zone / materials branches', () => {
	it('zone-level, low budget, materials only → QR/NFC, TRAILS overkill', () => {
		const v = recommend(answers({ accuracy: 'zone', budget: 'lt1m', targets: ['tools'] }));
		expect(v.primary.tech).toBe('qr_nfc');
		expect(v.excluded.map((e) => e.tech)).toContain('trails');
	});

	it('tools-only (untagged things) → BLE tags', () => {
		const v = recommend(answers({ targets: ['tools'], accuracy: '1_3m' }));
		expect(v.primary.tech).toBe('ble_rssi');
	});
});

describe('recommend — vehicle branch (§5.3a)', () => {
	it('vehicles only at 1–3 m → TRAILS in vehicle', () => {
		const v = recommend(answers({ targets: ['vehicles'], vehicles: '5_20', accuracy: '1_3m' }));
		expect(v.primary.tech).toBe('trails');
		expect(v.isVehicleBranch).toBe(true);
	});

	it('vehicles only at cm-level → vehicle-mounted Visual SLAM', () => {
		const v = recommend(answers({ targets: ['vehicles'], vehicles: '5_20', accuracy: '30cm' }));
		expect(v.primary.tech).toBe('visual_slam');
		expect(v.isVehicleBranch).toBe(true);
	});

	it('people + vehicles → hybrid verdict', () => {
		const v = recommend(
			answers({ targets: ['workers', 'vehicles'], vehicles: '5_20', accuracy: '1_3m' })
		);
		expect(v.isHybrid).toBe(true);
		expect(v.primary.tech).toBe('trails');
	});
});

describe('recommend — multi-floor', () => {
	it('multi-floor structure sets the floor note', () => {
		const v = recommend(answers({ constraints: ['multi_floor'], floors: 'three_five' }));
		expect(v.floorNote).toBe(true);
	});
});

describe('recommend — shape guarantees', () => {
	it('always returns a primary and at most two alternatives', () => {
		const v = recommend(answers());
		expect(v.primary.tech).toBeTruthy();
		expect(v.alternatives.length).toBeLessThanOrEqual(2);
	});
});
