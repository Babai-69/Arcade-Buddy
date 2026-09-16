import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Snowflake, Shield, Zap, Star, Crown, AlertTriangle, Megaphone, Target, ArrowDownCircle, Info, Truck, CheckCircle2, Route, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SnowballWidget } from '../components/SnowballWidget';

export function SwagDistributionSystemPage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0d1117]">
      <div className="max-w-5xl mx-auto">
        <Link to="/resources" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Resources
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Tier Swag <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Distribution</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Understand the Google Cloud Arcade 2026 Waterfall Tier System, capacity limits, and how your rewards roll forward.
            </p>
          </div>

          {/* Announcement Header */}
          <div className="bg-indigo-600 dark:bg-indigo-900/50 rounded-[2rem] p-8 md:p-10 shadow-lg text-white mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 dark:bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Megaphone className="w-8 h-8 text-indigo-200" />
                <h2 className="text-2xl font-bold">Big News Day!</h2>
              </div>
              <p className="text-indigo-100 leading-relaxed mb-8 max-w-3xl">
                We are finally announcing the Google Skills Arcade 2026 prize tiers! We know how much strategy goes into building your skills, so we wanted to give you the exact blueprint early. Our goal is to ensure rewards go to genuine learners on a level playing field.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-700/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-5 h-5 text-indigo-300" />
                    <h3 className="font-bold text-lg">Outgrowing the Training Wheels</h3>
                  </div>
                  <p className="text-sm text-indigo-100/80 leading-relaxed">
                    The <strong>Novice tier has officially left the building!</strong> Since this is a full year-long journey, none of you will stay a novice. We're focusing all rewards on the four major milestones.
                  </p>
                </div>
                <div className="bg-indigo-700/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-5 h-5 text-indigo-300" />
                    <h3 className="font-bold text-lg">Limited Spots (Plenty of Room!)</h3>
                  </div>
                  <p className="text-sm text-indigo-100/80 leading-relaxed">
                    For the first time, we are putting a <strong>limit on how many people can get prizes in each tier</strong>. Don't worry—these limits are much higher than the total claimed last year. As long as you play fair, there is room for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* The Waterfall Effect Section */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 blur-3xl rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <ArrowDownCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Waterfall Effect</h2>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">First-Come, First-Served Rolldown</p>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-[15px]">
                To ensure your hard work is rewarded, we are using a <strong>“Waterfall System”</strong>. The Arcade Prize Counter operates on a strict first-come, first-served basis starting from the Legend Tier. If a tier’s prize pool fills up before you can claim it, you don’t lose out—your eligibility safely rolls down to the next tier below.
              </p>

              <div className="space-y-4 mb-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-l-[#EA4335] border-y border-r border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Crown className="w-5 h-5 text-[#EA4335]" /> Arcade Legend Tier
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      The very first 2,500 players get Legend prizes. Once gone, anyone else automatically "waterfalls" down.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[#EA4335] font-black text-xl">120+ Pts</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">2,500 Spots</div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-l-[#FBBC05] border-y border-r border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#FBBC05]" /> Arcade Champion Tier
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      First 3,000 players (including roll-downs from Legend) get Champion prizes. Then, rolls down to Ranger.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[#FBBC05] font-black text-xl">95–119 Pts</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">3,000 Spots</div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-l-[#34A853] border-y border-r border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#34A853]" /> Arcade Ranger Tier
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      First 4,000 players (including higher roll-downs) get Ranger prizes. Then, rolls down to Trooper.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[#34A853] font-black text-xl">75–94 Pts</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">4,000 Spots</div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-l-[#4285F4] border-y border-r border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#4285F4]" /> Arcade Trooper Tier
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      The first 6,000 players to reach or roll down to this tier get Arcade Trooper prizes.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[#4285F4] font-black text-xl">50–74 Pts</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">6,000 Spots</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <strong>Example:</strong> If you earn 120+ points but miss out on the initial 2,500 Legend slots, you are automatically placed at the front of the line for Champion Tier prizes. This creates a chain reaction. Because every single tier has a max cap, the earlier you lock in your points, the higher up the waterfall you stay!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Waterfall Distribution Animation</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See how rewards cascade visually when higher tiers reach capacity.</p>
          </div>
          <div className="bg-[#0d1117] rounded-[2rem] shadow-xl overflow-hidden border border-slate-800 mb-12">
            <iframe 
              src="/tier-waterfall.html" 
              className="w-full h-full border-0" 
              style={{ minHeight: '700px' }}
              title="Tier Waterfall Animation"
            ></iframe>
          </div>

          {/* The Snowball Effect Section (From previous update) */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 blur-3xl rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The "Snowball" Effect</h2>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">How Upgrading Works</p>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-[15px]">
                If you’re new to the tier system, think of it like a <strong>“Snowball”</strong>. You never have to pick and choose between tiers when you rank up within your bracket; your rewards just keep rolling forward and getting bigger. In simple terms, you never miss out when you rank up.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Trooper -> Ranger Snowball */}
                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4 text-[#4285F4]" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Arcade Trooper Tier</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
                          This is your foundational milestone. Once you hit this points threshold, you unlock the core swag pack filled with essential gear.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-[#161b22] flex items-center justify-center text-slate-400">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-[#34A853]/30 shadow-[0_0_15px_rgba(52,168,83,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#34A853]/10 blur-xl rounded-full" />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#34A853]/10 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-[#34A853]" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Arcade Ranger Tier</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
                          The natural next step for consistent players. Unlocking <strong className="text-slate-800 dark:text-slate-200">everything from the Trooper Tier plus an additional bonus reward</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Champion -> Legend Snowball */}
                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FBBC05]/10 flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4 text-[#FBBC04]" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Arcade Champion Tier</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
                          A major leap into the upper ranks. Takes serious dedication, unlocking a high-tier collection of premium gear.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-[#161b22] flex items-center justify-center text-slate-400">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-[#EA4335]/30 shadow-[0_0_15px_rgba(234,67,53,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#EA4335]/10 blur-xl rounded-full" />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#EA4335]/10 flex items-center justify-center shrink-0">
                        <Crown className="w-4 h-4 text-[#EA4335]" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Arcade Legend Tier</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
                          The absolute summit. Reserved exclusively for those at the top, scoring <strong className="text-slate-800 dark:text-slate-200">everything from the Champion Tier plus an exclusive Legend-only reward</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-yellow-800 dark:text-yellow-500 mb-1">Important System Rule</h4>
                  <p className="text-xs text-yellow-700/80 dark:text-yellow-500/80 leading-relaxed">
                    Please note that <strong>Arcade Trooper and Arcade Ranger prizes won’t snowball into the Arcade Champion and Arcade Legend Tiers</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <SnowballWidget />

          {/* Why the Changes & Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#161b22] rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">The Story Behind the Changes</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Faster Deliveries</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Knowing order quantities ahead of time allows us to pre-order and fast-track shipping. We rebuilt the back-end pipeline to eliminate bottlenecks.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Total Fairness</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      New guardrails are in place to stop hoarders, protecting the rewards for real learners. Eligibility and redemption rules are strictly enforced.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-400">
                    <Route className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">A Year-Long Marathon</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Since this season spans the entire year, the point milestones are built for a steady, long-term journey. You've got plenty of time to crush it!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#161b22] rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">How to Track Your Status</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-bold text-blue-900 dark:text-blue-300">Check Remaining Spots</h4>
                  </div>
                  <p className="text-sm text-blue-800/80 dark:text-blue-400/80 leading-relaxed">
                    A real-time tracker will be updated every single week right on the Arcade Page. Check back weekly to see how many spots are left before a tier fills up!
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-bold text-purple-900 dark:text-purple-300">Keeping Score</h4>
                  </div>
                  <p className="text-sm text-purple-800/80 dark:text-purple-400/80 leading-relaxed">
                    Keep an eye out for the monthly <strong>Arcade Insider email</strong>, showing your exact total of Arcade Points earned so far this season. You can also use the ArcadeBuddy Points Calculator at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
