const fs = require('fs');
let code = fs.readFileSync('src/lib/badgeLinks.ts', 'utf-8');

const augustGames = `  "Arcade Simulator: Network Security Engineer": "https://www.skills.google/games/7397",
  "Spans and Plans": "https://www.skills.google/games/7399",
  "Arcade Base Camp": "https://www.skills.google/games/7394",
  "Arcade Adventure": "https://www.skills.google/games/7395",
  "Arcade Voyage": "https://www.skills.google/games/7398",
  "Arcade Trail": "https://www.skills.google/games/7396",
`;

code = code.replace(/export const GAME_BADGES: Record<string, string> = {[\s\S]*?\};/, 'export const GAME_BADGES: Record<string, string> = {\n' + augustGames + '};');
fs.writeFileSync('src/lib/badgeLinks.ts', code);
console.log("Success");
