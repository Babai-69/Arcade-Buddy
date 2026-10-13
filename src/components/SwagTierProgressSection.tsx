import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Award,
  Check,
  ChevronRight,
  Lock,
  Gift,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Flame,
  Info,
  ShieldCheck,
  Zap,
  Target,
  Gamepad2,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { InlineBadgeTracker } from './InlineBadgeTracker';

interface Milestone {
  id: number;
  name: string;
  requiredPoints: number;
  colorClass: string;
  color: string;
  badge: string;
  tag: string;
}

const MILESTONES: Milestone[] = [
  { id: 1, name: 'Trooper', requiredPoints: 50, colorClass: 'bg-[#00e5ff]', color: '#00e5ff', badge: '🥉', tag: '50+ PTS' },
  { id: 2, name: 'Ranger', requiredPoints: 75, colorClass: 'bg-[#ff9900]', color: '#ff9900', badge: '🥈', tag: '75+ PTS' },
  { id: 3, name: 'Champion', requiredPoints: 95, colorClass: 'bg-[#7c3aed]', color: '#7c3aed', badge: '🥇', tag: '95+ PTS' },
  { id: 4, name: 'Legend', requiredPoints: 120, colorClass: 'bg-[#f43f5e]', color: '#f43f5e', badge: '👑', tag: '120+ PTS' }
];

export interface SwagTierProgressSectionProps {
  data: any;
  spots?: any;
  defaultEnrolled?: boolean;
  className?: string;
}

