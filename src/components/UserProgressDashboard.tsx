import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle, ExternalLink, Download, AlertCircle, Share2, Calendar } from 'lucide-react';
import { auth } from '../lib/firebase';
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

export function UserProgressDashboard() {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  
  // Custom Date Range
  const [startDate, setStartDate] = useState('2026-07-13T17:30');
  const [endDate, setEndDate] = useState('2026-09-14T23:59');
  
  const [isSharing, setIsSharing] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  const { activeGames } = useArcadeGames();
  const isAdmin = auth.currentUser?.email === 'deya58690@gmail.com' || auth.currentUser?.email === 'tripti.arcade.25@gmail.com';
  
  useEffect(() => {
    // Left intentionally blank as requested
  }, []);

  const fetchProgress = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profileUrl) return;

    setLoading(true);
    setError('');
    
    try {
      // Create date objects taking timezone into account or pass directly
      // appending Z or offset if needed, but since server expects ISO we can just pass
      let queryStr = `url=${encodeURIComponent(profileUrl)}`;
      if (startDate) queryStr += `&startDate=${encodeURIComponent(new Date(startDate).toISOString())}`;
      if (endDate) queryStr += `&endDate=${encodeURIComponent(new Date(endDate).toISOString())}`;
      
      const res = await fetch(`/api/calculator?${queryStr}`);
      if (!res.ok) throw new Error("Could not fetch profile. Ensure your profile is public.");
      
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Error fetching progress');
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

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
        <form onSubmit={fetchProgress} className="flex flex-col gap-4">
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
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Timeline</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Timeline</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
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
          
          {/* Progress Chart Visualization */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
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
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Game Badges Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                🎮 Game Badges <span className="text-sm font-normal text-slate-500">({completedGameBadgesCount}/{gamesToTrack.length})</span>
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                {gamesToTrack.map((game, idx) => {
                  const isCompleted = data.badges.some((b: any) => b.title.toLowerCase().includes(game.title.toLowerCase()));
                  return (
                    <div key={`${game.title}-${idx}`} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div>
                        <a href={game.link} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors group">
                          {game.title}
                          <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                        </a>
                      </div>
                      <div className="shrink-0 pt-0.5">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            <CheckCircle className="w-3.5 h-3.5" /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                            Not Earned
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skill Badges Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                🏆 Skill Badges <span className="text-sm font-normal text-slate-500">({completedSkillBadgesCount}/{Object.keys(SKILL_BADGES).length})</span>
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
                {Object.entries(SKILL_BADGES).map(([badgeName, url]) => {
                  const isCompleted = data.badges.some((b: any) => b.title.toLowerCase() === badgeName.toLowerCase());
                  return (
                    <div key={badgeName} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors group truncate w-full">
                          <span className="truncate">{badgeName}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
                        </a>
                      </div>
                      <div className="shrink-0 pt-0.5 ml-2">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            <CheckCircle className="w-3.5 h-3.5" /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                            Not Earned
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
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
    </div>
  );
}

