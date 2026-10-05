import type { PressTranslation } from '../types';

// Japanese copy is as specified. English is a draft pending confirmation
// (incl. the award's official English name).
export const en: PressTranslation = {
	meta: {
		title: 'Press Kit',
		description:
			'Press resources from Zeteoh, Inc. Download news releases, images and the company logo.'
	},
	title: 'Press Kit',
	releasesTitle: 'News releases',
	releases: {
		'2026-10-06-ceatec-award': {
			title:
				"TRAILS, spatial AI that locates people indoors where GPS can't reach using a single smartphone, wins the CEATEC AWARD 2026 Next Generation Award",
			images: [
				'Image: Indoor positioning with the TRAILS spatial AI',
				'Image: How the Astra spatial AI camera (prototype) can be used'
			]
		}
	},
	pressRelease: 'Press release (PDF)',
	downloadAll: 'Download all (ZIP)',
	download: 'Download',
	preparing: 'Coming soon',
	logoTitle: 'Company logo',
	logos: { black: 'Logo (black, PNG)', white: 'Logo (white, PNG)' },
	companyTitle: 'Company profile',
	company: [
		{ label: 'Company name', value: 'Zeteoh, Inc.' },
		{ label: 'Representative', value: 'Yann Le Guilly, Representative Director' },
		{
			label: 'Address',
			value: '12th floor YANMAR TOKYO, 2-1-1 Yaesu, Chuo-ku, Tokyo 104-0028, Japan'
		},
		{ label: 'Founded', value: 'September, 2020' },
		{
			label: 'Business',
			value:
				'Development and sales of indoor positioning solutions\nSoftware development using artificial intelligence'
		}
	],
	contactTitle: 'Media inquiries',
	contact: 'PR: Satomi Le Guilly',
	email: 'satomi@zeteoh.com',
	usage: 'Images on this page may be used for press purposes only.'
};

export const ja: PressTranslation = {
	meta: {
		title: 'プレスキット',
		description:
			'zeteoh株式会社の報道関係者向けページです。ニュースリリース、画像、会社ロゴをダウンロードいただけます。'
	},
	title: 'プレスキット',
	releasesTitle: 'ニュースリリース',
	releases: {
		'2026-10-06-ceatec-award': {
			title:
				'スマホ1台でGPSの届かない屋内の位置がわかる空間AI「TRAILS」、CEATEC AWARD 2026 ネクストジェネレーション賞を受賞',
			images: [
				'画像：空間AI「TRAILS」による屋内測位のイメージ',
				'画像：空間AIカメラ「Astra」（プロトタイプ）の活用イメージ'
			]
		}
	},
	pressRelease: 'プレスリリース（PDF）',
	downloadAll: 'すべてダウンロード（ZIP）',
	download: 'ダウンロード',
	preparing: '準備中',
	logoTitle: '会社ロゴ',
	logos: { black: 'ロゴ（黒・PNG）', white: 'ロゴ（白・PNG）' },
	companyTitle: '会社概要',
	company: [
		{ label: '会社名', value: 'zeteoh株式会社' },
		{ label: '代表者', value: '代表取締役 ヤン リギリ' },
		{ label: '所在地', value: '〒104-0028 東京都中央区八重洲2丁目1-1 YANMAR TOKYO 12階' },
		{ label: '設立', value: '2020年9月' },
		{
			label: '事業内容',
			value: '屋内位置測位ソリューションの開発・販売\n人工知能を活用したソフトウエア開発'
		}
	],
	contactTitle: '報道関係者のお問い合わせ先',
	contact: '広報担当 リギリ 聡美',
	email: 'satomi@zeteoh.com',
	usage: '掲載画像は報道目的に限りご利用いただけます。'
};
