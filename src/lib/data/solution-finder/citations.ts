// Evidence layer (spec §8). Every applicability criterion in tech.ts /
// rules.ts points here. Rendered on the methodology page and in the slide
// pack sources appendix. Extend via PR; keep notes claim-specific.

export interface Citation {
	id: string;
	authors: string;
	title: string;
	venue: string;
	year: number;
	url: string;
	/** What specific claim this source backs (used as the footnote text). */
	note: string;
}

export const CITATIONS: Citation[] = [
	{
		id: 'ipin2019',
		authors: 'Potortì, F. et al.',
		title: 'The IPIN 2019 Indoor Localisation Competition — Description and Results',
		venue: 'IEEE Access',
		year: 2020,
		url: 'https://doi.org/10.1109/ACCESS.2020.3037221',
		note: 'Realistic lab-vs-field gap: best on-site smartphone systems 5.5–11.7 m Q3 error; only off-site post-processing reached 0.9–1.3 m; foot-mounted IMU best wearable class (~0.5 m Q3).'
	},
	{
		id: 'zafari2019',
		authors: 'Zafari, F.; Gkelias, A.; Leung, K.',
		title: 'A Survey of Indoor Localization Systems and Technologies',
		venue: 'IEEE Communications Surveys & Tutorials',
		year: 2019,
		url: 'https://doi.org/10.1109/COMST.2019.2911558',
		note: 'Cross-technology accuracy/infrastructure comparison baseline: Wi-Fi fingerprinting meter-to-room level; BLE RSSI meter-level with dense beacons; UWB decimeter with anchor infrastructure.'
	},
	{
		id: 'mendoza2019',
		authors: 'Mendoza-Silva, G.; Torres-Sospedra, J.; Huerta, J.',
		title: 'A Meta-Review of Indoor Positioning Systems',
		venue: 'Sensors',
		year: 2019,
		url: 'https://doi.org/10.3390/s19204507',
		note: 'Meta-review across 62 surveys; documents survey/mapping burden of fingerprinting methods (Wi-Fi, magnetic) and their recalibration sensitivity to environmental change.'
	},
	{
		id: 'uwb-nlos-2023',
		authors: 'Electronics (MDPI) survey authors',
		title: 'Survey on NLOS Identification and Error Mitigation for UWB Indoor Positioning',
		venue: 'Electronics 12(7)',
		year: 2023,
		url: 'https://doi.org/10.3390/electronics12071678',
		note: 'NLOS-condition UWB errors routinely exceed 30 cm vs cm-level LOS; metal racking/machinery are the dominant industrial multipath sources. Open access.'
	},
	{
		id: 'magnetic2022',
		authors: 'Electronics (MDPI) survey authors',
		title: 'A Survey of Magnetic-Field-Based Indoor Localization',
		venue: 'Electronics 11(6)',
		year: 2022,
		url: 'https://doi.org/10.3390/electronics11060864',
		note: 'Distinguishes smartphone-magnetometer fingerprinting (~1–3 m) from deployed magnetic-beacon systems; both vulnerable to moving ferromagnetic masses (forklifts, steel doors, vehicles) causing field drift after survey. Backs geomag_phone/geomag_infra split and the notIndustrial rule. Open access.'
	},
	{
		id: 'bleaoa2021',
		authors: 'Ozturk, M. et al.',
		title: 'Bluetooth 5.1: An Analysis of Direction Finding Capability for High-Precision Location Services',
		venue: 'Sensors 21(11)',
		year: 2021,
		url: 'https://doi.org/10.3390/s21113589',
		note: 'BLE 5.1 AoA sub-meter potential (to ~0.1 m ideal); multipath is the dominant real-world error source; classical RSSI BLE remains room/zone level. Open access.'
	},
	{
		id: 'wifidecay2018',
		authors: 'Sensors (Bayesian fingerprinting study)',
		title: 'A Bayesian Density Model Based Radio Signal Fingerprinting Positioning Method',
		venue: 'Sensors',
		year: 2018,
		url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6263809/',
		note: 'Quantifies Wi-Fi fingerprint usability decay and re-fingerprinting need after infrastructure/layout change — the maintenance-burden and notIndustrial citation for Wi-Fi FP. Open access.'
	},
	{
		id: 'dlinertial2024',
		authors: 'Chen, C. et al.',
		title: 'Deep Learning for Inertial Positioning: A Survey',
		venue: 'IEEE Trans. Intelligent Transportation Systems',
		year: 2024,
		url: 'https://arxiv.org/abs/2303.03757',
		note: 'Definitive survey of learned inertial odometry (RoNIN/TLIO/RIDI lineage); learned models bound drift without infrastructure where classical PDR fails. Open-access preprint.'
	},
	{
		id: 'pdr-drift-2020',
		authors: 'Zhang, W. et al.',
		title: 'Enhanced Heuristic Drift Elimination with Adaptive Zero-Velocity Detection',
		venue: 'IEEE Access / PMC7070454',
		year: 2020,
		url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7070454/',
		note: 'Classical PDR distance error ~7–12% uncorrected vs <1% with ZUPT-style correction — the "PDR needs correction infrastructure" citation. Open access.'
	},
	{
		id: 'ipin2020',
		authors: 'Potortì, F. et al.',
		title: 'Off-Line Evaluation of Indoor Positioning Systems in Different Scenarios: The IPIN 2020 Competition',
		venue: 'IEEE (ieeexplore 9439493)',
		year: 2021,
		url: 'https://ieeexplore.ieee.org/abstract/document/9439493',
		note: 'Best third-quartile errors: ~1 m (smartphone track), ~0.5 m (foot-mounted IMU) — realistic best-case baselines for smartphone and inertial classes.'
	},
	{
		id: 'ble-practical-2021',
		authors: 'Sensors (BLE RSSI measurement practice)',
		title: 'A Practice of BLE RSSI Measurement for Indoor Positioning',
		venue: 'Sensors',
		year: 2021,
		url: 'https://doi.org/10.3390/s21155181',
		note: 'Sub-meter accuracy is not achievable from raw RSSI in complex 3D environments; reliable ranging degrades sharply beyond ~4–5 m and behind metal.'
	},
	{
		id: 'ronin2020',
		authors: 'Herath, S.; Yan, H.; Furukawa, Y.',
		title: 'RoNIN: Robust Neural Inertial Navigation in the Wild',
		venue: 'IEEE ICRA',
		year: 2020,
		url: 'https://doi.org/10.1109/ICRA40945.2020.9196860',
		note: 'Learned inertial odometry substantially outperforms classical PDR (heading-drift failure) on natural smartphone carriage — the academic basis of the PDR-vs-neural-inertial distinction.'
	},
	{
		id: 'nsd-published',
		authors: 'NSD Co., Ltd.',
		title: 'トラッキングナビ 製品ページ（自社公表仕様）',
		venue: 'products.nsd.co.jp',
		year: 2026,
		url: 'https://www.products.nsd.co.jp/service/trackingnavi/',
		note: 'Vendor-published statements only: PDR-hybrid requires BLE beacon installation; own site states 1 m 未満の精緻な計測には向かない. (Used for the pdr tech row, no vendor named in output.)'
	}
];

export const citationById = (id: string): Citation | undefined =>
	CITATIONS.find((c) => c.id === id);
