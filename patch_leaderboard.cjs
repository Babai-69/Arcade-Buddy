const fs = require('fs');
let code = fs.readFileSync('src/pages/LeaderboardPage.tsx', 'utf8');

code = code.replace('<div className="space-y-4 pt-24 pb-20 px-4">', 
`<div className="min-h-screen relative overflow-hidden font-sans flex flex-col pt-24 pb-20 px-4">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-16">`);
code = code.replace('    </div>', '      </div>\n    </div>');

fs.writeFileSync('src/pages/LeaderboardPage.tsx', code, 'utf8');
