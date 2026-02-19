import { derived } from 'svelte/store';
import { electorates } from '$lib/data/electorates';

import { nationalSwing } from './swing';
import { projectSeat } from '$lib/projection';
import { selectedScenario } from './scenario';
import { scenarioSeatData } from '$lib/data/scenario-index';
//import { scenario } from './scenario';


type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'CA' | 'KAT'| 'PHON';
//const PARTIES: readonly Party[] = ['ALP', 'LNP', 'GRN', 'IND', 'CA', 'KAT', 'PHON'];

export const projectedSeats = derived(
  [nationalSwing, selectedScenario],
  ([$swing, $scenario]) =>
    scenarioSeatData[$scenario].map(seat => {
    
      //const swingAmount = $swing; // e.g. -0.05 → ALP down 5%
    
      //apply swing to TCP 
      const projectedTcpSeat = projectSeat(seat, $swing);

      return {
        ...projectedTcpSeat,
      };
    })
);
