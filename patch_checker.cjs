const fs = require('fs');

let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

// Header
code = code.replace(
  'className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"',
  'className="py-10 w-full mx-auto px-0"'
);

// Container 1
code = code.replace(
  'className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2a2a2a] rounded-[24px] p-6 sm:p-8 max-w-3xl mx-auto relative overflow-hidden shadow-sm dark:shadow-none mb-10"',
  'className="bg-white/50 dark:bg-[#111111]/50 backdrop-blur-md border border-slate-200/50 dark:border-[#2a2a2a]/50 rounded-[24px] p-6 sm:p-8 max-w-3xl mx-auto relative overflow-hidden shadow-xl mb-10"'
);

// Result Container
code = code.replace(
  'className="mx-auto max-w-5xl text-left bg-[#f3f4f6] dark:bg-slate-800/50 p-4 sm:p-8 rounded-[24px] mt-8"',
  'className="mx-auto max-w-5xl text-left bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl p-4 sm:p-8 rounded-[24px] mt-8 shadow-2xl border border-white/20 dark:border-white/10"'
);

// Form Input
code = code.replace(
  'className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#555] transition-colors"',
  'className="w-full bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-inner"'
);

// View Progress Button
code = code.replace(
  'className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B6CF9] to-[#8B5CF6] hover:from-[#4A5CE9] hover:to-[#7A4BE6] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto"',
  'className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#5B6CF9] to-[#8B5CF6] hover:from-[#4A5CE9] hover:to-[#7A4BE6] text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(91,108,249,0.4)] hover:shadow-[0_0_30px_rgba(91,108,249,0.6)] transform hover:-translate-y-1 w-full sm:w-auto text-lg"'
);

fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
