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
  
  export let data;

  let polls = data.polls;
  let index = polls.length - 1; // start with most recent

  $: currentPoll = polls[index];

  function next() {
    if (index < polls.length - 1) index++;
  }

  function prev() {
    if (index > 0) index--;
  }
  
  
  

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
<Tabs  defaultValue="2PP">
    <Tabs.List class="bg-primary-300 text-white pt-2 pl-2">
        <Tabs.Trigger value="2PP">National 2PP</Tabs.Trigger>
        <Tabs.Trigger value="Demographics">Demographics</Tabs.Trigger>
        <Tabs.Trigger class="hidden md:block" value="Vic Simulation">Victoria Simulation</Tabs.Trigger>
    </Tabs.List>

<Tabs.Content value="2PP">
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

</Tabs.Content>
<Tabs.Content value="Demographics">
   <div class="ml-5 flex justify-center items-center">
    <h2 class="h2">Generational change & primary votes</h2>
  </div>

  <div class="flex flex-col items-center gap-6 mt-4">

  <!-- Year slider -->
  <label class="flex flex-col items-center">
    <span class="font-semibold">
      Years after 2025: {$yearsForward}
      Electors: {Math.round(18_098_797 * Math.pow(1 + 0.015, $yearsForward)).toLocaleString()}
    </span>
    <input
      type="range"
      min="0"
      max="20"
      step="1"
      bind:value={$yearsForward}
      class="w-64 mt-2"
    />
  </label>

  <!-- House / Senate toggle -->
  <div class="flex gap-4">
<button
  class="px-3 py-1 rounded border 
         border-transparent hover:border-primary-500
         focus:outline-none focus:ring-2 focus:ring-primary-500"
  class:bg-primary-500={$selectedChamber === 'House'}
  class:text-white={$selectedChamber === 'House'}
  on:click={() => selectedChamber.set('House')}
>
  House
</button>

<button
  class="px-3 py-1 rounded border 
         border-transparent hover:border-primary-500
         focus:outline-none focus:ring-2 focus:ring-primary-500"
  class:bg-primary-500={$selectedChamber === 'Senate'}
  class:text-white={$selectedChamber === 'Senate'}
  on:click={() => selectedChamber.set('Senate')}
>
  Senate
