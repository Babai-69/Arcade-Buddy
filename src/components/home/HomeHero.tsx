import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  ArrowRight,
  Send,
  Users,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export function HomeHero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Decorative Dot Matrix Background */}
      <div className="absolute top-12 left-6 w-32 h-32 opacity-25 dark:opacity-15 pointer-events-none -z-10 hidden md:block">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" className="fill-blue-600 dark:fill-blue-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern-left)" />
        </svg>
      </div>

      <div className="absolute top-20 right-8 w-40 h-40 opacity-20 dark:opacity-10 pointer-events-none -z-10 hidden lg:block">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern-right" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" className="fill-indigo-600 dark:fill-indigo-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern-right)" />
        </svg>
      </div>

      {/* Ambient Radial Gradient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs backdrop-blur-md">
            {/* Overlapping Avatar Stack */}
            <div className="flex -space-x-1.5 items-center">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
                A
              </span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
                R
              </span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
                C
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              <strong className="text-blue-600 dark:text-blue-400">50+ learners</strong> on the trail right now
            </span>
          </div>
        </motion.div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div>
              <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-2 font-display">
                ARCADE POINTS TRACKER · 2026 SEASON
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Chart every mile <br className="hidden sm:inline" />
                of your{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Arcade Trail
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A smart companion dashboard to track Arcade points, labs, tiers, and rewards — without confusion.
            </p>

            {/* Bullet Points with Checkmarks */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Real-time points calculation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Lab &amp; syllabus tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Connections</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="https://www.youtube.com/@ARCADEWITHUS_We"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <span>YouTube Channel</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/arcadebuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-blue-500" />
                <span>Join Community</span>
              </a>

              <Link
                to="/calculator"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Launch Calculator →</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Field Dispatch Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Tilted Card Shadow / Glow */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-[2rem] bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700/80 shadow-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                {/* Card Header Media */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 overflow-hidden flex flex-col justify-between p-5 text-white">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
                      100% RESULTS
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-blue-300 animate-ping" />
                      Google Cloud
                    </span>
                  </div>

                  {/* Centered Graphic Simulation */}
                  <div className="my-auto text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-100">
                      Arcade Hero: Block Errors
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white drop-shadow-md mt-1">
                      How to Enable
                    </h3>
                    <div className="inline-block mt-1 px-4 py-1.5 rounded-lg bg-blue-600 text-white font-black tracking-wide text-sm sm:text-base shadow-lg">
                      CHECK MY PROGRESS
                    </div>
                  </div>

                  {/* Video Play Trigger Strip */}
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-between transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-xs">
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </div>
                      <span>Watch the field report</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded">
                      FIELD DISPATCH
                    </span>
                  </button>
                </div>

                {/* Lower Card Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Zero confusion on lab completions
                    </span>
                  </div>
                  <Link
                    to="/resources"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>More Guides</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal Walkthrough */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Play className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Arcade Guide Walkthrough: Check My Progress</span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/v8ZzN5sJzOs?autoplay=1"
                  title="Arcade Completion Guide"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span>Looking for the official documentation?</span>
                <a
                  href="https://www.cloudskillsboost.google/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:underline font-semibold"
                >
                  <span>Cloud Skills Boost</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
