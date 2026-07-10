// Type layer for the Solution Finder engine. Everything here is pure data — no
// Svelte/Kit imports — so `rules.ts` and `cost.ts` stay unit-testable in the
// Vitest `node` environment.

export type Lang = 'en' | 'ja';

/** Positioning technologies the engine can recommend or reject. */
export type TechId =
	| 'gnss'
	| 'wifi'
	| 'ble_rssi'
	| 'ble_aoa'
	| 'uwb'
	| 'acoustic'
	| 'camera'
	| 'geomagnetic'
	| 'qr_nfc'
	| 'trails'
	| 'visual_slam';

// --- Answer option unions (mirror the §5.2 question flow) -------------------

export type Facility = 'factory' | 'warehouse' | 'construction' | 'hospital_office' | 'other';
export type Target = 'workers' | 'vehicles' | 'tools' | 'visitors';
export type AreaBand = 'lt2000' | '2000_10000' | '10000_50000' | 'gt50000';
export type PeopleBand = 'lt20' | '20_100' | '100_500' | 'gt500';
export type VehicleBand = 'lt5' | '5_20' | 'gt20';
export type Accuracy = 'zone' | '1_3m' | '30cm';
export type Constraint =
	| 'metal'
	| 'no_install'
	| 'frequent_layout'
	| 'multi_floor'
	| 'harsh'
	| 'none';
export type FloorBand = 'one' | 'two' | 'three_five' | 'six_plus';
export type Timeline = '1mo' | '3mo' | '6mo_plus';
export type Budget = 'lt1m' | '1_5m' | 'gt5m' | 'undecided';

/** The full quiz answer set. Later steps may be undefined mid-flow. */
export interface Answers {
	facility?: Facility;
	targets: Target[];
	area?: AreaBand;
	people?: PeopleBand;
	vehicles?: VehicleBand;
	accuracy?: Accuracy;
	constraints: Constraint[];
	floors?: FloorBand;
	timeline?: Timeline;
	budget?: Budget;
	privacyConcern?: boolean;
}

/** A single cost line rendered in the report TCO table. */
export interface CostLine {
	/** i18n key under `solutionFinder.cost.lines` */
	labelKey: string;
	amount: number; // JPY
}

/** 3-year total cost of ownership for one technology. */
export interface TcoResult {
	tech: TechId;
	capex: number;
	opex3yr: number;
	total: number;
	/** −20% / +30% band around `total`. */
	low: number;
	high: number;
	/** True when the number is indicative only and needs a vendor quote. */
	quoteBased: boolean;
	lines: CostLine[];
}

/** A technology shown in the verdict, with its reason phrase and fit score. */
export interface Recommendation {
	tech: TechId;
	/** i18n key under `solutionFinder.reasons` */
	reasonKey: string;
	/** 0–100 fit score for the fit-bar visual. */
	fit: number;
}

/** Output of `recommend()` — deterministic, auditable. */
export interface Verdict {
	primary: Recommendation;
	alternatives: Recommendation[];
	/** Technologies explicitly ruled out, with why (the honesty mechanic). */
	excluded: { tech: TechId; reasonKey: string }[];
	isHybrid: boolean;
	isVehicleBranch: boolean;
	/** Multi-floor structure detected → report adds the フロア判定 explainer. */
	floorNote: boolean;
	/** primary === 'trails' → report ships in champion (ringi) mode. */
	championMode: boolean;
}

/** Annual waste-loss estimate shown alongside the verdict. */
export interface WasteLoss {
	people: number;
	annualLoss: number; // JPY/year
}
