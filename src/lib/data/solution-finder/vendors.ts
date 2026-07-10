// Japanese vendor library (§4). Shipped in the report shortlist and on the
// ungated vendor-directory page. Public-safe only — competitor rows use their
// own published positioning, never internal sales-battlecard intel. Re-verify
// links quarterly. `matchTech` filters the shortlist to the recommended techs.

import type { TechId } from './types';

export interface Vendor {
	id: string;
	name: string;
	/** Positioning technologies this vendor primarily delivers. */
	matchTech: TechId[];
	tech: { en: string; ja: string };
	niche: { en: string; ja: string };
	/** Objective "best when…" line drawn from the truth table (no adjectives). */
	bestWhen: { en: string; ja: string };
	link: string;
	/** zeteoh's own row is rendered with honest positioning, not marketing. */
	isSelf?: boolean;
}

export const VENDORS: Vendor[] = [
	{
		id: 'zeteoh-trails',
		name: 'zeteoh — TRAILS',
		matchTech: ['trails'],
		tech: {
			en: 'Spatial AI (neural inertial, smartphone)',
			ja: 'Spatial AI（ニューラル慣性・スマホ）'
		},
		niche: {
			en: 'Factory/logistics flow analysis, infrastructure-free, harsh sites',
			ja: '工場・物流の動線分析、インフラ不要、過酷環境'
		},
		bestWhen: {
			en: 'No-install constraint, 1–2 m continuous accuracy, fast start, metallic sites',
			ja: '工事不可・1〜2m連続精度・短期導入・金属環境'
		},
		link: 'https://zeteoh.com',
		isSelf: true
	},
	{
		id: 'beacapp',
		name: 'Beacapp — Beacapp Here',
		matchTech: ['ble_rssi'],
		tech: { en: 'BLE (RSSI)', ja: 'BLE（RSSI）' },
		niche: { en: 'Office presence / 所在管理', ja: 'オフィス在席・所在管理' },
		bestWhen: {
			en: 'Room/zone-level office presence, existing BLE ecosystem',
			ja: '部屋・エリア単位のオフィス在席管理'
		},
		link: 'https://jp.beacapp-here.com'
	},
	{
		id: 'marubeni-ifield',
		name: '丸紅I-DIGIO — iField',
		matchTech: ['ble_rssi'],
		tech: { en: 'BLE (RSSI)', ja: 'BLE（RSSI）' },
		niche: {
			en: 'Factory/warehouse people & vehicle flow, dwell analysis',
			ja: '工場・倉庫の人・車両動線、滞留分析'
		},
		bestWhen: {
			en: 'Zone-level dwell/flow where beacon install is acceptable',
			ja: 'ビーコン設置可能なエリア単位の滞留・動線'
		},
		link: 'https://www.marubeni-idigio.com'
	},
	{
		id: 'sato-rtls',
		name: 'サトー (SATO) — RTLS (Quuppa / Ubisense)',
		matchTech: ['ble_aoa', 'uwb'],
		tech: { en: 'BLE AoA (~50 cm) / UWB (~15 cm)', ja: 'BLE AoA（約50cm）／UWB（約15cm）' },
		niche: {
			en: 'Integrator; manufacturing & logistics; starter packages',
			ja: 'インテグレーター、製造・物流、スターターパッケージ'
		},
		bestWhen: {
			en: 'Sub-meter precision with an integrator and starter package',
			ja: 'サブメーター精度をインテグレーター経由で導入'
		},
		link: 'https://www.sato.co.jp/products/realtime_locationsystem/'
	},
	{
		id: 'quuppa',
		name: 'Quuppa (JP: SATO, Marubun ほか)',
		matchTech: ['ble_aoa'],
		tech: { en: 'BLE AoA', ja: 'BLE AoA' },
		niche: {
			en: 'High-precision tag tracking: factories/hospitals/sports',
			ja: '高精度タグ追跡：工場・病院・スポーツ'
		},
		bestWhen: {
			en: '0.1–1 m tag tracking with ceiling locator arrays',
			ja: '天井ロケーターで0.1〜1mのタグ追跡'
		},
		link: 'https://www.quuppa.com'
	},
	{
		id: 'sewio',
		name: 'Sewio RTLS (JP resellers)',
		matchTech: ['uwb'],
		tech: { en: 'UWB (TDoA)', ja: 'UWB（TDoA）' },
		niche: {
			en: 'Forklift/asset tracking, collision safety',
			ja: 'フォークリフト・資産追跡、衝突防止'
		},
		bestWhen: {
			en: 'cm-level forklift tracking and collision zones',
			ja: 'cm級のフォークリフト追跡・衝突防止ゾーン'
		},
		link: 'https://www.sewio.net'
	},
	{
		id: 'ubisense',
		name: 'Ubisense',
		matchTech: ['uwb'],
		tech: { en: 'UWB (AoA+TDoA, 3D)', ja: 'UWB（AoA+TDoA、3D）' },
		niche: {
			en: 'Automotive/heavy manufacturing precision tracking',
			ja: '自動車・重工業の精密追跡'
		},
		bestWhen: {
			en: '3D cm-level precision in heavy manufacturing',
			ja: '重工業での3D cm級精密追跡'
		},
		link: 'https://ubisense.com'
	},
	{
		id: 'fujitsu-video',
		name: '富士通 — 映像位置測位',
		matchTech: ['camera'],
		tech: { en: 'Camera + AI (tag-free)', ja: 'カメラ+AI（タグ不要）' },
		niche: {
			en: 'Work-cell motion capture, mm–cm in covered zones',
			ja: '作業セルのモーション計測、被覆ゾーンでmm〜cm'
		},
		bestWhen: {
			en: 'Fixed work-cells where cameras cover the area, tag-free',
			ja: 'カメラ被覆の固定作業セル、タグ不要'
		},
		link: 'https://www.fujitsu.com/jp/services/edgecloud-solution/'
	},
	{
		id: 'zenrin-datacom',
		name: 'ゼンリンデータコム — スマートファクトリー',
		matchTech: ['ble_rssi', 'wifi'],
		tech: { en: 'Multi-tech consulting (BLE/Wi-Fi/…)', ja: '複合技術コンサル（BLE/Wi-Fi等）' },
		niche: {
			en: 'Measurement→analysis→report as a service',
			ja: '計測→分析→レポートのサービス'
		},
		bestWhen: {
			en: 'One-off measurement study rather than a standing system',
			ja: '常設ではなく単発の計測調査'
		},
		link: 'https://www.zenrin-datacom.net/solution/smartfactory'
	},
	{
		id: 'panasonic-libecom',
		name: 'パナソニック — LiBecoM',
		matchTech: ['ble_rssi'],
		tech: { en: 'Lighting-embedded beacon (光ID/BLE)', ja: '照明埋込ビーコン（光ID/BLE）' },
		niche: {
			en: 'Offices, hospitals, retail using existing lighting',
			ja: '既存照明を活用したオフィス・病院・小売'
		},
		bestWhen: {
			en: 'Buildings replacing lighting anyway (beacon in fixtures)',
			ja: '照明更新時にビーコンを同時導入'
		},
		link: 'https://www2.panasonic.biz'
	},
	{
		id: 'pinmicro',
		name: 'Pinmicro — RTLS platform',
		matchTech: ['ble_rssi', 'ble_aoa'],
		tech: { en: 'BLE (RSSI/AoA)', ja: 'BLE（RSSI/AoA）' },
		niche: { en: 'Office & facility RTLS platform', ja: 'オフィス・施設RTLSプラットフォーム' },
		bestWhen: {
			en: 'Platform-led BLE RTLS across office/facility',
			ja: 'オフィス・施設横断のBLE RTLS基盤'
		},
		link: 'https://pinmicro.jp'
	},
	{
		id: 'inqross',
		name: 'InQross — カイゼンメーカー',
		matchTech: ['ble_rssi'],
		tech: { en: 'BLE (cross-beacon, no-construction)', ja: 'BLE（クロスビーコン・工事不要）' },
		niche: {
			en: 'Small-area worker kaizen analytics, closed/no-cloud',
			ja: '小エリアの作業者カイゼン分析、閉域・非クラウド'
		},
		bestWhen: {
			en: 'Small closed-area kaizen studies without cloud',
			ja: 'クラウド不可の小エリア・カイゼン調査'
		},
		link: 'https://mono.ipros.com'
	},
	{
		id: 'bestskip',
		name: 'BestSkip RTLS',
		matchTech: ['uwb'],
		tech: { en: 'UWB (proprietary)', ja: 'UWB（独自）' },
		niche: { en: 'Warehouse 所在管理・動線分析', ja: '倉庫の所在管理・動線分析' },
		bestWhen: {
			en: 'Warehouse cm-level location where anchors are viable',
			ja: 'アンカー設置可能な倉庫のcm級測位'
		},
		link: 'https://www.bestskip.com/technology/iot'
	},
	{
		id: 'nec',
		name: 'NEC — 位置情報ソリューション',
		matchTech: ['acoustic'],
		tech: { en: 'Acoustic / hybrid', ja: '音響／ハイブリッド' },
		niche: { en: 'Public infrastructure, large facilities', ja: '公共インフラ、大規模施設' },
		bestWhen: {
			en: 'Large public-infrastructure deployments',
			ja: '大規模な公共インフラ導入'
		},
		link: 'https://jpn.nec.com'
	},
	{
		id: 'softbank',
		name: 'ソフトバンク — 位置測位ソリューション',
		matchTech: ['uwb'],
		tech: { en: 'UWB / GNSS hybrid', ja: 'UWB／GNSSハイブリッド' },
		niche: { en: 'Large-campus logistics automation', ja: '大規模拠点の物流自動化' },
		bestWhen: {
			en: 'Campus-scale logistics with UWB+GNSS',
			ja: 'UWB+GNSSの拠点規模物流'
		},
		link: 'https://www.softbank.jp/biz/'
	},
	{
		id: 'sony',
		name: 'ソニー — 位置測位 (製造向け)',
		matchTech: ['uwb'],
		tech: { en: 'UWB / hybrid', ja: 'UWB／ハイブリッド' },
		niche: { en: 'Manufacturing, tool tracking', ja: '製造、工具追跡' },
		bestWhen: {
			en: 'Manufacturing tool-tracking with UWB',
			ja: 'UWBによる製造工具追跡'
		},
		link: 'https://www.sony.co.jp'
	},
	{
		id: 'lefixea-lrtk',
		name: 'Lefixea — LRTK',
		matchTech: ['gnss'],
		tech: { en: 'RTK-GNSS extension', ja: 'RTK-GNSS拡張' },
		niche: { en: 'Yard / 半屋外 cm-level surveying', ja: 'ヤード・半屋外のcm級測量' },
		bestWhen: {
			en: 'Outdoor/semi-outdoor yards needing cm-level GNSS',
			ja: 'cm級GNSSが要る屋外・半屋外ヤード'
		},
		link: 'https://www.lrtk.lefixea.com'
	},
	{
		id: 'nsd-trackingnavi',
		name: 'NSD — トラッキングナビ',
		matchTech: ['ble_rssi'],
		tech: {
			en: 'BLE beacons + PDR smoothing (hybrid; beacons required)',
			ja: 'BLEビーコン+PDR補正（ハイブリッド・ビーコン必須）'
		},
		niche: {
			en: 'Factory/warehouse worker flow; ~3 m+ effective (own site: 「1m未満には向かない」)',
			ja: '工場・倉庫の作業者動線；実効約3m以上（自社サイト「1m未満には向かない」）'
		},
		bestWhen: {
			en: 'Flow analysis where BLE beacons can be installed and ≥1 m is acceptable',
			ja: 'BLEビーコン設置可・1m以上で足りる動線分析'
		},
		link: 'https://www.products.nsd.co.jp/service/trackingnavi/'
	},
	{
		id: 'guide-robotics',
		name: 'Guide Robotics — GuideNS™',
		matchTech: ['visual_slam'],
		tech: {
			en: 'Visual-Inertial SLAM (stereo camera + edge PC on vehicle)',
			ja: 'Visual-Inertial SLAM（ステレオカメラ+車載エッジPC）'
		},
		niche: {
			en: 'Forklift/AGV/AMR tracking & navigation, ~20 cm, multi-floor',
			ja: 'フォークリフト/AGV/AMRの追跡・ナビ、約20cm、複数フロア'
		},
		bestWhen: {
			en: 'Per-vehicle ~20 cm tracking with minimal facility infra (markers only)',
			ja: '車両単位で約20cm、施設インフラ最小（マーカーのみ）'
		},
		link: 'https://guide-ns.com'
	}
];

/** Shortlist rows matching any of the given techs, self row first. */
export function vendorsForTechs(techs: TechId[]): Vendor[] {
	const set = new Set(techs);
	return VENDORS.filter((v) => v.matchTech.some((t) => set.has(t))).sort(
		(a, b) => Number(b.isSelf ?? false) - Number(a.isSelf ?? false)
	);
}
