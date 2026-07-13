export type CommonTranslation = {
	nav: {
		blog: string;
		news: string;
		company: string;
		solutions: string;
		industries: {
			title: string;
			construction: string;
			logistics: string;
			factory: string;
		};
	};
	contact: {
		title: string;
		name: string;
		email: string;
		company: string;
		jobTitle: string;
		message: string;
		submit: string;
		success: string;
		required: string;
		inquiryType: {
			label: string;
			placeholder: string;
			options: {
				demo: string;
				vendor: string;
				other: string;
			};
		};
		hearAboutUs: {
			label: string;
			placeholder: string;
			options: {
				search: string;
				socialMedia: string;
				aiAssistant: string;
				referral: string;
				event: string;
				other: string;
			};
		};
		errors: {
			required: string;
			invalidEmail: string;
		};
	};
	footer: {
		company: string;
		product: string;
		resources: string;
		legal: string;
		social: string;
		copyright: string;
		links: {
			about: string;
			careers: string;
			contact: string;
			pricing: string;
			features: string;
			documentation: string;
			blog: string;
			news: string;
			privacyPolicy: string;
			terms: string;
		};
	};
};

export type HomeTranslation = {
	hero: {
		title: string;
		subtitle: string;
		getStarted: string;
		learnMore: string;
		stats: Array<{
			value: string;
			label: string;
			colorClass?: string;
		}>;
	};
	useCases: {
		title: string;
		subtitle: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
	backedBy: {
		title: string;
	};
};

export type BlogTranslation = {
	title: string;
	readMore: string;
};

export type NewsTranslation = {
	title: string;
	readMore: string;
};

export type ChallengesTranslation = {
	title: string;
	subtitle: string;
	items: Array<{
		title: string;
		description: string;
	}>;
};

export type ProductTranslation = {
	title: string;
	subtitle: string;
	description: string;
};

export type HowItWorksTranslation = {
	title: string;
	steps: Array<{
		title: string;
		description: string;
	}>;
};

// Update the Translation interface to include factory
export type Translation = {
	common: CommonTranslation;
	home: HomeTranslation;
	blog: BlogTranslation;
	news: NewsTranslation;
	challenges: ChallengesTranslation;
	product: ProductTranslation;
	howItWorks: HowItWorksTranslation;
	privacyPolicy: PrivacyPolicyTranslation;
	company: CompanyTranslation;
	factory: FactoryTranslation;
	construction: ConstructionTranslation;
	logistics: LogisticsTranslation;
	export: ExportTranslation;
	solutionFinder: SolutionFinderTranslation;
	positioning: PositioningTranslation;
};

export type PositioningTranslation = {
	// Shared
	updatedLabel: string;
	ctaHeading: string;
	ctaText: string;
	ctaButton: string;
	crossToComparison: string;
	// Pillar comparison / methodology page
	pillar: {
		metaTitle: string;
		metaDescription: string;
		h1: string;
		intro: string;
		tableCaption: string;
		headers: {
			tech: string;
			accuracy: string;
			install: string;
			deployTime: string;
			maintenance: string;
			reject: string;
		};
		capexNote: string;
		pdrVsNeural: { heading: string; body: string };
		faqHeading: string;
		faq: Array<{ q: string; a: string }>;
	};
};

export type SolutionFinderTranslation = {
	meta: { title: string; description: string };
	intro: {
		eyebrow: string;
		title: string;
		subtitle: string;
		start: string;
		time: string;
	};
	nav: { back: string; next: string; skip: string; seeResult: string; restart: string };
	progress: { stepOf: string }; // "Step {n} / {m}"
	card: { heading: string; text: string; button: string; dismiss: string };
	// Keyed by question id; options keyed by option value id.
	questions: Record<
		string,
		{
			title: string;
			hint?: string;
			options: Record<string, string>;
			examples?: Record<string, string>;
			/** Shown under the title only for `budget` (engine-blind trust note). */
			trustNote?: string;
		}
	>;
	verdict: {
		title: string;
		recommended: string;
		alternative: string;
		notRecommendedTitle: string;
		fitLabel: string;
		hybridNote: string;
		floorNote: string;
		unlockCta: string;
		hotCta: string;
	};
	waste: { headline: string; note: string }; // headline contains {amount}
	reasons: Record<string, string>;
	tech: Record<
		string,
		{ name: string; accuracy: string; infra: string; opex: string; killCriteria: string }
	>;
	/** Qualitative fit-bar labels — never a bare percentage (spec §4). */
	fitLabels: { best: string; conditional: string; weak: string };
	/** Deployment-profile chip labels (spec §7) — structural, never ¥. */
	deploy: {
		infra: string;
		deployTime: string;
		maintenance: string;
		carrier: string;
		infraCost: string;
		hardwareCost: string;
		/** Moved from the deleted `cost.disclaimer` — general estimate caution. */
		note: string;
		values: {
			infra: { none: string; light: string; heavy: string };
			deployTime: { days: string; weeks: string; months: string };
			maintenance: { low: string; medium: string; high: string };
			carrier: {
				smartphone: string;
				tag: string;
				vehicle_kit: string;
				fixed_sensor: string;
				none: string;
			};
		};
	};
	/** Shared none/low/medium/high labels for infraCost/hardwareCost chips. */
	costTiers: { none: string; low: string; medium: string; high: string; note: string };
	/** TRAILS pricing card — the only ¥ figures anywhere but the waste banner. */
	pricing: { heading: string; setup: string; perDevice: string; handsetNote: string; payback: string };
	/** The no-fit explainer (spec §4.5) — honest, never a dead end. */
	noFit: {
		title: string;
		intro: string;
		conflicts: Record<string, string>;
		relaxHint: string;
	};
	gate: {
		title: string;
		subtitle: string;
		email: string;
		name: string;
		phone: string;
		company: string;
		companyFreemailHint: string;
		department: { label: string; placeholder: string };
		consent: string;
		newsletter: string;
		submit: string;
		submitting: string;
		success: string;
		error: string;
		retry: string;
		invalidEmail: string;
		requiredField: string;
	};
	report: { title: string; pocCta: string };
	/** Gated slide-pack deliverable (spec §7). */
	slides: {
		title: string;
		execSummary: string;
		requirements: string;
		alternatives: string;
		timelineComparison: string;
		risks: string;
		checklist: string;
		proposal: string;
		sources: string;
		copySection: string;
		download: string;
		attribution: string;
		reDiagnoseInvite: string;
	};
	/** Provider-evaluation checklist (spec §6/§7), 3 questions per tech family. */
	checklist: Record<string, [string, string, string]>;
};

// Add to Translation interface
export type PrivacyPolicyTranslation = {
	title: string;
	intro: string;
	information: {
		title: string;
		description: string;
	};
	usage: {
		title: string;
		description: string;
		purposes: string[];
	};
	sharing: {
		title: string;
		description: string;
	};
	cookies: {
		title: string;
		description: string;
	};
	rights: {
		title: string;
		description: string;
	};
	updates: {
		title: string;
		description: string;
	};
	contact: {
		title: string;
		address: string;
		email: string;
	};
	lastUpdate: string;
};

export type CompanyTranslation = {
	hero: {
		title: string;
		subtitle: string;
		wearableTitle: string;
		wearableDescription: string;
	};
	solution: {
		title: string;
		subtitle: string;
		features: Array<{
			title: string;
			description: string;
		}>;
	};
	future: {
		title: string;
		description: string;
	};
	team: {
		title: string;
		subtitle: string;
		members: Array<{
			name: string;
			title: string;
			location: string;
			background: string;
			image: string;
			alt: string;
		}>;
	};
	info: {
		title: string;
		companyName: {
			label: string;
			value: string;
		};
		founded: {
			label: string;
			value: string;
		};
		capital: {
			label: string;
			value: string;
		};
		location: {
			label: string;
			value: string;
		};
		business: {
			label: string;
			value: string;
		};
	};
};
export type FactoryTranslation = {
	title: string;
	subtitle: string;
	challenges: {
		title: string;
		text: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
	solutions: {
		title: string;
		subtitle: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
};
export type ConstructionTranslation = {
	title: string;
	subtitle: string;
	challenges: {
		title: string;
		text: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
	solutions: {
		title: string;
		subtitle: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
};
export type LogisticsTranslation = {
	title: string;
	subtitle: string;
	challenges: {
		title: string;
		text: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
	solutions: {
		title: string;
		subtitle: string;
		items: Array<{
			title: string;
			description: string;
		}>;
	};
};

export type ExportTranslation = {
	tag: string;
	title: string;
	description: string;
	features: string[];
	mockup: {
		titlebar: string;
		dateStart: string;
		dateEnd: string;
		columns: {
			trajectory: string;
			deviceId: string;
			points: string;
		};
		workers: Array<{
			name: string;
			deviceId: string;
			points: string;
			color: 'red' | 'blue' | 'green';
		}>;
		footer: {
			selected: string;
			exportButton: string;
			downloading: string;
			ready: string;
		};
		toast: {
			filename: string;
			details: string;
		};
	};
};
