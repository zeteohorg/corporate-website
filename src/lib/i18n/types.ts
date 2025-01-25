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
		message: string;
		submit: string;
		success: string;
		errors: {
			required: string;
			invalidEmail: string;
		};
	};
};

export type HomeTranslation = {
	hero: {
		title: string;
		subtitle: string;
		cta: string;
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

export type Translation = {
	common: CommonTranslation;
	home: HomeTranslation;
	blog: BlogTranslation;
	news: NewsTranslation;
};
