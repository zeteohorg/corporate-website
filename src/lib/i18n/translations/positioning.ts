import type { PositioningTranslation } from '../types';

// Ungated SEO/GEO pages (pillar comparison + vendor directory). They render
// from the SAME data as the Solution Finder (src/lib/data/solution-finder/*) so
// tool and content never diverge. FAQ answers are grounded in the engine's
// knowledge base (IPIN/EvAAL, NLOS studies, BLE deployment research).

export const ja: PositioningTranslation = {
	updatedLabel: '最終更新：2026年7月',
	ctaHeading: 'どの技術が自社に合う？2分で診断',
	ctaText: '7つの質問に答えるだけで、最適な測位技術と3年間の概算コストを提示します。',
	ctaButton: '無料診断をはじめる',
	crossToVendors: '日本のベンダー一覧を見る →',
	crossToComparison: '技術比較（精度・コスト）を見る →',
	pillar: {
		metaTitle: '屋内位置測位技術 比較 2026 — 精度・コスト・導入期間の実測ベース比較',
		metaDescription:
			'UWB・BLE・BLE AoA・Wi-Fi・カメラ・地磁気・ニューラル慣性（TRAILS）を、独立ベンチマーク（IPIN/EvAAL）と実導入研究にもとづき、精度・インフラ・コスト・導入期間で比較。ベンダー選定の判断材料に。',
		h1: '屋内位置測位技術 比較 2026',
		intro:
			'屋内位置測位（IPS/RTLS）の主要技術を、ベンダーの公称値ではなく独立した競技会（IPIN/EvAAL）と実導入の研究にもとづいて比較します。精度・必要インフラ・概算コスト・導入期間、そして「その技術を選ぶべきでない条件」まで明示します。',
		tableCaption: '主要な屋内位置測位技術の比較（実測ベース）',
		headers: {
			tech: '技術',
			accuracy: '実環境の精度',
			infra: '必要インフラ',
			capex: '初期費用/10,000m²',
			opex: '主な運用コスト',
			reject: '不向きな条件'
		},
		capexNote:
			'コストは公開価格と実測ベンチマークからの概算です。正確な金額は施設ごとにお見積もりください。',
		faqHeading: 'よくある質問',
		faq: [
			{
				q: '最も精度が高い屋内位置測位技術は？',
				a: '見通しが確保できる環境ではUWBが最も高精度で、0.1〜0.3mを実現します。ただし金属が多い工場ではマルチパスにより0.3〜1m程度まで低下することが研究で報告されています。カメラ方式は被覆ゾーン内でcm級ですが、施設全体の追跡には向きません。'
			},
			{
				q: 'スマートフォンだけで1〜2mの精度は本当に出る？',
				a: 'ニューラル慣性測位（学習ベースの慣性オドメトリ）は、IPINの足装着IMU部門でQ3誤差約0.5mを記録するなど学術的に上位です。TRAILSは走行中の新幹線でのPoCでも1車両長以上のドリフトを3m未満に補正しています。一方、従来のPDR（自律航法）は補正がないと実環境で3m以上に劣化します。'
			},
			{
				q: 'UWBの導入コストはどれくらい？',
				a: '10,000m²規模で概算¥8M以上。約30mグリッドでアンカーを数十台設置し、電源・配線・測量・校正が必要です。レイアウト変更のたびに再測量が発生し、これが見落とされがちな運用コストになります。'
			},
			{
				q: '金属・コンクリートが多い工場ではどの方式が向く？',
				a: '金属環境ではRSSI（BLEビーコン）やWi-Fiの電波が大きく減衰・反射し、精度が低下します。電波に依存しないニューラル慣性測位（TRAILS）や、見通しが取れる範囲でのUWB＋NLOS補正が有力です。'
			},
			{
				q: '工事不要で導入できる屋内測位は？',
				a: 'スマートフォンを用いるニューラル慣性測位（TRAILS）、地磁気（要事前調査）、既存APを使うWi-Fiフィンガープリント（精度5〜10m）が該当します。天井への機器設置や配線が不要で、短期間で開始できます。'
			},
			{
				q: '自律航法（PDR）とニューラル慣性測位の違いは？',
				a: '従来のPDRは歩数・方位から推定するためドリフトが蓄積し、多くの製品はビーコン併設で補正します（自社サイトで「1m未満には向かない」と明記する例もあります）。ニューラル慣性測位は学習モデルでドリフトを補正し、インフラなしで1〜2mを維持します。'
			}
		]
	},
	directory: {
		metaTitle: '屋内位置測位 日本のベンダー一覧 2026 — RTLS/IPS 比較',
		metaDescription:
			'日本で屋内位置測位（RTLS/IPS）を提供する主要ベンダーの一覧。技術方式・得意領域・最適なケースを客観的に整理。UWB・BLE・カメラ・ニューラル慣性まで競合を含めて掲載。',
		h1: '屋内位置測位 日本のベンダー一覧',
		intro:
			'日本国内で屋内位置測位ソリューションを提供する主要ベンダーを、技術方式ごとに整理しました。各社の「最適なケース」は主観的な評価ではなく、技術特性の比較表にもとづいています。競合他社も含めて掲載しています。',
		headers: {
			vendor: 'ベンダー / 製品',
			tech: '技術',
			niche: '得意領域',
			bestWhen: '最適なケース'
		}
	}
};

