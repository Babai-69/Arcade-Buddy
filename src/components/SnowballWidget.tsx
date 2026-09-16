import React, { useState, useEffect, useRef } from 'react';

const tiers = [
  {
    id: 'trooper', color: '#7dd3fc', icon: '🛡️', name: 'Arcade Trooper', points: 'Foundational milestone',
    explain: 'This is where everyone starts. Hit this points threshold and you unlock the <b>core swag pack</b> — the base of everything that follows.',
    newItems: [{ text: 'Core Swag Pack', from: null }]
  },
  {
    id: 'ranger', color: '#34d399', icon: '⚡', name: 'Arcade Ranger', points: 'Next step for consistent players',
    explain: 'Keep going and every reward from Trooper <b>stays with you</b> — Ranger just adds a bonus reward on top, it never replaces what you had.',
    newItems: [{ text: 'Bonus Reward', from: null }]
  },
  {
    id: 'champion', color: '#fbbf24', icon: '⭐', name: 'Arcade Champion', points: 'A major leap into the upper ranks',
    explain: 'Champion is a bigger jump — it resets the ledger and unlocks a <b>high-tier collection of premium gear</b> on its own terms.',
    newItems: [{ text: 'Premium Gear Collection', from: null }]
  },
  {
    id: 'legend', color: '#f472b6', icon: '👑', name: 'Arcade Legend', points: 'The absolute summit',
    explain: 'The top of the trail. Legend keeps <b>everything from Champion</b> and adds one final, exclusive Legend-only reward.',
    newItems: [{ text: 'Legend-Only Reward', from: 'carries Champion gear' }]
  }
];

const carryMap: Record<string, string[]> = {
  ranger: ['trooper'],
  champion: [],
  legend: ['champion']
};

const STEP_MS = 2500;

