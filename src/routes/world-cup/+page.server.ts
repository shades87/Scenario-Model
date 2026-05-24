import { env } from '$env/dynamic/private';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';

type Outcome = 'A' | 'D' | 'B';

interface ResultRow {
  match_id: string;
  actual_outcome: string;
}

function parseJSON(raw: string): Record<string, Outcome> {
  const rows: ResultRow[] = JSON.parse(raw);
  const out: Record<string, Outcome> = {};
  for (const row of rows) {
    const o = row.actual_outcome?.toUpperCase();
    if (['A', 'D', 'B'].includes(o)) {
      out[row.match_id] = o as Outcome;
    }
  }
  return out;
}

function parseCSV(raw: string): Record<string, Outcome> {
  const out: Record<string, Outcome> = {};
  const lines = raw.trim().split('\n').slice(1); // skip header
  for (const line of lines) {
    const [match_id, actual_outcome] = line.split(',').map(s => s.trim());
    const o = actual_outcome?.toUpperCase();
    if (match_id && ['A', 'D', 'B'].includes(o)) {
      out[match_id] = o as Outcome;
    }
  }
  return out;
}

export const load: PageServerLoad = async () => {
  const DATA_ROOT = env.DATA_ROOT;
  let results: Record<string, Outcome> = {};

  if (!DATA_ROOT) {
    return { results };
  }

  // Prefer JSON, fall back to CSV
  const jsonPath = join(DATA_ROOT, 'wc2026_results.json');
  const csvPath  = join(DATA_ROOT, 'wc2026_results.csv');

  try {
    if (existsSync(jsonPath)) {
      results = parseJSON(readFileSync(jsonPath, 'utf-8'));
    } else if (existsSync(csvPath)) {
      results = parseCSV(readFileSync(csvPath, 'utf-8'));
    }
  } catch (err) {
    console.error('[WC Predictor] Failed to load results file:', err);
  }

  return { results };
};