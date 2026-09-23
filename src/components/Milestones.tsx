import React, { useState, useEffect } from 'react';
import { MILESTONES } from '../types';
import { RefreshCw } from 'lucide-react';

const fallbackData = {
  trooper:  { spotsLeft: 5227, total: 6000 },
  ranger:   { spotsLeft: 3927, total: 4000 },
  champion: { spotsLeft: 2989, total: 3000 },
  legend:   { spotsLeft: 2500, total: 2500 }
};

interface SpotData {
  spotsLeft: number;
  total: number;
}

const TIER_ICONS: Record<string, string> = {
  trooper: '◎',
  ranger: '▲',
  champion: '🏆',
  legend: '♛'
};

const TIER_CONFIG: Record<string, {
  tierKey: string;
  cssVar: string;
  glowVar: string;
}> = {
  trooper: {
    tierKey: 'trooper',
    cssVar: 'var(--tier-trooper)',
    glowVar: 'var(--tier-trooper-glow)',
  },
  ranger: {
    tierKey: 'ranger',
    cssVar: 'var(--tier-ranger)',
    glowVar: 'var(--tier-ranger-glow)',
  },
  champion: {
    tierKey: 'champion',
    cssVar: 'var(--tier-champion)',
    glowVar: 'var(--tier-champion-glow)',
  },
  legend: {
    tierKey: 'legend',
    cssVar: 'var(--tier-legend)',
    glowVar: 'var(--tier-legend-glow)',
  }
};

