import { writable } from 'svelte/store';
import type { ScenarioId } from '$lib/data/scenario-index';

export const selectedScenario = writable<ScenarioId>('baseline');