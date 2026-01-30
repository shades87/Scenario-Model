import type { Generation, GenerationShares } from './generations';
import { generationFp } from './generations';
import type { Party } from "$lib/data/electorates";

const TRANSITION = {
  GenZ: 0.04,
  Millennial: 0.01,
  GenX: -0.01,
  Boomer: -0.04
};

export function projectGenerations(
  base: GenerationShares,
  electionsAhead: number
): GenerationShares {
  let next = { ...base };

  for (let i = 0; i < electionsAhead; i++) {
    for (const gen of Object.keys(next) as Generation[]) {
      next[gen] += TRANSITION[gen];
    }

    // normalise
    const total = Object.values(next).reduce((a, b) => a + b, 0);
    for (const gen of Object.keys(next) as Generation[]) {
      next[gen] /= total;
    }
  }

  return next;
}

export function nationalFirstPreferences(
  generations: GenerationShares
): Record<Party, number> {
  const fp: Record<Party, number> = {
    ALP: 0,
    LNP: 0,
    GRN: 0,
    PHON: 0,
    IND: 0,
    KAT: 0,
    CA: 0
  };

  for (const gen of Object.keys(generations) as Generation[]) {
    const weight = generations[gen];
    const prefs = generationFp[gen];

    for (const party of Object.keys(fp) as Party[]) {
      fp[party] += prefs[party] * weight;
    }
  }

  return fp;
}
