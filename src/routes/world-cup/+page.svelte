<script lang="ts">

  // ── Types ──────────────────────────────────────────────────────────────────
  interface Match {
    id: string;
    group: string;
    matchday: number;
    date: string;
    teamA: string;
    teamB: string;
    venue: string;
  }

  interface Prediction {
    winA: number;
    draw: number;
    winB: number;
  }

  interface PageData {
    results: Record<string, 'A' | 'D' | 'B'>;
  }

  // ── Props (SvelteKit data) ─────────────────────────────────────────────────
  let { data }: { data: PageData } = $props();

  // ── FIFA Ratings (April 2026) ──────────────────────────────────────────────
  const FIFA_RATINGS: Record<string, number> = {
    'France': 1877, 'Spain': 1876, 'Argentina': 1875, 'England': 1826,
    'Portugal': 1764, 'Brazil': 1761, 'Netherlands': 1758, 'Morocco': 1756,
    'Belgium': 1735, 'Germany': 1730, 'Croatia': 1717, 'Italy': 1700,
    'Colombia': 1693, 'Senegal': 1689, 'Mexico': 1681, 'United States': 1673,
    'Uruguay': 1673, 'Japan': 1660, 'Switzerland': 1649, 'South Korea': 1621,
    'Ecuador': 1610, 'Austria': 1605, 'Türkiye': 1598, 'Australia': 1585,
    'Canada': 1575, 'Norway': 1558, 'Algeria': 1540, 'Egypt': 1530,
    'Scotland': 1520, 'Paraguay': 1510, 'Tunisia': 1505, 'Ivory Coast': 1502,
    'Sweden': 1498, 'Czechia': 1490, 'Uzbekistan': 1460, 'Qatar': 1440,
    'Saudi Arabia': 1430, 'South Africa': 1420, 'Jordan': 1400,
    'Cape Verde': 1390, 'Ghana': 1380, 'Curaçao': 1340, 'Haiti': 1300,
    'New Zealand': 1310, 'Bosnia & Herz.': 1480, 'Iraq': 1380,
    'DR Congo': 1370, 'Panama': 1350,
  };

  const HOST_BONUS: Record<string, number> = {
    'United States': 40, 'Mexico': 50, 'Canada': 30,
  };

  // ── Match data ─────────────────────────────────────────────────────────────
  const ALL_MATCHES: Match[] = [
    // Group A
    { id: 'A1', group: 'A', matchday: 1, date: 'Jun 11', teamA: 'Mexico',        teamB: 'South Africa',  venue: 'Mexico City' },
    { id: 'A2', group: 'A', matchday: 1, date: 'Jun 11', teamA: 'South Korea',   teamB: 'Czechia',        venue: 'Guadalajara' },
    { id: 'A3', group: 'A', matchday: 2, date: 'Jun 15', teamA: 'Mexico',        teamB: 'South Korea',   venue: 'Guadalajara' },
    { id: 'A4', group: 'A', matchday: 2, date: 'Jun 15', teamA: 'South Africa',  teamB: 'Czechia',        venue: 'Kansas City' },
    { id: 'A5', group: 'A', matchday: 3, date: 'Jun 19', teamA: 'Mexico',        teamB: 'Czechia',        venue: 'Dallas' },
    { id: 'A6', group: 'A', matchday: 3, date: 'Jun 19', teamA: 'South Africa',  teamB: 'South Korea',   venue: 'Dallas' },
    // Group B
    { id: 'B1', group: 'B', matchday: 1, date: 'Jun 12', teamA: 'Canada',        teamB: 'Bosnia & Herz.',venue: 'Toronto' },
    { id: 'B2', group: 'B', matchday: 1, date: 'Jun 12', teamA: 'Qatar',         teamB: 'Switzerland',   venue: 'San Francisco' },
    { id: 'B3', group: 'B', matchday: 2, date: 'Jun 16', teamA: 'Canada',        teamB: 'Qatar',          venue: 'Seattle' },
    { id: 'B4', group: 'B', matchday: 2, date: 'Jun 16', teamA: 'Switzerland',   teamB: 'Bosnia & Herz.',venue: 'Philadelphia' },
    { id: 'B5', group: 'B', matchday: 3, date: 'Jun 20', teamA: 'Canada',        teamB: 'Switzerland',   venue: 'Toronto' },
    { id: 'B6', group: 'B', matchday: 3, date: 'Jun 20', teamA: 'Qatar',         teamB: 'Bosnia & Herz.',venue: 'Houston' },
    // Group C
    { id: 'C1', group: 'C', matchday: 1, date: 'Jun 13', teamA: 'Brazil',        teamB: 'Morocco',       venue: 'New York/NJ' },
    { id: 'C2', group: 'C', matchday: 1, date: 'Jun 13', teamA: 'Haiti',         teamB: 'Scotland',       venue: 'Boston' },
    { id: 'C3', group: 'C', matchday: 2, date: 'Jun 17', teamA: 'Brazil',        teamB: 'Haiti',          venue: 'Miami' },
    { id: 'C4', group: 'C', matchday: 2, date: 'Jun 17', teamA: 'Morocco',       teamB: 'Scotland',       venue: 'Atlanta' },
    { id: 'C5', group: 'C', matchday: 3, date: 'Jun 21', teamA: 'Brazil',        teamB: 'Scotland',       venue: 'Houston' },
    { id: 'C6', group: 'C', matchday: 3, date: 'Jun 21', teamA: 'Morocco',       teamB: 'Haiti',          venue: 'Dallas' },
    // Group D
    { id: 'D1', group: 'D', matchday: 1, date: 'Jun 12', teamA: 'United States', teamB: 'Paraguay',      venue: 'Los Angeles' },
    { id: 'D2', group: 'D', matchday: 1, date: 'Jun 12', teamA: 'Australia',     teamB: 'Türkiye',        venue: 'Vancouver' },
    { id: 'D3', group: 'D', matchday: 2, date: 'Jun 17', teamA: 'United States', teamB: 'Australia',     venue: 'Seattle' },
    { id: 'D4', group: 'D', matchday: 2, date: 'Jun 17', teamA: 'Türkiye',       teamB: 'Paraguay',       venue: 'Miami' },
    { id: 'D5', group: 'D', matchday: 3, date: 'Jun 21', teamA: 'United States', teamB: 'Türkiye',        venue: 'Los Angeles' },
    { id: 'D6', group: 'D', matchday: 3, date: 'Jun 21', teamA: 'Australia',     teamB: 'Paraguay',       venue: 'San Francisco' },
    // Group E
    { id: 'E1', group: 'E', matchday: 1, date: 'Jun 14', teamA: 'Germany',       teamB: 'Curaçao',        venue: 'Philadelphia' },
    { id: 'E2', group: 'E', matchday: 1, date: 'Jun 14', teamA: 'Ivory Coast',   teamB: 'Ecuador',        venue: 'Houston' },
    { id: 'E3', group: 'E', matchday: 2, date: 'Jun 18', teamA: 'Germany',       teamB: 'Ivory Coast',   venue: 'Atlanta' },
    { id: 'E4', group: 'E', matchday: 2, date: 'Jun 18', teamA: 'Ecuador',       teamB: 'Curaçao',        venue: 'Kansas City' },
    { id: 'E5', group: 'E', matchday: 3, date: 'Jun 22', teamA: 'Germany',       teamB: 'Ecuador',        venue: 'Dallas' },
    { id: 'E6', group: 'E', matchday: 3, date: 'Jun 22', teamA: 'Ivory Coast',   teamB: 'Curaçao',        venue: 'Los Angeles' },
    // Group F
    { id: 'F1', group: 'F', matchday: 1, date: 'Jun 14', teamA: 'Netherlands',   teamB: 'Japan',          venue: 'Boston' },
    { id: 'F2', group: 'F', matchday: 1, date: 'Jun 14', teamA: 'Sweden',        teamB: 'Tunisia',        venue: 'New York/NJ' },
    { id: 'F3', group: 'F', matchday: 2, date: 'Jun 18', teamA: 'Netherlands',   teamB: 'Sweden',         venue: 'Kansas City' },
    { id: 'F4', group: 'F', matchday: 2, date: 'Jun 18', teamA: 'Japan',         teamB: 'Tunisia',        venue: 'Seattle' },
    { id: 'F5', group: 'F', matchday: 3, date: 'Jun 22', teamA: 'Netherlands',   teamB: 'Tunisia',        venue: 'Miami' },
    { id: 'F6', group: 'F', matchday: 3, date: 'Jun 22', teamA: 'Japan',         teamB: 'Sweden',         venue: 'San Francisco' },
    // Group G
    { id: 'G1', group: 'G', matchday: 1, date: 'Jun 15', teamA: 'Belgium',       teamB: 'Egypt',          venue: 'Seattle' },
    { id: 'G2', group: 'G', matchday: 1, date: 'Jun 15', teamA: 'Iran',          teamB: 'New Zealand',    venue: 'Los Angeles' },
    { id: 'G3', group: 'G', matchday: 2, date: 'Jun 19', teamA: 'Belgium',       teamB: 'Iran',           venue: 'New York/NJ' },
    { id: 'G4', group: 'G', matchday: 2, date: 'Jun 19', teamA: 'Egypt',         teamB: 'New Zealand',    venue: 'Toronto' },
    { id: 'G5', group: 'G', matchday: 3, date: 'Jun 23', teamA: 'Belgium',       teamB: 'New Zealand',   venue: 'Atlanta' },
    { id: 'G6', group: 'G', matchday: 3, date: 'Jun 23', teamA: 'Egypt',         teamB: 'Iran',           venue: 'Houston' },
    // Group H
    { id: 'H1', group: 'H', matchday: 1, date: 'Jun 15', teamA: 'Spain',         teamB: 'Cape Verde',    venue: 'Atlanta' },
    { id: 'H2', group: 'H', matchday: 1, date: 'Jun 15', teamA: 'Saudi Arabia',  teamB: 'Uruguay',       venue: 'Miami' },
    { id: 'H3', group: 'H', matchday: 2, date: 'Jun 19', teamA: 'Spain',         teamB: 'Saudi Arabia',  venue: 'Dallas' },
    { id: 'H4', group: 'H', matchday: 2, date: 'Jun 19', teamA: 'Uruguay',       teamB: 'Cape Verde',    venue: 'Philadelphia' },
    { id: 'H5', group: 'H', matchday: 3, date: 'Jun 23', teamA: 'Spain',         teamB: 'Uruguay',       venue: 'Los Angeles' },
    { id: 'H6', group: 'H', matchday: 3, date: 'Jun 23', teamA: 'Saudi Arabia',  teamB: 'Cape Verde',    venue: 'San Francisco' },
    // Group I
    { id: 'I1', group: 'I', matchday: 1, date: 'Jun 16', teamA: 'France',        teamB: 'Senegal',       venue: 'New York/NJ' },
    { id: 'I2', group: 'I', matchday: 1, date: 'Jun 16', teamA: 'Iraq',          teamB: 'Norway',         venue: 'Boston' },
    { id: 'I3', group: 'I', matchday: 2, date: 'Jun 20', teamA: 'France',        teamB: 'Iraq',           venue: 'Atlanta' },
    { id: 'I4', group: 'I', matchday: 2, date: 'Jun 20', teamA: 'Senegal',       teamB: 'Norway',         venue: 'Kansas City' },
    { id: 'I5', group: 'I', matchday: 3, date: 'Jun 24', teamA: 'France',        teamB: 'Norway',         venue: 'Seattle' },
    { id: 'I6', group: 'I', matchday: 3, date: 'Jun 24', teamA: 'Senegal',       teamB: 'Iraq',           venue: 'Houston' },
    // Group J
    { id: 'J1', group: 'J', matchday: 1, date: 'Jun 16', teamA: 'Argentina',     teamB: 'Algeria',       venue: 'Kansas City' },
    { id: 'J2', group: 'J', matchday: 1, date: 'Jun 16', teamA: 'Austria',       teamB: 'Jordan',         venue: 'San Francisco' },
    { id: 'J3', group: 'J', matchday: 2, date: 'Jun 20', teamA: 'Argentina',     teamB: 'Austria',       venue: 'Miami' },
    { id: 'J4', group: 'J', matchday: 2, date: 'Jun 20', teamA: 'Algeria',       teamB: 'Jordan',         venue: 'Philadelphia' },
    { id: 'J5', group: 'J', matchday: 3, date: 'Jun 24', teamA: 'Argentina',     teamB: 'Jordan',         venue: 'Dallas' },
    { id: 'J6', group: 'J', matchday: 3, date: 'Jun 24', teamA: 'Algeria',       teamB: 'Austria',        venue: 'Toronto' },
    // Group K
    { id: 'K1', group: 'K', matchday: 1, date: 'Jun 17', teamA: 'Portugal',      teamB: 'DR Congo',      venue: 'Houston' },
    { id: 'K2', group: 'K', matchday: 1, date: 'Jun 17', teamA: 'Uzbekistan',    teamB: 'Colombia',      venue: 'Mexico City' },
    { id: 'K3', group: 'K', matchday: 2, date: 'Jun 21', teamA: 'Portugal',      teamB: 'Uzbekistan',    venue: 'Boston' },
    { id: 'K4', group: 'K', matchday: 2, date: 'Jun 21', teamA: 'DR Congo',      teamB: 'Colombia',      venue: 'Seattle' },
    { id: 'K5', group: 'K', matchday: 3, date: 'Jun 25', teamA: 'Portugal',      teamB: 'Colombia',      venue: 'New York/NJ' },
    { id: 'K6', group: 'K', matchday: 3, date: 'Jun 25', teamA: 'Uzbekistan',    teamB: 'DR Congo',      venue: 'Philadelphia' },
    // Group L
    { id: 'L1', group: 'L', matchday: 1, date: 'Jun 17', teamA: 'England',       teamB: 'Croatia',       venue: 'Dallas' },
    { id: 'L2', group: 'L', matchday: 1, date: 'Jun 17', teamA: 'Ghana',         teamB: 'Panama',         venue: 'Toronto' },
    { id: 'L3', group: 'L', matchday: 2, date: 'Jun 21', teamA: 'England',       teamB: 'Ghana',          venue: 'Atlanta' },
    { id: 'L4', group: 'L', matchday: 2, date: 'Jun 21', teamA: 'Croatia',       teamB: 'Panama',         venue: 'Boston' },
    { id: 'L5', group: 'L', matchday: 3, date: 'Jun 25', teamA: 'England',       teamB: 'Panama',         venue: 'Miami' },
    { id: 'L6', group: 'L', matchday: 3, date: 'Jun 25', teamA: 'Croatia',       teamB: 'Ghana',          venue: 'New York/NJ' },
  ];

  const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'] as const;

  const GROUP_COLORS: Record<string, string> = {
    A:'#1D9E75', B:'#378ADD', C:'#D4537E', D:'#7F77DD',
    E:'#1D9E75', F:'#BA7517', G:'#D85A30', H:'#7F77DD',
    I:'#378ADD', J:'#D4537E', K:'#BA7517', L:'#D85A30',
  };

  // ── Prediction model ───────────────────────────────────────────────────────
  function getRating(team: string): number {
    return (FIFA_RATINGS[team] ?? 1400) + (HOST_BONUS[team] ?? 0);
  }

  function predict(teamA: string, teamB: string): Prediction {
    const rA = getRating(teamA);
    const rB = getRating(teamB);
    const expA = 1 / (1 + Math.pow(10, (rB - rA) / 400));
    const expB = 1 - expA;
    const drawBase = 0.25 * Math.exp(-4 * Math.pow(expA - 0.5, 2));
    const winA = expA * (1 - drawBase * 0.5);
    const winB = expB * (1 - drawBase * 0.5);
    const draw = 1 - winA - winB;
    const total = winA + draw + winB;
    return {
      winA: Math.round((winA / total) * 100),
      draw: Math.round((draw / total) * 100),
      winB: Math.round((winB / total) * 100),
    };
  }

  function predictedOutcome(p: Prediction, m: Match): string {
    if (p.winA > p.draw && p.winA > p.winB) return m.teamA;
    if (p.winB > p.draw && p.winB > p.winA) return m.teamB;
    return 'Draw';
  }

  // ── State ──────────────────────────────────────────────────────────────────
  let selectedGroup = $state<string>('A');
  let selectedMatchday = $state<string>('1');

  const results = $derived(data.results ?? {});

  const filteredMatches = $derived(
    ALL_MATCHES.filter(m =>
      m.group === selectedGroup &&
      (selectedMatchday === 'all' || String(m.matchday) === selectedMatchday)
    )
  );

  const predictions = $derived(
    Object.fromEntries(ALL_MATCHES.map(m => [m.id, predict(m.teamA, m.teamB)]))
  );

  const scorecard = $derived(() => {
    const entries = Object.entries(results);
    if (entries.length === 0) return null;
    let correct = 0;
    for (const [id, actual] of entries) {
      const p = predictions[id];
      if (!p) continue;
      const pick = p.winA > p.draw && p.winA > p.winB ? 'A'
        : p.winB > p.draw && p.winB > p.winA ? 'B' : 'D';
      if (pick === actual) correct++;
    }
    return { correct, total: entries.length, pct: Math.round((correct / entries.length) * 100) };
  });

  // ── Export ─────────────────────────────────────────────────────────────────
  function exportCSV() {
    const header = 'match_id,group,date,team_a,team_b,venue,win_a_pct,draw_pct,win_b_pct,predicted_outcome';
    const rows = filteredMatches.map(m => {
      const p = predictions[m.id];
      const outcome = predictedOutcome(p, m);
      return `${m.id},${m.group},${m.date},${m.teamA},${m.teamB},${m.venue},${p.winA},${p.draw},${p.winB},${outcome}`;
    });
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `wc2026_group${selectedGroup}_md${selectedMatchday}.csv`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportJSON() {
    const payload = filteredMatches.map(m => {
      const p = predictions[m.id];
      return { match_id: m.id, group: m.group, date: m.date, team_a: m.teamA, team_b: m.teamB,
        venue: m.venue, win_a_pct: p.winA, draw_pct: p.draw, win_b_pct: p.winB,
        predicted_outcome: predictedOutcome(p, m) };
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `wc2026_group${selectedGroup}_md${selectedMatchday}.json`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }
</script>

<!-- ── Page ──────────────────────────────────────────────────────────────── -->
<div class="min-h-screen bg-surface-50-950">

  <!-- Header -->
  <header class=" border-b bg-white border-surface-200-800 px-6 py-4 flex items-center justify-between gap-4 flex-wrap sticky top-0 z-10">
    <div>
      <h1 class="text-base font-medium text-surface-950-50 flex items-center gap-2">
        <span class="inline-block w-2 h-2 rounded-full bg-success-500"></span>
        WC 2026 Match Predictor
      </h1>
      <p class="text-xs text-surface-500 mt-0.5">Statistical model · FIFA ratings · April 2026</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-sm preset-outlined-surface-500" onclick={exportCSV}>
        ↓ CSV
      </button>
      <button class="btn btn-sm preset-outlined-surface-500" onclick={exportJSON}>
        ↓ JSON
      </button>
    </div>
  </header>

  <!-- Group + Matchday filters -->
  <nav class="bg-primary-300 border-b border-surface-200-800 px-6 py-3 flex gap-4 items-center flex-wrap">
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-white">Group</span>
      <div class="flex gap-1 flex-wrap">
        {#each GROUPS as g(g)}
          <button
            class="btn btn-sm rounded-full text-white text-xs font-medium"
            class:preset-filled={selectedGroup === g}
            class:preset-outlined-surface-300={selectedGroup !== g}
            style={selectedGroup === g ? `background:${GROUP_COLORS[g]};border-color:${GROUP_COLORS[g]};color:white` : ''}
            onclick={() => { selectedGroup = g; selectedMatchday = '1'; }}
          >{g}</button>
        {/each}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-white">Matchday</span>
      <div class="flex gap-1">
        {#each [['1','MD 1'],['2','MD 2'],['3','MD 3'],['all','All']] as [val, label] (label)}
          <button
            class="btn text-white border-white btn-sm rounded-full text-xs font-medium border transition-all"
            class:bg-surface-950-50={selectedMatchday === val}
            class:text-white={selectedMatchday === val || selectedMatchday !== val}
            class:border-surface-950-50={selectedMatchday === val}
            class:bg-transparent={selectedMatchday !== val}
            class:border-surface-300-700={selectedMatchday !== val}
            onclick={() => selectedMatchday = val}
          >{label}</button>
        {/each}
      </div>
    </div>
  </nav>

  <main class="max-w-3xl mx-auto px-4 py-5 space-y-4">

    <!-- Scorecard -->
    {#if scorecard()}
      {@const sc = scorecard()}
      <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-4 flex items-center justify-between flex-wrap gap-4">
        <div class="flex gap-8">
          <div class="text-center">
            <p class="text-2xl font-medium text-success-500">{sc!.correct}</p>
            <p class="text-xs text-surface-400 mt-0.5">Correct</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-medium text-surface-950-50">{sc!.total}</p>
            <p class="text-xs text-surface-400 mt-0.5">Graded</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-medium text-surface-950-50">{sc!.pct}%</p>
            <p class="text-xs text-surface-400 mt-0.5">Accuracy</p>
          </div>
        </div>
      </div>
    {:else}
      <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-4">
        <p class="text-sm text-surface-400">Results will appear here once uploaded to the server.</p>
      </div>
    {/if}

    <!-- Match cards -->
    {#each filteredMatches as match (match.id)}
      {@const p = predictions[match.id]}
      {@const actual = results[match.id]}
      {@const pick = p.winA > p.draw && p.winA > p.winB ? 'A' : p.winB > p.draw && p.winB > p.winA ? 'B' : 'D'}
      {@const isCorrect = actual !== undefined && actual === pick}

      <div class="card preset-filled-surface-100-900 border border-surface-200-800 divide-y overflow-hidden">

        <!-- Card header -->
        <header class="flex items-center justify-between px-4 pb-3 pt-4 gap-2">
          <div class="flex items-center gap-2">
            <span
              class="text-xs font-medium px-2 py-0.5 rounded text-white"
              style="background:{GROUP_COLORS[match.group]}"
            >{match.id}</span>
            <h2 class="h6">{match.teamA} vs {match.teamB}</h2>
          </div>
          <div class="flex items-center gap-2">
            <small class="opacity-60">{match.date} · {match.venue}</small>
            {#if actual !== undefined}
              <span class="badge text-xs" class:preset-filled-success-500={isCorrect} class:preset-filled-error-500={!isCorrect}>
                {isCorrect ? '✓ Correct' : '✗ Wrong'}
              </span>
            {/if}
          </div>
        </header>

        <!-- Card body -->
        <article class="py-3 px-4 space-y-4">

          <!-- Team names + ratings -->
          <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div>
              <p class="text-sm font-medium text-surface-950-50">{match.teamA}</p>
              <p class="text-xs text-surface-400">FIFA {getRating(match.teamA)}</p>
            </div>
            <span class="text-xs text-surface-400 font-medium">vs</span>
            <div class="text-right">
              <p class="text-sm font-medium text-surface-950-50">{match.teamB}</p>
              <p class="text-xs text-surface-400">FIFA {getRating(match.teamB)}</p>
            </div>
          </div>

          <!-- Probability bars -->
          <div class="grid grid-cols-[1fr_64px_1fr] gap-3 items-end">

            <!-- Win A -->
            <div class="space-y-1">
              <p class="text-xs text-surface-500">{match.teamA} win</p>
              <p class="text-lg font-medium text-surface-950-50">{p.winA}%</p>
              <div class="h-1.5 w-full rounded-full bg-surface-200-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  class:bg-success-500={p.winA > p.draw && p.winA > p.winB}
                  class:bg-primary-500={!(p.winA > p.draw && p.winA > p.winB)}
                  style="width:{p.winA}%"
                ></div>
              </div>
            </div>

            <!-- Draw -->
            <div class="space-y-1 text-center">
              <p class="text-xs text-surface-500">Draw</p>
              <p class="text-lg font-medium text-surface-950-50">{p.draw}%</p>
              <div class="h-1.5 w-full rounded-full bg-surface-200-800 overflow-hidden">
                <div class="h-full rounded-full bg-surface-400 transition-all" style="width:{p.draw}%"></div>
              </div>
            </div>

            <!-- Win B -->
            <div class="space-y-1 text-right">
              <p class="text-xs text-surface-500">{match.teamB} win</p>
              <p class="text-lg font-medium text-surface-950-50">{p.winB}%</p>
              <div class="h-1.5 w-full rounded-full bg-surface-200-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all ml-auto"
                  class:bg-error-500={p.winB > p.draw && p.winB > p.winA}
                  class:bg-primary-500={!(p.winB > p.draw && p.winB > p.winA)}
                  style="width:{p.winB}%"
                ></div>
              </div>
            </div>

          </div>

        </article>

        <!-- Card footer -->
        <footer class="flex items-center justify-between px-4 py-3">
          <small class="opacity-60">Model picks: <strong>{predictedOutcome(p, match)}</strong></small>
          <small class="opacity-60">FIFA model · April 2026</small>
        </footer>

      </div>
    {/each}

    {#if filteredMatches.length === 0}
      <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-12 text-center text-surface-400 text-sm">
        No matches for this selection.
      </div>
    {/if}

    <!-- Upload format hint -->
     <!--     
    <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-4 text-xs text-surface-400 space-y-1">
      <p><strong class="text-surface-500">Results file format</strong> — place in <code class="font-mono bg-surface-200-800 px-1 rounded">DATA_ROOT/wc2026_results.json</code> or <code class="font-mono bg-surface-200-800 px-1 rounded">.csv</code></p>
      <p>JSON: array of <code class="font-mono bg-surface-200-800 px-1 rounded">&#123;match_id, actual_outcome&#125;</code> where outcome is <code class="font-mono bg-surface-200-800 px-1 rounded">A</code> / <code class="font-mono bg-surface-200-800 px-1 rounded">D</code> / <code class="font-mono bg-surface-200-800 px-1 rounded">B</code></p>
      <p>CSV: header row <code class="font-mono bg-surface-200-800 px-1 rounded">match_id,actual_outcome</code> then one row per match.</p>
    </div>
      -->
  </main>
</div>