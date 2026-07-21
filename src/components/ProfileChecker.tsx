import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Trophy, Medal, Star, ChevronRight, Activity, AlertCircle, Lock, CheckCircle2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Participant, MILESTONES } from '../types';
import { BadgeTracker } from './BadgeTracker';
import { FacilitatorBadgeTracker } from './FacilitatorBadgeTracker';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface ProfileCheckerProps {
  participants: Participant[];
}

export function ProfileChecker({ participants = [] }: ProfileCheckerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<Participant | null>(null);
  const [error, setError] = useState('');
  const [isBadgeTrackerOpen, setIsBadgeTrackerOpen] = useState(false);
  const [isFacilitatorBadgeTrackerOpen, setIsFacilitatorBadgeTrackerOpen] = useState(false);
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
      community: 'Demo',
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
      const newRecent = [url, ...prevRecent.filter(u => u !== url)].slice(0, 5);
      localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));


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
    <section id="calculator" className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-slate-900 dark:text-white">
          Google Cloud Arcade<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Points Calculator</span>
        </h1>
        <p className="text-slate-500 dark:text-[#8B8FA3] max-w-2xl mx-auto mt-4">
          Paste your Google Cloud Skills Boost public profile URL to instantly calculate your<br className="hidden md:block"/> Arcade points, see which badges you earned, and check your swag tier progress.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2a2a2a] rounded-[24px] p-6 sm:p-8 max-w-3xl mx-auto relative overflow-hidden shadow-sm dark:shadow-none mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Search className="text-[#3b82f6] dark:text-cyan-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fetch Your Profile</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Paste your Google Cloud Skills Boost public profile URL to calculate your Arcade points.</p>
        
        <form onSubmit={handleCheck} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="https://www.skills.google/public_profiles/..."
                className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#555] transition-colors"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {url.includes('public_profiles/') && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
            </div>
            <button
              type="submit"
              disabled={isLoading || !url}
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl text-left bg-[#f3f4f6] dark:bg-slate-800/50 p-4 sm:p-8 rounded-[24px] mt-8"
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

              const currentTierObj = MILESTONES.slice().reverse().find(m => totalPoints >= m.requiredPoints);
              const currentTierName = currentTierObj ? currentTierObj.name : "No Tier";

              const nextTierObj = MILESTONES.find(m => totalPoints < m.requiredPoints);
              const nextGoal = nextTierObj 
                ? `Earn ${nextTierObj.requiredPoints - totalPoints} more points to reach ${nextTierObj.name}.`
                : "Max Tier Reached.";

              const avatarInitials = result.name.substring(0, 2).toUpperCase();

              return (
                <div className="flex flex-col gap-6">
                  {/* View Progress Button */}
                  <div className="flex justify-center mb-4">
                    <Link to="/my-progress" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B6CF9] to-[#8B5CF6] hover:from-[#4A5CE9] hover:to-[#7A4BE6] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto">
                      View Detailed Progress & Share Card
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                  {/* TOP ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CARD 1 - User Profile */}
                    <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          {result.avatarUrl ? (
                            <img src={result.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#2563eb] dark:text-blue-400 font-bold text-lg">
                              {avatarInitials}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-[20px] text-gray-900 dark:text-white leading-tight">{result.name}</h3>
                            <div className="mt-1 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold shadow-sm border" style={{ 
                              color: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#6b7280',
                              borderColor: currentTierObj ? currentTierObj.colorClass.replace('bg-[', '').replace(']', '') : '#d1d5db',
                              backgroundColor: 'transparent'
                            }}>
                              {currentTierName}
                            </div>
                          </div>
                        </div>
                        <p className="text-[#6b7280] dark:text-slate-400 text-sm mb-6">Member since {new Date().getFullYear()}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 px-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                          View Profile
                        </a>
                        <button 
                          onClick={() => setIsFacilitatorBadgeTrackerOpen(true)}
                          className="w-full text-center py-2 px-3 rounded-full border border-amber-500 text-sm font-semibold text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-pointer"
                        >
                          🗓️ Badge Tracker
                        </button>
                      </div>
                    </div>

                    {/* CARD 2 - Total Points */}
                    <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] static flex flex-col justify-center relative">
                      <p className="text-[#6b7280] dark:text-slate-400 text-sm font-medium mb-1">Total Points</p>
                      <h2 className="text-[48px] font-[800] text-gray-900 dark:text-white leading-none mb-2">{totalPoints}</h2>
                      
                      {isBeforeStart ? (
                        <p className="text-[#EA4335] font-bold text-sm">Program Not Started</p>
                      ) : isAfterEnd ? (
                        <>
                          <p className="text-[#4285F4] font-bold text-sm mb-1">Program has Ended</p>
                          <p className="text-sm font-medium">
                            <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                            <span className={totalBonus > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium">
                          <span className="text-[#6b7280] dark:text-slate-400">Base: {basePoints} + </span>
                          <span className={totalBonus > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-[#6b7280] dark:text-slate-400'}>{totalBonus} bonus</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Toggle UI */}
                  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm relative">
                    <div className="flex items-center gap-2 group cursor-help">
                      <h3 className="font-bold text-gray-900 dark:text-white">Swags Tier Progress</h3>
                      <div className="text-gray-400 relative">
                        <AlertCircle className="w-4 h-4" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10 text-center">
                          Toggle to see how your tier changes with or without the Facilitator bonus points
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Facilitator Program:</span>
                      <div className="flex bg-gray-100/50 dark:bg-slate-700/30 p-1 rounded-lg border border-gray-200 dark:border-slate-700 w-full sm:w-auto">
                        <button
                          onClick={() => setIsRegistered(true)}
                          className={`flex-1 sm:flex-none px-3.5 py-1.5 text-[13px] rounded-md transition-all ${isRegistered ? 'bg-indigo-500/15 border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-transparent'}`}
                        >
                          Registered
                        </button>
                        <button
                          onClick={() => setIsRegistered(false)}
                          className={`flex-1 sm:flex-none px-3.5 py-1.5 text-[13px] rounded-md transition-all ${!isRegistered ? 'bg-indigo-500/15 border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-transparent'}`}
                        >
                          Not Registered
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {isRegistered && milestoneBonus > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="bg-[#34A853]/10 text-[#34A853] px-3 py-2 rounded-lg text-xs font-bold text-center border border-[#34A853]/20"
                    >
                      ✨ Includes +{totalBonus} facilitator bonus points
                    </motion.div>
                  )}
                  
                  {!isRegistered && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg text-xs font-medium text-center border border-gray-200 dark:border-slate-700"
                    >
                      Showing base points only (no facilitator bonus)
                    </motion.div>
                  )}

                  {/* MIDDLE ROW - Tier Progress Stepper */}
                  <div className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-col sm:flex-row justify-between relative gap-8 sm:gap-0 mt-4 mb-2">
                      <div className="hidden sm:block absolute top-[20px] left-0 w-full border-t-2 border-dashed border-gray-300 dark:border-slate-700 -z-10"></div>
                      
                      {MILESTONES.map((milestone, idx) => {
                        const isComplete = totalPoints >= milestone.requiredPoints;
                        const isNext = totalPoints < milestone.requiredPoints && (idx === 0 || totalPoints >= MILESTONES[idx-1].requiredPoints);
                        const isCurrent = totalPoints >= milestone.requiredPoints && (idx === MILESTONES.length - 1 || totalPoints < MILESTONES[idx+1].requiredPoints);
                        
                        // Extract hex from milestone colorClass (e.g., 'bg-[#4285F4]' -> '#4285F4')
                        const circleColor = milestone.colorClass.replace('bg-[', '').replace(']', '');
                        
                        let circleClass = "bg-white dark:bg-slate-800";
                        let circleStyle: React.CSSProperties = {
                          borderColor: '#d1d5db',
                          color: '#9ca3af'
                        };
                        
                        if (isComplete) {
                          circleStyle = { backgroundColor: circleColor, borderColor: circleColor, color: 'white' };
                          circleClass = "";
                        } else if (isNext) {
                          circleStyle = { borderColor: circleColor, color: circleColor };
                        }

                        return (
                          <div key={milestone.id} className="flex flex-row sm:flex-col items-center flex-1 relative bg-white dark:bg-slate-800 sm:bg-transparent sm:dark:bg-transparent text-left sm:text-center z-10 sm:px-2">
                            {idx > 0 && isComplete && (
                              <div className="hidden sm:block absolute top-[20px] right-1/2 w-full h-[2px] -z-10" style={{ backgroundColor: circleColor }}></div>
                            )}

                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center sm:mb-4 mr-4 sm:mr-0 border-2 shadow-sm ${circleClass}`} style={circleStyle}>
                              {isComplete ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : isNext ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className={`font-bold text-[15px] ${isComplete ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
                                {milestone.name}
                              </div>
                              <div className="text-[12px] text-[#6b7280] dark:text-slate-400 mt-0.5">
                                {milestone.requiredPoints} pts
                              </div>
                              
                              <div className="text-[10px] bg-gray-100 dark:bg-slate-700 rounded px-1.5 py-0.5 inline-block mt-1 text-gray-500 dark:text-slate-400 font-medium">
                                {spotsLoading ? (
                                   <span className="animate-pulse">— / — spots left</span>
                                ) : (
                                   <span>{spots[milestone.name.toLowerCase()].spotsLeft.toLocaleString()} / {spots[milestone.name.toLowerCase()].total.toLocaleString()} spots left</span>
                                )}
                              </div>
                              
                              {isCurrent ? (
                                <div className="text-[12px] font-bold mt-1" style={{ color: circleColor }}>Current Tier</div>
                              ) : isNext ? (
                                <div className="text-[12px] font-bold mt-1" style={{ color: circleColor }}>{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                              ) : !isComplete ? (
                                <div className="text-[12px] font-medium text-gray-400 dark:text-slate-500 mt-1">{Number((milestone.requiredPoints - totalPoints).toFixed(1))} pts to unlock</div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BOTTOM LEFT - Next Goal */}
                    <div className="w-full bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-xl">📌</span> Next Goal
                      </h3>
                      {nextTierObj ? (
                        <>
                          <p className="text-gray-700 dark:text-slate-300 font-medium mb-4">
                            Earn <span className="font-bold text-[#4285F4]">{Number((nextTierObj.requiredPoints - totalPoints).toFixed(1))}</span> more points to reach <span style={{ color: nextTierObj.colorClass.replace('bg-[', '').replace(']', '') }} className="font-bold">{nextTierObj.name}</span>.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">You need:</p>
                          <ul className="text-sm font-medium text-gray-700 dark:text-slate-300 space-y-1.5 ml-1">
                            <li className="flex items-center gap-2">
                              <span className="text-[#34A853]">→</span> 
                              <span>{Math.ceil(nextTierObj.requiredPoints - totalPoints)} more Game Badges <span className="text-gray-400 dark:text-slate-500 font-normal">OR</span></span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-[#34A853]">→</span> 
                              <span>{Math.ceil((nextTierObj.requiredPoints - totalPoints) / 0.5)} more Skill Badges</span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <p className="text-gray-700 dark:text-slate-300 font-medium my-auto text-center">
                          Congratulations! You have reached the maximum tier.
                        </p>
                      )}
                    </div>

                    {/* BOTTOM RIGHT - Badge Breakdown */}
                    <div id="badge-breakdown" className="bg-white dark:bg-slate-800 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Badge Breakdown</h3>
                      <div className="w-full">
                        <div className="flex justify-between text-[#6b7280] dark:text-slate-400 text-sm font-medium border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                          <div className="flex-1">Category</div>
                          <div className="w-16 text-center">Badges</div>
                          <div className="w-16 text-right">Points</div>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-700/50">
                          <div className="flex-1 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            <span className="text-lg">🏅</span> Skill Badges
                          </div>
                          <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-medium">{displaySkillBadges}</div>
                          <div className="w-16 text-right font-bold text-gray-900 dark:text-white">{displaySkillBadges * 0.5}</div>
                        </div>

                        <div className="flex justify-between items-center py-2">
                          <div className="flex-1 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            <span className="text-lg">🏅</span> Game Badges
                          </div>
                          <div className="w-16 text-center text-gray-600 dark:text-slate-400 font-medium">{displayGameBadges}</div>
                          <div className={`w-16 text-right font-bold ${displayGameBadges > 0 ? 'text-[#2563eb] dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{displayGameBadges}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

      <BadgeTracker 
        isOpen={isBadgeTrackerOpen} 
        onClose={() => setIsBadgeTrackerOpen(false)} 
        participant={result} 
      />
      <FacilitatorBadgeTracker 
        isOpen={isFacilitatorBadgeTrackerOpen} 
        onClose={() => setIsFacilitatorBadgeTrackerOpen(false)} 
        participant={result}
        isRegistered={isRegistered} 
      />
    </section>
  );
}
