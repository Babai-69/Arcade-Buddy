const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldEndedBox = `{timerState === 'ended' && (
            <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-8">
              <div className="flex items-center gap-2 justify-center">
                <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <h4 className="font-bold font-display text-slate-800 dark:text-slate-200">
                  Facilitator Program has ended.
                </h4>
              </div>
            </div>
          )}`;

const newEndedBox = `{timerState === 'ended' && (
            <div className="max-w-3xl mx-auto rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 shadow-xl mb-12 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[22px] p-8 md:p-12 flex flex-col items-center justify-center relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/10 rounded-full flex items-center justify-center mb-6 border border-amber-200 dark:border-amber-800/50 shadow-inner">
                   <Award className="w-10 h-10 text-amber-500 drop-shadow-sm" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-4 tracking-tight">
                  Season 2026 Concluded
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
                  The Google Cloud Arcade Facilitator Program 2026 has officially ended. Thank you to all participants for an incredible season of cloud learning!
                </p>
              </div>
            </div>
          )}`;

code = code.replace(oldEndedBox, newEndedBox);
fs.writeFileSync('src/components/Hero.tsx', code);
