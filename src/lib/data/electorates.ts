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

  generations: {
  GenZ: number;
  Millennial: number;
  GenX: number;
  Boomer: number;
  };
};

/*
ALP Swing Factor Benchmarks

Safe ALP vs LNP	0.2 – 0.4
Marginal ALP vs LNP	0.8 – 1.2
Safe LNP vs ALP	0.3 – 0.6
Teal IND vs LNP	0.4 – 0.7
Rural IND vs LNP	0.1 – 0.3
GRN vs LNP	0.6 – 0.9
GRN vs ALP	0.5 – 0.8 */


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
    generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
   
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

    generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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

    generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
    generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        alpSwingFactor: .5, 
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
        alpSwingFactor: 1,
        generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
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
            alpSwingFactor: 1,
            generations: {
  GenZ: 0.14,
  Millennial: 0.29,
  GenX: 0.32,
  Boomer: 0.25
}
        },
        {
            id: 'boo',
            state: 'SA',
            name: 'Boothby',
            q: 3,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .611,
                b: .389
            },
            alpSwingFactor: 1,
            generations: {
            GenZ: 0.14,
            Millennial: 0.29,
            GenX: 0.32,
            Boomer: 0.25
            }
        },
        {
            id: 'gre',
            state: 'SA',
            name: 'Grey',
            q:2,
            r: 3,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .546,
                b: .454
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'hin',
            state: 'SA',
            name: 'Hindmarsh',
            q:2,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .663,
                b: .337
            },
            alpSwingFactor: 1,
            generations: {
            GenZ: 0.14,
            Millennial: 0.29,
            GenX: 0.32,
            Boomer: 0.25
            }
        },
        {
            id: 'kin',
            state: 'SA',
            name: 'Kingston',
            q: 4,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .707,
                b: .293
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'mak',
            state:  'SA',
            name: 'Makin',
            q: 4,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .647,
                b: .353
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'may',
            state: 'SA',
            name: 'Mayo',
            q: 3,
            r: 4,
            tcp: {
                partyA: 'CA',
                partyB: 'ALP',
                a: .649,
                b: .351
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'spe',
            state: 'SA',
            name: 'Spence',
            q: 4,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .653,
                b: .347
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'stu',
            state: 'SA',
            name: 'Sturt',
            q: 5,
            r: 2,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .566,
                b: .434
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },

        //ACT
        {
            id: 'bea',
            state: 'ACT',
            name: 'Bean',
            q: 7,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'IND',
                a: .503,
                b: .497
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'Can',
            state: 'ACT',
            name: 'Canberra',
            q: 6,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .695,
                b: .305
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'fen',
            state: 'ACT',
            name: 'Fenner',
            q: 7,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .721,
                b: .279
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        //NSW
        {
            id: 'ban',
            state: 'NSW',
            name: 'Banks',
            q: 5,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .524,
                b: .476
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'bar',
            state: 'NSW',
            name: 'Barton',
            q: 6,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .660,
                b: .340
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'ben',
            state: 'NSW',
            name: 'Bennelong',
            q: 4,
            r: 6,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .593,
                b: .407
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'ber',
            state: 'NSW',
            name: 'Berowra',
            q: 5,
            r: 6,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .516,
                b: .484
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'bla',
            state: 'NSW',
            name: 'Blaxland',
            q: 6,
            r: 6,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .719,
                b: .281
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'bra',
            state: 'NSW',
            name: 'Bradfield',
            q: 7,
            r: 5,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .49999,
                b: .50001
            },
            alpSwingFactor: .5,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'cal',
            state: 'NSW',
            name: 'Calare',
            q: 7,
            r: 6,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .568,
                b: .432
            },
            alpSwingFactor: .5,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'chi',
            state: 'NSW',
            name: 'Chifley',
            q: 3,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .698,
                b: .302
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'coo',
            state: 'NSW',
            name: 'Cook',
            q: 4,
            r: 7,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .572,
                b: .428
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'cow',
            state: 'NSW',
            name: 'Cowper',
            q: 5,
            r: 7,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .525,
                b: .475
            },
            alpSwingFactor: .5,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'cun',
            state: 'NSW',
            name: 'Cunningham',
            q: 6,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .675,
                b: .325
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'dob',
            state: 'NSW',
            name: 'Dobell',
            q: 7,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .594,
                b: .406
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'ede',
            state: 'NSW',
            name: 'Eden-Monaro',
            q: 2,
            r: 8,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .572,
                b: .428
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'far',
            state: 'NSW',
            name: 'Farrer',
            q: 3,
            r: 8,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .562,
                b: .438
            },
            alpSwingFactor: .5,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'fow',
            state: 'NSW',
            name: 'Fowler',
            q: 4,
            r: 8,
            tcp: {
                partyA: 'IND',
                partyB: 'ALP',
                a: .527,
                b: .473
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'gil',
            state: 'NSW',
            name: 'Gilmore',
            q: 5,
            r: 8,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .551,
                b: .449
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'gra',
            state: 'NSW',
            name: 'Grayndler',
            q: 6,
            r:8,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .669,
                b: .331
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'gre',
            state: 'NSW',
            name: 'Greenway',
            q: 3,
            r: 6,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .638,
                b: .362
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        }
];
