const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

// 1. Add Users, Layers, Rocket to imports
if (!code.includes('Users')) {
  code = code.replace("import { ShieldAlert", "import { ShieldAlert, Users, Layers, Rocket");
}

// 2. Replace Section 1 heading
code = code.replace(
  '<h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-8">What is Google Cloud Arcade?</h2>',
  '<h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-8">How Arcade <span className="text-[#4285F4]">Works</span></h2>'
);

// 3. Replace Section 2 heading
code = code.replace(
  '<h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-8">Skills You Will Build</h2>',
  '<div className="text-[#34A853] text-xs font-bold tracking-widest mb-3 uppercase">Skill Tree</div>\n          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-8">Skills You Will <span className="text-[#4285F4]">Build</span></h2>'
);

// 4. Insert Stats Section between Section 1 and 2
const statsSection = `        {/* Stats Section */}
        <div className="w-full text-center mb-20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="glass-card bg-white dark:bg-[#0a0e17] p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm">
              <Users className="w-6 h-6 text-[#4285F4] mb-3" />
              <div className="text-4xl font-bold text-[#4285F4] mb-2 font-display">5,000+</div>
              <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase">Learners Helped</div>
            </div>
            <div className="glass-card bg-white dark:bg-[#0a0e17] p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm">
              <Layers className="w-6 h-6 text-[#4285F4] mb-3" />
              <div className="text-4xl font-bold text-[#4285F4] mb-2 font-display">100%</div>
              <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase">Free To Use</div>
            </div>
            <div className="glass-card bg-white dark:bg-[#0a0e17] p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm">
              <Rocket className="w-6 h-6 text-[#4285F4] mb-3" />
              <div className="text-4xl font-bold text-[#4285F4] mb-2 font-display">Solo</div>
              <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase">Built & Maintained</div>
            </div>
          </div>
        </div>

        {/* Section 2 */}`;

code = code.replace('{/* Section 2 */}', statsSection);

// 5. Replace Section 3 heading (since Section 1 is now "How Arcade Works")
code = code.replace(
  '<h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-8">How Arcade Works</h2>',
  '<h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-8">The <span className="text-[#4285F4]">Journey</span></h2>'
);

fs.writeFileSync('src/pages/AboutPage.tsx', code, 'utf8');
console.log("Patched AboutPage text styling");
