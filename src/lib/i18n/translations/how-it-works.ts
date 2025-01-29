import type { HowItWorksTranslation } from '../types';

export const en: HowItWorksTranslation = {
	title: 'TRAILS System',
	steps: [
		{
			title: 'AI Engine × Wearable Devices',
			description: 'Wearable devices equipped with an AI engine process sensor data.'
		},
		{
			title: 'API',
			description:
				'Location information is sent to the cloud, and users can access it via an application connected to the API.'
		},
		{
			title: 'Dashboard',
			description: 'Real-time location information of each user can be shared and viewed.'
		}
	]
};

export const ja: HowItWorksTranslation = {
	title: 'TRAILSの仕組み',
	steps: [
		{
			title: 'AIエンジン × ウェアラブルデバイス',
			description: 'AIエンジンが実装されたウェアラブルデバイスがセンサーデータを処理します。'
		},
		{
			title: 'API',
			description:
				'位置情報はクラウドに送られ、ユーザーはAPIとつながったアプリケーションにアクセスします。'
		},
		{
			title: 'ダッシュボード',
			description: '各自の端末で各従業員のリアルタイムの位置情報を共有、確認できます。'
		}
	]
};
