<script lang="ts">
  import Hex from '$lib/components/Hex.svelte';
  import { projectedSeats } from '$lib/stores/projectedSeats';
  import { winner } from '$lib/projection';
  import { nationalSwing } from '$lib/stores/swing';
  import { hexBounds } from '$lib/hexBounds';
  import { electorates } from '$lib/data/electorates';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import { seatTotals } from '$lib/stores/totalSeats';
  import type { Party } from '$lib/data/types';
  import Summary from '$lib/components/Summary.svelte';
  import SimulationLineChart from '$lib/components/SimulationLineChart.svelte';
  import results from '$lib/data/monte_carlos_results/2026-02-19.json'

  import { selectedScenario } from '$lib/stores/scenario';

  //export const yearsForward = writable(0); // 0–20 years
  import { writable } from 'svelte/store';


   import {
    yearsForward,
    projectedFpHouse,
    projectedFpSenate,
    publicFunding,
    selectedChamber
  } from '$lib/stores/demographics';

  

  //const chamber = writable<'House' | 'Senate'>('House');

  //type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'PHON' | 'KAT' | 'CA';

  const hoveredSeat = writable<null | typeof $projectedSeats[0]>(null);

  const HEX_SIZE = 20;

  const partyColours:Record<string, string> = {
    ALP: '#d71920',
    LNP: '#005689',
    GRN: '#00a651',
    IND: '#999999',
    PHON: '#F36D24',
    KAT: '#E86046',
    LIB: '#005689',
    NAT: '#006946',
    LCA: '#228B22',
    CA: '#FF5800'
  };

  const fallbackColour = '#cccccc';

    $: bounds = hexBounds(electorates, HEX_SIZE);


</script>
<style>
 h1, h2 {
    font-family: 'Playfair', normal;
 }
</style>
  <div class="controls">
  <div class="flex justify-center items-center">
    <label class="flex flex-col items-center">
      <h1 class="h1 text-center">Australian Federal Election Scenarios</h1>
      <h2 class="h2 text-center">
        National ALP 2pp swing: {(($nationalSwing * 100)).toFixed(1)}%
      </h2>
      <input
        type="range"
        min="-0.1"
        max="0.1"
        step="0.001"
        bind:value={$nationalSwing}
        class="mt-2 w-64" 
      />
    </label>
  </div>
</div>
<div class="flex flex-wrap justify-center gap-6 mb-2 text-sm">
  {#each Object.entries($seatTotals) as [party, count]}
    <div
      class="flex items-center gap-2"
      class:font-bold={count >= 76}
    >
      <span
        class="inline-block w-3 h-3 rounded-sm"
        style="background-color: {partyColours[party]}"
      ></span>
      <span class="font-semibold">{party}</span>
      <span>
        {count}
        {#if count >= 76}
          <span class="ml-1">(maj)</span>
        {/if}
      </span>
    </div>
  {/each}
</div>
<div class="flex justify-center items-center">
  <nav class="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row">
	
		<button type="button" class="btn capitalize" class:preset-filled={$selectedScenario === 'baseline'}  on:click={() => selectedScenario.set('baseline')}>
      Fed 25
		</button>
    <button type="button" class="btn capitalize"  class:preset-filled={$selectedScenario === 'coalition-recovery'} on:click={() => selectedScenario.set('coalition-recovery')}>
      Coalition Recovery
		</button>
    <button type="button" class="btn capitalize"  class:preset-filled={$selectedScenario === 'phon-targets'} on:click={() => selectedScenario.set('phon-targets')}>
      PHON Targets
		</button>
    <button type="button" class="btn capitalize"  class:preset-filled={$selectedScenario === 'phon-surge'} on:click={() => selectedScenario.set('phon-surge')}>
      PHON Surge
    </button>
	
  </nav>
</div>

<!-- Desktop / large screens -->
<div class="hidden sm:block">
  <svg
    viewBox={`${bounds.x} ${bounds.y} ${bounds.width - 150} ${bounds.height - 50}`}
    class="w-full h-[500px]"
    preserveAspectRatio="xMidYMid meet"
  >
    {#each $projectedSeats as seat}
      <Hex
        q={seat.q}
        r={seat.r}
        fill={partyColours[winner(seat)]}
        label={seat.name}
        title={`${seat.name} 2025 result — ${seat.tcp.partyA} ${Math.round(seat.tcp.a * 10000) / 100}% vs ${Math.round(seat.tcp.b * 10000) / 100}%`}
        on:mouseenter={() => hoveredSeat.set(seat)}
        on:mouseleave={() => hoveredSeat.set(null)}
      />
    {/each}
  </svg>
</div>

<!-- Mobile  -->
<div class="block sm:hidden flex items-center justify-center">
  <svg
    viewBox={`${bounds.x} ${bounds.y} ${bounds.width-150} ${bounds.height}`}
    class="w-full"
    preserveAspectRatio="xMidYMid meet"
  >
    {#each $projectedSeats as seat}
      <Hex
        q={seat.q}
        r={seat.r}
        fill={partyColours[winner(seat)]}
        label={seat.name}
        title={`${seat.name} 2025 result — ${seat.tcp.partyA} ${Math.round(seat.tcp.a * 10000) / 100}% vs ${Math.round(seat.tcp.b * 10000) / 100}%`}
      />

    {/each}
  </svg>
</div> 

<div class="flex justify-center mb-10">
<div class="card m-1 p-4 preset-filled-surface-100-900 border-[1px] border-surface-200-800 max-w-md divide-y overflow-hidden">
<header class="pb-3">
  <h2 class="h2">What the heck is going on here?</h2>
</header>
<article class="py-3">
  <p>This is a simple seat predictor based on the 2025 Australian federal election.</p>
  <ul class="ml-5 list-disc">
    <li>
      <p>It assumes that the last 2 candidates from the 2025 election are the only candidates that can win the seat</p>
    </li>
    <li>
      <p>This isn't a robust prediction, it's more like a what if scenario</p>
    </li>
    <li>
        <p>Coalition Recovery scenario adds 5 2PP to LNP in contests where their opponent is an ALP candidate</p>
    </li>
    <li>
        <p>PHON Target Seats scenario replaces LNP in 25 target seats (where they weren't already in the final 2) identified in Antony Green's blog<a class="text-primary-500" href="https://antonygreen.com.au/one-nations-poll-surge-the-first-25-seats-to-watch/">[1]</a></p>
    </li>
    <li>
      <p>PHON Surge scenario has PHON Target seats and replaces LNP in more rural seats in VIC, QLD and NSW</p>
    </li>
    <li>
      Swing affects contests without an ALP candidate to a lessor degree
    </li>
    <li>
      Instead of making something of value I made this
    </li>
  </ul>
</article>
<footer class="flex items-center justify-center">
		<small class="opacity-60">Danno </small>
		<small class="opacity-60 ml-3">{new Date("2026-02-09").toLocaleDateString("en-au")}</small>
	</footer>
</div>
</div>