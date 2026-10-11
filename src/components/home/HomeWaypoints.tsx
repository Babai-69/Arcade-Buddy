import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Bell, PlayCircle, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const waypoints = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Create Account',
    desc: 'Sign up on Google Skills & make your profile public.',
    btnText: 'Sign Up',
    link: 'https://www.cloudskillsboost.google/',
    color: '#0284c7', // blue
    bgClass: 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400',
    btnClass: 'bg-sky-500 hover:bg-sky-600',
    isExternal: true,
  },
  {
    step: 2,
    icon: Bell,
    title: 'Subscribe Arcade',
    desc: 'Subscription to receive important updates.',
    btnText: 'Subscribe Here',
    link: 'https://forms.gle/2h6xCvY3sW29pw4p7',
    color: '#059669', // green
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    btnClass: 'bg-emerald-500 hover:bg-emerald-600',
    isExternal: true,
  },
  {
    step: 3,
    icon: PlayCircle,
    title: 'Start Learning',
    desc: 'Begin your journey with games and skill badges.',
    btnText: 'Play Now',
    link: '/syllabus',
    color: '#dc2626', // red
    bgClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    btnClass: 'bg-rose-500 hover:bg-rose-600',
    isExternal: false,
  },
  {
    step: 4,
    icon: Activity,
    title: 'Track Progress',
    desc: 'Monitor achievements using Calculator.',
    btnText: 'Calculate Now',
    link: '/calculator',
    color: '#d97706', // amber
    bgClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    btnClass: 'bg-amber-500 hover:bg-amber-600',
    isExternal: false,
  },
];

export function HomeWaypoints() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-2 block font-display">
            FOUR WAYPOINTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            How to get started with Arcade Program
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Follow these simple steps to begin your gamified learning adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {waypoints.map((wp, idx) => (
            <motion.div
              key={wp.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 text-center relative shadow-xs hover:shadow-xl border border-slate-200/80 dark:border-slate-700/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Step number badge on top */}
              <div
                style={{ backgroundColor: wp.color }}
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-white dark:ring-slate-800"
              >
                {wp.step}
              </div>

              <div>
                <div className={`w-16 h-16 mx-auto mb-6 mt-2 rounded-2xl ${wp.bgClass} flex items-center justify-center`}>
                  <wp.icon className="w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                  {wp.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  {wp.desc}
                </p>
              </div>

              <div>
                {wp.isExternal ? (
                  <a
                    href={wp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-transform hover:scale-102 shadow-sm ${wp.btnClass}`}
                  >
                    <span>{wp.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={wp.link}
                    className={`inline-flex items-center justify-center w-full gap-2 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-transform hover:scale-102 shadow-sm ${wp.btnClass}`}
                  >
                    <span>{wp.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
