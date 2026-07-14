import React, { useState, useMemo } from 'react';
import { X, Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BadgeRecord, Participant } from '../types';

interface BadgeTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
}

export function BadgeTracker({ isOpen, onClose, participant }: BadgeTrackerProps) {
  const [showExcluded, setShowExcluded] = useState(false);

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

  if (!isOpen) return null;

  // Group eligible badges
  const gameBadges = eligibleBadges.filter(b => b.category === 'Game');
  const skillBadges = eligibleBadges.filter(b => b.category === 'Skill');
  const labFreeBadges = eligibleBadges.filter(b => b.category === 'Lab-free');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        aria-hidden="true" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-700">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#4285F4]" />
              Facilitator Program Badge Tracker
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing badges earned: Jul 13, 5:00 PM → Sep 14, 11:59 PM IST
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!participant ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-[#4285F4]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Profile not loaded</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Please enter your profile URL first and click Check to load your badges.
              </p>
            </div>
          ) : (
            <>
              {/* Info Banner */}
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
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Game Badges</p>
                  <p className="text-3xl font-bold text-[#4285F4]">{stats.games}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Skill Badges</p>
                  <p className="text-3xl font-bold text-[#FBBC05]">{stats.skills}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Eligible Points</p>
                  <p className="text-3xl font-bold text-[#34A853]">{stats.points}</p>
                </div>
              </div>

              {eligibleBadges.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 mb-2">No badges found in the Jul 13 – Sep 14 window.</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Keep earning badges to qualify for the facilitator bonus!</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* GROUP 1 — Game Badges */}
                  {gameBadges.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Game Badges <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">({gameBadges.length})</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gameBadges.map(b => (
                          <div key={b.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-2 flex-1 line-clamp-2">{b.title}</h4>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{b.earnedDate}</div>
                            <div className="flex justify-between items-center mt-auto">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold">
                                {b.points} pt
                              </span>
                              <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                                <CheckCircle className="w-3.5 h-3.5" /> Eligible
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* GROUP 2 — Skill Badges */}
                  {skillBadges.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Skill Badges <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">({skillBadges.length})</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skillBadges.map(b => (
                          <div key={b.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-2 flex-1 line-clamp-2">{b.title}</h4>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{b.earnedDate}</div>
                            <div className="flex justify-between items-center mt-auto">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold">
                                {b.points} pt
                              </span>
                              <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                                <CheckCircle className="w-3.5 h-3.5" /> Eligible
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* GROUP 3 — Lab-free Courses */}
                  {labFreeBadges.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Lab-free Courses <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">({labFreeBadges.length})</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {labFreeBadges.map(b => (
                          <div key={b.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-2 flex-1 line-clamp-2">{b.title}</h4>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{b.earnedDate}</div>
                            <div className="flex justify-between items-center mt-auto">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs font-semibold">
                                {b.points} pt
                              </span>
                              <span className="inline-flex items-center gap-1 text-[#34A853] text-xs font-medium">
                                <CheckCircle className="w-3.5 h-3.5" /> Eligible
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Excluded Badges Section */}
              {excludedBadges.length > 0 && (
                <div className="mt-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
                  <button 
                    onClick={() => setShowExcluded(!showExcluded)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      {excludedBadges.length} badges earned outside the program window — not eligible for bonus
                    </span>
                    {showExcluded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {showExcluded && (
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {excludedBadges.map(b => (
                          <div key={b.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-sm">
                            <h4 className="font-medium text-slate-700 dark:text-slate-200 text-xs mb-1 truncate">{b.title}</h4>
                            <div className="flex justify-between items-center">
                              <div className="text-[10px] text-slate-500">{b.earnedDate}</div>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                Not eligible
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
