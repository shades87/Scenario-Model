<script>
  import SimulationTile from './SimulationTile.svelte';
  export let simulations;
</script>

<h3>100 Sampled Elections</h3>

<div class="grid">
  {#each simulations as sim}
    <SimulationTile {sim} />
  {/each}
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
}
</style>