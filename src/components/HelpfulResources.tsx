import React from 'react';

export function HelpfulResources() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-24 mb-20 px-4">
      <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-10 text-left md:text-left ml-2 md:ml-4">
        Some motivation & helpful resources for you!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm mb-6 bg-[#0c40b8]">
            <img 
              src="https://d2yds90mtvelsl.cloudfront.net/original/3X/1/c/1c0aabd049d86361b2ca829e19f05108665af29a.gif" 
              alt="Prize counter timeline" 
              className="w-full h-full object-cover scale-[1.01]"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-[15px] leading-relaxed font-medium px-2">
            See the new Arcade Prize counter timeline <a href="https://discuss.google.dev/t/google-skills-arcade-2026-prize-counter-update/347189" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">here</a>.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm mb-6 bg-[#97e0b5]">
            <img 
              src="https://d2yds90mtvelsl.cloudfront.net/original/4X/1/f/c/1fcc37481bf9ff636fa48fcd0314773f4e87f0cc.gif" 
              alt="Arcade 2026 Tiers" 
              className="w-full h-full object-cover scale-[1.01]"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-[15px] leading-relaxed font-medium px-2">
            See the new <a href="https://discuss.google.dev/t/google-skills-arcade-2026-tiers/371066?u=yugali" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Google Skills Arcade 2026 Tiers</a>
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm mb-6 bg-[#4c84ff]">
            <img 
              src="https://services.google.com/fh/files/misc/gcaf-site-gcc.png" 
              alt="Google Developer Program Forums" 
              className="w-full h-full object-cover scale-[1.01]"
            />
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-sm md:text-[15px] leading-relaxed font-medium px-4">
            Join the <a href="https://discuss.google.dev/c/google-cloud/cloud-announcements/172?ascending=false&order=activity" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Google Developer Program Forums</a> to stay up-to-date.
          </p>
        </div>
      </div>
    </div>
  );
}
