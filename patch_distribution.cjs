const fs = require('fs');

const content = `import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Snowflake, Shield, Zap, Star, Crown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              Understand the Google Cloud Arcade 2026 Waterfall Tier System and how rewards roll forward.
            </p>
          </div>
          
          {/* Explanation Section */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 blur-3xl rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The "Snowball" Effect</h2>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">How Prize Tiers Work</p>
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
          
          <div className="mb-4">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Waterfall Distribution Animation</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See how rewards cascade when higher tiers reach capacity.</p>
          </div>
          <div className="bg-[#0d1117] rounded-[2rem] shadow-xl overflow-hidden border border-slate-800">
            <iframe 
              src="/tier-waterfall.html" 
              className="w-full h-full border-0" 
              style={{ minHeight: '700px' }}
              title="Tier Waterfall Animation"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/SwagDistributionSystemPage.tsx', content);
