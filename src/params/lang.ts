const VALID_LANGUAGES = ['en', 'ja'] as const;
type ValidLanguage = (typeof VALID_LANGUAGES)[number];

export const match = (param: string): param is ValidLanguage => {
	return VALID_LANGUAGES.includes(param as ValidLanguage);
};
