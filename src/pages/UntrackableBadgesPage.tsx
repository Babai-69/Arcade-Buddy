import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Gamepad2,
  Flame,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Calendar,
  Award,
  ArrowRight,
  Check,
  Share2,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

interface WorkMeetsPlayBadge {
  id: string;
  month: string;
  monthOrder: number;
  name: string;
  challengeUrl: string;
  imageUrl: string;
  description: string;
}

const BADGES_LIST: WorkMeetsPlayBadge[] = [
  {
    id: 'january',
    month: 'January',
    monthOrder: 1,
    name: 'Work Meets Play: A Cloud That Cares',
    challengeUrl: 'https://www.skills.google/games/6994',
    imageUrl: 'https://cdn.qwiklabs.com/L690eINrROjVP%2B0wfbiXLy0Ndq4QSTuu2Vd2o3AQQVo%3D',
    description: 'Explore healthcare, sustainability, and empathy in cloud architecture through real-world Google Cloud scenarios.'
  },
  {
    id: 'february',
    month: 'February',
    monthOrder: 2,
    name: 'Work Meets Play: Journeys Made Easy',
    challengeUrl: 'https://skills.google/games/7115',
    imageUrl: 'https://cdn.qwiklabs.com/F7%2FfA0Ahl7R2nHbmBLh7q6fuQNCPRua8rMwdR9ycom8%3D',
    description: 'Streamline logistics, mapping, and travel pipelines using smart cloud infrastructure and APIs.'
  },
  {
    id: 'march',
    month: 'March',
    monthOrder: 3,
    name: 'Work Meets Play: Metrics in Motion',
    challengeUrl: 'https://skills.google/game/7214',
    imageUrl: 'https://cdn.qwiklabs.com/m7NpHJriXFqSWW9Gjd%2FcVloP8TaR9KansT35NNCzi6I%3D',
    description: 'Dive into live telemetry, real-time analytics, and BigQuery data pipelines in dynamic conditions.'
  },
  {
    id: 'april',
    month: 'April',
    monthOrder: 4,
    name: 'Work Meets Play: Skills Spawn',
    challengeUrl: 'https://www.skills.google/games/7114',
    imageUrl: 'https://cdn.qwiklabs.com/iZi9utABedp2ufkMYX7%2F8Fs34U1dDghSwsbccT%2BXz44%3D',
    description: 'Gamified serverless microservices, cloud functions, and rapid compute deployment challenges.'
  },
  {
    id: 'may',
    month: 'May',
    monthOrder: 5,
    name: 'Work Meets Play: Expressive Efficiency',
    challengeUrl: 'https://www.skills.google/games/7176',
    imageUrl: 'https://cdn.qwiklabs.com/DViX07cAZhUwRN8%2BGCAEx042boygbB9HpD%2FA0GOx9OA%3D',
    description: 'Optimize cost, resource utilization, and auto-scaling performance across cloud workloads.'
  },
  {
    id: 'june',
    month: 'June',
    monthOrder: 6,
    name: 'Work Meets Play: Cloud Canvas',
    challengeUrl: 'https://www.skills.google/games/7227',
    imageUrl: 'https://cdn.qwiklabs.com/3yPH1wD5dYlXWJlt7FHRecJNPplaCeDE3KYJ8DOxyig%3D',
    description: 'Create multimodal generative AI assets and creative media workflows using Google Cloud AI tools.'
  }
];

