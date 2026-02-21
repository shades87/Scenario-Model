<script lang="ts">
  import Summary from '$lib/components/Summary.svelte';
  import SimulationLineChart from '$lib/components/SimulationLineChart.svelte';
  import results from '$lib/data/monte_carlos_results/vic/2026-02-19.json'

  export let data;
  //export const yearsForward = writable(0); // 0–20 years

  

  //const chamber = writable<'House' | 'Senate'>('House');

  //type Party = 'ALP' | 'LNP' | 'GRN' | 'IND' | 'PHON' | 'KAT' | 'CA';


</script>
<style>
 h1, h2 {
    font-family: 'Playfair', normal;
 }
</style>
<div class="flex flex-col items-center mt-3">
  <nav class="btn-group  border-1 border-primary-300 flex-col p-2 md:flex-row">
    <a href="/simulation/vic"><button type="button" class="btn border-1 border-primary-300 hover:bg-primary-300 hover:text-white">VIC</button></a>
    <a href="/simulation/sa"><button type="button" class="btn border-1 border-primary-300 hover:bg-primary-300 hover:text-white">SA</button></a>
  </nav>     
</div>
<div class="m-3">
  <div class="flex flex-col items-center">
    <h1 class="h1">{data.stateName} Election Simulation</h1>
  </div>
    


    
    <Summary results={results} />
    <SimulationLineChart
    simulations={results.visual_simulations}
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