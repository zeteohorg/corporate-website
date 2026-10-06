import type { LogisticsTranslation } from '../types';

// Written as application ideas for warehouses in general, not a customer case.
// Ideas that combine TRAILS with Astra (in development) are covered by the note
// at the end of the page.
export const en: LogisticsTranslation = {
	title: 'Ideas for TRAILS in logistics warehouses',
	subtitle: 'Record warehouse movement with location and video to rethink picking and operations',
	challenges: {
		title: 'Common challenges in warehouses',
		text: "In Japan, the overtime cap for truck drivers that took effect in April 2024 has made shorter loading waits and faster picking more important than ever. Yet how workers move inside a warehouse is rarely recorded, so it's hard to know where to improve. A record of routes alone doesn't explain why something took time. For operators with many sites, installing beacons or similar equipment at every site is also a heavy burden.",
		items: [
			{
				title: 'Equipment at every site:',
				description:
					'Beacons and other positioning equipment take time and money to install and tune, which makes rolling them out to every site difficult.'
			},
			{
				title: "Movement, and the reasons behind it, aren't visible:",
				description:
					"Who moved where during picking and transport isn't recorded. Nor is where people are searching or waiting, so there is little evidence to base improvements on."
			},
			{
				title: 'Know-how that is hard to pass on:',
				description:
					'Efficient routes and preparation depend on individual experience, which makes them hard to teach to new staff.'
			},
			{
				title: 'Managing high-value goods:',
				description:
					"When you store high-value goods for customers, you want a reliable record of who handled which item and when, and a way to trace what happened when stock doesn't match."
			}
		]
	},
	solutions: {
		title: 'Ideas for TRAILS × the Astra spatial AI camera',
		subtitle:
			"TRAILS needs no installed equipment. Pair it with Astra, a wearable spatial AI camera, and you can record each worker's location and first-person video at the same time. Every site can be recorded the same way, and you keep not just where people went but also what they saw there. Here are some ways it could be used.",
		items: [
			{
				title: 'Find where picking takes time, and why',
				description:
					"Use workers' routes to find long walks and crowded aisles. The video from those moments shows what was really happening, such as searching for items, hard-to-read labels or blocked aisles. This could be used to rethink the shelf layout, picking order and labeling."
			},
			{
				title: 'Trace delays in shipping preparation and loading waits',
				description:
					'From the movement and video of workers around the shipping docks, find moments when sorting or loading preparation falls behind. It can be a starting point for finding why trucks wait and rethinking how work is scheduled.'
			},
			{
				title: 'Use expert movement to train new staff',
				description:
					'Record how experienced workers move and work, with location and first-person video. Because the record shows which shelves they visit in what order and what they check along the way, it could be used to create training materials based on real work.'
			},
			{
				title: 'Keep a record of how high-value goods are handled',
				description:
					"In storage areas for high-value goods, record who handled which item, when and where, with location and video. It helps trace what happened when stock doesn't match. Having a record also discourages misconduct, and gives workers evidence that they did their work correctly."
			}
		]
	},
	note: '* The Astra spatial AI camera is currently in development. This page shows possible uses, and the actual product specifications may differ.'
};

export const ja: LogisticsTranslation = {
	title: '物流倉庫でのTRAILS活用アイデア',
	subtitle: '倉庫内の動きを位置と映像で記録して、ピッキングと運営を見直す',
	challenges: {
		title: '倉庫でよく聞かれる課題',
		text: '物流倉庫では、2024年4月に始まったトラックドライバーの時間外労働の上限規制をきっかけに、荷待ち時間の短縮やピッキングの効率化がこれまで以上に求められています。一方で、倉庫内で作業員がどう動いているかは記録に残りにくく、改善の手がかりをつかみにくいのが実情です。動線だけを記録しても、なぜそこで時間がかかったのかまでは分かりません。拠点が多い場合は、ビーコンなどの設備を全拠点に設置するのも大きな負担になります。',
		items: [
			{
				title: '拠点ごとの設備の負担：',
				description:
					'ビーコンなどの測位設備は、設置や調整に時間とコストがかかり、全拠点への展開が難しい。'
			},
			{
				title: '作業員の動きと、その理由が見えない：',
				description:
					'ピッキングや運搬で、誰がどこをどう動いたかが記録に残らない。どこで探したり待ったりしているのかも分からず、改善の根拠にしにくい。'
			},
			{
				title: '熟練者のノウハウが伝わりにくい：',
				description: '効率のよい回り方や段取りが個人の経験に頼っていて、新人に伝えにくい。'
			},
			{
				title: '高額商品の管理：',
				description:
					'お客様から高額な商品を預かっているため、誰がいつ商品を扱ったかを確実に残したい。在庫差異が出たときに、経緯をたどる手がかりがほしい。'
			}
		]
	},
	solutions: {
		title: 'TRAILS × 空間AIカメラ「Astra」の活用アイデア',
		subtitle:
			'TRAILSは設備の設置がいりません。これに装着型の空間AIカメラ「Astra」を組み合わせると、作業員の位置と一人称視点の映像を同時に記録できます。複数の拠点でも同じ方法で記録を取れるうえ、「どこを通ったか」に加えて「そこで何を見ていたか」まで残ります。たとえば次のような使い方が考えられます。',
		items: [
			{
				title: 'ピッキングで時間がかかる場所と、その理由を見直す',
				description:
					'作業員の動線から、移動が長くなっている場所や混み合う通路を確認します。そのときの映像で、商品を探している、表示が見づらい、通路がふさがっているといった実際の状況も確かめられます。棚の配置やピッキングの順番、表示の見直しに活かすことが考えられます。'
			},
			{
				title: '出荷準備の遅れと荷待ちの原因を探る',
				description:
					'出荷バース周りの作業員の動きと映像から、荷揃えや積み込みの準備が遅れている場面を確認します。トラックの荷待ちが生じる原因を探り、段取りを見直すきっかけにできます。'
			},
			{
				title: '熟練者の動きを、新人教育に活かす',
				description:
					'熟練者の回り方や手順を、位置と一人称視点の映像で記録します。どの順番で棚を回り、どこで何を確認しているかが残るので、実際の作業に沿った教育資料づくりに活かすことが考えられます。'
			},
			{
				title: '高額商品の取り扱いを記録に残す',
				description:
					'高額品の保管エリアで、誰が、いつ、どこで商品を扱ったかを、位置と映像で記録します。在庫差異が出たときに経緯をたどる手がかりになります。記録が残ること自体が不正の抑止にもつながり、作業員にとっては正しく作業したことを示す材料になります。'
			}
		]
	},
	note: '※空間AIカメラ「Astra」は現在開発中です。掲載の内容は活用イメージであり、実際の製品仕様とは異なる場合があります。'
};
