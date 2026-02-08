import type { Generation } from '$lib/data/types';

export function projectGenerations(years: number): Record<Generation, number> {
  let GenZ = 0.20 + 0.004 * years;
  let Boomer = 0.23 - 0.006 * years;
  let Millennial = 0.30;
  let GenX = 0.27;

  const total = GenZ + Millennial + GenX + Boomer;

  return {
    GenZ: GenZ / total,
    Millennial: Millennial / total,
    GenX: GenX / total,
    Boomer: Boomer / total
  };
}
