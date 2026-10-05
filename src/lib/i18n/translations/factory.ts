import type { FactoryTranslation } from '../types';

// Written as application ideas, not a customer case. Ideas that combine TRAILS
// with Astra (in development, e.g. audio recording and 3D hand pose estimation)
// are covered by the note at the end of the page.
export const en: FactoryTranslation = {
	title: 'Ideas for TRAILS in manufacturing',
	subtitle: 'Record how people move and work on the factory floor to rethink staffing and training',
	challenges: {
		title: 'Common challenges on site',
		text: "In manufacturing, how workers move has a big effect on productivity. On lines that run 24 hours a day, workloads shift with the time of day, and the way work is done varies from person to person. Yet where and how workers move is rarely recorded, so it's hard to know where to improve. A record of routes alone doesn't explain why someone's work stopped at a certain spot.",
		items: [
			{
				title: 'Uneven staffing across processes:',
				description:
					'Some processes have workers standing by while others are short-handed. Shift work and workloads that change with the time of day make staffing even harder.'
			},
			{
				title: 'Slow first response to problems:',
				description:
					'When a quality issue or equipment fault occurs, it takes time to find out where the workers who can handle it are. Recording and reporting what happened also takes effort.'
			},
			{
				title: 'Expert skills that are hard to pass on:',
				description:
					"Experienced workers' preparation and techniques rarely make it into manuals, and are lost when they retire."
			},
			{
				title: 'Hard to see what multi-skilled workers contribute:',
				description:
					"Knowing who is working where depends on managers' observation. It is hard to objectively capture the contribution of workers who cover several processes, or how skilled they are at each one."
			}
		]
	},
	solutions: {
		title: 'Ideas for TRAILS × the Astra spatial AI camera',
		subtitle:
			"TRAILS needs no installed equipment. Pair it with Astra, a wearable spatial AI camera, and you can record each worker's location and first-person video at the same time, even while the factory is running. You keep not just where people were but also what they saw and did there. Here are some ways it could be used.",
		items: [
			{
				title: 'See uneven staffing across processes, and why',
				description:
					'Use location records to see how many people were at each process at each time of day. For processes with a lot of waiting, the video from those moments shows the reasons, such as waiting for parts or changeovers. This could be used as input for rethinking shifts and staffing.'
			},
			{
				title: 'Respond to problems faster and keep a record',
				description:
					'When a fault occurs, location records can help find which workers are nearby. Based on video and audio from the response, AI could also organize what happened and how it was handled, and draft a report.'
			},
			{
				title: "Preserve experts' skills with video and routes",
				description:
					"Record experienced workers' tasks with location and first-person video. Because the record shows which equipment they visit in what order and what they check along the way, it could be used to pass on skills and create training materials."
			},
			{
				title: 'Make multi-skilled work visible and use it for development',
				description:
					"Use location records to see, by person and by process, how much work was done at each process. With Astra's 3D hand pose estimation capturing hand movements during work, you could also compare steps and movements with those of experienced workers. This could help you understand the range of processes each person covers and their skill at each one, as input for fair evaluation and for deciding which processes and skills to learn next."
			}
		]
	},
	note: '* The Astra spatial AI camera is currently in development. This page, including 3D hand pose estimation, shows possible uses, and the actual product specifications may differ.'
};

export const ja: FactoryTranslation = {
	title: '製造現場でのTRAILS活用アイデア',
	subtitle: '工場での人の動きと作業の様子を記録して、配置と育成を見直す',
	challenges: {
		title: '現場でよく聞かれる課題',
		text: '製造業では、作業員の動きが生産性を大きく左右します。24時間稼働の製造ラインでは、時間帯による作業量の変動や、個人による作業のばらつきが起きやすくなります。一方で、作業員がどこで、どう動いているかは記録に残りにくく、改善の手がかりをつかみにくいのが実情です。動線だけを記録しても、なぜそこで手が止まっていたのかまでは分かりません。',
		items: [
			{
				title: '工程ごとの人員の偏り：',
				description:
					'ある工程では作業者が待機している一方、別の工程では人手が足りないといった状況が起きる。シフト制や時間帯による作業量の変動が、配置をさらに難しくしている。'
			},
			{
				title: 'トラブル時の初動の遅れ：',
				description:
					'品質トラブルや設備の不具合が起きたとき、対応できる作業員がどこにいるかを把握するのに時間がかかる。何が起きたかの記録や報告にも手間がかかる。'
			},
			{
				title: '熟練者の技能が引き継がれにくい：',
				description:
					'熟練者の段取りや作業のコツはマニュアルに残りにくく、退職とともに失われていく。'
			},
			{
				title: '多能工の貢献と習熟度が見えにくい：',
				description:
					'稼働状況の把握が管理者の観察に頼っている。複数の工程を担当する作業員の貢献や、工程ごとの習熟度を客観的に捉えにくい。'
			}
		]
	},
	solutions: {
		title: 'TRAILS × 空間AIカメラ「Astra」の活用アイデア',
		subtitle:
			'TRAILSは設備の設置がいりません。これに装着型の空間AIカメラ「Astra」を組み合わせると、稼働中の工場でも作業員の位置と一人称視点の映像を同時に記録できます。「どこにいたか」に加えて「そこで何を見て、何をしていたか」まで残ります。たとえば次のような使い方が考えられます。',
		items: [
			{
				title: '工程ごとの人の偏りと、その理由を把握する',
				description:
					'作業員の位置の記録から、時間帯ごとに各工程に何人いたかを確認します。待機が多い工程では、そのときの映像で部材待ちや段取り替えなどの理由も確かめられます。シフトや人員配置を見直す材料にすることが考えられます。'
			},
			{
				title: 'トラブル時の対応を早め、記録を残す',
				description:
					'不具合が起きたとき、近くにいる作業員を位置の記録から確認する手がかりにできます。対応中の映像と音声をもとに、何が起きて、どう対応したかをAIが整理し、報告書の下書きを作ることも考えられます。'
			},
			{
				title: '熟練者の技能を、映像と動線で残す',
				description:
					'熟練者の作業を、位置と一人称視点の映像で記録します。どの順番で設備を回り、どこで何を確認しているかが残るので、技能の伝承や教育資料づくりに活かすことが考えられます。'
			},
			{
				title: '多能工の働きを見える化し、育成に活かす',
				description:
					'個人別・工程別に、どの工程でどれだけ作業したかを位置の記録から確認します。さらに、Astraの3Dハンドポーズ推定で作業中の手の動きを捉えれば、熟練者との手順や動きの違いも比べられます。担当工程の広がりや工程ごとの習熟度を把握し、公平な評価や、次に身につけるべき工程・技能を考える材料にすることが考えられます。'
			}
		]
	},
	note: '※空間AIカメラ「Astra」は現在開発中です。3Dハンドポーズ推定を含め、掲載の内容は活用イメージであり、実際の製品仕様とは異なる場合があります。'
};
