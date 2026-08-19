const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const startIndex = code.indexOf('<div className="mt-8 relative pt-4 pb-4">');
const endIndexStr = '</div>\n                    </motion.div>\n\n                    {/* BOTTOM ROW */}';
const endIndex = code.indexOf(endIndexStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Bounds not found");
    process.exit(1);
}

const replacement = `<div className="mt-8 relative pt-4 pb-4">
                        <div className="hidden sm:block absolute top-[36px] left-8 right-8 h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-1000 ease-out relative" 
                            style={{ 
                              width: \`\${(() => {
                                const m = MILESTONES;
                                if (totalPoints <= m[0].requiredPoints) return (totalPoints / m[0].requiredPoints) * 12.5;
                                else if (totalPoints <= m[1].requiredPoints) return 12.5 + ((totalPoints - m[0].requiredPoints) / (m[1].requiredPoints - m[0].requiredPoints)) * 25;
                                else if (totalPoints <= m[2].requiredPoints) return 37.5 + ((totalPoints - m[1].requiredPoints) / (m[2].requiredPoints - m[1].requiredPoints)) * 25;
                                else if (totalPoints <= m[3].requiredPoints) return 62.5 + ((totalPoints - m[2].requiredPoints) / (m[3].requiredPoints - m[2].requiredPoints)) * 25;
                                else return Math.min(100, 87.5 + ((totalPoints - m[3].requiredPoints) / 30) * 12.5);
                              })()}%\`
                            }}
                          >
                             <div className="w-full h-full relative overflow-hidden rounded-full">
                               <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 opacity-50 blur-[2px] animate-pulse"></div>
                             </div>
                             {/* The glowing tip */}
                             {totalPoints > 0 && totalPoints < MILESTONES[3].requiredPoints && (
                               <div 
                                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-[3px] rounded-full shadow-[0_0_12px_rgba(52,168,83,0.8)] z-20" 
                                  style={{ borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853', boxShadow: \`0 0 12px \${currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853'}\` }}
                               ></div>
                             )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                          {MILESTONES.map((milestone, idx) => {
                            const isComplete = totalPoints >= milestone.requiredPoints;
                            const isCurrent = currentTierObj && currentTierObj.id === milestone.id;
                            const isNext = nextTierObj && nextTierObj.id === milestone.id;
                            
                            let circleClass = 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400';
                            let circleStyle: any = {};
                            
                            if (isComplete) {
                              circleClass = 'text-white border-transparent shadow-[0_0_15px_rgba(0,0,0,0.2)]';
                              circleStyle = { backgroundColor: milestone.colorClass.replace('bg-[', '').replace(']', '') };
                            } else if (isNext) {
                              const color = milestone.colorClass.replace('bg-[', '').replace(']', '');
                              circleClass = 'bg-white dark:bg-slate-800 border-[2.5px] bg-clip-padding';
                              circleStyle = { borderColor: color, color: color };
                            } else {
                              circleClass = 'bg-white dark:bg-slate-800 border-[2.5px] border-gray-300 dark:border-slate-600 text-gray-400';
                            }
                            
                            const tierColor = milestone.colorClass.replace('bg-[', '').replace(']', '');

                            return (
                              <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white/0 text-left sm:text-center z-10 sm:px-2">
                                <div className={\`w-14 h-14 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 shadow-lg \${circleClass} \${isCurrent ? 'ring-4 ring-offset-2 dark:ring-offset-slate-900 animate-pulse' : ''}\`} style={{...circleStyle, ...(isCurrent ? { '--tw-ring-color': tierColor + '80' } : {})}}>
                                  {isComplete ? (
                                    <Check className="w-6 h-6 stroke-[3]" />
                                  ) : isNext ? (
                                    <ChevronRight className="w-6 h-6 stroke-[3]" />
                                  ) : (
                                    <Lock className="w-5 h-5 opacity-50" />
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className={\`font-bold text-lg \${isComplete ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}\`}>
                                    {milestone.name}
                                  </div>
                                  <div className="text-sm font-semibold text-[#6b7280] dark:text-slate-400 mt-1">
                                    {milestone.requiredPoints} pts
                                  </div>
                                  
                                  <div className="text-xs bg-gray-100/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg px-2 py-1 inline-block mt-2 text-gray-600 dark:text-slate-300 font-medium border border-gray-200/50 dark:border-slate-600/50 shadow-sm">
                                    {spotsLoading ? (
                                       <span className="animate-pulse opacity-50">— / — spots left</span>
                                    ) : (
                                       <span>{spots[milestone.name.toLowerCase()].spotsLeft.toLocaleString()} / {spots[milestone.name.toLowerCase()].total.toLocaleString()} left</span>
                                    )}
                                  </div>
                                  
                                  {isCurrent ? (
                                    <div className="text-xs font-bold mt-2 px-2 py-1 rounded-md inline-block" style={{ color: tierColor }}>Current Tier</div>
                                  ) : isNext ? (
                                    <div className="text-xs font-bold mt-2 px-2 py-1 rounded-md inline-block" style={{ color: tierColor }}>{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                  ) : !isComplete ? (
                                    <div className="text-xs font-medium text-gray-400 dark:text-slate-500 mt-2">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>`;

code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
console.log("Success");
