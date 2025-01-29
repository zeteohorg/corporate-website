import type { Translation } from '../types';
import * as common from './common';
import * as home from './home';
import * as blog from './blog';
import * as news from './news';
import * as challenges from './challenges';
import * as product from './product';
import * as howItWorks from './how-it-works';
import * as privacyPolicy from './privacy-policy';

export const en: Translation = {
	common: common.en,
	home: home.en,
	blog: blog.en,
	news: news.en,
	challenges: challenges.en,
	product: product.en,
	howItWorks: howItWorks.en,
	privacyPolicy: privacyPolicy.en
};

export const ja: Translation = {
	common: common.ja,
	home: home.ja,
	blog: blog.ja,
	news: news.ja,
	challenges: challenges.ja,
	product: product.ja,
	howItWorks: howItWorks.ja,
	privacyPolicy: privacyPolicy.ja
};

export const translations = { en, ja };
