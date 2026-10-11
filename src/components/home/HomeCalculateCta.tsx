import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, Sparkles, Compass } from 'lucide-react';

export function HomeCalculateCta() {
  const [profileUrl, setProfileUrl] = useState('');
  const navigate = useNavigate();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileUrl.trim()) {
      navigate(`/calculator?profile=${encodeURIComponent(profileUrl.trim())}`);
    } else {
      navigate('/calculator');
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2.5rem] p-8 sm:p-12 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-purple-50/70 dark:from-slate-800/95 dark:via-slate-800/70 dark:to-indigo-950/40 border border-blue-200/80 dark:border-slate-700/80 shadow-xl overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block font-display">
              LOG YOUR COORDINATES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Calculate your Arcade points now
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Enter your Skills Boost profile URL and see your arcade points, skill badges, and milestone progress in seconds with our specialized calculator.
            </p>

            {/* Input Form */}
            <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xs transition-all"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all hover:scale-102 whitespace-nowrap flex-shrink-0"
              >
                <span>Calculate Points</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Official Disclaimer */}
            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Disclaimer: </span>
              This is an independent, unofficial points calculator for Arcade 2026. It is not affiliated with, sponsored by, or endorsed by Google LLC. Results are provided for reference only. Always verify important information with official Google Cloud arcade resources.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
