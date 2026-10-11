import React from 'react';
import { motion } from 'motion/react';
import { Users, FileText, ArrowRight, Send } from 'lucide-react';

export function HomeStatsStrip() {
  return (
    <section className="relative -mt-4 mb-16 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-slate-900/5 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Stat 1: Active Students */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-blue-600 dark:text-blue-400 tabular-nums">
                7,485+
              </div>
              <div className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Active Students
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

          {/* Stat 2: Profiles Analyzed */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-display text-emerald-600 dark:text-emerald-400 tabular-nums">
                200,379+
              </div>
              <div className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Profiles Analyzed
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-center px-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-display italic whitespace-nowrap">
              Ready To Find Your People?
            </span>
            <a
              href="https://t.me/arcadebuddy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-102 whitespace-nowrap"
            >
              <span>JOIN TELEGRAM CHANNEL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
