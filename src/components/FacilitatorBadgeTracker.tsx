import React, { useState, useMemo } from 'react';
import { X, Gamepad2, Layers, Target, Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeRecord, Participant } from '../types';

interface FacilitatorBadgeTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
}

export function FacilitatorBadgeTracker({ isOpen, onClose, participant }: FacilitatorBadgeTrackerProps) {
  const [activeTab, setActiveTab] = useState<'game' | 'skill'>('game');
  const [showExcluded, setShowExcluded] = useState(false);

    const { gameBadges, skillBadges, excludedBadges } = useMemo(() => {
    const games: BadgeRecord[] = [];
    const skills: BadgeRecord[] = [];
    const excluded: { badge: BadgeRecord, reason: string }[] = [];

    if (participant && participant.badges) {
      participant.badges.forEach(badge => {
        if (!badge.validForProgram) {
          excluded.push({ badge, reason: 'Outside program timeline or invalid' });
          return;
        }

        if (badge.category === 'Game') {
          games.push(badge);
        } else if (badge.category === 'Skill') {
          skills.push(badge);
        } else {
          excluded.push({ badge, reason: 'Not eligible type (' + badge.category + ')' });
        }
      });
    }

    return { gameBadges: games, skillBadges: skills, excludedBadges: excluded };
  }, [participant]);

  const gameCount = gameBadges.length;
  const skillCount = skillBadges.length;
  const totalPoints = (gameCount * 1) + (skillCount * 0.5);

  const getMilestoneStatus = (g: number, s: number) => {
    if (g >= 12 && s >= 66) return { name: "Ultimate Milestone", current: { g: 12, s: 66 }, next: null };
    if (g >= 10 && s >= 50) return { name: "Milestone 3", current: { g: 10, s: 50 }, next: { n: "Ultimate Milestone", g: 12, s: 66 } };
    if (g >= 8 && s >= 34) return { name: "Milestone 2", current: { g: 8, s: 34 }, next: { n: "Milestone 3", g: 10, s: 50 } };
    if (g >= 6 && s >= 18) return { name: "Milestone 1", current: { g: 6, s: 18 }, next: { n: "Milestone 2", g: 8, s: 34 } };
    return { name: "No Milestone Yet", current: { g: 0, s: 0 }, next: { n: "Milestone 1", g: 6, s: 18 } };
  };

  const status = getMilestoneStatus(gameCount, skillCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-0" role="dialog" aria-modal="true">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-slate-50 dark:bg-slate-900 shadow-2xl w-full max-w-xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 z-50"
          >
            
            {/* Header */}
            <div className="flex justify-between items-start px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Facilitator Badge Tracker
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Jul 13, 5PM IST → Sep 14, 11:59PM IST
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!participant ? (
            <div className="text-center py-12">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile not loaded</h3>
            </div>
          ) : (
            <>
              {/* Info Banner */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-800 dark:text-amber-200 text-sm font-medium leading-tight">
                  Only Game & Skill Badges in this window count for facilitator bonus milestones
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
                  <div className="bg-[#4285F4]/10 p-2.5 rounded-lg text-[#4285F4]">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Game Badges</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{gameCount}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
                  <div className="bg-[#7c3aed]/10 p-2.5 rounded-lg text-[#7c3aed]">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Skill Badges</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{skillCount}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
                  <div className="bg-[#34A853]/10 p-2.5 rounded-lg text-[#34A853]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Points</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{totalPoints.toFixed(1)}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
                  <div className="bg-[#FBBC05]/10 p-2.5 rounded-lg text-[#FBBC05]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Milestone</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{status.name}</p>
                  </div>
                </div>
              </div>

              {/* Milestone Progress */}
              {status.next && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Progress to {status.next.n}</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {Math.max(0, status.next.g - gameCount)} more games + {Math.max(0, status.next.s - skillCount)} more skills
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-medium">
                        <span className="text-slate-600 dark:text-slate-400">Games: {gameCount} / {status.next.g}</span>
                        {gameCount >= status.next.g && <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />}
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-[#4285F4] h-2 rounded-full" style={{ width: `${Math.min(100, (gameCount / status.next.g) * 100)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-medium">
                        <span className="text-slate-600 dark:text-slate-400">Skills: {skillCount} / {status.next.s}</span>
                        {skillCount >= status.next.s && <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />}
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-[#7c3aed] h-2 rounded-full" style={{ width: `${Math.min(100, (skillCount / status.next.s) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Badges List */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setActiveTab('game')}
                    className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'game' ? 'border-[#4285F4] text-[#4285F4]' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                  >
                    🎮 Game Badges ({gameCount})
                  </button>
                  <button 
                    onClick={() => setActiveTab('skill')}
                    className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'skill' ? 'border-[#7c3aed] text-[#7c3aed]' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                  >
                    🎯 Skill Badges ({skillCount})
                  </button>
                </div>

                <div className="p-4 max-h-[300px] overflow-y-auto">
                  {activeTab === 'game' && (
                    <div className="space-y-3">
                      {gameBadges.length === 0 ? (
                        <p className="text-sm text-center text-slate-500 py-4">No game badges earned yet.</p>
                      ) : (
                        gameBadges.map((b, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{b.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{b.earnedDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-[#4285F4]/10 text-[#4285F4]">1 pt</span>
                              <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-[#34A853]/10 text-[#34A853] flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Eligible
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeTab === 'skill' && (
                    <div className="space-y-3">
                      {skillBadges.length === 0 ? (
                        <p className="text-sm text-center text-slate-500 py-4">No skill badges earned yet.</p>
                      ) : (
                        skillBadges.map((b, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{b.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{b.earnedDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-[#7c3aed]/10 text-[#7c3aed]">0.5 pt</span>
                              <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-[#34A853]/10 text-[#34A853] flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Eligible
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Excluded Badges */}
              {excludedBadges.length > 0 && (
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <button 
                    onClick={() => setShowExcluded(!showExcluded)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {showExcluded ? '▲' : '▼'} {excludedBadges.length} badges not counted for bonus
                    </span>
                  </button>
                  
                  {showExcluded && (
                    <div className="p-4 space-y-3 border-t border-slate-200 dark:border-slate-700 max-h-[300px] overflow-y-auto">
                      {excludedBadges.map((item, i) => (
                        <div key={i} className="flex flex-col p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 line-clamp-1">{item.badge.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] text-slate-400">{item.badge.earnedDate}</p>
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                              {item.reason}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Reference */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1 font-mono">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-2 font-sans">Milestone Reference:</p>
                <p>Milestone 1:  6 games + 18 skills → +5 bonus</p>
                <p>Milestone 2:  8 games + 34 skills → +15 bonus</p>
                <p>Milestone 3: 10 games + 50 skills → +25 bonus</p>
                <p>Ultimate:    12 games + 66 skills → +35 bonus</p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
    )}
    </AnimatePresence>
  );
}
