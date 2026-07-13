// Golden-scenario acceptance gate (spec §9.1). Each row is a realistic
// persona with a Yann-reviewed expected verdict. Golden failures here mean
// the ENGINE is wrong, not the test — fix rules.ts, never weaken assertions.

import { describe, expect, it } from 'vitest';
import { recommend } from './rules';
import type { Answers, TechId } from './types';

const F: Answers = {
	facility: 'factory', targets: ['workers'], area: '2000_10000', people: '20_100',
	accuracy: '1_3m', constraints: [], device: 'company_phones', timeline: '3mo'
};

const SCENARIOS = [
	{ name: '金属多い大規模工場・500人・複数フロア', a: { ...F, people: 'gt500', constraints: ['metal', 'multi_floor'], floors: 'two' }, primary: 'trails' },
	{ name: 'クリーンルーム・何も携帯不可・リアルタイム動線', a: { ...F, device: 'nothing' }, noFit: true },
	{ name: '食品工場・スマホ不可タグ可・1-3m', a: { ...F, device: 'tag_only' }, primary: 'ble_aoa', excluded: ['trails'] },
	{ name: '建設現場（仮設）・短期計測', a: { ...F, facility: 'construction', constraints: ['temporary'] }, primary: 'trails' },
	{ name: 'AGV衝突防止・cm級', a: { ...F, targets: ['vehicles'], vehicles: '5_20', accuracy: '30cm' }, primary: 'visual_slam', excluded: ['trails'] },
	{ name: '倉庫繁忙期のみの計測（temporary）+ cm級 → 矛盾', a: { ...F, accuracy: '30cm', constraints: ['temporary'] }, noFit: true },
	{ name: '病院オフィス来訪者・ゾーンで十分・工事NG', a: { ...F, facility: 'hospital_office', targets: ['visitors'], accuracy: 'zone', constraints: ['no_install'] }, primary: 'trails' },
	{ name: '資材のみ・ゾーン', a: { ...F, targets: ['tools'], accuracy: 'zone' }, primary: 'qr_nfc', excluded: ['trails'] },
	{ name: '小規模ラボ・cm級', a: { ...F, area: 'lt2000', accuracy: '30cm' }, primary: 'ble_aoa' },
	{ name: '1ヶ月以内に開始', a: { ...F, timeline: '1mo' }, primary: 'trails' },
	{ name: '人+フォークリフトの標準工場', a: { ...F, targets: ['workers', 'vehicles'], vehicles: '5_20' }, hybrid: true },
	{ name: 'レイアウト頻繁変更・1-3m・金属', a: { ...F, constraints: ['metal', 'frequent_layout'] }, primary: 'trails', excluded: ['geomag_phone', 'pdr'] }
] as const;

describe('golden scenarios (spec §9.1)', () => {
	it.each(SCENARIOS)('$name', (s) => {
		const v = recommend(s.a as Answers);
		if ('noFit' in s && s.noFit) {
			expect(v.noFit).toBeDefined();
		}
		if ('primary' in s && s.primary) {
			expect(v.primary.tech).toBe(s.primary as TechId);
		}
		if ('hybrid' in s && s.hybrid) {
			expect(v.isHybrid).toBe(true);
		}
		if ('excluded' in s && s.excluded) {
			const excludedTechs = v.excluded.map((e) => e.tech);
			for (const tech of s.excluded) expect(excludedTechs).toContain(tech);
		}
	});
});
