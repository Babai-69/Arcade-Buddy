const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

code = code.replace(/bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700/g, "bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50");

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Patched inner boxes");
