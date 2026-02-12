import type { Party } from './types';

export const baselineFpHouse: Record<Party, number> = {
  ALP: 0.3456,
  LIB: 0.2069,
  GRN: 0.1220,
  IND: 0.0727,
  LNP: 0.0710,
  PHON: 0.0640,
  NAT: 0.0380,
  LCA: 0.0012,
  OTH: 0.0786
};

export const baselineFpSenate: Record<Party, number> = {
  ALP: 0.3511,
  GRN: 0.1172,
  PHON: 0.0567,
  LNP: 0.2365,
  LIB: 0.0562,
  LCA: 0.0349,
  NAT: 0.004,
  IND: 0,
  OTH: 0.1434
};
