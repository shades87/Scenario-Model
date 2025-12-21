import { generationFp } from './generations';
import type { Generation, Party } from './generations';

export function seatFirstPreferences(
  generations: Record<Generation, number>
): Record<Party, number> {
  const fp: Record<Party, number> = {
    ALP: 0,
    LNP: 0,
    GRN: 0,
    OTH: 0
  };

  for (const gen in generations) {
    const weight = generations[gen];
    const prefs = generationFp[gen];

    for (const party in prefs) {
      fp[party] += prefs[party] * weight;
    }
  }

  return fp;
}
