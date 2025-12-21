import type { Party } from "$lib/data/electorates";
export type Generation =
  | 'GenZ'
  | 'Millennial'
  | 'GenX'
  | 'Boomer';

export const GENERATIONS: Generation[] = [
  'GenZ',
  'Millennial',
  'GenX',
  'Boomer'
];

export const PARTIES: Party[] = [
  'ALP',
  'LNP',
  'GRN',
  'IND',
  'CA',
  'KAT',
  'PHON'
]; 
  
export const generationFp: Record<Generation, Record<Party, number>> = {
  GenZ: {
    ALP: 0.4026,
    LNP: 0.2723,
    GRN: 0.2633,
    IND: 0.0618,
    PHON: 0,
    KAT: 0,
    CA: 0
  },
  Millennial: {
    ALP: 0.3744,
    LNP: 0.2083,
    GRN: 0.1922,
    IND: 0.2252,
    PHON: 0,
    KAT: 0,
    CA: 0
  },
  GenX: {
    ALP: 0.3368,
    LNP: 0.3114,
    GRN: 0.0635,
    IND: 0.2883,
    PHON: 0,
    KAT: 0,
    CA: 0
  },
  Boomer: {
    ALP: 0.3025,
    LNP: 0.4447,
    GRN: 0.0393,
    IND: 0.2135,
    PHON: 0,
    KAT: 0,
    CA: 0
  }
};
