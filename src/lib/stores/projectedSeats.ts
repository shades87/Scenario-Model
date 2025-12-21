import { derived } from 'svelte/store';
import { electorates } from '$lib/data/electorates';
import { nationalSwing } from './swing';
import { yearsAhead } from './years';
import { projectGenerations } from '$lib/demographics/projectGenerations';
import { seatFirstPreferences } from '$lib/demographics/seatFP';
import { projectSeat } from '$lib/projection';

export const projectedSeats = derived(
  [nationalSwing, yearsAhead],
  ([$swing, $years]) =>
    electorates.map(seat => {
      // 1. project generations forward
      const generations = projectGenerations(seat.generations, $years);

      // 2. compute FP from generations
      let projectedFp = seatFirstPreferences(generations);

      // 3. apply national ALP swing to first preferences
      // This is a simple proportional swing: ALP gains from LNP
      projectedFp = { ...projectedFp };
      const swingAmount = $swing; // e.g. -0.05 → ALP down 5%
      projectedFp.ALP = Math.min(Math.max(projectedFp.ALP + swingAmount, 0), 1);
      projectedFp.LNP = Math.min(Math.max(projectedFp.LNP - swingAmount, 0), 1);

      // normalize so totals sum to 1
      const total = Object.values(projectedFp).reduce((a, b) => a + b, 0);
      for (const party in projectedFp) {
        projectedFp[party] /= total;
      }

      // 4. apply swing to TCP (existing logic)
      const projectedTcpSeat = projectSeat(seat, $swing);

      return {
        ...projectedTcpSeat,
        projectedFp,
        generations
      };
    })
);
