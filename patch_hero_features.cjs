const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldFeatures = `className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-8"
        >
          {[
            { icon: Cloud, color: 'text-[#4285F4]', bg: 'bg-[#4285F4]/10', title: 'Learn Cloud Tech', desc: 'Complete hands-on labs and skill badges on Cloud Skills Boost.' },
            { icon: Sparkles, color: 'text-[#FBBC05]', bg: 'bg-[#FBBC05]/10', title: 'Earn Points', desc: 'Every badge earns you Arcade Points. Climb the leaderboard daily.' },
            { icon: Award, color: 'text-[#34A853]', bg: 'bg-[#34A853]/10', title: 'Unlock Swag', desc: 'Reach milestones to claim exclusive Google Cloud merchandise.' }
          ].map((feature, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl text-left border border-white/50 dark:border-slate-800 backdrop-blur-xl">
              <div className={\`w-12 h-12 rounded-2xl \${feature.bg} flex items-center justify-center mb-4\`}>
                <feature.icon className={\`h-6 w-6 \${feature.color}\`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}`;

const newFeatures = `className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-12"
        >
          {[
            { icon: Cloud, color: 'text-[#4285F4]', bg: 'bg-[#4285F4]/10', title: 'Learn Cloud Tech', desc: 'Complete hands-on labs and skill badges on Cloud Skills Boost.' },
            { icon: Sparkles, color: 'text-[#FBBC05]', bg: 'bg-[#FBBC05]/10', title: 'Earn Points', desc: 'Every badge earns you Arcade Points. Climb the leaderboard daily.' },
            { icon: Award, color: 'text-[#34A853]', bg: 'bg-[#34A853]/10', title: 'Unlock Swag', desc: 'Reach milestones to claim exclusive Google Cloud merchandise.' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-[#161b22] p-8 rounded-[2rem] text-center border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className={\`absolute top-0 right-0 w-24 h-24 \${feature.bg} rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500 opacity-50\`}></div>
              <div className="flex justify-center mb-6">
                <div className={\`w-14 h-14 rounded-2xl \${feature.bg} flex items-center justify-center\`}>
                  <feature.icon className={\`h-7 w-7 \${feature.color}\`} />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{feature.desc}</p>
            </div>
          ))}`;

code = code.replace(oldFeatures, newFeatures);
fs.writeFileSync('src/components/Hero.tsx', code);
