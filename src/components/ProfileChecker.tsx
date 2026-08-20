import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Trophy, Medal, Star, ChevronRight, Activity, AlertCircle, Lock, CheckCircle2, Check, RefreshCw, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Participant, MILESTONES } from '../types';
import { InlineBadgeTracker } from './InlineBadgeTracker';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface ProfileCheckerProps {
  participants: Participant[];
}


const AnimatedPoints = ({ endVal }: { endVal: number }) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let startTime: number | undefined;
    const duration = 1500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setVal(Math.floor(easeOutCubic(progress) * endVal));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    if (endVal > 0) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8B7CFA']
        });
      }, 1500);
    }
  }, [endVal]);
  return <>{val}</>;
};

export function ProfileChecker({ participants = [] }: ProfileCheckerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<Participant | null>(null);
  const [error, setError] = useState('');
      const [isRegistered, setIsRegistered] = useState(true);
  const [rememberProfile, setRememberProfile] = useState(false);
  const [isDemoAnimation, setIsDemoAnimation] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spots, setSpots] = useState<any>({
    trooper:  { spotsLeft: 6000, total: 6000 },
    ranger:   { spotsLeft: 4000, total: 4000 },
    champion: { spotsLeft: 3000, total: 3000 },
    legend:   { spotsLeft: 2500, total: 2500 },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedUrl = localStorage.getItem(`arcadeProfileUrl_${currentUser.uid}`);
        if (savedUrl) {
          setUrl(savedUrl);
          setRememberProfile(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSpotsLoading(true);
    fetch('/api/arcade-spots')
      .then(res => res.json())
      .then(data => {
        if (!data || !data.trooper) return;
        setSpots(data);
      })
      .catch(() => {
        // keep fallback values silently
      })
      .finally(() => {
        setSpotsLoading(false);
      });
  }, []);

  const [demoStep, setDemoStep] = useState(0);

  const handleDemoData = async () => {
    setIsDemoAnimation(true);
    setDemoStep(1); // 1: Fetching
    setUrl("https://www.cloudskillsboost.google/public_profiles/demo_account");
    setIsLoading(true);
    setError('');
    
    await new Promise(r => setTimeout(r, 1000));
    setDemoStep(2); // 2: Counting badges
    
    await new Promise(r => setTimeout(r, 1500));
    setDemoStep(3); // 3: Calculating points & milestones
    
    await new Promise(r => setTimeout(r, 1500));
    
    setResult({
      id: 'demo',
      name: 'Demo Student',
      avatarUrl: '',
      email: '',
      profileUrl: 'demo',
      gameBadges: 8,
      triviaBadges: 2,
      skillBadges: 34,
      specialBadges: 0,
      arcadePoints: 25,
      currentRank: 0,
      milestoneEarned: '',
      dailyPoints: 0,
      totalPoints: 40,
      lastUpdated: '',
      previousRank: 0,
      badges: [] 
    });
    setIsLoading(false);
    setIsDemoAnimation(false);
    setDemoStep(0);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    // Check if it's a valid profile URL
    if (!url.includes('cloudskillsboost.google/public_profiles/') && !url.includes('skills.google/public_profiles/')) {
      setError("Please send a valid Google Cloud Skills Boost public profile URL to calculate your Arcade points.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        throw new Error('Profile is private or invalid URL.');
      }
      const data = await res.json();
      
      const newResult = {
        id: 'fetched',
        name: data.name,
        avatarUrl: data.avatarUrl,
        community: 'Unknown',
        email: '',
        profileUrl: url,
        gameBadges: data.gameBadges,
        triviaBadges: data.triviaBadges,
        skillBadges: data.skillBadges,
        specialBadges: data.specialBadges || 0,
        arcadePoints: data.arcadePoints,
        currentRank: 0,
        milestoneEarned: '',
        dailyPoints: 0,
        totalPoints: data.arcadePoints,
        lastUpdated: '',
        previousRank: 0,
        badges: data.badges
      };

      setResult(newResult);
      
      // Save for UserProgressDashboard to pick up
      localStorage.setItem('arcadeProfileUrl', url);
      // We pass the raw data so it can be parsed by UserProgressDashboard if needed
      localStorage.setItem('arcadeProgressData', JSON.stringify(data));
      
      if (user && rememberProfile) {
        localStorage.setItem(`arcadeProfileUrl_${user.uid}`, url);
      } else if (user) {
        localStorage.removeItem(`arcadeProfileUrl_${user.uid}`);
      }
      
      const prevRecent = JSON.parse(localStorage.getItem('arcadeRecentUrls') || '[]');
      const newRecent = [url, ...prevRecent.filter((u: string) => u !== url)].slice(0, 5);
      localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));

      // Save to Firebase so the admin can see it
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            profileUrl: url,
            gameBadges: data.gameBadges || 0,
            triviaBadges: data.triviaBadges || 0,
            skillBadges: data.skillBadges || 0,
            arcadePoints: data.arcadePoints || 0,
            milestoneEarned: data.milestoneEarned || '',
            badgesCompletedCount: data.badges?.length || 0,
            lastCalculated: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn('Failed to update progress in Firebase:', err);
        }
      }

      if (data.arcadePoints >= 120) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

    } catch (err: any) {
      setResult(null);
      setError('Profile is private or invalid URL. Please set your profile to public on Cloud Skills Boost and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getNextMilestone = (points: number) => {
    return MILESTONES.find(m => m.requiredPoints > points);
  };

  const getCurrentMilestone = (points: number) => {
    return [...MILESTONES].reverse().find(m => points >= m.requiredPoints);
  };

  return (
    <section id="calculator" className="py-10 w-full mx-auto px-0">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-slate-900 dark:text-white">
          Google Cloud Arcade<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Points Calculator</span>
        </h1>
        <p className="text-slate-500 dark:text-[#8B8FA3] max-w-2xl mx-auto mt-4">
          Paste your Google Cloud Skills Boost public profile URL to instantly calculate your<br className="hidden md:block"/> Arcade points, see which badges you earned, and check your swag tier progress.
        </p>
      </div>

      <div className="bg-white/50 dark:bg-[#111111]/50 backdrop-blur-md border border-slate-200/50 dark:border-[#2a2a2a]/50 rounded-[24px] p-6 sm:p-8 max-w-3xl mx-auto relative overflow-hidden shadow-xl mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Search className="text-[#3b82f6] dark:text-cyan-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fetch Your Profile</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Paste your Google Cloud Skills Boost public profile URL to calculate your Arcade points.</p>
        
        <div className="relative">
          {!user && (
            <div className="absolute inset-0 z-10 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-full font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sign in to calculate progress
              </button>
            </div>
          )}
          <form onSubmit={handleCheck} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="https://www.skills.google/public_profiles/..."
                  className="w-full bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-inner"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={!user}
                />
                {url.includes('public_profiles/') && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
              </div>
              <button
                type="submit"
                disabled={isLoading || !url || !user}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center justify-center min-w-[150px]"
              >
                {isLoading && !isDemoAnimation ? (
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  'Analyze Profile'
                )}
              </button>
            </div>
            {error && <p className="text-[#EA4335] mt-3 text-sm font-medium">{error}</p>}
          </form>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#2a2a2a] pb-6 mb-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  window.dispatchEvent(new CustomEvent('open-login-modal'));
                  return;
                }
                const newValue = !rememberProfile;
                setRememberProfile(newValue);
                if (newValue && url) {
                  localStorage.setItem(`arcadeProfileUrl_${user.uid}`, url);
                } else if (!newValue) {
                  localStorage.removeItem(`arcadeProfileUrl_${user.uid}`);
                }
              }}
              className={`w-10 h-5 rounded-full relative transition-colors ${rememberProfile ? 'bg-blue-500' : 'bg-slate-300 dark:bg-gray-600'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${rememberProfile ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
            </button>
            <span className="text-sm text-slate-600 dark:text-gray-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Remember my profile</span>
          </label>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-[#1a1a1a] px-3 py-1.5 rounded-md border border-slate-200 dark:border-[#2a2a2a]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Not affiliated with Google. Only reads public data.</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={handleDemoData}
            type="button"
            className="text-[#f59e0b] hover:text-[#d97706] text-sm font-bold flex items-center gap-1 transition-colors"
          >
            Try with demo data <ChevronRight className="w-4 h-4" />
          </button>
          
          <Link to="/disclaimer" className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 text-sm flex items-center gap-1 transition-colors">
            <AlertCircle className="w-4 h-4 text-[#f59e0b]" /> Official Disclaimer
          </Link>
        </div>
      </div>

      {isDemoAnimation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mb-10 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a] rounded-2xl p-6 shadow-sm"
        >
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#f59e0b]" /> 
            Simulation Process
          </h4>
          <div className="space-y-4">
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${demoStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${demoStep > 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {demoStep > 1 ? <Check className="w-3 h-3" /> : '1'}
              </div>
              <span className="text-slate-700 dark:text-gray-300 font-medium">Fetching public profile data</span>
            </div>
            
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${demoStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${demoStep > 2 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {demoStep > 2 ? <Check className="w-3 h-3" /> : '2'}
              </div>
              <span className="text-slate-700 dark:text-gray-300 font-medium">Counting valid Skill Badges and Game Badges</span>
            </div>

            <div className={`flex items-center gap-3 transition-opacity duration-300 ${demoStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${demoStep > 3 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {demoStep > 3 ? <Check className="w-3 h-3" /> : '3'}
              </div>
              <span className="text-slate-700 dark:text-gray-300 font-medium">Mapping points and checking milestone eligibility</span>
            </div>
          </div>
        </motion.div>
      )}

        {result && (
          <div className="relative">
            {/* 4 Floating Blurred Gradient Orbs */}
            <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
              <motion.div 
                animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, -40, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute top-[20%] right-[0%] w-[350px] h-[350px] rounded-full bg-green-500/15 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }} 
                transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute bottom-[0%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px]"
              />
              <motion.div 
                animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.4, 1] }} 
                transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 3 }}
                className="absolute -bottom-[10%] -right-[10%] w-[450px] h-[450px] rounded-full bg-orange-500/15 blur-[120px]"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="mx-auto max-w-5xl text-left relative z-10"
            >
              {(() => {
                const isBeforeStart = new Date() < new Date('2026-07-13T00:00:00Z');
                const isAfterEnd = new Date() > new Date('2026-09-14T18:29:00Z');
                const basePoints = isBeforeStart ? 0 : result.arcadePoints;
                const displaySkillBadges = isBeforeStart ? 0 : result.skillBadges;
                const displayGameBadges = isBeforeStart ? 0 : result.gameBadges;
                
                let programGameBadges = 0;
                let programSkillBadges = 0;
                
                if (result.id === 'demo') {
                  programGameBadges = 8;
                  programSkillBadges = 34;
                } else if (result.badges && !isBeforeStart) {
                  result.badges.forEach(b => {
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
                const currentTierName = currentTierObj ? currentTierObj.name : "No Tier";
                const nextTierObj = MILESTONES.find(m => totalPoints < m.requiredPoints);
                const nextGoal = nextTierObj 
                  ? `Earn ${nextTierObj.requiredPoints - totalPoints} more points to reach ${nextTierObj.name}.`
                  : "Max Tier Reached.";

                const avatarInitials = result.name.substring(0, 2).toUpperCase();



                return (
                  <div className="flex flex-col gap-8 pb-10">


                    {/* TOP ROW: Profile & Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Profile Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1"
                      >
                        <div className="flex flex-col h-full justify-between gap-6">
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-50 blur-[8px] animate-pulse"></div>
                                  {result.avatarUrl ? (
                                    <img src={result.avatarUrl} alt="Avatar" className="relative w-16 h-16 rounded-full object-cover border-2 border-white/50" />
                                  ) : (
                                    <div className="relative w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white/50 flex items-center justify-center text-[#2563eb] dark:text-blue-400 font-bold text-xl">
                                      {avatarInitials}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white leading-tight">{result.name}</h3>
                                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.1)] border bg-white/50 dark:bg-black/20" style={{ 
                                    color: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280',
                                    borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#d1d5db',
                                  }}>
                                    <span className="relative flex h-2 w-2 mr-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280' }}></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280' }}></span>
                                    </span>
                                    {currentTierName}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={handleCheck}
                                disabled={isLoading}
                                className="p-2 rounded-full text-gray-400 hover:text-blue-500 bg-white/40 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all"
                                title="Refresh Progress"
                              >
                                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-blue-500' : ''}`} />
                              </button>
                            </div>
                            <p className="text-[#6b7280] dark:text-slate-400 text-sm">Member since {new Date().getFullYear()}</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                              View Profile
                            </a>
                            <Link 
                              to="/my-progress"
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                              📊 My Progress
                            </Link>
                            <Link 
                              to="/roadmap"
                              state={{ participant: result }}
                              className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm font-bold text-white transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                              <span className="relative z-10">🚀 Your Personalised Roadmap</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>

                      {/* Points Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-center items-center relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] -ml-10 -mb-10"></div>
                        
                        <p className="text-gray-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Total Points</p>
                        <h2 className="text-6xl md:text-7xl font-extrabold mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 animate-[gradient_4s_ease-in-out_infinite]">
                          <AnimatedPoints endVal={totalPoints} />
                        </h2>
                        
                        {isBeforeStart ? (
                          <p className="text-[#EA4335] font-bold text-sm relative z-10 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">Program Not Started</p>
                        ) : isAfterEnd ? (
                          <div className="flex flex-col items-center relative z-10">
                            <p className="text-[#4285F4] font-bold text-sm mb-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Program has Ended</p>
                            <p className="text-sm font-medium bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
                              <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                              <span className={totalBonus > 0 ? 'text-[#34A853] dark:text-green-400 font-bold' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 relative z-10">
                            <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                            <span className={totalBonus > 0 ? 'text-[#34A853] dark:text-green-400 font-bold' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Tier Progress Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                          Swags Tier Progress <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex bg-gray-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-gray-200 dark:border-slate-700">
                            <button
                              onClick={() => setIsRegistered(true)}
                              className={`px-5 py-2 text-sm rounded-full transition-all ${isRegistered ? 'bg-white dark:bg-slate-600 shadow-md text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium bg-transparent'}`}
                            >
                              Registered
                            </button>
                            <button
                              onClick={() => setIsRegistered(false)}
                              className={`px-5 py-2 text-sm rounded-full transition-all ${!isRegistered ? 'bg-white dark:bg-slate-600 shadow-md text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium bg-transparent'}`}
                            >
                              Not Registered
                            </button>
                          </div>
                        </div>
                      </div>

                      {isRegistered && milestoneBonus > 0 && (
                        <div className="mb-10 relative overflow-hidden bg-[#F0FDF4] dark:bg-green-900/20 border border-[#86EFAC] dark:border-green-800 rounded-full px-4 py-3.5 flex items-center justify-center text-[#15803D] dark:text-green-400 font-bold text-sm shadow-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          <span className="mr-2 text-lg">🎁</span> Includes +{milestoneBonus} facilitator bonus points
                        </div>
                      )}

                      <div className="mt-8 relative pt-4 pb-4">
                        <div className="hidden sm:block absolute top-[38px] left-8 right-8 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative rounded-full" 
                            style={{ 
                              width: `${(() => {
                                const m = MILESTONES;
                                if (totalPoints <= m[0].requiredPoints) return (totalPoints / m[0].requiredPoints) * 12.5;
                                else if (totalPoints <= m[1].requiredPoints) return 12.5 + ((totalPoints - m[0].requiredPoints) / (m[1].requiredPoints - m[0].requiredPoints)) * 25;
                                else if (totalPoints <= m[2].requiredPoints) return 37.5 + ((totalPoints - m[1].requiredPoints) / (m[2].requiredPoints - m[1].requiredPoints)) * 25;
                                else if (totalPoints <= m[3].requiredPoints) return 62.5 + ((totalPoints - m[2].requiredPoints) / (m[3].requiredPoints - m[2].requiredPoints)) * 25;
                                else return Math.min(100, 87.5 + ((totalPoints - m[3].requiredPoints) / 30) * 12.5);
                              })()}%`
                            }}
                          >
                             {/* The glowing tip */}
                             {totalPoints > 0 && totalPoints < MILESTONES[3].requiredPoints && (
                               <div 
                                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white border-[4px] rounded-full z-20 animate-pulse" 
                                  style={{ borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853', boxShadow: `0 0 15px ${currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#34A853'}` }}
                               ></div>
                             )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                          {MILESTONES.map((milestone, idx) => {
                            const isComplete = totalPoints >= milestone.requiredPoints;
                            const isCurrent = currentTierObj && currentTierObj.id === milestone.id;
                            const isNext = nextTierObj && nextTierObj.id === milestone.id;
                            const color = milestone.colorClass.replace('bg-[', '').replace(']', '');
                            
                            let circleClass = 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400';
                            let circleStyle: any = {};
                            
                            if (isComplete) {
                              circleClass = 'text-white border-transparent';
                              circleStyle = { backgroundColor: color };
                            } else if (isNext) {
                              circleClass = 'bg-white dark:bg-slate-800 border-[3px] bg-clip-padding';
                              circleStyle = { borderColor: color, color: color };
                            } else {
                              circleClass = 'bg-white dark:bg-slate-800 border-[3px] border-gray-200 dark:border-slate-700 text-gray-400';
                            }

                            return (
                              <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white/0 text-left sm:text-center z-10 sm:px-2">
                                <div 
                                  className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 transition-all ${circleClass}`} 
                                  style={{...circleStyle, ...(isCurrent ? { boxShadow: `0 0 35px 8px ${color}60` } : {})}}
                                >
                                  {isComplete ? (
                                    <Check className="w-7 h-7 stroke-[3]" />
                                  ) : isNext ? (
                                    <ChevronRight className="w-7 h-7 stroke-[3]" />
                                  ) : (
                                    <Lock className="w-5 h-5 opacity-40" />
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                                    {milestone.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                                    {milestone.requiredPoints} pts
                                  </div>
                                  
                                  <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                                    {spotsLoading ? (
                                       <span className="animate-pulse">— / — spots left</span>
                                    ) : (
                                       <span>{spots[milestone.name.toLowerCase()].spotsLeft.toLocaleString()} / {spots[milestone.name.toLowerCase()].total.toLocaleString()} spots left</span>
                                    )}
                                  </div>
                                  
                                  <div className="mt-2 h-5">
                                    {isCurrent ? (
                                      <div className="text-sm font-bold" style={{ color: color }}>Current Tier</div>
                                    ) : isNext ? (
                                      <div className="text-sm font-bold" style={{ color: color }}>{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                    ) : !isComplete ? (
                                      <div className="text-sm font-bold text-gray-400 dark:text-slate-500">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Next Goal */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                          <span className="text-2xl animate-[wiggle_1s_ease-in-out_infinite]">📌</span> Next Goal
                        </h3>
                        {nextTierObj ? (
                          <div className="relative z-10">
                            <p className="text-gray-700 dark:text-slate-300 font-medium mb-5 text-lg">
                              Earn <span className="font-extrabold text-[#4285F4] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">{Number((nextTierObj.requiredPoints - totalPoints).toFixed(1))}</span> more points to reach <span style={{ color: nextTierObj.colorClass.replace('bg-[', '').replace(']', '') }} className="font-extrabold">{nextTierObj.name}</span>.
                            </p>
                            <div className="bg-gray-50/50 dark:bg-slate-900/30 rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                              <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Fastest paths to unlock:</p>
                              <ul className="text-sm font-medium text-gray-700 dark:text-slate-300 space-y-3">
                                <li className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <span className="text-[#34A853] font-bold text-xs">→</span>
                                  </div>
                                  <span>{Math.ceil(nextTierObj.requiredPoints - totalPoints)} more Game Badges <span className="text-gray-400 dark:text-slate-500 font-normal mx-1">OR</span></span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                    <span className="text-[#34A853] font-bold text-xs">→</span>
                                  </div>
                                  <span>{Math.ceil((nextTierObj.requiredPoints - totalPoints) / 0.5)} more Skill Badges</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                            <span className="text-6xl mb-4">🏆</span>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              Congratulations!
                            </p>
                            <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium">You have reached the maximum tier.</p>
                          </div>
                        )}
                      </motion.div>

                      {/* Badge Breakdown */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
                      >
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mb-10"></div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 relative z-10">Badge Breakdown</h3>
                        <div className="w-full relative z-10 bg-white/40 dark:bg-slate-900/40 rounded-2xl p-2 border border-gray-200/50 dark:border-slate-700/50">
                          <div className="flex justify-between text-[#6b7280] dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-gray-200/50 dark:border-slate-700/50 pb-3 mb-2 px-3 pt-2">
                            <div className="flex-1">Category</div>
                            <div className="w-16 text-center">Badges</div>
                            <div className="w-16 text-right">Points</div>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 px-3 border-b border-gray-100/50 dark:border-slate-700/30 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                            <div className="flex-1 flex items-center gap-3 font-semibold text-gray-900 dark:text-white">
                              <span className="text-2xl animate-[bounce_3s_ease-in-out_infinite]">🏅</span> Skill Badges
                            </div>
                            <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-bold bg-gray-100/50 dark:bg-slate-800/50 rounded-lg py-1">{displaySkillBadges}</div>
                            <div className="w-16 text-right font-extrabold text-gray-900 dark:text-white">{displaySkillBadges * 0.5}</div>
                          </div>
                          <div className="flex justify-between items-center py-3 px-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                            <div className="flex-1 flex items-center gap-3 font-semibold text-gray-900 dark:text-white">
                              <span className="text-2xl animate-[bounce_3.5s_ease-in-out_infinite]">🎮</span> Game Badges
                            </div>
                            <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-bold bg-gray-100/50 dark:bg-slate-800/50 rounded-lg py-1">{displayGameBadges}</div>
                            <div className={`w-16 text-right font-extrabold ${displayGameBadges > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{displayGameBadges}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}

      <InlineBadgeTracker participant={result} />
    </section>
  );
}
