const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const oldColorFunc = /const getColorClass = \(count: number\) => \{\s*if \(count <= 1\) return 'bg-slate-200 dark:bg-slate-700';\s*if \(count <= 5\) return 'bg-sky-400';\s*if \(count <= 7\) return 'bg-blue-600';\s*return 'bg-green-500';\s*\};/;
code = code.replace(oldColorFunc, `const getColorClass = (count: number) => {
    if (count <= 1) return 'bg-slate-900 dark:bg-black';
    if (count <= 5) return 'bg-sky-400';
    if (count <= 7) return 'bg-blue-600';
    return 'bg-green-500';
  };`);

const oldLegend = `<div className="flex items-center justify-end gap-1 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">\n            LESS\n            <div className="w-3 h-3 rounded-sm bg-slate-200 ml-1"></div>`;
code = code.replace(oldLegend, `<div className="flex items-center justify-end gap-1 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">\n            LESS\n            <div className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-black ml-1"></div>`);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
