const fs = require('fs');
let code = fs.readFileSync('src/components/Milestones.tsx', 'utf8');

const oldHeader = `<div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white tracking-tight">Swag Milestones</h2>
            <p className="text-slate-700 dark:text-slate-300">Track your progress and unlock exclusive rewards.</p>
          </div>
        </div>`;

const newHeader = `<div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-slate-900 dark:text-white tracking-tight">Swag Milestones</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">Track your progress and unlock exclusive rewards as you conquer Arcade challenges.</p>
          </div>
        </div>`;

code = code.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/Milestones.tsx', code);
