const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

code = code.replace(
  '<button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400"><ChevronLeft className="w-4 h-4" /></button>',
  '<button onClick={goToPrevMonth} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>'
);

code = code.replace(
  '<button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400"><ChevronRight className="w-4 h-4" /></button>',
  '<button onClick={goToNextMonth} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>'
);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
