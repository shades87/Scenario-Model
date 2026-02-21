<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let sortedSimulations: any[] = [];

   type Simulation = {
    ALP: number;
    Liberal: number;
    Nationals: number;
    Greens: number;
    PHON: number;
    Other: number;
  };

  
  export let simulations:Simulation[];
  export let totalSeats = 88;

  

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  function coalitionSeats(sim: { Liberal: number; Nationals: number }) {
    return sim.Liberal + sim.Nationals;
  }

  function updateChart() {
    if (!chart || !simulations) return;

    // Sort simulations strongest ALP -> strongest Coalition
    const sorted = [...simulations].sort((a, b) => {
      const marginA = a.ALP - coalitionSeats(a);
      const marginB = b.ALP - coalitionSeats(b);
      return marginB - marginA;
    });

    sortedSimulations = [...simulations].sort((a, b) => {
    const marginA = a.ALP - coalitionSeats(a);
    const marginB = b.ALP - coalitionSeats(b);
    return marginB - marginA;
  });

    chart.data.datasets = [
      {
        label: 'ALP',
        borderColor: '#d32f2f',
        backgroundColor: '#d32f2f',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.ALP }))
      },
      {
        label: 'Coalition',
        borderColor: '#005689',
        backgroundColor: '#005689',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: coalitionSeats(sim) }))
      },
      {
        label: 'Greens',
        borderColor: '#00a651',
        backgroundColor: '#00a651',
        fill: false,
        data: sorted.map((sim, i) => ({ x: i + 1, y: sim.Greens }))
      },
      {
        label: 'PHON',
        borderColor: '#F36D24',
        backgroundColor: '#F36D24',
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
    chart.options.scales!.y!.max = totalSeats;
    chart.update();
  }

  onMount(() => {
    chart = new Chart(canvas, {
      type: 'scatter',
      data: { datasets: [] }, // empty initially
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 5,
        showLine: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: () => '',
              footer: (tooltipItems) => {
                const simIndex = tooltipItems[0].dataIndex;
                const sim = sortedSimulations[simIndex];
                return [
                  `ALP: ${sim.ALP}`,
                  `Coalition: ${coalitionSeats(sim)}`,
                  `Greens: ${sim.Greens}`,
                  `PHON: ${sim.PHON}`,
                  `Other: ${sim.Other}`
                ];
              }
            },
            displayColors: false
          },
          legend: { position: 'bottom' }
        },
        scales: {
          x: {
            title: { display: true, text: 'Simulations (ALP → Coalition strongest)' }
          },
          y: {
            title: { display: true, text: 'Seats' },
            min: 0,
            max: totalSeats,
            ticks: { stepSize: 10 }
          }
        }
      },
      plugins: [
        {
          id: 'majorityLine',
          afterDraw: (chart) => {
            const { ctx, scales } = chart;
            const majority = Math.floor(totalSeats / 2) + 1;
            const y = scales.y.getPixelForValue(majority);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(scales.x.left, y);
            ctx.lineTo(scales.x.right, y);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.restore();
          }
        }
      ]
    });

    updateChart();
  });

  // 🔁 Reactive update whenever `simulations` changes
  $: if (chart && simulations) {
    updateChart();
  }
</script>

<canvas bind:this={canvas} height="50"></canvas>