export function UntrackableBadgesPage() {
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('arcade_wmp_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('arcade_wmp_completed', JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Failed to save completion state:', e);
    }
  }, [completedIds]);

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / BADGES_LIST.length) * 100);

  return (
    <div className="w-full min-h-screen pb-24 text-slate-800 dark:text-slate-100">
      {/* Top 4-Color RGBY Google Stripe */}
      <div
        className="w-full h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <BackToResourcesButton
            label="Back to Resources"
            to="/resources"
            handwrittenNote="Work Meets Play 6-badge challenge hub ✨"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-2xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Share Guide</span>
                </>
              )}
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Special Arcade Series 2026</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO BANNER */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 md:p-12 mb-10 bg-gradient-to-br from-slate-900 via-[#10172a] to-[#1e1b4b] text-white shadow-2xl border border-slate-800">
          {/* Subtle Google colored decorative blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide uppercase text-rose-300 mb-4">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Special Event Rules • Non-Trackable Badges</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4 leading-tight">
                Non-Trackable <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-blue-400">Badges</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
                Work Meet Play badges follow special Arcade event rules and are listed here for quick access. Discover the 6 monthly challenges, the top 50 completion rule, and how to unlock <strong>7 bonus Arcade Points</strong>.
              </p>

              {/* Series Completion Bonus Pill */}
              <div className="inline-flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-blue-500/15 border border-amber-400/30 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-400/40">
                  <Award className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Series Completion Bonus
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    Completing all 6 games guarantees you <strong className="text-amber-300 font-black">+7 total Arcade Points</strong>!
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-sm">
                <img
                  src="https://d2yds90mtvelsl.cloudfront.net/original/3X/7/f/7fd46f23ee6895d3889b600b8b17e185defc750e.gif"
                  alt="Work Meets Play Series Animation"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Jan – June Series Active
                  </span>
                  <a
                    href="https://discuss.google.dev/t/coming-soon-a-new-skills-boost-arcade-game/182105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-300 hover:text-white font-bold transition-colors"
                  >
                    <span>Official Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WHY IS IT UNTRACKABLE? (EXPLANATION CALLOUT) */}
        {/* ========================================================================= */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Transparency &amp; Calculator Notice
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                Why are these badges untrackable by automated calculators?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black">1</span>
                Speed-Based Points (Top 50 Only)
              </div>
              <p>
                Standard Skill Badges award points to every completer. In Work Meets Play, only the <strong>first 50 participants</strong> to finish each monthly game receive 1 Arcade Point. Public profiles don't expose your global completion position timestamp, so automated tools cannot verify if you were in the top 50.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">2</span>
                Game-Room Architecture
              </div>
              <p>
                These challenges are structured as dedicated interactive game events (<code>/games/&lt;id&gt;</code>) rather than permanent catalog skill badges. While the completion badge displays on your public profile, it is cataloged as a community game badge rather than a point-bearing course.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-black">3</span>
                End-of-Season Bonus Credit
              </div>
              <p>
                The <strong>7 Bonus Points</strong> for completing the full 6-game series are tallied and credited manually by Google at the end of the season or unlocked through a special finale game. They are added directly to your final Prize Counter points ledger!
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AFFECTED BADGES: WORK MEET PLAY BADGES GRID (Matches User UI) */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFFECTED BADGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-slate-900 dark:text-white mb-3">
              Work Meet Play Badges
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              New game released each month from January through June. Complete all 6 to lock in your 7 bonus points.
            </p>
          </div>

          {/* User Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-3 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Your Series Progress
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono">
                  {completedCount} / 6 Completed ({progressPercent}%)
                </span>
              </div>
              <div className="w-full sm:w-80 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-right">
              {completedCount === 6 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready for +7 Bonus Points!
                </span>
              ) : (
                <span>Complete {6 - completedCount} more for the 7 bonus points</span>
              )}
            </div>
          </div>

          {/* 6 Badge Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BADGES_LIST.map(badge => {
              const isDone = completedIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-300 dark:border-emerald-700 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg shadow-sm'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Pills */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
                        WORK MEET PLAY
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-200 font-mono">
                        {badge.month}
                      </span>
                    </div>

                    {/* Badge Image */}
                    <div className="relative aspect-square max-w-[170px] mx-auto mb-5 flex items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={badge.imageUrl}
                        alt={badge.name}
                        className="w-full h-full object-contain drop-shadow-md"
                        loading="lazy"
                      />
                      {isDone && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Title & Tag */}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {badge.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold mb-3">
                      <span>🔥 Non-trackable event badge</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 pt-0 mt-auto space-y-2">
                    <a
                      href={badge.challengeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:translate-y-[-1px] cursor-pointer"
                    >
                      <span>Start Challenge</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleCompleted(badge.id)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDone
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                      <span>{isDone ? 'Marked as Completed ✓' : 'Mark as Completed'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPECIAL EVENT DETAILS (3 METRIC CARDS - Matches User UI) */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white mb-2">
              Special Event Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              10,000 spots are available for this event, where challenges are based on real-world scenarios using Google Cloud tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Top 50 Reward */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Trophy className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Top 50 Reward
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The first 50 participants to complete the game earn 1 Arcade Point.
                </p>
              </div>
            </div>

            {/* Card 2: Special Game */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Special Game
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you're not in the top 50, you can enter a special game at the end of the season, but only if you've completed all monthly games.
                </p>
              </div>
            </div>

            {/* Card 3: Final Challenge */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  Final Challenge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Completing the final challenge will earn you 7 additional Arcade Points.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HOW TO EARN INCENTIVES & FAQs */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span>How to Earn Incentives</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>
                    <strong>10,000 Total Seats:</strong> Each game is capped at 10,000 seats. Act fast when each monthly challenge unlocks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>
                    <strong>First 50 Speed Bonus:</strong> The first 50 participants to solve all challenge labs each month score 1 Arcade Point.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>
                    <strong>7 Points Series Guarantee:</strong> Collect all 6 badges (January to June) to unlock 7 bonus Arcade Points at program completion!
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>
                    <strong>Spotlight Achievements:</strong> Google Cloud features top performers and their problem-solving journeys on official social and developer community channels.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white border border-indigo-800/50 shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>Google Cloud Community</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
                  Official Discussion &amp; Updates
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed mb-6">
                  Check out the official Google Cloud Community discussion post for announcements, start times, rules clarification, and facilitator answers.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://discuss.google.dev/t/coming-soon-a-new-skills-boost-arcade-game/182105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Open Official Community Post</span>
                  <ExternalLink className="w-4 h-4 text-slate-700" />
                </a>

                <Link
                  to="/resources"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Browse All Arcade Resources</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
