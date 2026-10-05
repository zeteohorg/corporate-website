/**
 * Top page copy (docs/spec.md).
 *
 * Source: the wireframes in docs/wireframe/ (pc-ja.png / pc-en.png / sp-*.png),
 * plus the spec's「コピー原稿にない追加文言」table. The spec names the copy
 * document (docs/copy-ja.md) as the source of truth for Japanese; it isn't in
 * the repo yet, so every string here must be checked against it once it lands.
 */

export type ImageCopy = { alt: string };

export type ProductCopy = {
	name: string;
	status: string;
	catch: string;
	scale: string;
	records: string;
	tags: string[];
	link: string;
	image: ImageCopy;
};

export type TopTranslation = {
	/** <head>: og:description reuses description */
	meta: { title: string; description: string; ogTitle: string; ogImage: string };
	announcement: { badge: string; full: string; short: string };
	nav: {
		products: string;
		productsHint: string;
		trails: string;
		astra: string;
		trailsNote: string;
		astraBadge: string;
		useCases: string;
		apply: string;
		applyShort: string;
		openMenu: string;
		closeMenu: string;
		menuTitle: string;
		langSwitch: string;
	};
	hero: {
		award: string;
		/** スマホでは賞を2行に分け、Astra初公開は省く */
		awardLines: [string, string];
		launch: string;
		title: string;
		subtitle: string;
		primary: string;
		secondary: string;
		/** Worker wearing Astra (cut-out photo in front) */
		image: ImageCopy;
		/** Digital twin with animated routes behind the worker */
		background: ImageCopy;
	};
	/** note: optional caveat under the figure (未確定事項 #10) */
	stats: Array<{ value: string; label: string; note?: string }>;
	awards: { title: string };
	problem: {
		eyebrow: string;
		title: string;
		lead: string;
		recorded: { title: string; items: string[] };
		notRecorded: { title: string; items: string[] };
		closing: string;
	};
	products: {
		eyebrow: string;
		title: string;
		lead: string;
		tabsLabel: string;
		trails: ProductCopy;
		astra: ProductCopy;
		scenes: Array<{ key: string; label: string }>;
	};
	astra: {
		eyebrow: string;
		title: string;
		lead: string;
		image: ImageCopy;
		values: Array<{ title: string; body: string }>;
		rd: {
			title: string;
			lead: string;
			items: Array<{ caption: string; image: ImageCopy }>;
		};
		note: string;
		cta: string;
	};
	benefits: {
		eyebrow: string;
		title: string;
		items: Array<{ title: string; body: string }>;
	};
	evidence: {
		eyebrow: string;
		title: string;
		main: { company: string; result: string; date: string; link: string };
		items: Array<{ label: string; body: string }>;
	};
	vision: {
		eyebrow: string;
		title: string;
		body: string;
		steps: Array<{ title: string; body: string }>;
		closing: string;
	};
	poc: {
		eyebrow: string;
		title: string;
		lead: string;
		targetsTitle: string;
		targets: string[];
		flowTitle: string;
		flow: string[];
		form: {
			inquiryType: string;
			inquiryOptions: { astra_poc: string; demo: string; vendor: string; other: string };
			name: string;
			email: string;
			company: string;
			jobTitle: string;
			siteType: string;
			siteTypes: {
				factory: string;
				construction: string;
				warehouse: string;
				infrastructure: string;
				other: string;
			};
			headcount: string;
			headcountOptions: { none: string; small: string; medium: string; large: string };
			source: string;
			sourceCeatec: string;
			message: string;
			submit: string;
			sending: string;
			required: string;
			sendError: string;
		};
	};
	news: {
		newsTitle: string;
		blogTitle: string;
		newLabel: string;
		allNews: string;
		allPosts: string;
	};
	footer: {
		address: string;
	};
};

