import type { TopTranslation } from './translations/top';

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
			press: string;
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
	imageAlt: string;
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
	top: TopTranslation;
	press: PressTranslation;
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
	/** <head> only; the page's own headings stay as they are */
	meta: {
		title: string;
		description: string;
	};
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
	/** Small print at the end of the page */
	note?: string;
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
	/** Small print at the end of the page */
	note?: string;
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
	/** Small print at the end of the page */
	note?: string;
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

export type PressTranslation = {
	meta: { title: string; description: string };
	title: string;
	releasesTitle: string;
	/** Keyed by PressRelease.id (src/lib/data/press.ts) */
	releases: Record<string, { title: string; images: string[] }>;
	pressRelease: string;
	downloadAll: string;
	download: string;
	preparing: string;
	logoTitle: string;
	logos: { black: string; white: string };
	companyTitle: string;
	company: Array<{ label: string; value: string }>;
	contactTitle: string;
	contact: string;
	email: string;
	usage: string;
};
