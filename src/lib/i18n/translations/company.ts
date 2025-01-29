import type { CompanyTranslation } from '../types';

export const en: CompanyTranslation = {
	hero: {
		title: 'Elevate human potential with the power of AI.',
		subtitle:
			'Committed to leveraging the latest advancements in AI technology to improve various aspects of human life, we believe that this technology has the potential to transform the way we live, work, and interact with the world around us. By harnessing the power of AI, new possibilities can be unlocked to help individuals achieve their full potential.',
		wearableTitle: 'AI × Wearable device',
		wearableDescription:
			'As a means to achieve our mission, our primary focus is on wearable devices. These devices have the ability to collect a wealth of data on human behavior, physiology, and environmental factors. We bring value to society by extracting insights from this data using AI.'
	},
	team: {
		title: 'Our team',
		subtitle:
			"We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.",
		members: [
			{
				name: 'Yann Le Guilly',
				title: 'Co-Founder / CEO',
				location: 'Bretagne, France',
				image: '/images/team/yann.png',
				alt: 'Yann in a T-shirt'
			},
			{
				name: 'Satomi Le Guilly',
				title: 'Co-Founder / COO',
				location: 'Aomori, Japan',
				image: '/images/team/satomi.png',
				alt: 'Satomi in a white sweater'
			},
			{
				name: 'Toshio Takahashi',
				title: 'Sales Manager',
				location: 'Tokyo, Japan',
				image: '/images/team/takahashi.png',
				alt: 'Takahashi in a suits'
			},
			{
				name: 'Carl-Gustav Eklund',
				title: 'Adviser',
				location: 'Gothenburg, Sweden',
				image: '/images/team/carl.png',
				alt: 'Carl in a suits'
			}
		]
	},
	info: {
		title: 'Company Information',
		companyName: {
			label: 'Company Name',
			value: 'Zeteoh, Inc.'
		},
		founded: {
			label: 'Founded',
			value: 'September, 2020'
		},
		capital: {
			label: 'Capital',
			value: '15,300,000 JPY'
		},
		location: {
			label: 'Location',
			value: '12th floor YANMAR TOKYO, 2-1-1 Yaesu, Chuo-ku, Tokyo 104-0028, Japan'
		},
		business: {
			label: 'Business Description',
			value:
				'Development and sales of indoor positioning solutions\nApplication development using artificial intelligence'
		}
	}
};

export const ja: CompanyTranslation = {
	hero: {
		title: 'AIの力で人の可能性を広げる',
		subtitle:
			'私たちは、最新のAI技術を活用して人々の生活のさまざまな側面を向上させることに取り組んでいます。この技術には、私たちの生活、仕事、そして周囲の世界との関わり方を変革する可能性があると信じています。AIの力を活用することで、個人が持つ可能性を最大限に引き出すための新たな可能性が開かれます。',
		wearableTitle: 'AI × ウェアラブルデバイス',
		wearableDescription:
			'ミッションを達成するための手段として、私たちはウェアラブルデバイスに注力しています。これらのデバイスは、人間の行動、生理学的データ、環境要因に関する豊富なデータを収集する能力を持っています。AIを用いてこのデータから洞察を抽出することで、社会に価値をもたらします。'
	},
	team: {
		title: 'チーム',
		subtitle:
			'私たちは、情熱を持って仕事に取り組み、お客様に最高の結果を提供することに専念する多様な個性を持つチームです。',
		members: [
			{
				name: 'リギリ・ヤン',
				title: '共同創業者 / CEO',
				location: 'ブルターニュ、フランス',
				image: '/images/team/yann.png',
				alt: 'Tシャツを着たヤン'
			},
			{
				name: 'リギリ　聡美',
				title: '共同創業者 / COO',
				location: '青森県、日本',
				image: '/images/team/satomi.png',
				alt: '白いセーターを着た聡美'
			},
			{
				name: '高橋　俊夫',
				title: '販売マネージャー',
				location: '東京都、日本',
				image: '/images/team/takahashi.png',
				alt: 'スーツを着た高橋'
			},
			{
				name: 'カール=グスタフ・エクルンド',
				title: 'アドバイザー',
				location: 'ヨーテボリ、スゥエーデン',
				image: '/images/team/carl.png',
				alt: 'スーツを着たカール'
			}
		]
	},
	info: {
		title: '会社概要',
		companyName: {
			label: '会社名',
			value: 'zeteoh株式会社'
		},
		founded: {
			label: '設立',
			value: '2020年9月'
		},
		capital: {
			label: '資本金',
			value: '1,530万円'
		},
		location: {
			label: '所在地',
			value: '〒104-0028\n東京都中央区八重洲2丁目1-1\nYANMAR TOKYO 12階'
		},
		business: {
			label: '事業内容',
			value: '屋内位置測位ソリューションの開発・販売\n人工知能を活用したアプリケーション開発'
		}
	}
};