export const ja: TopTranslation = {
	// Draft based on the hero copy; replace with the copy doc's「メタ情報」table (未確定事項 #6)
	meta: {
		title: 'TRAILS・Astra 空間AI｜GPSの届かない現場の動きをデータにする｜zeteoh',
		description:
			'空間AI「TRAILS」で作業員の動線を、空間AIカメラ「Astra」で手元の作業を、位置と同期して記録。設備の設置は不要です。AstraのPoCパートナーを募集しています。',
		ogTitle:
			'CEATEC AWARD 2026「ネクストジェネレーション賞」受賞｜空間AIカメラ「Astra」初公開｜zeteoh',
		ogImage: '/og/og-astra-ceatec-ja.jpg'
	},
	announcement: {
		badge: 'NEWS',
		full: 'CEATEC AWARD 2026「ネクストジェネレーション賞」受賞｜空間AIカメラ「Astra」プロトタイプを初公開。PoCパートナー募集中 →',
		short: 'Astra初公開・PoCパートナー募集中 →'
	},
	nav: {
		products: 'Products',
		productsHint: 'TRAILS / Astra',
		trails: 'TRAILS',
		astra: 'Astra',
		trailsNote: '動線を記録する空間AI',
		astraBadge: 'PoC募集中',
		useCases: '活用アイデア',
		apply: 'お問い合わせ',
		applyShort: 'お問い合わせ',
		openMenu: 'メニューを開く',
		closeMenu: 'メニューを閉じる',
		menuTitle: 'メニュー',
		langSwitch: 'EN'
	},
	hero: {
		award: 'CEATEC AWARD 2026「ネクストジェネレーション賞」受賞',
		awardLines: ['CEATEC AWARD 2026', '「ネクストジェネレーション賞」受賞'],
		launch: '空間AIカメラ「Astra」初公開',
		title: 'GPSの届かない現場の動きを、空間AIでデータにする。',
		subtitle:
			'空間AI「TRAILS」で作業員の動線を、空間AIカメラ「Astra」で手元の作業を。位置と同期した作業映像として、熟練の暗黙知をデータに残します。設備の設置は不要です。',
		primary: 'AstraのPoCのお問い合わせ',
		secondary: 'TRAILSを詳しく見る →',
		image: { alt: 'Astraを胸元に装着した作業者' },
		background: { alt: '工場のデジタルツイン上に表示した作業員の動線' }
	},
	stats: [
		{ value: '1-3m', label: '測位精度（TRAILS・Astra共通）' },
		{ value: '最短3日', label: '現場を止めずに可視化をスタート' }
	],
	awards: { title: '受賞・支援・採択実績' },
	problem: {
		eyebrow: '課題',
		title: '熟練の判断は、どこにも記録されていない。',
		lead: '点検や作業の結果は残っても、そこに至る過程は残りません。熟練者の判断は目に見えませんが、その動きと手元には現れています。',
		recorded: {
			title: '記録されているもの',
			items: ['点検の結果（チェックリスト）', '異常の有無', '実施したという事実']
		},
		notRecorded: {
			title: '記録されていないもの',
			items: [
				'どの順番で回り、どこで立ち止まったか',
				'何をどう確認し、いつ違和感に気づいたか',
				'手で何を、どう扱ったか'
			]
		},
		closing: '熟練者の引退とともに、この経験は失われていきます。'
	},
	products: {
		eyebrow: 'プロダクト',
		title: '「動線」と「手元」。2つのスケールで、現場をデータにする。',
		lead: 'GPSが届かない、その空間へ。TRAILSが作業員の位置と動線を、Astraが作業者の視点から手元の作業を記録します。',
		tabsLabel: 'プロダクト',
		trails: {
			name: 'TRAILS',
			status: '提供中',
			catch: 'スマホのみで、GPSの届かない場所でも位置を測る',
			scale: '遠距離（建物スケール）｜空間AI',
			records: '記録するもの：どこを、どの順で回ったか',
			tags: ['測位精度1-3m', '設備の設置なし', 'スーパー早期審査・特許査定済みAI'],
			link: 'TRAILSを詳しく見る →',
			image: { alt: 'フロア図上に表示した作業員の動線' }
		},
		astra: {
			name: 'Astra',
			status: 'PoC受付中',
			catch: '位置情報に、現場の情報を重ねる',
			scale: '近距離（手元スケール）｜装着型の空間AIカメラ',
			records: '記録するもの：何を、どう扱ったか（位置と同期）',
			tags: ['測位精度1-3m', 'エゴセントリック動画と位置を同時に記録', '3Dハンドポーズ推定'],
			link: 'Astraを詳しく見る →',
			image: { alt: '空間AIカメラAstra' }
		},
		scenes: [
			{ key: 'factory', label: '工場' },
			{ key: 'construction', label: '工事現場' },
			{ key: 'warehouse', label: '倉庫' },
			{ key: 'infrastructure', label: 'インフラ施設' }
		]
	},
	astra: {
		eyebrow: '空間AIカメラ「Astra」 プロトタイプ初公開',
		title: '位置情報に、現場の情報を重ねる。',
		lead: '軌跡だけでは「どこを通ったか」しか分かりません。装着型カメラで映像を同時に記録すれば、「そこで何が起きていたか」まで残ります。',
		image: { alt: 'デジタルツイン上の動線と、手元の作業映像' },
		values: [
			{
				title: '手元の作業を、作業者の視点で記録',
				body: '胸元に装着したカメラのエゴセントリック映像で、手の動きや確認の仕方をそのまま残します。'
			},
			{
				title: '位置と映像をひとつのデータに',
				body: '映像は測位データと同期して記録。デジタルツイン上で「どこで、何をしていたか」を動線とあわせて振り返れます。'
			},
			{
				title: '暗黙知を、学習できるデータへ',
				body: '映像へのアノテーションと3Dハンドポーズ推定で、熟練の作業を構造化。技能伝承から、ロボットの学習データまで活用が広がります。'
			}
		],
		rd: {
			title: '空間AI＋デジタルツインの可能性',
			lead: 'Astraの映像から、現場をより深く理解する研究開発を進めています。',
			items: [
				{
					caption: '作業者の手の動きを3Dで捉え、作業手順の記録・分析に生かす',
					image: { alt: '3Dハンドポーズ推定の例' }
				},
				{
					caption: '歩いて撮影した映像から、現場の3Dモデルを再構成する',
					image: { alt: '歩行映像から再構成した現場の3Dモデル' }
				}
			]
		},
		note: '掲載の画像は設計段階のものです。実際の製品とは異なる場合があります。',
		cta: 'AstraのPoCのお問い合わせ →'
	},
	benefits: {
		eyebrow: '得られること',
		title: '記録が、現場の資産になる。',
		items: [
			{ title: '技能伝承', body: 'ベテランと若手で、動線と手元の作業がどう違うかを比較できる' },
			{ title: '手順書との差分', body: '書かれた手順と実際の作業の違いが見える' },
			{
				title: '安全管理',
				body: '誰がどこで何をしていたかが記録に残り、万一の際の所在把握にもつながる'
			}
		]
	},
	evidence: {
		eyebrow: '実績',
		title: '第三者による検証',
		main: {
			company: '東海旅客鉄道株式会社',
			result: '走行中の新幹線車内（285km/h）で誤差3m以内を継続して達成',
			date: '2026年6月発表',
			link: 'ニュースを見る'
		},
		items: [
			{
				label: '学術ベンチマーク',
				body: '慣性オドメトリの最先端手法（RoNIN、TLIO、MambaIO等）と同一条件で比較し、ATE 2.69mで最小'
			},
			{ label: '知的財産', body: 'スーパー早期審査にて特許査定済み' }
		]
	},
	vision: {
		eyebrow: '私たちが目指していること',
		title: '現場の動きを、フィジカルAIが学べるデータに。',
		body: 'ロボットの基盤モデルは、言語モデルと違い、学習データがインターネット上にありません。現実の作業から学ぶ必要があります。zeteohは、作業員の位置・動線と手元の作業映像を同期して記録し、フィジカルAIのためのデータ取得レイヤーを提供します。',
		steps: [
			{ title: '記録する', body: '動線と手元の作業を、設備の設置なしで取得' },
			{ title: '構造化する', body: 'アノテーションと3Dハンドポーズ推定で、暗黙知をデータに' },
			{ title: '学習させる', body: 'ロボットや自動化システムが学べる素材へ' }
		],
		closing: '現場で取得したデータは、お客様の資産です。'
	},
	poc: {
		eyebrow: 'PoCパートナー募集',
		title: 'Astra PoCパートナー募集',
		lead: '空間AIカメラ「Astra」を、あなたの現場で一緒に検証しませんか。TRAILSと組み合わせ、位置と映像を重ねた分析を共に形にしていくパートナー企業様を募集しています。',
		targetsTitle: 'こんな現場・企業様を募集しています',
		targets: [
			'工場・工事現場・倉庫・インフラ施設など、GPSが届かない環境で作業をしている',
			'作業者の所在や動線を把握し、安全管理を強化したい',
			'作業記録や技能伝承を、映像とデータで残したい'
		],
		flowTitle: 'PoCの流れ',
		flow: [
			'お問い合わせ',
			'ヒアリング',
			'図面・デバイス準備',
			'設定作業',
			'現場で検証',
			'結果レポート'
		],
		form: {
			inquiryType: 'お問い合わせ種別',
			inquiryOptions: {
				astra_poc: 'Astra PoCパートナーへのお問い合わせ',
				demo: 'TRAILS PoCのご依頼',
				vendor: 'ビジネス提携に関するお問い合わせ',
				other: 'その他のお問い合わせ'
			},
			name: '名前',
			email: 'メールアドレス',
			company: '会社名',
			jobTitle: '役職',
			siteType: '現場の種類（任意・複数選択）',
			siteTypes: {
				factory: '工場',
				construction: '工事現場',
				warehouse: '倉庫',
				infrastructure: 'インフラ施設',
				other: 'その他'
			},
			headcount: '対象人数の目安',
			headcountOptions: {
				none: '選択してください',
				small: '〜20名',
				medium: '21〜100名',
				large: '101名以上'
			},
			source: '当社をどこでお知りになりましたか？',
			sourceCeatec: 'CEATEC 2026・報道',
			message: 'メッセージ',
			submit: '送信する',
			sending: '送信中…',
			required: '必須項目',
			sendError: '送信できませんでした。時間をおいて、もう一度お試しください。'
		}
	},
	news: {
		newsTitle: 'ニュース',
		blogTitle: 'ブログ',
		newLabel: 'NEW',
		allNews: 'ニュース一覧 →',
		allPosts: 'ブログ一覧 →'
	},
	footer: {
		address: '〒104-0028 東京都中央区八重洲2-1-1 YANMAR TOKYO 12階'
	}
};

