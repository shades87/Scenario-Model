import { writable, derived } from 'svelte/store';
import { projectGenerations } from '$lib/demographics/population';
import { applyGenerationalShift } from '$lib/demographics/applyShifts';
import { baselineFpHouse, baselineFpSenate } from '$lib/data/baselineFp';
import { generationDeltaHouse, generationDeltaSenate } from '$lib/data/generationalDeltas';

import type { Party } from '$lib/data/types';

export const yearsForward = writable(0);

//export const populationGrowth = writable<number>(1);

const BASE_VOTERS = 18_098_797;
const ANNUAL_GROWTH = 0.015;

export const totalVoters = derived(yearsForward, $yearsForward => 
  Math.round(BASE_VOTERS * Math.pow(1 + ANNUAL_GROWTH, $yearsForward))
);

export const projectedGenerations = derived(
  yearsForward,
  y => projectGenerations(y)
);

export const projectedFpHouse = derived(
  projectedGenerations,
  gens => applyGenerationalShift(
    baselineFpHouse,
    gens,
    generationDeltaHouse
  )
);

export const projectedFpSenate = derived(
  projectedGenerations,
  gens => applyGenerationalShift(
    baselineFpSenate,
    gens,
    generationDeltaSenate
  )
);

export const selectedChamber = writable<'House' | 'Senate'>('House');


export const activeFp = derived(
  [selectedChamber, projectedFpHouse, projectedFpSenate],
  ([$chamber, houseFp, senateFp]) =>
    $chamber === 'House' ? houseFp : senateFp
);

export const publicFunding = derived(
  [activeFp, yearsForward, totalVoters],
  ([$fp, $yearsForward, $totalVoters]) => {
    const lastElectionRate = 3.386;
    const nextElectionRate = 5;
    const rate = $yearsForward > 0 ? nextElectionRate : lastElectionRate;

    const funding: Partial<Record<Party, number>> = {};

    for (const party in $fp) {
      const p = party as Party;
      if (p === 'OTH') continue;
      if ($fp[p] >= 0.04) {
        funding[p] = $fp[p] * $totalVoters * rate;
      }
    }

    return funding;
  }
);
