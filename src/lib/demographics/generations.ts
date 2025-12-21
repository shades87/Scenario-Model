export type Party = 'ALP' | 'LNP' | 'GRN' | 'OTH';

export type Generation =
  | 'GenZ'
  | 'Millennial'
  | 'GenX'
  | 'Boomer';

export const generationFp: Record<Generation, Record<Party, number>> = {
  GenZ: {
    ALP: 0.4026,
    LNP: 0.2723,
    GRN: 0.2633,
    OTH: 0.0618
  },
  Millennial: {
    ALP: 0.3744,
    LNP: 0.2083,
    GRN: 0.1922,
    OTH: 0.2252
  },
  GenX: {
    ALP: 0.3368,
    LNP: 0.3114,
    GRN: 0.0635,
    OTH: 0.2883
  },
  Boomer: {
    ALP: 0.3025,
    LNP: 0.4447,
    GRN: 0.0393,
    OTH: 0.2135
  }
};