export const en: TopTranslation = {
	// From docs/spec.md「メタ情報」(pending confirmation, 未確定事項 #5)
	meta: {
		title: 'TRAILS and Astra spatial AI | Turning movement in GPS-denied sites into data | zeteoh',
		description:
			'TRAILS records where workers move, and the Astra wearable spatial AI camera records what their hands do, synced to location. No infrastructure to install. Now recruiting Astra PoC partners.',
		ogTitle:
			'CEATEC AWARD 2026 Next Generation Award | Introducing the Astra spatial AI camera | zeteoh',
		ogImage: '/og/og-astra-ceatec-en.jpg'
	},
	announcement: {
		badge: 'NEWS',
		full: 'Winner of the CEATEC AWARD 2026 Next Generation Award | Introducing the Astra spatial AI camera prototype. Now recruiting PoC partners →',
		short: 'Astra unveiled · Now recruiting PoC partners →'
	},
	nav: {
		products: 'Products',
		productsHint: 'TRAILS / Astra',
		trails: 'TRAILS',
		astra: 'Astra',
		trailsNote: 'Spatial AI that records routes',
		astraBadge: 'PoC open',
		useCases: 'Applications',
		apply: 'Contact us',
		applyShort: 'Contact us',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		menuTitle: 'Menu',
		langSwitch: '日本語'
	},
	hero: {
		award: 'CEATEC AWARD 2026 Next Generation Award',
		awardLines: ['CEATEC AWARD 2026', 'Next Generation Award'],
		launch: 'Astra spatial AI camera unveiled',
		title: 'Spatial AI that turns movement in GPS-denied sites into data.',
		subtitle:
			'TRAILS captures where workers move. The Astra spatial AI camera captures what their hands do. Recorded as work video synced to location, expert know-how becomes data. No infrastructure to install.',
		primary: 'Contact us about the Astra PoC',
		secondary: 'Explore TRAILS →',
		image: { alt: 'A worker wearing Astra on the chest' },
		background: { alt: "Workers' routes on a factory digital twin" }
	},
	stats: [
		{ value: '1–3 m', label: 'Positioning accuracy (TRAILS and Astra)' },
		{ value: '3 days', label: 'Fastest time to go live, without stopping operations' }
	],
	awards: { title: 'Awards and programs' },
	problem: {
		eyebrow: 'THE PROBLEM',
		title: 'Expert judgment is never written down.',
		lead: "Inspection results get logged, but the process behind them does not. You can't see an expert's judgment, but it shows in how they move and what their hands do.",
		recorded: {
			title: 'What gets recorded',
			items: [
				'Inspection results (checklists)',
				'Whether anything was abnormal',
				'The fact that the work was done'
			]
		},
		notRecorded: {
			title: "What doesn't",
			items: [
				'The route they took, and where they stopped',
				'What they checked, and when something felt off',
				'What their hands did, and how'
			]
		},
		closing: 'When experts retire, that experience leaves with them.'
	},
	products: {
		eyebrow: 'PRODUCTS',
		title: 'Movement and hands. Two scales, one dataset.',
		lead: "Into spaces GPS can't reach. TRAILS records where workers go; Astra records their hands-on work from their own point of view.",
		tabsLabel: 'Products',
		trails: {
			name: 'TRAILS',
			status: 'Available now',
			catch: "Indoor positioning where GPS can't reach, with just a smartphone",
			scale: 'Building scale | Spatial AI',
			records: 'Records: where workers went, and in what order',
			tags: ['1–3 m accuracy', 'No infrastructure', 'Patent granted (accelerated examination)'],
			link: 'Explore TRAILS →',
			image: { alt: "Workers' routes shown on a floor plan" }
		},
		astra: {
			name: 'Astra',
			status: 'PoC open',
			catch: 'Layer what happened on site over where it happened',
			scale: 'Hand scale | Wearable spatial AI camera',
			records: 'Records: what workers handled, and how (synced to location)',
			tags: [
				'1–3 m accuracy',
				'Egocentric video + location in one recording',
				'3D hand pose estimation'
			],
			link: 'Explore Astra →',
			image: { alt: 'The Astra spatial AI camera' }
		},
		scenes: [
			{ key: 'factory', label: 'Factories' },
			{ key: 'construction', label: 'Construction sites' },
			{ key: 'warehouse', label: 'Warehouses' },
			{ key: 'infrastructure', label: 'Infrastructure' }
		]
	},
	astra: {
		eyebrow: 'ASTRA SPATIAL AI CAMERA · PROTOTYPE UNVEILED',
		title: 'See what happened, not just where.',
		lead: 'A trajectory only tells you where someone went. Record video alongside it with a wearable camera, and you keep what actually happened there.',
		image: { alt: "Routes on a digital twin alongside video of the worker's hands" },
		values: [
			{
				title: "Hands-on work, from the worker's point of view",
				body: 'Chest-mounted egocentric video captures hand movements and how each check is done, exactly as it happens.'
			},
			{
				title: 'Location and video in one dataset',
				body: 'Video is recorded in sync with positioning data. Replay where people were and what they were doing, alongside their routes on a digital twin.'
			},
			{
				title: 'From tacit knowledge to training data',
				body: 'Video annotation and 3D hand pose estimation structure expert work, for skills transfer today and robot training tomorrow.'
			}
		],
		rd: {
			title: 'Spatial AI × digital twins',
			lead: 'Our R&D uses Astra footage to understand sites in more depth.',
			items: [
				{
					caption: 'Capture hand motion in 3D to document and analyze work procedures',
					image: { alt: 'An example of 3D hand pose estimation' }
				},
				{
					caption: 'Rebuild a 3D model of the site from walkthrough footage',
					image: { alt: 'A 3D model of a site rebuilt from walkthrough footage' }
				}
			]
		},
		note: 'Images show a design-stage prototype. The final product may differ.',
		cta: 'Contact us about the Astra PoC →'
	},
	benefits: {
		eyebrow: 'WHAT YOU GET',
		title: 'Records that become an asset.',
		items: [
			{
				title: 'Skills transfer',
				body: 'Compare how veterans and newcomers differ, in both their routes and their hands-on work'
			},
			{ title: 'Procedure gaps', body: 'See where real work departs from the written procedure' },
			{
				title: 'Safety',
				body: 'A record of who was where, doing what, that also helps locate people in an emergency'
			}
		]
	},
	evidence: {
		eyebrow: 'TRACK RECORD',
		title: 'Independently validated',
		main: {
			company: 'Central Japan Railway Company',
			result: 'Error consistently within 3 m inside a Shinkansen traveling at 285 km/h',
			date: 'Announced June 2026',
			link: 'Read the news'
		},
		items: [
			{
				label: 'Academic benchmark',
				body: 'Lowest ATE (2.69 m) against state-of-the-art inertial odometry methods (RoNIN, TLIO, MambaIO and others) under identical conditions'
			},
			{
				label: 'Intellectual property',
				body: "Patent granted under Japan's Super Accelerated Examination"
			}
		]
	},
	vision: {
		eyebrow: "WHERE WE'RE HEADED",
		title: 'Turning real-world work into data physical AI can learn from.',
		body: "Unlike language models, robot foundation models can't learn from the internet. They have to learn from real work. zeteoh records worker location, routes and hands-on video in sync, providing the data capture layer for physical AI.",
		steps: [
			{ title: 'Capture', body: 'Routes and hands-on work, with no infrastructure to install' },
			{
				title: 'Structure',
				body: 'Annotation and 3D hand pose estimation turn tacit knowledge into data'
			},
			{ title: 'Train', body: 'Material robots and automation systems can learn from' }
		],
		closing: 'The data captured on your site belongs to you.'
	},
	poc: {
		eyebrow: 'PoC PARTNERS',
		title: 'Become an Astra PoC partner',
		lead: "Test the Astra spatial AI camera with us on your own site. We're looking for partners to build location-plus-video analysis together, combined with TRAILS.",
		targetsTitle: "We're looking for teams that",
		targets: [
			'Work in GPS-denied environments such as factories, construction sites, warehouses or infrastructure',
			'Want to know where workers are and how they move, to strengthen safety',
			'Want to preserve work records and skills as video and data'
		],
		flowTitle: 'How the PoC works',
		flow: [
			'Contact us',
			'Discovery call',
			'Floor plans and devices',
			'Setup',
			'On-site trial',
			'Results report'
		],
		form: {
			inquiryType: 'Inquiry type',
			inquiryOptions: {
				astra_poc: 'Astra PoC partnership inquiry',
				demo: 'Request a TRAILS PoC',
				vendor: 'Business partnership',
				other: 'Other'
			},
			name: 'Name',
			email: 'Email',
			company: 'Company',
			jobTitle: 'Job title',
			siteType: 'Site type (optional, select all that apply)',
			siteTypes: {
				factory: 'Factory',
				construction: 'Construction site',
				warehouse: 'Warehouse',
				infrastructure: 'Infrastructure',
				other: 'Other'
			},
			headcount: 'Number of workers',
			headcountOptions: {
				none: 'Select',
				small: 'Up to 20',
				medium: '21–100',
				large: '101 or more'
			},
			source: 'How did you hear about us?',
			sourceCeatec: 'CEATEC 2026 / press',
			message: 'Message',
			submit: 'Submit',
			sending: 'Sending…',
			required: 'Required fields',
			sendError: "We couldn't send your message. Please try again in a moment."
		}
	},
	news: {
		newsTitle: 'News',
		blogTitle: 'Blog',
		newLabel: 'NEW',
		allNews: 'All news →',
		allPosts: 'All posts →'
	},
	footer: {
		address: '12F YANMAR TOKYO, 2-1-1 Yaesu, Chuo-ku, Tokyo 104-0028, Japan'
	}
};
