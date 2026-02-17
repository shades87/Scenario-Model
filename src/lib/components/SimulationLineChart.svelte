<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let simulations;
  export let totalSeats = 88; // adjust to your parliament size

  let canvas: HTMLCanvasElement;

  function coalitionSeats(sim: {Liberal:number, Nationals:number}) {
    return sim.Liberal + sim.Nationals;
  }

  onMount(() => {
    // 1️⃣ Sort simulations from strongest ALP → strongest Coalition
    const sorted = [...simulations].sort((a, b) => {
      const marginA = a.ALP - coalitionSeats(a);
      const marginB = b.ALP - coalitionSeats(b);
      return marginB - marginA;
    });

    // 2️⃣ Prepare datasets for each party
    const dataset = [
      {
        label: 'ALP',
        borderColor: '#d32f2f',
        backgroundColor: '#d32f2f',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.ALP }))
      },
      {
        label: 'Coalition',
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: coalitionSeats(sim) }))
      },
      {
        label: 'Greens',
        borderColor: '#66bb6a',
        backgroundColor: '#66bb6a',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.Greens }))
      },
      {
        label: 'PHON',
        borderColor: '#ffa000',
        backgroundColor: '#ffa000',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.PHON }))
      },
      {
        label: 'Other',
        borderColor: '#9e9e9e',
        backgroundColor: '#9e9e9e',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.Other }))
      }
    ];

    new Chart(canvas, {
      type: 'scatter',
      data: { datasets: dataset },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3, // wide & flat
        showLine: true,
        plugins: {
          tooltip: {
    mode: 'index',
    intersect: false,
    callbacks: {
        // hide default labels for each dataset
        label: function() { return ''; },

        // show everything in the footer instead
        footer: function(tooltipItems) {
            // tooltipItems is an array of points at the same X
            const simIndex = tooltipItems[0].dataIndex;
            const sim = sorted[simIndex];

            return [
                `ALP: ${sim.ALP}`,
                `Coalition: ${coalitionSeats(sim)}`,
                `Greens: ${sim.Greens}`,
                `PHON: ${sim.PHON}`,
                `Other: ${sim.Other}`
            ];
        }
    },
    displayColors: false // optional: hide color squares in tooltip
},
          legend: { position: 'bottom' }
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
              text: 'Seats'
            },
            min: 0,
            max: totalSeats,
            ticks: { stepSize: 10 }
          }
        }
      }
    });
  });
</script>

<canvas bind:this={canvas} height="50"></canvas>