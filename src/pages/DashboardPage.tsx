import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, RefreshCw, Zap, CheckCircle2, CloudOff } from 'lucide-react';
import { PosterModal } from '../components/PosterModal';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { ProgramInformation } from '../components/ProgramInformation';
import { Milestones } from '../components/Milestones';
import { showNotification } from '../components/ArcadeNotification';

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
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const result = await res.json();
        if (!result.error && (result.badges || result.arcadePoints !== undefined)) {
          setData(result);
          setIsOfflinePreview(false);
          localStorage.setItem('arcadeProgressData', JSON.stringify(result));
          localStorage.setItem('arcadeProfileUrl', url);
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          localStorage.setItem('arcadeLastSyncTime', timeStr);
          setLastSyncTime(timeStr);
          sessionStorage.setItem('arcadeSessionDashboardSynced', 'true');

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

    const savedUrl = localStorage.getItem('arcadeProfileUrl') || (data && data.profileUrl);
    const sessionSynced = sessionStorage.getItem('arcadeSessionDashboardSynced') === 'true';

    // If we have saved URL and session hasn't synced yet, start background update immediately
    if (savedUrl && !sessionSynced) {
      syncProfileData(savedUrl, false);
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      let targetUrl = savedUrl;

      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().profileUrl) {
            targetUrl = userSnap.data().profileUrl;
          }
        } catch(e) {
          console.error(e);
        }
      }

      if (targetUrl) {
        if (!data) {
          // Brand new visitor with no cache: load once
          setLoading(true);
          syncProfileData(targetUrl, true);
        } else if (!sessionSynced) {
          // Has offline preview: auto-update in background silently
          syncProfileData(targetUrl, false);
        } else {
          setLoading(false);
        }
      } else {
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

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">No Profile Data Found</h2>
        <p className="text-slate-500 mb-6">Please go to the Home page and calculate your progress first.</p>
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
}: {
  data: any;
  spots: any;
  participants: any[];
  isOfflinePreview?: boolean;
  isSyncing?: boolean;
  lastSyncTime?: string | null;
  onManualSync?: () => void;
}) {
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [isPosterOpen, setIsPosterOpen] = useState(false);

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
    <div className="min-h-screen bg-[#F0F4F9] dark:bg-[#0B0F19] pt-24 pb-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProgramInformation />
        <Milestones />

        
        {/* Top Row: Profile (Left) + Stats (Right) */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden lg:w-1/3 border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="flex w-full">
              <div className="w-1/2 bg-blue-600 text-white text-center py-3">
                <div className="text-[10px] font-bold tracking-wider opacity-80">ARCADE POINTS</div>
                <div className="text-3xl font-black">{totalPoints}</div>
              </div>
              <div className="w-1/2 bg-purple-600 text-white text-center py-3">
                <div className="text-[10px] font-bold tracking-wider opacity-80">RANK</div>
                <div className="text-3xl font-black">{rank}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center pt-8 pb-6 bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-900 flex-grow relative">
              <div className="relative mb-4">
                <img src={data.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" crossOrigin="anonymous" />
                <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full w-6 h-6 border-2 border-white flex items-center justify-center shadow-md">
                   {/* Gold Medal Icon */} 🥇
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{data.name || 'Student'}</h2>
              
              <div className="flex w-full max-w-[80%] mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 mb-6 overflow-hidden">
                <div className="w-1/2 text-center py-3 border-r border-slate-100 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-blue-500 flex items-center justify-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> EARNED</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{basePoints}</div>
                </div>
                <div className="w-1/2 text-center py-3">
                  <div className="text-[10px] font-bold text-purple-500 flex items-center justify-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> BONUS</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{milestoneBonus}</div>
                </div>
              </div>
              
              
              <button 
                onClick={() => setIsPosterOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-md text-sm transition-transform hover:scale-105 flex items-center gap-2 relative"
              >
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">NEW</span>
                ✨ Create Poster
              </button>

            </div>
          </div>
          
          {/* Right Stats */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-center font-bold text-blue-600 dark:text-blue-400 mb-1">The Arcade</h3>
                  <p className="text-center text-xs text-slate-500 mb-4">Jan, 2026 - Dec, 2026</p>
                  
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 mb-6">
                    <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
                    <div className="h-full bg-purple-500" style={{ width: '20%' }}></div>
                    <div className="h-full bg-green-500" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div className="flex justify-between px-2">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Arcade Games</div>
                      <div className="text-xl font-bold text-blue-600">{gameBadgesCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Sprint (Trivia)</div>
                      <div className="text-xl font-bold text-purple-600">{triviaBadgesCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Skill Badges</div>
                      <div className="text-xl font-bold text-green-600">{skillBadgesCount}</div>
                    </div>
                  </div>
                </div>
                
                <div className="w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                
                <div className="md:w-64">
                  <h3 className="text-center font-bold text-blue-600 dark:text-blue-400 mb-1">Facilitator Program</h3>
                  <p className="text-center text-xs text-slate-500 mb-4">Jul 13, 2026 - Sept 14, 2026</p>
                  
                  <div className="flex justify-center items-center gap-2 mb-6 text-sm font-medium">
                     Status 
                    <div 
                      onClick={() => setIsEnrolled(!isEnrolled)}
                      className={`w-10 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${isEnrolled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isEnrolled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div> 
                    {isEnrolled ? 'Enrolled' : 'Not Enrolled'}
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`rounded-md p-2 flex justify-between items-center ${milestoneBonus > 0 ? 'bg-[#EA4335] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                      <div className="flex items-center gap-2">
                        <span>👑</span>
                        <div className="leading-tight">
                          <div className="font-bold text-sm">{milestoneName}</div>
                          <div className="text-[10px] opacity-80">Milestone Achieved</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] opacity-80">Earned</div>
                        <div className="font-bold text-sm">✓</div>
                      </div>
                    </div>
                    
                    <div className="rounded-md p-2 flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                      <div className="flex items-center gap-2">
                        <span>⭐</span>
                        <div className="leading-tight">
                          <div className="font-bold text-sm">Bonus Points</div>
                          <div className="text-[10px] opacity-80">Milestone Reward</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] opacity-80">Points</div>
                        <div className="font-bold text-sm">+{milestoneBonus}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#E8F0FE] dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-[#D2E3FC] dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">🏆</div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Prize Tier</span>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600 dark:text-green-400 text-lg">{currentTier}</div>
                <div className="text-xs text-slate-500">{totalPoints} Total Arcade Points</div>
              </div>
              <a href="/swags" className="bg-white dark:bg-slate-700 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-bold py-1.5 px-4 rounded-md shadow-sm hover:bg-green-50 transition-colors inline-block">
                View Prizes
              </a>
            </div>
            
            <a href="https://discuss.google.dev/t/google-skills-arcade-2026-tiers/371066" target="_blank" rel="noopener noreferrer" className="block bg-yellow-50 dark:bg-yellow-900/20 rounded-md py-2 border border-yellow-200 dark:border-yellow-700/50 text-center cursor-pointer hover:bg-yellow-100 transition-colors">
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-500">How the 2026 Prize Tiers Work →</span>
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Facilitator Milestones</h2>
          <p className="text-blue-500 font-medium mb-1">Your progress between 13th Jul. & 14th Sept. 2026</p>
          <p className="text-xs text-slate-500 italic mb-8">You will only receive bonus points for the milestone that you earn and not for the ones before that.</p>
          
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

          <div className="flex items-center gap-3">
            <button
              id="dashboard-manual-sync-btn"
              onClick={onManualSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white dark:bg-slate-700 dark:hover:bg-slate-600 text-xs md:text-sm font-bold rounded-xl shadow-sm transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh profile progress from Skills Boost"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-700 dark:text-slate-300 tracking-wider">BADGES DISTRIBUTION</h3>
        <div className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full">
          {total} Total
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-48 h-24 relative overflow-hidden mb-4">
          <ResponsiveContainer width="100%" height="200%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
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
            <div className="text-3xl font-black text-slate-900 dark:text-white leading-none">{total}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Total Badges</div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full">
          <div className="flex-1 bg-blue-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-blue-100 dark:border-slate-700">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Skill Badges
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{skillCount}</div>
          </div>
          <div className="flex-1 bg-red-50 dark:bg-slate-900 rounded-lg p-4 text-center border border-red-100 dark:border-slate-700">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Game Badges
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{gameCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityMonth({ badges }: { badges: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
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
    if (count === 0) return 'bg-slate-900 dark:bg-black';
    if (count === 1) return 'bg-slate-300 dark:bg-slate-700';
    if (count <= 5) return 'bg-sky-400';
    if (count <= 7) return 'bg-blue-600';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-700 dark:text-slate-300 tracking-wider">ACTIVITY MONTH</h3>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200 dark:border-blue-800">
            📅 {month} {currentDate.getFullYear()}
          </div>
          <button onClick={goToPrevMonth} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={goToNextMonth} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="flex items-center gap-8 justify-center h-full pb-4">
        <div className="text-center flex items-center gap-4">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-3xl border border-red-100 dark:border-red-900/50">
            🔥
          </div>
          <div className="text-left">
            <div className="text-5xl font-black text-slate-900 dark:text-white leading-none">{activeDaysCount}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">ACTIVE DAYS</div>
          </div>
        </div>
        
        <div className="flex flex-col ml-8">
          <div className="grid grid-cols-7 gap-1.5 w-[200px]">
            {grid.map((count, i) => {
              const day = i - firstDay + 1;
              return (
              <div 
                key={i} 
                onClick={() => count !== null && handleBoxClick(day, count)}
                className={`w-5 h-5 rounded-sm ${count === null ? 'opacity-0' : getColorClass(count)} ${count !== null ? 'cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all' : ''} ${count !== null && count > 0 ? 'border border-black/10' : ''}`}
                title={count !== null ? `${count} badges` : undefined}
              />
            )})}
          </div>
          
          
          <div className="min-h-[20px] mt-2 text-xs text-center text-slate-600 dark:text-slate-300 font-medium">
            {selectedDay ? (
              <span><span className="font-bold text-slate-900 dark:text-white">{selectedDay.count} badges</span> on {selectedDay.dateStr}</span>
            ) : (
              <span className="text-slate-400 italic">Click a day to see details</span>
            )}
          </div>
          <div className="flex items-center justify-end gap-1 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            LESS
            <div className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-black ml-1"></div>
            <div className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700"></div>
            <div className="w-3 h-3 rounded-sm bg-sky-400"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
            <div className="w-3 h-3 rounded-sm bg-green-500 mr-1"></div>
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
  if (color === 'blue') headerBg = 'bg-blue-500';
  else if (color === 'purple') headerBg = 'bg-purple-500';
  else if (color === 'green') headerBg = 'bg-green-500';
  else headerBg = 'bg-orange-500';
  
  const overallPercent = Math.round(((gamesDone / gamesReq) + (skillsDone / skillsReq)) / 2 * 100);

  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
      <div className={`${headerBg} p-4 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
             <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">🏆</div>
             <div>
               <div className="font-bold">{name}</div>
               <div className="text-xs text-white/80">{isComplete ? '✓ Completed!' : 'In Progress'}</div>
             </div>
          </div>
          <div className="text-right">
            <div className="font-black text-xl">+{bonus}</div>
            <div className="text-[10px] text-white/80 uppercase">Bonus Points</div>
          </div>
        </div>
        <div className="flex justify-between items-end mb-1">
          <div className="text-xs">Overall Progress</div>
          <div className="text-xs font-bold">{overallPercent}%</div>
        </div>
        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${overallPercent}%` }}></div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="text-blue-500 text-xs">🎮</span> Games
          </div>
          <div className="font-bold text-slate-800 dark:text-white">
            <span className={gamesDone >= gamesReq ? 'text-green-500' : ''}>{gamesDone}</span> / {gamesReq} {gamesDone >= gamesReq && <span className="text-green-500">✓</span>}
          </div>
        </div>
        
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${(gamesDone/gamesReq)*100}%` }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="text-green-500 text-xs">🏅</span> Skills
          </div>
          <div className="font-bold text-slate-800 dark:text-white">
            <span className={skillsDone >= skillsReq ? 'text-green-500' : ''}>{skillsDone}</span> / {skillsReq} {skillsDone >= skillsReq && <span className="text-green-500">✓</span>}
          </div>
        </div>
        
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${(skillsDone/skillsReq)*100}%` }}></div>
        </div>
      </div>
    </div>
  );
}
