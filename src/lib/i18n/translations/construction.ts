import type { ConstructionTranslation } from '../types';

// Written as application ideas, not a customer case. Ideas that combine TRAILS
// with Astra (in development, e.g. audio recording is planned) are covered by
// the note at the end of the page.
export const en: ConstructionTranslation = {
	title: 'Ideas for TRAILS on construction sites',
	subtitle: 'Using location and video records for safer tunnel construction',
	challenges: {
		title: 'Common challenges on site',
		text: "In tunnel construction, excavation at the face and concrete lining further back often run at the same time, while dump trucks and mixer trucks move through a narrow space. Keeping a safe distance by sight alone is hard, and GPS doesn't reach underground. Adding beacons or other equipment every time the tunnel advances is also a burden. And a record of location alone doesn't tell you what was actually happening there.",
		items: [
			{
				title: 'Keeping clear of heavy machinery:',
				description:
					'In a narrow tunnel, it is hard to keep a safe distance between workers and vehicles by sight alone. After a near miss, it is hard to look back at what the situation actually was.'
			},
			{
				title: 'Vehicle waiting time:',
				description:
					"It's hard to see where vehicles wait during each excavation cycle, for how long, and why."
			},
			{
				title: 'Records and reports:',
				description:
					'Recording who did what work, where and when, and sorting out daily reports and photos, takes a lot of time.'
			}
		]
	},
	solutions: {
		title: 'Ideas for TRAILS × the Astra spatial AI camera',
		subtitle:
			"TRAILS needs no installed equipment. Pair it with Astra, a wearable spatial AI camera, and you can record each worker's location and first-person video at the same time, even inside a tunnel. Because you keep not just where they went but also what they saw there, it could be used in ways like these.",
		items: [
			{
				title: 'Review close calls with heavy machinery through location and video',
				description:
					'Use route records to find the places and times where workers tend to come close to vehicle lanes. The video from those moments shows the real conditions, such as the distance to the machinery, visibility and lighting. This could be used for safety training based on real scenes from your site, or to rethink the layout and traffic guidance.'
			},
			{
				title: 'See where vehicles wait, and why',
				description:
					'Find where waiting builds up from the positions of workers riding in vehicles. The video also shows what was happening in the tunnel at the time, such as how far the previous step had progressed or how vehicles were passing each other. It can be a starting point for rethinking how operations are scheduled.'
			},
			{
				title: 'Draft daily reports with AI',
				description:
					'By combining location with video and audio, AI organizes who did what work, where and when, and drafts a report. This could cut the time spent filling in forms and sorting photos.'
			},
			{
				title: 'Overlay tunnel conditions on a digital twin',
				description:
					'Overlay location and video on a digital twin to check conditions in the tunnel remotely as excavation advances. It can also help identify who was in which area during an emergency.'
			}
		]
	},
	note: '* The Astra spatial AI camera is currently in development. This page shows possible uses, and the actual product specifications may differ.'
};

export const ja: ConstructionTranslation = {
	title: '建設現場でのTRAILS活用アイデア',
	subtitle: 'トンネル工事の安全管理に、位置と映像の記録を活かす',
	challenges: {
		title: '現場でよく聞かれる課題',
		text: 'トンネル工事では、前方での掘削と後方でのコンクリート打設が同時に進み、ダンプトラックやミキサー車などの重機が狭い空間を行き来します。目視だけで車両との距離を保つのは難しく、坑内にはGPSも届きません。掘削が進むたびにビーコンなどの設備を増設するのも負担になります。さらに、位置だけを記録しても「その場所で何が起きていたか」までは分かりません。',
		items: [
			{
				title: '重機との接触事故の防止：',
				description:
					'狭い坑内では、作業員と重機の距離を目視だけで保つのが難しい。ヒヤリハットがあっても、どんな状況だったかを後から振り返りにくい。'
			},
			{
				title: '車両の待ち時間：',
				description:
					'掘削サイクルの中で、車両がどこでどれだけ待っているか、なぜ待ちが生じているかが見えにくい。'
			},
			{
				title: '作業記録・報告の負担：',
				description:
					'誰が、いつ、どこで、どんな作業をしたかの記録や、日報・写真の整理に手間がかかる。'
			}
		]
	},
	solutions: {
		title: 'TRAILS × 空間AIカメラ「Astra」の活用アイデア',
		subtitle:
			'TRAILSは設備の設置がいりません。これに装着型の空間AIカメラ「Astra」を組み合わせると、坑内でも作業員の位置と一人称視点の映像を同時に記録できます。「どこを通ったか」に加えて「そこで何を見ていたか」まで残るため、たとえば次のような使い方が考えられます。',
		items: [
			{
				title: '重機に近づいた場面を、位置と映像で振り返る',
				description:
					'動線の記録から、重機の通路に近づきやすい場所や時間帯を洗い出します。そのときの映像で、重機との距離感や視界、照明などの実際の状況も確認できます。現場の具体的な場面を使った安全教育や、配置・誘導の見直しに活かすことが考えられます。'
			},
			{
				title: '車両の待ちが生じる場所と、その理由を把握する',
				description:
					'車両に乗る作業員の位置から、待ちが生じている場所を確認します。あわせて、そのときの坑内の状況（前の工程の進み具合や、すれ違いの様子など）を映像で確かめられます。運行の段取りを見直すきっかけにできます。'
			},
			{
				title: '日報・報告書の下書きをAIでつくる',
				description:
					'位置情報に映像と音声を組み合わせ、誰が、いつ、どこで、どんな作業をしたかをAIが整理して、レポートの下書きを作ります。記入や写真整理の手間を減らすことが考えられます。'
			},
			{
				title: '坑内の状況をデジタルツインに重ねる',
				description:
					'位置と映像をデジタルツイン上に重ねれば、掘削の進み具合に合わせて坑内の状況を遠隔から確認できます。緊急時に、誰がどのエリアにいたかを把握する手がかりにもなります。'
			}
		]
	},
	note: '※空間AIカメラ「Astra」は現在開発中です。掲載の内容は活用イメージであり、実際の製品仕様とは異なる場合があります。'
};
