import React from 'react';
import { Award, Gamepad2, Info } from 'lucide-react';

export function PointsSystem() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Points System</h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
          For the badges and milestones that you complete in the Facilitator program, you will earn several "<strong>Arcade + Bonus Points</strong>" that you can <strong>REDEEM for Google Cloud prizes</strong> at the Google Skills Arcade prize counter.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          See what's the criteria of earning these points below. You can also checkout the official <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Skills Arcade website here</a> for more details on the points system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start mb-10">
        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base">
          <p>Here's what you need to know about the points system:</p>
          <ul className="space-y-4 list-disc list-outside ml-5">
            <li>
              For each <strong>"Game"</strong> badge you complete, you will be awarded with <strong>1 Arcade point</strong>. 
              <br/><span className="text-sm opacity-90">Eg: If you complete 2 game badges, you will receive 2 points & so on.</span>
            </li>
            <li>
              For every <strong>2 "Skill Badge"</strong> completions, you will be awarded with <strong>1 Arcade Point</strong>. 
              <br/><span className="text-sm opacity-90">Eg: If you complete 4 skill badges, you will receive 2 points & so on.</span>
            </li>
            <li>
              On completion of any of the <strong>milestones mentioned below</strong>, you will receive the mentioned <strong>Bonus Arcade Points</strong>. 
              <br/><em className="text-sm opacity-90">(Note: You will only receive points for the milestone that you earn and not for the ones before that.)</em>
            </li>
          </ul>
          <p>Refer to the available image for a representation of these points.</p>
        </div>
        <div className="relative">
          <img 
            src="https://services.google.com/fh/files/misc/gcaf26-points-system.png" 
            alt="Arcade Points System Example" 
            className="w-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded-2xl p-6">
        <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
          IMPORTANT NOTE <span className="font-normal italic text-sm text-slate-600 dark:text-slate-400">(Read me before seeing the milestones below)</span>:
        </h4>
        <ul className="space-y-3 list-disc list-outside ml-6 text-slate-700 dark:text-slate-300 text-sm">
          <li>
            Earning any of the milestones below does <strong>NOT</strong> make you eligible for any swags/prizes. Note that, in the facilitator program, you are mainly just earning "Bonus" points that you can accumulate and add to your "Arcade" points to reach the actual Google Skills Arcade Player achievements and thus become eligible for swags/prizes.
          </li>
          <li>
            This year we have <strong>LIMITED spots</strong> in the Arcade player achievements. While there are enough seats for everyone, we recommend that you complete your milestones below and try to reach an Arcade player achievement ASAP to secure your chances of earning prizes. More information available <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">here</a>.
          </li>
        </ul>
      </div>
    </div>
  );
}
