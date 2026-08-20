const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

code = code.replace(
  '<div className="relative bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl border border-white/20 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700">',
  '<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700">'
);

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Patched modal back");
