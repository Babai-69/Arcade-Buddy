import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle, ExternalLink, Download, AlertCircle, Share2, Calendar, BellRing, X } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { SKILL_BADGES, GAME_BADGES } from '../lib/badgeLinks';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useArcadeGames } from '../utils/arcadeApi';
import { AdminCertificatePreview } from './AdminCertificatePreview';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

import { CheckProgress } from './CheckProgress';
import { WeeklyProgress } from './WeeklyProgress';

export function UserProgressDashboard() {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string} | null>(null);
  const [prevGameCount, setPrevGameCount] = useState<number | null>(null);
  const [prevSkillCount, setPrevSkillCount] = useState<number | null>(null);
  const [recentUrls, setRecentUrls] = useState<string[]>([]);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  
  // Custom Date Range
  const [startDate, setStartDate] = useState('2026-07-13T17:30');
  const [endDate, setEndDate] = useState('2026-09-14T23:59');

  const [isSharing, setIsSharing] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (!data) return;
    
    let gameCount = 0;
    let skillCount = 0;
    gamesToTrack.forEach(game => {
      if (data.badges.some((b: any) => b.title.toLowerCase().includes(game.title.toLowerCase()))) {
        gameCount++;
      }
    });
    Object.keys(SKILL_BADGES).forEach(badgeName => {
      if (data.badges.some((b: any) => b.title.toLowerCase() === badgeName.toLowerCase())) {
        skillCount++;
      }
    });

    if (prevGameCount !== null && gameCount > prevGameCount) {
        if (gameCount === 12) setToastMessage({ title: 'Milestone Unlocked! 🎮', desc: 'You have completed 100% of the Game Badges!' });
        else if (gameCount === 6) setToastMessage({ title: 'Milestone Unlocked! 🎮', desc: 'You are halfway there with 50% Game Badges completed!' });
        else if (gameCount === 3) setToastMessage({ title: 'Milestone Unlocked! 🎮', desc: 'You have completed 25% of the Game Badges!' });
    }
    
    if (prevSkillCount !== null && skillCount > prevSkillCount) {
        if (skillCount === 66) setToastMessage({ title: 'Milestone Unlocked! 🏆', desc: 'You have completed 100% of the Skill Badges!' });
        else if (skillCount === 33) setToastMessage({ title: 'Milestone Unlocked! 🏆', desc: 'You are halfway there with 50% Skill Badges completed!' });
        else if (skillCount === 17) setToastMessage({ title: 'Milestone Unlocked! 🏆', desc: 'You have completed 25% of the Skill Badges!' });
    }

    setPrevGameCount(gameCount);
    setPrevSkillCount(skillCount);
  }, [data]);

  
  const { activeGames } = useArcadeGames();
  const isAdmin = auth.currentUser?.email === 'deya58690@gmail.com' || auth.currentUser?.email === 'tripti.arcade.25@gmail.com';
  
  useEffect(() => {
    let isMounted = true;
    const fetchSavedUrl = async () => {
      // First try to load from local storage
      const savedRecent = localStorage.getItem('arcadeRecentUrls');
      if (savedRecent) {
        try {
          setRecentUrls(JSON.parse(savedRecent));
        } catch (e) {}
      }

      const savedUrl = localStorage.getItem('arcadeProfileUrl');
      const savedData = localStorage.getItem('arcadeProgressData');
      
      let initialUrl = savedUrl;

      // Then check Firestore for authenticated user
      if (auth.currentUser) {
        try {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().profileUrl) {
            initialUrl = userSnap.data().profileUrl;
          }
        } catch (e) {
          console.error('Failed to load profile from Firestore', e);
        }
      }

      if (!isMounted) return;

      if (initialUrl) {
        setProfileUrl(initialUrl);
        setIsEditingUrl(false);
        // If we have local storage data for this exact URL, use it temporarily
        if (initialUrl === savedUrl && savedData) {
          try {
            setData(JSON.parse(savedData));
          } catch (e) {
            console.error('Failed to parse saved progress data', e);
          }
        }
        
        // Auto-fetch fresh data
        fetchProgress(undefined, initialUrl);
      } else {
        setIsEditingUrl(true);
      }
    };

    fetchSavedUrl();

    return () => { isMounted = false; };
  }, [auth.currentUser]);

  const fetchProgress = async (e?: React.FormEvent, urlOverride?: string) => {
    if (e) e.preventDefault();
    const targetUrl = urlOverride || profileUrl;
    if (!targetUrl) return;

    setLoading(true);
    setError('');
    setIsEditingUrl(false);
    
    try {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, { profileUrl: targetUrl }, { merge: true });
      }

      // Create date objects taking timezone into account or pass directly
      // appending Z or offset if needed, but since server expects ISO we can just pass
      let queryStr = `url=${encodeURIComponent(targetUrl)}`;
      if (startDate) queryStr += `&startDate=${encodeURIComponent(new Date(startDate).toISOString())}`;
      if (endDate) queryStr += `&endDate=${encodeURIComponent(new Date(endDate).toISOString())}`;
      
      const res = await fetch(`/api/calculator?${queryStr}`);
      if (!res.ok) throw new Error("Could not fetch profile. Ensure your profile is public.");
      
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      
      setData(result);
      // Save progress to local storage
      localStorage.setItem('arcadeProfileUrl', targetUrl);
      localStorage.setItem('arcadeProgressData', JSON.stringify(result));
      
      setRecentUrls(prev => {
        const newRecent = [targetUrl, ...prev.filter(u => u !== targetUrl)].slice(0, 5);
        localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));
        return newRecent;
      });
    } catch (err: any) {
      setError(err.message || 'Error fetching progress');
      setIsEditingUrl(true);
    } finally {
      setLoading(false);
    }
  };

  const gamesToTrack = activeGames.length > 0 ? activeGames : Object.entries(GAME_BADGES).map(([title, link]) => ({ title, link }));

  const downloadPDF = () => {
    if (!data) return;
    
    const doc = new jsPDF();
    const studentName = auth.currentUser?.displayName || data.name || 'Student';
    const dateStr = new Date().toLocaleDateString();
    
    doc.setFontSize(20);
    doc.text('Google Cloud Arcade Progress Report', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Student: ${studentName}`, 14, 32);
    if (auth.currentUser?.email) doc.text(`Email: ${auth.currentUser.email}`, 14, 38);
    doc.text(`Date: ${dateStr}`, 14, 44);

    let completedGameBadges = 0;
    let completedSkillBadges = 0;
    
    const tableData: any[] = [];
    
    // Process Game Badges
    gamesToTrack.forEach(game => {
      const isCompleted = data.badges.some((b: any) => b.title.toLowerCase().includes(game.title.toLowerCase()));
      if (isCompleted) completedGameBadges++;
      tableData.push([
        game.title,
        'Game Badge',
        isCompleted ? 'Completed' : 'Not Touched',
        isCompleted ? 'Yes' : '-'
      ]);
    });
    
    // Process Skill Badges
    Object.keys(SKILL_BADGES).forEach(badgeName => {
      const isCompleted = data.badges.some((b: any) => b.title.toLowerCase() === badgeName.toLowerCase());
      if (isCompleted) completedSkillBadges++;
      tableData.push([
        badgeName,
        'Skill Badge',
        isCompleted ? 'Completed' : 'Not Touched',
        isCompleted ? 'Yes' : '-'
      ]);
    });

    doc.text(`Game Badges Completed: ${completedGameBadges} / ${gamesToTrack.length}`, 14, 54);
    doc.text(`Skill Badges Completed: ${completedSkillBadges} / ${Object.keys(SKILL_BADGES).length}`, 14, 60);

    autoTable(doc, {
      startY: 68,
      head: [['Badge Name', 'Type', 'Status', 'In Timeline']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });

    doc.save(`Arcade_Progress_${studentName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleShareAchievement = async () => {
    if (!shareCardRef.current) return;
    try {
      setIsSharing(true);
      const dataUrl = await toPng(shareCardRef.current, { cacheBust: true, backgroundColor: '#0f172a' });
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Arcade_Achievement_${data?.name?.replace(/\s+/g, '_') || 'Student'}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsSharing(false);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="w-full max-w-7xl mx-auto pt-24 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Please Sign In</h2>
        <p className="text-slate-500">You need to sign in to view your progress tracker.</p>
      </div>
    );
  }

  // Calculate stats for charts
  let completedGameBadgesCount = 0;
  let completedSkillBadgesCount = 0;
  if (data) {
    gamesToTrack.forEach(game => {
      if (data.badges.some((b: any) => b.title.toLowerCase().includes(game.title.toLowerCase()))) {
        completedGameBadgesCount++;
      }
    });
    Object.keys(SKILL_BADGES).forEach(badgeName => {
      if (data.badges.some((b: any) => b.title.toLowerCase() === badgeName.toLowerCase())) {
        completedSkillBadgesCount++;
      }
    });
  }

  const chartData = [
    { name: 'Game Badges (1pt each)', value: completedGameBadgesCount, color: '#3b82f6', max: gamesToTrack.length },
    { name: 'Skill Badges (0.5pt each)', value: completedSkillBadgesCount, color: '#10b981', max: Object.keys(SKILL_BADGES).length }
  ];

  useEffect(() => {
    if (completedGameBadgesCount >= 12 && completedSkillBadgesCount >= 66) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [completedGameBadgesCount, completedSkillBadgesCount]);

  // Calculate remaining for ultimate milestone
  const gameBadgesRemaining = Math.max(0, 12 - completedGameBadgesCount);
  const skillBadgesRemaining = Math.max(0, 66 - completedSkillBadgesCount);
  const isUltimateReached = gameBadgesRemaining === 0 && skillBadgesRemaining === 0;

  return (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-20 px-4 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          My Progress Tracker
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Enter your Google Cloud public profile URL and adjust the timeline if needed. We will automatically fetch your game and skill badges completed within this timeframe.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
        {!isEditingUrl && data ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {data.avatar && <img src={data.avatar} alt="Profile" className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700" />}
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{data.name || 'Student'}</h2>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline break-all max-w-[200px] sm:max-w-md block truncate">
                  {profileUrl}
                </a>
              </div>
            </div>
            <button 
              onClick={() => setIsEditingUrl(true)}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors shrink-0"
            >
              Change URL
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => fetchProgress(e)} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Public Profile URL</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="url"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="https://www.skills.google/public_profiles/xxxxxxxx"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
                {recentUrls.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs text-slate-500 py-1">Recent:</span>
                    {recentUrls.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setProfileUrl(url);
                          fetchProgress(undefined, url);
                        }}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-600 dark:text-slate-300 rounded transition-colors truncate max-w-[150px]"
                        title={url}
                      >
                        {url.split('/').pop() || url}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Timeline</label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Timeline</label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:self-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Check Progress'}
              </button>
            </div>
          </form>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {data && (
        <div className="animate-fade-in space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              {data.avatarUrl && (
                <img src={data.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-700" crossOrigin="anonymous" />
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{data.name || 'Profile'}</h2>
                <div className="text-sm font-medium text-slate-500 flex gap-4 mt-1">
                  <span>🎯 Arcade Points: {data.arcadePoints}</span>
                  <span>🏆 Total Badges: {data.badges.length}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleShareAchievement}
                disabled={isSharing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
              >
                {isSharing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Share2 className="w-4 h-4" />}
                Share Achievement
              </button>
              <button 
                onClick={downloadPDF}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#34A853] hover:bg-green-600 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
          
          {/* Daily Reminder / Recommendations */}
          <div className={`p-5 rounded-xl border flex gap-4 items-start ${isUltimateReached ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'}`}>
            <div className={`p-2 rounded-full shrink-0 ${isUltimateReached ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'}`}>
              {isUltimateReached ? <CheckCircle className="w-6 h-6" /> : <BellRing className="w-6 h-6" />}
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-1 ${isUltimateReached ? 'text-indigo-900 dark:text-indigo-300' : 'text-blue-900 dark:text-blue-300'}`}>
                {isUltimateReached ? 'Ultimate Milestone Achieved! 🎉' : 'Daily Progress Reminder'}
              </h3>
              <p className={`text-sm mb-2 ${isUltimateReached ? 'text-indigo-800 dark:text-indigo-400' : 'text-blue-800 dark:text-blue-400'}`}>
                {isUltimateReached 
                  ? 'Incredible work! You have completed enough game and skill badges to reach the Ultimate Milestone.'
                  : `You need ${gameBadgesRemaining} more Game Badge${gameBadgesRemaining !== 1 ? 's' : ''} and ${skillBadgesRemaining} more Skill Badge${skillBadgesRemaining !== 1 ? 's' : ''} to reach the Ultimate Milestone (12 Game + 66 Skill Badges).`
                }
              </p>
              {!isUltimateReached && (
                <div className="bg-white/60 dark:bg-slate-800/50 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 border border-blue-100 dark:border-blue-800/50">
                  <span className="font-semibold text-blue-700 dark:text-blue-400">Recommendation:</span> Focus on {gameBadgesRemaining > 0 ? 'Arcade Games' : 'Skill Badges'} today to stay on track!
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Chart Visualization */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Badges Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Completion Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-center text-slate-500 mt-2">
                Calculation Logic: Game Badges (1 pt) | Skill Badges (0.5 pt)
              </p>
            </div>
          </div>

          <CheckProgress completedBadges={data.badges} />
          
          <WeeklyProgress profileUrl={profileUrl} />
          
          {/* Hidden Share Card (Rendered only for html2canvas) */}
          <div className="fixed top-[-9999px] left-[-9999px]">
            <div ref={shareCardRef} className="w-[600px] h-[315px] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#ffffff' }}>
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }} />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(217, 70, 239, 0.2)' }} />
              
              <div className="relative z-10 flex items-start gap-4">
                {data.avatarUrl && (
                  <img src={data.avatarUrl} alt="Avatar" crossOrigin="anonymous" className="w-16 h-16 rounded-full border-2" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                )}
                <div>
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <p className="font-medium tracking-wide" style={{ color: '#60a5fa' }}>Google Cloud Arcade Participant</p>
                </div>
              </div>
              
              <div className="relative z-10 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: '#94a3b8' }}>Total Progress</p>
                  <p className="text-4xl font-extrabold" style={{ color: '#c084fc' }}>
                    {data.arcadePoints} Arcade Points
                  </p>
                  <p className="font-medium pt-2" style={{ color: '#cbd5e1' }}>
                    {completedGameBadgesCount} Game Badges &amp; {completedSkillBadgesCount} Skill Badges
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur mb-2 ml-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <CheckCircle className="w-6 h-6" style={{ color: '#4ade80' }} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Arcade Buddy Platform</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
      
      {isAdmin && (
        <AdminCertificatePreview />
      )}

      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 max-w-sm flex items-start gap-3 relative">
            <div className="flex-shrink-0 mt-0.5 text-blue-500">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {toastMessage.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {toastMessage.desc}
              </p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

