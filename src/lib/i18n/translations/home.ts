import type { HomeTranslation } from '../types';

export const en: HomeTranslation = {
	hero: {
		title: 'Location Intelligence, inside out',
		subtitle: 'We capture how people and objects move, bringing new insights to business. Our solution works right away without special equipment. We help improve operations by analyzing traffic flow and designing better movement paths.',
		getStarted: 'Schedule a meeting',
		learnMore: 'Contact us'
	},
	useCases: {
		title: 'Use Cases: Transforming Industries',
		items: [
			{
				title: 'Manufacturing & Energy',
				description:
					'Enhance worker safety through real-time positioning. Enable immediate incident detection and response for improved operational efficiency in power plants and factories.'
			},
			{
				title: 'Critical Infrastructure',
				description:
					'Streamline maintenance operations in tunnels and underground facilities. Reduce maintenance costs and increase facility uptime through real-time progress visualization.'
			},
			{
				title: 'Transportation Hubs',
				description:
					'Optimize airport and station operations. Improve visitor satisfaction through strategic staff placement and enhanced security. Enable seamless navigation with real-time positioning.'
			}
		]
	}
};

export const ja: HomeTranslation = {
	hero: {
		title: 'Location Intelligence, inside out',
		subtitle: '人の動きを正確に把握する技術で、ビジネスに新たな視点をもたらします。専用機器の設置なしで、すぐに始められる画期的なソリューション。人の流れの分析や効率的な動線設計など、具体的な経営改善とビジネス価値の創出を実現します。',
		getStarted: 'お打ち合わせを設定する',
		learnMore: 'お問い合わせをする'
	},
	useCases: {
		title: 'ビジネス変革を加速するユースケース',
		items: [
			{
				title: '産業施設',
				description:
					'作業員の位置をリアルタイムで把握し、安全性を強化。プラントや工場での作業効率を向上。'
			},
			{
				title: '重要インフラ施設',
				description:
					'トンネルや地下施設での保守点検作業を効率化。作業進捗の可視化により、メンテナンスコストを削減し、施設稼働率を向上。'
			},
			{
				title: '交通ハブ',
				description:
					'空港・駅での施設運営を最適化。スタッフの適切な配置とセキュリティ強化により、利用者満足度を向上。リアルタイムのナビゲーションで、スムーズな導線を実現。'
			}
		]
	}
};
