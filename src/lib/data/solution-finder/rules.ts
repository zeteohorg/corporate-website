// Recommendation engine — deterministic, priority-ordered rules over the truth
// table (§5.3 / §5.3a). Pure function, no side effects, fully unit-tested. The
// full rule set is published on the pillar page for auditable honesty: the
// engine will explicitly exclude TRAILS when it is not the right answer.

import type { Answers, Recommendation, TechId, Verdict } from './types';

const rec = (tech: TechId, reasonKey: string, fit: number): Recommendation => ({
	tech,
	reasonKey,
	fit
});

function derive(a: Answers) {
	const t = a.targets;
	const hasWorkers = t.includes('workers') || t.includes('visitors');
	const hasVehicles = t.includes('vehicles');
	const toolsOnly = t.length > 0 && t.every((x) => x === 'tools');
	const vehiclesOnly = hasVehicles && !hasWorkers && !toolsOnly;
	const has = (c: Answers['constraints'][number]) => a.constraints.includes(c);
	return { hasWorkers, hasVehicles, toolsOnly, vehiclesOnly, has };
}

/** Core engine: returns a first choice + up to two alternatives + exclusions. */
export function recommend(a: Answers): Verdict {
	const d = derive(a);
	const floorNote = d.has('multi_floor');

	let primary: Recommendation;
	let alternatives: Recommendation[] = [];
	const excluded: Verdict['excluded'] = [];
	let isVehicleBranch = false;

	// 1 — cm-level precision is the highest-priority technical requirement.
	if (a.accuracy === '30cm') {
		excluded.push({ tech: 'trails', reasonKey: 'trailsNotCmLevel' });
		if (d.vehiclesOnly) {
			isVehicleBranch = true;
			primary = rec('visual_slam', 'vehicleSlam', 94);
			alternatives = [rec('uwb', 'collisionUwb', 78), rec('ble_aoa', 'aoaBalance', 64)];
		} else {
			const smallCheapAoa = a.budget === 'lt1m' && a.area === 'lt2000';
			primary = smallCheapAoa ? rec('ble_aoa', 'aoaBalance', 88) : rec('uwb', 'cmLevelUwb', 92);
			alternatives = smallCheapAoa
				? [rec('uwb', 'cmLevelUwb', 82)]
				: [rec('ble_aoa', 'aoaBalance', 76)];
		}
	}
	// 2 — no-install / harsh-mount constraint, or a sub-1-month start → TRAILS.
	else if (d.has('no_install') || a.timeline === '1mo') {
		primary = rec('trails', 'noInstallTrails', 93);
		alternatives = [rec('geomagnetic', 'geomagAlt', 58)];
		if (a.accuracy === 'zone') alternatives.push(rec('wifi', 'wifiAlt', 52));
		else alternatives.push(rec('ble_aoa', 'aoaBalance', 60));
	}
	// 3 — zone-level, low budget, materials-only → checkpoints; TRAILS is overkill.
	else if (a.accuracy === 'zone' && a.budget === 'lt1m' && d.toolsOnly) {
		primary = rec('qr_nfc', 'zoneQr', 85);
		alternatives = [rec('ble_rssi', 'zoneBle', 68)];
		excluded.push({ tech: 'trails', reasonKey: 'trailsOverkill' });
	}
	// 4 — metallic/harsh environment at 1–3 m: RF degrades → TRAILS wins.
	else if (d.has('metal') && a.accuracy === '1_3m') {
		primary = rec('trails', 'metalDegradesRssi', 91);
		alternatives = [rec('ble_aoa', 'aoaBalance', 66), rec('uwb', 'cmLevelUwb', 60)];
	}
	// 5 — vehicles only, non-cm (utilization / flow analysis).
	else if (d.vehiclesOnly) {
		isVehicleBranch = true;
		if (a.accuracy === '1_3m') {
			primary = rec('trails', 'vehicleTrails', 90);
			alternatives = [rec('visual_slam', 'vehicleSlam', 72)];
		} else {
			primary = rec('trails', 'vehicleTrails', 84);
			alternatives = [rec('ble_rssi', 'zoneBle', 60)];
		}
	}
	// 6 — untagged things (tools/materials) are the primary target → tag-based.
	else if (d.toolsOnly) {
		primary = rec('ble_rssi', 'toolsBleTags', 82);
		alternatives = [rec('qr_nfc', 'zoneQr', 64)];
		if (d.hasWorkers) alternatives.push(rec('trails', 'peopleTrails', 70));
	}
	// 7 — weighted default: infra-free 1–3 m people/flow tracking → TRAILS.
	else {
		primary = rec('trails', 'weightedBest', 88);
		alternatives = [rec('ble_aoa', 'aoaBalance', 66), rec('ble_rssi', 'zoneBle', 58)];
	}

	// Vehicle sub-branch overlay: people + vehicles is the common factory case →
	// hybrid verdict (workforce flow + a vehicle-precision option).
	let isHybrid = false;
	if (d.hasWorkers && d.hasVehicles && !isVehicleBranch) {
		isHybrid = true;
		const vehicleAlt =
			a.accuracy === '30cm'
				? rec('visual_slam', 'vehicleSlam', 74)
				: rec('trails', 'vehicleTrails', 80);
		// Surface the vehicle option as the first alternative, keep list ≤ 2.
		alternatives = [vehicleAlt, ...alternatives].slice(0, 2);
	}

	// Guarantee primary + alternatives are all distinct techs. The UI renders
	// them as keyed lists (by tech id), and the hybrid overlay above can otherwise
	// reintroduce the primary tech as an alternative → duplicate keys → crash.
	const seenTechs = new Set<TechId>([primary.tech]);
	alternatives = alternatives.filter((alt) => {
		if (seenTechs.has(alt.tech)) return false;
		seenTechs.add(alt.tech);
		return true;
	});

	return {
		primary,
		alternatives: alternatives.slice(0, 2),
		excluded,
		isHybrid,
		isVehicleBranch,
		floorNote,
		championMode: primary.tech === 'trails'
	};
}

/** Techs shown in the verdict (primary + alternatives), for TCO + fit bars. */
export function verdictTechs(v: Verdict): TechId[] {
	return [v.primary.tech, ...v.alternatives.map((r) => r.tech)];
}
