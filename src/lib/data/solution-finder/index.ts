// Public surface of the Technology Fit Calculator engine. The quiz UI, the
// server endpoint, and the methodology page all import from here so tool and
// content never diverge from the same data + rules.

export * from './types';
export { STEPS, activeSteps, isAnswered } from './questions';
export type { QuestionDef, QuestionKind } from './questions';
export { TECHS, techById } from './tech';
export type { TechMeta } from './tech';
export { CITATIONS, citationById } from './citations';
export type { Citation } from './citations';
export { TRAILS_PRICING } from './pricing';
export { recommend, verdictTechs } from './rules';
