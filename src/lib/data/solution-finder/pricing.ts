// The only vendor ¥ figures in the codebase — zeteoh's own published TRAILS
// pricing (spec §5). Rendered only when TRAILS is the recommended technology
// (`Verdict.championMode`). Never shown for any other technology.

export const TRAILS_PRICING = { setup: 500_000, perDeviceMo: 5_000, handset: 30_000 } as const;
