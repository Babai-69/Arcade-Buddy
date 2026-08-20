const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

// I want to make sure it animates in correctly too using framer motion if possible, or at least has a good backdrop
code = code.replace(
  '<div className="relative bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl border border-white/20 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700">',
  '<div className="relative bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700 shadow-2xl">'
);

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Re-patched BadgeTracker modal root");
