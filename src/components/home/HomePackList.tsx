import React from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  History,
  LayoutGrid,
  Trophy,
  Sparkles,
  Gift,
} from 'lucide-react';

const features = [
  {
    num: '01',
    icon: Calculator,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    title: 'Instant Arcade Points Calculation',
    desc: 'Automatically fetch and calculate your Arcade points from your SkillBoost profile with real-time updates.',
  },
  {
    num: '02',
    icon: History,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    title: 'Progress & Achievements Timeline',
    desc: 'Track your arcade progress through a beautiful timeline of completed challenges and earned badges.',
  },
  {
    num: '03',
    icon: LayoutGrid,
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-50 dark:bg-purple-900/30',
    title: 'Multi-Account Dashboard',
    desc: 'Manage and compare multiple Arcade accounts from a single dashboard. Easily switch profiles and view all your stats at a glance.',
  },
  {
    num: '04',
    icon: Trophy,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    title: 'Live Leaderboards & Events',
    desc: 'Dominate the competition with live leaderboard rankings and real-time event updates—compete harder, climb faster, and celebrate your wins instantly.',
  },
  {
    num: '05',
    icon: Sparkles,
    iconColor: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-50 dark:bg-rose-900/30',
    title: 'Elegant, Intuitive Interface',
    desc: 'Experience a sleek, modern dashboard crafted for focus and simplicity—so you can navigate your arcade journey with style and zero distractions.',
  },
  {
    num: '06',
    icon: Gift,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    title: 'Unlock Exclusive Rewards',
    desc: 'Rise to the top, unlock exclusive rewards from the Arcade team, and celebrate achievements that truly set you apart.',
  },
];

export function HomePackList() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-2 block font-display">
            PACK LIST
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Built to go beyond the Arcade
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Everything you need to master the Arcade points system, beautifully organized and always at your fingertips.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-3xl p-7 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feat.icon className={`w-6 h-6 ${feat.iconColor}`} />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    {feat.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2.5 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
