import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
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
  Target,
  RotateCcw,
  CheckCheck,
  Zap,
  Info,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

interface WorkMeetsPlayBadge {
  id: string;
  month: string;
  monthShort: string;
  monthOrder: number;
  gameId: string;
  name: string;
  challengeUrl: string;
  imageUrl: string;
  description: string;
  accentColor: string;
  badgeTag: string;
}

const BADGES_LIST: WorkMeetsPlayBadge[] = [
  {
    id: 'january',
    month: 'January',
    monthShort: 'JAN',
    monthOrder: 1,
    gameId: '#6994',
    name: 'Work Meets Play: A Cloud That Cares',
    challengeUrl: 'https://www.skills.google/games/6994',
    imageUrl: 'https://cdn.qwiklabs.com/L690eINrROjVP%2B0wfbiXLy0Ndq4QSTuu2Vd2o3AQQVo%3D',
    description: 'Explore healthcare, sustainability, and empathy in cloud architecture through real-world Google Cloud scenarios.',
    accentColor: '#1A73E8',
    badgeTag: 'CARE & CLOUD'
  },
  {
    id: 'february',
    month: 'February',
    monthShort: 'FEB',
    monthOrder: 2,
    gameId: '#7115',
    name: 'Work Meets Play: Journeys Made Easy',
    challengeUrl: 'https://skills.google/games/7115',
    imageUrl: 'https://cdn.qwiklabs.com/F7%2FfA0Ahl7R2nHbmBLh7q6fuQNCPRua8rMwdR9ycom8%3D',
    description: 'Streamline logistics, mapping, and travel pipelines using smart cloud infrastructure and APIs.',
    accentColor: '#EA4335',
    badgeTag: 'LOGISTICS & MAPS'
  },
  {
    id: 'march',
    month: 'March',
    monthShort: 'MAR',
    monthOrder: 3,
    gameId: '#7214',
    name: 'Work Meets Play: Metrics in Motion',
    challengeUrl: 'https://skills.google/game/7214',
    imageUrl: 'https://cdn.qwiklabs.com/m7NpHJriXFqSWW9Gjd%2FcVloP8TaR9KansT35NNCzi6I%3D',
    description: 'Dive into live telemetry, real-time analytics, and BigQuery data pipelines in dynamic conditions.',
    accentColor: '#FBBC05',
    badgeTag: 'BIGQUERY & METRICS'
  },
  {
    id: 'april',
    month: 'April',
    monthShort: 'APR',
    monthOrder: 4,
    gameId: '#7114',
    name: 'Work Meets Play: Skills Spawn',
    challengeUrl: 'https://www.skills.google/games/7114',
    imageUrl: 'https://cdn.qwiklabs.com/iZi9utABedp2ufkMYX7%2F8Fs34U1dDghSwsbccT%2BXz44%3D',
    description: 'Gamified serverless microservices, cloud functions, and rapid compute deployment challenges.',
    accentColor: '#34A853',
    badgeTag: 'SERVERLESS & COMPUTE'
  },
  {
    id: 'may',
    month: 'May',
    monthShort: 'MAY',
    monthOrder: 5,
    gameId: '#7176',
    name: 'Work Meets Play: Expressive Efficiency',
    challengeUrl: 'https://www.skills.google/games/7176',
    imageUrl: 'https://cdn.qwiklabs.com/DViX07cAZhUwRN8%2BGCAEx042boygbB9HpD%2FA0GOx9OA%3D',
    description: 'Optimize cost, resource utilization, and auto-scaling performance across cloud workloads.',
    accentColor: '#1A73E8',
    badgeTag: 'COST & EFFICIENCY'
  },
  {
    id: 'june',
    month: 'June',
    monthShort: 'JUN',
    monthOrder: 6,
    gameId: '#7227',
    name: 'Work Meets Play: Cloud Canvas',
    challengeUrl: 'https://www.skills.google/games/7227',
    imageUrl: 'https://cdn.qwiklabs.com/3yPH1wD5dYlXWJlt7FHRecJNPplaCeDE3KYJ8DOxyig%3D',
    description: 'Create multimodal generative AI assets and creative media workflows using Google Cloud AI tools.',
    accentColor: '#EA4335',
    badgeTag: 'GENERATIVE AI'
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
  const [filter, setFilter] = useState<'all' | 'completed' | 'todo'>('all');
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('arcade_wmp_completed', JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Failed to save completion state:', e);
    }
  }, [completedIds]);

  const fireVictoryConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev => {
      const isAlreadyDone = prev.includes(id);
      const next = isAlreadyDone ? prev.filter(item => item !== id) : [...prev, id];
      
      if (!isAlreadyDone) {
        if (next.length === BADGES_LIST.length) {
          // All completed jackpot!
          fireVictoryConfetti();
          setCelebrationToast('🎉 ALL 6 BADGES COMPLETE! +7 BONUS POINTS UNLOCKED!');
          setTimeout(() => setCelebrationToast(null), 4500);
        } else {
          // Minor celebration
          try {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#34A853', '#4285F4']
            });
          } catch {}
        }
      }
      return next;
    });
  };

  const markAllComplete = () => {
    setCompletedIds(BADGES_LIST.map(b => b.id));
    fireVictoryConfetti();
    setCelebrationToast('🏆 ALL BADGES MARKED COMPLETED! YOU ARE READY FOR PRIZE COUNTER!');
    setTimeout(() => setCelebrationToast(null), 4500);
  };

  const resetAllProgress = () => {
    setCompletedIds([]);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / BADGES_LIST.length) * 100);

  const filteredBadges = BADGES_LIST.filter(badge => {
    const isDone = completedIds.includes(badge.id);
    if (filter === 'completed') return isDone;
    if (filter === 'todo') return !isDone;
    return true;
  });

  return (
    <div className="w-full min-h-screen pb-24 text-[var(--ink)] bg-[var(--bg)] transition-colors duration-200">
      {/* Neo-brutalist custom styling for high-tactile arcade button presses */}
      <style>{`
        /* Global Tactile Arcade Buttons */
        .arcade-btn-press {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border: 2px solid var(--edge) !important;
          border-radius: 14px;
          box-shadow: 4px 4px 0 var(--edge) !important;
          cursor: pointer;
          user-select: none;
          text-decoration: none !important;
          transition: transform .08s cubic-bezier(0,0,0.2,1), box-shadow .08s cubic-bezier(0,0,0.2,1), background-color .15s ease !important;
          white-space: nowrap;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .arcade-btn-press:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0 var(--edge) !important;
        }

        .arcade-btn-press:active,
        .arcade-btn-press.is-pressed {
          transform: translate(4px, 4px) !important;
          box-shadow: 0 0 0 var(--edge) !important;
          transition-duration: .03s !important;
        }

        /* Large Action Button Variant */
        .arcade-btn-primary {
          background: #1A73E8 !important;
          color: #ffffff !important;
          padding: 12px 20px;
          font-size: 14px;
        }
        .arcade-btn-primary:hover {
          background: #1557b0 !important;
        }

        .arcade-btn-ghost {
          background: var(--card) !important;
          color: var(--ink) !important;
          padding: 10px 16px;
          font-size: 13px;
        }
        .arcade-btn-ghost:hover {
          background: var(--bg) !important;
        }

        .arcade-btn-emerald {
          background: #059669 !important;
          color: #ffffff !important;
          padding: 10px 16px;
          font-size: 13px;
        }
        .arcade-btn-emerald:hover {
          background: #047857 !important;
        }

        .arcade-btn-pill {
          padding: 6px 14px !important;
          border-radius: 9999px !important;
          font-size: 12px !important;
          box-shadow: 3px 3px 0 var(--edge) !important;
        }
        .arcade-btn-pill:hover {
          transform: translate(-1.5px, -1.5px) !important;
          box-shadow: 4.5px 4.5px 0 var(--edge) !important;
        }
        .arcade-btn-pill:active {
          transform: translate(3px, 3px) !important;
          box-shadow: 0 0 0 var(--edge) !important;
        }

        /* Neo-Brutalist Arcade Cards */
        .arcade-card {
          background: var(--card);
          border: 2px solid var(--edge);
          border-radius: 20px;
          box-shadow: 5px 5px 0 var(--edge);
          transition: transform .18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arcade-card:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0 var(--edge);
        }

        /* Floating Badge Hover Pulse */
        .arcade-badge-img {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
        }
        .arcade-card:hover .arcade-badge-img {
          transform: scale(1.08) rotate(2deg);
        }

        /* Retro CRT Dot Matrix Pattern Overlay */
        .arcade-matrix-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 18px 18px;
        }
      `}</style>

      {/* Top 4-Color RGBY Google Stripe */}
      <div
        className="w-full h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]"
        aria-hidden="true"
      />

      {/* Celebration Notification Toast */}
      <AnimatePresence>
        {celebrationToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-5 py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm text-center shadow-2xl border-3 border-[var(--edge)] flex items-center justify-center gap-3"
            style={{ boxShadow: '6px 6px 0 var(--edge)' }}
          >
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
            <span>{celebrationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Navigation & Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <BackToResourcesButton
            label="Back to Resources"
            to="/resources"
            handwrittenNote="Work Meets Play challenge guide ✨"
          />

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleShare}
              className="arcade-btn-press arcade-btn-pill bg-[var(--card)] text-[var(--ink)]"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
                  <span>Share Guide</span>
                </>
              )}
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-400/30">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Special Arcade Drop 2026</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO BANNER - High Polish Arcade Marquee */}
        {/* ========================================================================= */}
        <div
          className="relative rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 mb-10 text-white border-3 border-[var(--edge)]"
          style={{
            background: 'linear-gradient(135deg, #0b1120 0%, #0f172a 45%, #1e1b4b 100%)',
            boxShadow: '7px 7px 0 var(--edge)'
          }}
        >
          {/* Subtle Google colored decorative glow blobs */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 -ml-16 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 arcade-matrix-bg pointer-events-none opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              {/* Event Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black tracking-wide uppercase text-rose-300 mb-4 shadow-xs">
                <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>Special Event Rules • Non-Trackable Badges</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4 leading-[1.15]">
                Untrackable <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-blue-400">Badges List</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl font-medium">
                Work Meets Play badges follow special Arcade event rules and are cataloged here for direct lab access. Learn why automated public profile scrapers cannot track them, how the <strong>Top 50 speed run</strong> works, and how to guarantee your <strong>7 bonus Arcade Points</strong>.
              </p>

              {/* 3 Quick Highlight Tags */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-400/40 text-xs font-bold text-blue-200">
                  <Users className="w-3.5 h-3.5 text-blue-300" />
                  <span>10,000 Limited Seats / Game</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-200">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>Top 50 Finishers = 1 Pt</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-200">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Full 6 Set = 7 Bonus Pts</span>
                </div>
              </div>

              {/* Series Completion Bonus Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-blue-500/20 border-2 border-amber-400/40 backdrop-blur-md flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center shrink-0 border border-amber-300/50">
                  <Award className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Series Completion Bonus (7 Points Total)
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    Completing the entire 6-badge Work Meets Play series (Jan – June) guarantees you <strong className="text-amber-300 font-black">+7 total Arcade Points</strong> at program end!
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Arcade GIF Preview Screen */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative group w-full max-w-sm rounded-2xl overflow-hidden border-3 border-[var(--edge)] bg-black/60 shadow-2xl"
                style={{ boxShadow: '6px 6px 0 var(--edge)' }}
              >
                <img
                  src="https://d2yds90mtvelsl.cloudfront.net/original/3X/7/f/7fd46f23ee6895d3889b600b8b17e185defc750e.gif"
                  alt="Work Meets Play Series Animation"
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 border border-white/20 text-[11px] font-black tracking-wider text-emerald-400 flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE EVENT</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-medium">
                  <span className="font-bold flex items-center gap-1 text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Jan – June 2026 Series</span>
                  </span>
                  <a
                    href="https://discuss.google.dev/t/coming-soon-a-new-skills-boost-arcade-game/182105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn-press arcade-btn-pill text-[11px] bg-white text-slate-900 py-1 px-2.5 font-black hover:bg-slate-100"
                  >
                    <span>Official Post</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 6-MONTH JOURNEY TIMELINE & PROGRESS BAR */}
        {/* ========================================================================= */}
        <div
          className="mb-10 p-6 sm:p-8 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)]"
          style={{ boxShadow: '5px 5px 0 var(--edge)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Target className="w-4 h-4" />
                <span>Interactive Completion Tracker</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-[var(--ink)]">
                Series Progress: {completedCount} / 6 Completed
              </h2>
            </div>

            {/* Quick Action Buttons with Tactile Press */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={markAllComplete}
                className="arcade-btn-press arcade-btn-ghost text-xs py-2 px-3.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                <CheckCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                <span>Mark All Complete</span>
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllProgress}
                  className="arcade-btn-press arcade-btn-ghost text-xs py-2 px-3 text-slate-500 hover:text-rose-500"
                  title="Reset completed badges"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* 6-Month Visual Stepper Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {BADGES_LIST.map((b, idx) => {
              const isDone = completedIds.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => toggleCompleted(b.id)}
                  className={`arcade-btn-press p-3 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white border-2 border-[var(--edge)]'
                      : 'bg-[var(--bg)] text-[var(--ink)]'
                  }`}
                  style={{
                    boxShadow: isDone ? '3px 3px 0 var(--edge)' : '2px 2px 0 var(--edge)',
                  }}
                  title={`Click to toggle ${b.name}`}
                >
                  <div className="flex items-center justify-between w-full text-[10px] font-black uppercase mb-1 opacity-80">
                    <span>#{idx + 1}</span>
                    <span>{b.monthShort}</span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center my-1 font-black text-xs ${
                    isDone ? 'bg-white text-emerald-600' : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--edge)]'
                  }`}>
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>

                  <span className="text-[11px] font-bold line-clamp-1 mt-0.5">
                    {b.name.replace('Work Meets Play: ', '')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar & Milestone Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--mut)]">
              <span>Progress Bar ({progressPercent}%)</span>
              <span>
                {completedCount === 6 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 7 Bonus Points Unlocked!
                  </span>
                ) : (
                  <span>Need {6 - completedCount} more for the 7 bonus points</span>
                )}
              </span>
            </div>
            <div className="w-full h-3.5 rounded-full bg-[var(--bg)] border-2 border-[var(--edge)] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* WHY ARE THESE BADGES UNTRACKABLE? (DETAILED EXPLANATION) */}
        {/* ========================================================================= */}
        <div
          className="mb-12 p-6 sm:p-8 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)]"
          style={{ boxShadow: '5px 5px 0 var(--edge)' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center shrink-0 text-amber-500">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Transparency &amp; Technical Explanation
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-[var(--ink)]">
                Why are these badges untrackable by automated calculators?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[var(--ink)] leading-relaxed">
            {/* Reason 1 */}
            <div
              className="p-5 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '3px 3px 0 var(--edge)' }}
            >
              <div>
                <div className="flex items-center gap-2 font-black text-[var(--ink)] mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4285F4] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    01
                  </span>
                  <span>Top 50 Speed Run Only</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  Unlike standard Skill Badges that grant points to everyone who finishes, Work Meets Play grants 1 Arcade Point <strong>only to the first 50 participants</strong> who complete the game. Public Google Cloud profile pages do not publish exact global completion ranking timestamps, making it mathematically impossible for any calculator to verify whether you finished in the top 50.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--edge)] text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Verification requires Google admin export</span>
              </div>
            </div>

            {/* Reason 2 */}
            <div
              className="p-5 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '3px 3px 0 var(--edge)' }}
            >
              <div>
                <div className="flex items-center gap-2 font-black text-[var(--ink)] mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#EA4335] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    02
                  </span>
                  <span>Event Game Room Catalog</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  These challenges are hosted in temporary event rooms (<code>/games/&lt;id&gt;</code>) instead of permanent learning course tracks. While the completion badge renders on your public avatar badge shelf, it is recognized by Google as an event souvenir badge rather than a standard course badge.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--edge)] text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Different catalog category in Skills Boost</span>
              </div>
            </div>

            {/* Reason 3 */}
            <div
              className="p-5 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '3px 3px 0 var(--edge)' }}
            >
              <div>
                <div className="flex items-center gap-2 font-black text-[var(--ink)] mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#34A853] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    03
                  </span>
                  <span>End-of-Season Manual Bonus</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  The <strong>7 Bonus Points</strong> for completing the full 6-game series (Jan – June) are audited and manually credited by the Google Cloud Arcade team directly to your final Prize Counter points total or granted via a special series finale game.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--edge)] text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Direct credit to final Prize Counter total</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AFFECTED BADGES: WORK MEETS PLAY 6-MONTH COLLECTION */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHALLENGE CATALOG (JAN – JUN)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-[var(--ink)]">
                Work Meets Play Badges
              </h2>
              <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                A new challenge released every month. Complete all 6 before the season ends to lock in your 7 bonus points.
              </p>
            </div>

            {/* Filter Buttons with Tactile Press Feedback */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`arcade-btn-press arcade-btn-pill ${
                  filter === 'all'
                    ? 'arcade-btn-primary is-pressed'
                    : 'arcade-btn-ghost'
                }`}
              >
                <span>All ({BADGES_LIST.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`arcade-btn-press arcade-btn-pill ${
                  filter === 'completed'
                    ? 'arcade-btn-emerald is-pressed'
                    : 'arcade-btn-ghost'
                }`}
              >
                <span>Completed ({completedCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilter('todo')}
                className={`arcade-btn-press arcade-btn-pill ${
                  filter === 'todo'
                    ? 'arcade-btn-primary is-pressed'
                    : 'arcade-btn-ghost'
                }`}
              >
                <span>To Do ({BADGES_LIST.length - completedCount})</span>
              </button>
            </div>
          </div>

          {/* 6 Badge Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge, idx) => {
              const isDone = completedIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`arcade-card p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden ${
                    isDone
                      ? 'border-emerald-500/80 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : ''
                  }`}
                  style={{
                    border: isDone ? '2px solid #059669' : '2px solid var(--edge)',
                    boxShadow: isDone ? '5px 5px 0 #059669' : '5px 5px 0 var(--edge)',
                  }}
                >
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                      {badge.badgeTag}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-[var(--edge)] text-white font-mono shadow-2xs">
                      {badge.month} • {badge.gameId}
                    </span>
                  </div>

                  {/* Badge Image Frame with Hover Tilt */}
                  <div className="relative aspect-square max-w-[180px] w-full mx-auto mb-4 flex items-center justify-center p-3 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)]">
                    <img
                      src={badge.imageUrl}
                      alt={badge.name}
                      className="w-full h-full object-contain arcade-badge-img drop-shadow-md"
                      loading="lazy"
                    />

                    {isDone && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-[var(--edge)] shadow-md animate-in zoom-in duration-200">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-5">
                    <h3 className="font-black text-base sm:text-lg text-[var(--ink)] leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {badge.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold mb-2.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Non-trackable event badge</span>
                    </div>

                    <p className="text-xs text-[var(--mut)] leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  {/* Tactile Action Buttons (Matches Home Page Press Feel) */}
                  <div className="space-y-2.5 pt-2 border-t border-[var(--edge)]">
                    {/* Primary Button: Start Challenge */}
                    <a
                      href={badge.challengeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arcade-btn-press arcade-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 group/btn"
                    >
                      <Gamepad2 className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                      <span>Start Challenge</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary Button: Mark as Completed (Interactive Toggle) */}
                    <button
                      type="button"
                      onClick={() => toggleCompleted(badge.id)}
                      className={`arcade-btn-press w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 ${
                        isDone
                          ? 'arcade-btn-emerald'
                          : 'arcade-btn-ghost'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-white' : 'text-slate-400'}`} />
                      <span>{isDone ? 'Completed ✓ (Click to toggle)' : 'Mark as Completed'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPECIAL EVENT DETAILS (3 METRIC CARDS) */}
        {/* ========================================================================= */}
        <div
          className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)] mb-12"
          style={{ boxShadow: '6px 6px 0 var(--edge)' }}
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 mb-2">
              <Info className="w-3.5 h-3.5" />
              <span>OFFICIAL PROGRAM RULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[var(--ink)] mb-2">
              Special Event Details
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
              10,000 spots are available per event. Challenges reflect real-world industry scenarios using Google Cloud infrastructure and AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Top 50 Reward */}
            <div
              className="p-6 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '4px 4px 0 var(--edge)' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 border-2 border-amber-500/40 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-black text-lg text-[var(--ink)] mb-2">
                  Top 50 Speed Reward
                </h3>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  The first 50 participants to complete all required challenge labs each month score <strong>1 Arcade Point</strong> directly for that game.
                </p>
              </div>
            </div>

            {/* Card 2: Special Game */}
            <div
              className="p-6 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '4px 4px 0 var(--edge)' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-500 border-2 border-blue-500/40 flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-black text-lg text-[var(--ink)] mb-2">
                  Special Finale Game
                </h3>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  Even if you miss the top 50, completing all 6 monthly games unlocks entry into a <strong>special series finale game</strong> at the end of the season.
                </p>
              </div>
            </div>

            {/* Card 3: Final Challenge */}
            <div
              className="p-6 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] flex flex-col justify-between"
              style={{ boxShadow: '4px 4px 0 var(--edge)' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 border-2 border-rose-500/40 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-black text-lg text-[var(--ink)] mb-2">
                  Series Jackpot (+7 PTS)
                </h3>
                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                  Completing the entire 6-badge set guarantees you <strong>7 additional Arcade Points</strong> added to your final Prize Counter points redemption pool!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HOW TO EARN INCENTIVES & COMMUNITY CALLOUT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)] h-full"
              style={{ boxShadow: '5px 5px 0 var(--edge)' }}
            >
              <h3 className="text-xl font-black font-display text-[var(--ink)] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span>How to Earn Incentives</span>
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>10,000 Total Spots Available:</strong> Each game is strictly limited to 10,000 enrollments. Bookmark this page and jump in as soon as a new monthly game drops.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>Speed Incentive (First 50):</strong> The fastest 50 participants to submit passing marks will earn 1 Arcade Point directly on the leaderboard.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>Full Series Completion (7 Points):</strong> Complete all 6 games (January through June) to claim the full 7-point series bonus at the end of the program.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>Spotlight Achievements:</strong> Google Cloud highlights standout learners on social channels and the official Google Cloud Community portal!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="p-6 sm:p-8 rounded-3xl text-white border-3 border-[var(--edge)] flex flex-col justify-between h-full"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                boxShadow: '6px 6px 0 var(--edge)'
              }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-black uppercase tracking-wider mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>Google Cloud Community</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white mb-3">
                  Official Discussion &amp; Updates
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed mb-6 font-medium">
                  Review the official Google Cloud Community thread for announcements, start times, rules clarification, and facilitator answers.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://discuss.google.dev/t/coming-soon-a-new-skills-boost-arcade-game/182105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arcade-btn-press w-full py-3 px-4 bg-white text-slate-900 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                >
                  <span>Open Official Community Post</span>
                  <ExternalLink className="w-4 h-4 text-slate-900" />
                </a>

                <Link
                  to="/resources"
                  className="arcade-btn-press w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Browse All Arcade Resources</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
