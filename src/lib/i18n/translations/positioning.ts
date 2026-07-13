import type { PositioningTranslation } from '../types';

// Ungated SEO/GEO methodology page. Renders from the SAME data as the
// Technology Selector (src/lib/data/solution-finder/*) so tool and content
// never diverge. FAQ answers are grounded in the engine's citations layer
// (IPIN/EvAAL, NLOS studies, BLE deployment research) — deployment-burden
// framing, never cost framing (the tool judges fit, not price).

export const ja: PositioningTranslation = {
	updatedLabel: '最終更新：2026年7月',
	ctaHeading: 'どの技術が自社に合う？2分で診断',
	ctaText: '8つの質問に答えるだけで、現場の条件から最適な測位技術を判定します。',
	ctaButton: '無料診断をはじめる',
	crossToComparison: '技術比較（精度・導入負荷）を見る →',
	pillar: {
		metaTitle: '屋内位置測位技術 比較 2026 — 精度・導入負荷・導入期間の実測ベース比較',
		metaDescription:
			'UWB・BLE・BLE AoA・Wi-Fi・カメラ・地磁気・ニューラル慣性（TRAILS）を、独立ベンチマーク（IPIN/EvAAL）と実導入研究にもとづき、精度・インフラ・導入期間・運用負荷で比較。ベンダー選定の判断材料に。',
		h1: '屋内位置測位技術 比較 2026',
		intro:
			'屋内位置測位（IPS/RTLS）の主要技術を、ベンダーの公称値ではなく独立した競技会（IPIN/EvAAL）と実導入の研究にもとづいて比較します。費用ではなく、現場の条件から最適な技術を判定します。精度・必要インフラ・導入期間・運用負荷、そして「その技術を選ぶべきでない条件」まで明示します。',
		tableCaption: '主要な屋内位置測位技術の比較（実測ベース）',
		headers: {
			tech: '技術',
			accuracy: '実環境の精度',
			install: '設置工事',
			deployTime: '導入期間',
			maintenance: '運用負荷',
			reject: '不向きな条件'
		},
		capexNote:
			'設置工事・導入期間・運用負荷は代表的な構成にもとづく構造的な目安です（金額ではありません）。正確な条件は個別にご相談ください。',
		pdrVsNeural: {
			heading: '自律航法（PDR）とニューラル慣性測位の違い',
			body: '従来のPDR（自律航法）は歩数・方位から位置を推定するため、時間の経過とともにドリフト（誤差の蓄積）が生じます。多くの製品はビーコン併設による補正で実用化しており、自社サイトで「1m未満の精緻な計測には向かない」と明記する例もあります。一方、ニューラル慣性測位（学習ベースの慣性オドメトリ、RoNIN/TLIO系）は学習モデルでドリフトを補正し、追加インフラなしで1〜2mの精度を維持します。IPIN競技会でも、足装着IMU部門はQ3誤差約0.5mを記録するなど、学術的に上位の実績があります。'
		},
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
				q: 'UWBの導入にはどのくらいの工事・期間がかかる？',
				a: '10,000m²規模で約30mグリッドにアンカーを数十台設置するため、電源・配線・測量・校正が必要で、導入期間は数ヶ月単位になります。レイアウト変更のたびに再測量が発生し、これが見落とされがちな運用負荷になります。'
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
	}
};

export const en: PositioningTranslation = {
	updatedLabel: 'Last updated: July 2026',
	ctaHeading: 'Which technology fits your site? 2-minute check',
	ctaText: 'Answer 8 questions and we judge the best-fit positioning technology from your site conditions.',
	ctaButton: 'Start the free assessment',
	crossToComparison: 'See the technology comparison (accuracy & deployment) →',
	pillar: {
		metaTitle: 'Indoor Positioning Technology Comparison 2026 — accuracy, install & deployment time',
		metaDescription:
			'Compare UWB, BLE, BLE AoA, Wi-Fi, camera, geomagnetic and neural-inertial (TRAILS) indoor positioning on accuracy, infrastructure, deployment time and maintenance load — based on independent benchmarks (IPIN/EvAAL) and real-deployment studies.',
		h1: 'Indoor Positioning Technology Comparison 2026',
		intro:
			'A comparison of the main indoor positioning (IPS/RTLS) technologies based on independent competition results (IPIN/EvAAL) and real-deployment studies — not vendor marketing. We judge fit from site conditions, not cost. For each technology we show realistic accuracy, required infrastructure, deployment time, maintenance load, and the conditions under which it should be rejected.',
		tableCaption: 'Comparison of the main indoor positioning technologies (field-based)',
		headers: {
			tech: 'Technology',
			accuracy: 'Realistic accuracy',
			install: 'Installation',
			deployTime: 'Deploy time',
			maintenance: 'Maintenance load',
			reject: 'Reject when'
		},
		capexNote:
			'Installation, deploy time, and maintenance load are structural indicators for a representative setup — not ¥ figures. Talk to us for your site-specific conditions.',
		pdrVsNeural: {
			heading: 'PDR (dead reckoning) vs neural-inertial positioning',
			body: 'Classic PDR estimates position from step count and heading, so drift accumulates over time. Most commercial products correct this with added beacon infrastructure — some vendors state on their own site that it is "not suited to sub-1 m accuracy." Neural-inertial positioning (learned inertial odometry, in the RoNIN/TLIO lineage) instead uses a learned model to bound drift and holds 1–2 m accuracy with no added infrastructure. At the IPIN competition, the foot-mounted-IMU class scored ~0.5 m Q3 error — an academically top-tier result.'
		},
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
				q: 'How much installation and time does UWB take to deploy?',
				a: 'For a 10,000 m² site, expect dozens of anchors on a ~30 m grid, each surveyed, powered and cabled — a deployment measured in months, not weeks. Every layout change forces a re-survey, a recurring maintenance load that is easy to underestimate up front.'
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
	}
};
