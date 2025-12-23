<script lang="ts">
  import Hex from '$lib/components/Hex.svelte';
  import { projectedSeats } from '$lib/stores/projectedSeats';
  import { winner } from '$lib/projection';
  import { nationalSwing } from '$lib/stores/swing';
  import { hexBounds } from '$lib/hexBounds';
  import { electorates } from '$lib/data/electorates';
  import { writable } from 'svelte/store';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import { seatTotals } from '$lib/stores/totalSeats';

  //type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'PHON' | 'KAT' | 'CA';

  const hoveredSeat = writable<null | typeof $projectedSeats[0]>(null);

  const HEX_SIZE = 20;

  const partyColours:Record<string, string> = {
    ALP: '#d71920',
    LNP: '#005689',
    GRN: '#00a651',
    IND: '#999999',
    PHON: '#F36D24',
    KAT: '#DF1014',
    CA: '#FF5800'
  };

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
    </Tabs.List>

<Tabs.Content value="2PP">
    <div class="controls">
  <div class="flex justify-center items-center">
    <label class="flex flex-col items-center">
      <h1 class="h1 text-center text-black">
        National ALP 2pp swing: {(($nationalSwing * 100)).toFixed(1)}%
      </h1>
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
      <span class="font-semibold text-black">{party}</span>
      <span>
        {count}
        {#if count >= 76}
          <span class="ml-1">(maj)</span>
        {/if}
      </span>
    </div>
  {/each}
</div>
<!-- Desktop / large screens -->
<div class="hidden sm:block">
  <svg
    viewBox={`${bounds.x} ${bounds.y} ${bounds.width - 100} ${bounds.height - 50}`}
    class="w-full h-[600px]"
    preserveAspectRatio="xMidYMid meet"
  >
    {#each $projectedSeats as seat}
      <Hex
        q={seat.q}
        r={seat.r}
        fill={partyColours[winner(seat)]}
        label={seat.name}
        title={`${seat.name} 2025 result — ${seat.tcp.partyA} ${Math.round(seat.tcp.a * 10000) / 100}% vs ${Math.round(seat.tcp.b * 10000) / 100}% ${seat.q} ${seat.r}`}
        on:mouseenter={() => hoveredSeat.set(seat)}
        on:mouseleave={() => hoveredSeat.set(null)}
      />
    {/each}
  </svg>
</div>

<!-- Mobile -->
<div class="block sm:hidden">
  <svg
    viewBox={`${bounds.x} ${bounds.y} ${bounds.width-300} ${bounds.height+100}`}
    class="w-full h-[500px]"
    preserveAspectRatio="xMidYMid meet"
  >
    {#each $projectedSeats as seat}
      <Hex
        q={seat.r}
        r={seat.q}
        fill={partyColours[winner(seat)]}
        label={seat.name}
        title={`${seat.name} 2025 result — ${seat.tcp.partyA} ${Math.round(seat.tcp.a * 10000) / 100}% vs ${Math.round(seat.tcp.b * 10000) / 100}% ${seat.q} ${seat.r}`}
      />
    {/each}
  </svg>
</div>

<div class="flex justify-center mb-10">
<div class="card p-4 preset-filled-surface-100-900 border-[1px] border-surface-200-800 max-w-md divide-y overflow-hidden">
<header class="pb-3">
  <h2 class="h2">What the heck is going on here?</h2>
</header>
<article class="py-3">
  <p>This is a simple seat predictor based on the 2025 Australian federal election.</p>
</article>
<footer class="flex items-center justify-between">
		<small class="opacity-60">Danno</small>
		<small class="opacity-60">{new Date("2025-12-22").toLocaleDateString()}</small>
	</footer>
</div>
</div>

</Tabs.Content>
<Tabs.Content value="Demographics">
    Here you'll be able to see how demographics shift affect primary votes and public funding
</Tabs.Content>
</Tabs>