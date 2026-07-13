// Facility-specific use-case selection for the slide pack and verdict screen.
// Pure logic only — the human-readable use-case copy lives in the i18n
// `solutionFinder.slides.useCases.<facility>` arrays. For factory/warehouse
// the 4th item is vehicle-specific and only shown when vehicles are tracked;
// every other facility's items are unconditional.

import type { Answers, Facility } from './types';

/** Facilities whose 4th use-case item is vehicle-specific. */
const VEHICLE_CONDITIONAL: ReadonlySet<Facility> = new Set(['factory', 'warehouse']);

/** Pick the use-case items for the visitor's facility, enriched by targets. */
export function selectUseCases<T>(a: Answers, table: Record<Facility, T[]>): T[] {
	const facility: Facility = a.facility ?? 'other';
	const items = table[facility] ?? table.other;
	if (VEHICLE_CONDITIONAL.has(facility) && !a.targets.includes('vehicles')) {
		return items.slice(0, 3);
	}
	return [...items];
}
