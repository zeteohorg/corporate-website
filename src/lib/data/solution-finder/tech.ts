// Deployment-attribute matrix (spec §3). Physics/architecture facts only —
// no pricing. Human-readable strings live in i18n `solutionFinder.tech.<id>`;
// every attribute claim cites `citations.ts` via `sources`.

import type { TechId } from './types';

export interface TechMeta {
	id: TechId;
	order: number;
	infra: 'none' | 'light' | 'heavy';
	deployTime: 'days' | 'weeks' | 'months';
	maintenance: 'low' | 'medium' | 'high';
	carrier: 'smartphone' | 'tag' | 'vehicle_kit' | 'fixed_sensor' | 'none';
	accuracyClass: 'checkpoint' | 'zone' | 'meter' | 'submeter' | 'cm';
	metalRobust: boolean;
	multiFloor: 'native' | 'limited' | 'poor';
	temporaryViable: boolean;
	/** Qualitative cost tiers — structural classifications, never ¥. */
	infraCost: 'none' | 'low' | 'medium' | 'high';
	hardwareCost: 'none' | 'low' | 'medium' | 'high';
	/** Suitability in industrial sites (factory/warehouse/plant/construction). */
	industrial: 'suited' | 'limited' | 'unsuited';
	sources: string[];
	/** 'YYYY-MM' — rendered on the methodology page. */
	lastReviewed: string;
}

const R = '2026-07';

export const TECHS: TechMeta[] = [
	{ id: 'trails', order: 1, infra: 'none', deployTime: 'days', maintenance: 'low', carrier: 'smartphone', accuracyClass: 'meter', metalRobust: true, multiFloor: 'native', temporaryViable: true, infraCost: 'none', hardwareCost: 'low', industrial: 'suited', sources: ['ronin2020', 'dlinertial2024', 'ipin2019'], lastReviewed: R },
	{ id: 'ble_rssi', order: 2, infra: 'light', deployTime: 'weeks', maintenance: 'high', carrier: 'tag', accuracyClass: 'zone', metalRobust: false, multiFloor: 'poor', temporaryViable: true, infraCost: 'medium', hardwareCost: 'low', industrial: 'limited', sources: ['ble-practical-2021', 'zafari2019'], lastReviewed: R },
	{ id: 'ble_aoa', order: 3, infra: 'heavy', deployTime: 'months', maintenance: 'medium', carrier: 'tag', accuracyClass: 'submeter', metalRobust: false, multiFloor: 'limited', temporaryViable: false, infraCost: 'high', hardwareCost: 'low', industrial: 'limited', sources: ['bleaoa2021', 'zafari2019'], lastReviewed: R },
	{ id: 'uwb', order: 4, infra: 'heavy', deployTime: 'months', maintenance: 'high', carrier: 'tag', accuracyClass: 'cm', metalRobust: false, multiFloor: 'limited', temporaryViable: false, infraCost: 'high', hardwareCost: 'medium', industrial: 'suited', sources: ['uwb-nlos-2023', 'zafari2019'], lastReviewed: R },
	{ id: 'visual_slam', order: 5, infra: 'none', deployTime: 'weeks', maintenance: 'medium', carrier: 'vehicle_kit', accuracyClass: 'submeter', metalRobust: true, multiFloor: 'native', temporaryViable: true, infraCost: 'low', hardwareCost: 'high', industrial: 'suited', sources: ['zafari2019'], lastReviewed: R },
	{ id: 'camera', order: 6, infra: 'heavy', deployTime: 'months', maintenance: 'medium', carrier: 'none', accuracyClass: 'cm', metalRobust: true, multiFloor: 'limited', temporaryViable: false, infraCost: 'high', hardwareCost: 'none', industrial: 'limited', sources: ['zafari2019'], lastReviewed: R },
	{ id: 'wifi', order: 7, infra: 'light', deployTime: 'weeks', maintenance: 'high', carrier: 'smartphone', accuracyClass: 'zone', metalRobust: false, multiFloor: 'poor', temporaryViable: false, infraCost: 'low', hardwareCost: 'none', industrial: 'unsuited', sources: ['wifidecay2018', 'mendoza2019', 'zafari2019'], lastReviewed: R },
	{ id: 'geomag_phone', order: 8, infra: 'light', deployTime: 'weeks', maintenance: 'medium', carrier: 'smartphone', accuracyClass: 'meter', metalRobust: false, multiFloor: 'limited', temporaryViable: false, infraCost: 'low', hardwareCost: 'none', industrial: 'unsuited', sources: ['magnetic2022', 'mendoza2019'], lastReviewed: R },
	{ id: 'geomag_infra', order: 9, infra: 'heavy', deployTime: 'weeks', maintenance: 'medium', carrier: 'smartphone', accuracyClass: 'meter', metalRobust: false, multiFloor: 'limited', temporaryViable: false, infraCost: 'medium', hardwareCost: 'none', industrial: 'unsuited', sources: ['magnetic2022'], lastReviewed: R },
	{ id: 'pdr', order: 10, infra: 'none', deployTime: 'days', maintenance: 'low', carrier: 'smartphone', accuracyClass: 'zone', metalRobust: true, multiFloor: 'limited', temporaryViable: false, infraCost: 'none', hardwareCost: 'low', industrial: 'limited', sources: ['ronin2020', 'pdr-drift-2020', 'nsd-published'], lastReviewed: R },
	{ id: 'acoustic', order: 11, infra: 'heavy', deployTime: 'months', maintenance: 'high', carrier: 'tag', accuracyClass: 'submeter', metalRobust: true, multiFloor: 'limited', temporaryViable: false, infraCost: 'high', hardwareCost: 'medium', industrial: 'unsuited', sources: ['zafari2019'], lastReviewed: R },
	{ id: 'qr_nfc', order: 12, infra: 'none', deployTime: 'days', maintenance: 'low', carrier: 'none', accuracyClass: 'checkpoint', metalRobust: true, multiFloor: 'native', temporaryViable: true, infraCost: 'low', hardwareCost: 'low', industrial: 'suited', sources: ['zafari2019'], lastReviewed: R },
	{ id: 'gnss', order: 13, infra: 'none', deployTime: 'days', maintenance: 'low', carrier: 'smartphone', accuracyClass: 'zone', metalRobust: true, multiFloor: 'poor', temporaryViable: true, infraCost: 'none', hardwareCost: 'none', industrial: 'unsuited', sources: ['zafari2019'], lastReviewed: R }
];

export const techById = (id: TechId): TechMeta | undefined => TECHS.find((t) => t.id === id);
