import type { LogisticsTranslation } from '../types';

export const en: LogisticsTranslation = {
	title: 'Logistics Industry Challenges and TRAILS Implementation',
	subtitle: 'Real-time Indoor Positioning to Improve Productivity in Logistics Warehouses',
	challenges: {
		title: 'Existing solutions cannot implement the following initiatives:',
		text: 'A major logistics company with 50 operational centers and nearly 100 warehouses is currently using 200 beacons and smartphones to track approximately 50 workers out of every 100 warehouse staff. With stricter regulations on truck driver overtime implemented in 2024, reducing waiting times and improving logistics costs while maintaining worker engagement have become critical challenges. Warehouse operation efficiency and faster picking times are now essential priorities.',
		items: [
			{
				title: 'Maximizing Operational Efficiency Across All Facilities: ',
				description:
					'The current system installation of beacons time and cost make it difficult to deploy across all facilities. With limited worker movement analysis and required manual adjustments, the system cannot achieve efficient tracking and analysis across all locations.'
			},
			{
				title: 'Worker Health Management and Vital Sign Monitoring:',
				description:
					'There is no suitable indoor positioning solution for tracking worker locations and monitoring health conditions in harsh environments such as refrigerated warehouses and containers.'
			},
			{
				title: 'Additional Operational Challenges:',
				description:
					'in inventory management, while significant time is spent on manual visual product inspection, temperature control for refrigerated trucks and inventory location tracking are required. There is also a need to understand warehouse inventory movement patterns and optimize storage fee calculations.'
			}
		]
	},
	solutions: {
		title: 'What TRAILS Can Do',
		subtitle: 'Real-time indoor positioning to improve logistics operations productivity',
		items: [
			{
				title: '1. Real-time Location Tracking and Health Monitoring',
				description:
					'Using smartphones and smartwatches, TRAILS provides real-time tracking of worker locations and health conditions (heart rate, stress levels). This enables early detection of abnormalities and prevents injuries.'
			},
			{
				title: '2.AI-Powered Movement Analysis and Operations Optimization',
				description:
					'AI analyzes worker movements to suggest optimal picking routes. The system continuously improves warehouse layouts based on seasonal trends, product categories, and historical data patterns.'
			},
			{
				title: '3. Facility-Wide Efficiency Enhancement',
				description:
					'Centralized management of data across all facilities enables efficient space utilization and reduced picking times. This improves operational efficiency while enhancing worker safety and satisfaction.'
			}
		]
	}
};

export const ja: LogisticsTranslation = {
	title: '物流の現場での課題とTRAILSの活用',
	subtitle: '物流倉庫での作業の生産性を向上させるリアルタイム屋内測位',
	challenges: {
		title: '既存のソリューションでは以下のような取り組みを実施できない',
		text: '運営拠点50カ所、倉庫約100カ所を持つ大手物流企業では、現在200個のビーコンとスマートフォンを使用して、倉庫スタッフ100人あたり約50人の作業員の追跡を行っています。2024年にトラック運転手の残業規制が強化されたことを受け、待機時間の削減と物流コストの改善を、作業員のモチベーションを維持しながら実現することが重要な課題となっており、倉庫運営の効率化とピッキング時間の短縮が、今や最優先事項となっています。',
		items: [
			{
				title: '全施設での業務効率化の最大化：',
				description:
					'現行のビーコンシステムでは、設置時間とコストの問題から全施設への展開が難しく、作業員の動き分析による業務改善が限定的となっており、手動での調整作業も必要なため、効率的な全施設の追跡・分析を実現できていません。'
			},
			{
				title: '作業員の健康管理とバイタルサイン監視：',
				description:
					'冷蔵倉庫やコンテナなどの過酷な環境下での作業員の位置情報把握や、健康状態モニタリングが必要となっているが、適合する屋内位置測位ソリューションがない。'
			},
			{
				title: 'その他の運用課題:',
				description:
					'在庫管理においては、商品画像の手動確認に時間を要し、冷蔵トラックの温度管理や在庫位置の追跡が必要とされる中、倉庫内での在庫移動パターンを把握し保管料金の最適化を図ることが求められています。'
			}
		]
	},
	solutions: {
		title: 'TRAILSでできること',
		subtitle: '物流倉庫での作業の生産性を向上させるリアルタイム屋内測位',
		items: [
			{
				title: 'リアルタイムな位置情報と健康管理',
				description:
					'スマートフォンとスマートウォッチを活用し、作業員の位置情報と健康状態（心拍数、ストレスレベル）をリアルタイムで把握。異常の早期発見と事故防止を実現します。'
			},
			{
				title: 'AIによる動線分析と業務最適化',
				description:
					'作業員の動きをAIで分析し、最適なピッキングルートを提案。季節トレンドや商品カテゴリー、過去のデータパターンに基づき、倉庫レイアウトを継続的に改善します。'
			},
			{
				title: '施設全体の効率向上',
				description:
					'全施設のデータを一元管理し、スペース活用の効率化とピッキング時間の短縮を実現。作業員の安全性と満足度を高めながら、運営効率を向上させます。'
			}
		]
	}
};
