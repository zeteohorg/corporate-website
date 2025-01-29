export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	published: boolean;
	content: string;
	author?: {
		name: string;
		avatar: string;
		bio: string;
	};
	tags?: string[];
	thumbnail?: {
		url: string;
		alt: string;
	};
};

export type TableOfContentsItem = {
	level: number;
	title: string;
	id: string;
};

export type Author = {
	id: string;
	name: string;
	avatar: string;
	bio: {
		en: string;
		ja: string;
	};
	title?: {
		en: string;
		ja: string;
	};
	social?: {
		twitter?: string;
		github?: string;
		linkedin?: string;
	};
};
