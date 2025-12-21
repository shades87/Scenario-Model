<script lang="ts">
  import Hex from '$lib/components/Hex.svelte';
  import { projectedSeats } from '$lib/stores/projectedSeats';
  import { winner } from '$lib/projection';
  import { yearsAhead } from '$lib/stores/years';
  import { nationalSwing } from '$lib/stores/swing';
  import { hexBounds } from '$lib/hexBounds';
  import { electorates } from '$lib/data/electorates';
  import { nationalFp } from '$lib/stores/nationalFp';

  const HEX_SIZE = 60;

  const partyColours = {
    ALP: '#d71920',
    LNP: '#005689',
    GRN: '#00a651',
    IND: '#999999',
    OTH: '#bbbbbb'
  };

    $: bounds = hexBounds(electorates, HEX_SIZE);
</script>

<div class="controls">
  <div>
    <label>
      National ALP 2PP swing:
      {(($nationalSwing * 100)).toFixed(1)}%
    </label>
    <input
      type="range"
      min="-0.1"
      max="0.1"
      step="0.005"
      bind:value={$nationalSwing}
    />
  </div>

  <div style="margin-top: 1rem;">
    <label>
      Years ahead: {$yearsAhead}
    </label>
    <input
      type="range"
      min="0"
      max="12"
      step="3"
      bind:value={$yearsAhead}
    />
    <div style="font-size: 0.8rem; opacity: 0.7;">
      0 = last election · 3 = next · 12 = four elections
    </div>
  </div>
</div>


<svg
  viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
  width="100%"
  style="max-width: 900px; height: auto;"
>
  {#each $projectedSeats as seat}
    <Hex
      q={seat.q}
      r={seat.r}
      fill={partyColours[winner(seat)]}
      label={seat.name.slice(0, 3)}
    />
  {/each}
</svg>
<div class="national-fp" style="margin-top:1rem;">
  <h3>National projected first preferences</h3>
  <ul>
    <li>ALP: {($nationalFp.ALP * 100).toFixed(1)}%</li>
    <li>LNP: {($nationalFp.LNP * 100).toFixed(1)}%</li>
    <li>Greens: {($nationalFp.GRN * 100).toFixed(1)}%</li>
    <li>Other: {($nationalFp.OTH * 100).toFixed(1)}%</li>
  </ul>
</div>