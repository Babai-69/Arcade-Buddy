const fs = require('fs');
let code = fs.readFileSync('src/components/ProgramInformation.tsx', 'utf8');

// Header
code = code.replace(
  '<div className="text-center mb-8">',
  '<div className="text-center mb-12">'
);
code = code.replace(
  '<h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Google Cloud Arcade 2026 Program Information</h2>',
  '<h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Google Cloud Arcade 2026 Program Information</h2>'
);

// Box 1: What's Changing
code = code.replace(
  '<div className="bg-white dark:bg-slate-900 border border-[#b2dbfb] dark:border-blue-900/50 rounded-2xl p-6 md:p-8 shadow-sm">',
  '<div className="glass-panel rounded-[2rem] p-6 md:p-10 shadow-xl border border-blue-100 dark:border-blue-900/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">\n        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors duration-500" />'
);
code = code.replace(
  '<h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">',
  '<h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400"><Info className="w-4 h-4" /></div> '
);
code = code.replace('What\'s Changing in the Arcade</h3>', 'What\'s Changing in the Arcade</h3>');

// Box 2: Important Dates
code = code.replace(
  '<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">',
  '<div className="glass-panel rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">\n          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/10 transition-colors duration-500" />'
);

code = code.replace(
  '<div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mt-6">',
  '<div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 mt-6 shadow-inner">'
);

// Box 3: Points System
code = code.replace(
  '<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">',
  '<div className="glass-panel rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">\n          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 group-hover:bg-green-500/10 transition-colors duration-500" />'
);

code = code.replace(
  '<h3 className="text-lg font-bold font-display text-slate-900 dark:text-white text-center mb-6">Arcade Points System</h3>',
  '<h3 className="text-xl font-bold font-display text-slate-900 dark:text-white text-center mb-6">Arcade Points System</h3>'
);

// PointRow updates
code = code.replace(
  '<div className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">',
  '<div className="flex items-center justify-between p-3.5 bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all shadow-sm hover:shadow-md hover:scale-[1.02]">'
);

fs.writeFileSync('src/components/ProgramInformation.tsx', code, 'utf8');
console.log("Patched ProgramInformation.tsx");