export function Milestones() {
  const [spotsData, setSpotsData] = useState<Record<string, SpotData>>(fallbackData);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSpots = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setSpotsLoading(true);

    try {
      const res = await fetch('/api/arcade-spots');
      const data = await res.json();
      if (data && data.trooper) {
        setSpotsData(data);
      }
      if (data.last_updated_at) {
        setLastUpdated(new Date(data.last_updated_at));
      } else {
        setLastUpdated(new Date());
      }
    } catch {
      // keep fallback values silently
    } finally {
      setSpotsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSpots(); // on load
    const interval = setInterval(() => fetchSpots(false), 30 * 60 * 1000); // 30 mins

    // Animate progress bar widths from 0% to real percentage on mount
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 180);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 1) return 'JUST NOW';
    if (minutes === 1) return '1 MINUTE AGO';
    if (minutes < 60) return `${minutes} MINUTES AGO`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 HOUR AGO';
    return `${hours} HOURS AGO`;
  };

  return (
    <section
      id="milestones"
      className="relative w-full rounded-3xl overflow-hidden py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border border-[var(--retro-border)] bg-[var(--retro-bg)] shadow-[var(--retro-card-shadow)] transition-colors duration-300"
      style={{
        background: 'linear-gradient(180deg, var(--retro-panel-2) 0%, var(--retro-bg) 100%)'
      }}
    >
      {/* Subtle Scanlines & 28px Pixel Grid Background - Masked towards edges */}
      <div
        className="absolute inset-0 pointer-events-none -z-0 opacity-80 dark:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(var(--retro-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--retro-grid) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none -z-0 opacity-40 dark:opacity-70"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              var(--retro-scanline) 0px,
              var(--retro-scanline) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <span className="pixel-font inline-block text-[11px] sm:text-xs tracking-[3px] uppercase font-bold text-[var(--retro-teal)] mb-3 drop-shadow-[0_0_8px_rgba(111,227,214,0.3)]">
            ◆ Level Up ◆
          </span>

          <h2
            className="pixel-font text-2xl sm:text-3xl md:text-4xl leading-relaxed sm:leading-relaxed font-bold tracking-tight text-[var(--retro-heading)] mb-3"
            style={{
              textShadow: 'var(--retro-header-glow)'
            }}
          >
            SWAG <span className="text-[var(--retro-teal)]">MILESTONES</span>
          </h2>

          <p className="mono-font text-xs sm:text-sm text-[var(--retro-muted)] max-w-xl mx-auto leading-relaxed">
            Track your progress and unlock exclusive rewards as you conquer Arcade challenges.
          </p>
        </header>

        {/* 4 Cards Grid - Responsive: 4 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {MILESTONES.map((milestone) => {
            const tierKey = milestone.name.toLowerCase();
            const config = TIER_CONFIG[tierKey] || TIER_CONFIG.trooper;
            const spotInfo = spotsData[tierKey] || fallbackData[tierKey as keyof typeof fallbackData];

            const filled = spotInfo.total - spotInfo.spotsLeft;
            const percentRaw = (filled / spotInfo.total) * 100;
            const percentDisplay = Math.round(percentRaw * 10) / 10;
            const targetWidth = Math.max(3, Math.min(100, percentRaw));
            const iconGlyph = TIER_ICONS[tierKey] || '◎';

            return (
              <div
                key={milestone.id}
                data-tier={tierKey}
                className="group relative rounded-xl p-5 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, var(--retro-panel-2) 0%, var(--retro-panel) 100%)',
                  border: `2px solid var(--retro-border)`,
                  boxShadow: 'var(--retro-card-shadow)',
                  // CSS variable overrides for card tier
                  ['--tier' as any]: config.cssVar,
                  ['--tier-glow' as any]: config.glowVar,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `var(--tier)`;
                  e.currentTarget.style.boxShadow = `0 0 24px -4px var(--tier-glow), var(--retro-card-shadow)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `var(--retro-border)`;
                  e.currentTarget.style.boxShadow = `var(--retro-card-shadow)`;
                }}
              >
                {/* Pixel Corner Accent Ticks */}
                <div className="absolute inset-0 pointer-events-none rounded-xl border border-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />

                {/* Icon Row: Icon Box (Left) + Points Pill (Right) */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: 'var(--retro-icon-bg)',
                      border: '1.5px solid var(--tier)',
                      color: 'var(--tier)',
                      boxShadow: '0 0 10px -2px var(--tier-glow)'
                    }}
                  >
                    <span>{iconGlyph}</span>
                  </div>

                  <div
                    className="pixel-font text-[10px] tracking-wider px-2.5 py-1 rounded transition-colors duration-200"
                    style={{
                      background: 'var(--retro-pill-bg)',
                      border: '1px solid var(--tier)',
                      color: 'var(--tier)',
                      boxShadow: '0 0 8px -3px var(--tier-glow)'
                    }}
                  >
                    {milestone.requiredPoints} PTS
                  </div>
                </div>

                {/* Milestone Heading */}
                <h3 className="pixel-font text-base sm:text-lg font-bold tracking-tight text-[var(--retro-text)] mb-1">
                  {milestone.name.toUpperCase()}
                </h3>

                {/* Milestone Label */}
                <div className="mono-font text-xs text-[var(--retro-muted)] font-medium mb-5">
                  {milestone.reward}
                </div>

                {/* Meta Row: Spots Left & Percentage */}
                <div className="mono-font flex items-center justify-between text-xs mb-2.5">
                  <span className="text-[var(--retro-muted)]">
                    {spotsLoading ? (
                      <span className="inline-block w-28 h-3.5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    ) : (
                      `${spotInfo.spotsLeft.toLocaleString()} / ${spotInfo.total.toLocaleString()} spots left`
                    )}
                  </span>
                  <b className="font-bold text-[var(--retro-text)]">
                    {spotsLoading ? '...' : `${percentDisplay}%`}
                  </b>
                </div>

                {/* Progress Bar with Pixel Segmented Track, Fill Animation, Shimmer Sweep, and Pulsing Pip */}
                <div
                  className="w-full h-3 rounded-[3px] overflow-hidden relative"
                  style={{
                    background: 'var(--retro-track)',
                    backgroundImage: 'repeating-linear-gradient(90deg, var(--retro-stripe) 0 2px, transparent 2px 6px)',
                    border: '1px solid var(--retro-border)'
                  }}
                  title={`${percentDisplay}% filled`}
                >
                  <div
                    className="retro-bar-fill-animated relative h-full rounded-[2px]"
                    style={{
                      width: isMounted ? `${targetWidth}%` : '0%',
                      background: 'var(--tier)',
                      boxShadow: '0 0 10px var(--tier-glow)',
                      transition: 'width 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  >
                    {/* Moving Shimmer Sweep */}
                    <div
                      className="absolute inset-y-0 left-0 w-2/5 animate-retro-shimmer pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent)',
                        mixBlendMode: 'overlay'
                      }}
                    />

                    {/* Leading Edge Glowing Pulsing Pip */}
                    <div
                      className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white animate-retro-pulse pointer-events-none"
                      style={{
                        boxShadow: '0 0 8px 2px var(--tier)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synced Footer Info */}
        <div className="mono-font flex items-center justify-center gap-3 text-[11px] tracking-wider text-[var(--retro-muted)] mt-8 sm:mt-10">
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full bg-[var(--retro-teal-accent)] shadow-[0_0_8px_var(--retro-teal-accent)] animate-pulse"
            />
            <span>
              {lastUpdated && !spotsLoading
                ? `LAST SYNCED ${getTimeAgo(lastUpdated)}`
                : 'CHECKING ARCADE SPOTS...'}
            </span>
          </span>

          <button
            onClick={() => fetchSpots(true)}
            disabled={isRefreshing}
            className="p-1 rounded-md text-[var(--retro-muted)] hover:text-[var(--retro-text)] hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors disabled:opacity-40 cursor-pointer"
            title="Refresh spots data"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[var(--retro-teal)]' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
}

