import type { Generation, Party } from './types';

export type GenerationDeltaMap =
  Record<Generation, Partial<Record<Party, number>>>;

export const generationDeltaHouse: GenerationDeltaMap = {
  GenZ: {
    GRN: 0.06,
    ALP: 0.02,
    LIB: -0.04,
    PHON: -0.03
  },
  Millennial: {
    GRN: 0.03,
    ALP: 0.01,
    LIB: -0.02
  },
  GenX: {
    PHON: 0.01,
    GRN: -0.01
  },
  Boomer: {
    LIB: 0.03,
    PHON: 0.02,
    ALP: -0.02,
    GRN: -0.02
  }
};

export const generationDeltaSenate = generationDeltaHouse;
