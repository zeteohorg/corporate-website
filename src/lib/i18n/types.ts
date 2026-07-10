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
	crossToVendors: string;
	crossToComparison: string;
	// Pillar comparison page
	pillar: {
		metaTitle: string;
		metaDescription: string;
		h1: string;
		intro: string;
		tableCaption: string;
		headers: {
			tech: string;
			accuracy: string;
			infra: string;
			capex: string;
			opex: string;
			reject: string;
		};
		capexNote: string;
		faqHeading: string;
		faq: Array<{ q: string; a: string }>;
	};
	// Vendor directory page
	directory: {
		metaTitle: string;
		metaDescription: string;
		h1: string;
		intro: string;
		headers: { vendor: string; tech: string; niche: string; bestWhen: string };
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
	// Keyed by question id; options keyed by option value id.
	questions: Record<
		string,
		{
			title: string;
			hint?: string;
			options: Record<string, string>;
			examples?: Record<string, string>;
		}
	>;
	verdict: {
		title: string;
		recommended: string;
		alternative: string;
		notRecommendedTitle: string;
		fitLabel: string;
		tco3yr: string;
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
	cost: {
		rangeNote: string;
		disclaimer: string;
		capex: string;
		opex: string;
		total: string;
		quoteBased: string;
		lines: Record<string, string>;
	};
	gate: {
		title: string;
		subtitle: string;
		email: string;
		name: string;
		phone: string;
		company: string;
		companyFreemailHint: string;
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
	report: {
		title: string;
		inputsHeading: string;
		recommendationHeading: string;
		tcoHeading: string;
		vendorsHeading: string;
		vendorBestWhen: string;
		timelineHeading: string;
		nextStepsHeading: string;
		print: string;
		champion: {
			badge: string;
			summaryHeading: string;
			alternativesHeading: string;
			costHeading: string;
			risksHeading: string;
			proposalHeading: string;
		};
		pocCta: string;
	};
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
