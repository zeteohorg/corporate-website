import type { ConstructionTranslation } from '../types';

export const en: ConstructionTranslation = {
	title: 'Construction Site Challenges and TRAILS Implementation',
	subtitle: 'Indoor Positioning System for Enhanced Tunnel Construction Safety',
	challenges: {
		title: 'Current solutions cannot effectively track worker and vehicle positions to address:',
		text: 'In tunnel construction sites, excavation and concrete lining work occur simultaneously, with 25-ton dump trucks and concrete mixer trucks operating in confined spaces. Visual monitoring alone is insufficient for maintaining safe distances between vehicles, forcing workers to rely on horns for position confirmation. The environment presents unique challenges: 100% humidity and the need to continuously install new positioning beacons as excavation progresses. Alternative solutions (cameras, SLAM, geomagnetic sensors) prove impractical under these harsh conditions.',
		items: [
			{
				title: '1. Safety Enhancement in Tunnels',
				description:
					' - Need to prevent collisions between heavy machinery/dump trucks and workers while ensuring comprehensive safety management.'
			},
			{
				title: '2. Reducing Vehicle Standby Time per Excavation Cycle',
				description: ' - Goal to optimize vehicle operations and improve productivity.'
			},
			{
				title: '3. Visualizing Construction Progress for Enhanced Productivity',
				description:
					' - Need to efficiently record and report when and where each worker performs their tasks.'
			}
		]
	},
	solutions: {
		title: 'What TRAILS Can Do',
		subtitle:
			'TRAILS is a next-generation location intelligence system that requires no infrastructure installation and enables:',
		items: [
			{
				title: 'Worker Safety Through Location Management',
				description:
					'Using smartphones and smartwatches, TRAILS sends real-time alerts when vehicles approach workers. The system continuously monitors the relative positions of workers and vehicles in tunnels to prevent accidents.'
			},
			{
				title: 'Efficient Vehicle Navigation in Tunnels',
				description:
					'Through predictive analytics, TRAILS optimizes vehicle movement. This ensures smooth traffic flow while maintaining safety standards.'
			},
			{
				title: 'Automated Work Documentation',
				description:
					'The system automatically records worker locations and activities, streamlining daily report creation. This significantly reduces paperwork while maintaining accurate records.'
			}
		]
	}
};

export const ja: ConstructionTranslation = {
	title: '建設現場の課題とTRAILSの活用',
	subtitle: 'トンネル建設現場での安全性を向上させる屋内位置測位',
	challenges: {
		title:
			'既存ソリューションでは作業員や車両の位置把握による以下のような取り組みを実施することができない',
		text: 'トンネル建設現場では、前方での掘削作業と後方でのコンクリート内張り作業が同時に行われ、25トンダンプトラックやコンクリートミキサー車などの重機が狭い空間を走行しています。車両間の安全な距離を保つために目視だけでは不十分で、作業員はクラクションを使用して位置を確認せざるを得ません。さらに、湿度が100%に達し、掘削が進むにつれて、新しい位置測定用のビーコンを継続的に設置する必要があります。その他のソリューション（カメラ、SLAM、地磁気センサー等）は、過酷な環境条件のため実用的ではありません。',
		items: [
			{
				title: '1.トンネル内の安全性の向上・・',
				description: '重機やダンプカーとの接触事故を防止し、作業員の安全管理の徹底を図りたい。'
			},
			{
				title: '2. 掘削サイクルタイム当たりの車両待機時間の減少・・',
				description: '車両の作業の効率化、生産性向上を図りたい。'
			},
			{
				title: '3. 工事進捗状況の見える化による生産性向上・・',
				description: 'どの作業員がいつ、どこで作業していたかを記録、報告の効率化を実現したい。'
			}
		]
	},
	solutions: {
		title: 'TRAILSでできること',
		subtitle:
			'インフラ設備を必要としない「TRAILS」次世代位置情報インテリジェンスによって、以下を可能にします。',
		items: [
			{
				title: '作業員の安全を守る位置情報管理',
				description:
					'スマートフォンやスマートウォッチを活用し、車両接近時にリアルタイムで警告を発信。トンネル内での作業員と車両の位置関係を常時把握し、事故を未然に防ぎます。'
			},
			{
				title: 'トンネル内の効率的な車両誘導',
				description:
					'予測分析技術により、車両の動きを最適化。渋滞を防ぎながら、安全で円滑な車両の運行を実現します。'
			},
			{
				title: '作業記録の自動化で業務効率向上',
				description:
					'作業員の位置情報や活動内容を自動的に記録し、日報作成を効率化。必要な書類作成の手間を大幅に削減しながら、正確な記録を維持します。'
			}
		]
	}
};
