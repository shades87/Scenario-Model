<script lang='ts'>
  import { projectedSeats } from '$lib/stores/projectedSeats';
  import { hexBounds } from '$lib/hexBounds';
  import { electorates } from '$lib/data/electorates';

  import type { Party } from '$lib/data/types';

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


</script>
<style>
h1, h2 {
    font-family: 'Playfair', normal;
 }
</style>

<div class="ml-5 flex justify-center items-center">
 <h1 class="h1">Public Funding</h1>
 </div>
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
<div class="card m-1 mb-27 sm:mb-1 p-4 preset-filled-surface-100-900 border-[1px] border-surface-200-800 max-w-md divide-y overflow-hidden">
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