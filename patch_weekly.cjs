const fs = require('fs');
let content = fs.readFileSync('src/components/WeeklyProgress.tsx', 'utf8');

content = content.replace(
  /const dateStr = \(badge as any\)\._debugParsedDate \|\| badge\.earnedDate;/,
  `const dateStr = (badge as any)._debugParsedDate || badge.earnedDate.replace(/^Earned\\s+/i, '');`
);

fs.writeFileSync('src/components/WeeklyProgress.tsx', content);
