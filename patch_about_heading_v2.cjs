const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

const oldHeader = `<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            About the <span className="text-[#7C3AED] dark:text-[#a78bfa]">Arcade</span> <span className="bg-[#FBBC04] text-slate-900 px-3 py-1.5 rounded-lg shadow-sm inline-block transform -rotate-1 mt-1">Buddy Platform</span>
          </h1>`;

const newHeader = `<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            About the <br/>
            <span className="bg-[#FBBC04] text-slate-900 px-3 py-1.5 rounded-lg shadow-sm inline-block transform -rotate-1 mt-1">Arcade Buddy</span> <span className="text-[#7C3AED] dark:text-[#a78bfa]">Platform</span>
          </h1>`;

code = code.replace(oldHeader, newHeader);
fs.writeFileSync('src/pages/AboutPage.tsx', code);
