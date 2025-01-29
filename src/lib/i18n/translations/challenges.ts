import type { ChallengesTranslation } from '../types';

export const en: ChallengesTranslation = {
	title: 'Unlock the 90% of Business Data Hidden Indoors',
	subtitle:
		'While 90% of critical business operations occur indoors - in manufacturing plants, warehouses, and commercial facilities - the movement of people and assets remains an untapped source of intelligence.',
	items: [
		{
			title: 'High Implementation Costs',
			description:
				'Specialized hardware installation, system integration, and calibration - traditional indoor positioning solutions require substantial upfront investment'
		},
		{
			title: 'Operational Burden',
			description:
				'Rising maintenance costs from battery replacement and regular calibration of beacons'
		},
		{
			title: 'Environmental Limitations',
			description:
				'Radio interference, metal surfaces, and ceiling heights often make implementation impossible'
		}
	]
};

export const ja: ChallengesTranslation = {
	title: '未活用の屋内データが、ビジネスの90%を変える',
	subtitle:
		'製造、インフラ、建設、交通、商業施設...。ビジネスの核となる空間の90%は屋内にありながら、そこでの人やモノの動きは「見えない資産」となっています。',
	items: [
		{
			title: '高コスト',
			description:
				'専用機器の設置、システム構築、導入後の調整など - 既存の屋内位置測位システムの導入では大規模な初期投資が必要'
		},
		{
			title: '運用負担の現実',
			description: 'ビーコンの電池交換、定期的な位置補正作業による保守コストの増大'
		},
		{
			title: '導入環境の制約',
			description: '電波干渉、金属壁面、天井高など、施設特性による制約で導入を断念'
		}
	]
};
