<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let simulations;
  export let majority = 45;

  let canvas;

  function coalitionSeats(sim) {
    return sim.Liberal + sim.Nationals;
  }

  onMount(() => {

    // Sort from strongest ALP to strongest Coalition
    const sorted = [...simulations].sort((a, b) => {
      const marginA = a.ALP - coalitionSeats(a);
      const marginB = b.ALP - coalitionSeats(b);
      return marginB - marginA;
    });

    const dataPoints = sorted.map((sim, index) => {
      const alp = sim.ALP;
      const coa = coalitionSeats(sim);

      let color;
      if (alp > coa) color = '#d32f2f';       // red
      else if (coa > alp) color = '#1976d2';  // blue
      else color = '#616161';                 // tie

      return {
        x: index + 1,
        y: alp,  // or use margin instead
        backgroundColor: color,
        sim
      };
    });

    new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [{
          data: dataPoints,
          pointBackgroundColor: dataPoints.map(p => p.backgroundColor),
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const sim = context.raw.sim;
                return [
                  `ALP: ${sim.ALP}`,
                  `Coalition: ${coalitionSeats(sim)}`,
                  `Greens: ${sim.Greens}`,
                  `PHON: ${sim.PHON}`,
                  `Other: ${sim.Other}`
                ];
              }
            }
          },
          legend: { display: false }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Simulations (ALP strongest → Coalition strongest)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'ALP Seats'
            }
          }
        }
      }
    });

  });
</script>

<canvas bind:this={canvas} height="50"></canvas>