export const en: PositioningTranslation = {
	updatedLabel: 'Last updated: July 2026',
	ctaHeading: 'Which technology fits your site? 2-minute check',
	ctaText:
		'Answer 7 questions and get your best-fit positioning technology plus a 3-year cost range.',
	ctaButton: 'Start the free assessment',
	crossToVendors: 'See the directory of vendors in Japan →',
	crossToComparison: 'See the technology comparison (accuracy & cost) →',
	pillar: {
		metaTitle: 'Indoor Positioning Technology Comparison 2026 — accuracy, cost & deployment',
		metaDescription:
			'Compare UWB, BLE, BLE AoA, Wi-Fi, camera, geomagnetic and neural-inertial (TRAILS) indoor positioning on accuracy, infrastructure, cost and deployment time — based on independent benchmarks (IPIN/EvAAL) and real-deployment studies.',
		h1: 'Indoor Positioning Technology Comparison 2026',
		intro:
			'A comparison of the main indoor positioning (IPS/RTLS) technologies based on independent competition results (IPIN/EvAAL) and real-deployment studies — not vendor marketing. For each we show realistic accuracy, required infrastructure, indicative cost, deployment time, and the conditions under which it should be rejected.',
		tableCaption: 'Comparison of the main indoor positioning technologies (field-based)',
		headers: {
			tech: 'Technology',
			accuracy: 'Realistic accuracy',
			infra: 'Infrastructure',
			capex: 'CAPEX / 10,000 m²',
			opex: 'Dominant OPEX',
			reject: 'Reject when'
		},
		capexNote:
			'Costs are directional estimates from public list prices and field benchmarks — request a facility-specific quote for a firm number.',
		faqHeading: 'Frequently asked questions',
		faq: [
			{
				q: 'Which indoor positioning technology is the most accurate?',
				a: 'In line-of-sight conditions UWB is the most accurate, reaching 0.1–0.3 m. In metal-heavy factories multipath degrades it to roughly 0.3–1 m without ML-based NLOS correction. Camera systems reach cm-level inside covered zones but are weak for facility-wide tracking.'
			},
			{
				q: 'Can smartphone-only positioning really achieve 1–2 m?',
				a: 'Neural-inertial positioning (learned inertial odometry) is academically top-tier — foot-mounted IMU systems scored ~0.5 m Q3 error at IPIN. TRAILS corrected drift from over a car-length to under 3 m even in a moving Shinkansen PoC. Classic PDR without learned correction, by contrast, degrades to 3 m or worse in real facilities.'
			},
			{
				q: 'How much does UWB cost to deploy?',
				a: 'Roughly ¥8M+ for a 10,000 m² site: dozens of anchors on a ~30 m grid, each surveyed, powered and cabled. Every layout change forces a re-survey — a recurring OPEX that vendors rarely price in.'
			},
			{
				q: 'Which method suits metal- and concrete-heavy factories?',
				a: 'In metallic environments RF signals (BLE RSSI, Wi-Fi) attenuate and reflect, degrading accuracy sharply. RF-independent neural-inertial positioning (TRAILS), or UWB with NLOS correction where line-of-sight is available, are the strongest options.'
			},
			{
				q: 'Which indoor positioning needs no construction?',
				a: 'Smartphone-based neural-inertial positioning (TRAILS), geomagnetic (after a site survey), and Wi-Fi fingerprinting on existing APs (5–10 m accuracy). None require ceiling-mounted hardware or cabling, so they deploy fast.'
			},
			{
				q: 'PDR (dead reckoning) vs neural-inertial — what is the difference?',
				a: 'Classic PDR estimates from step count and heading, so drift accumulates and most products add beacons to correct it (some vendors state on their own site that it is "not suited to sub-1 m"). Neural-inertial positioning uses a learned model to correct drift and holds 1–2 m with no infrastructure.'
			}
		]
	},
	directory: {
		metaTitle: 'Indoor Positioning Vendors in Japan 2026 — RTLS/IPS directory',
		metaDescription:
			'A directory of the main indoor positioning (RTLS/IPS) vendors in Japan, organized by technology, with an objective "best when" line for each — UWB, BLE, camera and neural-inertial, competitors included.',
		h1: 'Indoor Positioning Vendors in Japan',
		intro:
			'A directory of the main vendors offering indoor positioning solutions in Japan, organized by technology. Each "best when" line is drawn from the technical comparison table, not subjective judgement — and competitors are included.',
		headers: {
			vendor: 'Vendor / Product',
			tech: 'Technology',
			niche: 'Niche',
			bestWhen: 'Best when'
		}
	}
};
