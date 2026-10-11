import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export function HomeScheduleLedger() {
  const targetDate = new Date('2027-01-07T05:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with red handwritten note */}
        <div className="relative mb-12 sm:mb-14">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-1.5 block font-display">
            SCHEDULE &amp; LEDGER
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              Dates and points at a glance
            </h2>
            {/* Playful Handwritten Note */}
            <span className="text-sm font-bold text-red-500 font-serif italic tracking-wide">
              Mark your calendar! ✍️
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: Basecamp Schedule */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Basecamp Schedule
                </h3>
              </div>

              <div className="space-y-4">
                {/* Arcade Program */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                      Arcade Program
                    </span>
                  </div>
                  <div className="pl-4">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      January 1, 2026 – December 31, 2026
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Earn points from games &amp; skill badges
                    </p>
                  </div>
                </div>

                {/* Facilitator Program */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                      Facilitator Program
                    </span>
                  </div>
                  <div className="pl-4">
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      July 13, 2026 – September 14, 2026
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Earn bonus points as a facilitator
                    </p>
                  </div>
                </div>

                {/* Notice banner */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs font-medium text-amber-800 dark:text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Facilitator Program Ended</span>
                </div>
              </div>
            </div>

            {/* Prize Counter Countdown Footer */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Prize Counter Opens In</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="py-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700">
                  <span className="block text-xl font-black font-display text-blue-600 dark:text-blue-400 tabular-nums">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Days
                  </span>
                </div>
                <div className="py-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700">
                  <span className="block text-xl font-black font-display text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Hrs
                  </span>
                </div>
                <div className="py-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700">
                  <span className="block text-xl font-black font-display text-purple-600 dark:text-purple-400 tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Min
                  </span>
                </div>
                <div className="py-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700">
                  <span className="block text-xl font-black font-display text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Sec
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Point Ledger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Point Ledger
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Arcade Adventure', badge: '1 pt each', icon: '🚀' },
                  { name: 'Arcade Voyage', badge: '1 pt each', icon: '🚢' },
                  { name: 'Arcade Trail', badge: '1 pt each', icon: '🧭' },
                  { name: 'Base Camp', badge: '1 pt each', icon: '⚡' },
                  { name: 'Arcade Special', badge: 'X pt each', icon: '✨' },
                  { name: 'Skill Badge', badge: '0.5 pt each', icon: '🛠️' },
                  { name: 'Facilitator Milestones', badge: 'Bonus pts', icon: '🏆' },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between py-1 text-xs border-b border-slate-100 dark:border-slate-700/50 last:border-b-0"
                  >
                    <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <span>{row.icon}</span>
                      <span>{row.name}</span>
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50">
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              2 Skill Badges = 1 Arcade Point · Official Season 2026 Rules
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
