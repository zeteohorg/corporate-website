export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	published: boolean;
	content: string;
	thumbnail?: {
		url: string;
		alt: string;
	};
};
