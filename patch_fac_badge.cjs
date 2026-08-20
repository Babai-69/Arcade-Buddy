const fs = require('fs');
let code = fs.readFileSync('src/components/FacilitatorBadgeTracker.tsx', 'utf8');

code = code.replace(
  'className="relative bg-slate-50 dark:bg-slate-900 shadow-2xl w-full max-w-xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 z-50"',
  'className="relative bg-slate-50 dark:bg-slate-900 shadow-2xl w-full max-w-xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 z-50 ml-auto"'
);

fs.writeFileSync('src/components/FacilitatorBadgeTracker.tsx', code, 'utf8');
console.log("Patched FacilitatorBadgeTracker");
