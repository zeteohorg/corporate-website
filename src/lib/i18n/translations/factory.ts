import type { FactoryTranslation } from '../types';

export const en: FactoryTranslation = {
	title: 'Manufacturing Site Challenges and TRAILS Implementation',
	subtitle: 'Real-time Indoor Positioning for Enhanced Manufacturing Efficiency',
	challenges: {
		title: 'Typical Challenges in Manufacturing Sites',
		text: 'In manufacturing, worker movement significantly impacts productivity. In 24-hour manufacturing lines, the following challenges arise due to variations in workload by time period and individual work variations.',
		items: [
			{
				title: 'Personnel Allocation Issues',
				description:
					'Simultaneous occurrence of understaffed and overstaffed processes - In factories with around 100 workers, opportunity losses of hundreds of thousands of yen occur daily. While workers are on standby in some processes, other processes are understaffed, leading to reduced productivity. Shift work and varying workloads by time period make this problem more serious.'
			},
			{
				title: 'Delayed Response Due to Unknown Worker Location',
				description:
					'When quality issues or equipment malfunctions occur, time is wasted identifying and locating workers who can respond. This leads to extended line stoppage time and increased quality risks.'
			},
			{
				title: 'Difficulty in Fair Personnel Evaluation',
				description:
					"Worker operation status relies on managers' subjective observations, making accurate evaluation difficult. Especially for multi-skilled workers handling multiple processes, their contributions cannot be properly evaluated, hindering fair assessment and skill development opportunities."
			}
		]
	},
	solutions: {
		title: 'What TRAILS Can Do',
		subtitle: 'Real-time indoor positioning to improve factory operations productivity',
		items: [
			{
				title: '1. Location Intelligence',
				description:
					'Visualize worker movement using positioning technology with wearable devices. Achieve stable location information acquisition at lower initial costs compared to traditional beacons and Wi-Fi. Support quick decision-making by understanding manufacturing site conditions in real-time.'
			},
			{
				title: '2. AI-Powered Auto-Tasking',
				description:
					'AI analyzes collected location and work data to automatically generate optimal work instructions. Workers receive automatic notifications about their next tasks through wearable devices. This enables efficient personnel allocation while reducing manager workload.'
			},
			{
				title: '3. Data-Driven Human Resource Development',
				description:
					'Automatically collect and analyze operational data by individual and process, providing objective evaluation metrics. This supports fair personnel evaluation and individual worker skill improvement.'
			}
		]
	}
};

export const ja: FactoryTranslation = {
	title: '製造現場の課題とTRAILSの活用',
	subtitle: '工場での作業の生産性を向上させるリアルタイム屋内測位',
	challenges: {
		title: '現場で起きている典型的な問題',
		text: '製造業では、作業員の動きが生産性を大きく左右します。24時間稼働の製造ラインでは、時間帯による作業量の変動や個人の作業のばらつきにより、以下のような課題が発生しています。',
		items: [
			{
				title: '人員配置の問題',
				description:
					'人員不足の工程と人員過剰の工程が同時に発生 - 作業員100名規模の工場で、一日あたり数十万円の機会損失が発生。ある工程では作業者が待機している一方で、別の工程では人手が足りず生産性が低下するといった状況が日常的に起きています。シフト制による複雑な人員配置や、時間帯による作業量の変動が、この問題をより深刻にしています。'
			},
			{
				title: '作業員の所在が把握できず、緊急時の対応が遅れる',
				description:
					'品質トラブルや設備の不具合が発生した際、対応できる作業員の特定と位置の把握に時間がかかっています。これにより、ライン停止時間の延長や品質リスクの増大につながっています。'
			},
			{
				title: '客観的な稼働データがなく、適切な人事評価が困難',
				description:
					'作業者の稼働状況は、管理者の主観的な観察に依存しており、正確な評価が難しい状況です。特に、複数工程を担当する多能工作業員の場合、その貢献度を適切に評価することができず、公平な評価やスキル開発の機会創出につながっていません。'
			}
		]
	},
	solutions: {
		title: 'TRAILSでできること',
		subtitle: '工場での作業の生産性を向上させるリアルタイム屋内測位',
		items: [
			{
				title: '1. 位置情報インテリジェンス',
				description:
					'ウェアラブルデバイスを活用した位置測位技術により、作業員の動きを可視化。従来のビーコンやWi-Fiと比べて、初期コストを抑えながら安定した位置情報の取得を実現します。製造現場の状況をリアルタイムで把握し、迅速な意思決定をサポートします。'
			},
			{
				title: '2. AIを活用したオートタスキング',
				description:
					'収集した位置情報と作業データをAIが分析し、最適な作業指示を自動で生成。作業員にはウェアラブルデバイスを通じて、次に行うべき作業が自動的に通知されます。これにより、管理者の負担を軽減しながら、効率的な人員配置を実現します。'
			},
			{
				title: '3. データドリブンな人材育成を支援',
				description:
					'個人別・工程別の稼働データを自動で収集・分析し、客観的な評価指標を提供。これにより、公平な人事評価とともに、個々の作業員のスキル向上をサポートします。'
			}
		]
	}
};
