import { readFile, writeFile } from 'fs/promises';

const rawData = await readFile('./words.json', 'utf-8');
const data = JSON.parse(rawData);

// Map to the desired format
const solutions = data.words.map((word, index) => ({
  id: index + 1,
  word: word.toLowerCase()
}));

// Write the output to db.json
await writeFile('db.json', JSON.stringify({ solutions }, null, 2));

console.log(`✅ db.json created with ${solutions.length} words.`);
