// Cost model — every constant lives here so marketing/founders can tune the
// numbers in one PR (§3.3 / §8). `computeTco()` is a pure function returning a
// 3-year TCO range per technology. Figures are directional (public list prices
// + field benchmarks); the report always shows the "request a quote" caveat.

import type {
	Answers,
	AreaBand,
	FloorBand,
	PeopleBand,
	TcoResult,
	TechId,
	VehicleBand,
	WasteLoss
} from './types';

/** Representative m² for each area band (mid-range, used for parametric calc). */
export const AREA_M2: Record<AreaBand, number> = {
	lt2000: 1500,
	'2000_10000': 6000,
	'10000_50000': 30000,
	gt50000: 70000
};

/** Representative tracked-people count per band. */
export const PEOPLE_N: Record<PeopleBand, number> = {
	lt20: 15,
	'20_100': 60,
	'100_500': 300,
	gt500: 700
};

/** Representative tracked-vehicle count per band. */
export const VEHICLE_N: Record<VehicleBand, number> = {
	lt5: 3,
	'5_20': 12,
	gt20: 30
};

/** Covered-floor multiplier for fixed-infrastructure CAPEX. */
export const FLOOR_MULT: Record<FloorBand, number> = {
	one: 1,
	two: 2,
	three_five: 4,
	six_plus: 7
};

export const COST = {
	horizonMonths: 36,
	// Waste-loss model (McKinsey-derived, mirrors the hero stats).
	waste: { wage: 4_000_000, wastePct: 0.3, onFloorFactor: 0.55 },
	ble_rssi: {
		beaconPerM2: 75,
		beaconHw: 8_000,
		beaconInstall: 6_000,
		gatewayPerM2: 800,
		gatewayCost: 60_000,
		sw: 1_200_000,
		survey: 500_000,
		batteryCost: 4_000,
		batteryCycleMonths: 24,
		platformMoMid: 100_000
	},
	uwb: {
		anchorPerM2: 500,
		minAnchors: 4,
		anchorHw: 80_000,
		anchorInstall: 70_000,
		surveyCalib: 1_500_000,
		sw: 2_000_000,
		tag: 15_000,
		recalibYr: 750_000,
		platformMoMid: 100_000
	},
	ble_aoa: {
		locatorPerM2: 400,
		locatorHw: 50_000,
		locatorInstall: 50_000,
		sw: 1_500_000,
		tag: 6_000,
		// OPEX shape ~65% of UWB.
		opexFactorVsUwb: 0.65
	},
	wifi: { survey: 1_500_000, sw: 800_000, refingerprint: 550_000 },
	camera: { camPerM2: 200, camHw: 150_000, camCabling: 50_000, compute: 1_000_000 },
	geomagnetic: { survey: 500_000, sw: 600_000, resurveyYr: 300_000 },
	acoustic: { flat: 4_500_000, recalibYr: 400_000 },
	qr_nfc: { setup: 200_000, opexYr: 100_000 },
	trails: { setup: 500_000, perDeviceMo: 5_000, handset: 30_000 },
	visual_slam: { perVehicleLow: 300_000, perVehicleHigh: 600_000, markerSetup: 300_000 }
} as const;

const round = (n: number) => Math.round(n);
const line = (labelKey: string, amount: number) => ({ labelKey, amount: round(amount) });

function floorMult(a: Answers): number {
	if (!a.constraints.includes('multi_floor')) return 1;
	return FLOOR_MULT[a.floors ?? 'two'];
}

/** Layout-change count over the 3-year horizon (drives re-survey OPEX). */
function layoutChanges(a: Answers): number {
	return a.constraints.includes('frequent_layout') ? 3 : 1;
}

function tco(
	tech: TechId,
	capex: number,
	opex3yr: number,
	lines: TcoResult['lines'],
	quoteBased = false
): TcoResult {
	const total = capex + opex3yr;
	return {
		tech,
		capex: round(capex),
		opex3yr: round(opex3yr),
		total: round(total),
		low: round(total * 0.8),
		high: round(total * 1.3),
		quoteBased,
		lines
	};
}

