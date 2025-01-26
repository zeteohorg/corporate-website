export type CommonTranslation = {
	nav: {
		blog: string;
		news: string;
		company: string;
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

export type Translation = {
	common: CommonTranslation;
	home: HomeTranslation;
	blog: BlogTranslation;
	news: NewsTranslation;
	challenges: ChallengesTranslation;
	product: ProductTranslation;
	howItWorks: HowItWorksTranslation;
};
