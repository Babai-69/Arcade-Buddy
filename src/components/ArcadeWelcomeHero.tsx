import React, { useMemo } from 'react';

interface ArcadeWelcomeHeroProps {
  data: any;
  totalPoints: number;
  currentTier: string;
  isEnrolled: boolean;
}

export function ArcadeWelcomeHero({
  data,
  totalPoints,
  currentTier,
  isEnrolled,
}: ArcadeWelcomeHeroProps) {
  // Extract clean username (first name or full name fallback)
  const userName = useMemo(() => {
    if (!data?.name) return 'CHALLENGER';
    const trimmed = data.name.trim();
    // Return uppercase display name for zine poster impact
    return trimmed.toUpperCase();
  }, [data?.name]);

  // Calculate real active streak from earned badge dates
  const streakDays = useMemo(() => {
    if (!data?.badges || !Array.isArray(data.badges) || data.badges.length === 0) {
      return 1;
    }
    const dateStrings = new Set<string>();
    data.badges.forEach((b: any) => {
      const raw = b._debugParsedDate || b.earnedDate?.replace(/^Earned\s+/i, '');
      if (raw) {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) {
          dateStrings.add(d.toISOString().slice(0, 10));
        }
      }
    });

    if (dateStrings.size === 0) return 1;
    const sorted = Array.from(dateStrings).sort().reverse();

    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      const curr = new Date(sorted[i]).getTime();
      const prev = new Date(sorted[i + 1]).getTime();
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        break;
      }
    }
    return Math.max(1, streak);
  }, [data?.badges]);

  // Dynamic next tier calculation
  const { nextTierName, pointsNeeded, isMaxTier } = useMemo(() => {
    if (totalPoints < 50) {
      return { nextTierName: 'Trooper', pointsNeeded: 50 - totalPoints, isMaxTier: false };
    } else if (totalPoints < 75) {
      return { nextTierName: 'Ranger', pointsNeeded: 75 - totalPoints, isMaxTier: false };
    } else if (totalPoints < 95) {
      return { nextTierName: 'Champion', pointsNeeded: 95 - totalPoints, isMaxTier: false };
    } else if (totalPoints < 120) {
      return { nextTierName: 'Legend', pointsNeeded: 120 - totalPoints, isMaxTier: false };
    } else {
      return { nextTierName: 'Legend', pointsNeeded: 0, isMaxTier: true };
    }
  }, [totalPoints]);

  const scrollToMilestones = () => {
    const el = document.getElementById('milestones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStats = () => {
    window.scrollBy({ top: 400, behavior: 'smooth' });
  };

  const totalBadges = (data?.badges?.length) || 0;

  return (
    <section
      aria-label="Arcade Welcome Hero"
      className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10 border-[2.5px] border-[var(--arcade-hero-border)] shadow-[var(--arcade-hero-shadow)] transition-colors duration-300"
      style={{
        background: 'var(--arcade-hero-bg)',
      }}
    >
      {/* Soft Marquee Glow Blobs (Magenta & Cyan) */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none -z-0 opacity-70 dark:opacity-100"
        style={{ background: 'var(--arcade-hero-blob-magenta)' }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none -z-0 opacity-70 dark:opacity-100"
        style={{ background: 'var(--arcade-hero-blob-cyan)' }}
      />

      {/* Mascot/Icon Floating Element in Top-Right Corner */}
      <div
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 flex flex-col items-center justify-center select-none"
        title="Arcade Mascot"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-black/5 dark:bg-white/5 border border-[var(--arcade-hero-border)] backdrop-blur-md shadow-[0_4px_20px_rgba(255,45,149,0.25)] transition-transform duration-300 hover:scale-110">
          <span className="text-3xl sm:text-4xl filter drop-shadow-[0_4px_8px_rgba(0,229,255,0.45)]">
            🕹️
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Huge Headline in Archivo Black with Neon Accent & Outlined Stroke Effect */}
        <div className="relative inline-block mb-2">
          <h1 className="font-['Archivo_Black',sans-serif] text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-[var(--arcade-hero-text)]">
            <div className="tracking-tight">WELCOME</div>
            <div
              className="mt-1 text-[var(--arcade-hero-magenta)] transition-colors"
              style={{
                textShadow: '0 0 16px var(--arcade-hero-magenta-glow)',
                WebkitTextStroke: '1px var(--arcade-hero-border)',
              }}
            >
              {userName}
            </div>
          </h1>

          {/* Spinning Star / Sparkle Icon (✦) */}
          <div
            className="absolute -top-3 sm:-top-4 -right-7 sm:-right-9 text-2xl sm:text-3xl text-[var(--arcade-hero-cyan)] animate-star-spin select-none pointer-events-none"
            style={{
              textShadow: '0 0 10px var(--arcade-hero-cyan)',
            }}
            aria-hidden="true"
          >
            ✦
          </div>
        </div>

        {/* Micro-tagline in Pixel Font */}
        <div className="pixel-font text-[10px] sm:text-xs tracking-wider font-bold text-[var(--arcade-hero-cyan)] uppercase mt-2 mb-4">
          RULE YOUR RANK · CLAIM YOUR SWAG
        </div>

        {/* Live Stats Body Copy */}
        <p className="text-sm sm:text-base text-[var(--arcade-hero-text)]/90 max-w-2xl leading-relaxed mb-6 font-medium">
          You have earned <strong className="text-[var(--arcade-hero-magenta)] font-bold">{totalPoints} Arcade Points</strong> across{' '}
          <span className="text-[var(--arcade-hero-cyan)] font-bold">{totalBadges} badges</span> with an ongoing{' '}
          <strong className="text-[var(--arcade-hero-magenta)] font-bold">{streakDays}-day streak</strong>.{' '}
          {!isMaxTier ? (
            <span>
              Only <strong className="text-[var(--arcade-hero-yellow)] font-bold">{pointsNeeded} more points</strong> needed to unlock the{' '}
              <strong className="text-[var(--arcade-hero-yellow)] font-bold uppercase">{nextTierName}</strong> tier!
            </span>
          ) : (
            <span className="text-[var(--arcade-hero-yellow)] font-bold">
              🎉 Maximum Legend Tier Unlocked! Keep collecting points for the prize counter!
            </span>
          )}
        </p>

        {/* Two Chunky CTA Buttons Side-by-Side */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="https://go.cloudskillsboost.google/arcade"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-7 py-3 rounded-md font-['Archivo_Black',sans-serif] text-xs sm:text-sm uppercase tracking-wider text-white bg-[var(--arcade-hero-magenta)] hover:opacity-95 shadow-[0_4px_16px_var(--arcade-hero-magenta-glow)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>Continue Grinding</span>
            <span>→</span>
          </a>

          <button
            type="button"
            onClick={scrollToMilestones}
            className="px-6 sm:px-7 py-3 rounded-md font-['Archivo_Black',sans-serif] text-xs sm:text-sm uppercase tracking-wider text-[var(--arcade-hero-text)] border-2 border-[var(--arcade-hero-border)] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            View Milestones
          </button>
        </div>

        {/* Small Centered Scroll Prompt */}
        <div className="pt-8 sm:pt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToStats}
            className="mono-font inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[2px] uppercase text-[var(--arcade-hero-muted)] hover:text-[var(--arcade-hero-text)] transition-colors cursor-pointer group"
          >
            <span>SCROLL FOR STATS</span>
            <span className="text-xs transition-transform group-hover:translate-y-0.5">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
