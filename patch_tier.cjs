const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const regex = /\{\/\* Tier Progress Card \*\/\}([\s\S]*?)<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/;

const newBlock = `{/* Tier Progress Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                          Swags Tier Progress <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex bg-gray-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-gray-200 dark:border-slate-700">
                            <button
                              onClick={() => setIsRegistered(true)}
                              className={\`px-5 py-2 text-sm rounded-full transition-all \${isRegistered ? 'bg-white dark:bg-slate-600 shadow-md text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium bg-transparent'}\`}
                            >
                              Registered
                            </button>
                            <button
                              onClick={() => setIsRegistered(false)}
                              className={\`px-5 py-2 text-sm rounded-full transition-all \${!isRegistered ? 'bg-white dark:bg-slate-600 shadow-md text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium bg-transparent'}\`}
                            >
                              Not Registered
                            </button>
                          </div>
                        </div>
                      </div>

                      {isRegistered && milestoneBonus > 0 && (
                        <div className="mb-10 relative overflow-hidden bg-[#F0FDF4] dark:bg-green-900/20 border border-[#86EFAC] dark:border-green-800 rounded-full px-4 py-3.5 flex items-center justify-center text-[#15803D] dark:text-green-400 font-bold text-sm shadow-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          <span className="mr-2 text-lg">🎁</span> Includes +{milestoneBonus} facilitator bonus points
                        </div>
                      )}

                      <div className="mt-8 relative pt-4 pb-4">
                        <div className="hidden sm:block absolute top-[38px] left-8 right-8 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative rounded-full" 
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
                             {/* The glowing tip */}
                             {totalPoints > 0 && totalPoints < MILESTONES[3].requiredPoints && (
                               <div 
                                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white border-[4px] rounded-full z-20 animate-pulse" 
                                  style={{ borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853', boxShadow: \`0 0 15px \${currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853'}\` }}
                               ></div>
                             )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                          {MILESTONES.map((milestone, idx) => {
                            const isComplete = totalPoints >= milestone.requiredPoints;
                            const isCurrent = currentTierObj && currentTierObj.id === milestone.id;
                            const isNext = nextTierObj && nextTierObj.id === milestone.id;
                            const color = milestone.colorClass.replace('bg-[', '').replace(']', '');
                            
                            let circleClass = 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400';
                            let circleStyle: any = {};
                            
                            if (isComplete) {
                              circleClass = 'text-white border-transparent';
                              circleStyle = { backgroundColor: color };
                            } else if (isNext) {
                              circleClass = 'bg-white dark:bg-slate-800 border-[3px] bg-clip-padding';
                              circleStyle = { borderColor: color, color: color };
                            } else {
                              circleClass = 'bg-white dark:bg-slate-800 border-[3px] border-gray-200 dark:border-slate-700 text-gray-400';
                            }

                            return (
                              <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white/0 text-left sm:text-center z-10 sm:px-2">
                                <div 
                                  className={\`w-14 h-14 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 transition-all \${circleClass}\`} 
                                  style={{...circleStyle, ...(isCurrent ? { boxShadow: \`0 0 35px 8px \${color}60\` } : {})}}
                                >
                                  {isComplete ? (
                                    <Check className="w-7 h-7 stroke-[3]" />
                                  ) : isNext ? (
                                    <ChevronRight className="w-7 h-7 stroke-[3]" />
                                  ) : (
                                    <Lock className="w-5 h-5 opacity-40" />
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                                    {milestone.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                                    {milestone.requiredPoints} pts
                                  </div>
                                  
                                  <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                                    {spotsLoading ? (
                                       <span className="animate-pulse">— / — spots left</span>
                                    ) : (
                                       <span>{spots[milestone.name.toLowerCase()].spotsLeft.toLocaleString()} / {spots[milestone.name.toLowerCase()].total.toLocaleString()} spots left</span>
                                    )}
                                  </div>
                                  
                                  <div className="mt-2 h-5">
                                    {isCurrent ? (
                                      <div className="text-sm font-bold" style={{ color: color }}>Current Tier</div>
                                    ) : isNext ? (
                                      <div className="text-sm font-bold" style={{ color: color }}>{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                    ) : !isComplete ? (
                                      <div className="text-sm font-bold text-gray-400 dark:text-slate-500">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">`;

const oldMatch = code.match(regex);
if(oldMatch) {
    code = code.replace(oldMatch[0], newBlock);
    fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
    console.log("Success replacing");
} else {
    console.log("Failed to match regex");
}
