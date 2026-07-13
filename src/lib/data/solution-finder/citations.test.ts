import { describe, expect, it } from 'vitest';
import { CITATIONS, citationById } from './citations';

describe('citations', () => {
	it('has unique ids', () => {
		const ids = CITATIONS.map((c) => c.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
	it('resolves by id', () => {
		expect(citationById('ipin2019')?.year).toBe(2020);
	});
	it('every entry has a url and note', () => {
		for (const c of CITATIONS) {
			expect(c.url).toMatch(/^https?:\/\//);
			expect(c.note.length).toBeGreaterThan(10);
		}
	});
});
