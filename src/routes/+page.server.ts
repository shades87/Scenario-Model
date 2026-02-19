import fs from 'fs';
import path from 'path';

export async function load() {
  const dir = path.resolve('src/lib/data/monte_carlos_results');
  const files = fs.readdirSync(dir);

  const polls = files.map((file) => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  });

  // Sort by poll date inside JSON
  polls.sort((a, b) => new Date(a.poll_date) - new Date(b.poll_date));

  return { polls };
}