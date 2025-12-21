// stores.ts (or in <script> block)
import { derived } from "svelte/store";
import { projectedSeats } from "./projectedSeats";
import { winner } from "$lib/projection";

export const seatTotals = derived(projectedSeats, ($projectedSeats) => {
  const totals: Record<string, number> = {};

  for (const seat of $projectedSeats) {
    const party = winner(seat);
    totals[party] = (totals[party] ?? 0) + 1;
  }

  return totals;
});