export function SnowballWidget() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepStartRef = useRef<number>(Date.now());
  const remainingRef = useRef<number>(STEP_MS);
  
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const startProgressAnim = (ms: number) => {
    setIsAnimating(false);
    setProgressWidth(0);
    // Force reflow
    setTimeout(() => {
      setIsAnimating(true);
      setProgressWidth(100);
      document.documentElement.style.setProperty('--sb-anim-dur', `${ms}ms`);
    }, 10);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNext = (ms: number) => {
    clearTimer();
    if (!autoPlay || reduceMotion) return;
    
    stepStartRef.current = Date.now();
    remainingRef.current = ms;
    startProgressAnim(ms);
    
    timerRef.current = setTimeout(() => {
      if (current < tiers.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setAutoPlay(false);
        setIsAnimating(false);
        setProgressWidth(100);
      }
    }, ms);
  };

  const pauseAuto = () => {
    if (timerRef.current) {
      remainingRef.current -= (Date.now() - stepStartRef.current);
      clearTimer();
      setIsAnimating(false);
      const doneRatio = Math.min(1, Math.max(0, 1 - remainingRef.current / STEP_MS));
      setProgressWidth(doneRatio * 100);
    }
  };

  useEffect(() => {
    if (autoPlay && !reduceMotion) {
      if (current < tiers.length - 1) {
        scheduleNext(STEP_MS);
      } else {
        setIsAnimating(false);
        setProgressWidth(100);
      }
    }
    
    return () => clearTimer();
  }, [current, autoPlay]);

  const handleToggleAuto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextAutoPlay = !autoPlay;
    setAutoPlay(nextAutoPlay);
    
    if (nextAutoPlay) {
      if (current === tiers.length - 1) {
        setCurrent(0);
      } else {
        scheduleNext(remainingRef.current > 0 ? remainingRef.current : STEP_MS);
      }
    } else {
      pauseAuto();
    }
  };

  const handleManualNav = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
    clearTimer();
    setIsAnimating(false);
    setProgressWidth(index === tiers.length - 1 ? 100 : 0);
  };

  const t = tiers[current];
  
  // Build ledger
  const carriedIds = carryMap[t.id] || [];
  const ledgerRows = [];
  
  for (const cid of carriedIds) {
    const ct = tiers.find(x => x.id === cid);
    if (ct) {
      ct.newItems.forEach(it => ledgerRows.push({ text: it.text, carried: true, source: ct.name }));
    }
  }
  
  t.newItems.forEach(it => ledgerRows.push({ text: it.text, carried: false, source: null }));

  return (
    <div className="w-full mx-auto mb-20 flex justify-center">
      <div 
        className="bg-gradient-to-b from-[#11142a] to-[#0b0d18] text-[#f1f3ff] rounded-[24px] p-8 md:p-12 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.09)] relative overflow-hidden font-sans flex flex-col justify-between"
        style={{ 
          '--sb-current-c': t.color,
          width: '1021.87px',
          height: '750px',
          maxWidth: '100%'
        } as React.CSSProperties}
        onMouseEnter={() => { if (autoPlay) pauseAuto(); }}
        onMouseLeave={() => { if (autoPlay && current < tiers.length - 1) scheduleNext(remainingRef.current > 400 ? remainingRef.current : STEP_MS); }}
      >
        <style>{`
          .sb-progress-fill {
            height: 100%;
            border-radius: 3px;
            background: var(--sb-current-c);
          }
          .sb-progress-fill.animating {
            animation: sb-fill-anim var(--sb-anim-dur) linear;
          }
          @keyframes sb-fill-anim {
            from { width: 0%; }
            to { width: 100%; }
          }
          @keyframes sb-item-in {
            to { opacity: 1; transform: translateX(0); }
          }
          .sb-ledger-item {
            opacity: 0;
            transform: translateX(-8px);
            animation: sb-item-in 0.4s ease forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .sb-ledger-item { animation: none; opacity: 1; transform: none; }
          }
        `}</style>
        
        <div className="text-center mb-6">
          <div className="text-[10px] tracking-[0.1em] text-[#9297b8] mb-2 uppercase font-bold">How Upgrading Works</div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">The Snowball Effect</h2>
          <p className="text-[13px] text-[#9297b8] leading-relaxed">
            Click through the tiers to see it for yourself: <b className="text-white">nothing you've earned ever gets left behind</b> — each new tier keeps everything from the one before it, then adds more on top.
          </p>
        </div>

        {/* Rail */}
        <div className="relative flex justify-between items-center mb-8 px-2">
          <div className="absolute left-6 right-6 top-1/2 h-[3px] bg-[rgba(255,255,255,0.09)] -translate-y-1/2 rounded-full z-0" />
          <div 
            className="absolute left-6 top-1/2 h-[3px] -translate-y-1/2 rounded-full z-10 transition-all duration-500 bg-gradient-to-r from-[#7dd3fc] via-[#34d399] to-[#fbbf24]"
            style={{ width: `${(current / (tiers.length - 1)) * 100}%` }}
          />
          
          {tiers.map((tier, i) => {
            const isActive = i === current;
            const isDone = i < current;
            
            return (
              <button 
                key={tier.id}
                onClick={() => handleManualNav(i)}
                className="relative z-20 flex flex-col items-center gap-2 bg-transparent border-none p-0 cursor-pointer group"
              >
                <div 
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 relative overflow-hidden
                    ${isActive ? 'scale-110' : ''}
                  `}
                  style={{
                    backgroundColor: isDone ? `color-mix(in srgb, ${tier.color} 16%, #161a34)` : '#161a34',
                    borderColor: (isActive || isDone) ? tier.color : 'rgba(255,255,255,0.09)',
                    boxShadow: isActive ? `0 0 0 5px color-mix(in srgb, ${tier.color} 22%, transparent)` 
                             : isDone ? `0 0 0 3px color-mix(in srgb, ${tier.color} 18%, transparent)` 
                             : 'none'
                  }}
                >
                  {/* Fill ring logic from original is complex for React inline, simplified slightly for visual parity */}
                  <span className="relative z-10">{tier.icon}</span>
                </div>
                <span 
                  className={`text-[10px] font-semibold whitespace-nowrap transition-colors duration-300 ${(isActive || isDone) ? 'text-white' : 'text-[#9297b8]'}`}
                >
                  {tier.name.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="bg-gradient-to-br from-[rgba(255,255,255,0.035)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.09)] rounded-[18px] p-5 shadow-inner">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all duration-400"
              style={{
                backgroundColor: `color-mix(in srgb, ${t.color} 18%, transparent)`,
                border: `1px solid color-mix(in srgb, ${t.color} 35%, transparent)`
              }}
            >
              {t.icon}
            </div>
            <div>
              <p className="text-[17px] font-bold m-0 transition-colors duration-400" style={{ color: t.color }}>{t.name}</p>
              <p className="text-[11px] text-[#9297b8] m-0 mt-0.5">{t.points}</p>
            </div>
          </div>
          
          <p 
            className="text-[13px] leading-relaxed text-[#9297b8] my-4"
            dangerouslySetInnerHTML={{ __html: t.explain }}
          />

          <div className="border-t border-[rgba(255,255,255,0.09)] pt-4">
            <p className="text-[9.5px] font-bold tracking-[0.06em] text-[#9297b8] m-0 mb-3 uppercase">What you've unlocked so far</p>
            <div className="flex flex-col gap-1.5 min-h-[120px]">
              {ledgerRows.map((r, idx) => (
                <div 
                  key={`${current}-${idx}`}
                  className={`sb-ledger-item flex items-center gap-2.5 p-2 rounded-lg border ${r.carried ? 'border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.02)]' : ''}`}
                  style={{
                    animationDelay: `${idx * 0.09}s`,
                    ...(r.carried ? {} : {
                      backgroundColor: `color-mix(in srgb, ${t.color} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${t.color} 40%, transparent)`
                    })
                  }}
                >
                  <div 
                    className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${r.carried ? 'bg-[rgba(255,255,255,0.08)] text-[#9297b8]' : 'text-[#0b0d18]'}`}
                    style={r.carried ? {} : { backgroundColor: t.color }}
                  >
                    {r.carried ? '✓' : '+'}
                  </div>
                  <span className={`text-[12px] ${r.carried ? 'text-[#9297b8]' : 'font-bold text-white'}`}>
                    {r.text}
                  </span>
                  {r.carried && r.source && (
                    <span className="ml-auto text-[9px] text-[#9297b8] opacity-70">from {r.source.split(' ')[1]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-5 mb-4">
          <button 
            disabled={current === 0}
            onClick={() => handleManualNav(current - 1)}
            className="text-[12px] font-bold px-3.5 py-2 rounded-lg border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.03)] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-[rgba(255,255,255,0.07)] transition-colors"
          >
            ← Back
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#9297b8]">Tier {current + 1} of {tiers.length}</span>
            <button 
              onClick={handleToggleAuto}
              className="flex items-center gap-1.5 text-[10px] text-[#9297b8] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.09)] px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.07)] transition-colors"
            >
              <span className="w-3 text-center">{autoPlay ? '⏸' : '▶'}</span>
            </button>
          </div>
          
          <button 
            disabled={current === tiers.length - 1}
            onClick={() => handleManualNav(current + 1)}
            className="text-[12px] font-bold px-3.5 py-2 rounded-lg text-[#0b0d18] disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:brightness-110 transition-all"
            style={{ backgroundColor: t.color }}
          >
            {current === tiers.length - 1 ? 'Max Tier' : 'Rank Up →'}
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-[3px] w-full bg-[rgba(255,255,255,0.09)] rounded-full overflow-hidden">
          <div 
            className={`sb-progress-fill ${isAnimating ? 'animating' : ''}`}
            style={{ width: isAnimating ? '0%' : `${progressWidth}%` }}
          />
        </div>

        {/* Note */}
        <div className="mt-5 flex gap-2.5 p-3 rounded-xl bg-[rgba(251,191,36,0.06)] border border-[rgba(251,191,36,0.22)] text-[11px] leading-relaxed text-[#fde68a]">
          <span>⚠️</span>
          <span><b className="text-[#fef3c7]">One exception:</b> Trooper and Ranger rewards don't carry into Champion or Legend — the snowball only rolls forward between <i>consecutive</i> tiers.</span>
        </div>
      </div>
    </div>
  );
}
