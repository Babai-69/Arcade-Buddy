const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `LESS
            <div className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-black ml-1"></div>`;
const replacementStr = `LESS
            <div className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-black ml-1"></div>
            <div className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700"></div>`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/DashboardPage.tsx', code);
