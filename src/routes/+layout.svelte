<script lang="ts">
	import './layout.css';
	
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>
<style>
	    @font-face{
        font-family: 'Playfair';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url($lib/fonts/playfair-display-latin-900-normal.ttf)
    }

</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
