const fs = require('fs');
let code = fs.readFileSync('src/components/Milestones.tsx', 'utf8');

code = code.replace(
  'className="glass-card rounded-[2rem] p-6 relative overflow-hidden group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"',
  'className="glass-panel rounded-[2rem] p-8 relative overflow-hidden group border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"'
);

// Title of Swag Milestones
code = code.replace(
  '<h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900 dark:text-white">Swag Milestones</h2>',
  '<h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white tracking-tight">Swag Milestones</h2>'
);

fs.writeFileSync('src/components/Milestones.tsx', code, 'utf8');
console.log("Patched Milestones.tsx");
