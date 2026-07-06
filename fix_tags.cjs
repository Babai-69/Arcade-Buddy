const fs = require('fs');
let content = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');

const oldLine = "badge.name.includes('July') || badge.name.includes('JULY')";
const newLine = "badge.name.includes('July') || badge.name.includes('JULY') || badge.name.includes('Arcade Adventure') || badge.name.includes('Arcade Simulator') || badge.name.includes('Arcade Trail') || badge.name.includes('Arcade Voyage') || badge.name.includes('Safe Spaces')";

content = content.replace(oldLine, newLine);
fs.writeFileSync('src/components/CheckProgress.tsx', content);
