<script lang="ts">
  export let sim;

  function coalitionSeats(sim:  {Liberal:number, Nationals:number}) {
    return sim.Liberal + sim.Nationals;
  }

  const totalSeats = 90; // adjust to your parliament size
</script>

<div class="tile {sim.result}">

  <div class="bar">
    <div
      class="alp"
      style="width:{sim.ALP / totalSeats * 100}%">
    </div>

    <div
      class="coalition"
      style="width:{coalitionSeats(sim) / totalSeats * 100}%">
    </div>
  </div>

  <small>
    ALP {sim.ALP} |
    COA {coalitionSeats(sim)}
  </small>

</div>

<style>
.tile {
  padding: 6px;
  border-radius: 6px;
  font-size: 11px;
  color: white;
}

.tile.ALP { background: #b71c1c; }
.tile.Coalition { background: #0d47a1; }
.tile.Hung { background: #424242; }

.bar {
  display: flex;
  height: 6px;
  margin-bottom: 4px;
}

.bar div {
  height: 100%;
}

.alp { background: #ff5252; }
.coalition { background: #42a5f5; }
</style>