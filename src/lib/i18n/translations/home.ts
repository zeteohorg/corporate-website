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
				value: '23%',
				label: 'Average reduction in non-value-added movement',
				colorClass: 'text-[#ff3b3b]'
			},
			{
				value: '< 3 days',
				label: 'From install to first insights',
				colorClass: 'text-[#3b8eff]'
			},
			{
				value: '¥4.2M',
				label: 'Avg. annual savings per factory',
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
		title: 'すべての動きを見える化。\nあらゆる無駄を削減。結果は数日で。',
		subtitle:
			'Spatial AI が現場を変える——スマートフォンだけでリアルタイムの動線分析を実現。センサー不要、インフラ不要、環境を選ばない。',
		getStarted: 'PoCから始める',
		learnMore: '詳しく見る',
		stats: [
			{
				value: '23%',
				label: '非付加価値動作の平均削減率',
				colorClass: 'text-[#ff3b3b]'
			},
			{
				value: '< 3日',
				label: '設置から最初のインサイトまで',
				colorClass: 'text-[#3b8eff]'
			},
			{
				value: '¥4.2M',
				label: '工場あたりの平均年間節約額',
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
