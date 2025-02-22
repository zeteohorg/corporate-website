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
			plant: string;
			retail: string;
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
	};
	useCases: {
		title: string;
		items: Array<{
			title: string;
			description: string;
		}>;
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
