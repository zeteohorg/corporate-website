import type { CommonTranslation } from '../types';

export const en: CommonTranslation = {
	nav: {
		blog: 'Blog',
		news: 'News',
		company: 'Company'
	},
	contact: {
		title: 'Contact Us',
		name: 'Name',
		email: 'Email',
		message: 'Message',
		submit: 'Send Message',
		success: "Thank you for your message! We'll get back to you soon.",
		errors: {
			required: 'This field is required',
			invalidEmail: 'Please enter a valid email address'
		}
	}
};

export const ja: CommonTranslation = {
	nav: {
		blog: 'ブログ',
		news: 'ニュース',
		company: '会社概要'
	},
	contact: {
		title: 'お問い合わせ',
		name: '名前',
		email: 'メールアドレス',
		message: 'メッセージ',
		submit: '送信',
		success: 'お問い合わせありがとうございます。担当者より連絡させていただきます。',
		errors: {
			required: 'この項目は必須です',
			invalidEmail: '有効なメールアドレスを入力してください'
		}
	}
};
