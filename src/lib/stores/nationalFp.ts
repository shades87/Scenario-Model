import { derived } from 'svelte/store';
import { projectedSeats } from './projectedSeats';
import type { Party } from '$lib/data/electorates';

export const nationalFp = derived(projectedSeats, ($projectedSeats) => {
  const totals: Record<Party, number> = {
    ALP: 0,
    LNP: 0,
    GRN: 0,
    IND: 0,
    KAT: 0,
    PHON: 0,
    CA: 0
  };

  for (const seat of $projectedSeats) {
    const fp = seat.projectedFp;
    for (const party in fp) {
      totals[party as Party] += fp[party as Party];
    }
  }

  // Optionally, normalize to sum to 1
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  for (const party in totals) {
    totals[party as Party] /= sum;
  }

  return totals;
});
