import fs from 'fs';
import path from 'path';

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
  const state = params.state; // 'vic' or 'fed'


  const dir = path.resolve(`src/lib/data/monte_carlos_results/${state}`);
  const files = fs.readdirSync(dir);

  const polls = files.map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(content);
  });

  return { polls,
    stateCode: state,
    stateName: stateNames[state]
   };
}