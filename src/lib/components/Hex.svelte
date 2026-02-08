
<script lang="ts">
  import { hexToPixel, hexPoints } from '$lib/hex';

  export let q: number;
  export let r: number;
  export let size = 15;
  export let fill = '#ccc';
  export let label = '';
  export let title = '';

  const { x, y } = hexToPixel(q, r, size);

 
</script>

<g transform={`translate(${x}, ${y})`}>
  <polygon
    points={hexPoints(0, 0, size)}
    fill={fill}
    stroke="#333"
    stroke-width="1"
  />
  <text
    text-anchor="middle"
    dominant-baseline="middle"
    font-size="4"
    font-weight='bold'
    fill="#fff"
    pointer-events="none"
  >
    {label}
  </text>

  {#if title}
    <title>{title}</title>
  {/if}
</g>
