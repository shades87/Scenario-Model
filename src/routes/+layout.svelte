<script lang="ts">
	import './layout.css';
	
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>
<style>
	    @font-face{
        font-family: 'Mechanical';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url($lib/fonts/MechanicalBd.otf)
    }
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
