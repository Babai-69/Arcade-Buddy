import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Award,
  Calculator,
  Gift,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export function HomeCommandCenter() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-display">
            Program Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know for Season 2026
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Understand how badges convert to arcade points, explore available game paths, and discover the path to exclusive Google Cloud swags.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Games & Syllabus (Cols 1-7) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-white to-blue-50/40 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50">
                  Q4 Cohort
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Arcade Games & Active Syllabus
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Earn points by completing interactive cloud scenarios in DevOps, BigQuery, Infrastructure, and Vertex AI. Every completed game directly adds 1 full point to your tally.
                </p>
              </div>

              {/* Sample Game Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-start gap-3">
                  <span className="text-lg">⚡</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Base Camp & Essentials</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Hands-on GCP fundamental labs</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-start gap-3">
                  <span className="text-lg">🤖</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Generative AI Journeys</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Vertex AI, Gemini & Prompting</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Over 50+ labs with step-by-step guides</span>
              <Link
                to="/syllabus"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
              >
                <span>View Full Syllabus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Points Mechanics (Cols 8-12) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-white to-emerald-50/40 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
                  2026 Conversion
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Points & Badges Ledger
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Transparent, predictable point math for every badge earned on Google Cloud Skills Boost.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">1 Arcade Game</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    1.0 Arcade Point
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">2 Skill Badges</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                    1.0 Arcade Point (0.5 pt each)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Facilitator Milestones</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:purple-950/40 px-2 py-0.5 rounded">
                    Bonus Multipliers
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Real-time calculations</span>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: Milestone Swag Tiers (Cols 1-5) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-white to-amber-50/40 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
                  Prize Counter
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Swag & Milestone Rewards
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Redeem earned arcade points for official Google Cloud merchandise delivered directly to your doorstep.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Standard Tier</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">T-Shirt & Pen Pack</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Advanced Tier</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Steel Bottle & Bag</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Premium Tier</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Executive Hoodie</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Ultimate Tier</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Complete Swag Box</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Free global shipping</span>
              <Link
                to="/swags"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group"
              >
                <span>View Swag Showcase</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 4: Season Transition & Next Steps (Cols 6-12) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-white to-purple-50/40 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                  Learner Intel
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Season 2026 Status & What's Ahead
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  While the Facilitator cohort concluded on September 14, 2026, the overarching Google Cloud Arcade runs all the way through December 31, 2026! You can continue learning, completing skill badges, and collecting points for the upcoming January 2027 redemption.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/40 flex items-start gap-3 text-xs text-purple-900 dark:text-purple-200">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Next Major Milestone: Prize Counter Opening</p>
                  <p className="text-purple-700 dark:text-purple-300 mt-0.5">
                    Estimated opening: January 7, 2027. Keep your public profile URL safe to claim your points.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Official FAQ & Guidelines</span>
              <Link
                to="/faq"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 group"
              >
                <span>Read Facilitator FAQ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
