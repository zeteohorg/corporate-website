import type { ExportTranslation } from '../types';

export const en: ExportTranslation = {
	tag: 'Export',
	title: 'Own Your Operational Data.Seamless CSV Export for Custom Analysis.',
	description:
		'Access the ground truth of your facility. Filter by operator, date range, or specific zones to download clean trajectory datasets. With spatial precision optimized for operational PDCA cycles, you have the flexibility to power your own internal analysis workflows and BI tools with confidence.',
	features: [
		'Narrow down data by worker, device, zone, or specific time windows.',
		'Direct access to timestamped coordinates for deep-dive spatial analysis.',
		'Ready to use with Excel, Tableau, Python, R, and other standard platforms.',
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
		'現場のありのままの動きを、加工しやすいデータ形式で。\n作業員、デバイス、期間、エリアを自由に組み合わせて、軌跡データを一括ダウンロード。現場改善のPDCAを回すために十分な精度を備えた位置データにアクセスできるため、自社独自の分析手法や既存のツールを最大限に活用できます。',
	features: [
		'作業員・デバイス・エリア・時間帯で、必要なデータだけをピンポイントに抽出',
		'タイムスタンプに紐づいた詳細な位置情報をCSV形式で提供',
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
