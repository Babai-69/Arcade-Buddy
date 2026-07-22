import React, { useState } from 'react';
import { Award, CheckCircle2, Info } from 'lucide-react';

export function MilestoneOverview({ data }: { data: any }) {
  const [bonusMilestone, setBonusMilestone] = useState({
    enrolled: false,
    gearProfileBadge: false,
    freeTrialSignedUp: false,
    firstAgentBuilt: false,
    submitted: false
  });

  const validGameBadges = data.badges.filter((b: any) => b.category === 'Game' && b.validForProgram).length;
  const validSkillBadges = data.badges.filter((b: any) => b.category === 'Skill' && b.validForProgram).length;
  
  const gearBadgeTitles = [
    "create your first gemini enterprise application",
    "engineer ai agents with agent development kit (adk)",
    "deploy multi-agent architectures",
    "orchestrate multi-agent workflows with gemini enterprise"
  ];
  const gearBadgesCount = Math.min(4, data.badges.filter((b: any) => 
    b.validForProgram && gearBadgeTitles.includes(b.id || b.title.toLowerCase().trim())
  ).length);

  const getMilestoneStatus = (games: number, skills: number) => {
    if (games >= 12 && skills >= 66) return { name: "Ultimate Milestone", base: (games * 1) + (skills * 0.5), bonus: 35, gamesNeeded: 12, skillsNeeded: 66, next: null };
    if (games >= 10 && skills >= 50) return { name: "Milestone 3", base: (games * 1) + (skills * 0.5), bonus: 25, gamesNeeded: 10, skillsNeeded: 50, next: { name: "Ultimate Milestone", g: 12, s: 66 } };
    if (games >= 8 && skills >= 34) return { name: "Milestone 2", base: (games * 1) + (skills * 0.5), bonus: 15, gamesNeeded: 8, skillsNeeded: 34, next: { name: "Milestone 3", g: 10, s: 50 } };
    if (games >= 6 && skills >= 18) return { name: "Milestone 1", base: (games * 1) + (skills * 0.5), bonus: 5, gamesNeeded: 6, skillsNeeded: 18, next: { name: "Milestone 2", g: 8, s: 34 } };
    return { name: "None", base: (games * 1) + (skills * 0.5), bonus: 0, gamesNeeded: 0, skillsNeeded: 0, next: { name: "Milestone 1", g: 6, s: 18 } };
  };

  const milestone1Achieved = validGameBadges >= 6 && validSkillBadges >= 18;
  const eligible = bonusMilestone.enrolled && bonusMilestone.gearProfileBadge && milestone1Achieved;
  const allStepsComplete = eligible && gearBadgesCount === 4 && bonusMilestone.freeTrialSignedUp && bonusMilestone.firstAgentBuilt && bonusMilestone.submitted;
  
  const basePoints = getMilestoneStatus(validGameBadges, validSkillBadges).base;
  const milestoneBonus = getMilestoneStatus(validGameBadges, validSkillBadges).bonus;
  const potentialTotal = basePoints + milestoneBonus + (allStepsComplete ? 10 : 0);

  const milestones = [
    { n: "Milestone 1", g: 6, s: 18, b: 5 },
    { n: "Milestone 2", g: 8, s: 34, b: 15 },
    { n: "Milestone 3", g: 10, s: 50, b: 25 },
    { n: "Ultimate", g: 12, s: 66, b: 35 }
  ];
  let currentTargetIndex = milestones.findIndex(m => validGameBadges < m.g || validSkillBadges < m.s);
  if (currentTargetIndex === -1) currentTargetIndex = milestones.length - 1;

  return (
    <div className="space-y-8 animate-fade-in">
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
            
            <div className={`flex items-center gap-3 p-2 rounded-md ${gearBadgesCount === 4 ? 'text-[#34A853]' : 'text-slate-700 dark:text-slate-300'}`}>
              {gearBadgesCount === 4 ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />}
              <span className="font-medium text-sm">4 GEAR Skill Badges ({gearBadgesCount}/4 detected)</span>
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

      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Milestones Overview</h3>
        
        <div className="space-y-6">
          {milestones.map((target, idx) => {
            const isCompleted = validGameBadges >= target.g && validSkillBadges >= target.s;
            const isCurrentTarget = idx === currentTargetIndex;
            const bgClass = isCompleted 
              ? 'bg-[#34A853]/5 dark:bg-[#34A853]/10 border-[#34A853]/30' 
              : isCurrentTarget
                ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 grayscale';

            return (
              <div key={idx} className={`relative p-6 rounded-2xl border transition-all ${bgClass}`}>
                {isCompleted && (
                  <div className="absolute -top-3 -right-3 bg-[#34A853] text-white p-1.5 rounded-full shadow-md">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                {isCurrentTarget && !isCompleted && (
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Current Goal
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 pr-4">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{target.n}</h4>
                    <div className="text-blue-600 dark:text-blue-400 font-medium">Requires:</div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 mt-1 space-y-1">
                      <li>• {target.g} Game Badges</li>
                      <li>• {target.s} Skill Badges</li>
                    </ul>
                    <div className="mt-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold px-4 py-2 rounded-lg text-sm shrink-0 inline-block text-center">
                      +{target.b} pts
                    </div>
                  </div>

                  <div className="md:w-2/3 grid sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-slate-900 dark:text-white">Game Badges</span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.min(validGameBadges, target.g)} / {target.g}</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (validGameBadges / target.g) * 100)}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-slate-900 dark:text-white">Skill Badges</span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.min(validSkillBadges, target.s)} / {target.s}</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (validSkillBadges / target.s) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
