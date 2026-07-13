import type { SolutionFinderTranslation } from '../types';

// JA is the primary audience; EN is parity. Keys mirror the ids in
// `src/lib/data/solution-finder/*` (question ids, option values, reason keys,
// tech ids) so the engine output maps straight onto copy. This is the
// Technology Fit Calculator: judged on citable deployment criteria, never on
// cost — the only ¥ figures anywhere are zeteoh's own TRAILS pricing and the
// visitor's own waste-loss estimate.

export const ja: SolutionFinderTranslation = {
	meta: {
		title: '屋内測位技術診断 | 現場条件から最適な技術を2分で判定',
		description:
			'工場・倉庫・建設現場向け。8つの質問に答えるだけで、現場の条件に最適な屋内測位技術（UWB / BLE / カメラ / TRAILS など）を診断。費用ではなく、精度・設置環境・導入期間などの技術要件と学術的根拠にもとづいて、正直に判定します。'
	},
	intro: {
		eyebrow: '無料の屋内測位技術診断',
		title: 'どの屋内測位技術が、\nあなたの現場に合っている？',
		subtitle:
			'8つの質問に答えるだけで、現場の条件から最適な技術を判定します。費用ではなく、精度・設置環境・導入期間などの技術要件にもとづいて正直に判定し、該当する技術がない場合はその理由も明示します。',
		start: '診断をはじめる',
		time: '約90秒・8問・メール登録不要で結果表示'
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
		heading: '屋内測位技術診断',
		text: '2分の無料診断で、現場に最適な技術がわかります。',
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
				temporary: '短期間の計測プロジェクト（数週間〜数ヶ月）',
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
		device: {
			title: '作業者はスマホや端末・タグを携帯できますか？',
			options: {
				company_phones: '会社支給のスマホを携帯できる',
				can_issue: 'スマホの支給を検討できる',
				tag_only: 'スマホは不可・小型タグやバッジなら携帯できる',
				nothing: '何も携帯・装着できない'
			},
			examples: {
				company_phones: '例：全員が業務用スマホを所持している',
				can_issue: '例：予算があれば新規に調達できる',
				tag_only: '例：クリーンルームなどスマホ持込不可の現場',
				nothing: '例：防爆エリアなど厳格な持込制限がある'
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
			trustNote: '※ 予算は診断結果に影響しません（営業のご案内の参考のみ）',
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
		hybridNote: '人と車両の両方を追跡するため、ハイブリッド構成を推奨します。',
		floorNote: '複数フロア構成のため、固定インフラ型の技術は各フロアへの設置対応が必要になります。',
		unlockCta: 'この診断結果をもとにした社内検討用スライドパックを無料で受け取る',
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
		aoaBalance: 'BLE AoA方式は精度と導入負荷のバランスに優れます。',
		vehicleSlam:
			'車両単位で高精度・複数フロア対応を、施設インフラ最小で実現できるビジュアルSLAMを推奨します。',
		noInstallTrails: '工事不可・短期導入の要件では、インフラ不要のTRAILSが唯一現実的な選択肢です。',
		geomagAlt:
			'地磁気方式も候補ですが、レイアウト変更や大型車両の影響を受けやすい点に注意が必要です。',
		wifiAlt: '既存のWi-Fi APを活用でき、ゾーン単位の精度で足りる場合の低負荷な案です。',
		zoneQr:
			'エリア単位で「いつ通過したか」が分かれば十分なら、QR/NFCチェックポイントが最適です。',
		zoneBle: 'エリア単位ならBLEビーコンでも実現できます。',
		trailsOverkill: 'この要件ではTRAILSは過剰投資です（動線分析まで必要なら別途ご相談ください）。',
		metalDegradesRssi:
			'金属・コンクリートが多い環境ではRSSI方式の精度が大きく低下するため、電波に依存しないTRAILSが有利です。',
		vehicleTrails:
			'車両の稼働・動線分析なら、車載デバイスにTRAILSを載せる方式が最も導入負荷の低い選択肢です。',
		toolsBleTags: '工具・資材（人が持たないモノ）の追跡には、BLE/RFIDタグが適します。',
		weightedBest:
			'精度・導入負荷・導入速度・堅牢性を総合すると、インフラ不要で1〜2mを実現するTRAILSが最適です。',
		trailsNeedsDevice:
			'TRAILSはスマートフォンに搭載する方式のため、スマホを携帯できない現場では利用できません。',
		needsSmartphone:
			'この技術はスマートフォンへの搭載が前提のため、スマホを携帯できない現場では利用できません。',
		needsCarriedDevice: '何も携帯・装着できない場合、タグ型の技術も利用できません。',
		notTemporary: '固定インフラの設置・測量が必要なため、短期間のプロジェクトには向きません。',
		notIndustrial:
			'金属・大型車両・レイアウト変動の多い産業環境では精度が大きく劣化するため（オフィス・小売向けの技術です）',
		pdrDrifts:
			'補正のない従来型の自律航法（PDR）は、実環境でドリフトが蓄積し精度が劣化するため推奨しません。',
		geomagUnstable:
			'地磁気方式はレイアウト変更や大型車両の往来による磁場変化の影響を受けやすく、不安定になりがちです。',
		cameraZonesOnly:
			'携帯するデバイスがない場合、カメラによる被覆エリアのみの測位が現実的な選択肢です（プライバシー配慮が必要です）。',
		checkpointFallback:
			'QR/NFCチェックポイントであれば、デバイスを携帯せずに通過記録を取ることができます。'
	},
	tech: {
		trails: {
			name: 'TRAILS（Spatial AI）',
			accuracy: '1〜2m 連続',
			infra: '不要（スマートフォン）',
			opex: 'サブスクリプション課金（台数比例）',
			killCriteria: 'cm級の精度が必須、またはモノのみの追跡'
		},
		ble_rssi: {
			name: 'BLE（RSSI）',
			accuracy: '1.5〜5m（高密度設置時）',
			infra: '50〜300個規模のビーコン',
			opex: '電池交換（約2年サイクル）・ビーコン管理',
			killCriteria: '精度1m以下が必要、金属環境、工事不可'
		},
		ble_aoa: {
			name: 'BLE AoA（Quuppa等）',
			accuracy: '0.1〜1m',
			infra: '天井設置ロケーター（PoE）',
			opex: 'タグ運用・再校正',
			killCriteria: '工事不可、短期導入が必須'
		},
		uwb: {
			name: 'UWB',
			accuracy: 'LOS 0.1〜0.3m / NLOS 0.3〜1m',
			infra: '測量・配線されたアンカー',
			opex: '再校正・タグ運用・レイアウト変更時の再測量',
			killCriteria: '工事不可、1ヶ月以内の導入'
		},
		visual_slam: {
			name: 'ビジュアルSLAM（GuideNS等）',
			accuracy: '約20cm',
			infra: '車載カメラ+エッジPC（マーカーのみ）',
			opex: '車両単位のハードウェア運用',
			killCriteria: '人の動線をデバイスなしで追跡'
		},
		camera: {
			name: 'カメラ/映像測位',
			accuracy: '被覆ゾーンで cm級',
			infra: 'カメラ＋配線＋計算機',
			opex: 'ストレージ・計算・プライバシー統制',
			killCriteria: '施設全体の被覆、強いプライバシー懸念'
		},
		wifi: {
			name: 'Wi-Fi フィンガープリント',
			accuracy: '5〜10m',
			infra: '既存AP',
			opex: 'レイアウト変更時の再測定',
			killCriteria: '精度3m以下が必要、頻繁なレイアウト変更、産業環境'
		},
		geomag_phone: {
			name: '地磁気（スマホ磁気センサー）',
			accuracy: '調査後 1〜3m',
			infra: '不要（要事前調査）',
			opex: '磁場変化時の再調査',
			killCriteria: '大型車両の往来、鉄構造の変更、産業環境'
		},
		geomag_infra: {
			name: '地磁気（専用ハードウェア）',
			accuracy: '調査後 1〜2m',
			infra: '磁気ビーコン等の専用機器',
			opex: '磁場変化時の再調査・機器保守',
			killCriteria: '大型車両の往来、鉄構造の変更、産業環境'
		},
		pdr: {
			name: '自律航法（PDR）',
			accuracy: 'ゾーン単位（補正なしでは劣化）',
			infra: '不要（スマートフォン）',
			opex: '—',
			killCriteria: '1m未満の精度、長時間の連続測位（ドリフト蓄積）'
		},
		acoustic: {
			name: '音響',
			accuracy: '0.1〜1m（騒音に弱い）',
			infra: '発信/受信機、見通し必要',
			opex: '再校正・騒音調整',
			killCriteria: '騒がしい工場フロア、産業環境全般'
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
	fitLabels: { best: '最適', conditional: '条件付きで可', weak: '不適' },
	deploy: {
		infra: '設置工事',
		deployTime: '導入期間',
		maintenance: '運用負荷',
		carrier: '携帯方式',
		infraCost: '設備コスト',
		hardwareCost: '機器コスト',
		note: '設置工事・導入期間・運用負荷は代表的な構成にもとづく目安です。実際の条件は現場ごとに異なります。',
		values: {
			infra: { none: '不要', light: '軽微（現地調査のみ）', heavy: '必要（機器設置・配線）' },
			deployTime: { days: '数日〜1週間', weeks: '数週間', months: '数ヶ月' },
			maintenance: { low: '低い', medium: '中程度', high: '高い（定期対応が必要）' },
			carrier: {
				smartphone: 'スマートフォン',
				tag: '専用タグ',
				vehicle_kit: '車載キット',
				fixed_sensor: '固定センサーのみ（非携帯）',
				none: '携帯不要'
			}
		}
	},
	costTiers: {
		none: '不要',
		low: '低',
		medium: '中',
		high: '高',
		note: '※ コスト区分は構造的な目安です（金額ではありません）'
	},
	pricing: {
		heading: 'TRAILS導入費用（zeteoh公表価格）',
		setup: '初期費用',
		perDevice: '月額（1台あたり）',
		handsetNote: '端末を支給できない場合、1台あたり¥30,000でハンドセットの貸与・購入も可能です。',
		payback: '回収目安'
	},
	noFit: {
		title: '現時点では、要件を完全に満たす技術がありません',
		intro: 'ご入力いただいた条件の中に、両立が難しい組み合わせがあります。',
		conflicts: {
			needCmLevel: 'cm級の精度が必要という要件',
			noCarriedDevice: '何もデバイスを携帯・装着できないという制約',
			realtimeTracking: '施設全体でのリアルタイムな動線把握という要件',
			requirementsConflict: 'ご入力いただいた要件同士の組み合わせ',
			temporaryProject: '短期間のみの計測プロジェクトという制約'
		},
		relaxHint:
			'いずれかの条件を緩和いただければ（例：一部エリアのみデバイス携帯を許可する、精度要件をエリア単位に緩和するなど）、現実的な選択肢をご提案できます。まずはお気軽にご相談ください。',
		referenceLabel: '参考（最も近い選択肢）'
	},
	gate: {
		title: '社内検討用スライドパックを無料で受け取る',
		subtitle:
			'技術比較マトリクス、要件整理、リスクと対策、ベンダー評価チェックリストを含む、そのまま社内共有できる資料をお送りします。',
		email: '会社のメールアドレス',
		name: 'お名前',
		phone: '電話番号（任意）',
		company: '会社名',
		companyFreemailHint: 'フリーメールをご利用の場合は会社名をご入力ください',
		department: { label: '部署名・役職（任意）', placeholder: '例：生産管理部 課長' },
		consent: '個人情報の取り扱いに同意します',
		newsletter: '屋内位置測位に関する最新情報を受け取る（任意）',
		submit: 'スライドパックを受け取る',
		submitting: '送信中…',
		success: 'スライドパックをお送りしました。メールをご確認ください。下に結果も表示しています。',
		error: '送信に失敗しました。診断結果は下に表示しています。',
		retry: '再送信する',
		invalidEmail: '有効なメールアドレスを入力してください',
		requiredField: 'この項目は必須です'
	},
	report: {
		title: '屋内測位技術診断レポート',
		pocCta: '2週間のPoCについて相談する'
	},
	slides: {
		title: '{company} 動線可視化 技術検討',
		execSummary: '導入検討サマリー',
		requirements: '要件整理',
		alternatives: '検討経緯（比較検討した技術）',
		timelineComparison: '導入期間の比較',
		risks: 'リスクと対策',
		checklist: '導入時の確認事項（ベンダー評価チェックリスト）',
		proposal: '提案（承認いただきたい内容）',
		sources: '出典・参考文献',
		copySection: 'このセクションをコピー',
		download: 'PDFとして保存／印刷',
		attribution: '出典: zeteoh 屋内測位技術診断 (zeteoh.com)',
		reDiagnoseInvite: '要件が変わった場合は、再度診断をお試しください。'
	},
	checklist: {
		uwb: [
			'アンカー密度と再測量の条件（レイアウト変更時の対応）は？',
			'見通し外（NLOS）環境での精度保証はどの程度か？',
			'タグの電池寿命と交換運用の負担は？'
		],
		ble: [
			'ビーコンの電池交換サイクルと運用負担は？',
			'金属什器・什器移動時の精度劣化にどう対応するか？',
			'レイアウト変更時の再設置・再校正の条件は？'
		],
		aoa: [
			'ロケーター設置密度と天井工事の範囲は？',
			'複数フロアでの精度・切り替えはどう担保されるか？',
			'タグ運用（電池・故障交換）の窓口体制は？'
		],
		smartphone: [
			'スマートフォンをポケットや作業着に入れた状態での精度は？',
			'複数フロア・エレベーター移動時の精度維持はどう担保されるか？',
			'アプリ常駐によるバッテリー消費・MDM対応状況は？'
		],
		camera: [
			'施設全体を被覆できない場合の追跡継続性は？',
			'映像データの保管期間・アクセス権限・プライバシー統制は？',
			'照明変化・遮蔽物によるトラッキング精度への影響は？'
		]
	}
};

export const en: SolutionFinderTranslation = {
	meta: {
		title: 'Indoor Positioning Technology Selector | Find your best-fit tech in 2 minutes',
		description:
			'For factories, warehouses and construction sites. Answer 8 questions to find your best-fit indoor positioning technology (UWB / BLE / camera / TRAILS and more) — judged on real deployment conditions and cited evidence, never on cost.'
	},
	intro: {
		eyebrow: 'Free Technology Selector',
		title: 'Which indoor positioning technology\nactually fits your site?',
		subtitle:
			'Answer 8 questions and we judge the right technology from your site conditions — accuracy, environment, and deployment constraints, never cost. If nothing fits, we say so and explain why.',
		start: 'Start the assessment',
		time: '~90 seconds · 8 questions · results shown without signing up'
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
		heading: 'Indoor Positioning Technology Selector',
		text: 'A free 2-minute check finds the best-fit technology for your site.',
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
				temporary: 'Short-term measurement project (weeks to months)',
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
		device: {
			title: 'Can workers carry a phone, device, or tag?',
			options: {
				company_phones: 'They can carry a company-issued smartphone',
				can_issue: 'We could issue smartphones if needed',
				tag_only: 'No smartphones, but a small tag/badge is fine',
				nothing: 'Nothing can be carried or worn'
			},
			examples: {
				company_phones: 'e.g. everyone already has a work phone',
				can_issue: 'e.g. we could procure new devices with budget',
				tag_only: 'e.g. cleanrooms where phones cannot be brought in',
				nothing: 'e.g. explosion-proof zones with strict no-carry rules'
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
			trustNote: 'Your budget does not affect the recommendation.',
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
		hybridNote: 'Because you track both people and vehicles, we recommend a hybrid setup.',
		floorNote: 'With multiple floors, fixed-infrastructure technologies need per-floor installation.',
		unlockCta: 'Get the internal-review slide pack based on this result — free',
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
		aoaBalance: 'BLE AoA balances accuracy and deployment effort well.',
		vehicleSlam:
			'Vehicle-mounted visual SLAM delivers high per-vehicle accuracy and multi-floor coverage with minimal facility infrastructure.',
		noInstallTrails:
			'With a no-construction constraint or a fast start, infrastructure-free TRAILS is the only realistic option.',
		geomagAlt:
			'Geomagnetic is a candidate, but it is sensitive to layout changes and large moving vehicles.',
		wifiAlt: 'A low-effort option reusing existing Wi-Fi APs when zone-level accuracy is enough.',
		zoneQr:
			'If zone-level "who passed when" is enough, QR/NFC checkpoints are the best fit.',
		zoneBle: 'Zone-level tracking can also be done with BLE beacons.',
		trailsOverkill:
			'TRAILS is overkill for this requirement (talk to us if you also want flow analysis).',
		metalDegradesRssi:
			'In metal/concrete-heavy environments RSSI accuracy degrades sharply, so RF-independent TRAILS wins.',
		vehicleTrails:
			'For vehicle utilization/flow, mounting a TRAILS device in the vehicle is the lowest-effort option.',
		toolsBleTags: 'For tools/materials (things nobody carries), BLE/RFID tags are the fit.',
		weightedBest:
			'Across accuracy, deployment effort, speed and robustness, infrastructure-free 1–2 m TRAILS is the best overall fit.',
		trailsNeedsDevice:
			'TRAILS runs on a smartphone, so it cannot be used where phones cannot be carried.',
		needsSmartphone:
			'This technology requires a smartphone, so it cannot be used where phones cannot be carried.',
		needsCarriedDevice: 'If nothing at all can be carried or worn, tag-based technologies are also out.',
		notTemporary: 'It requires fixed-infrastructure installation and survey, so it does not suit a short-term project.',
		notIndustrial:
			'Accuracy degrades sharply in industrial environments with metal, heavy vehicles and layout churn (it is an office/retail technology).',
		pdrDrifts:
			'Classical dead reckoning (PDR) without correction accumulates drift in real environments, so we do not recommend it.',
		geomagUnstable:
			'Geomagnetic methods are sensitive to field changes from layout changes and large vehicle traffic, and tend to be unstable.',
		cameraZonesOnly:
			'With no device to carry, camera-based positioning in covered zones is the realistic option (privacy governance required).',
		checkpointFallback:
			'QR/NFC checkpoints can log passage without requiring anyone to carry a device.'
	},
	tech: {
		trails: {
			name: 'TRAILS (Spatial AI)',
			accuracy: '1–2 m continuous',
			infra: 'None (smartphones)',
			opex: 'Subscription billing (per device)',
			killCriteria: 'cm-level required, or tracking things only'
		},
		ble_rssi: {
			name: 'BLE (RSSI)',
			accuracy: '1.5–5 m (dense deployment)',
			infra: '50–300 beacons',
			opex: 'Battery swaps (~2 yr cycle), beacon audits',
			killCriteria: 'Accuracy ≤1 m, metallic sites, no-install'
		},
		ble_aoa: {
			name: 'BLE AoA (Quuppa-class)',
			accuracy: '0.1–1 m',
			infra: 'Ceiling locators (PoE)',
			opex: 'Tag operations, recalibration',
			killCriteria: 'No-install, fast start required'
		},
		uwb: {
			name: 'UWB',
			accuracy: 'LOS 0.1–0.3 m / NLOS 0.3–1 m',
			infra: 'Surveyed, cabled anchors',
			opex: 'Recalibration, tag operations, re-survey on layout change',
			killCriteria: 'No-install, <1 month start'
		},
		visual_slam: {
			name: 'Visual SLAM (GuideNS-class)',
			accuracy: '~20 cm',
			infra: 'Vehicle camera + edge PC (markers only)',
			opex: 'Per-vehicle hardware operations',
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
			killCriteria: 'Accuracy ≤3 m, frequent layout changes, industrial sites'
		},
		geomag_phone: {
			name: 'Geomagnetic (smartphone magnetometer)',
			accuracy: '1–3 m after survey',
			infra: 'None (survey needed)',
			opex: 'Re-survey on magnetic change',
			killCriteria: 'Heavy vehicle traffic, changing steel structures, industrial sites'
		},
		geomag_infra: {
			name: 'Geomagnetic (dedicated hardware)',
			accuracy: '1–2 m after survey',
			infra: 'Magnetic beacon-class dedicated hardware',
			opex: 'Re-survey on magnetic change, hardware upkeep',
			killCriteria: 'Heavy vehicle traffic, changing steel structures, industrial sites'
		},
		pdr: {
			name: 'Dead reckoning (PDR)',
			accuracy: 'Zone-level (degrades without correction)',
			infra: 'None (smartphone)',
			opex: '—',
			killCriteria: 'Sub-1 m accuracy, long continuous sessions (drift accumulation)'
		},
		acoustic: {
			name: 'Acoustic',
			accuracy: '0.1–1 m (noise-sensitive)',
			infra: 'Emitters/receivers, line of sight',
			opex: 'Recalibration, noise tuning',
			killCriteria: 'Noisy industrial floors, industrial sites generally'
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
	fitLabels: { best: 'Best fit', conditional: 'Conditional fit', weak: 'Poor fit' },
	deploy: {
		infra: 'Installation',
		deployTime: 'Deploy time',
		maintenance: 'Maintenance load',
		carrier: 'Carried as',
		infraCost: 'Infrastructure cost',
		hardwareCost: 'Hardware cost',
		note: 'Installation, deploy time, and maintenance load are indicative for a representative setup — actual conditions vary by site.',
		values: {
			infra: { none: 'None', light: 'Light (survey only)', heavy: 'Required (mounted hardware + cabling)' },
			deployTime: { days: 'Days to 1 week', weeks: 'Weeks', months: 'Months' },
			maintenance: { low: 'Low', medium: 'Moderate', high: 'High (regular upkeep required)' },
			carrier: {
				smartphone: 'Smartphone',
				tag: 'Dedicated tag',
				vehicle_kit: 'Vehicle kit',
				fixed_sensor: 'Fixed sensors only (nothing carried)',
				none: 'Nothing carried'
			}
		}
	},
	costTiers: {
		none: 'None',
		low: 'Low',
		medium: 'Medium',
		high: 'High',
		note: 'Cost tiers are structural indicators only — not ¥ figures.'
	},
	pricing: {
		heading: 'TRAILS pricing (zeteoh published rates)',
		setup: 'Setup',
		perDevice: 'Monthly (per device)',
		handsetNote:
			'If you cannot issue your own devices, handsets can be rented or purchased at ¥30,000 each.',
		payback: 'Estimated payback'
	},
	noFit: {
		title: 'No technology fully satisfies your requirements right now',
		intro: 'Some of the conditions you selected are hard to satisfy together.',
		conflicts: {
			needCmLevel: 'the requirement for cm-level accuracy',
			noCarriedDevice: 'the constraint that nothing can be carried or worn',
			realtimeTracking: 'the requirement for facility-wide real-time tracking',
			requirementsConflict: 'the combination of requirements you selected',
			temporaryProject: 'the constraint of a short-term-only measurement project'
		},
		relaxHint:
			'If you can relax one of these (e.g. allow a device in part of the facility, or accept zone-level accuracy), we can suggest a realistic option — feel free to reach out.',
		referenceLabel: 'For reference (closest option)'
	},
	gate: {
		title: 'Get the internal-review slide pack — free',
		subtitle:
			'A ready-to-circulate package with a technology comparison matrix, your requirements restated, risks & mitigations, and a provider-evaluation checklist.',
		email: 'Work email',
		name: 'Name',
		phone: 'Phone (optional)',
		company: 'Company',
		companyFreemailHint: "You're using a free-mail address — please enter your company name",
		department: { label: 'Department / title (optional)', placeholder: 'e.g. Production Manager' },
		consent: 'I agree to the handling of my personal data',
		newsletter: 'Send me updates on indoor positioning (optional)',
		submit: 'Get the slide pack',
		submitting: 'Sending…',
		success: 'Slide pack sent — check your inbox. Your result is shown below too.',
		error: 'Sending failed, but your result is shown below.',
		retry: 'Resend',
		invalidEmail: 'Please enter a valid email address',
		requiredField: 'This field is required'
	},
	report: {
		title: 'Indoor Positioning Technology Selector — Report',
		pocCta: 'Discuss a 2-week PoC'
	},
	slides: {
		title: '{company} — Positioning Technology Review',
		execSummary: 'Executive summary',
		requirements: 'Requirements',
		alternatives: 'Alternatives considered',
		timelineComparison: 'Deployment timeline',
		risks: 'Risks & mitigations',
		checklist: 'Provider-evaluation checklist',
		proposal: 'The proposal',
		sources: 'Sources',
		copySection: 'Copy this section',
		download: 'Save / print as PDF',
		attribution: 'Source: zeteoh Indoor Positioning Technology Selector (zeteoh.com)',
		reDiagnoseInvite: 'If your requirements change, re-run the assessment any time.'
	},
	checklist: {
		uwb: [
			'What anchor density and re-survey terms apply (who pays on layout change)?',
			'What accuracy is guaranteed in non-line-of-sight (NLOS) conditions?',
			'What is the tag battery life and replacement burden?'
		],
		ble: [
			'What is the beacon battery-swap cycle and operational burden?',
			'How is accuracy degradation from metal fixtures/relocations handled?',
			'What are the terms for re-install/recalibration after a layout change?'
		],
		aoa: [
			'What locator density and ceiling work is required?',
			'How is accuracy maintained across multiple floors/handoffs?',
			'What is the support model for tag operations (battery, failures)?'
		],
		smartphone: [
			'What accuracy holds with the phone in a pocket or work jacket?',
			'How is accuracy maintained across floors and elevator transitions?',
			'What is the battery/MDM impact of the always-on app?'
		],
		camera: [
			'What happens to tracking continuity outside covered zones?',
			'What are the retention period, access controls, and privacy governance for video data?',
			'How do lighting changes and occlusion affect tracking accuracy?'
		]
	}
};
