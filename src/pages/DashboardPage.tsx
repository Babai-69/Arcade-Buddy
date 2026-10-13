import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, RefreshCw, Zap, CheckCircle2, CloudOff, Search, LogIn, Sparkles, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';
import { PosterModal } from '../components/PosterModal';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { Milestones } from '../components/Milestones';
import { ArcadeWelcomeHero } from '../components/ArcadeWelcomeHero';
import { showNotification } from '../components/ArcadeNotification';
import { fetchProfileCalculator } from '../services/arcadeApiService';
import { SwagTierProgressSection } from '../components/SwagTierProgressSection';

export function DashboardPage({ participants }: { participants: any[] }) {
  const [user, setUser] = useState<any>(null);

  // 1. Instantly read offline preview from localStorage (0ms delay)
  const [data, setData] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('arcadeProgressData');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isOfflinePreview, setIsOfflinePreview] = useState<boolean>(() => {
    return !!localStorage.getItem('arcadeProgressData');
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem('arcadeLastSyncTime') || null;
  });

  // If cached data is present, NEVER block with skeleton loader!
  const [loading, setLoading] = useState<boolean>(() => {
    return !localStorage.getItem('arcadeProgressData');
  });

  const [spots, setSpots] = useState<any>({
    trooper: { spotsLeft: 6000, total: 6000 },
    ranger: { spotsLeft: 4000, total: 4000 },
    champion: { spotsLeft: 3000, total: 3000 },
    legend: { spotsLeft: 2500, total: 2500 },
  });

  const [connectUrl, setConnectUrl] = useState('');
  const [connectError, setConnectError] = useState('');
  const [connectLoading, setConnectLoading] = useState(false);

  const syncInProgressRef = useRef(false);

  // Auto-sync in background without blocking user
  const syncProfileData = async (url: string, force = false) => {
    if (!url || syncInProgressRef.current) return;

    // Check if user session has already performed the sync
    const alreadySyncedInSession = sessionStorage.getItem('arcadeSessionDashboardSynced') === 'true';
    if (!force && alreadySyncedInSession) {
      // 2nd time onwards in this browser session: show offline preview with 0 waiting!
      return;
    }

    syncInProgressRef.current = true;
    setIsSyncing(true);

    // Show retro arcade notification in right-side corner directly above chatbot
    showNotification({
      id: 'profile-sync',
      message: 'Updating Profile Data...',
      type: 'loading',
    });

    try {
      const result = await fetchProfileCalculator(url, { maxRetries: 1 });
      if (result && (result.badges || result.arcadePoints !== undefined)) {
        setData(result);
        setIsOfflinePreview(false);
        localStorage.setItem('arcadeProgressData', JSON.stringify(result));
        localStorage.setItem('arcadeProfileUrl', url);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        localStorage.setItem('arcadeLastSyncTime', timeStr);
        setLastSyncTime(timeStr);
        sessionStorage.setItem('arcadeSessionDashboardSynced', 'true');

        if (user) {
          try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { profileUrl: url }, { merge: true });
          } catch (err) {
            console.warn('Failed to save profileUrl to Firestore:', err);
          }
        }

        // Retro success notification
        showNotification({
          id: 'profile-sync',
          message: 'Profile Data Updated!',
          type: 'success',
          duration: 2600,
        });
      } else {
        showNotification({
          id: 'profile-sync',
          message: 'Showing Offline Preview',
          type: 'info',
          duration: 2400,
        });
      }
    } catch (e) {
      showNotification({
        id: 'profile-sync',
        message: 'Showing Offline Preview',
        type: 'info',
        duration: 2400,
      });
    } finally {
      syncInProgressRef.current = false;
      setIsSyncing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/arcade-spots').then(r => r.json()).then(d => setSpots(d)).catch(() => {});

    const sessionSynced = sessionStorage.getItem('arcadeSessionDashboardSynced') === 'true';

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        // When user logs out, purge cached progress data so dashboard never shows stale data
        setData(null);
        setLoading(false);
        setIsOfflinePreview(false);
        localStorage.removeItem('arcadeProgressData');
        localStorage.removeItem('arcadeProfileUrl');
        localStorage.removeItem('arcadeLastSyncTime');
        sessionStorage.removeItem('arcadeSessionDashboardSynced');
        return;
      }

      // When user is logged in, fetch their saved profile from Firestore
      let targetUrl: string | null = null;
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().profileUrl) {
          targetUrl = userSnap.data().profileUrl;
        }
      } catch (e) {
        console.warn('Could not load user profile from Firestore, using local session:', e);
      }

      if (!targetUrl) {
        targetUrl = localStorage.getItem('arcadeProfileUrl');
      }

      if (targetUrl) {
        setConnectUrl(targetUrl);
        if (!data) {
          setLoading(true);
          syncProfileData(targetUrl, true);
        } else if (!sessionSynced) {
          syncProfileData(targetUrl, false);
        } else {
          setLoading(false);
        }
      } else {
        setData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleManualSync = () => {
    const targetUrl = data?.profileUrl || localStorage.getItem('arcadeProfileUrl');
    if (targetUrl) {
      syncProfileData(targetUrl, true);
    }
  };

  const handleConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlToUse = connectUrl.trim();
    if (!urlToUse) return;
    setConnectLoading(true);
    setConnectError('');
    try {
      const result = await fetchProfileCalculator(urlToUse, {
        maxRetries: 2,
        retryDelayMs: 3500,
        onRetry: (attempt, max) => {
          setConnectError(`Connecting to backend service (Attempt ${attempt}/${max})... Render server may be waking up.`);
        }
      });

      setData(result);
      setIsOfflinePreview(false);
      localStorage.setItem('arcadeProgressData', JSON.stringify(result));
      localStorage.setItem('arcadeProfileUrl', urlToUse);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('arcadeLastSyncTime', timeStr);
      setLastSyncTime(timeStr);
      sessionStorage.setItem('arcadeSessionDashboardSynced', 'true');

      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { profileUrl: urlToUse }, { merge: true });
        } catch (err) {
          console.warn('Failed to update Firestore profileUrl:', err);
        }
      }

      showNotification({
        id: 'profile-sync',
        message: 'Profile Data Updated!',
        type: 'success',
        duration: 2600,
      });
    } catch (err: any) {
      setConnectError(err.message || 'Failed to analyze profile. Please verify your URL.');
    } finally {
      setConnectLoading(false);
    }
  };

  const handleDashboardCalculate = async (urlToUse: string) => {
    if (!urlToUse) return;
    setIsSyncing(true);
    try {
      const result = await fetchProfileCalculator(urlToUse, {
        maxRetries: 2,
        retryDelayMs: 3500,
      });

      setData(result);
      setIsOfflinePreview(false);
      localStorage.setItem('arcadeProgressData', JSON.stringify(result));
      localStorage.setItem('arcadeProfileUrl', urlToUse);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('arcadeLastSyncTime', timeStr);
      setLastSyncTime(timeStr);
      sessionStorage.setItem('arcadeSessionDashboardSynced', 'true');

      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { profileUrl: urlToUse }, { merge: true });
        } catch (err) {
          console.warn('Failed to update Firestore profileUrl:', err);
        }
      }

      showNotification({
        id: 'profile-calc',
        message: 'Profile Calculated! Swag Tier Updated.',
        type: 'success',
        duration: 3000,
      });

      setTimeout(() => {
        document.getElementById('swag-tier-progress')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return result;
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (!data) {
    return (
      <div className="dashboard-page-root min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-20 font-sans">
        <div className="top-rgby-stripe" aria-hidden="true" />
        
        {/* Styled Card Container */}
        <div className="relative max-w-xl w-full mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl text-center overflow-hidden">
          {/* Subtle Google RGBY Gradient Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[220px] bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
            <span>{user ? 'PARTICIPANT PROFILE' : 'NO PROFILE DATA LINKED'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Connect Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">Skills Boost</span> Profile
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
            Enter your public profile URL below. Your earned badges, milestone bonuses, and leaderboard standing will sync and display automatically.
          </p>

          {/* Direct Profile URL Input Form */}
          <form onSubmit={handleConnectSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-5 text-left">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="https://www.skills.google/public_profiles/..."
                value={connectUrl}
                onChange={(e) => setConnectUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={connectLoading || !connectUrl.trim()}
              className="btn-press btn-press--primary text-sm font-bold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-xl shadow-[3px_3px_0_var(--edge)] disabled:opacity-50"
            >
              {connectLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Calculate &amp; Sync</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {connectError && (
            <p className="mb-4 text-xs text-red-600 dark:text-red-400 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{connectError}</span>
            </p>
          )}

          {/* If user is not logged in, offer quick sign-in option */}
          {!user && (
            <div className="mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Save Profile Permanently</span>
              </button>
            </div>
          )}

          {/* Secondary Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Open Calculator &rarr;</span>
            </Link>
            <span>•</span>
            <Link to="/public-profile-help" className="hover:underline">
              How to find profile URL?
            </Link>
            <span>•</span>
            <Link to="/" className="hover:underline">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardContent
      data={data}
      spots={spots}
      participants={participants}
      isOfflinePreview={isOfflinePreview}
      isSyncing={isSyncing}
      lastSyncTime={lastSyncTime}
      onManualSync={handleManualSync}
      onCalculateProfile={handleDashboardCalculate}
    />
  );
}

function DashboardContent({
  data,
  spots,
  participants,
  isOfflinePreview,
  isSyncing,
  lastSyncTime,
  onManualSync,
  onCalculateProfile,
}: {
  data: any;
  spots: any;
  participants: any[];
  isOfflinePreview?: boolean;
  isSyncing?: boolean;
  lastSyncTime?: string | null;
  onManualSync?: () => void;
  onCalculateProfile?: (url: string) => Promise<any>;
}) {
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [showCalculatorBar, setShowCalculatorBar] = useState(false);
  const [calcInputUrl, setCalcInputUrl] = useState('');
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState('');

  const submitCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = calcInputUrl.trim();
    if (!url || !onCalculateProfile) return;
    setCalcLoading(true);
    setCalcError('');
    try {
      await onCalculateProfile(url);
      setShowCalculatorBar(false);
      setCalcInputUrl('');
    } catch (err: any) {
      setCalcError(err.message || 'Failed to calculate profile. Please verify your public profile URL.');
    } finally {
      setCalcLoading(false);
    }
  };

  // Compute basic stats
  const gameBadgesCount = data.badges?.filter((b: any) => b.validForProgram && b.category === 'Game').length || 0;
  const skillBadgesCount = data.badges?.filter((b: any) => b.validForProgram && b.category === 'Skill').length || 0;
  const triviaBadgesCount = data.badges?.filter((b: any) => b.validForProgram && b.category === 'Trivia').length || 0;

  const basePoints = data.arcadePoints || 0;
  
  
  let rawMilestoneBonus = 0;
  let rawMilestoneName = 'None';
  if (gameBadgesCount >= 12 && skillBadgesCount >= 66) { rawMilestoneBonus = 35; rawMilestoneName = 'Ultimate'; }
  else if (gameBadgesCount >= 8 && skillBadgesCount >= 42) { rawMilestoneBonus = 25; rawMilestoneName = 'Milestone 3'; }
  else if (gameBadgesCount >= 4 && skillBadgesCount >= 22) { rawMilestoneBonus = 15; rawMilestoneName = 'Milestone 2'; }
  else if (gameBadgesCount >= 2 && skillBadgesCount >= 10) { rawMilestoneBonus = 5; rawMilestoneName = 'Milestone 1'; }
  
  let milestoneBonus = isEnrolled ? rawMilestoneBonus : 0;
  let milestoneName = rawMilestoneName;
 // Actually 9 in rules, but screenshot says +5 for MS1

  const totalPoints = basePoints + milestoneBonus;
  
  // Rank calculation
  let rank = '-';
  if (participants && participants.length > 0) {
    const sorted = [...participants].sort((a, b) => b.totalPoints - a.totalPoints);
    const extractId = (url) => {
      if (!url) return '';
      const match = url.match(/public_profiles\/([a-zA-Z0-9-]+)/);
      return match ? match[1] : url.trim();
    };
    const myId = extractId(data.profileUrl);
    const myIndex = sorted.findIndex(p => extractId(p.profileUrl) === myId);
    if (myIndex !== -1) rank = `#${myIndex + 1}`;
  }

  // Tier calculation
  let currentTier = 'Participant';
  if (totalPoints >= 120) currentTier = 'Legend';
  else if (totalPoints >= 95) currentTier = 'Champion';
  else if (totalPoints >= 75) currentTier = 'Ranger';
  else if (totalPoints >= 50) currentTier = 'Trooper';

  return (
    <div className="dashboard-page-root min-h-screen pt-24 pb-20 px-4">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Top 4-Color Stripe */}
      <div className="top-rgby-stripe" aria-hidden="true" />

      {/* Embedded CSS Style System */}
      <style>{`
        :root {
          --edge: #EDEFF4;
          --ink: #E8EAED;
          --mut: #9AA0A6;
          --card: #141A2E;
          --bg: #0C1022;
          --ln: rgba(255,255,255,.1);
          --pill: rgba(20,26,46,.8);
          --b: #4C8DFF;
          --r: #EA4335;
          --y: #FBBC05;
          --yt: #FDD663;
          --gr: #34A853;
          --t1: #1C2848;
          --t2: #12332B;
          --t3: #3A2D1A;
          --t4: #3A1F24;
          --g1: #0C1022;
          --g2: #0D1430;
          --g3: #0A1D22;
          --sh: rgba(0,0,0,.35);
        }

        :root[data-theme="light"],
        html:not(.dark) {
          --edge: #202124;
          --ink: #202124;
          --mut: #5F6368;
          --card: #fff;
          --bg: #F8F9FA;
          --ln: #DADCE0;
          --pill: rgba(255,255,255,.88);
          --b: #1A73E8;
          --r: #D93025;
          --y: #FBBC05;
          --yt: #B06000;
          --gr: #1E8E3E;
          --t1: #E8F0FE;
          --t2: #E6F4EA;
          --t3: #FEF7E0;
          --t4: #FCE8E6;
          --g1: #fff;
          --g2: #F8F9FA;
          --g3: #F1F6FE;
          --sh: rgba(60,64,67,.16);
        }

        .dashboard-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftDash 18s ease-in-out infinite alternate;
        }

        @keyframes driftDash {
          to { background-position: 100% 100%; }
        }

        .top-rgby-stripe {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: 9999;
          background: linear-gradient(90deg, #4285F4 25%, #EA4335 25% 50%, #FBBC05 50% 75%, #34A853 75%);
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Retro Arcade Zine Welcome Hero */}
        <ArcadeWelcomeHero
          data={data}
          totalPoints={totalPoints}
          currentTier={currentTier}
          isEnrolled={isEnrolled}
        />

        {/* Top Row: Profile (Left) + Stats (Right) */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Profile Card */}
          <div className="bg-[var(--card)] rounded-3xl border-2 border-[var(--edge)] shadow-[5px_5px_0_var(--edge)] overflow-hidden lg:w-1/3 flex flex-col transition-all">
            <div className="flex w-full border-b-2 border-[var(--edge)]">
              <div className="w-1/2 bg-[#1A73E8] text-white text-center py-3.5 border-r-2 border-[var(--edge)]">
                <div className="text-[10px] font-black tracking-widest uppercase opacity-90">ARCADE POINTS</div>
                <div className="text-3xl font-black font-mono tracking-tight">{totalPoints}</div>
              </div>
              <div className="w-1/2 bg-[#7c3aed] text-white text-center py-3.5">
                <div className="text-[10px] font-black tracking-widest uppercase opacity-90">RANK</div>
                <div className="text-3xl font-black font-mono tracking-tight">{rank}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center pt-8 pb-7 px-6 bg-[var(--card)] flex-grow relative">
              <div className="relative mb-4">
                <img
                  src={data.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`}
                  alt={`${data.name || 'Participant'}'s avatar profile picture`}
                  className="w-24 h-24 rounded-full border-3 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] object-cover bg-white"
                  crossOrigin="anonymous"
                />
                <div className="absolute bottom-0 right-0 bg-[#FBBC05] text-slate-950 rounded-full w-7 h-7 border-2 border-[var(--edge)] flex items-center justify-center text-sm shadow-[2px_2px_0_var(--edge)] font-black">
                  🥇
                </div>
              </div>
              <h2 className="text-2xl font-black font-display text-[var(--ink)] mb-6 text-center tracking-tight">{data.name || 'Student'}</h2>
              
              <div className="flex w-full max-w-[85%] mx-auto bg-[var(--bg)] rounded-2xl border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] mb-6 overflow-hidden">
                <div className="w-1/2 text-center py-3.5 border-r-2 border-[var(--edge)]">
                  <div className="text-[10px] font-black text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> EARNED
                  </div>
                  <div className="text-2xl font-black font-mono text-[var(--ink)] mt-0.5">{basePoints}</div>
                </div>
                <div className="w-1/2 text-center py-3.5">
                  <div className="text-[10px] font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> BONUS
                  </div>
                  <div className="text-2xl font-black font-mono text-[var(--ink)] mt-0.5">{milestoneBonus}</div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsPosterOpen(true)}
                className="btn-press btn-press--cta relative flex items-center justify-center gap-2 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: '2px solid var(--edge)', boxShadow: '4px 4px 0 var(--edge)' }}
              >
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-[var(--edge)] shadow-xs animate-pulse">NEW</span>
                <span>✨ Create Poster</span>
              </button>
            </div>
          </div>
          
          {/* Right Stats */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            
            <div className="bg-[var(--card)] rounded-3xl p-6 sm:p-7 border-2 border-[var(--edge)] shadow-[5px_5px_0_var(--edge)]">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="text-center md:text-left mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 mb-1">
                      ARCADE TRACK
                    </span>
                    <h3 className="font-black font-display text-xl text-[var(--ink)]">The Arcade</h3>
                    <p className="text-xs text-[var(--mut)] font-medium mb-4">Jan, 2026 - Dec, 2026</p>
                  </div>
                  
                  <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-[var(--bg)] border-2 border-[var(--edge)] shadow-inner mb-6">
                    <div className="h-full bg-[#1A73E8]" style={{ width: '45%' }} title="Arcade Games"></div>
                    <div className="h-full bg-[#7c3aed]" style={{ width: '20%' }} title="Sprint (Trivia)"></div>
                    <div className="h-full bg-[#34A853]" style={{ width: '35%' }} title="Skill Badges"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-[var(--bg)] rounded-2xl border-2 border-[var(--edge)] p-3 text-center shadow-[2px_2px_0_var(--edge)]">
                      <div className="text-[10px] font-black text-[var(--mut)] flex items-center justify-center gap-1 uppercase tracking-wider mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#1A73E8]"></span> Games
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-[#1A73E8]">{gameBadgesCount}</div>
                    </div>
                    <div className="bg-[var(--bg)] rounded-2xl border-2 border-[var(--edge)] p-3 text-center shadow-[2px_2px_0_var(--edge)]">
                      <div className="text-[10px] font-black text-[var(--mut)] flex items-center justify-center gap-1 uppercase tracking-wider mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span> Trivia
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-[#7c3aed]">{triviaBadgesCount}</div>
                    </div>
                    <div className="bg-[var(--bg)] rounded-2xl border-2 border-[var(--edge)] p-3 text-center shadow-[2px_2px_0_var(--edge)]">
                      <div className="text-[10px] font-black text-[var(--mut)] flex items-center justify-center gap-1 uppercase tracking-wider mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#34A853]"></span> Skills
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-[#34A853]">{skillBadgesCount}</div>
                    </div>
                  </div>
                </div>
                
                <div className="w-0.5 bg-[var(--edge)] hidden md:block self-stretch"></div>
                
                <div className="md:w-64">
                  <div className="text-center md:text-left mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 mb-1">
                      COHORT TRACK
                    </span>
                    <h3 className="font-black font-display text-xl text-[var(--ink)]">Facilitator Program</h3>
                    <p className="text-xs text-[var(--mut)] font-medium mb-4">Jul 13, 2026 - Sept 14, 2026</p>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2 mb-4 p-2 rounded-2xl bg-[var(--bg)] border-2 border-[var(--edge)] shadow-[2px_2px_0_var(--edge)] text-xs font-bold text-[var(--ink)]">
                    <span>Cohort Status</span>
                    <div 
                      onClick={() => setIsEnrolled(!isEnrolled)}
                      className={`w-11 h-6 rounded-full flex items-center p-0.5 cursor-pointer transition-colors border-2 border-[var(--edge)] ${isEnrolled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      role="button"
                      aria-label="Toggle Facilitator enrollment status"
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isEnrolled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div> 
                    <span className="text-[11px] font-black">{isEnrolled ? 'Enrolled' : 'Not Enrolled'}</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className={`rounded-2xl p-3 border-2 border-[var(--edge)] shadow-[2px_2px_0_var(--edge)] flex justify-between items-center ${milestoneBonus > 0 ? 'bg-[#EA4335] text-white' : 'bg-[var(--bg)] text-[var(--mut)]'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-base">👑</span>
                        <div className="leading-tight">
                          <div className="font-black text-sm">{milestoneName}</div>
                          <div className="text-[10px] opacity-80 uppercase tracking-wider">Milestone Achieved</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] opacity-80 uppercase tracking-wider">Earned</div>
                        <div className="font-black text-sm">{milestoneBonus > 0 ? '✓' : '—'}</div>
                      </div>
                    </div>
                    
                    <div className="rounded-2xl p-3 border-2 border-[var(--edge)] shadow-[2px_2px_0_var(--edge)] flex justify-between items-center bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 text-slate-950 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="text-base">⭐</span>
                        <div className="leading-tight">
                          <div className="font-black text-sm">Bonus Points</div>
                          <div className="text-[10px] opacity-80 uppercase tracking-wider">Milestone Reward</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] opacity-80 uppercase tracking-wider">Points</div>
                        <div className="font-black text-base font-mono">+{milestoneBonus}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#E8F0FE] dark:bg-slate-900/90 rounded-2xl p-4 border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-xl text-green-600">🏆</div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[var(--mut)]">Prize Tier</span>
                  <div className="font-black text-green-600 dark:text-green-400 text-lg leading-tight">{currentTier} Tier</div>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xs font-mono font-bold text-[var(--mut)]">{totalPoints} Total Arcade Points</div>
              </div>
              <a href="/swags" className="btn-press btn-press--sm bg-emerald-600 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 no-underline">
                View Prizes →
              </a>
            </div>
            
            <a href="https://discuss.google.dev/t/google-skills-arcade-2026-tiers/371066" target="_blank" rel="noopener noreferrer" className="block bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl py-2.5 px-4 border-2 border-[var(--edge)] shadow-[2px_2px_0_var(--edge)] text-center cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all no-underline">
              <span className="text-xs sm:text-sm font-black text-yellow-800 dark:text-yellow-300">How the 2026 Prize Tiers Work →</span>
            </a>
            
          </div>
        </div>
        
        {/* Badges & Activity Row */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
           <BadgesDistribution data={data} gameCount={gameBadgesCount} skillCount={skillBadgesCount} />
           <ActivityMonth badges={data.badges} />
        </div>
        
        {/* Facilitator Milestones */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 mb-2">
            <span>OFFICIAL FACILITATOR TIERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[var(--ink)] mb-1 tracking-tight">Facilitator Milestones</h2>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1">Your progress between 13th Jul. &amp; 14th Sept. 2026</p>
          <p className="text-xs text-[var(--mut)] italic mb-8 max-w-xl mx-auto font-medium">You will only receive bonus points for the milestone that you earn and not for the ones before that.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <MilestoneCard name="Milestone 1" bonus={5} gamesReq={6} skillsReq={18} games={gameBadgesCount} skills={skillBadgesCount} color="blue" />
            <MilestoneCard name="Milestone 2" bonus={15} gamesReq={8} skillsReq={34} games={gameBadgesCount} skills={skillBadgesCount} color="purple" />
            <MilestoneCard name="Milestone 3" bonus={25} gamesReq={10} skillsReq={50} games={gameBadgesCount} skills={skillBadgesCount} color="green" />
            <MilestoneCard name="Ultimate" bonus={35} gamesReq={12} skillsReq={66} games={gameBadgesCount} skills={skillBadgesCount} color="orange" />
          </div>
        </div>

        {/* Offline Preview / Fast Session Status Bar - Below Facilitator Milestones */}
        <div
          id="dashboard-sync-status-bar"
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:px-6 md:py-3.5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            {isSyncing ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 text-xs md:text-sm">
                    <Zap className="w-4 h-4 animate-pulse text-amber-500" />
                    Auto-updating profile progress in background...
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Checking Google Cloud Skills Boost for newly earned badges
                  </div>
                </div>
              </>
            ) : isOfflinePreview ? (
              <>
                <span className="flex h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs md:text-sm flex items-center gap-2">
                    <span>Showing <strong className="text-blue-600 dark:text-blue-400 font-bold">Offline Preview</strong></span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                      FAST LOAD
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Cached session snapshot {lastSyncTime ? `from ${lastSyncTime}` : ''} • Click Sync Now to fetch live updates
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs md:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Live Profile Data Synced</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
                      LIVE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    All badges and points are up to date {lastSyncTime ? `(Last sync: ${lastSyncTime})` : ''}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShowCalculatorBar(!showCalculatorBar)}
              className={`btn-press btn-press--sm flex items-center gap-2 text-xs md:text-sm font-bold cursor-pointer transition-all ${
                showCalculatorBar ? 'btn-press--primary is-pressed text-white' : 'btn-press--primary text-white'
              }`}
              title="Calculate another public profile URL"
            >
              <Search className="w-3.5 h-3.5 text-white" />
              <span>{showCalculatorBar ? 'Close Calculator' : 'Calculate Profile URL'}</span>
            </button>

            <button
              id="dashboard-manual-sync-btn"
              onClick={onManualSync}
              disabled={isSyncing}
              className="btn-press btn-press--sm btn-press--secondary flex items-center gap-2 text-xs md:text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh profile progress from Skills Boost"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Inline Public Profile URL Calculator Bar */}
        {showCalculatorBar && (
          <div className="p-5 sm:p-6 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)] shadow-[5px_5px_0_var(--edge)] transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-black text-sm sm:text-base text-[var(--ink)]">
                Calculate Any Public Profile URL
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mut)] mb-4">
              Enter any Google Cloud Skills Boost public profile URL to audit completed badges and instantly view live Swag Tier progress across Trooper (50 pts), Ranger (75 pts), Champion (95 pts), and Legend (120 pts).
            </p>
            <form onSubmit={submitCalculate} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="https://www.skills.google/public_profiles/..."
                  value={calcInputUrl}
                  onChange={(e) => setCalcInputUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-[var(--bg)] border-2 border-[var(--edge)] text-[var(--ink)] placeholder-[var(--mut)] focus:outline-none shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={calcLoading || !calcInputUrl.trim()}
                className="btn-press btn-press--primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-xl shadow-[3px_3px_0_var(--edge)] disabled:opacity-50"
              >
                {calcLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Badges...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Calculate &amp; View Swag Tier</span>
                  </>
                )}
              </button>
            </form>
            {calcError && (
              <p className="mt-3 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{calcError}</span>
              </p>
            )}
          </div>
        )}

        {/* Swag Tier Progress & Detailed Badge Completion Report */}
        <div className="pt-6">
          <SwagTierProgressSection data={data} spots={spots} defaultEnrolled={isEnrolled} />
        </div>

        {/* Swag Milestones (Tier Spots & Rewards) - Positioned below Swag Tier Progress */}
        <div className="pt-4">
          <Milestones />
        </div>
        
        <PosterModal 
          isOpen={isPosterOpen} 
          onClose={() => setIsPosterOpen(false)} 
          name={data.name || 'Student'} 
          points={totalPoints} 
          tier={currentTier} 
        />
    </div>
  </div>
  );
}

function BadgesDistribution({ data, gameCount, skillCount }: { data: any, gameCount: number, skillCount: number }) {
  const total = gameCount + skillCount;
  const pieData = [
    { name: 'Skill Badges', value: skillCount, fill: '#4285F4' },
    { name: 'Game Badges', value: gameCount, fill: '#EA4335' }
  ];

  return (
    <div className="bg-[var(--card)] rounded-3xl border-2 border-[var(--edge)] shadow-[5px_5px_0_var(--edge)] p-6 sm:p-7 flex-1 flex flex-col justify-between">
      <div className="flex justify-between items-center border-b-2 border-[var(--edge)] pb-4 mb-6">
        <h3 className="font-black font-display text-[var(--ink)] tracking-tight text-base sm:text-lg flex items-center gap-2">
          <span>🎯</span> BADGES DISTRIBUTION
        </h3>
        <div className="bg-[var(--edge)] text-white text-xs font-mono font-black px-3.5 py-1 rounded-full shadow-xs">
          {total} Total
        </div>
      </div>
      
      <div className="flex flex-col items-center my-auto">
        <div className="w-52 h-26 relative overflow-hidden mb-4">
          <ResponsiveContainer width="100%" height="200%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={65}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 left-0 w-full text-center pb-2">
            <div className="text-3xl font-black font-mono text-[var(--ink)] leading-none">{total}</div>
            <div className="text-[10px] text-[var(--mut)] font-black uppercase tracking-widest mt-1">Total Badges</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3.5 w-full mt-4">
          <div className="bg-[var(--bg)] rounded-2xl p-4 text-center border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)]">
            <div className="text-xs font-black text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 mb-1 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Skill Badges
            </div>
            <div className="text-2xl font-black font-mono text-[var(--ink)]">{skillCount}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-2xl p-4 text-center border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)]">
            <div className="text-xs font-black text-red-600 dark:text-red-400 flex items-center justify-center gap-1.5 mb-1 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Game Badges
            </div>
            <div className="text-2xl font-black font-mono text-[var(--ink)]">{gameCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityMonth({ badges }: { badges: any[] }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<{day: number, count: number, dateStr: string} | null>(null);

  const handleBoxClick = (day: number, count: number) => {
    const dateStr = `${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
    setSelectedDay({ day, count, dateStr });
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[currentDate.getMonth()];

  const activityCount: Record<string, number> = {};
  if (badges) {
    badges.forEach(b => {
      const dStr = b._debugParsedDate || b.earnedDate.replace(/^Earned\s+/i, '');
      if (dStr) {
        const d = new Date(dStr);
        if (!isNaN(d.getTime()) && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
          const dateKey = d.getDate();
          activityCount[dateKey] = (activityCount[dateKey] || 0) + 1;
        }
      }
    });
  }
  
  const activeDaysCount = Object.keys(activityCount).length;
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const grid = [];
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  for (let i = 0; i < totalCells; i++) {
    if (i < firstDay || i >= firstDay + daysInMonth) {
      grid.push(null);
    } else {
      const day = i - firstDay + 1;
      grid.push(activityCount[day] || 0);
    }
  }

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-slate-200 dark:bg-slate-800';
    if (count === 1) return 'bg-blue-300 dark:bg-blue-900/60';
    if (count <= 5) return 'bg-blue-500';
    if (count <= 7) return 'bg-indigo-600';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-[var(--card)] rounded-3xl border-2 border-[var(--edge)] shadow-[5px_5px_0_var(--edge)] p-6 sm:p-7 flex-1 flex flex-col justify-between">
      <div className="flex justify-between items-center border-b-2 border-[var(--edge)] pb-4 mb-6">
        <h3 className="font-black font-display text-[var(--ink)] tracking-tight text-base sm:text-lg flex items-center gap-2">
          <span>📅</span> ACTIVITY MONTH
        </h3>
        <div className="flex items-center gap-2">
          <div className="rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-xs font-black px-3 py-1.5 text-[var(--ink)] shadow-[2px_2px_0_var(--edge)] flex items-center gap-1.5">
            <span>🗓️</span> {month} {currentDate.getFullYear()}
          </div>
          <button 
            type="button"
            onClick={goToPrevMonth} 
            className="btn-press flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-100 text-[var(--ink)] bg-[var(--card)] hover:bg-[var(--bg)] font-bold text-sm select-none leading-none active:translate-x-0.5 active:translate-y-0.5"
            style={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              minHeight: '32px',
              padding: 0,
              borderRadius: '10px',
              boxShadow: '2px 2px 0 var(--edge)'
            }}
            title="Previous Month"
            aria-label="Previous Month"
          >
            <span className="font-mono font-black text-base leading-none select-none" aria-hidden="true">&lt;</span>
          </button>
          <button 
            type="button"
            onClick={goToNextMonth} 
            className="btn-press flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-100 text-[var(--ink)] bg-[var(--card)] hover:bg-[var(--bg)] font-bold text-sm select-none leading-none active:translate-x-0.5 active:translate-y-0.5"
            style={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              minHeight: '32px',
              padding: 0,
              borderRadius: '10px',
              boxShadow: '2px 2px 0 var(--edge)'
            }}
            title="Next Month"
            aria-label="Next Month"
          >
            <span className="font-mono font-black text-base leading-none select-none" aria-hidden="true">&gt;</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center h-full pb-2">
        <div className="text-center flex items-center gap-4">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl border-2 border-[var(--edge)] flex items-center justify-center text-3xl shadow-[3px_3px_0_var(--edge)] shrink-0">
            🔥
          </div>
          <div className="text-left">
            <div className="text-5xl font-black font-mono text-[var(--ink)] leading-none">{activeDaysCount}</div>
            <div className="text-[10px] font-black text-[var(--mut)] uppercase tracking-widest mt-1">ACTIVE DAYS</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:ml-4">
          <div className="grid grid-cols-7 gap-1.5 w-[210px]">
            {grid.map((count, i) => {
              const day = i - firstDay + 1;
              return (
              <div 
                key={i} 
                onClick={() => count !== null && handleBoxClick(day, count)}
                className={`w-5 h-5 rounded-md ${count === null ? 'opacity-0' : getColorClass(count)} ${count !== null ? 'cursor-pointer hover:scale-110 border border-[var(--edge)] shadow-2xs transition-all' : ''}`}
                title={count !== null ? `${count} badges earned on ${month} ${day}` : undefined}
              />
            )})}
          </div>
          
          <div className="min-h-[22px] mt-2 text-xs text-center font-bold text-[var(--ink)]">
            {selectedDay ? (
              <span className="inline-block bg-[var(--bg)] px-2.5 py-0.5 rounded-lg border border-[var(--edge)] shadow-2xs">
                <strong>{selectedDay.count} badges</strong> on {selectedDay.dateStr}
              </span>
            ) : (
              <span className="text-[var(--mut)] italic text-[11px]">Click a day to see details</span>
            )}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[9px] font-black text-[var(--mut)] uppercase tracking-wider">
            LESS
            <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800 border border-[var(--edge)] ml-1"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-blue-900/60 border border-[var(--edge)]"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-500 border border-[var(--edge)]"></div>
            <div className="w-3 h-3 rounded-sm bg-indigo-600 border border-[var(--edge)]"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-[var(--edge)] mr-1"></div>
            MORE
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({ name, bonus, gamesReq, skillsReq, games, skills, color }: any) {
  const gamesDone = Math.min(games, gamesReq);
  const skillsDone = Math.min(skills, skillsReq);
  const isComplete = gamesDone >= gamesReq && skillsDone >= skillsReq;
  
  let headerBg;
  if (color === 'blue') headerBg = 'bg-[#1A73E8]';
  else if (color === 'purple') headerBg = 'bg-[#7c3aed]';
  else if (color === 'green') headerBg = 'bg-[#34A853]';
  else headerBg = 'bg-[#EA4335]';
  
  const overallPercent = Math.round(((gamesDone / gamesReq) + (skillsDone / skillsReq)) / 2 * 100);

  return (
    <div className="rounded-3xl overflow-hidden bg-[var(--card)] border-2 border-[var(--edge)] shadow-[4px_4px_0_var(--edge)] hover:shadow-[6px_6px_0_var(--edge)] hover:-translate-y-0.5 transition-all flex flex-col">
      <div className={`${headerBg} p-4 text-white font-display border-b-2 border-[var(--edge)]`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs shadow-xs">🏆</div>
             <div>
               <div className="font-black text-base tracking-tight">{name}</div>
               <div className="text-[10px] font-black uppercase tracking-wider opacity-90">
                 {isComplete ? '✓ Completed!' : 'In Progress'}
               </div>
             </div>
          </div>
          <div className="text-right">
            <div className="font-black font-mono text-2xl leading-none">+{bonus}</div>
            <div className="text-[9px] font-black uppercase tracking-widest opacity-85 mt-0.5">Bonus Pts</div>
          </div>
        </div>
        <div className="flex justify-between items-end mb-1 text-xs font-bold">
          <span className="opacity-90">Overall Progress</span>
          <span className="font-mono">{overallPercent}%</span>
        </div>
        <div className="w-full h-2 bg-black/25 rounded-full overflow-hidden border border-white/40">
          <div className="h-full bg-white transition-all duration-500 rounded-full" style={{ width: `${overallPercent}%` }}></div>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 space-y-3.5 bg-[var(--card)] flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs font-black text-[var(--ink)] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-[#1A73E8]">🎮</span> Arcade Games
              </span>
              <span className={`font-mono ${gamesDone >= gamesReq ? 'text-emerald-500' : 'text-[var(--mut)]'}`}>
                {gamesDone} / {gamesReq} {gamesDone >= gamesReq && '✓'}
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--edge)]">
              <div className="h-full bg-[#1A73E8] rounded-full transition-all duration-500" style={{ width: `${(gamesDone / gamesReq) * 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center text-xs font-black text-[var(--ink)] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-[#34A853]">🏅</span> Skill Badges
              </span>
              <span className={`font-mono ${skillsDone >= skillsReq ? 'text-emerald-500' : 'text-[var(--mut)]'}`}>
                {skillsDone} / {skillsReq} {skillsDone >= skillsReq && '✓'}
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--edge)]">
              <div className="h-full bg-[#34A853] rounded-full transition-all duration-500" style={{ width: `${(skillsDone / skillsReq) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {isComplete ? (
            <div className="text-center py-2 rounded-xl bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black text-xs shadow-xs">
              ✓ Milestone Achieved (+{bonus} Pts)
            </div>
          ) : (
            <div className="text-center py-2 rounded-xl bg-[var(--bg)] border-2 border-[var(--edge)] text-[var(--mut)] font-bold text-xs">
              {Math.max(0, gamesReq - gamesDone)} Games &bull; {Math.max(0, skillsReq - skillsDone)} Skills to go
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
