import React from 'react';
import { Gamepad2, Award, Zap, Trophy, Link as LinkIcon, Calculator, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ArcadePointsSystem() {
  return (
    <div className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 p-6 md:p-10 font-sans max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          <span className="text-[#4285F4]">Google Cloud Arcade</span>{' '}
          <span className="bg-[#FBBC04] text-slate-900 px-3 py-1 rounded-lg inline-block transform -rotate-2">Points</span>
          <br />
          <span className="bg-[#FBBC04] text-slate-900 px-3 py-1 rounded-lg inline-block transform rotate-1 mt-2">&amp; Badge System</span>{' '}
          <span className="text-slate-900 dark:text-white">Explained</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Complete breakdown of how Arcade points are earned, how <strong className="text-slate-900 dark:text-slate-200">Skill Badges (0.5 Pts)</strong> and <strong className="text-slate-900 dark:text-slate-200">Game Badges (1 Pt)</strong> are calculated, and how <span className="text-[#4285F4] font-semibold">Facilitator Bonus Milestones</span> boost your total score.
        </p>
      </div>

      {/* 2x2 Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Card 1: Game Badges */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <Gamepad2 className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold">Monthly Game Badges (1 Point Each)</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            Google Cloud releases <strong className="text-slate-800 dark:text-slate-200">6 new Game Badges in total each month</strong>. Every completed monthly Game Badge awards <strong className="text-slate-800 dark:text-slate-200">1 Arcade Point</strong> directly to your account.
          </p>
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">6 Badges Monthly</strong> — 6 unique game badges released monthly.</p></li>
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">1 Arcade Pt / Badge</strong> — Each game badge gives 1 point.</p></li>
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">Up to 6 Pts / Month</strong> — Earn up to 6 Pts per month.</p></li>
          </ul>
          <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4 text-center mt-auto">
            <div className="text-[10px] font-bold text-blue-500 tracking-wider mb-2 uppercase">Game Badge Conversion</div>
            <div className="flex items-center justify-center gap-2 font-bold text-sm">
              <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">1 Game Badge</span>
              <span>=</span>
              <span className="bg-[#6366f1] text-white px-3 py-1.5 rounded-lg shadow-sm">1 Arcade Point</span>
            </div>
          </div>
        </div>

        {/* Card 2: Skill Badges */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-50 dark:bg-orange-900/30 p-2.5 rounded-xl border border-orange-100 dark:border-orange-800/50">
              <Award className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold">Skill Badges (0.5 Points Each)</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            Skill Badges test hands-on lab expertise on Google Cloud Skills Boost. Each completed Skill Badge is worth <strong className="text-slate-800 dark:text-slate-200">0.5 Arcade Points (2 Skill Badges = 1 Point)</strong>.
          </p>
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">0.5 Pts / Badge</strong> — Earn 0.5 points per badge (2 Badges = 1 Pt).</p></li>
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">95+ Unlocked Badges</strong> — Available to earn anytime right from day one.</p></li>
            <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /><p><strong className="text-slate-800 dark:text-slate-200">Facilitator Timing</strong> — Recommended to complete after Facilitator launch for bonus points.</p></li>
          </ul>
          <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-4 text-center mt-auto">
            <div className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 tracking-wider mb-2 uppercase">Skill Badge Conversion</div>
            <div className="flex items-center justify-center gap-2 font-bold text-sm">
              <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">2 Skill Badges</span>
              <span>=</span>
              <span className="bg-[#6366f1] text-white px-3 py-1.5 rounded-lg shadow-sm">1 Arcade Point</span>
            </div>
          </div>
        </div>

        {/* Card 3: Work Meets Play */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-50 dark:bg-purple-900/30 p-2.5 rounded-xl border border-purple-100 dark:border-purple-800/50">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold">Work Meets Play Series (Jan – June)</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            The special <strong className="text-slate-800 dark:text-slate-200">Work Meets Play</strong> series ran from <strong className="text-slate-800 dark:text-slate-200">January to June</strong>. Each month during this period, 1 Work Meets Play badge awarded <strong className="text-slate-800 dark:text-slate-200">1 Arcade Point</strong> to the first 50 completing users.
          </p>
          <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-xl p-4 text-center mt-auto">
            <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 tracking-wider mb-2 uppercase flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" /> Series Completion Bonus (7 Points Total)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Completing the entire 6-badge Work Meets Play series (Jan – June) guarantees you <strong className="text-slate-800 dark:text-slate-200">7 total Arcade Points</strong> at the end of the program!
            </p>
          </div>
        </div>

        {/* Card 4: Facilitator Program */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
              <Trophy className="w-6 h-6 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold">Arcade Facilitator Program (Up to +45 Bonus Pts)</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            The <strong className="text-slate-800 dark:text-slate-200">Arcade Facilitator Program</strong> is the main seasonal event where learners enrolled under an official Facilitator earn milestone bonus points (<strong className="text-[#6366f1]">+5 to +35 Pts</strong>) by completing designated combinations of Game and Skill Badges.
          </p>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4 text-center mt-auto">
            <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider mb-2 uppercase flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3" /> Vertex AI Bonus Task (+10 Pts)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Participants can also complete an extra hands-on <strong className="text-slate-800 dark:text-slate-200">Bonus Milestone Task (+10 Pts)</strong> on Vertex AI, bringing your total potential bonus to <strong className="text-emerald-600 dark:text-emerald-400">+45 Bonus Points</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* Prize Swag Tiers */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-slate-500 mb-4 uppercase">
          <Award className="w-3 h-3" /> Prize Redemption
        </div>
        <h2 className="text-2xl font-bold mb-6">Arcade Prize Swag Tiers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Trooper */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 w-full rounded-xl flex justify-center items-center py-6 mb-4 h-32">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Trooper.png?raw=true" alt="Trooper Tier" className="w-20 h-20 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-sm">Trooper Tier</h3>
              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30">50 PTS</span>
            </div>
            <div className="w-full space-y-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> TIER ONE • 5,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Arcade 2026</div>
            </div>
          </div>

          {/* Ranger */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 w-full rounded-xl flex justify-center items-center py-6 mb-4 h-32">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Ranger.png?raw=true" alt="Ranger Tier" className="w-20 h-20 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-sm">Ranger Tier</h3>
              <span className="text-[10px] font-bold text-purple-500 bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/30">75 PTS</span>
            </div>
            <div className="w-full space-y-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> TIER TWO • 4,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Arcade 2026</div>
            </div>
          </div>

          {/* Champion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 w-full rounded-xl flex justify-center items-center py-6 mb-4 h-32">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Champian.png?raw=true" alt="Champion Tier" className="w-20 h-20 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-sm">Champion Tier</h3>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">95 PTS</span>
            </div>
            <div className="w-full space-y-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> TIER MAX • 2,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Arcade 2026</div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl"></div>
            <div className="bg-slate-50 dark:bg-slate-800/50 w-full rounded-xl flex justify-center items-center py-6 mb-4 h-32 relative z-10">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Legend.png?raw=true" alt="Legend Tier" className="w-20 h-20 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-sm">Legend Tier</h3>
              <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-200 dark:border-yellow-500/30">120 PTS</span>
            </div>
            <div className="w-full space-y-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> TOP TIER MAX • 2,500 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Arcade 2026</div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#111827] text-white rounded-3xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FBBF24] mb-3 uppercase">
            <Zap className="w-3 h-3" /> Automated Arcade Points Calculator
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
            No More Manual Tracking — Calculate Points Instantly! <span className="text-red-500">⚡</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-3xl mb-8 leading-relaxed">
            Why waste time manually counting game badges, skill badges, and milestone bonuses? ArcadeBuddy automatically parses your public Google Skills Boost profile, calculates your exact Arcade points in real-time, and predicts your swag prize tier eligibility instantly.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/calculator" className="bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg">
              Calculate My Points Now
            </Link>
            <Link to="/syllabus" className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-slate-700">
              View Badge Catalog <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
