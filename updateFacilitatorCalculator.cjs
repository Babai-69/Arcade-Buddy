const fs = require('fs');
let content = fs.readFileSync('src/components/FacilitatorCalculator.tsx', 'utf8');

const originalSection = `              {/* Section 6: All Milestones Overview */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Milestones Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { n: "Milestone 1", g: 6, s: 18, b: 5 },
                    { n: "Milestone 2", g: 8, s: 34, b: 15 },
                    { n: "Milestone 3", g: 10, s: 50, b: 25 },
                    { n: "Ultimate", g: 12, s: 66, b: 35 }
                  ].map((m, idx) => {
                    const isReached = data.gameBadges >= m.g && data.skillBadges >= m.s;
                    return (
                      <div key={idx} className={\`rounded-xl p-4 border \${isReached ? 'bg-[#34A853]/5 dark:bg-[#34A853]/10 border-[#34A853]/30' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}\`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={\`font-bold \${isReached ? 'text-[#34A853]' : 'text-slate-900 dark:text-white'}\`}>{m.n}</h4>
                          {isReached ? <CheckCircle2 className="w-5 h-5 text-[#34A853]" /> : <Lock className="w-4 h-4 text-slate-400" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          {m.g} Games + {m.s} Skills
                        </p>
                        <div className={\`text-sm font-bold \${isReached ? 'text-[#34A853]' : 'text-slate-400'}\`}>
                          +{m.b} Bonus Pts
                        </div>
                        {!isReached && (
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50 text-xs text-slate-500">
                            Need {Math.max(0, m.g - data.gameBadges)}G, {Math.max(0, m.s - data.skillBadges)}S
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>`;

const newSection = `              {/* Section 6: All Milestones Overview */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Milestones Overview</h3>
                
                {(() => {
                  const milestones = [
                    { n: "Milestone 1", g: 6, s: 18, b: 5 },
                    { n: "Milestone 2", g: 8, s: 34, b: 15 },
                    { n: "Milestone 3", g: 10, s: 50, b: 25 },
                    { n: "Ultimate", g: 12, s: 66, b: 35 }
                  ];

                  let currentTargetIndex = milestones.findIndex(m => data.gameBadges < m.g || data.skillBadges < m.s);
                  if (currentTargetIndex === -1) currentTargetIndex = 3; // All reached
                  const target = milestones[currentTargetIndex];
                  
                  return (
                    <div className="flex flex-col gap-10">
                      {/* Stepper */}
                      <div className="relative flex justify-between items-start w-full px-2 sm:px-6">
                        {/* Connecting Line background */}
                        <div className="absolute top-[22px] left-8 right-8 h-1.5 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
                        
                        {/* Connecting Line active */}
                        <div className="absolute top-[22px] left-8 h-1.5 bg-[#22c55e] -z-10 rounded-full transition-all duration-500" style={{ width: \`calc(\${(currentTargetIndex / 4) * 100}% - 16px)\` }}></div>
                        
                        {/* Start Step */}
                        <div className="flex flex-col items-center">
                          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#22c55e] text-white shadow-lg shadow-green-500/30 border-4 border-white dark:border-slate-900 z-10">
                            <Star className="w-5 h-5 fill-current" />
                          </div>
                          <div className="mt-3 text-center">
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Start</div>
                            <div className="text-xs text-slate-500">0 pts</div>
                          </div>
                        </div>

                        {milestones.map((m, idx) => {
                          const isReached = data.gameBadges >= m.g && data.skillBadges >= m.s;
                          const isCurrent = idx === currentTargetIndex && !isReached;
                          
                          return (
                            <div key={idx} className="flex flex-col items-center relative">
                              <div className={\`w-11 h-11 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 z-10 transition-colors shadow-sm \${
                                isReached 
                                  ? 'bg-[#22c55e] text-white' 
                                  : isCurrent
                                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900'
                                    : 'bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-500'
                              }\`}>
                                {isReached ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Target className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                              </div>
                              <div className="mt-3 text-center w-24">
                                <div className={\`text-sm font-bold \${isCurrent ? 'text-blue-600 dark:text-blue-400' : isReached ? 'text-slate-900 dark:text-white' : 'text-slate-500'}\`}>{m.n}</div>
                                <div className={\`text-xs \${isReached ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}\`}>+\${m.b} pts</div>
                                {isCurrent && <div className="text-[10px] text-blue-500 font-medium mt-1">Next Target</div>}
                                {!isReached && !isCurrent && <div className="text-[10px] text-slate-400 mt-1">Locked</div>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Current Target Card */}
                      <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{target.n} Requirements</h4>
                              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                Current Target 🎯
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm">Requires completing the following badges</p>
                          </div>
                          <div className="bg-blue-100/70 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 font-bold px-4 py-2 rounded-lg text-sm shrink-0">
                            +\${target.b} pts
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-bold text-slate-900 dark:text-white">Game Badges</span>
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.min(data.gameBadges, target.g)} / {target.g}</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: \`\${Math.min(100, (data.gameBadges / target.g) * 100)}%\` }}></div>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-bold text-slate-900 dark:text-white">Skill Badges</span>
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.min(data.skillBadges, target.s)} / {target.s}</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: \`\${Math.min(100, (data.skillBadges / target.s) * 100)}%\` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>`;

if (content.includes(originalSection)) {
  content = content.replace(originalSection, newSection);
} else {
  console.log("Could not find original section to replace");
}

fs.writeFileSync('src/components/FacilitatorCalculator.tsx', content);
