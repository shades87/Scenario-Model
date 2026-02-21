<script lang="ts">
	import './layout.css';
	
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
    import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from 'lucide-svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>
<style>
	    @font-face{
        font-family: 'Playfair';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url($lib/fonts/playfair-display-latin-900-normal.ttf)
    }
        @font-face{
            font-family: 'Creepster';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url($lib/fonts/creepster-latin-400-normal.ttf)
        }
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<AppBar class="bg-primary-300 text-white">
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<a href="/"><button type="button" class="btn border-1 border-white hover:bg-white hover:text-primary-900">Fed 25</button></a>
			<a href="/demographics"><button type="button" class="btn border-1 border-white hover:bg-white hover:text-primary-900">Demographics</button></a>
			<a href="/simulation"><button type="button" class="btn border-1 border-white hover:bg-white hover:text-primary-900">FP Simulations</button></a>
		</AppBar.Lead>
		<AppBar.Headline>
						
			
		</AppBar.Headline>
		<!-- 
		<AppBar.Trail>
			<button type="button" class="btn-icon hover:preset-tonal"><SearchIcon class="size-6" /></button>
			<button type="button" class="btn-icon hover:preset-tonal"><CalendarIcon class="size-6" /></button>
			<button type="button" class="btn-icon hover:preset-tonal"><CircleUserIcon class="size-6" /></button>
		</AppBar.Trail>
		-->
	</AppBar.Toolbar>
</AppBar>
{@render children()}
