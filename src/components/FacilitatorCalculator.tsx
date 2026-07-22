import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Gamepad2, Layers, Search, AlertCircle, Info, Calendar, CheckCircle2, Lock, ArrowRight, Loader2, Target, Star } from 'lucide-react';
import { ArcadeLoader } from './ArcadeLoader';
import { MilestoneProgress } from './MilestoneProgress';

export function FacilitatorCalculator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    name: string;
    avatarUrl: string;
    gameBadges: number;
    skillBadges: number;
    gearBadgesCount: number;
    allSkillBadges: { title: string; earnedDate: string; validForProgram: boolean }[];
    allGameBadges: { title: string; earnedDate: string; validForProgram: boolean }[];
  } | null>(null);

  const [bonusMilestone, setBonusMilestone] = useState({
    enrolled: false,
    gearProfileBadge: false,
    freeTrialSignedUp: false,
    firstAgentBuilt: false,
    submitted: false,
  });

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch profile');
      }
      
      const START = new Date('2026-07-13T00:00:00Z');
      const END = new Date('2026-09-14T18:29:00Z');
      
      let validGameBadges = 0;
      let validSkillBadges = 0;
      let gearBadgesCount = 0;
      
      const allSkillBadges: { title: string; earnedDate: string; validForProgram: boolean }[] = [];
      const allGameBadges: { title: string; earnedDate: string; validForProgram: boolean }[] = [];

      const gearBadgeTitles = [
        "create your first gemini enterprise application",
        "engineer ai agents with agent development kit (adk)",
        "deploy multi-agent architectures",
        "orchestrate multi-agent workflows with gemini enterprise"
      ];
      
      json.badges.forEach((badge: any) => {
        const dateStr = (badge.completedDate || badge.earnedDate || '').replace(/^Earned\s+(on\s+)?/i, '').trim();
        const badgeDate = new Date(dateStr);
        const isWithinTimeline = badgeDate >= START && badgeDate <= END;
        
        const t = badge.title.toLowerCase().trim();
        
        const isGameBadge = t.includes("arcade base camp") ||
                            t.includes("arcade adventure") ||
                            t.includes("arcade voyage") ||
                            t.includes("arcade trail") ||
                            t.includes("arcade special") ||
                            t.includes("level 1") ||
                            t.includes("level 2") ||
                            t.includes("level 3") ||
                            t.includes("the arcade") ||
                            t.includes("arcade sprint") ||
                            t.includes("monthly game") ||
                            t.includes("new arcade game");
                            
        const isTriviaBadge = t.includes("trivia") || t.includes("quiz");
        const isLabFree = badge.category === "Lab-free"; 
        const isSpecial = badge.category === "Special" && !isGameBadge;
        const isSkillBadge = !isGameBadge && !isTriviaBadge && !isLabFree && !isSpecial;

        if (isSkillBadge) {
          allSkillBadges.push({ title: badge.title, earnedDate: dateStr, validForProgram: isWithinTimeline });
        }
        if (isGameBadge) {
          allGameBadges.push({ title: badge.title, earnedDate: dateStr, validForProgram: isWithinTimeline });
        }

        if (isWithinTimeline) {
          if (gearBadgeTitles.includes(t)) {
             gearBadgesCount++;
          }
          if (isGameBadge) {
            validGameBadges++;
          } else if (isSkillBadge) {
            validSkillBadges++;
          }
        }
      });
      
      setData({
        name: json.name,
        avatarUrl: json.avatarUrl,
        gameBadges: validGameBadges,
        skillBadges: validSkillBadges,
        gearBadgesCount: Math.min(gearBadgesCount, 4), // cap at 4
        allSkillBadges,
        allGameBadges
      });

      // Save for UserProgressDashboard to pick up
      localStorage.setItem('arcadeProfileUrl', url);
      // Wait, we also need to store the FULL json output into arcadeProgressData so it can parse it
      // Let's store json as arcadeProgressData
      localStorage.setItem('arcadeProgressData', JSON.stringify(json));
      
      const prevRecent = JSON.parse(localStorage.getItem('arcadeRecentUrls') || '[]');
      const newRecent = [url, ...prevRecent.filter(u => u !== url)].slice(0, 5);
      localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));

      
    } catch (err: any) {
      setError(err.message === 'Profile not found or invalid URL' 
        ? "Profile is private. Please set your profile to public on skills.google and try again." 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMilestoneStatus = (games: number, skills: number) => {
    if (games >= 12 && skills >= 66) {
      return {
        name: "Ultimate Milestone",
        base: (games * 1) + (skills * 0.5),
        bonus: 35,
        gamesNeeded: 12,
        skillsNeeded: 66,
        next: null
      };
    } else if (games >= 10 && skills >= 50) {
      return {
        name: "Milestone 3",
        base: (games * 1) + (skills * 0.5),
        bonus: 25,
        gamesNeeded: 10,
        skillsNeeded: 50,
        next: { name: "Ultimate Milestone", g: 12, s: 66 }
      };
    } else if (games >= 8 && skills >= 34) {
      return {
        name: "Milestone 2",
        base: (games * 1) + (skills * 0.5),
        bonus: 15,
        gamesNeeded: 8,
        skillsNeeded: 34,
        next: { name: "Milestone 3", g: 10, s: 50 }
      };
    } else if (games >= 6 && skills >= 18) {
      return {
        name: "Milestone 1",
        base: (games * 1) + (skills * 0.5),
        bonus: 5,
        gamesNeeded: 6,
        skillsNeeded: 18,
        next: { name: "Milestone 2", g: 8, s: 34 }
      };
    } else {
      return {
        name: "No Milestone Yet",
        base: (games * 1) + (skills * 0.5),
        bonus: 0,
        gamesNeeded: 0,
        skillsNeeded: 0,
        next: { name: "Milestone 1", g: 6, s: 18 }
      };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium text-sm">
          <Target className="w-4 h-4" />
          <span>Facilitator Milestone Calculator</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Track Your Facilitator Progress
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Enter your public Google Cloud Skills Boost profile URL to see which milestone you've reached for the 2026 program.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="url"
              placeholder="https://www.cloudskillsboost.google/public_profiles/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Progress'}
          </button>
        </form>
        {data && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-center">
            <Link to="/my-progress" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto">
              View Detailed Progress & Share Card
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {loading && (
          <div className="mt-8 mb-4">
            <ArcadeLoader />
          </div>
        )}

        {error && !loading && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 sm:p-5 flex items-start gap-3">
        <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-200/80 leading-relaxed">
          <strong>Eligible Date Window:</strong> Only badges earned between <strong>Jul 13 (5PM IST)</strong> and <strong>Sep 14 (11:59PM IST) 2026</strong> count. Only Arcade Game Badges and Skill Badges are eligible. Trivia and Lab-free courses do not count for the Facilitator bonus program.
        </p>
      </div>

      {data && (
        <div className="space-y-8 animate-in fade-in duration-500 pt-4">
          


          {/* Section 1: Header Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              {data.avatarUrl ? (
                <img src={data.avatarUrl} alt="Profile" className="w-12 h-12 rounded-full bg-slate-100" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {data.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{data.name}</h3>
                <p className="text-sm text-slate-500">Google Cloud Skills Boost Profile</p>
              </div>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Facilitator Window: Jul 13 – Sep 14
            </div>
          </div>

          {/* Removed conditionals to always display the breakdown */}
          {(() => {
            const isBeforeStart = new Date() < new Date('2026-07-13T00:00:00Z');
            const isAfterEnd = new Date() > new Date('2026-09-14T18:29:00Z');
            const displayGameBadges = isBeforeStart ? 0 : data.gameBadges;
            const displaySkillBadges = isBeforeStart ? 0 : data.skillBadges;
            
            const status = getMilestoneStatus(displayGameBadges, displaySkillBadges);
            const hasMilestone = status.name !== "No Milestone Yet";
            const isUltimate = status.name === "Ultimate Milestone";

            return (
              <>
                {/* Status Message (if any) */}
                {isBeforeStart ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700 shadow-sm mb-6 mt-8">
                    <AlertCircle className="w-8 h-8 text-[#EA4335] mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Program Not Started</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                      The facilitator program window begins July 13, 2026 at 5:00 PM IST.
                    </p>
                  </div>
                ) : isAfterEnd ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700 shadow-sm mb-6 mt-8">
                    <AlertCircle className="w-8 h-8 text-[#4285F4] mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Program has Ended</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                      The facilitator program window ended on Sep 14, 2026 at 11:59 PM IST.
                    </p>
                  </div>
                ) : displayGameBadges === 0 && displaySkillBadges === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700 shadow-sm mb-6 mt-8">
                    <AlertCircle className="w-8 h-8 text-[#EA4335] mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Eligible Badges Found</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                      No eligible badges found between Jul 13 – Sep 14, 2026 yet.
                    </p>
                  </div>
                ) : null}

                {/* Section 2: Eligible Badge Count Cards */}
                <div className="space-y-2 mb-8 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#4285F4]/10 p-3 rounded-xl text-[#4285F4]">
                          <Gamepad2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Game Badges</h4>
                          <p className="text-sm text-slate-500">{displayGameBadges} badges</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#4285F4]">
                        {(displayGameBadges * 1).toFixed(1)} pts
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#7c3aed]/10 p-3 rounded-xl text-[#7c3aed]">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Skill Badges</h4>
                          <p className="text-sm text-slate-500">{displaySkillBadges} badges</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#7c3aed]">
                        {(displaySkillBadges * 0.5).toFixed(1)} pts
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    * Trivia and Lab-free badges are not counted for the facilitator bonus.
                  </p>
                </div>

                {/* Section 4 & 5: Current Milestone & Progress */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Status Card */}
                  <div className={`rounded-2xl p-6 border shadow-sm flex flex-col justify-center
                    ${hasMilestone 
                      ? 'bg-[#34A853]/5 dark:bg-[#34A853]/10 border-[#34A853]/20 dark:border-[#34A853]/30' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Current Status</h3>
                    <h2 className={`text-3xl font-bold mb-4 ${hasMilestone ? 'text-[#34A853]' : 'text-slate-900 dark:text-white'}`}>
                      {status.name}
                    </h2>
                    
                    {hasMilestone ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#34A853] font-medium">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>✅ {displayGameBadges}/{status.gamesNeeded} Games · ✅ {displaySkillBadges}/{status.skillsNeeded} Skills</span>
                        </div>
                        <div className="inline-block bg-[#34A853]/10 text-[#34A853] px-4 py-2 rounded-lg font-bold">
                          🎉 +{status.bonus} bonus points earned!
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400">
                          You haven't reached Milestone 1 yet. Keep completing badges!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress to Next */}
                  {!isUltimate && status.next && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                        Progress to {status.next.name}
                      </h3>
                      
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Game Badges</span>
                            <span className="font-bold text-[#4285F4]">{displayGameBadges} / {status.next.g}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-[#4285F4] h-2.5 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min(100, (displayGameBadges / status.next.g) * 100)}%` }}
                            ></div>
                          </div>
                          {displayGameBadges < status.next.g && (
                            <p className="text-xs text-slate-500 mt-1">Need {status.next.g - displayGameBadges} more</p>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Skill Badges</span>
                            <span className="font-bold text-[#7c3aed]">{displaySkillBadges} / {status.next.s}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-[#7c3aed] h-2.5 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min(100, (displaySkillBadges / status.next.s) * 100)}%` }}
                            ></div>
                          </div>
                          {displaySkillBadges < status.next.s && (
                              <p className="text-xs text-slate-500 mt-1">Need {status.next.s - displaySkillBadges} more</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

            {/* Section 3: Points Breakdown & Bonus Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Breakdown Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm font-mono text-sm">
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-lg mb-4">Points Breakdown</h3>
                  
                  <div className="space-y-3 text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Game Badges ({data.gameBadges} × 1 pt):</span>
                      <span className="font-bold text-slate-900 dark:text-white">{(data.gameBadges * 1).toFixed(1)} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skill Badges ({data.skillBadges} × 0.5 pt):</span>
                      <span className="font-bold text-slate-900 dark:text-white">{(data.skillBadges * 0.5).toFixed(1)} pts</span>
                    </div>
                    
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />
                    
                    <div className="flex justify-between">
                      <span>Base Total:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{getMilestoneStatus(data.gameBadges, data.skillBadges).base.toFixed(1)} pts</span>
                    </div>
                    <div className="flex justify-between text-[#34A853]">
                      <span>Milestone Bonus:</span>
                      <span className="font-bold">+{getMilestoneStatus(data.gameBadges, data.skillBadges).bonus} pts</span>
                    </div>
                    
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />
                    
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-slate-900 dark:text-white">Total Facilitator Points:</span>
                      <span className="font-bold text-[#4285F4]">
                        {(getMilestoneStatus(data.gameBadges, data.skillBadges).base + getMilestoneStatus(data.gameBadges, data.skillBadges).bonus).toFixed(1)} pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 7: Bonus Milestone Card */}
                {(() => {
                  const milestone1Achieved = data.gameBadges >= 6 && data.skillBadges >= 18;
                  const eligible = bonusMilestone.enrolled && bonusMilestone.gearProfileBadge && milestone1Achieved;
                  const allStepsComplete = eligible && data.gearBadgesCount === 4 && bonusMilestone.freeTrialSignedUp && bonusMilestone.firstAgentBuilt && bonusMilestone.submitted;
                  const basePoints = getMilestoneStatus(data.gameBadges, data.skillBadges).base;
                  const milestoneBonus = getMilestoneStatus(data.gameBadges, data.skillBadges).bonus;
                  const potentialTotal = basePoints + milestoneBonus + (allStepsComplete ? 10 : 0);

                  return (
                    <div className="bg-gradient-to-br from-[#FBBC05]/10 to-yellow-50 dark:from-[#FBBC05]/10 dark:to-yellow-900/10 rounded-2xl p-6 border border-[#FBBC05]/40 shadow-sm flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Award className="w-8 h-8 text-[#FBBC05]" />
                          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">Bonus Milestone</h3>
                        </div>
                        <a href="/resources/bonus-milestone" className="text-sm font-medium text-[#2563eb] hover:underline flex items-center gap-1">
                          <Info className="w-4 h-4" /> How to earn +10
                        </a>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                          <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusMilestone.enrolled} onChange={e => setBonusMilestone({...bonusMilestone, enrolled: e.target.checked})} />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">1. Enrolled in Facilitator Cohort</p>
                            <p className="text-sm text-slate-500">I have received my official enrollment email.</p>
                          </div>
                        </label>

                        <div className={`flex items-start gap-3 p-3 rounded-lg border ${milestone1Achieved ? 'border-[#34A853]/30 bg-[#34A853]/5' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                          <div className="mt-1">
                            {milestone1Achieved ? <CheckCircle2 className="w-5 h-5 text-[#34A853]" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">2. Reach Milestone 1</p>
                            <p className="text-sm text-slate-500">Auto-detected ({milestone1Achieved ? 'Complete' : 'Pending'})</p>
                          </div>
                        </div>

                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                          <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusMilestone.gearProfileBadge} onChange={e => setBonusMilestone({...bonusMilestone, gearProfileBadge: e.target.checked})} />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">3. GEAR Badge on Developer Profile</p>
                            <p className="text-sm text-slate-500">I have the GEAR badge on my primary Google Developer profile.</p>
                          </div>
                        </label>
                      </div>

                      {eligible ? (
                        <div className="space-y-3 mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                          <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Final Verification Steps</h4>
                          
                          <div className={`flex items-center gap-3 p-2 rounded-md ${data.gearBadgesCount === 4 ? 'text-[#34A853]' : 'text-slate-700 dark:text-slate-300'}`}>
                            {data.gearBadgesCount === 4 ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />}
                            <span className="font-medium text-sm">4 GEAR Skill Badges ({data.gearBadgesCount}/4 detected)</span>
                          </div>

                          <label className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                            <input type="checkbox" className="w-5 h-5 rounded text-[#FBBC05]" checked={bonusMilestone.freeTrialSignedUp} onChange={e => setBonusMilestone({...bonusMilestone, freeTrialSignedUp: e.target.checked})} />
                            <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Signed up for Google Cloud Free Trial</span>
                          </label>

                          <label className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                            <input type="checkbox" className="w-5 h-5 rounded text-[#FBBC05]" checked={bonusMilestone.firstAgentBuilt} onChange={e => setBonusMilestone({...bonusMilestone, firstAgentBuilt: e.target.checked})} />
                            <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Built first AI agent</span>
                          </label>

                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" className="w-5 h-5 rounded text-[#FBBC05]" checked={bonusMilestone.submitted} onChange={e => setBonusMilestone({...bonusMilestone, submitted: e.target.checked})} />
                              <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Submitted Google Form (LIVE)</span>
                            </label>
                            <a href="https://forms.gle/MMfH5RKp83TfRtXj9" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#FBBC05] hover:underline whitespace-nowrap ml-2">
                              Open Form
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400 text-sm">
                          Complete the top 3 requirements to unlock the final verification steps.
                        </div>
                      )}

                      <div className="flex justify-between items-center text-lg font-bold p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-900 dark:text-white">Potential Total:</span>
                        <span className={allStepsComplete ? 'text-[#34A853]' : 'text-slate-500'}>{potentialTotal.toFixed(1)} pts</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Section 6: All Milestones Overview */}
              <MilestoneProgress gameBadges={data.gameBadges} skillBadges={data.skillBadges} />
              
              {/* Section 7: Completed Skill Badges */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#4285F4]" />
                  Completed Skill Badges
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-3xl">
                  Showing all skill badges you have earned. Badges completed within the active program timeline (July 13 - Sep 14, 2026) are highlighted in green and count towards your milestones. Badges earned outside this timeline are shown in gray.
                </p>
                
                {data.allSkillBadges.length === 0 ? (
                  <div className="text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    No skill badges found on this profile.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {data.allSkillBadges.map((badge, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border text-sm flex flex-col justify-between transition-colors ${badge.validForProgram ? 'bg-[#34A853]/5 dark:bg-[#34A853]/10 border-[#34A853]/30 hover:border-[#34A853]/50' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                        <div className={`font-medium mb-3 line-clamp-3 ${badge.validForProgram ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                          {badge.title}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-500">{badge.earnedDate}</span>
                          {badge.validForProgram ? (
                            <div className="flex items-center gap-1 text-xs font-bold text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Counted
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                              Not Counted
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 8: Completed Game Badges */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-[#EA4335]" />
                  Completed Game Badges
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-3xl">
                  Showing all arcade game badges you have earned. Like skill badges, those completed within the timeline are highlighted and counted.
                </p>
                
                {data.allGameBadges.length === 0 ? (
                  <div className="text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    No game badges found on this profile.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {data.allGameBadges.map((badge, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border text-sm flex flex-col justify-between transition-colors ${badge.validForProgram ? 'bg-[#34A853]/5 dark:bg-[#34A853]/10 border-[#34A853]/30 hover:border-[#34A853]/50' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                        <div className={`font-medium mb-3 line-clamp-3 ${badge.validForProgram ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                          {badge.title}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-500">{badge.earnedDate}</span>
                          {badge.validForProgram ? (
                            <div className="flex items-center gap-1 text-xs font-bold text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Counted
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                              Not Counted
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
        </div>
      )}
    </div>
  );
}
