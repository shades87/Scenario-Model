<script lang="ts">
  import type { MatchPrediction, Match, Outcome } from './+page.server';
  //one change
  // ── Props ──────────────────────────────────────────────────────────────────
  let { data }: {
    data: {
      matches: Match[];
      predictions: Record<string, MatchPrediction>;
      results: Record<string, Outcome>;
    }
  } = $props();

  const GROUPS = ['All','A','B','C','D','E','F','G','H','I','J','K','L'] as const;

  const GROUP_COLORS: Record<string, string> = {
    A:'#1D9E75', B:'#378ADD', C:'#D4537E', D:'#7F77DD',
    E:'#1D9E75', F:'#BA7517', G:'#D85A30', H:'#7F77DD',
    I:'#378ADD', J:'#D4537E', K:'#BA7517', L:'#D85A30',
  };

  // ── State ──────────────────────────────────────────────────────────────────
  let selectedGroup = $state<string>('A');
  let selectedMatchday = $state<string>('1');

  const results = $derived(data.results ?? {});
  const predictions = $derived(data.predictions ?? {});

  const filteredMatches = $derived(
    data.matches.filter(m =>
      (selectedGroup === 'All' || m.group === selectedGroup) &&
      (selectedMatchday === 'all' || String(m.matchday) === selectedMatchday)
    )
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

  function predictedOutcome(p: MatchPrediction, m: Match): string {
    if (p.winA > p.draw && p.winA > p.winB) return m.teamA;
    if (p.winB > p.draw && p.winB > p.winA) return m.teamB;
    return 'Draw';
  }

  // ── Export predictions for current view ────────────────────────────────────
  function exportCSV() {
    const header = 'match_id,group,date,team_a,team_b,venue,rating_a,rating_b,win_a_pct,draw_pct,win_b_pct,predicted_outcome';
    const rows = filteredMatches.map(m => {
      const p = predictions[m.id];
      return `${m.id},${m.group},${m.date},${m.teamA},${m.teamB},${m.venue},${p.ratingA},${p.ratingB},${p.winA},${p.draw},${p.winB},${predictedOutcome(p, m)}`;
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
      return {
        match_id: m.id, group: m.group, date: m.date,
        team_a: m.teamA, team_b: m.teamB, venue: m.venue,
        rating_a: p.ratingA, rating_b: p.ratingB,
        win_a_pct: p.winA, draw_pct: p.draw, win_b_pct: p.winB,
        predicted_outcome: predictedOutcome(p, m),
      };
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
<style>
 h1, h2 {
    font-family: 'Playfair', normal;
 }
</style>

<!-- ── Page ──────────────────────────────────────────────────────────────── -->
<div class="min-h-screen bg-surface-50-950 mb-10">

  <!-- Header -->
  <header class="bg-white border-b border-surface-200-800 sticky top-0 z-10">
  
  <!-- Top row -->
  <div class="px-6 py-4 flex flex-col items-center justify-between gap-4 flex-wrap">
    <div class="flex-1">
      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="h1 text-surface-950-50">WC 2026 Match Predictor</h1>
      </div>
      <p class="text-xs text-surface-500 mt-0.5 text-center">
        Statistical model · Elo ratings · April 2026
      </p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-sm preset-outlined-surface-500" onclick={exportCSV}>↓ CSV</button>
      <button class="btn btn-sm preset-outlined-surface-500" onclick={exportJSON}>↓ JSON</button>
    </div>
  </div>

  <!-- Nav now sits inside header, full width -->
  <nav class="bg-primary-300 border-b border-surface-200-800 px-6 py-3 flex gap-4 items-center flex-wrap">
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-white">Group</span>
      <div class="flex gap-1 flex-wrap">
        {#each GROUPS as g(g)}
          <button
            class="btn btn-sm rounded-full text-xs text-white font-medium"
            class:preset-filled={selectedGroup === g}
            class:preset-outlined-surface-300={selectedGroup !== g}
            style={selectedGroup === g && g !== 'All' ? `background:${GROUP_COLORS[g]};border-color:${GROUP_COLORS[g]};color:white` : ''}
            onclick={() => { selectedGroup = g; }}
          >{g}</button>
        {/each}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-white">Matchday</span>
      <div class="flex gap-1">
        {#each [['1','MD 1'],['2','MD 2'],['3','MD 3'],['all','All']] as [val, label] (label)}
          <button
            class="btn btn-sm rounded-full text-xs font-medium border transition-all"
            class:bg-surface-950-50={selectedMatchday === val}
            class:text-surface-50-950={selectedMatchday === val}
            class:border-surface-950-50={selectedMatchday === val}
            class:bg-transparent={selectedMatchday !== val}
            class:text-white={selectedMatchday !== val}
            class:border-white={selectedMatchday !== val}
            onclick={() => selectedMatchday = val}
          >{label}</button>
        {/each}
      </div>
    </div>
  </nav>

</header>

  <!-- Group + Matchday filters -->
  
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
              <p class="text-xs text-surface-400">Elo {predictions[match.id]?.ratingA ?? '—'}</p>
            </div>
            <span class="text-xs text-surface-400 font-medium">vs</span>
            <div class="text-right">
              <p class="text-sm font-medium text-surface-950-50">{match.teamB}</p>
              <p class="text-xs text-surface-400">Elo {predictions[match.id]?.ratingB ?? '—'}</p>
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
                  class:bg-success-500={p.winB > p.draw && p.winB > p.winA}
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
          
          {#if actual !== undefined}
            {#if actual === 'A'}
             <small class="font-bold">Winner: {match.teamA}</small>
            {:else if actual === 'B'}
              <small class="font-bold">Winner: {match.teamB}</small>
            {:else}
              <small class="font-bold">Draw</small>
            {/if}
          {/if}
          <small class="opacity-60">Elo model · April 2026</small>
        </footer>

      </div>
    {/each}

    {#if filteredMatches.length === 0}
      <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-12 text-center text-surface-400 text-sm">
        No matches for this selection.
      </div>
    {/if}

    <!-- Upload format hint 
    <div class="card preset-filled-surface-100-900 border border-surface-200-800 p-4 text-xs text-surface-400 space-y-1">
      <p><strong class="text-surface-500">Results file format</strong> — place in <code class="font-mono bg-surface-200-800 px-1 rounded">DATA_ROOT/wc2026_results.json</code> or <code class="font-mono bg-surface-200-800 px-1 rounded">.csv</code></p>
      <p>JSON: array of <code class="font-mono bg-surface-200-800 px-1 rounded">&#123;match_id, actual_outcome&#125;</code> where outcome is <code class="font-mono bg-surface-200-800 px-1 rounded">A</code> / <code class="font-mono bg-surface-200-800 px-1 rounded">D</code> / <code class="font-mono bg-surface-200-800 px-1 rounded">B</code></p>
      <p>CSV: header row <code class="font-mono bg-surface-200-800 px-1 rounded">match_id,actual_outcome</code> then one row per match.</p>
    </div>
    -->

  </main>
</div>