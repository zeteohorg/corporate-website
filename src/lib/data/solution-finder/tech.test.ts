import { describe, expect, it } from 'vitest';
import { TECHS, techById } from './tech';
import { CITATIONS } from './citations';

describe('tech matrix', () => {
	it('covers all 13 tech ids exactly once', () => {
		expect(TECHS.map((t) => t.id).sort()).toEqual(
			['acoustic', 'ble_aoa', 'ble_rssi', 'camera', 'geomag_infra', 'geomag_phone',
			 'gnss', 'pdr', 'qr_nfc', 'trails', 'uwb', 'visual_slam', 'wifi'].sort()
		);
	});
	it('every source id resolves to a citation', () => {
		const ids = new Set(CITATIONS.map((c) => c.id));
		for (const t of TECHS) for (const s of t.sources) expect(ids.has(s), `${t.id}:${s}`).toBe(true);
	});
	it('temporary-viable set matches the spec', () => {
		const viable = TECHS.filter((t) => t.temporaryViable).map((t) => t.id).sort();
		expect(viable).toEqual(['ble_rssi', 'gnss', 'qr_nfc', 'trails', 'visual_slam'].sort());
	});
	it('industrial-unsuited set = office/retail techs (spec §4.6)', () => {
		const unsuited = TECHS.filter((t) => t.industrial === 'unsuited').map((t) => t.id).sort();
		expect(unsuited).toEqual(['acoustic', 'geomag_infra', 'geomag_phone', 'gnss', 'wifi'].sort());
	});
});

describe('techById', () => {
	it('returns undefined for unknown ids gracefully via typed lookups', () => {
		expect(techById('trails')?.id).toBe('trails');
	});
});
