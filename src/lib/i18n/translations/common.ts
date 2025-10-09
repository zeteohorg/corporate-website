import type { CommonTranslation } from '../types';

export const en: CommonTranslation = {
	contact: {
		title: 'Ready to start with a PoC (Proof of Concept)?',
		name: 'Name',
		email: 'Email',
		company: 'Company Name',
		jobTitle: 'Job Title',
		message: 'Message',
		submit: 'Request PoC',
		success: "Thank you for your interest! We'll contact you soon to discuss your PoC implementation.",
		required: 'Required fields',
		inquiryType: {
			label: 'Type of Inquiry',
			placeholder: 'Select type of inquiry',
			options: {
				demo: 'Request a PoC (Proof of Concept)',
				vendor: 'Business Partnership Inquiry',
				other: 'General Inquiry'
			}
		},
		errors: {
			required: 'This field is required',
			invalidEmail: 'Please enter a valid email address'
		}
	},
	footer: {
		company: 'Company',
		product: 'Product',
		resources: 'Resources',
		legal: 'Legal',
		social: 'Social',
		copyright: '© 2025 Zeteoh, Inc. All rights reserved.',
		links: {
			about: 'About',
			careers: 'Careers',
			contact: 'Contact',
			pricing: 'Pricing',
			features: 'Features',
			documentation: 'Documentation',
			blog: 'Blog',
			news: 'News',
			privacyPolicy: 'Privacy Policy',
			terms: 'Terms of Service'
		}
	},
	nav: {
		blog: 'Blog',
		news: 'News',
		company: 'Company',
		solutions: 'Solutions',
		industries: {
			title: 'Use Cases',
			construction: 'Construction',
			logistics: 'Logistics',
			factory: 'Factories'
		}
	}
};

export const ja: CommonTranslation = {
	contact: {
		title: 'まずはPoC（実証実験）から始めませんか？',
		name: '名前',
		email: 'メールアドレス',
		company: '会社名',
		jobTitle: '役職',
		message: 'メッセージ',
		submit: 'PoCを依頼する',
		success: 'お問い合わせありがとうございます。PoCの実施について担当者よりご連絡させていただきます。',
		required: '必須項目',
		inquiryType: {
			label: 'お問い合わせ種別',
			placeholder: 'お問い合わせ種別を選択してください',
			options: {
				demo: 'PoC（実証実験）のご依頼',
				vendor: 'ビジネス提携に関するお問い合わせ',
				other: 'その他のお問い合わせ'
			}
		},
		errors: {
			required: 'この項目は必須です',
			invalidEmail: '有効なメールアドレスを入力してください'
		}
	},
	footer: {
		company: '会社情報',
		product: '製品',
		resources: 'リソース',
		legal: '法的情報',
		social: 'ソーシャル',
		copyright: '© 2025 Zeteoh, Inc. All rights reserved.',
		links: {
			about: '会社概要',
			careers: '採用情報',
			contact: 'お問い合わせ',
			pricing: '料金',
			features: '機能',
			documentation: 'ドキュメント',
			blog: 'ブログ',
			news: 'ニュース',
			privacyPolicy: 'プライバシーポリシー',
			terms: '利用規約'
		}
	},
	nav: {
		blog: 'ブログ',
		news: 'ニュース',
		company: '会社情報',
		solutions: 'ソリューション',
		industries: {
			title: 'ユースケース',
			construction: '建設',
			logistics: '物流',
			factory: '工場'
		}
	}
};
