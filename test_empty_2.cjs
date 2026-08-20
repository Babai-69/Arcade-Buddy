const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

code = code.replace(
  '<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700">',
  '<div className="relative bg-white dark:bg-slate-900 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-800 rounded-2xl">'
);

code = code.replace(
  '<div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 backdrop-blur dark:bg-slate-900/95 shrink-0">',
  '<div className="flex justify-between items-start px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">'
);

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Patched BadgeTracker styles");