export function computeTco(tech: TechId, a: Answers): TcoResult {
	const A = AREA_M2[a.area ?? '2000_10000'];
	const P = PEOPLE_N[a.people ?? '20_100'];
	const V = a.vehicles ? VEHICLE_N[a.vehicles] : 0;
	const F = floorMult(a);
	const M = COST.horizonMonths;

	switch (tech) {
		case 'ble_rssi': {
			const c = COST.ble_rssi;
			const beacons = Math.ceil(A / c.beaconPerM2) * F;
			const gateways = Math.ceil(A / c.gatewayPerM2) * F;
			const capex =
				beacons * (c.beaconHw + c.beaconInstall) + gateways * c.gatewayCost + c.sw + c.survey;
			const batteryCycles = M / c.batteryCycleMonths;
			const opex3yr = beacons * c.batteryCost * batteryCycles + c.platformMoMid * M;
			return tco('ble_rssi', capex, opex3yr, [
				line('bleBeacons', beacons * (c.beaconHw + c.beaconInstall)),
				line('bleGateways', gateways * c.gatewayCost),
				line('software', c.sw),
				line('survey', c.survey),
				line('bleBattery', beacons * c.batteryCost * batteryCycles),
				line('platform', c.platformMoMid * M)
			]);
		}
		case 'uwb': {
			const c = COST.uwb;
			const anchors = Math.max(c.minAnchors, Math.ceil(A / c.anchorPerM2)) * F;
			const tags = (P + V) * c.tag;
			const capex = anchors * (c.anchorHw + c.anchorInstall) + c.surveyCalib + c.sw + tags;
			const opex3yr = c.recalibYr * 3 + c.platformMoMid * M;
			return tco('uwb', capex, opex3yr, [
				line('uwbAnchors', anchors * (c.anchorHw + c.anchorInstall)),
				line('surveyCalib', c.surveyCalib),
				line('software', c.sw),
				line('tags', tags),
				line('recalibration', c.recalibYr * 3),
				line('platform', c.platformMoMid * M)
			]);
		}
		case 'ble_aoa': {
			const c = COST.ble_aoa;
			const locators = Math.ceil(A / c.locatorPerM2) * F;
			const tags = (P + V) * c.tag;
			const capex = locators * (c.locatorHw + c.locatorInstall) + c.sw + tags;
			// OPEX shaped as a fraction of the UWB profile.
			const uwbOpex = COST.uwb.recalibYr * 3 + COST.uwb.platformMoMid * M;
			const opex3yr = uwbOpex * c.opexFactorVsUwb;
			return tco('ble_aoa', capex, opex3yr, [
				line('aoaLocators', locators * (c.locatorHw + c.locatorInstall)),
				line('software', c.sw),
				line('tags', tags),
				line('platform', opex3yr)
			]);
		}
		case 'wifi': {
			const c = COST.wifi;
			const capex = c.survey + c.sw;
			const opex3yr = c.refingerprint * layoutChanges(a);
			return tco('wifi', capex, opex3yr, [
				line('survey', c.survey),
				line('software', c.sw),
				line('refingerprint', opex3yr)
			]);
		}
		case 'camera': {
			const c = COST.camera;
			const cams = Math.ceil(A / c.camPerM2) * F;
			const capex = cams * (c.camHw + c.camCabling) + c.compute;
			const opex3yr = c.compute * 0.3 * 3; // storage/compute + governance, rough
			return tco(
				'camera',
				capex,
				opex3yr,
				[
					line('cameras', cams * (c.camHw + c.camCabling)),
					line('compute', c.compute),
					line('storageGovernance', opex3yr)
				],
				true
			);
		}
		case 'geomagnetic': {
			const c = COST.geomagnetic;
			const capex = c.survey + c.sw;
			const opex3yr = c.resurveyYr * layoutChanges(a);
			return tco('geomagnetic', capex, opex3yr, [
				line('survey', c.survey),
				line('software', c.sw),
				line('resurvey', opex3yr)
			]);
		}
		case 'acoustic': {
			const c = COST.acoustic;
			return tco('acoustic', c.flat, c.recalibYr * 3, [
				line('acousticFlat', c.flat),
				line('recalibration', c.recalibYr * 3)
			]);
		}
		case 'qr_nfc': {
			const c = COST.qr_nfc;
			return tco('qr_nfc', c.setup, c.opexYr * 3, [
				line('qrSetup', c.setup),
				line('qrOpex', c.opexYr * 3)
			]);
		}
		case 'trails': {
			const c = COST.trails;
			// People always tracked; vehicles add per-device subscriptions when tracked.
			const devices = P + V;
			const capex = c.setup;
			const opex3yr = devices * c.perDeviceMo * M;
			return tco('trails', capex, opex3yr, [
				line('trailsSetup', c.setup),
				line('trailsSubscription', opex3yr)
			]);
		}
		case 'visual_slam': {
			const c = COST.visual_slam;
			const kits = Math.max(1, V);
			const capexLow = kits * c.perVehicleLow + c.markerSetup;
			const capexHigh = kits * c.perVehicleHigh + c.markerSetup;
			const capex = (capexLow + capexHigh) / 2;
			return tco(
				'visual_slam',
				capex,
				0,
				[
					line('slamKits', kits * ((c.perVehicleLow + c.perVehicleHigh) / 2)),
					line('slamMarkers', c.markerSetup)
				],
				true
			);
		}
		case 'gnss':
		default:
			// GNSS is outdoor-only and never a valid indoor recommendation.
			return tco('gnss', 0, 0, [], true);
	}
}

/** Annual waste-loss estimate: P × wage × 30% × on-floor factor (§3.3). */
export function computeWasteLoss(a: Answers): WasteLoss {
	const people = PEOPLE_N[a.people ?? '20_100'];
	const { wage, wastePct, onFloorFactor } = COST.waste;
	return { people, annualLoss: round(people * wage * wastePct * onFloorFactor) };
}
