const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const regex = /function TierCard\(\{[\s\S]*?\}\s*\{[\s\S]*?return \([\s\S]*?\);\n\}/;
code = code.replace(regex, "");

// The previous regex might have missed it if there were inner returns or something. Let's just find the start and end string.
const startIdx = code.indexOf("function TierCard(");
if (startIdx !== -1) {
  const nextFuncIdx = code.indexOf("function MilestoneCard(", startIdx);
  if (nextFuncIdx !== -1) {
    code = code.substring(0, startIdx) + code.substring(nextFuncIdx);
  }
}

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
