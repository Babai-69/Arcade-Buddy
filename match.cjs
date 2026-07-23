const fs = require('fs');
const content = fs.readFileSync('src/data/skillBadges.ts', 'utf8');
const arrMatch = content.match(/\[([\s\S]*?)\]/);
const SKILL_BADGES = arrMatch[1].split(',').map(s => {
  let m = s.match(/"([^"]+)"/);
  return m ? m[1] : null;
}).filter(s => s !== null);

const profileBadges = JSON.parse(fs.readFileSync('badges_dump.json', 'utf8'));

let matchCount = 0;
for(const b of profileBadges) {
  if (SKILL_BADGES.includes(b)) {
    matchCount++;
  } else {
    console.log("NOT MATCHED:", b);
  }
}
console.log("Matched:", matchCount);
