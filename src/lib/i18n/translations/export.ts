import type { ExportTranslation } from '../types';

export const en: ExportTranslation = {
	tag: 'Export',
	title: 'Own Your Operational Data. Seamless CSV Export for Workflow Analysis.',
	description:
		'Access a clear, unfiltered view of your facility’s operations. Filter by team roles, date range, or specific work zones to download high-fidelity trajectory datasets. With spatial precision designed for optimizing operational safety and efficiency, you gain the clarity needed to improve the work environment using your existing analysis tools.',
	features: [
		'Narrow down data by functional area, specific role, or time window to focus on high-impact zones.',
		'Direct access to timestamped coordinates, providing the insights required for effective safety auditing and motion optimization.',
		'Ready to use with Excel, Tableau, Python, R, and other standard analysis platforms.',
	],
	mockup: {
		titlebar: 'Export Trajectories',
		dateStart: '2025-02-01',
		dateEnd: '2025-02-14',
		columns: {
			trajectory: 'Location records',
			deviceId: 'Device ID',
			points: 'Duration'
		},
		workers: [
			{
				name: 'Operator A — Assembly',
				deviceId: 'GP8-0006',
				points: '42h 15m',
				color: 'red'
			},
			{
				name: 'Operator B — Production',
				deviceId: 'SG10-0011',
				points: '38h 30m',
				color: 'blue'
			},
			{
				name: 'Operator C — Logistics',
				deviceId: 'ASG-0042',
				points: '35h 45m',
				color: 'green'
			}
		],
		footer: {
			selected: 'selected',
			exportButton: 'Export CSV',
			downloading: 'Generating...',
			ready: 'Ready'
		},
		toast: {
			filename: 'trajectories_2025-02.csv',
			details: '80h 45m tracked · 2.8 MB'
		}
	}
};

export const ja: ExportTranslation = {
	tag: 'エクスポート',
	title: '動線の生データをCSV出力。自社の分析フローに、そのまま組み込む。',
	description:
		'現場全体の動きを、プライバシーと実用性のバランスを保ったデータ形式で。役割、期間、エリアを組み合わせて、軌跡データを一括ダウンロード。安全性の向上やプロセスの改善に十分な精度を備えた位置データを提供するため、自社独自の分析手法や既存のツールを最大限に活用できます。',
	features: [
		'役割、エリア、時間帯ごとにデータを抽出し、現場のボトルネックを特定',
		'動線分析や安全対策のシミュレーションに十分な精度の座標データをCSVで提供',
		'Excel、Tableau、Pythonなど、使い慣れた環境ですぐに分析可能',

	],
	mockup: {
		titlebar: '動線データのエクスポート',
		dateStart: '2025-02-01',
		dateEnd: '2025-02-14',
		columns: {
			trajectory: '動作データ',
			deviceId: 'デバイスID',
			points: '期間'
		},
		workers: [
			{
				name: 'オペレーター A — 組立工程',
				deviceId: 'GP8-0006',
				points: '42h 15m',
				color: 'red'
			},
			{
				name: 'オペレーター B — 生産工程',
				deviceId: 'SG10-0011',
				points: '38h 30m',
				color: 'blue'
			},
			{
				name: 'オペレーター C — 物流工程',
				deviceId: 'ASG-0042',
				points: '35h 45m',
				color: 'green'
			}
		],
		footer: {
			selected: '件選択中',
			exportButton: 'CSVをエクスポート',
			downloading: '生成中...',
			ready: '準備完了'
		},
		toast: {
			filename: 'trajectories_2025-02.csv',
			details: '80h 45m 追跡 · 2.8 MB'
		}
	}
};
