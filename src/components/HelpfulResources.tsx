import React from 'react';

export function HelpfulResources() {
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-32 mb-24 px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[300px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-12 text-center tracking-tight">
        Helpful Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="glass-panel rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-sm mb-8 bg-[#0c40b8] relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <img 
               src="https://d2yds90mtvelsl.cloudfront.net/original/3X/1/c/1c0aabd049d86361b2ca829e19f05108665af29a.gif" 
               alt="Prize counter timeline" 
               className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium px-2">
            See the new Arcade Prize counter timeline <a href="https://discuss.google.dev/t/google-skills-arcade-2026-prize-counter-update/347189" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors hover:text-blue-700 dark:hover:text-blue-300">here</a>.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="glass-panel rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-sm mb-8 bg-[#97e0b5] relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <img 
               src="https://d2yds90mtvelsl.cloudfront.net/original/4X/1/f/c/1fcc37481bf9ff636fa48fcd0314773f4e87f0cc.gif" 
               alt="Arcade 2026 Tiers" 
               className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium px-2">
            See the new <a href="https://discuss.google.dev/t/google-skills-arcade-2026-tiers/371066?u=yugali" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors hover:text-blue-700 dark:hover:text-blue-300">Google Skills Arcade 2026 Tiers</a>
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-sm mb-8 bg-[#4c84ff] relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <img 
               src="https://services.google.com/fh/files/misc/gcaf-site-gcc.png" 
               alt="Google Developer Program Forums" 
               className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium px-4">
            Join the <a href="https://discuss.google.dev/c/google-cloud/cloud-announcements/172?ascending=false&order=activity" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors hover:text-blue-700 dark:hover:text-blue-300">Google Developer Program Forums</a> to stay up-to-date.
          </p>
        </div>
      </div>
    </div>
  );
}
