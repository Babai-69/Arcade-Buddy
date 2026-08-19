const fs = require('fs');

let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const startIndex = code.indexOf('{result && (');
const endIndex = code.indexOf('<BadgeTracker');

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find bounds");
  process.exit(1);
}

// Back up to the closing `)}` before `<BadgeTracker`
let lastBraceIndex = code.lastIndexOf(')}', endIndex);

const part1 = code.substring(0, startIndex);
const part2 = code.substring(lastBraceIndex + 2); // after `)}`

// We also need to add a small animated number component inside ProfileChecker or outside it.
// And 4 floating orbs for the background.
// Let's add them.

const newResultBlock = `{result && (
          <div className="relative">
            {/* 4 Floating Blurred Gradient Orbs */}
            <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
              <motion.div 
                animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, -40, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute top-[20%] right-[0%] w-[350px] h-[350px] rounded-full bg-green-500/15 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }} 
                transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute bottom-[0%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.4, 1] }} 
                transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 3 }}
                className="absolute -bottom-[10%] -right-[10%] w-[450px] h-[450px] rounded-full bg-orange-500/15 blur-[120px]"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="mx-auto max-w-5xl text-left relative z-10"
            >
              {(() => {
                const isBeforeStart = new Date() < new Date('2026-07-13T00:00:00Z');
                const isAfterEnd = new Date() > new Date('2026-09-14T18:29:00Z');
                const basePoints = isBeforeStart ? 0 : result.arcadePoints;
                const displaySkillBadges = isBeforeStart ? 0 : result.skillBadges;
                const displayGameBadges = isBeforeStart ? 0 : result.gameBadges;
                
                let programGameBadges = 0;
                let programSkillBadges = 0;
                
                if (result.id === 'demo') {
                  programGameBadges = 8;
                  programSkillBadges = 34;
                } else if (result.badges && !isBeforeStart) {
                  result.badges.forEach(b => {
                    if (b.validForProgram) {
                      if (b.category === 'Game') programGameBadges++;
                      if (b.category === 'Skill') programSkillBadges++;
                    }
                  });
                }

                let milestoneBonus = 0;
                if (programGameBadges >= 12 && programSkillBadges >= 66) milestoneBonus = 35;
                else if (programGameBadges >= 10 && programSkillBadges >= 50) milestoneBonus = 25;
                else if (programGameBadges >= 8 && programSkillBadges >= 34) milestoneBonus = 15;
                else if (programGameBadges >= 6 && programSkillBadges >= 18) milestoneBonus = 5;

                const totalBonus = isRegistered ? milestoneBonus : 0;
                const totalPoints = basePoints + totalBonus;

                const currentTierObj = [...MILESTONES].reverse().find(m => totalPoints >= m.requiredPoints);
                const currentTierName = currentTierObj ? currentTierObj.name : "No Tier";
                const nextTierObj = MILESTONES.find(m => totalPoints < m.requiredPoints);
                const nextGoal = nextTierObj 
                  ? \`Earn \${nextTierObj.requiredPoints - totalPoints} more points to reach \${nextTierObj.name}.\`
                  : "Max Tier Reached.";

                const avatarInitials = result.name.substring(0, 2).toUpperCase();

                // Generate confetti once on render if totalPoints > 0
                React.useEffect(() => {
                   if(totalPoints > 0) {
                     setTimeout(() => {
                       confetti({
                         particleCount: 100,
                         spread: 70,
                         origin: { y: 0.6 },
                         colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8B7CFA']
                       });
                     }, 1500); // Trigger after count up finishes
                   }
                }, [totalPoints]);

                // Count-up hook
                const AnimatedPoints = ({ endVal }) => {
                  const [val, setVal] = React.useState(0);
                  React.useEffect(() => {
                    let startTime;
                    const duration = 1500;
                    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
                    
                    const step = (timestamp) => {
                      if (!startTime) startTime = timestamp;
                      const progress = Math.min((timestamp - startTime) / duration, 1);
                      setVal(Math.floor(easeOutCubic(progress) * endVal));
                      if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                  }, [endVal]);
                  return <>{val}</>;
                };

                return (
                  <div className="flex flex-col gap-8 pb-10">
                    {/* Centered pill CTA button */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="flex justify-center mb-2"
                    >
                      <Link 
                        to="/my-progress" 
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,124,250,0.4)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5B6CF9] via-[#8B5CF6] to-[#5B6CF9] bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] group-hover:opacity-90"></div>
                        <span className="relative z-10 drop-shadow-md">View Detailed Progress & Share Card</span>
                        <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>

                    {/* TOP ROW: Profile & Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Profile Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1"
                      >
                        <div className="flex flex-col h-full justify-between gap-6">
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-50 blur-[8px] animate-pulse"></div>
                                  {result.avatarUrl ? (
                                    <img src={result.avatarUrl} alt="Avatar" className="relative w-16 h-16 rounded-full object-cover border-2 border-white/50" />
                                  ) : (
                                    <div className="relative w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white/50 flex items-center justify-center text-[#2563eb] dark:text-blue-400 font-bold text-xl">
                                      {avatarInitials}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white leading-tight">{result.name}</h3>
                                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.1)] border bg-white/50 dark:bg-black/20" style={{ 
                                    color: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280',
                                    borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#d1d5db',
                                  }}>
                                    <span className="relative flex h-2 w-2 mr-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280' }}></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280' }}></span>
                                    </span>
                                    {currentTierName}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={handleCheck}
                                disabled={isLoading}
                                className="p-2 rounded-full text-gray-400 hover:text-blue-500 bg-white/40 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all"
                                title="Refresh Progress"
                              >
                                <RefreshCw className={\`w-5 h-5 \${isLoading ? 'animate-spin text-blue-500' : ''}\`} />
                              </button>
                            </div>
                            <p className="text-[#6b7280] dark:text-slate-400 text-sm">Member since {new Date().getFullYear()}</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                              View Profile
                            </a>
                            <button 
                              onClick={() => setIsFacilitatorBadgeTrackerOpen(true)}
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-amber-400/50 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all shadow-sm"
                            >
                              🗓️ Badge Tracker
                            </button>
                            <Link 
                              to="/roadmap"
                              state={{ participant: result }}
                              className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm font-bold text-white transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                              <span className="relative z-10">🚀 Your Personalised Roadmap</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>

                      {/* Points Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-center items-center relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] -ml-10 -mb-10"></div>
                        
                        <p className="text-gray-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Total Points</p>
                        <h2 className="text-6xl md:text-7xl font-extrabold mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 animate-[gradient_4s_ease-in-out_infinite]">
                          <AnimatedPoints endVal={totalPoints} />
                        </h2>
                        
                        {isBeforeStart ? (
                          <p className="text-[#EA4335] font-bold text-sm relative z-10 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">Program Not Started</p>
                        ) : isAfterEnd ? (
                          <div className="flex flex-col items-center relative z-10">
                            <p className="text-[#4285F4] font-bold text-sm mb-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Program has Ended</p>
                            <p className="text-sm font-medium bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
                              <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                              <span className={totalBonus > 0 ? 'text-[#34A853] dark:text-green-400 font-bold' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 relative z-10">
                            <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                            <span className={totalBonus > 0 ? 'text-[#34A853] dark:text-green-400 font-bold' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Tier Progress Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                          🏆 Swags Tier Progress
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Facilitator Program</span>
                          <div className="flex bg-gray-200/50 dark:bg-slate-700/50 p-1 rounded-xl border border-gray-300/50 dark:border-slate-600/50">
                            <button
                              onClick={() => setIsRegistered(true)}
                              className={\`px-4 py-1.5 text-sm rounded-lg transition-all \${isRegistered ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}\`}
                            >
                              Registered
                            </button>
                            <button
                              onClick={() => setIsRegistered(false)}
                              className={\`px-4 py-1.5 text-sm rounded-lg transition-all \${!isRegistered ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}\`}
                            >
                              Not
                            </button>
                          </div>
                        </div>
                      </div>

                      {isRegistered && milestoneBonus > 0 && (
                        <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-green-500/10 via-green-400/20 to-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-sm shadow-inner">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          ✨ You have earned {milestoneBonus} Bonus Points!
                        </div>
                      )}

                      <div className="mt-8 relative pt-4 pb-4">
                        <div className="hidden sm:block absolute top-[36px] left-8 right-8 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-1000 ease-out" 
                            style={{ 
                              width: \`\${Math.min(100, Math.max(0, 
                                totalPoints >= MILESTONES[0].requiredPoints ? 100 :
                                totalPoints >= MILESTONES[1].requiredPoints ? 75 :
                                totalPoints >= MILESTONES[2].requiredPoints ? 50 :
                                totalPoints >= MILESTONES[3].requiredPoints ? 25 : 0
                              ))}%\` 
                            }}
                          >
                             <div className="w-full h-full relative">
                               <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 opacity-50 blur-[2px] animate-pulse"></div>
                             </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                          {[...MILESTONES].reverse().map((milestone, idx) => {
                            const isComplete = totalPoints >= milestone.requiredPoints;
                            const isCurrent = currentTierObj && currentTierObj.id === milestone.id;
                            const isNext = nextTierObj && nextTierObj.id === milestone.id;
                            
                            let circleClass = 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400';
                            let circleStyle = {};
                            
                            if (isComplete) {
                              circleClass = 'text-white border-transparent shadow-[0_0_15px_rgba(0,0,0,0.2)]';
                              circleStyle = { backgroundColor: milestone.colorClass.replace('bg-[', '').replace(']', '') };
                            } else if (isNext) {
                              circleClass = 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white border-2 border-dashed border-gray-400 dark:border-gray-500';
                            }
                            
                            const tierColor = milestone.colorClass.replace('bg-[', '').replace(']', '');

                            return (
                              <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white/0 text-left sm:text-center z-10 sm:px-2">
                                <div className={\`w-14 h-14 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 shadow-lg \${circleClass} \${isCurrent ? 'ring-4 ring-offset-2 dark:ring-offset-slate-900 ring-indigo-500/50 animate-pulse' : ''}\`} style={circleStyle}>
                                  {isComplete ? (
                                    <Check className="w-6 h-6 stroke-[3]" />
                                  ) : isNext ? (
                                    <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500"></div>
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
                                    <div className="text-xs font-bold mt-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md inline-block">Current Tier</div>
                                  ) : isNext ? (
                                    <div className="text-xs font-bold mt-2 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md inline-block">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                  ) : !isComplete ? (
                                    <div className="text-xs font-medium text-gray-400 dark:text-slate-500 mt-2">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Next Goal */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                          <span className="text-2xl animate-[wiggle_1s_ease-in-out_infinite]">📌</span> Next Goal
                        </h3>
                        {nextTierObj ? (
                          <div className="relative z-10">
                            <p className="text-gray-700 dark:text-slate-300 font-medium mb-5 text-lg">
                              Earn <span className="font-extrabold text-[#4285F4] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">{Number((nextTierObj.requiredPoints - totalPoints).toFixed(1))}</span> more points to reach <span style={{ color: nextTierObj.colorClass.replace('bg-[', '').replace(']', '') }} className="font-extrabold">{nextTierObj.name}</span>.
                            </p>
                            <div className="bg-gray-50/50 dark:bg-slate-900/30 rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                              <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Fastest paths to unlock:</p>
                              <ul className="text-sm font-medium text-gray-700 dark:text-slate-300 space-y-3">
                                <li className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <span className="text-[#34A853] font-bold text-xs">→</span>
                                  </div>
                                  <span>{Math.ceil(nextTierObj.requiredPoints - totalPoints)} more Game Badges <span className="text-gray-400 dark:text-slate-500 font-normal mx-1">OR</span></span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <span className="text-[#34A853] font-bold text-xs">→</span>
                                  </div>
                                  <span>{Math.ceil((nextTierObj.requiredPoints - totalPoints) / 0.5)} more Skill Badges</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                            <span className="text-6xl mb-4">🏆</span>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              Congratulations!
                            </p>
                            <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium">You have reached the maximum tier.</p>
                          </div>
                        )}
                      </motion.div>

                      {/* Badge Breakdown */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
                      >
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mb-10"></div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 relative z-10">Badge Breakdown</h3>
                        <div className="w-full relative z-10 bg-white/40 dark:bg-slate-900/40 rounded-2xl p-2 border border-gray-200/50 dark:border-slate-700/50">
                          <div className="flex justify-between text-[#6b7280] dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-gray-200/50 dark:border-slate-700/50 pb-3 mb-2 px-3 pt-2">
                            <div className="flex-1">Category</div>
                            <div className="w-16 text-center">Badges</div>
                            <div className="w-16 text-right">Points</div>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 px-3 border-b border-gray-100/50 dark:border-slate-700/30 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                            <div className="flex-1 flex items-center gap-3 font-semibold text-gray-900 dark:text-white">
                              <span className="text-2xl animate-[bounce_3s_ease-in-out_infinite]">🏅</span> Skill Badges
                            </div>
                            <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-bold bg-gray-100/50 dark:bg-slate-800/50 rounded-lg py-1">{displaySkillBadges}</div>
                            <div className="w-16 text-right font-extrabold text-gray-900 dark:text-white">{displaySkillBadges * 0.5}</div>
                          </div>
                          <div className="flex justify-between items-center py-3 px-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                            <div className="flex-1 flex items-center gap-3 font-semibold text-gray-900 dark:text-white">
                              <span className="text-2xl animate-[bounce_3.5s_ease-in-out_infinite]">🎮</span> Game Badges
                            </div>
                            <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-bold bg-gray-100/50 dark:bg-slate-800/50 rounded-lg py-1">{displayGameBadges}</div>
                            <div className={\`w-16 text-right font-extrabold \${displayGameBadges > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-gray-900 dark:text-white'}\`}>{displayGameBadges}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}`;

code = part1 + newResultBlock + part2;
fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');

// I also need to make sure index.css has the custom keyframes for shimmer, wiggle and gradient
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('@keyframes shimmer')) {
  css += `
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes wiggle {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
`;
  fs.writeFileSync('src/index.css', css, 'utf8');
}

console.log("Success");
