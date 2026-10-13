import React, { useState, useMemo } from 'react';
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
        const isArcadeEligible = (badge.validForArcade !== false && (badge.validForProgram || badge.validForArcade)) || (badge.points && badge.points > 0);
        if (isArcadeEligible) {
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
      className="mt-8 relative bg-[var(--card)] rounded-3xl border-2 border-[var(--edge)] overflow-hidden shadow-[5px_5px_0_var(--edge)]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b-2 border-[var(--edge)] bg-[var(--card)] shrink-0 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 mb-1">
            VERIFIED BADGE AUDIT
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[var(--ink)] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#4285F4]" />
            Arcade &amp; Facilitator Badge Tracker
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mut)] mt-0.5">
            Arcade 2026 Season: Jul 13 → Dec 31, 2026 &middot; Facilitator Milestone Window: Jul 13 → Sep 14, 2026
          </p>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="bg-blue-50/80 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800/80 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-blue-900 dark:text-blue-200 text-xs sm:text-sm font-medium leading-relaxed">
            Arcade program runs through December 31, 2026. All active games (+1 Pt) and verified skill badges (+0.5 Pt) continuously accumulate toward your total Arcade points and Swag Tiers.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-[var(--bg)] p-4 rounded-2xl border-2 border-[var(--edge)] text-center shadow-[3px_3px_0_var(--edge)]">
            <p className="text-[11px] text-[var(--mut)] uppercase tracking-wider font-bold mb-1">Eligible Badges</p>
            <p className="text-2xl sm:text-3xl font-black text-[var(--ink)] font-mono"><AnimatedPoints endVal={stats.total} /></p>
          </div>
          <div className="bg-[var(--bg)] p-4 rounded-2xl border-2 border-[var(--edge)] text-center shadow-[3px_3px_0_var(--edge)]">
            <p className="text-[11px] text-[var(--mut)] uppercase tracking-wider font-bold mb-1">Game Badges</p>
            <p className="text-2xl sm:text-3xl font-black text-[#4285F4] font-mono"><AnimatedPoints endVal={stats.games} /></p>
          </div>
          <div className="bg-[var(--bg)] p-4 rounded-2xl border-2 border-[var(--edge)] text-center shadow-[3px_3px_0_var(--edge)]">
            <p className="text-[11px] text-[var(--mut)] uppercase tracking-wider font-bold mb-1">Skill Badges</p>
            <p className="text-2xl sm:text-3xl font-black text-[#FBBC05] font-mono"><AnimatedPoints endVal={stats.skills} /></p>
          </div>
          <div className="bg-[var(--bg)] p-4 rounded-2xl border-2 border-[var(--edge)] text-center shadow-[3px_3px_0_var(--edge)]">
            <p className="text-[11px] text-[var(--mut)] uppercase tracking-wider font-bold mb-1">Eligible Points</p>
            <p className="text-2xl sm:text-3xl font-black text-[#34A853] font-mono"><AnimatedPoints endVal={stats.points} /></p>
          </div>
        </div>

        {eligibleBadges.length === 0 ? (
          <div className="text-center py-10 bg-[var(--bg)] rounded-2xl border-2 border-[var(--edge)]">
            <p className="text-[var(--mut)] mb-2 text-sm">No badges found in the tracked window.</p>
            <p className="font-bold text-[var(--ink)] text-sm">Complete active skill badges and games on Skills Boost to earn points!</p>
          </div>
        ) : (
          <div className="bg-[var(--bg)] border-2 border-[var(--edge)] rounded-2xl overflow-hidden mb-6 shadow-[3px_3px_0_var(--edge)]">
            {/* Tactile Press Tabs Bar */}
            <div className="flex border-b-2 border-[var(--edge)] overflow-x-auto hide-scrollbar p-2.5 gap-2 bg-[var(--card)]">
              <button 
                type="button"
                onClick={() => setActiveTab('game')}
                className={`btn-press btn-press--sm px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeTab === 'game' 
                    ? 'btn-press--primary is-pressed text-white' 
                    : 'btn-press--secondary text-[var(--ink)]'
                }`}
                style={{
                  border: '2px solid var(--edge)',
                  boxShadow: activeTab === 'game' ? '0 0 0 var(--edge)' : '3px 3px 0 var(--edge)',
                  transform: activeTab === 'game' ? 'translate(3px, 3px)' : 'none'
                }}
              >
                <Gamepad2 className="w-4 h-4 text-blue-400" />
                <span>Game Badges ({gameBadges.length})</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('skill')}
                className={`btn-press btn-press--sm px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeTab === 'skill' 
                    ? 'btn-press--yellow is-pressed text-slate-900' 
                    : 'btn-press--secondary text-[var(--ink)]'
                }`}
                style={{
                  border: '2px solid var(--edge)',
                  boxShadow: activeTab === 'skill' ? '0 0 0 var(--edge)' : '3px 3px 0 var(--edge)',
                  transform: activeTab === 'skill' ? 'translate(3px, 3px)' : 'none'
                }}
              >
                <Target className="w-4 h-4 text-amber-500" />
                <span>Skill Badges ({skillBadges.length})</span>
              </button>
              {labFreeBadges.length > 0 && (
                <button 
                  type="button"
                  onClick={() => setActiveTab('labfree')}
                  className={`btn-press btn-press--sm px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'labfree' 
                      ? 'btn-press--primary is-pressed text-white' 
                      : 'btn-press--secondary text-[var(--ink)]'
                  }`}
                  style={{
                    border: '2px solid var(--edge)',
                    boxShadow: activeTab === 'labfree' ? '0 0 0 var(--edge)' : '3px 3px 0 var(--edge)',
                    transform: activeTab === 'labfree' ? 'translate(3px, 3px)' : 'none'
                  }}
                >
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Lab-free Courses ({labFreeBadges.length})</span>
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
                    <div key={`game-${b.id}-${i}`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <img src={getBadgeImage(b.title)!} alt={`${b.title} badge icon`} className="w-full h-full object-contain" />
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
                          <CheckCircle className="w-3.5 h-3.5" /> {b.validForProgram ? 'Facilitator & Arcade' : 'Arcade Points Active'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'skill' && skillBadges.length === 0 && (
                    <p className="col-span-full text-center py-8 text-slate-500">No skill badges earned yet.</p>
                  )}
                  {activeTab === 'skill' && skillBadges.map((b, i) => (
                    <div key={`skill-${b.id}-${i}`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                      <div className="flex gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <img src={getBadgeImage(b.title)!} alt={`${b.title} badge icon`} className="w-full h-full object-contain" />
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
                          <CheckCircle className="w-3.5 h-3.5" /> {b.validForProgram ? 'Facilitator & Arcade' : 'Arcade Points Active'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'labfree' && labFreeBadges.length === 0 && (
                    <p className="col-span-full text-center py-8 text-slate-500">No lab-free courses earned yet.</p>
                  )}
                  {activeTab === 'labfree' && labFreeBadges.map((b, i) => (
                    <div key={`labfree-${b.id}-${i}`} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 flex flex-col gap-3 group hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
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
          <div className="border-2 border-[var(--edge)] rounded-2xl bg-[var(--card)] overflow-hidden shadow-[3px_3px_0_var(--edge)]">
            <button 
              type="button"
              onClick={() => setShowExcluded(!showExcluded)}
              className="w-full px-5 py-3.5 flex items-center justify-between bg-[var(--card)] hover:bg-[var(--bg)] transition-colors text-left cursor-pointer"
            >
              <span className="font-bold text-[var(--ink)] text-xs sm:text-sm">
                ⚠️ {excludedBadges.length} badges earned outside the program window — not eligible for bonus
              </span>
              <div className="w-7 h-7 rounded-lg border border-[var(--edge)] bg-[var(--bg)] flex items-center justify-center">
                {showExcluded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
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
                      <div key={`excl-${b.id}-${i}`} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-sm flex items-center gap-3">
                        {getBadgeImage(b.title) ? (
                          <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-900 flex-shrink-0">
                            <img src={getBadgeImage(b.title)!} alt={`${b.title} badge`} className="w-full h-full object-contain" />
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
