import type { ExportTranslation } from '../types';

export const en: ExportTranslation = {
	tag: 'Export',
	title: 'Export Raw Trajectory Data as CSV',
	description:
		'Select any combination of Assigned operators, pick a date range, and download the full trajectory dataset — timestamps, coordinates, device IDs, and computed metrics — as a clean CSV ready for your own analysis tools.',
	features: [
		'Filter by worker, device, zone, or time window',
		'Includes raw coordinates + derived metrics',
		'Compatible with Excel, Python, R, Tableau',
		'Scheduled automated exports available'
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
	title: 'CSV形式で動線データをエクスポート',
	description:
		'追跡対象者の任意の組み合わせを選択し、期間を指定して、完全な動線データセット（タイムスタンプ、座標、デバイスID、計算されたメトリクス）を、分析ツールですぐに使えるクリーンなCSVとしてダウンロードできます。',
	features: [
		'作業者、デバイス、ゾーン、時間枠でフィルタリング',
		'生の座標と派生メトリクスを含む',
		'Excel、Python、R、Tableauと互換性あり',
		'スケジュール化された自動エクスポートが利用可能'
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
