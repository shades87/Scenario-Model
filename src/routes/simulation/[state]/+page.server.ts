import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

const stateNames: Record<string, string> = {
  vic: 'Victoria',
  sa: 'South Australia',
  fed: 'Federal',
  wa: 'Western Australia',
  nt: 'Northern Territory',
  act: 'ACT',
  nsw: 'New South Wales',
  qld: 'Queensland'
};

export async function load({ params }) {
  const state = params.state.toLowerCase();

  if (!stateNames[state]) {
    throw error(404, 'State not found');
  }
  const dir = path.resolve(`src/lib/data/monte_carlos_results/${state}`);

  if (!fs.existsSync(dir)) {
    throw error(404, 'No data for this state');
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));

  const polls = files.map((file) => {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  });

  // Sort by date inside JSON (latest last)
  polls.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );

  return {
    polls,
    stateCode: state,
    stateName: stateNames[state]
  };
}