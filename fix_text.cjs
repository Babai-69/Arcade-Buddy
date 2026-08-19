const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

code = code.replace('✨ You have earned {milestoneBonus} Bonus Points!', '🎁 Includes +{milestoneBonus} facilitator bonus points');

fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
console.log("Fixed text");
