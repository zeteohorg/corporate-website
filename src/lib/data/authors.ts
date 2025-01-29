interface Author {
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
}

export const authors: Record<string, Author> = {
	yann: {
		id: 'yann',
		name: 'Yann Le Guilly',
		avatar: '/images/authors/yann.jpg',
		bio: {
			en: 'Technical writer and developer with 10+ years of experience',
			ja: '10年以上の経験を持つテクニカルライターと開発者'
		},
		title: {
			en: 'AI Engineer & CEO',
			ja: 'シニア開発者'
		},
		social: {
			twitter: 'https://twitter.com/johndoe',
			github: 'https://github.com/johndoe'
		}
	}
	// Add more authors as needed
};

export type { Author };
