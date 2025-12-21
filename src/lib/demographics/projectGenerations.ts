import type { Generation } from './generations';

const TRANSITION = {
  GenZ: 0.04,
  Millennial: 0.01,
  GenX: -0.01,
  Boomer: -0.04
};

export function projectGenerations(
  base: Record<Generation, number>,
  yearsAhead: number
) {
  const steps = yearsAhead / 3;

  let next = { ...base };

  for (let i = 0; i < steps; i++) {
    for (const gen in next) {
      next[gen] += next[gen] * TRANSITION[gen];
    }
  }

  // normalise back to 1
  const total = Object.values(next).reduce((a, b) => a + b, 0);
  for (const gen in next) {
    next[gen] /= total;
  }

  return next;
}
