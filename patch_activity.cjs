const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const stateRegex = /const \[currentDate, setCurrentDate\] = useState\(new Date\(2026, 8, 1\)\); \/\/ September 2026/;
code = code.replace(stateRegex, `const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDay, setSelectedDay] = useState<{day: number, count: number, dateStr: string} | null>(null);

  const handleBoxClick = (day: number, count: number) => {
    const dateStr = \`\${monthNames[currentDate.getMonth()]} \${day}, \${currentDate.getFullYear()}\`;
    setSelectedDay({ day, count, dateStr });
  };`);

const gridMapRegex = /<div className="grid grid-cols-7 gap-1\.5 w-\[200px\]">\s*\{grid\.map\(\(count, i\) => \(\s*<div\s*key=\{i\}\s*className=\{`w-5 h-5 rounded-sm \$\{count === null \? 'opacity-0' : getColorClass\(count\)\} \$\{count !== null && count > 0 \? 'border border-black\/10' : ''\}`\}\s*title=\{count !== null \? `\$\{count\} badges` : undefined\}\s*\/>\s*\)\)\}\s*<\/div>/;

code = code.replace(gridMapRegex, `<div className="grid grid-cols-7 gap-1.5 w-[200px]">
            {grid.map((count, i) => {
              const day = i - firstDay + 1;
              return (
              <div 
                key={i} 
                onClick={() => count !== null && handleBoxClick(day, count)}
                className={\`w-5 h-5 rounded-sm \${count === null ? 'opacity-0' : getColorClass(count)} \${count !== null ? 'cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all' : ''} \${count !== null && count > 0 ? 'border border-black/10' : ''}\`}
                title={count !== null ? \`\${count} badges\` : undefined}
              />
            )})}
          </div>`);

// Insert the selectedDay display
const moreLessRegex = /<div className="flex items-center justify-end gap-1 mt-3 text-\[9px\] font-bold text-slate-400 uppercase tracking-wider">\s*LESS/;
code = code.replace(moreLessRegex, `
          <div className="min-h-[20px] mt-2 text-xs text-center text-slate-600 dark:text-slate-300 font-medium">
            {selectedDay ? (
              <span><span className="font-bold text-slate-900 dark:text-white">\${selectedDay.count} badges</span> on \${selectedDay.dateStr}</span>
            ) : (
              <span className="text-slate-400 italic">Click a day to see details</span>
            )}
          </div>
          <div className="flex items-center justify-end gap-1 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            LESS`);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
