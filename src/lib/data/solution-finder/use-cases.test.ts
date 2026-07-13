import { describe, expect, it } from 'vitest';
import { selectUseCases } from './use-cases';
import type { Answers, Facility } from './types';

const table: Record<Facility, string[]> = {
	factory: ['f1', 'f2', 'f3', 'f-vehicle'],
	warehouse: ['w1', 'w2', 'w3', 'w-vehicle'],
	construction: ['c1', 'c2', 'c3', 'c4'],
	hospital_office: ['h1', 'h2', 'h3', 'h4'],
	other: ['o1', 'o2', 'o3', 'o4']
};

const base: Answers = { targets: ['workers'], constraints: [] };

describe('selectUseCases', () => {
	it('picks the facility array', () => {
		expect(selectUseCases({ ...base, facility: 'construction' }, table)).toEqual([
			'c1', 'c2', 'c3', 'c4'
		]);
	});
	it('factory/warehouse drop the vehicle item when vehicles are not tracked', () => {
		expect(selectUseCases({ ...base, facility: 'factory' }, table)).toEqual(['f1', 'f2', 'f3']);
		expect(selectUseCases({ ...base, facility: 'warehouse' }, table)).toEqual(['w1', 'w2', 'w3']);
	});
	it('factory/warehouse include the vehicle item when vehicles are tracked', () => {
		const a: Answers = { ...base, targets: ['workers', 'vehicles'], facility: 'factory' };
		expect(selectUseCases(a, table)).toEqual(['f1', 'f2', 'f3', 'f-vehicle']);
	});
	it('non-industrial facilities keep all items regardless of vehicles', () => {
		const a: Answers = { ...base, targets: ['workers', 'vehicles'], facility: 'hospital_office' };
		expect(selectUseCases(a, table)).toEqual(['h1', 'h2', 'h3', 'h4']);
	});
	it('falls back to the other array when facility is unset', () => {
		expect(selectUseCases(base, table)).toEqual(['o1', 'o2', 'o3', 'o4']);
	});
});
