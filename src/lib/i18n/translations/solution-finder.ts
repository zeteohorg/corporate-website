import type { SolutionFinderTranslation } from '../types';

// JA is the primary audience; EN is parity. Keys mirror the ids in
// `src/lib/data/solution-finder/*` (question ids, option values, reason keys,
// tech ids, cost line keys) so the engine output maps straight onto copy.

export const ja: SolutionFinderTranslation = {
	meta: {
		title: '屋内位置測位ソリューション診断 | 最適な技術とコストが2分でわかる',
		description:
			'工場・倉庫・建設現場向け。7つの質問に答えるだけで、最適な屋内位置測位技術（UWB / BLE / カメラ / TRAILS など）と3年間の概算コストを提示。競合ベンダーも含めて正直に比較します。'
	},
	intro: {
		eyebrow: '無料診断',
		title: '自社に最適な屋内位置測位技術は？\nそして、実際いくらかかる？',
		subtitle:
			'7つの質問に答えるだけで、最適な測位技術と3年間の概算コストを即座に提示します。必要ならUWBやBLE、カメラ、QRチェックポイントも正直に推奨します。',
		start: '診断をはじめる',
		time: '約90秒・7問・メール登録不要で結果表示'
	},
	nav: {
		back: '戻る',
		next: '次へ',
		skip: 'スキップ',
		seeResult: '診断結果を見る',
		restart: '最初からやり直す'
	},
	progress: { stepOf: '質問 {n} / {m}' },
	card: {
		heading: '最適な屋内測位ソリューションは？',
		text: '2分の無料診断で、最適な技術と概算コストがわかります。',
		button: '2分で診断する',
		dismiss: '閉じる'
	},
	questions: {
		facility: {
			title: '対象となる施設は？',
			options: {
				factory: '工場',
				warehouse: '物流倉庫',
				construction: '建設現場',
				hospital_office: '病院・オフィス',
				other: 'その他'
			}
		},
		targets: {
			title: '追跡したい対象は？',
			hint: '複数選択できます',
			options: {
				workers: '作業者',
				vehicles: 'フォークリフト・車両',
				tools: '工具・資材',
				visitors: '来訪者'
			}
		},
		area: {
			title: '施設の広さは？',
			options: {
				lt2000: '2,000m² 未満',
				'2000_10000': '2,000〜10,000m²',
				'10000_50000': '10,000〜50,000m²',
				gt50000: '50,000m² 超'
			}
		},
		people: {
			title: '追跡する作業者の人数は？',
			options: {
				lt20: '20人未満',
				'20_100': '20〜100人',
				'100_500': '100〜500人',
				gt500: '500人以上'
			}
		},
		vehicles: {
			title: '追跡する車両の台数は？',
			options: {
				lt5: '5台未満',
				'5_20': '5〜20台',
				gt20: '20台以上'
			}
		},
		accuracy: {
			title: '必要な精度は？',
			options: {
				zone: 'エリア単位（部屋・工程）',
				'1_3m': '1〜3m（動線・滞在の可視化）',
				'30cm': '30cm以下（衝突防止・精密）'
			},
			examples: {
				zone: '例：どの工程に何分いたか',
				'1_3m': '例：ムダ移動・滞留の分析',
				'30cm': '例：AGV/フォークリフトの衝突防止'
			}
		},
		constraints: {
			title: '現場の環境・制約は？',
			hint: '複数選択できます',
			options: {
				metal: '金属・コンクリートが多い',
				no_install: '天井への機器設置が難しい・工事NG',
				frequent_layout: 'レイアウト変更が頻繁',
				multi_floor: '複数フロア・中2階などの立体構造',
				harsh: '高温・多湿・粉塵',
				none: '特になし'
			}
		},
		floors: {
			title: '対象は何フロアですか？',
			options: {
				two: '2フロア',
				three_five: '3〜5フロア',
				six_plus: '6フロア以上'
			}
		},
		timeline: {
			title: '導入したい時期は？',
			options: {
				'1mo': '1ヶ月以内',
				'3mo': '3ヶ月程度',
				'6mo_plus': '半年以上先'
			}
		},
		budget: {
			title: '予算感は？',
			options: {
				lt1m: '100万円未満',
				'1_5m': '100〜500万円',
				gt5m: '500万円以上',
				undecided: '未定'
			}
		},
		privacyConcern: {
			title: '作業者のプライバシーへの配慮は検討課題ですか？',
			hint: '任意',
			options: { yes: 'はい、重要な検討事項です', no: 'いいえ、特に問題ありません' }
		}
	},
	verdict: {
		title: '診断結果',
		recommended: '推奨',
		alternative: '代替案',
		notRecommendedTitle: 'この要件では推奨しない技術',
		fitLabel: '適合度',
		tco3yr: '3年間概算コスト',
		hybridNote: '人と車両の両方を追跡するため、ハイブリッド構成を推奨します。',
		floorNote: '複数フロア構成のため、固定インフラ型は各フロア分の設置コストが必要です。',
		unlockCta: 'この診断結果の詳細レポート（PDF）を無料で受け取る',
		hotCta: '今すぐ相談したい → PoCのご相談'
	},
	waste: {
		headline: '貴社の規模では、ムダな移動による損失は年間 約{amount} と推計されます。',
		note: '作業者数 × 平均人件費 × 30%（非付加価値移動）× 稼働係数 に基づく概算です。'
	},
	reasons: {
		trailsNotCmLevel:
			'cm級の精度が必要なため、スマートフォンの慣性測位（TRAILS）は適しません。正直にUWBを推奨します。',
		cmLevelUwb: 'cm級（0.1〜0.3m）の精度を安定して得られるのはUWBです。',
		collisionUwb: '施設全体の人と車両の衝突防止ゾーンにはUWBが有効です。',
		aoaBalance: 'BLE AoA（Quuppa等）はコストと精度のバランスに優れます。',
		vehicleSlam:
			'車両単位で約20cm・複数フロア対応を、施設インフラ最小で実現できるビジュアルSLAMを推奨します。',
		noInstallTrails: '工事不可・短期導入の要件では、インフラ不要のTRAILSが唯一現実的な選択肢です。',
		geomagAlt:
			'地磁気方式も候補ですが、レイアウト変更や大型車両の影響を受けやすい点に注意が必要です。',
		wifiAlt: '既存のWi-Fi APを活用でき、5〜10mの精度で足りる場合の低コスト案です。',
		zoneQr:
			'エリア単位・低予算で「いつ通過したか」が分かれば十分なら、QR/NFCチェックポイントが最適です。',
		zoneBle: 'エリア単位ならBLEビーコンでも実現できます。',
		trailsOverkill: 'この要件ではTRAILSは過剰投資です（動線分析まで必要なら別途ご相談ください）。',
		metalDegradesRssi:
			'金属・コンクリートが多い環境ではRSSI方式の精度が大きく低下するため、電波に依存しないTRAILSが有利です。',
		vehicleTrails:
			'車両の稼働・動線分析なら、車載デバイスにTRAILSを載せる方式が車両あたり最も安価です。',
		toolsBleTags: '工具・資材（人が持たないモノ）の追跡には、BLE/RFIDタグが適します。',
		peopleTrails: '作業者の動線分析にはTRAILSを併用できます。',
		weightedBest:
			'精度・コスト・導入速度・堅牢性を総合すると、インフラ不要で1〜2mを実現するTRAILSが最適です。'
	},
	tech: {
		trails: {
			name: 'TRAILS（Spatial AI）',
			accuracy: '1〜2m 連続',
			infra: '不要（スマートフォン）',
			opex: '¥5,000/台/月',
			killCriteria: 'cm級が必須、またはモノのみの追跡'
		},
		ble_rssi: {
			name: 'BLE（RSSI）',
			accuracy: '1.5〜5m（高密度）',
			infra: '50〜300個のビーコン',
			opex: '電池交換（約2年）・ビーコン管理',
			killCriteria: '精度1m以下、金属環境、工事不可'
		},
		ble_aoa: {
			name: 'BLE AoA（Quuppa等）',
			accuracy: '0.1〜1m',
			infra: '天井ロケーター（PoE）',
			opex: 'タグ・再校正',
			killCriteria: '工事不可、予算が厳しい'
		},
		uwb: {
			name: 'UWB',
			accuracy: 'LOS 0.1〜0.3m / NLOS 0.3〜1m',
			infra: '測量・配線されたアンカー',
			opex: '再校正・タグ・レイアウト変更時の再測量',
			killCriteria: '予算500万円未満、工事不可、1ヶ月以内の導入'
		},
		visual_slam: {
			name: 'ビジュアルSLAM（GuideNS等）',
			accuracy: '約20cm',
			infra: '車載カメラ+エッジPC（マーカーのみ）',
			opex: '車両あたりハードウェア',
			killCriteria: '人の動線をデバイスなしで追跡'
		},
		camera: {
			name: 'カメラ/映像測位',
			accuracy: '被覆ゾーンで cm',
			infra: 'カメラ＋配線＋計算機',
			opex: 'ストレージ・計算・プライバシー統制',
			killCriteria: '施設全体の被覆、強いプライバシー懸念'
		},
		wifi: {
			name: 'Wi-Fi フィンガープリント',
			accuracy: '5〜10m',
			infra: '既存AP',
			opex: 'レイアウト変更時の再測定',
			killCriteria: '精度3m以下、頻繁なレイアウト変更'
		},
		geomagnetic: {
			name: '地磁気',
			accuracy: '調査後 1〜2m',
			infra: '不要（要事前調査）',
			opex: '磁場変化時の再調査',
			killCriteria: '大型車両の往来、鉄構造の変更'
		},
		acoustic: {
			name: '音響',
			accuracy: '0.1〜1m（騒音に弱い）',
			infra: '発信/受信機、見通し必要',
			opex: '再校正・騒音調整',
			killCriteria: '騒がしい工場フロア'
		},
		qr_nfc: {
			name: 'QR/NFC チェックポイント',
			accuracy: 'チェックポイントのみ',
			infra: '印刷タグ/リーダー',
			opex: '手動スキャンの運用',
			killCriteria: 'リアルタイムの軌跡が必要'
		},
		gnss: {
			name: 'GNSS',
			accuracy: '屋外のみ 5m以上',
			infra: '不要',
			opex: '—',
			killCriteria: '屋内要件すべて'
		}
	},
	cost: {
		rangeNote: '3年間TCO（−20%／+30%の幅）',
		disclaimer:
			'公開価格と実測ベンチマークからの概算です。正確な金額は施設ごとのお見積もりをご依頼ください。',
		capex: '初期費用',
		opex: '3年運用費',
		total: '3年合計',
		quoteBased: '見積もりベース（要ベンダー見積）',
		lines: {
			bleBeacons: 'ビーコン（本体＋設置）',
			bleGateways: 'ゲートウェイ',
			software: 'ソフトウェア',
			survey: '現地調査',
			bleBattery: '電池交換（3年）',
			platform: 'プラットフォーム利用料',
			uwbAnchors: 'アンカー（本体＋高所設置）',
			surveyCalib: '測量・校正',
			tags: 'タグ',
			recalibration: '再校正（3年）',
			aoaLocators: 'ロケーター（本体＋設置）',
			refingerprint: '再フィンガープリント',
			cameras: 'カメラ（本体＋配線）',
			compute: '計算機',
			storageGovernance: 'ストレージ・統制（3年）',
			resurvey: '再調査',
			acousticFlat: '音響システム一式',
			qrSetup: '初期設定',
			qrOpex: '運用（3年）',
			trailsSetup: '初期セットアップ',
			trailsSubscription: 'サブスクリプション（3年）',
			slamKits: '車載キット',
			slamMarkers: 'マーカー設置'
		}
	},
	gate: {
		title: '詳細レポートを無料で受け取る',
		subtitle:
			'技術比較マトリクス、TCO内訳、日本のベンダー一覧（競合含む）、導入チェックリストを含む完全版をお送りします。',
		email: '会社のメールアドレス',
		name: 'お名前',
		phone: '電話番号（任意）',
		company: '会社名',
		companyFreemailHint: 'フリーメールをご利用の場合は会社名をご入力ください',
		consent: '個人情報の取り扱いに同意します',
		newsletter: '屋内位置測位に関する最新情報を受け取る（任意）',
		submit: 'レポートを受け取る',
		submitting: '送信中…',
		success: 'レポートをお送りしました。メールをご確認ください。下に結果も表示しています。',
		error: '送信に失敗しました。診断結果は下に表示しています。',
		retry: '再送信する',
		invalidEmail: '有効なメールアドレスを入力してください',
		requiredField: 'この項目は必須です'
	},
	report: {
		title: '屋内位置測位ソリューション診断レポート',
		inputsHeading: '入力条件と前提',
		recommendationHeading: '推奨技術とその理由',
		tcoHeading: '3年間TCO比較',
		vendorsHeading: 'ベンダー候補',
		vendorBestWhen: '最適なケース',
		timelineHeading: '導入期間の比較',
		nextStepsHeading: '次のステップ',
		print: 'PDFとして保存／印刷',
		champion: {
			badge: '社内提案（稟議）向けフォーマット',
			summaryHeading: '導入検討サマリー',
			alternativesHeading: '検討経緯（比較検討した技術）',
			costHeading: '費用対効果',
			risksHeading: 'リスクと対策',
			proposalHeading: '提案（承認いただきたい内容）'
		},
		pocCta: '2週間のPoCについて相談する'
	}
};

