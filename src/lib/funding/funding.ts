import type { Party } from "$lib/data/electorates";

const FUNDING_THRESHOLD = 0.04;

const FUNDING_RATES = {
  past: 3.386,
  future: 5.0
};

export function publicFunding(
  fp: Record<Party, number>,
  totalVotes: number,
  rate: number
): Record<Party, number> {
  const funding: Record<Party, number> = {
    ALP: 0,
    LNP: 0,
    GRN: 0,
    PHON: 0,
    IND: 0,
    CA: 0,
    KAT: 0
  };

  for (const party of Object.keys(fp) as Party[]) {
    if (fp[party] >= FUNDING_THRESHOLD) {
      funding[party] = fp[party] * totalVotes * rate;
    }
  }

  return funding;
}
