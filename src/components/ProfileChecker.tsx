import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Trophy, Medal, Star, ChevronRight, Activity, AlertCircle, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Participant, MILESTONES } from '../types';
import { BadgeTracker } from './BadgeTracker';
import { FacilitatorBadgeTracker } from './FacilitatorBadgeTracker';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface ProfileCheckerProps {
  participants: Participant[];
}

export function ProfileChecker({ participants = [] }: ProfileCheckerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<Participant | null>(null);
  const [error, setError] = useState('');
  const [isBadgeTrackerOpen, setIsBadgeTrackerOpen] = useState(false);
  const [isFacilitatorBadgeTrackerOpen, setIsFacilitatorBadgeTrackerOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spots, setSpots] = useState<any>({
    trooper:  { spotsLeft: 6000, total: 6000 },
    ranger:   { spotsLeft: 4000, total: 4000 },
    champion: { spotsLeft: 3000, total: 3000 },
    legend:   { spotsLeft: 2500, total: 2500 },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSpotsLoading(true);
    fetch('/api/arcade-spots')
      .then(res => res.json())
      .then(data => {
        if (!data || !data.trooper) return;
        setSpots(data);
      })
      .catch(() => {
        // keep fallback values silently
      })
      .finally(() => {
        setSpotsLoading(false);
      });
  }, []);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    // Check if it's a valid profile URL
    if (!url.includes('cloudskillsboost.google/public_profiles/') && !url.includes('skills.google/public_profiles/')) {
      setError("Please send a valid Google Cloud Skills Boost public profile URL to calculate your Arcade points.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        throw new Error('Profile is private or invalid URL.');
      }
      const data = await res.json();
      
      const newResult = {
        id: 'fetched',
        name: data.name,
        avatarUrl: data.avatarUrl,
        community: 'Unknown',
        email: '',
        profileUrl: url,
        gameBadges: data.gameBadges,
        triviaBadges: data.triviaBadges,
        skillBadges: data.skillBadges,
        specialBadges: data.specialBadges || 0,
        arcadePoints: data.arcadePoints,
        currentRank: 0,
        milestoneEarned: '',
        dailyPoints: 0,
        totalPoints: data.arcadePoints,
        lastUpdated: '',
        previousRank: 0,
        badges: data.badges
      };

      setResult(newResult);
      
      // Save for UserProgressDashboard to pick up
      localStorage.setItem('arcadeProfileUrl', url);
      // We pass the raw data so it can be parsed by UserProgressDashboard if needed
      localStorage.setItem('arcadeProgressData', JSON.stringify(data));
      
      const prevRecent = JSON.parse(localStorage.getItem('arcadeRecentUrls') || '[]');
      const newRecent = [url, ...prevRecent.filter(u => u !== url)].slice(0, 5);
      localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));


      if (data.arcadePoints >= 120) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

    } catch (err: any) {
      setResult(null);
      setError('Profile is private or invalid URL. Please set your profile to public on Cloud Skills Boost and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getNextMilestone = (points: number) => {
    return MILESTONES.find(m => m.requiredPoints > points);
  };

  const getCurrentMilestone = (points: number) => {
    return [...MILESTONES].reverse().find(m => points >= m.requiredPoints);
  };

  return (
    <section id="calculator" className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={user ? "glass-panel rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden" : "rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden bg-transparent"}>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900 dark:text-white">Check Your Arcade Profile</h2>
          <p className="text-slate-500 dark:text-[#8B8FA3]">Enter your Public Profile URL or Name to check your real-time milestone progress.</p>
        </div>

        {!user ? (
          <div className="max-w-[400px] mx-auto mb-10 bg-white dark:bg-[#12172A] rounded-[16px] p-8 border border-[#E5E7EB] dark:border-[#2A3352] shadow-sm dark:shadow-none text-center">
            <div className="w-[56px] h-[56px] bg-gradient-to-br from-[#5B6CF9] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-[26px] h-[26px] text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F36] dark:text-[#F5F5F7] mb-3">Login required</h3>
            <p className="text-[15px] leading-relaxed text-[#6B7280] dark:text-[#8B8FA3] mb-8">
              Sign in to check your arcade points and track your progress.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
              className="w-full h-[44px] rounded-[10px] bg-gradient-to-br from-[#5B6CF9] to-[#8B5CF6] text-white font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-200 border-none"
            >
              Sign in to continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheck} className="relative max-w-2xl mx-auto mb-10">
            <div className="flex items-center relative z-10 bg-white dark:bg-slate-900 rounded-full p-2 pl-6 shadow-xl border border-slate-200 dark:border-slate-800">
              <Search className="h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="e.g. https://www.cloudskillsboost.google/public_profiles/xxxxx" 
                className="flex-1 bg-transparent border-none focus:outline-none px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#4285F4] hover:bg-blue-600 outline-none focus:outline-none text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md disabled:bg-slate-400 flex items-center justify-center min-w-[100px]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Check'
                )}
              </button>
            </div>
            {error && <p className="text-[#EA4335] mt-4 text-center font-medium">{error}</p>}
          </form>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl text-left bg-[#f3f4f6] dark:bg-slate-800/50 p-4 sm:p-8 rounded-[24px] mt-8"
          >
            {(() => {
              const isBeforeStart = new Date() < new Date('2026-07-13T00:00:00Z');
              const isAfterEnd = new Date() > new Date('2026-09-14T18:29:00Z');
              const basePoints = isBeforeStart ? 0 : result.arcadePoints;
              const displaySkillBadges = isBeforeStart ? 0 : result.skillBadges;
              const displayGameBadges = isBeforeStart ? 0 : result.gameBadges;
              const bonusPoints = 0; // Assuming 0 bonus for now
              const totalPoints = basePoints + bonusPoints;

              const currentTierObj = MILESTONES.slice().reverse().find(m => totalPoints >= m.requiredPoints);
              const currentTierName = currentTierObj ? currentTierObj.name : "No Tier";

              const nextTierObj = MILESTONES.find(m => totalPoints < m.requiredPoints);
              const nextGoal = nextTierObj 
                ? `Earn ${nextTierObj.requiredPoints - totalPoints} more points to reach ${nextTierObj.name}.`
                : "Max Tier Reached.";

              const avatarInitials = result.name.substring(0, 2).toUpperCase();

              return (
                <div className="flex flex-col gap-6">
                  {/* View Progress Button */}
                  <div className="flex justify-center mb-4">
                    <Link to="/my-progress" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B6CF9] to-[#8B5CF6] hover:from-[#4A5CE9] hover:to-[#7A4BE6] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto">
                      View Detailed Progress & Share Card
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                  {/* TOP ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CARD 1 - User Profile */}
                    <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          {result.avatarUrl ? (
                            <img src={result.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#2563eb] dark:text-blue-400 font-bold text-lg">
                              {avatarInitials}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-[20px] text-gray-900 dark:text-white leading-tight">{result.name}</h3>
                            <div className="mt-1 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold shadow-sm border" style={{ 
                              color: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280',
                              borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#d1d5db',
                              backgroundColor: 'transparent'
                            }}>
                              {currentTierName}
                            </div>
                          </div>
                        </div>
                        <p className="text-[#6b7280] dark:text-slate-400 text-sm mb-6">Member since {new Date().getFullYear()}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 px-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                          View Profile
                        </a>
                        <button 
                          onClick={() => setIsFacilitatorBadgeTrackerOpen(true)}
                          className="w-full text-center py-2 px-3 rounded-full border border-amber-500 text-sm font-semibold text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-pointer"
                        >
                          🗓️ Badge Tracker
                        </button>
                      </div>
                    </div>

                    {/* CARD 2 - Total Points */}
                    <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] static flex flex-col justify-center relative">
                      <p className="text-[#6b7280] dark:text-slate-400 text-sm font-medium mb-1">Total Points</p>
                      <h2 className="text-[48px] font-[800] text-gray-900 dark:text-white leading-none mb-2">{totalPoints}</h2>
                      
                      {isBeforeStart ? (
                        <p className="text-[#EA4335] font-bold text-sm">Program Not Started</p>
                      ) : isAfterEnd ? (
                        <>
                          <p className="text-[#4285F4] font-bold text-sm mb-1">Program has Ended</p>
                          <p className="text-sm font-medium">
                            <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                            <span className={bonusPoints > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-[#6b7280] dark:text-slate-400'}>{bonusPoints} bonus</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium">
                          <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                          <span className={bonusPoints > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-[#6b7280] dark:text-slate-400'}>{bonusPoints} bonus</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* MIDDLE ROW - Tier Progress Stepper */}
                  <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-col sm:flex-row justify-between relative gap-8 sm:gap-0 mt-4 mb-2">
                      <div className="hidden sm:block absolute top-[20px] left-0 w-full border-t-2 border-dashed border-gray-300 dark:border-slate-700 -z-10"></div>
                      
                      {MILESTONES.map((milestone, idx) => {
                        const isComplete = totalPoints >= milestone.requiredPoints;
                        const isNext = totalPoints < milestone.requiredPoints && (idx === 0 || totalPoints >= MILESTONES[idx-1].requiredPoints);
                        const isCurrent = totalPoints >= milestone.requiredPoints && (idx === MILESTONES.length - 1 || totalPoints < MILESTONES[idx+1].requiredPoints);
                        
                        // Extract hex from milestone colorClass (e.g., 'bg-[#4285F4]' -> '#4285F4')
                        const circleColor = milestone.colorClass.replace('bg-[', '').replace(']', '');
                        
                        let circleClass = "bg-white dark:bg-slate-800";
                        let circleStyle: React.CSSProperties = {
                          borderColor: '#d1d5db',
                          color: '#9ca3af'
                        };
                        
                        if (isComplete) {
                          circleStyle = { backgroundColor: circleColor, borderColor: circleColor, color: 'white' };
                          circleClass = "";
                        } else if (isNext) {
                          circleStyle = { borderColor: circleColor, color: circleColor };
                        }

                        return (
                          <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white dark:bg-slate-800 sm:bg-transparent sm:dark:bg-transparent text-left sm:text-center z-10 sm:px-2">
                            {idx > 0 && isComplete && (
                              <div className="hidden sm:block absolute top-[20px] right-1/2 w-full h-[2px] -z-10" style={{ backgroundColor: circleColor }}></div>
                            )}

                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 border-2 shadow-sm ${circleClass}`} style={circleStyle}>
                              {isComplete ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : isNext ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className={`font-bold text-[15px] ${isComplete ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
                                {milestone.name}
                              </div>
                              <div className="text-[12px] text-[#6b7280] dark:text-slate-400 mt-0.5">
                                {milestone.requiredPoints} pts
                              </div>
                              
                              <div className="text-[10px] bg-gray-100 dark:bg-slate-700 rounded px-1.5 py-0.5 inline-block mt-1 text-gray-500 dark:text-slate-400 font-medium">
                                {spotsLoading ? (
                                   <span className="animate-pulse">— / — spots left</span>
                                ) : (
                                   <span>{spots[milestone.name.toLowerCase()].spotsLeft.toLocaleString()} / {spots[milestone.name.toLowerCase()].total.toLocaleString()} spots left</span>
                                )}
                              </div>
                              
                              {isCurrent ? (
                                <div className="text-[12px] font-bold mt-1" style={{ color: circleColor }}>Current Tier</div>
                              ) : isNext ? (
                                <div className="text-[12px] font-bold mt-1" style={{ color: circleColor }}>{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                              ) : !isComplete ? (
                                <div className="text-[12px] font-medium text-gray-400 dark:text-slate-500 mt-1">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BOTTOM LEFT - Next Goal */}
                    <div className="w-full bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-xl">📌</span> Next Goal
                      </h3>
                      {nextTierObj ? (
                        <>
                          <p className="text-gray-700 dark:text-slate-300 font-medium mb-4">
                            Earn <span className="font-bold text-[#4285F4]">{Number((nextTierObj.requiredPoints - totalPoints).toFixed(1))}</span> more points to reach <span style={{ color: nextTierObj.colorClass.replace('bg-[', '').replace(']', '') }} className="font-bold">{nextTierObj.name}</span>.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">You need:</p>
                          <ul className="text-sm font-medium text-gray-700 dark:text-slate-300 space-y-1.5 ml-1">
                            <li className="flex items-center gap-2">
                              <span className="text-[#34A853]">→</span> 
                              <span>{Math.ceil(nextTierObj.requiredPoints - totalPoints)} more Game Badges <span className="text-gray-400 dark:text-slate-500 font-normal">OR</span></span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-[#34A853]">→</span> 
                              <span>{Math.ceil((nextTierObj.requiredPoints - totalPoints) / 0.5)} more Skill Badges</span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <p className="text-gray-700 dark:text-slate-300 font-medium my-auto text-center">
                          Congratulations! You have reached the maximum tier.
                        </p>
                      )}
                    </div>

                    {/* BOTTOM RIGHT - Badge Breakdown */}
                    <div id="badge-breakdown" className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Badge Breakdown</h3>
                      <div className="w-full">
                        <div className="flex justify-between text-[#6b7280] dark:text-slate-400 text-sm font-medium border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                          <div className="flex-1">Category</div>
                          <div className="w-16 text-center">Badges</div>
                          <div className="w-16 text-right">Points</div>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-700/50">
                          <div className="flex-1 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            <span className="text-lg">🏅</span> Skill Badges
                          </div>
                          <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-medium">{displaySkillBadges}</div>
                          <div className="w-16 text-right font-bold text-gray-900 dark:text-white">{displaySkillBadges * 0.5}</div>
                        </div>

                        <div className="flex justify-between items-center py-2">
                          <div className="flex-1 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            <span className="text-lg">🏅</span> Game Badges
                          </div>
                          <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-medium">{displayGameBadges}</div>
                          <div className={`w-16 text-right font-bold ${displayGameBadges > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{displayGameBadges}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>

      <BadgeTracker 
        isOpen={isBadgeTrackerOpen} 
        onClose={() => setIsBadgeTrackerOpen(false)} 
        participant={result} 
      />
      <FacilitatorBadgeTracker 
        isOpen={isFacilitatorBadgeTrackerOpen} 
        onClose={() => setIsFacilitatorBadgeTrackerOpen(false)} 
        participant={result} 
      />
    </section>
  );
}
