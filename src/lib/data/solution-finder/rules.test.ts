import { describe, expect, it } from 'vitest';
import { recommend } from './rules';
import type { Answers } from './types';

const base: Answers = {
	facility: 'factory', targets: ['workers'], area: '2000_10000', people: '20_100',
	accuracy: '1_3m', constraints: [], device: 'company_phones', timeline: '3mo'
};

describe('device gate', () => {
	it('tag_only excludes TRAILS and recommends a tag tech', () => {
		const v = recommend({ ...base, device: 'tag_only' });
		expect(v.excluded.some((e) => e.tech === 'trails' && e.reasonKey === 'trailsNeedsDevice')).toBe(true);
		expect(['ble_aoa', 'ble_rssi', 'uwb']).toContain(v.primary.tech);
	});
	it('nothing + facility-wide 1-3m realtime → noFit with camera as weak fallback', () => {
		const v = recommend({ ...base, device: 'nothing' });
		expect(v.noFit).toBeDefined();
		expect(v.primary.fit).toBeLessThan(60);
	});
	it('can_issue does not penalize TRAILS', () => {
		const v = recommend({ ...base, device: 'can_issue', constraints: ['no_install'] });
		expect(v.primary.tech).toBe('trails');
	});
});

describe('temporary deployment', () => {
	it('excludes fixed-infra techs and recommends TRAILS for people flow', () => {
		const v = recommend({ ...base, constraints: ['temporary'] });
		expect(v.primary.tech).toBe('trails');
		expect(v.excluded.some((e) => e.reasonKey === 'notTemporary')).toBe(true);
	});
	it('temporary + cm-level is an honest conflict (noFit)', () => {
		const v = recommend({ ...base, accuracy: '30cm', constraints: ['temporary'] });
		expect(v.noFit).toBeDefined();
	});
});

describe('industrial environment (spec §4.6)', () => {
	it('factory excludes Wi-Fi FP and geomagnetic as office/retail techs', () => {
		const v = recommend({ ...base, accuracy: 'zone' });
		expect(v.excluded.map((e) => e.tech)).toEqual(expect.arrayContaining(['wifi', 'geomag_phone']));
		expect(v.excluded.find((e) => e.tech === 'wifi')?.reasonKey).toBe('notIndustrial');
	});
	it('hospital/office keeps Wi-Fi FP available (no_install zone case)', () => {
		const v = recommend({ ...base, facility: 'hospital_office', accuracy: 'zone', constraints: ['no_install'] });
		const ids = [v.primary.tech, ...v.alternatives.map((r) => r.tech)];
		expect(ids).toContain('wifi');
	});
});

describe('budget is engine-blind', () => {
	it('identical verdicts for lt1m and gt5m across branches', () => {
		for (const accuracy of ['zone', '1_3m', '30cm'] as const) {
			const lo = recommend({ ...base, accuracy, budget: 'lt1m' });
			const hi = recommend({ ...base, accuracy, budget: 'gt5m' });
			expect(lo).toEqual(hi);
		}
	});
});

describe('cm-level', () => {
	it('excludes TRAILS, prefers UWB (large site) / BLE AoA (small site)', () => {
		expect(recommend({ ...base, accuracy: '30cm' }).primary.tech).toBe('uwb');
		expect(recommend({ ...base, accuracy: '30cm', area: 'lt2000' }).primary.tech).toBe('ble_aoa');
	});
});

describe('honest PDR / geomagnetic exclusions', () => {
	it('metal 1-3m branch names pdr and geomag_phone in exclusions', () => {
		const v = recommend({ ...base, constraints: ['metal'] });
		expect(v.primary.tech).toBe('trails');
		expect(v.excluded.map((e) => e.tech)).toEqual(expect.arrayContaining(['pdr', 'geomag_phone']));
	});
});

describe('regressions kept from v1', () => {
	it('zone + tools-only → checkpoints, TRAILS overkill', () => {
		const v = recommend({ ...base, targets: ['tools'], accuracy: 'zone' });
		expect(v.primary.tech).toBe('qr_nfc');
		expect(v.excluded.some((e) => e.tech === 'trails')).toBe(true);
	});
	it('primary + alternatives never contain duplicate techs (hybrid overlay)', () => {
		const v = recommend({ ...base, targets: ['workers', 'vehicles'], vehicles: '5_20' });
		const ids = [v.primary.tech, ...v.alternatives.map((r) => r.tech)];
		expect(new Set(ids).size).toBe(ids.length);
	});
});
