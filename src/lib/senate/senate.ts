import type { Party } from "$lib/data/electorates";
import type { Generation } from "$lib/demographics/generations";

export const generationFpSenate: Record<Generation, Record<Party, number>> = {
  GenZ: {
    ALP: 0.28,
    LNP: 0.15,
    GRN: 0.32,
    PHON: 0.05,
    IND: 0.05,
    KAT: 0.15,
    CA: 0
  },
  Millennial: {
    ALP: 0.30,
    LNP: 0.20,
    GRN: 0.22,
    PHON: 0.06,
    IND: 0.07,
    KAT: 0.15,
    CA: 0
  },
  GenX: {
    ALP: 0.30,
    LNP: 0.32,
    GRN: 0.12,
    PHON: 0.10,
    IND: 0.06,
    KAT: 0.10,
    CA: 0
  },
  Boomer: {
    ALP: 0.26,
    LNP: 0.38,
    GRN: 0.07,
    PHON: 0.12,
    IND: 0.07,
    KAT: 0.10,
    CA: 0
  }
};
