const fs = require('fs');

const fileContent = `import React, { useState, useMemo } from 'react';
import { Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Gamepad2, Target, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeRecord, Participant } from '../types';
import { gameBadges as dataGameBadges, skillBadges as dataSkillBadges } from '../data/badgesData';

interface InlineBadgeTrackerProps {
  participant: Participant | null;
}

const AnimatedPoints = ({ endVal }: { endVal: number }) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let startTime: number | undefined;
    const duration = 1500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setVal(endVal * easeOutCubic(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(endVal);
      }
    };
    requestAnimationFrame(animate);
  }, [endVal]);

  return <>{val % 1 === 0 ? val : val.toFixed(1)}</>;
};

export function InlineBadgeTracker({ participant }: InlineBadgeTrackerProps) {
  const [showExcluded, setShowExcluded] = useState(false);
  const [activeTab, setActiveTab] = useState<'game' | 'skill' | 'labfree'>('game');
  
  const { eligibleBadges, excludedBadges, stats } = useMemo(() => {
    const eligible: BadgeRecord[] = [];
    const excluded: BadgeRecord[] = [];
    let gameCount = 0;
    let skillCount = 0;
    let eligiblePoints = 0;

    if (participant && participant.badges) {
      participant.badges.forEach(badge => {
        if (badge.validForProgram) {
          eligible.push(badge);
          if (badge.category === 'Game') {
            gameCount++;
            eligiblePoints += 1;
          } else if (badge.category === 'Skill') {
            skillCount++;
            eligiblePoints += 0.5;
          }
        } else {
          excluded.push(badge);
        }
      });
    }

    return {
      eligibleBadges: eligible,
      excludedBadges: excluded,
      stats: {
        total: eligible.length,
        games: gameCount,
        skills: skillCount,
        points: eligiblePoints
      }
    };
  }, [participant]);

  const badgeImageMap = useMemo(() => {
    const allData = [...dataGameBadges, ...dataSkillBadges];
    return new Map(allData.map(b => [b.name.trim().toLowerCase(), b.image]));
  }, []);

  if (!participant) return null;

  const gameBadges = eligibleBadges.filter(b => b.category === 'Game');
  const skillBadges = eligibleBadges.filter(b => b.category === 'Skill');
  const labFreeBadges = eligibleBadges.filter(b => b.category === 'Lab-free');

  const getBadgeImage = (title: string) => {
    return badgeImageMap.get(title.trim().toLowerCase()) || null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 relative bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
    >
      <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 backdrop-blur dark:bg-slate-900/95 shrink-0">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#4285F4]" />
            Facilitator Program Badge Tracker
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showing badges earned: Jul 13, 5:00 PM → Sep 14, 11:59 PM IST
          </p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            Only badges in this window count toward the Facilitator bonus milestone criteria
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Eligible Badges</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white"><AnimatedPoints endVal={stats.total} /></p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Game Badges</p>
            <p className="text-3xl font-bold text-[#4285F4]"><AnimatedPoints endVal={stats.games} /></p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Skill Badges</p>
            <p className="text-3xl font-bold text-[#FBBC05]"><AnimatedPoints endVal={stats.skills} /></p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Eligible Points</p>
            <p className="text-3xl font-bold text-[#34A853]"><AnimatedPoints endVal={stats.points} /></p>
          </div>
        </div>

        {eligibleBadges.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            <p className="text-slate-600 dark:text-slate-400 mb-2">No badges found in the Jul 13 – Sep 14 window.</p>
            <p className="font-medium text-slate-800 dark:text-slate-200">Keep earning badges to qualify for the facilitator bonus!</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700/50 rounded-3xl overflow-hidden mb-8 shadow-sm">
            <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('game')}
                className={\`flex-1 min-w-[120px] py-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 \${activeTab === 'game' ? 'border-[#4285F4] text-[#4285F4] bg-blue-50/50 dark:bg-blue-900/10' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}
              >
                <Gamepad2 className="w-4 h-4" /> Game Badges ({gameBadges.length})
              </button>
              <button 
                onClick={() => setActiveTab('skill')}
                className={\`flex-1 min-w-[120px] py-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 \${activeTab === 'skill' ? 'border-[#FBBC05] text-[#FBBC05] bg-amber-50/50 dark:bg-amber-900/10' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}
              >
                <Target className="w-4 h-4" /> Skill Badges ({skillBadges.length})
              </button>
              {labFreeBadges.length > 0 && (
                <button 
                  onClick={() => setActiveTab('labfree')}
                  className={\`flex-1 min-w-[120px] py-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 \${activeTab === 'labfree' ? 'border-slate-800 text-slate-800 dark:border-slate-200 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/30' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}
                >
                  <BookOpen className="w-4 h-4" /> Lab-free Courses ({labFreeBadges.length})
                </button>
              )}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {activeTab === 'game' && gameBadges.length === 0 && (
                    <p className="col-span-full text-center py-8 text-slate-500">No game badges earned yet.</p>
                  )}
                  {activeTab === 'game' && gameBadges.map((b, i) => (
                    <div key={\`game-\${b.id}-\${i}\`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <img src={getBadgeImage(b.title)!} alt="badge" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-6 h-6 text-blue-500" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 leading-snug">{b.title}</h4>
                          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">{b.earnedDate}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-200 dark:border-slate-700/50">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold">
                          {b.points} pt
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Eligible
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'skill' && skillBadges.length === 0 && (
                    <p className="col-span-full text-center py-8 text-slate-500">No skill badges earned yet.</p>
                  )}
                  {activeTab === 'skill' && skillBadges.map((b, i) => (
                    <div key={\`skill-\${b.id}-\${i}\`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                      <div className="flex gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <img src={getBadgeImage(b.title)!} alt="badge" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                            <Target className="w-6 h-6 text-amber-500" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 leading-snug">{b.title}</h4>
                          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">{b.earnedDate}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-200 dark:border-slate-700/50">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold">
                          {b.points} pt
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Eligible
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'labfree' && labFreeBadges.length === 0 && (
                    <p className="col-span-full text-center py-8 text-slate-500">No lab-free courses earned yet.</p>
                  )}
                  {activeTab === 'labfree' && labFreeBadges.map((b, i) => (
                    <div key={\`labfree-\${b.id}-\${i}\`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-slate-500 dark:text-slate-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 leading-snug">{b.title}</h4>
                          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">{b.earnedDate}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-200 dark:border-slate-700/50">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-semibold">
                          {b.points} pt
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Eligible
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Excluded Badges Section */}
        {excludedBadges.length > 0 && (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
            <button 
              onClick={() => setShowExcluded(!showExcluded)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                {excludedBadges.length} badges earned outside the program window — not eligible for bonus
              </span>
              {showExcluded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            <AnimatePresence>
              {showExcluded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {excludedBadges.map((b, i) => (
                      <div key={\`excl-\${b.id}-\${i}\`} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-sm flex items-center gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-900 flex-shrink-0">
                            <img src={getBadgeImage(b.title)!} alt="" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-700 dark:text-slate-200 text-xs mb-0.5 truncate">{b.title}</h4>
                          <div className="flex justify-between items-center">
                            <div className="text-[10px] text-slate-500">{b.earnedDate}</div>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400 uppercase tracking-wider">
                              Not eligible
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
`;

fs.writeFileSync('src/components/InlineBadgeTracker.tsx', fileContent);
console.log("Written InlineBadgeTracker with tabs and images");
