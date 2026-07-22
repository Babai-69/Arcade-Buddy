import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BonusMilestoneTrackerProps {
  gameBadges: number;
  skillBadges: number;
  badges: any[];
}

export function BonusMilestoneTracker({ gameBadges, skillBadges, badges = [] }: BonusMilestoneTrackerProps) {
  const gearBadgeTitles = [
    "create your first gemini enterprise application",
    "engineer ai agents with agent development kit (adk)",
    "deploy multi-agent architectures",
    "orchestrate multi-agent workflows with gemini enterprise"
  ];
  
  const gearBadgesCount = badges.filter(b => 
    gearBadgeTitles.includes(b.title.toLowerCase().trim()) && b.validForProgram
  ).length;
  // Load state from local storage or set default
  const [bonusState, setBonusState] = useState(() => {
    const saved = localStorage.getItem('arcade_bonus_milestone_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      enrolled: false,
      gearProfileBadge: false,
      freeTrialSignedUp: false,
      firstAgentBuilt: false,
      submitted: false
    };
  });

  useEffect(() => {
    localStorage.setItem('arcade_bonus_milestone_state', JSON.stringify(bonusState));
  }, [bonusState]);

  const milestone1Achieved = gameBadges >= 6 && skillBadges >= 18;
  const eligible = bonusState.enrolled && bonusState.gearProfileBadge && milestone1Achieved;
  const allStepsComplete = eligible && gearBadgesCount >= 4 && bonusState.freeTrialSignedUp && bonusState.firstAgentBuilt && bonusState.submitted;

  return (
    <div className="bg-gradient-to-br from-[#FBBC05]/10 to-yellow-50 dark:from-[#FBBC05]/10 dark:to-yellow-900/10 rounded-2xl p-6 border border-[#FBBC05]/40 shadow-sm flex flex-col justify-center my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-[#FBBC05]" />
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">Bonus Milestone Tracker</h3>
        </div>
        <Link to="/resources/bonus-milestone" className="text-sm font-medium text-[#2563eb] hover:underline flex items-center gap-1">
          <Info className="w-4 h-4" /> How to earn +10
        </Link>
      </div>
      
      <div className="space-y-3 mb-6">
        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
          <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusState.enrolled} onChange={e => setBonusState({...bonusState, enrolled: e.target.checked})} />
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
          <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusState.gearProfileBadge} onChange={e => setBonusState({...bonusState, gearProfileBadge: e.target.checked})} />
          <div>
            <p className="font-bold text-slate-900 dark:text-white">3. GEAR Badge on Developer Profile</p>
            <p className="text-sm text-slate-500">I have the GEAR badge on my primary Google Developer profile.</p>
          </div>
        </label>
      </div>

      <div className={`transition-all duration-500 overflow-hidden ${eligible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="h-px bg-amber-200 dark:bg-amber-800/50 w-full mb-6" />
        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold">4</span>
          Complete the Bonus Steps
        </h4>
        
        <div className="space-y-3">
          <div className={`flex items-start gap-3 p-3 rounded-lg border ${gearBadgesCount >= 4 ? 'border-[#34A853]/30 bg-[#34A853]/5' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
            <div className="mt-1">
              {gearBadgesCount >= 4 ? <CheckCircle2 className="w-5 h-5 text-[#34A853]" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">All 4 GEAR Badges Earned</p>
              <p className="text-sm text-slate-500">Auto-detected from profile ({gearBadgesCount}/4)</p>
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusState.freeTrialSignedUp} onChange={e => setBonusState({...bonusState, freeTrialSignedUp: e.target.checked})} />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Signed up for Free Trial</p>
              <p className="text-sm text-slate-500">Or already have a billing account</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusState.firstAgentBuilt} onChange={e => setBonusState({...bonusState, firstAgentBuilt: e.target.checked})} />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Built first AI Agent</p>
              <p className="text-sm text-slate-500">Using Vertex AI Agent platform</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-900/10 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#FBBC05] focus:ring-[#FBBC05]" checked={bonusState.submitted} onChange={e => setBonusState({...bonusState, submitted: e.target.checked})} />
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-100">Submitted Google Form</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">I have submitted my Project ID and Billing Account ID.</p>
              <div className="mt-2">
                <a href="https://forms.gle/MMfH5RKp83TfRtXj9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" onClick={e => e.stopPropagation()}>
                  Open Form
                </a>
              </div>
            </div>
          </label>
        </div>

        <div className={`mt-6 p-4 rounded-xl border ${allStepsComplete ? 'bg-[#34A853]/10 border-[#34A853]/30 text-green-800 dark:text-green-300' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold">Bonus Status:</span>
            {allStepsComplete ? (
              <span className="flex items-center gap-2 font-bold text-[#34A853]">
                <CheckCircle2 className="w-5 h-5" />
                Eligible for +10 Points
              </span>
            ) : (
              <span className="font-medium">Complete all steps above to qualify</span>
            )}
          </div>
        </div>
      </div>
      
      {!eligible && !milestone1Achieved && (
        <div className="mt-4 text-sm text-amber-800 dark:text-amber-400 font-medium text-center">
          Reach Milestone 1 first to unlock the remaining checklist steps!
        </div>
      )}
    </div>
  );
}