export function SwagTierProgressSection({
  data,
  spots = {
    trooper: { spotsLeft: 6000, total: 6000 },
    ranger: { spotsLeft: 4000, total: 4000 },
    champion: { spotsLeft: 3000, total: 3000 },
    legend: { spotsLeft: 2500, total: 2500 },
  },
  defaultEnrolled = true,
  className = ''
}: SwagTierProgressSectionProps) {
  const [isRegistered, setIsRegistered] = useState(defaultEnrolled);

  if (!data) return null;

  // Calculate points and facilitator bonuses
  const basePoints = data.arcadePoints ?? 0;
  let programGameBadges = 0;
  let programSkillBadges = 0;

  if (data.id === 'demo') {
    programGameBadges = 8;
    programSkillBadges = 34;
  } else if (data.badges) {
    data.badges.forEach((b: any) => {
      if (b.validForProgram) {
        if (b.category === 'Game') programGameBadges++;
        if (b.category === 'Skill') programSkillBadges++;
      }
    });
  }

  let milestoneBonus = 0;
  if (programGameBadges >= 12 && programSkillBadges >= 66) milestoneBonus = 35;
  else if (programGameBadges >= 10 && programSkillBadges >= 50) milestoneBonus = 25;
  else if (programGameBadges >= 8 && programSkillBadges >= 34) milestoneBonus = 15;
  else if (programGameBadges >= 6 && programSkillBadges >= 18) milestoneBonus = 5;

  const totalBonus = isRegistered ? milestoneBonus : 0;
  const totalPoints = basePoints + totalBonus;

  const currentTierObj = [...MILESTONES].reverse().find(m => totalPoints >= m.requiredPoints);
  const currentTierName = currentTierObj ? currentTierObj.name : 'No Tier Yet';
  const nextTierObj = MILESTONES.find(m => totalPoints < m.requiredPoints);

  const pointsToNext = nextTierObj ? Number((nextTierObj.requiredPoints - totalPoints).toFixed(1)) : 0;

  return (
    <div id="swag-tier-progress" className={`swag-tier-progress-root space-y-8 ${className}`}>
      {/* ========================================================================= */}
      {/* 1. SWAG TIER PROGRESS CARD (NEO-BRUTALIST TACTILE CARD)                    */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)] p-6 sm:p-8 overflow-hidden"
        style={{ boxShadow: '6px 6px 0 var(--edge)' }}
      >
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-[var(--edge)]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 mb-2">
              <Gift className="w-3.5 h-3.5 text-purple-500" />
              <span>OFFICIAL PRIZE COUNTER TIERS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[var(--ink)] flex items-center gap-2.5">
              <span>Swags Tier Progress</span>
              <span className="text-sm font-black px-2.5 py-0.5 rounded-lg bg-[var(--edge)] text-white font-mono">
                {totalPoints} PTS
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--mut)] mt-1 font-medium">
              Real-time milestone calculation based on your verified public profile badges and points.
            </p>
          </div>

          {/* Registration Cohort Filter with Tactile Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] shadow-[2px_2px_0_var(--edge)]">
            <button
              type="button"
              onClick={() => setIsRegistered(true)}
              className={`btn-press btn-press--sm px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                isRegistered
                  ? 'btn-press--primary is-pressed text-white'
                  : 'bg-transparent text-[var(--mut)] hover:text-[var(--ink)] border-transparent shadow-none'
              }`}
              style={isRegistered ? {
                border: '2px solid var(--edge)',
                boxShadow: '0 0 0 var(--edge)',
                transform: 'translate(2px, 2px)'
              } : {}}
            >
              <span>Cohort Registered</span>
              {milestoneBonus > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 font-black">+{milestoneBonus}</span>}
            </button>
            <button
              type="button"
              onClick={() => setIsRegistered(false)}
              className={`btn-press btn-press--sm px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                !isRegistered
                  ? 'btn-press--secondary is-pressed text-[var(--ink)]'
                  : 'bg-transparent text-[var(--mut)] hover:text-[var(--ink)] border-transparent shadow-none'
              }`}
              style={!isRegistered ? {
                border: '2px solid var(--edge)',
                boxShadow: '0 0 0 var(--edge)',
                transform: 'translate(2px, 2px)'
              } : {}}
            >
              <span>Standard Arcade</span>
            </button>
          </div>
        </div>

        {/* Milestone Bonus Callout if active */}
        {isRegistered && milestoneBonus > 0 && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
              <span className="text-xl">🎁</span>
              <span>
                Includes <strong>+{milestoneBonus} facilitator bonus points</strong> calculated from your qualifying badges!
              </span>
            </div>
            <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-emerald-500 text-white">
              BONUS VERIFIED
            </span>
          </div>
        )}

        {/* ======================================================================= */}
        {/* PROGRESS TRACK & 4 MILESTONE NODES                                      */}
        {/* ======================================================================= */}
        <div className="my-8 relative pt-2 pb-2">
          {/* Background Track Line (desktop) */}
          <div className="hidden sm:block absolute top-[36px] left-10 right-10 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-[var(--edge)]">
            <div
              className="h-full bg-gradient-to-r from-[#00e5ff] via-[#ff9900] via-[#7c3aed] to-[#f43f5e] transition-all duration-700 rounded-full"
              style={{
                width: `${(() => {
                  const m = MILESTONES;
                  if (totalPoints <= m[0].requiredPoints) return (totalPoints / m[0].requiredPoints) * 25;
                  else if (totalPoints <= m[1].requiredPoints) return 25 + ((totalPoints - m[0].requiredPoints) / (m[1].requiredPoints - m[0].requiredPoints)) * 25;
                  else if (totalPoints <= m[2].requiredPoints) return 50 + ((totalPoints - m[1].requiredPoints) / (m[2].requiredPoints - m[1].requiredPoints)) * 25;
                  else if (totalPoints <= m[3].requiredPoints) return 75 + ((totalPoints - m[2].requiredPoints) / (m[3].requiredPoints - m[2].requiredPoints)) * 25;
                  return 100;
                })()}%`
              }}
            />
          </div>

          {/* 4 Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10">
            {MILESTONES.map((milestone) => {
              const isComplete = totalPoints >= milestone.requiredPoints;
              const isCurrent = currentTierObj && currentTierObj.id === milestone.id;
              const isNext = nextTierObj && nextTierObj.id === milestone.id;
              const tierSpots = spots[milestone.name.toLowerCase()] || { spotsLeft: 0, total: 0 };

              return (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-row sm:flex-col items-center sm:text-center gap-3.5 sm:gap-2 ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500 shadow-[4px_4px_0_var(--edge)]'
                      : isComplete
                      ? 'bg-emerald-500/10 border-emerald-500/80 shadow-[3px_3px_0_var(--edge)]'
                      : 'bg-[var(--bg)] border-[var(--edge)] shadow-[2px_2px_0_var(--edge)]'
                  }`}
                >
                  {/* Badge Circle */}
                  <div
                    className={`w-12 h-12 rounded-2xl border-2 border-[var(--edge)] flex items-center justify-center font-black text-lg shadow-xs shrink-0 ${
                      isComplete
                        ? 'bg-emerald-500 text-white'
                        : isNext
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-[var(--card)] text-[var(--mut)]'
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : isNext ? (
                      <ChevronRight className="w-6 h-6 stroke-[3]" />
                    ) : (
                      <Lock className="w-5 h-5 opacity-40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center sm:justify-center gap-1.5 flex-wrap">
                      <span className="font-black text-base sm:text-lg text-[var(--ink)]">
                        {milestone.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--edge)] text-white">
                        {milestone.requiredPoints} pts
                      </span>
                    </div>

                    <div className="text-[11px] text-[var(--mut)] mt-1 font-medium">
                      {tierSpots.spotsLeft?.toLocaleString()} / {tierSpots.total?.toLocaleString()} spots left
                    </div>

                    <div className="mt-2">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
                          Current Tier ✓
                        </span>
                      ) : isNext ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                          {pointsToNext} pts to unlock
                        </span>
                      ) : isComplete ? (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[var(--mut)]">
                          {Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts needed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Tier Goal & Action Row */}
        <div className="mt-6 pt-6 border-t-2 border-[var(--edge)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-500">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--mut)]">
                Next Tier Target
              </div>
              <div className="text-sm font-bold text-[var(--ink)]">
                {nextTierObj ? (
                  <span>
                    Earn <strong className="text-blue-600 dark:text-blue-400">{pointsToNext} more points</strong> to reach <strong style={{ color: nextTierObj.color }}>{nextTierObj.name} Tier</strong> ({nextTierObj.requiredPoints} pts).
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    🎉 Maximum Tier Reached! You have qualified for Legend Tier rewards.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tactile Button linking to Swags Gallery */}
          <Link
            to="/swags"
            className="btn-press btn-press--sm inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#1A73E8] text-white px-4 py-2.5 rounded-xl border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer no-underline"
          >
            <Gift className="w-4 h-4 text-white" />
            <span>View Eligible Swags &amp; Prizes</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. DETAILED BADGE COMPLETION REPORT                                       */}
      {/* ========================================================================= */}
      <InlineBadgeTracker participant={data} />
    </div>
  );
}
