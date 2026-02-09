import type { Seat } from './electorates';
import { electorates } from './electorates';
import { phonSurgeSeats } from './phon-surge';
import { coalitionRecoverySeats } from './coalition-recovery';
import { tealSurgeSeats } from './teal-surge';

export type ScenarioId =
  | 'baseline'
  | 'phon-surge'
  | 'coalition-recovery'
  | 'teal-surge';

export const scenarioSeatData: Record<ScenarioId, Seat[]> = {
  'baseline': electorates,
  'phon-surge': phonSurgeSeats,
  'coalition-recovery': coalitionRecoverySeats,
  'teal-surge': tealSurgeSeats
};