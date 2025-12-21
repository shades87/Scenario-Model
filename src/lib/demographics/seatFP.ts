import { generationFp, GENERATIONS, PARTIES } from './generations';
import type { Generation } from './generations';
import type { Party } from '$lib/data/electorates';

export function seatFirstPreferences(
  generations: Record<Generation, number>
): Record<Party, number> {
  const fp: Record<Party, number> = {
    ALP: 0,
    LNP: 0,
    GRN: 0,
    IND: 0,
    KAT: 0,
    CA: 0,
    PHON: 0
  };

  for (const gen of GENERATIONS) {
    const weight = generations[gen];
    const prefs = generationFp[gen];

    for (const party of PARTIES) {
      fp[party] += prefs[party] * weight;
    }
  }

  return fp;
}
