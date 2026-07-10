// Engine truth table (§3.2). Numeric/boolean metadata lives here; the human
// readable accuracy / infra / OPEX / kill-criteria strings live in the i18n
// `solutionFinder.tech.<id>` namespace so the pillar page and report render
// bilingual text from the same source of truth the engine runs on.

import type { TechId } from './types';

export interface TechMeta {
	id: TechId;
	/** Requires no fixed infrastructure (smartphones / vehicle devices only). */
	infraFree: boolean;
	/** Indicative CAPEX for a 10,000 m² setup (JPY); null where quote-based. */
	capexAnchor: number | null;
	/** Display order on the comparison / pillar page. */
	order: number;
}

/** Ordered best-to-worst for the pillar comparison table. */
export const TECHS: TechMeta[] = [
	{ id: 'trails', infraFree: true, capexAnchor: 500_000, order: 1 },
	{ id: 'ble_rssi', infraFree: false, capexAnchor: 2_500_000, order: 2 },
	{ id: 'ble_aoa', infraFree: false, capexAnchor: 6_000_000, order: 3 },
	{ id: 'uwb', infraFree: false, capexAnchor: 8_000_000, order: 4 },
	{ id: 'visual_slam', infraFree: true, capexAnchor: null, order: 5 },
	{ id: 'camera', infraFree: false, capexAnchor: null, order: 6 },
	{ id: 'wifi', infraFree: true, capexAnchor: 1_500_000, order: 7 },
	{ id: 'geomagnetic', infraFree: true, capexAnchor: 1_100_000, order: 8 },
	{ id: 'acoustic', infraFree: false, capexAnchor: 4_500_000, order: 9 },
	{ id: 'qr_nfc', infraFree: true, capexAnchor: 200_000, order: 10 },
	{ id: 'gnss', infraFree: true, capexAnchor: null, order: 11 }
];

export const techById = (id: TechId): TechMeta | undefined => TECHS.find((t) => t.id === id);
