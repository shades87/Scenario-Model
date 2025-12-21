export type Party = 'ALP' | 'LNP' | 'GRN' | 'IND';
export type Generation = 'GenZ' | 'Millennial' | 'GenX' | 'Boomer';

export type Seat = {
  id: string;
  name: string;

  q: number;
  r: number;

  tcp: {
    partyA: Party;
    partyB: Party;
    a: number; // vote share for partyA
    b: number;
  };

 generations: Record<Generation, number>;

  // how sensitive this seat is to a national ALP swing
  alpSwingFactor: number;
};

//test electorates
export const electorates: Seat[] = [
  {
    id: 'melb',
    name: 'Melbourne',
    q: 0,
    r: 0,
    tcp: {
      partyA: 'GRN',
      partyB: 'ALP',
      a: 0.56,
      b: 0.44
    },
    alpSwingFactor: 0.4,
    generations: {
      GenZ: 0.22,
      Millennial: 0.38,
      GenX: 0.25,
      Boomer: 0.15
    }
  },
  {
    id: 'syd',
    name: 'Sydney',
    q: 1,
    r: 0,
    tcp: {
      partyA: 'ALP',
      partyB: 'LNP',
      a: 0.61,
      b: 0.39
    },
    alpSwingFactor: 1,
    generations: {
      GenZ: 0.18,
      Millennial: 0.34,
      GenX: 0.28,
      Boomer: 0.20
    }
  },
  {
    id: 'gold',
    name: 'Goldstein',
    q: 2,
    r: 1,
    tcp: {
      partyA: 'IND',
      partyB: 'LNP',
      a: 0.54,
      b: 0.46
    },
    alpSwingFactor: 0.6,
    generations: {
      GenZ: 0.12,
      Millennial: 0.30,
      GenX: 0.31,
      Boomer: 0.27
    }
  }
];
