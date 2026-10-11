import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  LayoutDashboard,
  ShieldCheck,
  Gamepad2,
  BookOpen,
  Gift,
  ArrowRight,
} from 'lucide-react';

const trailFeatures = [
  {
    icon: Calculator,
    title: 'Points Calculator',
    desc: 'Calculate your Arcade points instantly',
    href: '/calculator',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    desc: 'Track your progress and milestones',
    href: '/dashboard',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/30',
  },
  {
    icon: ShieldCheck,
    title: 'Badge Tracker',
    desc: 'View all your earned badges',
    href: '/my-progress',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: Gamepad2,
    title: 'Arcade Games',
    desc: 'Explore available games and labs',
    href: '/syllabus',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: BookOpen,
    title: 'Resources',
    desc: 'Tips and guides to maximize points',
    href: '/resources',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
  },
  {
    icon: Gift,
    title: 'Swags',
    desc: 'Exclusive swag for players',
    href: '/swags',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
  },
];

export function HomeTrailMap() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-1.5 block font-display">
            TRAIL MAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Explore more features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {trailFeatures.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <Link
                to={item.href}
                className="rounded-2xl p-5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs hover:shadow-lg transition-all duration-200 flex items-center justify-between group h-full"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all flex-shrink-0 ml-2">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
