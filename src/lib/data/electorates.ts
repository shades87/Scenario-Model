export type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'PHON' | 'KAT' | 'CA';

export type Seat = {
  id: string; //didn't think this through, supposed to be the first 3 letters of division... some have same id
  name: string;//name of electorate
  state: string;// State or Territory
  //maybe should add incumbent if I want to show if the seat is gained or retained
  
  q: number; //hex coordinate - manually arranged
  r: number; //hex coordinate

  tcp: {
    partyA: Party;
    partyB: Party;
    a: number; // vote share for partyA 56 percent == .56
    b: number;//vote share for partyB
  };

  // how sensitive this seat is to a national ALP swing
  alpSwingFactor: number;

  //was originally going to try and add a way to predict seat change/2PP based on generational change over time
  //numbers in seats below aren't correct -- placeholders
  //will update at a later date if I include this
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
//Gen info is not

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
        },
        {
            id: 'hug',
            state: 'NSW',
            name: 'Hughes',
            q: 2,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .531,
                b: .469
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
            id: 'hum',
            state: 'NSW',
            name: 'Hume',
            q: 1,
            r: 8,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
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
            id: 'hun',
            state: 'NSW',
            name: 'Hunter',
            q: 7,
            r: 8,
            tcp: {
                partyA: 'ALP',
                partyB: 'PHON',
                a: .59,
                b: .41
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
            state: 'NSW',
            name: 'Kingsford Smith',
            q: 1,
            r: 9,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .672,
                b: .328
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
            state: 'NSW',
            name: 'Lindsay',
            q: 2,
            r: 9,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .528,
                b: .472
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
            id: 'lyn',
            state: 'NSW',
            name: 'Lyne',
            q: 3,
            r: 9,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .598,
                b: .402
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
            id: 'mac',
            state: 'NSW',
            name: 'Macarthur',
            q: 4,
            r: 9,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .656,
                b: 344
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
            id: 'mac',
            state: 'NSW',
            name: 'Mackeller',
            q: 5,
            r: 9,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .557,
                b: .443
            },
            alpSwingFactor: .6,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'mac',
            state: 'NSW',
            name: 'Macquarie',
            q: 6,
            r: 9,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: 57.7,
                b: .423
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
            id: 'mcm',
            state: 'NSW',
            name: 'McMahon',
            q: 7,
            r: 9,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .59,
                b: .41
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
            id: 'mit',
            state: 'NSW',
            name: 'Mitchell',
            q: 8,
            r: 4,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .538,
                b: .462
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
            id: 'new',
            state: 'NSW',
            name: 'Newcastle',
            q: 8,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .658,
                b: .342
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
            id: 'new',
            state: 'NSW',
            name: 'New England',
            q: 8,
            r: 6,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .671,
                b: .329
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
            id: 'pag',
            state: 'NSW',
            name: 'Page',
            q: 8,
            r: 7,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
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
            id: 'par',
            state: 'NSW',
            name: 'Parkes',
            q: 8,
            r: 8,
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
            id: 'par',
            state: 'NSW',
            name: 'Parramatta',
            q: 8,
            r: 9,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .625,
                b: .375
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
            id: 'pat',
            state: 'NSW',
            name: 'Paterson',
            q: 9,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .569,
                b: .431
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
            id: 'rei',
            state: 'NSW',
            name: 'Reid',
            q: 9,
            r: 6,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .62,
                b: .38
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
            id: 'ric',
            state: 'NSW',
            name: 'Richmond',
            q: 9,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .6,
                b: .4
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
            id: 'riv',
            state: 'NSW',
            name: 'Riverina',
            q: 10,
            r: 5,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .62,
                b: .38
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
            id: 'rob',
            state: 'NSW',
            name: 'Robertson',
            q: 9,
            r: 4,
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
            id: 'sho',
            state: 'NSW',
            name: 'Shortland',
            q: 10,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .615,
                b: .385
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
            id: 'syd',
            state: 'NSW',
            name: 'Sydney',
            q: 11,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .709,
                b: .291
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
            id: 'war',
            state: 'NSW',
            name: 'Warringah',
            q: 11,
            r: 5,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .612,
                b: .388
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
            id: 'wat',
            state: 'NSW',
            name: 'Watson',
            q: 10,
            r: 6,
            tcp: {
                partyA: 'ALP',
                partyB: 'IND',
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
            id: 'wen',
            state: 'NSW',
            name: 'Wentworth',
            q: 11,
            r: 6,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .583,
                b: .417
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
            id: 'wer',
            state: 'NSW',
            name: 'Werriwa',
            q: 10,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .568,
                b: .432
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
            id: 'whi',
            state: 'NSW',
            name: 'Whitlam',
            q: 9,
            r: 8,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .562,
                b: .438
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
            id: 'bas',
            state: 'TAS',
            name: 'Bass',
            q: -1,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .58,
                b: .42
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
            state: 'TAS',
            name: 'Braddon',
            q: -1,
            r: 6,
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
            id: 'cla',
            state: 'TAS',
            name: 'Clark',
            q: -2,
            r: 6,
            tcp: {
                partyA: 'IND',
                partyB: 'ALP',
                a: .704,
                b: .296
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
            id: 'fra',
            state: 'TAS',
            name: 'Franklin',
            q: -1,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'IND',
                a: .578,
                b: .422
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
            id: 'lyo',
            state: 'TAS',
            name: 'Lyons',
            q: -2,
            r: 7,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .616,
                b: .384
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
            id: 'ast',
            state: 'VIC',
            name: 'Aston',
            q: 9,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .534,
                b: .466
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
            id: 'bal',
            state: 'VIC',
            name: 'Ballarat',
            q: 9,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .607,
                b: .393
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
            state: 'VIC',
            name: 'Bendigo',
            q: 10,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .514,
                b: .486
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
            id: 'bru',
            state: 'VIC',
            name: 'Bruce',
            q: 10,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .646,
                b: .354
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
            id: 'cal',
            state: 'VIC',
            name: 'Calwell',
            q: 10,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'IND',
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
            id: 'cas',
            state: 'VIC',
            name: 'Casey',
            q: 11,
            r: 0,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .529,
                b: .471
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
            id: 'chi',
            state: 'VIC',
            name: 'Chisholm',
            q: 11,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .557,
                b: .443
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
            state: 'VIC',
            name: 'Cooper',
            q: 11,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .597,
                b: .403
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
            id: 'cor',
            state: 'VIC',
            name: 'Corangamite',
            q: 12,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .58,
                b: .42
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
            id: 'cor',
            state: 'VIC',
            name: 'Corio',
            q: 12,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .632,
                b: .368
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
            id: 'dea',
            state: 'VIC',
            name: 'Deakin',
            q: 12,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: 52.8,
                b: .472
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
            id: 'dun',
            state: 'VIC',
            name: 'Dunkley',
            q: 13,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .571,
                b: .429
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
            id: 'fli',
            state: 'VIC',
            name: 'Flinders',
            q: 13,
            r: 1,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .523,
                b: .477
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
            id: 'fra',
            state: 'VIC',
            name: 'Fraiser',
            q: 13,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .592,
                b: .408
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
            id: 'gel',
            state: 'VIC',
            name: 'Gellibrand',
            q: 13,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .651,
                b: .349
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
            id: 'gip',
            state: 'VIC',
            name: 'Gippsland',
            q: 14,
            r: 0,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .694,
                b: .306
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
            id: 'gol',
            state: 'VIC',
            name: 'Goldstein',
            q: 14,
            r: 1,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .501,
                b: .499
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
            id: 'gor',
            state: 'VIC',
            name: 'Gorton',
            q: 14,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .603,
                b: .397
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
            id: 'haw',
            state: 'VIC',
            name: 'Hawke',
            q: 14,
            r: 3,
            tcp:{
                partyA: 'ALP',
                partyB: 'LNP',
                a: .576,
                b: .424
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
            id: 'hol',
            state: 'VIC',
            name: 'Holt',
            q: 13,
            r: 3,
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
            id: 'hot',
            state: 'VIC',
            name: 'Hotham',
            q: 14,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
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
            id: 'ind',
            state: 'VIC',
            name: 'Indi',
            q: 15,
            r: 0,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .586,
                b: .414
            },
            alpSwingFactor: .6,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'isa',
            state: 'VIC',
            name: 'Isaacs',
            q: 15,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .643,
                b: .357
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
            id: 'jag',
            state: 'VIC',
            name: 'Jagajaga',
            q: 15,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .629,
                b: .371
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
            id: 'koo',
            state: 'VIC',
            name: 'Kooyong',
            q: 15,
            r: 3,
            tcp: {
                partyA: 'IND',
                partyB: 'LNP',
                a: .507,
                b: .493
            },
            alpSwingFactor: .6,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        {
            id: 'lal',
            state: 'VIC',
            name: 'Lalor',
            q: 15,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .632,
                b: .368
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
            id: 'lat',
            state: 'VIC',
            name: 'La Trobe',
            q: 16,
            r: 0,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .521,
                b: .479
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
            id: 'mac',
            state: 'VIC',
            name: 'Macnamara',
            q: 16,
            r: 1,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .618,
                b: .382
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
            id: 'mal',
            state: 'VIC',
            name: 'Mallee',
            q: 16,
            r: 2,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .69,
                b: .31
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
            id: 'mar',
            state: 'VIC',
            name: 'Maribyrnong',
            q: 16,
            r: 3,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .626,
                b: .374
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
            id: 'mce',
            state: 'VIC',
            name: 'McEwen',
            q: 16,
            r: 4,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .548,
                b: .452
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
            id: 'mel',
            state: 'VIC',
            name: 'Melbourne',
            q: 16,
            r: 5,
            tcp: {
                partyA: 'GRN',
                partyB: 'ALP',
                a: .47,
                b: .53
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
                id: 'men',
                state: 'VIC',
                name: 'Menzies',
                q: 15,
                r: 5,
                tcp: {
                    partyA: 'LNP',
                    partyB: 'ALP',
                    a: .489,
                    b: .511
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
            id: 'mon',
            state: 'VIC',
            name: 'Monash',
            q: 14,
            r: 5,
            tcp: {
                partyA: 'LNP',
                partyB: 'ALP',
                a: .541,
                b: .459
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
            id: 'nic',
            state: 'VIC',
            name: 'Nicholls',
            q: 13,
            r: 5,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .356,
                b: .644
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
            id: 'scu',
            state: 'VIC',
            name: 'Scullin',
            q: 17,
            r: 0,
            tcp: {
                partyA: 'ALP',
                partyB: 'LNP',
                a: .643,
                b: .357
    ,
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
            id: 'wan',
            state: 'VIC',
            name: 'Wannon',
            q: 17,
            r: 1,
            tcp: {
                partyA: 'LNP',
                partyB: 'IND',
                a: .533,
                b: .467
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
            id: 'wil',
            state: 'VIC',
            name: 'Wills',
            q: 17,
            r: 2,
            tcp: {
                partyA: 'ALP',
                partyB: 'GRN',
                a: .514,
                b: .486
            },
            alpSwingFactor: 1,
            generations: {
                GenZ: 0.14,
                Millennial: 0.29,
                GenX: 0.32,
                Boomer: 0.25
            }
        },
        //qld
        
];
