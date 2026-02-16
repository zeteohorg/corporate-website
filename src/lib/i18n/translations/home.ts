import type { HomeTranslation } from '../types';

export const en: HomeTranslation = {
	hero: {
		title: 'See every step.\nReduce every waste. Results in days.',
		subtitle:
			"Powered by Spatial AI — real-time motion analytics from your team's smartphones. No sensors. No infrastructure. No environment constraints.",
		getStarted: 'Request a Pilot',
		learnMore: 'Learn more',
		stats: [
			{
				value: '30%',
				label: 'McKinsey research shows 30% of frontline time is wasted on "muda" like searching and walking.',
				colorClass: 'text-[#ff3b3b]'
			},
			{
				value: '< 3 days',
				label: 'Zero downtime. Start visualizing trajectories within days using only smartphones.',
				colorClass: 'text-[#3b8eff]'
			},
			{
				value: '¥1.6M',
				label: 'For a 100-worker facility, "wasteful movement" translates to over $1.1M in lost productivity annually.',
				colorClass: 'text-[#2dd4a0]'
			}
		]
	},
	useCases: {
		title: 'Beyond Efficiency: Strategic Advantages',
		subtitle: "Your positioning data does more than solve today's bottlenecks:",
		items: [
			{
				title: 'Standardize best methods',
				description:
					'Identify your most efficient workflows and operators, then standardize excellence across teams through targeted training.'
			},
			{
				title: 'Future-Proof Investment',
				description:
					"Build the digital foundation for tomorrow's smart factory—AI optimization, predictive analytics, and automation—without ripping out infrastructure later."
			}
		]
	}
};

export const ja: HomeTranslation = {
	hero: {
		title: '現場のムダを「見える化」して、\n生産性を劇的に変える。',
		subtitle:
			'空間AIが、従業員のスマートフォンだけで動線を可視化します。\n設備投資ゼロ、設置工事不要。\n現場を止めることなく、数日で動線分析を開始することができます。',
		getStarted: 'PoCから始める',
		learnMore: '詳しく見る',
		stats: [
			{
				value: '30%',
				label: '現場の時間の3割が移動や探索などの「ムダ」に消えています。\n※マッキンゼーの調査による',
				colorClass: 'text-[#ff3b3b]'
			},
			{
				value: '最短3日',
				label: '現場を止めず、スマートフォンのみで数日以内に動線の可視化をスタート。',
				colorClass: 'text-[#3b8eff]'
			},
			{
				value: '年間1.6億円',
				label: '100人規模の工場では、この「ムダな動き」が年間約1.65億円もの損失に相当します。',
				colorClass: 'text-[#2dd4a0]'
			}
		]
	},
	useCases: {
		title: '効率化から戦略的優位性へ',
		subtitle: '位置データが解決するのは、今日のボトルネックだけではありません：',
		items: [
			{
				title: '成功事例の横展開',
				description:
					'最も効率的な働き方や優秀なオペレーターをデータで特定。その知見を基に、チーム全体のパフォーマンスを底上げし、組織としての強みを確立します。'
			},
			{
				title: '未来への布石となる投資',
				description:
					'AIによる最適化や予測分析、自動化といった、将来のスマートファクトリーに不可欠なデジタル基盤を今から構築。後から大規模な設備投資をすることなく、未来を見据えた経営を実現します。'
			}
		]
	}
};
