import { describe, expect, it } from 'vitest';
import { TRAILS_PRICING } from './pricing';

describe('TRAILS pricing', () => {
	it('constants are the published figures', () => {
		expect(TRAILS_PRICING).toEqual({ setup: 500_000, perDeviceMo: 5_000, handset: 30_000 });
	});
});
