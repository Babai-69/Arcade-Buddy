import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, CheckCircle, ExternalLink, Download, AlertCircle, Share2, 
  Calendar, Sparkles, ShieldCheck, Gamepad2, Trophy, ArrowRight, 
  Lock, Check, Copy, RefreshCw, Award, Zap, Flame, BookOpen, Layers, Info
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import confetti from 'canvas-confetti';
import { useArcadeGames } from '../utils/arcadeApi';
import { showNotification } from './ArcadeNotification';
import { fetchProfileCalculator } from '../services/arcadeApiService';
import { MilestoneProgress } from './MilestoneProgress';
import { BonusMilestoneTracker } from './BonusMilestoneTracker';
import { AdminCertificatePreview } from './AdminCertificatePreview';

const TIERS = [
  { name: 'Unranked', min: 0, max: 49.5, color: '#94A3B8', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
  { name: 'Arcade Trooper', min: 50, max: 74.5, color: '#3B82F6', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { name: 'Arcade Ranger', min: 75, max: 94.5, color: '#10B981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { name: 'Arcade Champion', min: 95, max: 119.5, color: '#F59E0B', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { name: 'Arcade Legend', min: 120, max: 9999, color: '#EC4899', bg: 'bg-pink-500/10', border: 'border-pink-500/30' }
];

const COHORT_MILESTONES = [
  { id: 1, name: 'Milestone 1', games: 6, skills: 18, bonus: 5, totalNeeded: 20 },
  { id: 2, name: 'Milestone 2', games: 8, skills: 34, bonus: 15, totalNeeded: 40 },
  { id: 3, name: 'Milestone 3', games: 10, skills: 50, bonus: 25, totalNeeded: 60 },
  { id: 4, name: 'Ultimate Milestone', games: 12, skills: 66, bonus: 35, totalNeeded: 80 }
];

// Sample demo profile data for instant testing
const SAMPLE_DEMO_DATA = {
  name: 'Demo Facilitator Learner',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  arcadePoints: 64.5,
  gameBadges: 8,
  skillBadges: 45,
  triviaBadges: 3,
  milestoneEarned: 'Milestone 2',
  badges: [
    { title: 'Trick-or-Metric', category: 'Game', earnedDate: 'Oct 14, 2026', validForProgram: true },
    { title: 'Arcade Base Camp October 2026', category: 'Game', earnedDate: 'Oct 10, 2026', validForProgram: true },
    { title: 'Arcade Adventure: Google Cloud ML APIs', category: 'Game', earnedDate: 'Oct 08, 2026', validForProgram: true },
    { title: 'Arcade Simulator: Site Reliability Engineer', category: 'Game', earnedDate: 'Oct 05, 2026', validForProgram: true },
    { title: 'Analyze Images with the Cloud Vision API', category: 'Skill', earnedDate: 'Oct 02, 2026', validForProgram: true },
    { title: 'Get Started with Cloud Storage', category: 'Skill', earnedDate: 'Sep 28, 2026', validForProgram: true },
    { title: 'Implement DevOps Workflows in Google Cloud', category: 'Skill', earnedDate: 'Sep 25, 2026', validForProgram: true },
    { title: 'Prompt Design in Vertex AI', category: 'Skill', earnedDate: 'Sep 20, 2026', validForProgram: true }
  ]
};

export function UserProgressDashboard({ onOpenValidator }: { onOpenValidator?: () => void } = {}) {
  const [user, setUser] = useState<any>(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'october' | 'milestones' | 'transcript'>('overview');
  const [badgeSearch, setBadgeSearch] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'Game' | 'Skill'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const { activeGames } = useArcadeGames();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const savedUrl = localStorage.getItem('arcadeProfileUrl');
    const savedData = localStorage.getItem('arcadeProgressData');
    if (savedUrl) setProfileUrl(savedUrl);
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {}
    }
  }, []);

  const handleFetchProgress = async (e?: React.FormEvent, urlToUse?: string) => {
    if (e) e.preventDefault();
    const target = (urlToUse || profileUrl).trim();
    if (!target) return;

    setLoading(true);
    setError('');

    try {
      const result = await fetchProfileCalculator(target, { maxRetries: 2 });
      setData(result);
      localStorage.setItem('arcadeProfileUrl', target);
      localStorage.setItem('arcadeProgressData', JSON.stringify(result));
      showNotification({
        id: 'progress-sync',
        message: 'Skills Boost Profile Synced Successfully!',
        type: 'success',
        duration: 3500
      });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      setError(err.message || 'Failed to sync public profile. Ensure profile visibility is Public.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setData(SAMPLE_DEMO_DATA);
    setProfileUrl('https://www.skills.google/public_profiles/demo-facilitator');
    showNotification({
      id: 'demo-loaded',
      message: 'Demo Facilitator Profile loaded for UI review!',
      type: 'info',
      duration: 3000
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentPoints = data?.arcadePoints || 0;
  const currentTier = useMemo(() => {
    return TIERS.find(t => currentPoints >= t.min && currentPoints <= t.max) || TIERS[0];
  }, [currentPoints]);

  const nextTier = useMemo(() => {
    const idx = TIERS.findIndex(t => t.name === currentTier.name);
    return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
  }, [currentTier]);

  const tierProgressPercent = useMemo(() => {
    if (!nextTier) return 100;
    const progressInCurrent = currentPoints - currentTier.min;
    const span = nextTier.min - currentTier.min;
    return Math.min(100, Math.max(0, (progressInCurrent / span) * 100));
  }, [currentPoints, currentTier, nextTier]);

  const completedGames = data?.badges?.filter((b: any) => b.category === 'Game')?.length || data?.gameBadges || 0;
  const completedSkills = data?.badges?.filter((b: any) => b.category === 'Skill')?.length || data?.skillBadges || 0;

  const filteredBadges = useMemo(() => {
    if (!data?.badges) return [];
    return data.badges.filter((b: any) => {
      const matchSearch = b.title?.toLowerCase().includes(badgeSearch.toLowerCase());
      const matchFilter = badgeFilter === 'all' || b.category === badgeFilter;
      return matchSearch && matchFilter;
    });
  }, [data?.badges, badgeSearch, badgeFilter]);

  const downloadPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Google Cloud Arcade - Progress Transcript', 14, 22);
    doc.setFontSize(11);
    doc.text(`Learner: ${data.name || 'Participant'}`, 14, 32);
    doc.text(`Total Arcade Points: ${data.arcadePoints || 0}`, 14, 40);
    doc.text(`Current Swag Tier: ${currentTier.name}`, 14, 48);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 56);

    const rows = (data.badges || []).map((b: any, idx: number) => [
      idx + 1,
      b.title,
      b.category,
      b.earnedDate || 'Completed'
    ]);

    autoTable(doc, {
      startY: 64,
      head: [['#', 'Badge Name', 'Type', 'Date Earned']],
      body: rows,
    });

    doc.save(`Arcade_Progress_${(data.name || 'transcript').replace(/\s+/g, '_')}.pdf`);
  };

  const isAdmin = user?.email === 'deya58690@gmail.com' || user?.email === 'tripti.arcade.25@gmail.com';

  return (
    <div className="w-full max-w-7xl mx-auto pt-6 pb-24 px-4 sm:px-6 font-sans">
      
      {/* Top Bento Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-10 mb-8 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Upcoming Facilitator Cohort • Participant Progress Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              My Arcade Progress Vault
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Track earned skill badges, game quests, and milestone bonus points in real-time. Forecast your 2026/2027 swag tier for the Google Cloud Arcade Facilitator Program.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!data && (
              <button
                type="button"
                onClick={handleLoadDemo}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Load Demo Profile</span>
              </button>
            )}

            {onOpenValidator && (
              <button
                type="button"
                onClick={onOpenValidator}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Audit Badge Assets</span>
              </button>
            )}

            <Link
              to="/syllabus"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>October Games</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Sync Connector Bar */}
      <div className="bg-white dark:bg-[#0c1427] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/90 mb-8 shadow-sm">
        {data ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={data.avatar || data.avatarUrl || 'https://www.skills.google/assets/default_avatar.png'} 
                  alt={data.name || 'Participant'} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/30 shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Learner&background=1A73E8&color=fff';
                  }}
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {data.name || 'Connected Participant'}
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    Live Synced
                  </span>
                </div>
                <a 
                  href={profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-blue-500 hover:underline flex items-center gap-1 mt-1 truncate max-w-sm sm:max-w-md"
                >
                  <span className="truncate">{profileUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleFetchProgress(undefined, profileUrl)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Syncing...' : 'Sync Latest'}</span>
              </button>

              <button
                type="button"
                onClick={downloadPDF}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1.5">
              Connect Your Google Skills Boost Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Paste your public profile link to automatically analyze completed arcade quests, skill badges, and calculate your exact milestone bonuses.
            </p>

            <form onSubmit={handleFetchProgress} className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <input
                type="text"
                placeholder="https://www.skills.google/public_profiles/..."
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !profileUrl.trim()}
                className="px-6 py-3 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate Progress</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <Link to="/public-profile-help" className="text-blue-600 dark:text-blue-400 hover:underline">
                Find my Public Profile URL?
              </Link>
              <span>&bull;</span>
              <button onClick={handleLoadDemo} className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer">
                Try Demo Preview
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Key Metric Bento Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Points Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Arcade Points</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentPoints.toFixed(1)} <span className="text-sm font-semibold text-slate-400">Pts</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <span>Games: {completedGames}</span>
              <span>&bull;</span>
              <span>Skills: {completedSkills}</span>
            </div>
          </div>
        </div>

        {/* Tier Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Swag Tier Forecast</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{currentTier.name}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {nextTier ? `${(nextTier.min - currentPoints).toFixed(1)} pts to ${nextTier.name}` : 'Top Tier Achieved!'}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000"
                style={{ width: `${tierProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Game Badges Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Arcade Games Completed</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {completedGames} <span className="text-sm font-semibold text-slate-400">/ 12</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Awards +1.0 Arcade Pt each
            </div>
          </div>
        </div>

        {/* Skill Badges Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Skill Badges Completed</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {completedSkills} <span className="text-sm font-semibold text-slate-400">/ 66</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Awards +0.5 Pt per badge (1 Pt / 2 badges)
            </div>
          </div>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Cohort Overview &amp; Swags</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('october')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'october'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>October Live Games (6)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'milestones'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Bonus Milestones (1–4)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transcript')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'transcript'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Verified Badges Transcript</span>
        </button>
      </div>

      {/* Tab 1: Overview & Swags */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Swags Tier Waterfall */}
          <div className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  2026/2027 Swag Drop Thresholds
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Reach the required points threshold before the Prize Counter opens in December/January.
                </p>
              </div>
              <Link to="/swags" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                <span>View Swags Showcase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIERS.slice(1).map((tier, idx) => {
                const reached = currentPoints >= tier.min;
                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-5 border transition-all ${
                      reached 
                        ? `${tier.bg} ${tier.border} shadow-sm ring-1 ring-blue-500/20` 
                        : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        {tier.name.replace('Arcade ', '')}
                      </span>
                      {reached ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          Unlocked ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                          {tier.min} Pts
                        </span>
                      )}
                    </div>
                    
                    <div className="text-2xl font-black mb-1" style={{ color: tier.color }}>
                      {tier.min}+ Pts
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {reached 
                        ? 'Eligible for this swag pack!' 
                        : `${(tier.min - currentPoints).toFixed(1)} more points required`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Progress Component Integration */}
          <MilestoneProgress gameBadges={completedGames} skillBadges={completedSkills} />
        </div>
      )}

      {/* Tab 2: October Live Games */}
      {activeTab === 'october' && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Active October 2026 Game Quests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Play these 6 official games before October 31 to earn +1.0 Arcade Point each.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                All 6 Live &amp; Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeGames.map((game, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="h-28 rounded-xl bg-white dark:bg-slate-800 p-3 mb-4 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60">
                      <img 
                        src={game.img} 
                        alt={game.title} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">October Quest</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">+1.0 Pt</span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 mb-3">
                      {game.title}
                    </h4>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-300 truncate">{game.code}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(game.code)}
                        className="text-blue-500 hover:text-blue-600 shrink-0 ml-2"
                        title="Copy game access code"
                      >
                        {copiedCode === game.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <a 
                      href={game.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Play on Skills Boost</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Milestones Tracker */}
      {activeTab === 'milestones' && (
        <div className="space-y-8 animate-fade-in">
          <div className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Facilitator Bonus Milestones (1 through 4)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-2xl">
              Completing the required combination of games and skills unlocks huge bonus point multipliers that accelerate your swag tier.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COHORT_MILESTONES.map((m) => {
                const gamesMet = completedGames >= m.games;
                const skillsMet = completedSkills >= m.skills;
                const milestoneAchieved = gamesMet && skillsMet;

                return (
                  <div
                    key={m.id}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                      milestoneAchieved 
                        ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20' 
                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-extrabold text-base text-slate-900 dark:text-white">
                          {m.name}
                        </span>
                        {milestoneAchieved ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            Earned!
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            +{m.bonus} Bonus Pts
                          </span>
                        )}
                      </div>

                      <div className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                        +{m.bonus} <span className="text-xs font-semibold text-slate-400">Bonus</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Games ({m.games}):</span>
                          <span className={`font-bold ${gamesMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                            {completedGames}/{m.games} {gamesMet ? '✓' : ''}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Skills ({m.skills}):</span>
                          <span className={`font-bold ${skillsMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                            {completedSkills}/{m.skills} {skillsMet ? '✓' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-500">
                      {milestoneAchieved 
                        ? 'Bonus points awarded!' 
                        : `${Math.max(0, m.games - completedGames)} games & ${Math.max(0, m.skills - completedSkills)} skills left`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div id="swag-milestone">
            <BonusMilestoneTracker 
              gameBadges={completedGames} 
              skillBadges={completedSkills} 
              badges={data?.badges} 
            />
          </div>
        </div>
      )}

      {/* Tab 4: Transcript */}
      {activeTab === 'transcript' && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Verified Badges Transcript ({filteredBadges.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Detailed list of all credentials verified on your Google Cloud profile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search badges..."
                  value={badgeSearch}
                  onChange={(e) => setBadgeSearch(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <select
                  value={badgeFilter}
                  onChange={(e: any) => setBadgeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="Game">Games Only</option>
                  <option value="Skill">Skills Only</option>
                </select>
              </div>
            </div>

            {filteredBadges.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 dark:bg-slate-900">
                No badges matching your filter or search query.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredBadges.map((badge: any, idx: number) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        badge.category === 'Game' 
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' 
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {badge.category === 'Game' ? 'G' : 'S'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 dark:text-white truncate">
                          {badge.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {badge.earnedDate || 'Verified on Skills Boost'}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full font-bold text-[11px] shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {badge.category === 'Game' ? '+1.0 Pt' : '+0.5 Pt'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="mt-8">
          <AdminCertificatePreview />
        </div>
      )}

    </div>
  );
}
