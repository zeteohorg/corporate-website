// Recommendation engine — deterministic, priority-ordered rules over the
// attribute matrix (spec §4). Pure function, budget-blind, published on the
// methodology page. Honest exclusions (incl. TRAILS) are the trust mechanic.

import { TECHS } from './tech';
import type { Answers, Recommendation, TechId, Verdict } from './types';

const rec = (tech: TechId, reasonKey: string, fit: number): Recommendation => ({ tech, reasonKey, fit });

function derive(a: Answers) {
	const t = a.targets;
	const hasWorkers = t.includes('workers') || t.includes('visitors');
	const hasVehicles = t.includes('vehicles');
	const toolsOnly = t.length > 0 && t.every((x) => x === 'tools');
	const vehiclesOnly = hasVehicles && !hasWorkers && !toolsOnly;
	const has = (c: Answers['constraints'][number]) => a.constraints.includes(c);
	return { hasWorkers, hasVehicles, toolsOnly, vehiclesOnly, has };
}

type Blocked = Map<TechId, string>;

/** Structural exclusions from the device and temporary answers (spec §4.2/4.3). */
function gateExclusions(a: Answers, hasWorkers: boolean, temporary: boolean): Blocked {
	const blocked: Blocked = new Map();
	if (hasWorkers && (a.device === 'tag_only' || a.device === 'nothing')) {
		for (const t of TECHS)
			if (t.carrier === 'smartphone')
				blocked.set(t.id, t.id === 'trails' ? 'trailsNeedsDevice' : 'needsSmartphone');
	}
	if (hasWorkers && a.device === 'nothing') {
		for (const t of TECHS)
			if (t.carrier === 'tag') blocked.set(t.id, 'needsCarriedDevice');
	}
	if (temporary) {
		for (const t of TECHS)
			if (!t.temporaryViable && !blocked.has(t.id)) blocked.set(t.id, 'notTemporary');
	}
	// Office/retail techs degrade badly where metal, moving steel and layout
	// churn dominate (magnetic-survey 2022; Wi-Fi fingerprint decay studies).
	const industrialSite =
		a.facility === 'factory' || a.facility === 'warehouse' || a.facility === 'construction';
	if (industrialSite) {
		for (const t of TECHS)
			if (t.industrial === 'unsuited' && !blocked.has(t.id)) blocked.set(t.id, 'notIndustrial');
	}
	return blocked;
}

