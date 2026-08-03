const fs = require('fs');
let code = fs.readFileSync('src/data/badgesData.ts', 'utf-8');

const augustGames = `
  {
    "name": "Arcade Simulator: Network Security Engineer",
    "image": "https://services.google.com/fh/files/misc/simulater-aug.png",
    "link": "https://www.skills.google/games/7397"
  },
  {
    "name": "Spans and Plans",
    "image": "https://services.google.com/fh/files/misc/special-aug.png",
    "link": "https://www.skills.google/games/7399"
  },
  {
    "name": "Arcade Base Camp Aug 2026",
    "image": "https://services.google.com/fh/files/misc/bc-aug.png",
    "link": "https://www.skills.google/games/7394"
  },
  {
    "name": "Arcade Trail Aug 2026",
    "image": "https://services.google.com/fh/files/misc/trail-aug.png",
    "link": "https://www.skills.google/games/7396"
  },
  {
    "name": "Arcade Adventure Aug 2026",
    "image": "https://services.google.com/fh/files/misc/adv-aug.png",
    "link": "https://www.skills.google/games/7395"
  },
  {
    "name": "Arcade Voyage Aug 2026",
    "image": "https://services.google.com/fh/files/misc/voyuge-aug.png",
    "link": "https://www.skills.google/games/7398"
  },
`;

code = code.replace(/export const gameBadges = \[/, 'export const gameBadges = [\n' + augustGames);
fs.writeFileSync('src/data/badgesData.ts', code);
console.log("Success");