</button>
  </div>

  <!-- Vote share bars -->
  <div class="w-full max-w-lg m-1">
    {#if $selectedChamber === 'House'}
      {#each Object.entries($projectedFpHouse) as [party, share]}
      {#if share > 0}
      <div class="flex items-center gap-2 mb-1 ml-2 mr-2">
    
    <span class="w-12 text-sm">{party}</span>

    <div class="flex-1 bg-surface-200 rounded-sm h-4">
      <div
        class="h-4 rounded-sm"
        style="
          width: {share * 200}%;
          background-color: {partyColours[party as Party] ?? fallbackColour};
        "
      ></div>
    </div>

    <span class="text-sm">
      {(share * 100).toFixed(1)}%
    </span>
  </div>
  {/if}
{/each}
    {:else}
      {#each Object.entries($projectedFpSenate) as [party, share]}
      {#if share > 0}
      <div class="flex items-center gap-2 mb-1 ml-2 mr-2">
    <span class="w-12 text-sm">{party}</span>

    <div class="flex-1 bg-surface-200 rounded-sm h-4">
      <div
        class="h-4 rounded-sm"
        style="
          width: {share * 200}%;
          background-color: {partyColours[party as Party] ?? fallbackColour};
        "
      ></div>
    </div>

    <span class="text-sm">
      {(share * 100).toFixed(1)}%
    </span>
  </div>
  {/if}
{/each}
    {/if}
  </div>

  <!-- Public funding -->
  <div class="w-full max-w-lg mt-6 ml-2 mr-2">
    <h3 class="h3 mb-2">Public funding from {$selectedChamber} votes (≥ 4%)</h3>
    {#each Object.entries($publicFunding) as [party, dollars]}
  <div class="flex justify-between items-center ml-2 mr-2">
    <span class="flex items-center gap-2">
      <span
        class="inline-block w-3 h-3 rounded-sm"
        style="background-color: {partyColours[party as Party] ?? fallbackColour}"
      ></span>
      {party}
    </span>
    <span>
      ${(dollars / 1_000_000).toFixed(1)}m
    </span>
  </div>
{/each}
  </div>

</div>
  <div class="ml-5 flex justify-center items-center">
  </div>
  <div class="flex justify-center mt-10">
<div class="card m-1 p-4 preset-filled-surface-100-900 border-[1px] border-surface-200-800 max-w-md divide-y overflow-hidden">
<header class="pb-3">
  <h2 class="h2">What the heck is going on here?</h2>
</header>
<article class="py-3">
 <p>This is a simple first preference and public funding predictor based on the 2025 Australian federal election.</p>
  <ul class="ml-5 list-disc">
    <li>
      <p>This looks at the first preference vote at the 2025 election and models what might happen in the future</p>
    </li>
    <li>
      This is not a robust prediction, more like a what if scenario
    </li>
    <li>
      <p>This doesn't yet match how the public funding rules of parties really works</p>
    </li>
    <li>
      This assumes a population growth of 1.5% per year
    </li>
    <li>
      This calculates based on national % > than 4% where AEC looks at 4% in an electorate
    </li>
    <li>
      There's a large jump from 0 years to 1 year. This is because at the last election each first preference is $3.5 public funding for that party </li> 
      From the next election onwards each first preference is $5 of public funding
    <li>
      A bug seems to be applying generation change at year 0 - % of FP votes at 0 years should be the same as the election
    </li>
  </ul>
</article>
<footer class="flex items-center justify-center">
		<small class="opacity-60">Danno</small>
		<small class="opacity-60 ml-3">{new Date("2026-01-26").toLocaleDateString("en-au")}</small>
	</footer>
</div>
</div>
</Tabs.Content>
<Tabs.Content value="Vic Simulation">
  <div class="m-3">
    <div class="flex flex-col items-center">
        <h2 class="h2">Victorian Election Simulation</h2>
        <div class="flex gap-3">
          <button class="px-3 py-1 rounded border 
         border-transparent hover:border-primary-500
         focus:outline-none focus:ring-2 focus:ring-primary-500" on:click={prev} disabled={index === 0}>Back</button>
          <button class="px-3 py-1 rounded border 
         border-transparent hover:border-primary-500
         focus:outline-none focus:ring-2 focus:ring-primary-500" on:click={next} disabled={index === polls.length - 1}>Forward</button>
        </div>
    </div>
    
    <Summary results={currentPoll} />
    <SimulationLineChart
    simulations={currentPoll.visual_simulations}
    totalSeats={88} />
  </div>
   <div class="flex justify-center mt-10">
<div class="card m-1 p-4 preset-filled-surface-100-900 border-[1px] border-surface-200-800 max-w-md divide-y overflow-hidden">
<header class="pb-3">
  <h2 class="h2">What the heck is going on here?</h2>
</header>
<article class="py-3">
 <p>This is a very simple simulation of the upcoming Victorian State election</p>
  <ul class="ml-5 list-disc">
    <li>
      <p>The election is simulated 50K times adding in random polling errors</p>
    </li>
    <li>
      100 simulated elections are shown on a line graph, sorted from highest incumbant seats to least incumbant seats
    </li>
    <li>
      Preference flows are correct for the 2 major parties, adjustments are needed for minor parties and others
    </li>
    <li>
      This model is limited and likely under predicting crossbench seats
    </li>
    <li>
      Seemingly paradoxically I think that it's also overestimating the chance of a hung parliament
    </li>
  </ul>
</article>
<footer class="flex items-center justify-center">
		<small class="opacity-60">Danno</small>
		<small class="opacity-60 ml-3">{new Date("2026-02-17").toLocaleDateString("en-au")}</small>
	</footer>
</div>
</div>
</Tabs.Content>
<Tabs.Content value="Blog">
  Maybe I should have a politics blog?
</Tabs.Content>
</Tabs>