export function recommend(a: Answers): Verdict {
	const d = derive(a);
	const floorNote = d.has('multi_floor');
	const temporary = d.has('temporary');
	const blocked = gateExclusions(a, d.hasWorkers, temporary);
	const excluded: Verdict['excluded'] = [];
	let noFit: Verdict['noFit'];
	let isVehicleBranch = false;

	// Surface honest exclusions for the techs buyers actually meet in the market.
	for (const id of ['trails', 'pdr', 'geomag_phone', 'geomag_infra', 'wifi', 'acoustic'] as TechId[]) {
		const reason = blocked.get(id);
		if (reason) excluded.push({ tech: id, reasonKey: reason });
	}

	const allowed = (id: TechId) => !blocked.has(id);
	/** First unblocked candidate wins; used by every branch below. */
	const pick = (cands: [TechId, string, number][]): Recommendation | null => {
		for (const [tech, reason, fit] of cands) if (allowed(tech)) return rec(tech, reason, fit);
		return null;
	};

	let primary: Recommendation | null = null;
	let alternatives: Recommendation[] = [];

	// 1 — cm-level precision (highest-priority technical requirement).
	if (a.accuracy === '30cm') {
		if (allowed('trails')) excluded.push({ tech: 'trails', reasonKey: 'trailsNotCmLevel' });
		if (d.vehiclesOnly) {
			isVehicleBranch = true;
			primary = pick([['visual_slam', 'vehicleSlam', 94], ['uwb', 'collisionUwb', 78]]);
			alternatives = [pick([['uwb', 'collisionUwb', 78]]), pick([['ble_aoa', 'aoaBalance', 64]])].filter(Boolean) as Recommendation[];
		} else {
			const small = a.area === 'lt2000';
			primary = small
				? pick([['ble_aoa', 'aoaBalance', 88], ['uwb', 'cmLevelUwb', 82]])
				: pick([['uwb', 'cmLevelUwb', 92], ['ble_aoa', 'aoaBalance', 76]]);
			alternatives = [pick(small ? [['uwb', 'cmLevelUwb', 82]] : [['ble_aoa', 'aoaBalance', 76]])].filter(Boolean) as Recommendation[];
		}
		if (!primary) noFit = { conflictKeys: ['needCmLevel', temporary ? 'temporaryProject' : 'noCarriedDevice'] };
	}
	// 2 — nothing carried + real-time tracking of people.
	else if (d.hasWorkers && a.device === 'nothing' && a.accuracy !== 'zone') {
		noFit = { conflictKeys: ['noCarriedDevice', 'realtimeTracking'] };
	}
	// 3 — no-install / fast start → infra-free family.
	else if (d.has('no_install') || a.timeline === '1mo') {
		primary = pick([['trails', 'noInstallTrails', 93], ['ble_rssi', 'zoneBle', 62], ['qr_nfc', 'zoneQr', 55]]);
		alternatives = [pick([['geomag_phone', 'geomagAlt', 58]]), pick([[a.accuracy === 'zone' ? 'wifi' : 'ble_aoa', a.accuracy === 'zone' ? 'wifiAlt' : 'aoaBalance', 55]])].filter(Boolean) as Recommendation[];
	}
	// 4 — zone-level, materials only → checkpoints.
	else if (a.accuracy === 'zone' && d.toolsOnly) {
		primary = pick([['qr_nfc', 'zoneQr', 85], ['ble_rssi', 'zoneBle', 68]]);
		alternatives = [pick([['ble_rssi', 'zoneBle', 68]])].filter(Boolean) as Recommendation[];
		if (allowed('trails')) excluded.push({ tech: 'trails', reasonKey: 'trailsOverkill' });
	}
	// 5 — metallic/harsh at 1–3 m: RF degrades → inertial wins.
	else if (d.has('metal') && a.accuracy === '1_3m') {
		primary = pick([['trails', 'metalDegradesRssi', 91], ['ble_aoa', 'aoaBalance', 66], ['uwb', 'cmLevelUwb', 60]]);
		alternatives = [pick([['ble_aoa', 'aoaBalance', 66]]), pick([['uwb', 'cmLevelUwb', 60]])].filter(Boolean) as Recommendation[];
		if (allowed('pdr')) excluded.push({ tech: 'pdr', reasonKey: 'pdrDrifts' });
		if (allowed('geomag_phone')) excluded.push({ tech: 'geomag_phone', reasonKey: 'geomagUnstable' });
	}
	// 6 — vehicles only, non-cm.
	else if (d.vehiclesOnly) {
		isVehicleBranch = true;
		primary = pick([['trails', 'vehicleTrails', a.accuracy === '1_3m' ? 90 : 84], ['visual_slam', 'vehicleSlam', 72]]);
		alternatives = [pick([['visual_slam', 'vehicleSlam', 72]]), pick([['ble_rssi', 'zoneBle', 58]])].filter(Boolean) as Recommendation[];
	}
	// 7 — tools/materials primary → tag-based.
	else if (d.toolsOnly) {
		primary = pick([['ble_rssi', 'toolsBleTags', 82], ['qr_nfc', 'zoneQr', 64]]);
		alternatives = [pick([['qr_nfc', 'zoneQr', 64]])].filter(Boolean) as Recommendation[];
	}
	// 8 — weighted default: 1–3 m people/flow tracking.
	else {
		primary = pick([['trails', 'weightedBest', 88], ['ble_aoa', 'aoaBalance', 70], ['ble_rssi', 'zoneBle', 60]]);
		alternatives = [pick([['ble_aoa', 'aoaBalance', 66]]), pick([['ble_rssi', 'zoneBle', 58]])].filter(Boolean) as Recommendation[];
		if (primary?.tech === 'trails' && allowed('pdr')) excluded.push({ tech: 'pdr', reasonKey: 'pdrDrifts' });
	}

	// No-fit fallback: render the closest degenerate option as a weak primary.
	if (!primary) {
		noFit = noFit ?? { conflictKeys: ['requirementsConflict', temporary ? 'temporaryProject' : 'noCarriedDevice'] };
		primary = a.device === 'nothing' ? rec('camera', 'cameraZonesOnly', 45) : rec('qr_nfc', 'zoneQr', 45);
		alternatives = [rec('qr_nfc', 'checkpointFallback', 40)].filter((r) => r.tech !== primary!.tech);
	}
	if (noFit && primary.fit >= 60) primary = { ...primary, fit: 45 };

	// Hybrid overlay (people + vehicles) — unchanged behavior from v1.
	let isHybrid = false;
	if (d.hasWorkers && d.hasVehicles && !isVehicleBranch && !noFit) {
		isHybrid = true;
		const vehicleAlt =
			a.accuracy === '30cm' ? rec('visual_slam', 'vehicleSlam', 74) : rec('trails', 'vehicleTrails', 80);
		alternatives = [vehicleAlt, ...alternatives].slice(0, 2);
	}

	// Guarantee primary + alternatives are distinct techs (keyed-list crash fix).
	const seenTechs = new Set<TechId>([primary.tech]);
	alternatives = alternatives.filter((alt) => {
		if (seenTechs.has(alt.tech)) return false;
		seenTechs.add(alt.tech);
		return true;
	});

	// Dedupe exclusions by tech (a tech may be gate-blocked and branch-excluded).
	const seenEx = new Set<TechId>();
	const dedupedEx = excluded.filter((e) => (seenEx.has(e.tech) ? false : (seenEx.add(e.tech), true)));

	return {
		primary,
		alternatives: alternatives.slice(0, 2),
		excluded: dedupedEx,
		isHybrid,
		isVehicleBranch,
		floorNote,
		championMode: primary.tech === 'trails' && !noFit,
		noFit
	};
}

export function verdictTechs(v: Verdict): TechId[] {
	return [v.primary.tech, ...v.alternatives.map((r) => r.tech)];
}
