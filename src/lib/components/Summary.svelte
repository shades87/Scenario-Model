<script lang="ts">
  export let results;

  const parties = results.summary.parties;
  const coalition = results.summary.coalition;
  const majority = results.summary.majority_threshold;
  const primaries = results.first_preferences

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
</script>
<div class="flex flex-col items-center">
  <h3 class="h3">{results.pollster} – {results.date}</h3>
  <p class='mb-2'>Majority threshold: {majority} seats</p>
</div>

<div class="summary-grid">

  <div class="card alp">
    <h3>ALP</h3>
    <p>Avg: {parties.ALP.average.toFixed(1)}</p>
    <p>Majority chance: {(parties.ALP.majority_probability * 100).toFixed(1)}%</p>
    <p>90% range: {parties.ALP.p5} – {parties.ALP.p95}</p>
    <p>FP: {primaries.ALP}%</p>
  </div>

  <div class="card coalition">
    <h3>Coalition</h3>
    <p>Avg: {coalition.average.toFixed(1)}</p>
    <p>Majority chance: {(coalition.majority_probability * 100).toFixed(1)}%</p>
    <p>90% range: {coalition.p5} – {coalition.p95}</p>
    <p>FP: {primaries.Liberal}%</p>
  </div>

  <div class="card green">
    <h3>Greens</h3>
    <p>Avg: {parties.Greens.average.toFixed(1)}</p>
    <p>90% range: {parties.Greens.p5} – {parties.Greens.p95}</p>
    <p>FP: {primaries.Greens}%</p>
  </div>

  <div class="card phon">
    <h3>PHON</h3>
    <p>Avg: {parties.PHON.average.toFixed(1)}</p>
    <p>90% range: {parties.PHON.p5} – {parties.PHON.p95}</p>
    <p>FP: {primaries.PHON}%</p>
  </div>

</div>

<style>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  padding: 1rem;
  border-radius: 8px;
  color: white;
}

.alp { background: #d32f2f; }
.coalition { background: #005689; }
.green { background: #00a651; }
.phon { background: #F36D24 ;}

 h3{
    font-family: 'Playfair', normal;
 }
</style>