export type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'PHON' | 'KAT' | 'CA';

export type Seat = {
  id: string;
  name: string;
  state: string;

  q: number;
  r: number;

  tcp: {
    partyA: Party;
    partyB: Party;
    a: number; // vote share for partyA
    b: number;
  };

  // how sensitive this seat is to a national ALP swing
  alpSwingFactor: number;
};

//Electorates
//2PP is correct
//Gen info is not - random values until I can grab it myself
//grid - WA 0-2
//NT/SA 3-5 NT above SA
//VIC/TAS 6-10
//NSW/ACT/QLD 11-14
export const electorates: Seat[] = [
    //WA
  {
    id: 'bra',
    name: 'Brand',
    state: 'WA',
    q: 0,
    r: 0,
    tcp: {
      partyA: 'ALP',
      partyB: 'LNP',
      a: 0.669,
      b: 0.331
    },
    alpSwingFactor: 1,
   
  },
  {
    id: 'bul',
    state: 'WA',
    name: 'Bullwinkel',
    q: 1,
    r: 1,
    tcp: {
      partyA: 'ALP',
      partyB: 'LNP',
      a: 0.505,
      b: 0.495
    },
    alpSwingFactor: 1,
  },
  {
    id: 'burt',
    state: 'WA',
    name: 'Burt',
    q: 0,
    r: 1,
    tcp: {
      partyA: 'ALP',
      partyB: 'LNP',
      a: 0.657,
      b: 0.343
    },
    alpSwingFactor: 1,
  },
  {
    id: 'can',
    state: 'WA',
    name: 'Canning',
    q: 1,
    r: 0,
    tcp: {
        partyA: 'LNP',
        partyB: 'ALP',
        a: .566,
        b: .434
    },
    alpSwingFactor: 1,
    },
    {
        id: 'cow',
        state: 'WA',
        name: 'Cowan',
        q: 0,
        r: 2,
        tcp: {
            partyA: 'ALP',
            partyB: 'LNP',
            a: .636,
            b: .364
        },
        alpSwingFactor: 1,
    },
    {
        id: 'cur',
        state: 'WA',
        name: 'Curtin',
        q: 1,
        r: 2,
        tcp: {
            partyA: 'IND',
            partyB: 'LNP',
            a: .533,
            b: .467
        },
        alpSwingFactor: .75, //we're guestimating that 75 % of labor's preferences flow to Kate Cheney
    },
    {
        id: 'Dur',
        state: 'WA',
        name: 'Durack',
        q: -1,
        r: 2,
        tcp: {
            partyA: 'LNP',
            partyB: 'ALP',
            a: .602,
            b: .398
        },
        alpSwingFactor: 1,
    },
    {
        id: 'for',
        state: 'WA',
        name: 'Forrest',
        q:-1,
        r: 1,
        tcp: {
            partyA: 'LNP',
            partyB: 'ALP',
            a: .522,
            b: .478
        },
        alpSwingFactor: 1,
    },
    {
        id: 'fre',
        state: 'WA',
        name: 'Fremantle',
        q: -1,
        r: 0,
        tcp: {
            partyA: 'ALP',
            partyB: 'IND',
            a: .507,
            b: .493
        },
        alpSwingFactor: 1,
    },
    {
        id: 'has',
        state: 'WA',
        name: 'Hasluck',
        q:-1,
        r: 3,
        tcp: {
            partyA: 'ALP',
            partyB: 'LNP',
            a: .66,
            b: .34
        },
        alpSwingFactor: 1
        },
        {
            id: 'moo',
            state: 'WA',
            name: 'Moore',
            q: 0,
            r: 3,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .471,
                b: .529
            },
            alpSwingFactor: 1
        },
        {
            id: `O'co`,
            state: 'WA',
            name: `O'Conner`,
            q: -2,
            r: 2,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .633,
                b: .367
            },
            alpSwingFactor: 1
        },
        {
            id: 'pea',
            state: 'WA',
            name: 'Pearce',
            q: -2,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .564,
                b: .436
            },
            alpSwingFactor: 1
        },
        {
            id: 'per',
            state: 'WA',
            name: 'Perth',
            q: -3,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .665,
                b: .335
            },
            alpSwingFactor: 1
        },
        {
            id: 'swa',
            state: 'WA',
            name: 'Swan',
            q:-2,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .64,
                b: .36
            },
            alpSwingFactor: 1
        },
        {
            id: 'tan',
            state: 'WA',
            name: 'Tangney',
            q: -2,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .57,
                b: .43
            },
            alpSwingFactor: 1
        },

        //NT
        {
            id: 'sol',
            state: 'NT',
            name: 'Solomon',
            q: 3,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .581,
                b: .419
            },
            alpSwingFactor: 1
        },
        {
            id: 'lin',
            state: 'NT',
            name: 'Lingiari',
            q: 4,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .513,
                b: .487
            },
            alpSwingFactor: 1
        },
        //SA
        {
            id: 'ade',
            state: 'SA',
            name: 'Adelaide',
            q: 3,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .691,
                b: .309
            },
            alpSwingFactor: 1
        },
        {
            id: 'bar',
            state: 'SA',
            name: 'Barker',
            q: 2,
            r: 3,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .63,
                b: .37
            },
            alpSwingFactor: 1
        }
];