export const en: SolutionFinderTranslation = {
	meta: {
		title: 'Indoor Positioning Solution Finder | Best-fit tech & real cost in 2 min',
		description:
			'For factories, warehouses and construction sites. Answer 7 questions to get your best-fit indoor positioning technology (UWB / BLE / camera / TRAILS…) and a 3-year cost estimate — with an honest comparison that includes competitors.'
	},
	intro: {
		eyebrow: 'Free assessment',
		title: 'Which indoor positioning technology fits your site —\nand what will it really cost?',
		subtitle:
			'Answer 7 questions and get an instant best-fit technology plus a 3-year cost range. We will honestly recommend UWB, BLE, cameras, or QR checkpoints when those are the right answer.',
		start: 'Start the assessment',
		time: '~90 seconds · 7 questions · results shown without signing up'
	},
	nav: {
		back: 'Back',
		next: 'Next',
		skip: 'Skip',
		seeResult: 'See my result',
		restart: 'Start over'
	},
	progress: { stepOf: 'Question {n} / {m}' },
	card: {
		heading: 'Which positioning solution fits your site?',
		text: 'A free 2-minute check gives you the best-fit tech and a cost estimate.',
		button: 'Take the 2-min check',
		dismiss: 'Dismiss'
	},
	questions: {
		facility: {
			title: 'What kind of facility?',
			options: {
				factory: 'Factory',
				warehouse: 'Logistics warehouse',
				construction: 'Construction site',
				hospital_office: 'Hospital / office',
				other: 'Other'
			}
		},
		targets: {
			title: 'What do you want to track?',
			hint: 'Select all that apply',
			options: {
				workers: 'Workers',
				vehicles: 'Forklifts / vehicles',
				tools: 'Tools / materials',
				visitors: 'Visitors'
			}
		},
		area: {
			title: 'How large is the facility?',
			options: {
				lt2000: 'Under 2,000 m²',
				'2000_10000': '2,000–10,000 m²',
				'10000_50000': '10,000–50,000 m²',
				gt50000: 'Over 50,000 m²'
			}
		},
		people: {
			title: 'How many workers to track?',
			options: {
				lt20: 'Under 20',
				'20_100': '20–100',
				'100_500': '100–500',
				gt500: '500+'
			}
		},
		vehicles: {
			title: 'How many vehicles to track?',
			options: {
				lt5: 'Under 5',
				'5_20': '5–20',
				gt20: '20+'
			}
		},
		accuracy: {
			title: 'What accuracy do you need?',
			options: {
				zone: 'Zone-level (room / process)',
				'1_3m': '1–3 m (flow & dwell analysis)',
				'30cm': 'Under 30 cm (collision / precision)'
			},
			examples: {
				zone: 'e.g. minutes spent per process',
				'1_3m': 'e.g. wasted-movement analysis',
				'30cm': 'e.g. AGV / forklift collision avoidance'
			}
		},
		constraints: {
			title: 'Environment & constraints?',
			hint: 'Select all that apply',
			options: {
				metal: 'Lots of metal / concrete',
				no_install: 'Hard to mount on ceilings / no construction',
				frequent_layout: 'Frequent layout changes',
				multi_floor: 'Multiple floors / mezzanines',
				harsh: 'Heat / humidity / dust',
				none: 'None in particular'
			}
		},
		floors: {
			title: 'How many floors?',
			options: {
				two: '2 floors',
				three_five: '3–5 floors',
				six_plus: '6+ floors'
			}
		},
		timeline: {
			title: 'When do you want to deploy?',
			options: {
				'1mo': 'Within 1 month',
				'3mo': 'Around 3 months',
				'6mo_plus': '6+ months out'
			}
		},
		budget: {
			title: 'Budget range?',
			options: {
				lt1m: 'Under ¥1M',
				'1_5m': '¥1M–5M',
				gt5m: 'Over ¥5M',
				undecided: 'Undecided'
			}
		},
		privacyConcern: {
			title: 'Is worker privacy a consideration for you?',
			hint: 'Optional',
			options: { yes: 'Yes, it matters to us', no: 'No, not a concern' }
		}
	},
	verdict: {
		title: 'Your result',
		recommended: 'Recommended',
		alternative: 'Alternative',
		notRecommendedTitle: 'Not recommended for this requirement',
		fitLabel: 'Fit',
		tco3yr: '3-year estimate',
		hybridNote: 'Because you track both people and vehicles, we recommend a hybrid setup.',
		floorNote:
			'With multiple floors, fixed-infrastructure options need per-floor installation cost.',
		unlockCta: 'Get the full personalized report (PDF) — free',
		hotCta: 'Prefer to talk now? → Discuss a PoC'
	},
	waste: {
		headline: 'At your scale, wasted movement is costing an estimated {amount} per year.',
		note: 'Estimate: workers × average wage × 30% (non-value-add movement) × on-floor factor.'
	},
	reasons: {
		trailsNotCmLevel:
			'You need cm-level accuracy, so smartphone inertial positioning (TRAILS) is not the fit — we honestly recommend UWB.',
		cmLevelUwb: 'UWB is what reliably delivers cm-level (0.1–0.3 m) accuracy.',
		collisionUwb: 'For facility-wide people + vehicle collision zones, UWB is effective.',
		aoaBalance: 'BLE AoA (Quuppa-class) balances cost and precision well.',
		vehicleSlam:
			'Vehicle-mounted visual SLAM delivers ~20 cm and multi-floor with minimal facility infrastructure.',
		noInstallTrails:
			'With a no-construction constraint or a fast start, infrastructure-free TRAILS is the only realistic option.',
		geomagAlt:
			'Geomagnetic is a candidate, but it is sensitive to layout changes and large moving vehicles.',
		wifiAlt: 'A low-cost option reusing existing Wi-Fi APs when 5–10 m accuracy is enough.',
		zoneQr:
			'If zone-level "who passed when" is enough on a tight budget, QR/NFC checkpoints are the best fit.',
		zoneBle: 'Zone-level tracking can also be done with BLE beacons.',
		trailsOverkill:
			'TRAILS is overkill for this requirement (talk to us if you also want flow analysis).',
		metalDegradesRssi:
			'In metal/concrete-heavy environments RSSI accuracy degrades sharply, so RF-independent TRAILS wins.',
		vehicleTrails:
			'For vehicle utilization/flow, mounting a TRAILS device in the vehicle is the cheapest per-vehicle option.',
		toolsBleTags: 'For tools/materials (things nobody carries), BLE/RFID tags are the fit.',
		peopleTrails: 'TRAILS can be added for worker-flow analysis.',
		weightedBest:
			'Across accuracy, cost, deploy speed and robustness, infrastructure-free 1–2 m TRAILS is the best overall fit.'
	},
	tech: {
		trails: {
			name: 'TRAILS (Spatial AI)',
			accuracy: '1–2 m continuous',
			infra: 'None (smartphones)',
			opex: '¥5,000 / device / mo',
			killCriteria: 'cm-level required, or tracking things only'
		},
		ble_rssi: {
			name: 'BLE (RSSI)',
			accuracy: '1.5–5 m (dense)',
			infra: '50–300 beacons',
			opex: 'Battery swaps (~2 yr), beacon audits',
			killCriteria: 'Accuracy ≤1 m, metallic sites, no-install'
		},
		ble_aoa: {
			name: 'BLE AoA (Quuppa-class)',
			accuracy: '0.1–1 m',
			infra: 'Ceiling locators (PoE)',
			opex: 'Tags, recalibration',
			killCriteria: 'No-install, tight budget'
		},
		uwb: {
			name: 'UWB',
			accuracy: 'LOS 0.1–0.3 m / NLOS 0.3–1 m',
			infra: 'Surveyed, cabled anchors',
			opex: 'Recalibration, tags, re-survey on layout change',
			killCriteria: 'Budget < ¥5M, no-install, <1 month start'
		},
		visual_slam: {
			name: 'Visual SLAM (GuideNS-class)',
			accuracy: '~20 cm',
			infra: 'Vehicle camera + edge PC (markers only)',
			opex: 'Per-vehicle hardware',
			killCriteria: 'Tracking people without a device'
		},
		camera: {
			name: 'Camera / video',
			accuracy: 'cm in covered zones',
			infra: 'Cameras + cabling + compute',
			opex: 'Storage/compute, privacy governance',
			killCriteria: 'Facility-wide coverage, strong privacy sensitivity'
		},
		wifi: {
			name: 'Wi-Fi fingerprinting',
			accuracy: '5–10 m',
			infra: 'Existing APs',
			opex: 'Re-fingerprinting on layout change',
			killCriteria: 'Accuracy ≤3 m, frequent layout changes'
		},
		geomagnetic: {
			name: 'Geomagnetic',
			accuracy: '1–2 m after survey',
			infra: 'None (survey needed)',
			opex: 'Re-survey on magnetic change',
			killCriteria: 'Heavy vehicle traffic, changing steel layout'
		},
		acoustic: {
			name: 'Acoustic',
			accuracy: '0.1–1 m (noise-sensitive)',
			infra: 'Emitters/receivers, line of sight',
			opex: 'Recalibration, noise tuning',
			killCriteria: 'Noisy industrial floors'
		},
		qr_nfc: {
			name: 'QR/NFC checkpoints',
			accuracy: 'Checkpoint-only',
			infra: 'Printed tags / readers',
			opex: 'Manual scan compliance',
			killCriteria: 'Real-time trajectory required'
		},
		gnss: {
			name: 'GNSS',
			accuracy: '5 m+ outdoor only',
			infra: 'None',
			opex: '—',
			killCriteria: 'Any indoor requirement'
		}
	},
	cost: {
		rangeNote: '3-year TCO (−20% / +30% range)',
		disclaimer:
			'Directional estimate from public list prices and field benchmarks — request a facility-specific quote for a firm number.',
		capex: 'Setup (CAPEX)',
		opex: '3-yr operating',
		total: '3-yr total',
		quoteBased: 'Estimate — request vendor quote',
		lines: {
			bleBeacons: 'Beacons (hardware + install)',
			bleGateways: 'Gateways',
			software: 'Software',
			survey: 'Site survey',
			bleBattery: 'Battery swaps (3 yr)',
			platform: 'Platform fee',
			uwbAnchors: 'Anchors (hardware + high-place install)',
			surveyCalib: 'Survey & calibration',
			tags: 'Tags',
			recalibration: 'Recalibration (3 yr)',
			aoaLocators: 'Locators (hardware + install)',
			refingerprint: 'Re-fingerprinting',
			cameras: 'Cameras (hardware + cabling)',
			compute: 'Compute',
			storageGovernance: 'Storage & governance (3 yr)',
			resurvey: 'Re-survey',
			acousticFlat: 'Acoustic system',
			qrSetup: 'Initial setup',
			qrOpex: 'Operation (3 yr)',
			trailsSetup: 'Initial setup',
			trailsSubscription: 'Subscription (3 yr)',
			slamKits: 'Vehicle kits',
			slamMarkers: 'Marker setup'
		}
	},
	gate: {
		title: 'Get your full report — free',
		subtitle:
			'The complete version includes a fit matrix, a TCO breakdown, a shortlist of Japanese vendors (competitors included), and a procurement checklist.',
		email: 'Work email',
		name: 'Name',
		phone: 'Phone (optional)',
		company: 'Company',
		companyFreemailHint: "You're using a free-mail address — please enter your company name",
		consent: 'I agree to the handling of my personal data',
		newsletter: 'Send me updates on indoor positioning (optional)',
		submit: 'Get the report',
		submitting: 'Sending…',
		success: 'Report sent — check your inbox. Your result is shown below too.',
		error: 'Sending failed, but your result is shown below.',
		retry: 'Resend',
		invalidEmail: 'Please enter a valid email address',
		requiredField: 'This field is required'
	},
	report: {
		title: 'Indoor Positioning Solution Finder — Report',
		inputsHeading: 'Your inputs & assumptions',
		recommendationHeading: 'Recommendation & why',
		tcoHeading: '3-year TCO comparison',
		vendorsHeading: 'Vendor shortlist',
		vendorBestWhen: 'Best when',
		timelineHeading: 'Deployment timeline',
		nextStepsHeading: 'Next steps',
		print: 'Save / print as PDF',
		champion: {
			badge: 'Ready-to-circulate (ringi) format',
			summaryHeading: 'Executive summary',
			alternativesHeading: 'Alternatives considered',
			costHeading: 'Cost vs. benefit',
			risksHeading: 'Risks & mitigations',
			proposalHeading: 'The proposal (what to approve)'
		},
		pocCta: 'Discuss a 2-week PoC'
	}
};
