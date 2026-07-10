// Public surface of the Solution Finder engine. The quiz UI, the server
// endpoint, and the SEO pillar/vendor pages all import from here so tool and
// content never diverge from the same data + rules.

export * from './types';
export { STEPS, activeSteps, isAnswered } from './questions';
export type { QuestionDef, QuestionKind } from './questions';
export { TECHS, techById } from './tech';
export type { TechMeta } from './tech';
export { VENDORS, vendorsForTechs } from './vendors';
export type { Vendor } from './vendors';
export {
	COST,
	AREA_M2,
	PEOPLE_N,
	VEHICLE_N,
	FLOOR_MULT,
	computeTco,
	computeWasteLoss
} from './cost';
export { recommend, verdictTechs } from './rules';
