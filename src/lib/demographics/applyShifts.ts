import type { Party, Generation } from '$lib/data/types';
import type { GenerationDeltaMap } from '$lib/data/generationalDeltas';

export function applyGenerationalShift(
  baseline: Record<Party, number>,
  generations: Record<Generation, number>,
  deltas: GenerationDeltaMap
) {
  const result = { ...baseline };

  for (const gen in generations) {
    const g = gen as Generation;
    const weight = generations[g];
    const delta = deltas[g];

    for (const party in delta) {
      result[party as Party] += delta[party as Party]! * weight;
    }
  }

  const total = Object.values(result).reduce((a, b) => a + b, 0);
  for (const p in result) {
    result[p as Party] /= total;
  }

  return result;
}
