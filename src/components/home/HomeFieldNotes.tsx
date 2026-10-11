import React from 'react';
import { motion } from 'motion/react';
import { Sunset, Layers, Sparkles, Users, Award } from 'lucide-react';

const fieldUpdates = [
  {
    tag: 'SPRINTS SUNSET',
    icon: Sunset,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-100 dark:border-blue-900/40',
    desc: 'Google Skills Arcade Sprints and Certification Zone are being sunset so the focus stays on deeper hands-on learning.',
  },
  {
    tag: 'FEWER LABS',
    icon: Layers,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-100 dark:border-emerald-900/40',
    desc: 'The number of labs per game is being reduced to give learners more time to explore, experiment, and build confidence.',
  },
  {
    tag: 'BALANCED POINTS',
    icon: Sparkles,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-100 dark:border-sky-900/40',
    desc: 'Every game will now be worth 1 Arcade point, creating a more balanced reward system across cloud, data, and AI journeys.',
  },
  {
    tag: 'FACILITATORS',
    icon: Users,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-100 dark:border-amber-900/40',
    desc: 'Arcade Facilitators provide guidance, technical support, and practical direction whenever learners get stuck.',
  },
  {
    tag: 'NEW TIERS',
    icon: Award,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-100 dark:border-rose-900/40',
    desc: 'New Arcade Tiers and an updated Prize Counter are on the way, with the path to top tiers still designed to stay clear and achievable.',
  },
];

export function HomeFieldNotes() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] p-7 sm:p-10 md:p-12 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-lg relative overflow-hidden"
        >
          {/* Subtle Top Right Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-1.5 block font-display">
              FIELD NOTES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-3">
              What's changing in the Arcade
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              In this learning program, the best progress happens when you have space to build, experiment, make mistakes, and truly understand how things work. The 2026 updates lean further into that hands-on philosophy so learners can focus on practical, career-ready skills at their own pace.
            </p>
          </div>

          {/* 5 Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {fieldUpdates.map((item, idx) => (
              <motion.div
                key={item.tag}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className={`p-5 rounded-2xl ${item.bg} border ${item.border} flex flex-col justify-between transition-shadow hover:shadow-md ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className={`text-[10px] font-black tracking-wider uppercase ${item.color}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
