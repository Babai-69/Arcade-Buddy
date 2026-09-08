import React from 'react';
import { Award, Zap, Trophy, Calculator } from 'lucide-react';

export function MyPointsSection({ data }: { data: any }) {
  if (!data) return null;

  let programGameBadges = 0;
  let programSkillBadges = 0;

  if (data.badges) {
    data.badges.forEach((b: any) => {
      if (b.validForProgram) {
        if (b.category === 'Game') programGameBadges++;
        if (b.category === 'Skill') programSkillBadges++;
      }
    });
  }

  const basePoints = data.arcadePoints || 0;
  
  let milestoneBonus = 0;
  if (programGameBadges >= 12 && programSkillBadges >= 66) milestoneBonus = 35;
  else if (programGameBadges >= 8 && programSkillBadges >= 42) milestoneBonus = 25;
  else if (programGameBadges >= 4 && programSkillBadges >= 22) milestoneBonus = 15;
  else if (programGameBadges >= 2 && programSkillBadges >= 10) milestoneBonus = 9;

  // We'll assume the user is registered for the program if they are on the dashboard
  const totalPoints = basePoints + milestoneBonus;

  return (
    <div id="my-points" className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-xl border border-purple-200 dark:border-purple-800/50">
          <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Points Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Base Points */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
          <div className="text-slate-500 dark:text-slate-400 font-medium mb-2">Base Points</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{basePoints}</div>
          <div className="text-sm text-slate-500 mt-2">From Games & Skills</div>
        </div>

        {/* Bonus Points */}
        <div className="bg-[#F0FDF4] dark:bg-green-900/10 rounded-2xl p-6 border border-[#86EFAC] dark:border-green-800 text-center relative overflow-hidden">
          <div className="text-green-700 dark:text-green-400 font-medium mb-2 flex items-center justify-center gap-1">
            <Zap className="w-4 h-4" /> Facilitator Bonus
          </div>
          <div className="text-4xl font-black text-green-600 dark:text-green-500">+{milestoneBonus}</div>
          <div className="text-sm text-green-700/70 dark:text-green-400/70 mt-2">Based on current milestone</div>
        </div>

        {/* Total Points */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-blue-700 dark:text-blue-400 font-medium mb-2 flex items-center justify-center gap-1">
            <Trophy className="w-4 h-4" /> Total Points
          </div>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{totalPoints}</div>
          <div className="text-sm text-blue-700/70 dark:text-blue-400/70 mt-2">Base + Bonus</div>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          Point Calculation Rules
        </h4>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside ml-2">
          <li><strong>Game Badges:</strong> 1 point each</li>
          <li><strong>Skill Badges:</strong> 0.5 points each</li>
          <li><strong>Bonus Points:</strong> Earned by reaching milestones (Standard: +9, Advanced: +15, Premium: +25, Ultimate: +35)</li>
        </ul>
      </div>
    </div>
  );
}
