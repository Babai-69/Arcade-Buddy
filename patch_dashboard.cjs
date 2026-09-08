const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

// 1. Update "View Prizes" link to /swags
code = code.replace(
  '<button className="bg-white dark:bg-slate-700 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-bold py-1.5 px-4 rounded-md shadow-sm hover:bg-green-50 transition-colors">\n                View Prizes\n              </button>',
  '<a href="/swags" className="bg-white dark:bg-slate-700 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-bold py-1.5 px-4 rounded-md shadow-sm hover:bg-green-50 transition-colors inline-block">\n                View Prizes\n              </a>'
);

// 2. Update "How the 2026 Prize Tiers Work" link
code = code.replace(
  '<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md py-2 border border-yellow-200 dark:border-yellow-700/50 text-center cursor-pointer hover:bg-yellow-100 transition-colors">\n              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-500">How the 2026 Prize Tiers Work →</span>\n            </div>',
  '<a href="https://discuss.google.dev/t/google-skills-arcade-2026-tiers/371066" target="_blank" rel="noopener noreferrer" className="block bg-yellow-50 dark:bg-yellow-900/20 rounded-md py-2 border border-yellow-200 dark:border-yellow-700/50 text-center cursor-pointer hover:bg-yellow-100 transition-colors">\n              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-500">How the 2026 Prize Tiers Work →</span>\n            </a>'
);

// 3. Update Rank calculation
const rankCalcRegex = /let rank = '-';\n  if \(participants && participants\.length > 0\) {\n    const sorted = \[\.\.\.participants\]\.sort\(\(a, b\) => b\.totalPoints - a\.totalPoints\);\n    const myIndex = sorted\.findIndex\(p => p\.profileUrl === data\.profileUrl\);\n    if \(myIndex !== -1\) rank = `#\$\{myIndex \+ 1\}`;\n  }/m;

code = code.replace(rankCalcRegex, `let rank = '-';
  if (participants && participants.length > 0) {
    const sorted = [...participants].sort((a, b) => b.totalPoints - a.totalPoints);
    const extractId = (url) => {
      if (!url) return '';
      const match = url.match(/public_profiles\\/([a-zA-Z0-9-]+)/);
      return match ? match[1] : url.trim();
    };
    const myId = extractId(data.profileUrl);
    const myIndex = sorted.findIndex(p => extractId(p.profileUrl) === myId);
    if (myIndex !== -1) rank = \`#\${myIndex + 1}\`;
  }`);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
