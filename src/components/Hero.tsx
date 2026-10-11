import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Award,
  Sparkles,
  ArrowRight,
  Trophy,
  Compass,
  Calendar,
  Gamepad2,
  CheckCircle2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import heroIllustration from '../assets/images/arcade_cloud_hero_1790871983170.jpg';

export function Hero({ participants = [] }: { participants?: any[] }) {
  const totalCount = participants.length > 0 ? participants.length : 1290;
  const activeCount = participants.filter((p) => (p?.arcadePoints || 0) > 0).length || 864;

  // Prize Counter opening date: January 7, 2027 at 05:30:00 (matching Prize Redemption Guide)
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
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Bar */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span>Google Cloud Arcade 2026 is Active</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">OCT Games Live</span>
          </div>
        </div>

        {/* Main Grid: Value Proposition + Cinematic Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & Intentional CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Master Cloud Skills.{' '}
              <span className="block mt-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Track Arcade Rewards.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The premier companion for the Google Cloud Arcade Program. Complete hands-on cloud labs, calculate milestone points in real time, follow live leaderboards, and prepare for the 2027 Prize Counter.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                to="/syllabus"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Explore Syllabus & Games</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Live Leaderboard</span>
              </Link>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('start-welcome-tour'))}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>Guided Tour</span>
              </button>
            </div>

            {/* Trust Markers & Adjacency Proof */}
            <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Official Google Cloud Curated Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{totalCount.toLocaleString()}+</strong> Active Learners</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>100% Free Hands-on Access</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase Card + Live Countdown Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-slate-200/80 via-white to-slate-200/60 dark:from-slate-700/60 dark:via-slate-800/80 dark:to-slate-900/90 shadow-2xl border border-white/40 dark:border-slate-700/40 backdrop-blur-xl">
              {/* Main Media Showcase Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 group">
                <img
                  src={heroIllustration}
                  alt="Google Cloud Arcade Computing Ecosystem"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Floating Badge in Media */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Arcade Companion 2026</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-semibold text-blue-300">Prize Redemption Window</p>
                    <p className="text-sm font-bold text-white">Opens January 7, 2027</p>
                  </div>
                  <Link
                    to="/resources/prize-counter-guide"
                    className="text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 transition-colors"
                  >
                    Guide →
                  </Link>
                </div>
              </div>

              {/* Live Live Countdown Module Below Visual */}
              <div className="p-4 sm:p-5 mt-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Prize Counter Countdown</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Estimated 2027
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    <span className="block text-xl sm:text-2xl font-black font-display text-blue-600 dark:text-blue-400 tabular-nums">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      Days
                    </span>
                  </div>
                  <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    <span className="block text-xl sm:text-2xl font-black font-display text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      Hours
                    </span>
                  </div>
                  <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    <span className="block text-xl sm:text-2xl font-black font-display text-purple-600 dark:text-purple-400 tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      Mins
                    </span>
                  </div>
                  <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    <span className="block text-xl sm:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
