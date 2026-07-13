// Type layer for the Technology Fit Calculator engine. Everything here is
// pure data — no Svelte/Kit imports — so rules/waste stay unit-testable.

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
	| 'geomag_phone'
	| 'geomag_infra'
	| 'pdr'
	| 'qr_nfc'
	| 'trails'
	| 'visual_slam';

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
	| 'temporary'
	| 'none';
export type FloorBand = 'one' | 'two' | 'three_five' | 'six_plus';
export type DeviceAvailability = 'company_phones' | 'can_issue' | 'tag_only' | 'nothing';
export type Timeline = '1mo' | '3mo' | '6mo_plus';
/** Engine-blind: read only by lead scoring/CRM, never by rules.ts. */
export type Budget = 'lt1m' | '1_5m' | 'gt5m' | 'undecided';

export interface Answers {
	facility?: Facility;
	targets: Target[];
	area?: AreaBand;
	people?: PeopleBand;
	vehicles?: VehicleBand;
	accuracy?: Accuracy;
	constraints: Constraint[];
	floors?: FloorBand;
	device?: DeviceAvailability;
	timeline?: Timeline;
	budget?: Budget;
	privacyConcern?: boolean;
}

export interface Recommendation {
	tech: TechId;
	/** i18n key under `solutionFinder.reasons` */
	reasonKey: string;
	/** 0–100 fit score for the fit-bar visual. */
	fit: number;
}

/** Qualitative label rendered with every fit bar — never a bare number. */
export type FitLabel = 'best' | 'conditional' | 'weak';
export const fitLabel = (fit: number): FitLabel =>
	fit >= 85 ? 'best' : fit >= 60 ? 'conditional' : 'weak';

export interface Verdict {
	primary: Recommendation;
	alternatives: Recommendation[];
	/** Technologies explicitly ruled out, with why (the honesty mechanic). */
	excluded: { tech: TechId; reasonKey: string }[];
	isHybrid: boolean;
	isVehicleBranch: boolean;
	floorNote: boolean;
	/** primary === 'trails' → slide pack ships in champion (ringi) mode. */
	championMode: boolean;
	/** Set when requirements conflict: i18n keys naming the two clashing
	 * requirements. UI renders the no-fit explainer; primary is the closest
	 * degenerate option (always `fitLabel === 'weak'`). */
	noFit?: { conflictKeys: [string, string] };
}

export interface WasteLoss {
	people: number;
	annualLoss: number; // JPY/year
}
