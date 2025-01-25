import type { Translation } from '../types';
import * as common from './common';
import * as home from './home';
import * as blog from './blog';
import * as news from './news';

export const en: Translation = {
	common: common.en,
	home: home.en,
	blog: blog.en,
	news: news.en
};

export const ja: Translation = {
	common: common.ja,
	home: home.ja,
	blog: blog.ja,
	news: news.ja
};

export const translations = { en, ja };
