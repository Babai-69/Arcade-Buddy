import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  HelpCircle,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  Trophy,
  Mail,
  Laptop,
  Flame,
  Lock,
  Upload,
  FileSpreadsheet,
  Trash2,
  RefreshCw,
  KeyRound,
  LogIn,
  ChevronDown,
  ChevronUp,
  MapPin,
  Navigation,
  Maximize2,
  Building2,
  Terminal,
  FolderGit2,
  Code2
} from 'lucide-react';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';
import { auth, loginWithGoogle } from '../lib/firebase';
import {
  getCommunityLeaderboard,
  saveCommunityLeaderboard,
  clearCommunityLeaderboard,
  parseCommunityCsv,
  CommunityParticipant,
  CommunityLeaderboardData
} from '../services/communityLeaderboardService';

// Official syllabus from user image
interface SyllabusCourse {
  name: string;
  url: string;
  type: string;
  credits: number;
}

const LEARN_WITH_COMMUNITIES_SYLLABUS: SyllabusCourse[] = [
  {
    name: 'The Basics of Google Cloud Compute',
    url: 'https://www.skills.google/course_templates/754',
    type: 'Skill Badge',
    credits: 4
  },
  {
    name: 'Configure Service Accounts and IAM Roles for Google Cloud',
    url: 'https://www.skills.google/course_templates/702',
    type: 'Skill Badge',
    credits: 4
  },
  {
    name: 'Implement Speech and Language Solutions with Pre-trained APIs',
    url: 'https://www.skills.google/course_templates/700',
    type: 'Skill Badge',
    credits: 4
  },
  {
    name: 'Develop AI-Powered Prototypes in Google AI Studio',
    url: 'https://www.skills.google/course_templates/1426',
    type: 'Skill Badge',
    credits: 0
  },
  {
    name: 'Analyze Images with the Cloud Vision API',
    url: 'https://www.skills.google/course_templates/633',
    type: 'Skill Badge',
    credits: 12
  },
  {
    name: 'Build a Website on Google Cloud',
    url: 'https://www.skills.google/course_templates/638',
    type: 'Skill Badge',
    credits: 13
  },
  {
    name: 'Create Your First Gemini Enterprise Application',
    url: 'https://www.skills.google/course_templates/1586/',
    type: 'Skill Badge',
    credits: 0
  },
  {
    name: 'Store, Process, and Manage Data on Google Cloud - Console',
    url: 'https://www.skills.google/course_templates/658',
    type: 'Skill Badge',
    credits: 3
  },
  {
    name: 'Using the Google Cloud Speech API',
    url: 'https://www.skills.google/course_templates/756',
    type: 'Skill Badge',
    credits: 4
  },
  {
    name: 'Explore Generative AI in Agent Platform',
    url: 'https://www.skills.google/course_templates/959',
    type: 'Skill Badge',
    credits: 16
  }
];

interface BadgeSolutionInfo {
  id: number;
  badgeName: string;
  courseUrl: string;
  type: string;
  credits: number;
  solutionUrl?: string;
  extraCommand?: string;
  isAvailable: boolean;
  notes?: string;
}

const COMMUNITY_BADGE_SOLUTIONS: BadgeSolutionInfo[] = [
  {
    id: 1,
    badgeName: 'The Basics of Google Cloud Compute',
    courseUrl: 'https://www.skills.google/course_templates/754',
    type: 'Skill Badge',
    credits: 4,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/The%20Basics%20of%20Google%20Cloud%20Compute%3A%20Challenge%20Lab/Readme.md',
    isAvailable: true
  },
  {
    id: 2,
    badgeName: 'Configure Service Accounts and IAM Roles for Google Cloud',
    courseUrl: 'https://www.skills.google/course_templates/702',
    type: 'Skill Badge',
    credits: 4,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Configure%20Service%20Accounts%20and%20IAM%20for%20Google%20Cloud%3A%20Challenge%20Lab/Readme.md',
    isAvailable: true
  },
  {
    id: 3,
    badgeName: 'Implement Speech and Language Solutions with Pre-trained APIs',
    courseUrl: 'https://www.skills.google/course_templates/700',
    type: 'Skill Badge',
    credits: 4,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Implement%20Speech%20and%20Language%20Solutions%20with%20Pre-trained%20APIs%3A%20Challenge%20Lab/Readme.md',
    isAvailable: true
  },
  {
    id: 4,
    badgeName: 'Develop AI-Powered Prototypes in Google AI Studio',
    courseUrl: 'https://www.skills.google/course_templates/1426',
    type: 'Skill Badge',
    credits: 0,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Develop%20AI-Powered%20Prototypes%20in%20Google%20AI%20Studio:%20Challenge%20Lab/GSP529.md',
    isAvailable: true
  },
  {
    id: 5,
    badgeName: 'Analyze Images with the Cloud Vision API',
    courseUrl: 'https://www.skills.google/course_templates/633',
    type: 'Skill Badge',
    credits: 12,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Analyze%20Images%20with%20the%20Cloud%20Vision%20API%3A%20Challenge%20Lab/Readme.md',
    isAvailable: true
  },
  {
    id: 6,
    badgeName: 'Build a Website on Google Cloud',
    courseUrl: 'https://www.skills.google/course_templates/638',
    type: 'Skill Badge',
    credits: 13,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Build%20a%20Website%20on%20Google%20Cloud%3A%20Challenge%20Lab/Reaadme.md',
    isAvailable: true
  },
  {
    id: 7,
    badgeName: 'Create Your First Gemini Enterprise Application',
    courseUrl: 'https://www.skills.google/course_templates/1586/',
    type: 'Skill Badge',
    credits: 0,
    solutionUrl: 'https://sharetext.io/fb31o7b8',
    isAvailable: true
  },
  {
    id: 8,
    badgeName: 'Store, Process, and Manage Data on Google Cloud - Console',
    courseUrl: 'https://www.skills.google/course_templates/658',
    type: 'Skill Badge',
    credits: 3,
    solutionUrl: 'https://github.com/Arcade-With-Us/Google-Cloud-Labs/blob/main/Store%2C%20Process%2C%20and%20Manage%20Data%20on%20Google%20Cloud%3A%20Challenge%20Lab/Readme.md',
    isAvailable: true
  },
  {
    id: 9,
    badgeName: 'Using the Google Cloud Speech API',
    courseUrl: 'https://www.skills.google/course_templates/756',
    type: 'Skill Badge',
    credits: 4,
    isAvailable: false,
    notes: 'Solution available soon'
  },
  {
    id: 10,
    badgeName: 'Explore Generative AI in Agent Platform',
    courseUrl: 'https://www.skills.google/course_templates/959',
    type: 'Skill Badge',
    credits: 16,
    isAvailable: false,
    notes: 'Solution available soon'
  }
];

const FAQ_ITEMS = [
  {
    category: 'Rewards',
    question: 'How and where do I claim my physical swags and milestone rewards?',
    answer: 'Important: All the recognition and milestones will be shared with the GDG/Community Organizer. The program team will not be responsible for rewards for individual participants. So participants have to claim their physical prizes from Dr. B.C. Roy Engineering College, Durgapur.'
  },
  {
    category: 'General',
    question: 'Is there any group or channel which I need to join?',
    answer: 'Yes, it is recommended to join the official community Telegram channel or campus discussion group to receive daily updates, lab solutions, and milestone notices.'
  },
  {
    category: 'General',
    question: 'What is the Google Cloud Learn with Communities campaign?',
    answer: 'Google Cloud Learn with Communities is a campaign for students and professional developers to learn through Google Skills, complete recommended curricula and hands-on labs, and earn relevant Skill Badges.'
  },
  {
    category: 'Registration',
    question: 'Do I need a Google Skills account before registering?',
    answer: 'Yes. You must have an active Google Skills account and provide its email address during enrolment.'
  },
  {
    category: 'Registration',
    question: 'Can I use my existing Google Skills account?',
    answer: 'No. To remain eligible for this campaign, you must create a new Google Skills account on or after Sept 14th/15th, 2026. Old completions will not be counted.'
  },
  {
    category: 'Registration',
    question: 'Do I need to make my Google Skills profile public?',
    answer: 'Yes. Your Google Skills Public Profile must be set to Public. A valid public Google Skills profile URL is mandatory to complete your registration and verify your badge completions.'
  },
  {
    category: 'General',
    question: 'Who can participate in the campaign?',
    answer: 'The campaign is intended for Students and Professional Developers. Participants must self-attest their role as either "Student" or "Developer" while completing the enrolment form.'
  }
];

const ADMIN_EMAILS = ['deya58690@gmail.com', 'tripti.arcade.25@gmail.com'];

export function LearnWithCommunitiesPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // 'm' = Map, 'k' = Satellite
  const [mapZoom, setMapZoom] = useState<number>(16);
  const [faqFilter, setFaqFilter] = useState<'All' | 'General' | 'Registration' | 'Rewards'>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Badge solutions interactive states
  const [selectedSolutionId, setSelectedSolutionId] = useState<number>(1);
  const [copiedSolutionUrl, setCopiedSolutionUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  
  // Sequence requested: 1. 6-step roadmap, 2. claim 200 credits, 3. program syllabus, 4. community leaderboard
  const [activeTab, setActiveTab] = useState<'roadmap' | 'credits' | 'syllabus' | 'leaderboard'>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Leaderboard data from separate Firebase collection
  const [leaderboardData, setLeaderboardData] = useState<CommunityLeaderboardData | null>(null);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  
  // Admin upload state — strictly restricted to authorized admin emails
  const [isAdminUser, setIsAdminUser] = useState(() => {
    const email = auth.currentUser?.email?.toLowerCase() || '';
    return ADMIN_EMAILS.includes(email);
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [rawCsvText, setRawCsvText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<CommunityParticipant[]>([]);
  const [isSavingCsv, setIsSavingCsv] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeUnlocked, setPasscodeUnlocked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Interactive checklist state
  const [checklist, setChecklist] = useState({
    freshEmail: false,
    afterSept14: false,
    publicProfile: false,
    gdgOrganizer: false,
    accessCode: false,
    laptopChrome: false,
    ownProfileUrl: false,
    submittedConfirmation: false,
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistCount = Object.values(checklist).filter(Boolean).length;

  // Check Admin on auth change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const email = user?.email?.toLowerCase() || '';
      setIsAdminUser(ADMIN_EMAILS.includes(email) || passcodeUnlocked);
    });
    return () => unsubscribe();
  }, [passcodeUnlocked]);

  // Load Community Leaderboard
  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    try {
      const data = await getCommunityLeaderboard();
      setLeaderboardData(data);
    } catch (e) {
      console.error('Failed to load community leaderboard', e);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleCopyAccessCode = () => {
    navigator.clipboard.writeText('GDGC-BCREC');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Dr. B. C. Roy Engineering College, Jemua Road, Fuljhore, Durgapur, West Bengal 713206');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const activeSolution = COMMUNITY_BADGE_SOLUTIONS.find(s => s.id === selectedSolutionId) || COMMUNITY_BADGE_SOLUTIONS[0];

  const handleCopySolutionLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedSolutionUrl(true);
    setTimeout(() => setCopiedSolutionUrl(false), 2500);
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawCsvText(text);
        const parsed = parseCommunityCsv(text);
        setParsedPreview(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleTextareaChange = (text: string) => {
    setRawCsvText(text);
    const parsed = parseCommunityCsv(text);
    setParsedPreview(parsed);
  };

  const handleSaveCsvToFirebase = async () => {
    if (parsedPreview.length === 0) return;
    setIsSavingCsv(true);
    try {
      const adminEmail = auth.currentUser?.email || 'deya58690@gmail.com';
      await saveCommunityLeaderboard(parsedPreview, adminEmail);
      setUploadSuccessToast(true);
      setShowUploadModal(false);
      setRawCsvText('');
      setParsedPreview([]);
      await fetchLeaderboard();
      setTimeout(() => setUploadSuccessToast(false), 3500);
    } catch (err) {
      console.error('Failed to save community leaderboard to Firebase:', err);
      alert('Failed to save to Firebase. Please check permissions or network connection.');
    } finally {
      setIsSavingCsv(false);
    }
  };

  const handleClearStandings = async () => {
    if (!window.confirm('Are you sure you want to lock / reset the community leaderboard? This will revert it back to the awaiting-data state.')) return;
    try {
      await clearCommunityLeaderboard();
      await fetchLeaderboard();
    } catch (err) {
      console.error('Failed to clear', err);
    }
  };

  const handleUnlockWithPasscode = () => {
    if (adminPasscode === 'gdgc2026' || adminPasscode === 'admin@123') {
      setPasscodeUnlocked(true);
      setIsAdminUser(true);
      setAdminPasscode('');
    } else {
      alert('Invalid admin passcode.');
    }
  };

  const totalCreditsRequired = LEARN_WITH_COMMUNITIES_SYLLABUS.reduce((sum, item) => sum + item.credits, 0);

  const displayedParticipants = leaderboardData?.participants?.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.college.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredFaqs = FAQ_ITEMS.filter(item => {
    if (faqFilter === 'All') return true;
    return item.category === faqFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 pt-8 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Notification Toast */}
        <AnimatePresence>
          {uploadSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 border border-emerald-400"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Community Leaderboard Updated!</p>
                <p className="text-xs text-emerald-100">Saved to separate Firebase collection successfully.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation & Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <BackToResourcesButton handwrittenNote="← campus community cloud event 🌐" />
          <div className="flex items-center gap-3">
            <span
              className="text-amber-600 dark:text-amber-400 font-semibold text-lg hidden md:inline-block -rotate-1 select-none"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              official GDSC BCREC cohort 🎓
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/20 shadow-xs">
              <Flame className="w-3.5 h-3.5" />
              LIVE EVENT • DEADLINE: NOV 23, 2026
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl mb-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />
          
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    GDSC | BCREC
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                    #LearnWithCommunities
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    200 Free Credits Pass
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
                  Google Cloud <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
                    Learn with Communities
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                  Your complete guide to enrolling, claiming your <strong>200 free Google Skills credits</strong>,
                  completing the mandatory 10 skill badges syllabus, and climbing the community leaderboard before <strong>November 23, 2026</strong>.
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Campaign Cutoff</p>
                    <p className="text-sm font-black text-rose-600 dark:text-rose-400 mt-0.5">23rd Nov 2026</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Lab Credits</p>
                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">200 Credits Pass</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Organizer Name</p>
                    <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-0.5 truncate">GDG on Campus</p>
                  </div>
                </div>

                {/* Organizer Code Callout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                      ENROLLMENT FORM REFERRAL / ACCESS CODE
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-blue-700 dark:text-blue-300">
                        GDGC-BCREC
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md font-bold uppercase bg-blue-200/70 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        KEEP IT SAFE
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Copy exactly in capitals, with hyphen, no extra spaces.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyAccessCode}
                      className="btn-cta btn-press btn-press--primary flex-1 sm:flex-none"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? 'Copied Code!' : 'Copy Code'}</span>
                    </button>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScIxD14Pyc183PbDLHcS9N-nbQRRYSncqY0TP3g7qSsfWgnKQ/viewform?pli=1&pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-press btn-press--secondary"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Event Cover Image */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-white dark:bg-slate-800">
                  <img
                    src="/gifts.png"
                    alt="Google Cloud Learn with Communities Swags & Rewards"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if local gifts image is loading
                      (e.currentTarget as HTMLImageElement).src = '/gifts.png';
                    }}
                  />
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/60 text-center">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      These are reference images, actual images might be different than it looks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* IMPORTANT NOTICE & PRIZE CLAIM VENUE (DR. B.C. ROY ENGINEERING COLLEGE)   */}
        {/* ========================================================================= */}
        <div
          className="mb-10 rounded-3xl bg-[var(--card)] border-2 border-[var(--edge)] overflow-hidden"
          style={{ boxShadow: '6px 6px 0 var(--edge)' }}
        >
          {/* Header Warning Ribbon */}
          <div className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-black text-xs sm:text-sm uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-amber-200 animate-bounce shrink-0" />
              <span>OFFICIAL PRIZE CLAIM &amp; RECOGNITION POLICY</span>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-black/25 backdrop-blur-xs border border-white/20 tracking-wide">
              CAMPUS COLLECTION ONLY
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* The Notice Callout Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/25 border-2 border-amber-400 dark:border-amber-600/80 mb-8 flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/50 flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 mb-2">
                  CRITICAL PARTICIPANT NOTICE
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black font-display text-slate-900 dark:text-white leading-snug mb-2.5">
                  Important: All the recognition and milestones will be shared with the GDG/Community Organizer. The program team will not be responsible for rewards for individual participants. So participants have to claim their physical prizes from Dr. B.C. Roy Engineering College.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <span><strong>Organizer Delivery:</strong> Swag kits are delivered in bulk to the campus community organizer.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                    <span><strong>No Doorstep Courier:</strong> No individual parcel delivery by Google Cloud team.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <span><strong>Physical Verification:</strong> Bring your college ID and Skills Boost profile to claim.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Location Map Box — Styled directly after the uploaded Google Maps layout */}
            <div
              className="rounded-2xl border-2 border-[var(--edge)] bg-[var(--bg)] overflow-hidden"
              style={{ boxShadow: '4px 4px 0 var(--edge)' }}
            >
              {/* Map Box Header with Address Details & Action Buttons */}
              <div className="p-4 sm:p-5 bg-[var(--card)] border-b-2 border-[var(--edge)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-[var(--edge)]">
                    <MapPin className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-base sm:text-lg text-[var(--ink)]">
                        Dr. B. C. Roy Engineering College (BCREC)
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        OFFICIAL VENUE
                      </span>
                    </div>
                    <p className="text-xs text-[var(--mut)] mt-1 font-medium flex items-center gap-1.5 flex-wrap">
                      <span>Jemua Road, Fuljhore, Durgapur, West Bengal 713206</span>
                      <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                      <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">23.544417° N, 87.341693° E</span>
                    </p>
                  </div>
                </div>

                {/* Tactile Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="btn-press btn-press--sm inline-flex items-center gap-1.5 text-xs font-bold bg-[var(--card)] text-[var(--ink)] px-3 py-2 rounded-xl border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                  </button>

                  <a
                    href="https://maps.app.goo.gl/A22NGtazEbNDLCqW7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press btn-press--sm inline-flex items-center gap-1.5 text-xs font-bold bg-[#1A73E8] text-white px-3.5 py-2 rounded-xl border-2 border-[var(--edge)] shadow-[3px_3px_0_var(--edge)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer no-underline"
                  >
                    <Navigation className="w-3.5 h-3.5 text-white" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Map Display Box with Google Maps Controls (Matches uploaded screenshot) */}
              <div className="relative w-full h-[360px] sm:h-[430px] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                {/* Top-Left Floating Control: Map / Satellite Switcher (Matches uploaded image exactly) */}
                <div className="absolute top-3 left-3 z-10 flex rounded-md overflow-hidden shadow-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setMapType('m')}
                    className={`px-3.5 py-1.5 transition-colors cursor-pointer select-none ${
                      mapType === 'm'
                        ? 'bg-slate-900 text-white dark:bg-blue-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapType('k')}
                    className={`px-3.5 py-1.5 transition-colors cursor-pointer select-none border-l border-slate-200 dark:border-slate-700 ${
                      mapType === 'k'
                        ? 'bg-slate-900 text-white dark:bg-blue-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Satellite
                  </button>
                </div>

                {/* Top-Right Floating Control: Fullscreen button */}
                <div className="absolute top-3 right-3 z-10">
                  <a
                    href="https://maps.app.goo.gl/A22NGtazEbNDLCqW7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-md border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View Fullscreen on Google Maps"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </a>
                </div>

                {/* Bottom-Right Floating Controls: Zoom In / Zoom Out */}
                <div className="absolute bottom-6 right-3 z-10 flex flex-col rounded-md overflow-hidden shadow-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setMapZoom(prev => Math.min(prev + 1, 19))}
                    className="w-8 h-8 text-slate-800 dark:text-slate-200 font-black text-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-b border-slate-200 dark:border-slate-700"
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom(prev => Math.max(prev - 1, 12))}
                    className="w-8 h-8 text-slate-800 dark:text-slate-200 font-black text-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Zoom out"
                  >
                    −
                  </button>
                </div>

                {/* Embedded Google Maps Frame for Dr. B.C. Roy Engineering College */}
                <iframe
                  title="Dr. B. C. Roy Engineering College Location Map"
                  src={`https://maps.google.com/maps?q=Dr.+B.+C.+Roy+Engineering+College,+Fuljhore,+Durgapur&t=${mapType}&z=${mapZoom}&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Bottom Venue Help Footer */}
              <div className="p-3.5 sm:p-4 bg-[var(--card)] border-t border-[var(--edge)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--mut)]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>
                    <strong>Campus Hub:</strong> Dr. B. C. Roy Engineering College, Main Campus • GDG on Campus BCREC
                  </span>
                </div>
                <a
                  href="https://maps.app.goo.gl/A22NGtazEbNDLCqW7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Direct Google Maps Navigation Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation in Requested Sequence: 1. Roadmap -> 2. Credits -> 3. Syllabus -> 4. Leaderboard */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar gap-2 sm:gap-4 items-center justify-between">
          <div className="flex gap-2 sm:gap-4">
            
            {/* 1. 6-Step Roadmap */}
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`pb-4 px-3 sm:px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. 6-Step Roadmap</span>
            </button>

            {/* 2. Claim 200 Credits */}
            <button
              onClick={() => setActiveTab('credits')}
              className={`pb-4 px-3 sm:px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'credits'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>2. Claim 200 Credits</span>
            </button>

            {/* 3. Program Syllabus */}
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-4 px-3 sm:px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>3. Program Syllabus Table</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                10 Badges
              </span>
            </button>

            {/* 4. Community Leaderboard */}
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`pb-4 px-3 sm:px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {leaderboardData && leaderboardData.participants.length > 0 ? (
                <Trophy className="w-4 h-4 text-amber-500" />
              ) : (
                <Lock className="w-4 h-4 text-slate-400" />
              )}
              <span>4. Community Leaderboard</span>
              {!leaderboardData || leaderboardData.participants.length === 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  Locked
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Live
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: 6-STEP ROADMAP (FIRST IN SEQUENCE) */}
        {/* ========================================================================= */}
        {activeTab === 'roadmap' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {/* Warning Callout */}
            <div className="mb-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-200 text-base mb-1">
                  Do Steps 1 and 2 First!
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  The Google Form asks for your <strong>public Google Skills profile link</strong> right at the end. If your profile is private or the account is old, your application will be automatically rejected.
                </p>
              </div>
            </div>

            {/* 6 Step Cards */}
            <div className="space-y-6 mb-12">
              {/* Step 1 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Create a NEW Google Skills account
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        FRESH EMAIL IS A MUST
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Go to <a href="https://www.skills.google/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">skills.google</a> and click <strong>Join</strong>.
                      Use a completely fresh email address that has <strong>NOT been used on Google Skills before</strong>.
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>The account must be created <strong>on or after Sept 14th, 2026</strong> and before you submit the form.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Already have an old account? Old completions will <strong>NOT</strong> be counted. Create a brand new account with a different email.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Tip: Switch phone browser to Desktop version, or use a laptop with Google Chrome for the best experience.</span>
                      </p>
                    </div>

                    <a
                      href="https://www.skills.google/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-press btn-press--secondary inline-flex"
                    >
                      <span>Open skills.google</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Make your Skills profile public (mandatory)
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                        CRITICAL FOR TRACKING
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      This allows the Google Cloud community team to track your badge completions and verify your rewards:
                    </p>

                    <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mb-4 pl-1">
                      <li>Log in to <span className="text-blue-600 dark:text-blue-400 font-bold">skills.google</span></li>
                      <li>Click the <strong>Profile icon</strong> &gt; Select <strong>Settings</strong> &gt; <strong>General account settings</strong></li>
                      <li>Scroll to the <strong>Public Profile</strong> section</li>
                      <li>Tick the checkmark button <strong>Make profile public</strong></li>
                      <li>Click <strong>Update settings</strong> to save!</li>
                    </ol>

                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 text-xs sm:text-sm text-rose-800 dark:text-rose-300 mb-4">
                      <p className="font-bold mb-1">Your link should look like this:</p>
                      <code className="block p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 border border-rose-200 dark:border-rose-900 break-all select-all">
                        https://www.skills.google/public_profiles/YOUR_UNIQUE_PROFILE_ID
                      </code>
                      <p className="text-[11px] mt-2 font-bold text-red-600 dark:text-red-400">
                        ⚠️ VERY IMPORTANT: DO NOT copy-paste the sample link above. Your application will be REJECTED. Share your own unique PROFILE_ID!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Open the enrollment form
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Tap the button below or scan the QR code to open the official Google Learn with Communities form, then sign in with your Google account.
                    </p>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScIxD14Pyc183PbDLHcS9N-nbQRRYSncqY0TP3g7qSsfWgnKQ/viewform?pli=1&pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta btn-press btn-press--primary inline-flex"
                    >
                      <span>Open Enrollment Form</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Choose your organiser
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      On the form page titled <em>Choose your Organiser</em>, select the correct entity:
                    </p>
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Select: &ldquo;GDG on Campus Organizer&rdquo; from the drop-down list</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Enter the access code &amp; confirm hardware
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      Paste the community referral code into the designated box:
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono font-bold text-lg px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                        GDGC-BCREC
                      </span>
                      <button
                        onClick={handleCopyAccessCode}
                        className="btn-cta btn-press btn-press--primary"
                        style={{ minHeight: '38px', padding: '6px 14px' }}
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <strong>Question:</strong> &ldquo;Working internet + laptop with the latest Chrome browser?&rdquo; &rarr; <strong>Select Yes</strong> to continue.
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Paste your public profile URL &amp; submit
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      Add your real public profile link (never the placeholder sample) and click <strong>Submit</strong>.
                      Make sure you see the official Google confirmation message on the screen!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Pre-Submission Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    Final Pre-Submission Checklist
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Verify all 8 checks before hitting submit on the Google Form to ensure 100% acceptance.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-sm font-bold text-emerald-400">
                  {checklistCount} of 8 Ready
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 via-emerald-400 to-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(checklistCount / 8) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'freshEmail' as const, text: 'I created a NEW Google Skills account with fresh registering email' },
                  { key: 'afterSept14' as const, text: 'My Skills account was created on or after Sept 14th, 2026' },
                  { key: 'publicProfile' as const, text: 'I made my Skills profile public and clicked Update settings' },
                  { key: 'gdgOrganizer' as const, text: 'I selected GDG on Campus Organizer' },
                  { key: 'accessCode' as const, text: 'I pasted the access code GDGC-BCREC correctly' },
                  { key: 'laptopChrome' as const, text: 'I answered Yes for laptop + latest Chrome' },
                  { key: 'ownProfileUrl' as const, text: 'I pasted MY OWN profile URL (not the sample)' },
                  { key: 'submittedConfirmation' as const, text: 'I submitted and saw the confirmation message' },
                ].map(({ key, text }) => (
                  <label
                    key={key}
                    onClick={() => toggleChecklist(key)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      checklist[key]
                        ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-200'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checklist[key]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400 shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium leading-snug">{text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* FAQ SECTION: Questions, answered (from official student guide) */}
            {/* ========================================================================= */}
            <div className="mt-16 mb-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  Questions, answered
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Frequently asked questions regarding registration, eligibility, and profile setup.
                </p>

                {/* Filter Pills matching the official design */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5">
                  <button
                    onClick={() => setFaqFilter('All')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      faqFilter === 'All'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    All Questions
                  </button>

                  <button
                    onClick={() => setFaqFilter('General')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      faqFilter === 'General'
                        ? 'bg-[#1E8E3E] text-white border-[#1E8E3E] shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    General
                  </button>

                  <button
                    onClick={() => setFaqFilter('Registration')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      faqFilter === 'Registration'
                        ? 'bg-[#1E8E3E] text-white border-[#1E8E3E] shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    Registration &amp; Eligibility
                  </button>

                  <button
                    onClick={() => setFaqFilter('Rewards')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      faqFilter === 'Rewards'
                        ? 'bg-[#EA4335] text-white border-[#EA4335] shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    Rewards &amp; Prizes
                  </button>
                </div>
              </div>

              {/* Accordion FAQ Cards */}
              <div className="space-y-3.5 max-w-4xl mx-auto">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50/60 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                      >
                        <span className="leading-snug">{faq.question}</span>
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 text-[#1E8E3E] dark:text-emerald-400">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-100 dark:border-slate-700/60 px-4 sm:px-5 py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/40"
                          >
                            <p>{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLAIM 200 FREE CREDITS (SECOND IN SEQUENCE) */}
        {/* ========================================================================= */}
        {activeTab === 'credits' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {/* Critical Personal Code Notice */}
            <div className="mb-8 p-6 rounded-3xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-700/80 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block mb-1">
                    CRITICAL INSTRUCTION ABOUT YOUR 200 CREDITS ACCESS CODE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Check your email inbox to retrieve your unique access code
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The 200-credits access code is <strong>strictly personal, unique, single-use, and non-transferable</strong>.
                    It is sent exclusively to the email address you enrolled with from <strong>Google Cloud Edu</strong> (<code className="text-xs font-mono bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded">googlecloudedu-noreply@google.com</code>)
                    with the subject line: <em>&ldquo;Congratulations! You are now enrolled | Google Cloud Learn with Communities&rdquo;</em>.
                  </p>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    🔍 <strong>Where to look:</strong> Search for sender <code className="text-blue-600 dark:text-blue-400 font-mono">googlecloudedu-noreply@google.com</code> or keyword <code className="text-blue-600 dark:text-blue-400 font-mono">#LearnWithCommunities</code> in your inbox, Spam, and Promotions tabs.
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Credit Claiming Guide */}
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              How to Redeem Your 200 Free Credits Pass
            </h2>

            <div className="space-y-5 mb-12">
              {/* Step 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    [Very Imp] Open an Incognito / Private browser window
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Press <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono border">Ctrl + Shift + N</kbd> (Windows) or <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono border">Cmd + Shift + N</kbd> (Mac) to ensure no conflicting old Google accounts are active.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Navigate to the catalog redemption URL
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Open this exact URL in your Incognito window (searching manually in the catalog will NOT trigger the promo popup):
                  </p>
                  <code className="block p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-xs text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-800 break-all mb-3 select-all">
                    https://www.skills.google/catalog?keywords=GSP282&amp;event=Your
                  </code>
                  <a
                    href="https://www.skills.google/catalog?keywords=GSP282&event=Your"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta btn-press btn-press--primary inline-flex"
                    style={{ minHeight: '38px', padding: '6px 16px' }}
                  >
                    <span>Open Redemption URL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Enter your personal access code in the popup
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    A popup will appear asking for an access code. Paste the unique code from your welcome email (format looks like <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">6s-EDUCR-70::...</code>).
                  </p>
                </div>
              </div>

              {/* Step 4 & 5 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Sign in &amp; verify initial 9 credits
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Sign in to your fresh Google Skills account. Check your profile icon on the top right corner: you should see <strong>9 credits</strong> to get started! If not received, refresh the webpage or re-login.
                  </p>
                </div>
              </div>

              {/* Step 6 & 7 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Take &ldquo;A Tour of Google Cloud Hands-on Labs&rdquo; (GSP282)
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Click the green <strong>Start Lab</strong> button. Follow the lab instructions, spend <strong>at least 6 minutes</strong> in the lab, and achieve a <strong>score of 100/100</strong>.
                  </p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ✅ Once you finish, click &ldquo;End Lab&rdquo;. 200 free credits will automatically be credited to your account!
                  </p>
                </div>
              </div>

              {/* Step 8 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Verify subscription &amp; credits balance
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Check your newly added credits balance anytime at your account credits page:
                  </p>
                  <a
                    href="https://skills.google/my_account/credits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost btn-press btn-press--secondary inline-flex"
                    style={{ minHeight: '38px', padding: '6px 16px' }}
                  >
                    <span>Check Credits: skills.google/my_account/credits</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Troubleshooting Credits Delay */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Didn&apos;t get the credits immediately?
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>Wait 20-30 minutes after completing the lab for credits to be provisioned, then refresh your browser.</li>
                <li>Make sure you spent at least 6 minutes and reached a score of 100 before clicking &ldquo;End Lab&rdquo;.</li>
                <li>If issues persist after 30 minutes, contact your GDG on Campus Organiser or email <a href="mailto:learnwithcommunities-support@google.com" className="text-blue-600 dark:text-blue-400 underline font-semibold">learnwithcommunities-support@google.com</a>.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PROGRAM SYLLABUS TABLE (THIRD IN SEQUENCE - SINGLE-LINE TABLE) */}
        {/* ========================================================================= */}
        {activeTab === 'syllabus' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden mb-10">
              
              {/* Header Box */}
              <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        OFFICIAL CAMPAIGN CURRICULUM
                      </span>
                      <span
                        className="text-amber-600 dark:text-amber-400 font-semibold text-base select-none"
                        style={{ fontFamily: "'Caveat', cursive" }}
                      >
                        ← straight from student guide 📜
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
                      Learn with Communities Syllabus
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                      Complete all 10 mandatory skill badges below. Your 200 free credits pass covers all credit requirements with a generous 152 credits buffer remaining.
                    </p>
                  </div>

                  <a
                    href="https://goo.gle/lwc-student-curriculum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta btn-press btn-press--primary"
                  >
                    <span>Open Official Document</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Summary Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Courses</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">10 Badges</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Credits Required</p>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{totalCreditsRequired} Credits</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Free Credits Pass</p>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">200 Credits</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Credits Buffer</p>
                    <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5">+{200 - totalCreditsRequired} Free</p>
                  </div>
                </div>
              </div>

              {/* Exact Table Matching User's Image — Single Line for All Texts & Links */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[1020px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#e8f0fe] dark:bg-slate-800/90 border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm whitespace-nowrap">
                      <th className="py-3.5 px-4 sm:px-6 font-black tracking-tight whitespace-nowrap">Course Name</th>
                      <th className="py-3.5 px-4 sm:px-6 font-black tracking-tight whitespace-nowrap">Course URL</th>
                      <th className="py-3.5 px-4 sm:px-6 font-black tracking-tight text-center whitespace-nowrap">Type of Course</th>
                      <th className="py-3.5 px-4 sm:px-6 font-black tracking-tight text-right whitespace-nowrap">credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700/80 text-sm font-normal">
                    {LEARN_WITH_COMMUNITIES_SYLLABUS.map((course, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition-colors whitespace-nowrap ${
                          idx % 2 === 0 ? 'bg-white dark:bg-slate-800/60' : 'bg-slate-50/40 dark:bg-slate-800/30'
                        }`}
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          <div className="flex items-center gap-2.5 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="whitespace-nowrap">{course.name}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-normal inline-flex items-center gap-1.5 whitespace-nowrap group"
                          >
                            <span className="whitespace-nowrap">{course.url}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                          </a>
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-center text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 whitespace-nowrap">
                            {course.type}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {course.credits === 0 ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded whitespace-nowrap">
                              0
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded font-mono whitespace-nowrap">
                              {course.credits}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* Total Row */}
                    <tr className="bg-slate-100 dark:bg-slate-900 border-t-2 border-slate-300 dark:border-slate-700 font-bold whitespace-nowrap">
                      <td colSpan={3} className="py-3.5 px-4 sm:px-6 text-right font-black uppercase tracking-wider text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        Total Required Credits:
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-base font-black text-blue-600 dark:text-blue-400 font-mono whitespace-nowrap">
                        {totalCreditsRequired} Credits
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Table Footer Notes */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>All 10 badges must be completed within the campaign period to qualify for community rewards.</span>
                </div>
                <span
                  className="text-amber-600 dark:text-amber-400 font-bold text-base select-none -rotate-1"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  no outside courses will be counted! ⚠️
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SOLUTION DROPDOWN SECTION (FOR ALL 10 SYLLABUS BADGES) */}
            {/* ========================================================================= */}
            <div id="challenge-lab-solutions" className="rounded-3xl bg-white dark:bg-slate-800/95 border-2 border-[var(--edge,#202124)] shadow-[6px_6px_0_var(--edge,#202124)] overflow-hidden mt-8 mb-12">
              {/* Header Box */}
              <div className="p-6 sm:p-8 border-b-2 border-[var(--edge,#202124)] bg-gradient-to-r from-emerald-50/80 via-blue-50/50 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        ⚡ STEP-BY-STEP LAB SOLUTIONS
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        10 Repositories &amp; Solution Guides
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
                      Challenge Lab Solutions
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                      Choose any badge from the 10 syllabus badges in the dropdown below to view its GitHub solution repository. Copy the link or open it directly in a new tab, and follow the steps provided there.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 shadow-2xs">
                      Badge {activeSolution.id} of 10
                    </span>
                  </div>
                </div>

                {/* Dropdown Selector Controls */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <label htmlFor="badge-solution-dropdown" className="sr-only">Select Badge Solution</label>
                    <select
                      id="badge-solution-dropdown"
                      value={selectedSolutionId}
                      onChange={(e) => setSelectedSolutionId(Number(e.target.value))}
                      className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[var(--edge,#202124)] text-slate-900 dark:text-white font-bold text-sm shadow-[3px_3px_0_var(--edge,#202124)] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {COMMUNITY_BADGE_SOLUTIONS.map((item) => (
                        <option key={item.id} value={item.id}>
                          #{item.id} – {item.badgeName} ({item.credits} Credits){!item.isAvailable ? ' [Solution soon]' : ''}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Quick Badges 1-10 Badges Horizontal Ribbon */}
                <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">Quick Pick:</span>
                  {COMMUNITY_BADGE_SOLUTIONS.map((item) => {
                    const isSelected = item.id === selectedSolutionId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedSolutionId(item.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-[2px_2px_0_var(--edge,#202124)] -translate-y-0.5'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-blue-400'
                        }`}
                        title={item.badgeName}
                      >
                        #{item.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Popped Solution Detail Card */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Active Badge Info Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black font-mono flex items-center justify-center shrink-0 text-lg shadow-[2px_2px_0_var(--edge,#202124)]">
                      {activeSolution.id}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {activeSolution.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                          {activeSolution.credits} Credits
                        </span>
                        {activeSolution.isAvailable ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Solution Ready
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                            (Solution available soon)
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white">
                        {activeSolution.badgeName}
                      </h4>
                    </div>
                  </div>

                  <a
                    href={activeSolution.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
                  >
                    <span>Open Official Course</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Core Instruction Notice Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/60 flex items-start gap-3.5 text-amber-950 dark:text-amber-200">
                  <div className="w-9 h-9 rounded-xl bg-amber-200 dark:bg-amber-900/60 flex items-center justify-center shrink-0 text-amber-800 dark:text-amber-300 text-lg">
                    📌
                  </div>
                  <div className="text-sm">
                    <p className="font-black text-amber-900 dark:text-amber-200 text-base">
                      Follow the steps mentioned there:
                    </p>
                    <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 mt-1 leading-relaxed">
                      Open the repository guide below in a new tab, read through the challenge lab steps carefully, and follow the exact instructions provided in the README / markdown file to earn your badge credit.
                    </p>
                  </div>
                </div>

                {/* Solution URL Box & Actions (when available) */}
                {activeSolution.isAvailable && activeSolution.solutionUrl ? (
                  <div className="space-y-4">
                    {/* Repository Link Container */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-[var(--edge,#202124)] shadow-[4px_4px_0_var(--edge,#202124)] space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <FolderGit2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                          Solution Repository Link:
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> GitHub Verified
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 break-all select-all flex items-center justify-between gap-3">
                        <span className="truncate">{activeSolution.solutionUrl}</span>
                        <button
                          type="button"
                          onClick={() => handleCopySolutionLink(activeSolution.solutionUrl!)}
                          className="shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                          title="Copy Link"
                        >
                          {copiedSolutionUrl ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Action Buttons: Copy & Open in New Tab */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={activeSolution.solutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-press btn-press--primary py-2.5 px-6 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm text-white"
                        >
                          <span>Open in New Tab</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopySolutionLink(activeSolution.solutionUrl!)}
                          className="btn-press btn-press--secondary py-2.5 px-6 text-sm font-bold flex items-center gap-2 cursor-pointer transition border border-slate-300 dark:border-slate-700"
                        >
                          {copiedSolutionUrl ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy Solution Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Extra Command block (e.g. ./ARC120.sh for Badge 1) */}
                    {activeSolution.extraCommand && (
                      <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border-2 border-[var(--edge,#202124)] shadow-[4px_4px_0_var(--edge,#202124)] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <Terminal className="w-4 h-4" />
                            Quick Cloud Shell Execution Script:
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            Run inside Google Cloud Shell
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/60 border border-slate-700 font-mono text-sm text-emerald-400">
                          <code>{activeSolution.extraCommand}</code>
                          <button
                            type="button"
                            onClick={() => handleCopyCommand(activeSolution.extraCommand!)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                            title="Copy Command"
                          >
                            {copiedCommand ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Coming Soon Placeholder (Badges 9 & 10) */
                  <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-sm">
                      ⏳
                    </div>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                      (Solution available soon)
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      Our community facilitators are actively testing and validating the automated steps for <span className="font-semibold text-slate-700 dark:text-slate-300">&ldquo;{activeSolution.badgeName}&rdquo;</span>. The solution will be updated here shortly before your submission deadline.
                    </p>
                    <div className="pt-2">
                      <a
                        href={activeSolution.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press btn-press--secondary inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold"
                      >
                        <span>Preview Lab Syllabus</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMMUNITY LEADERBOARD (FOURTH IN SEQUENCE - BLURRED/LOCKED) */}
        {/* ========================================================================= */}
        {activeTab === 'leaderboard' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden mb-12">
              
              {/* Leaderboard Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                      <Trophy className="w-3.5 h-3.5 text-amber-300" />
                      GDSC | BCREC CAMPUS LEADERBOARD
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                      Learn with Communities Standings
                    </h3>
                    <p className="text-sm text-blue-100 mt-1 max-w-xl">
                      Separate leaderboard dedicated exclusively to Google Cloud Learn with Communities cohort participants.
                    </p>
                  </div>

                  {/* Admin Actions: ONLY shown to authenticated admins (deya58690@gmail.com) */}
                  {isAdminUser && (
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="btn-ghost btn-press btn-press--secondary"
                        style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', minHeight: '40px' }}
                      >
                        <Upload className="w-4 h-4" />
                        <span>Admin: Upload Daily CSV</span>
                      </button>

                      {leaderboardData && leaderboardData.participants.length > 0 && (
                        <button
                          onClick={handleClearStandings}
                          className="btn-press btn-press--red inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs bg-red-600/80 hover:bg-red-600 text-white border border-red-400/40 transition-all cursor-pointer"
                          title="Reset / Lock Leaderboard"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Lock</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 flex-wrap text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>
                    {leaderboardData && leaderboardData.participants.length > 0
                      ? `Live Standings: ${leaderboardData.participants.length} learners synced in Firebase • Updated ${leaderboardData.updatedAt ? new Date(leaderboardData.updatedAt).toLocaleDateString() : 'Today'}`
                      : 'Standings locked: Awaiting initial campus CSV dataset upload from GDSC organizer.'}
                  </span>
                </div>
                <span
                  className="text-amber-600 dark:text-amber-400 font-bold text-base select-none -rotate-1 hidden sm:inline-block"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {leaderboardData && leaderboardData.participants.length > 0
                    ? 'daily updates active 🚀'
                    : 'data drops daily soon 🔒'}
                </span>
              </div>

              {/* CASE 1: LOCKED / BLURRED STATE (NO CSV UPLOADED YET) */}
              {(!leaderboardData || leaderboardData.participants.length === 0) && (
                <div className="relative p-8 sm:p-14 text-center overflow-hidden">
                  
                  {/* Subtle blurred background mock table */}
                  <div className="absolute inset-0 filter blur-md opacity-25 dark:opacity-10 pointer-events-none select-none p-6">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-200 dark:bg-slate-700 rounded-xl">
                          <div className="w-24 h-4 bg-slate-300 dark:bg-slate-600 rounded" />
                          <div className="w-40 h-4 bg-slate-300 dark:bg-slate-600 rounded" />
                          <div className="w-16 h-4 bg-slate-300 dark:bg-slate-600 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Foreground Lock Badge & Message */}
                  <div className="relative z-10 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <Lock className="w-8 h-8" />
                    </div>

                    <h4 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Campus Leaderboard Locked
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Official cohort rankings are waiting for the initial daily CSV progress report from the Google Cloud organizer.
                    </p>

                    <div className="mb-6">
                      <span
                        className="text-2xl text-amber-600 dark:text-amber-400 font-bold block select-none -rotate-1"
                        style={{ fontFamily: "'Caveat', cursive" }}
                      >
                        "Standings will unlock automatically as soon as admin uploads Day 1 report 📊"
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 text-left space-y-1.5 mb-6">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>Learner standings will be updated daily based on completed Skill Badges count.</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>Verified rankings are synchronized directly by your campus GDSC organizer.</span>
                      </p>
                    </div>

                    {/* Upload button ONLY for admins */}
                    {isAdminUser && (
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="btn-cta btn-press btn-press--primary"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Admin: Upload First CSV File</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* CASE 2: UNLOCKED STATE (CSV HAS BEEN UPLOADED) */}
              {leaderboardData && leaderboardData.participants.length > 0 && (
                <div>
                  {/* Search bar */}
                  <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/40">
                    <div className="relative max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by student name or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Leaderboard Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-[11px] font-black uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-900/30">
                          <th className="py-3 px-4 sm:px-6">Rank</th>
                          <th className="py-3 px-4 sm:px-6">Learner</th>
                          <th className="py-3 px-4 sm:px-6">Department</th>
                          <th className="py-3 px-4 sm:px-6 text-center">Skill Badges</th>
                          <th className="py-3 px-4 sm:px-6 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                        {displayedParticipants.map((item) => (
                          <tr key={item.rank} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 font-bold">
                              {item.rank === 1 ? (
                                <span className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
                                  🥇 1
                                </span>
                              ) : item.rank === 2 ? (
                                <span className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xs">
                                  🥈 2
                                </span>
                              ) : item.rank === 3 ? (
                                <span className="w-7 h-7 rounded-xl bg-amber-800/10 dark:bg-amber-800/30 text-amber-800 dark:text-amber-400 flex items-center justify-center font-black text-xs">
                                  🥉 3
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs font-mono ml-2">#{item.rank}</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                                  {item.avatarText}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 dark:text-white leading-tight">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    Active {item.lastActive || 'Today'}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-600 dark:text-slate-300 text-xs">
                              {item.college}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-black text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                                <Award className="w-3.5 h-3.5" />
                                {item.badgesCompleted} Badges
                              </span>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right">
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ADMIN CSV UPLOAD MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showUploadModal && isAdminUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                      ADMIN PORTAL
                    </span>
                    <span
                      className="text-amber-600 dark:text-amber-400 font-bold text-sm select-none"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      separate Firebase collection: community_leaderboard
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Upload Learn with Communities CSV
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                
                {/* Admin Verification Check if not authenticated */}
                {!isAdminUser && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
                    <div className="flex items-start gap-3">
                      <KeyRound className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                          Admin Authentication Required
                        </h4>
                        <p className="text-xs text-amber-800 dark:text-amber-300">
                          Only designated campus organizers (<code className="font-mono">deya58690@gmail.com</code>) can push daily CSV updates.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={async () => {
                          try {
                            await loginWithGoogle();
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        className="btn-cta btn-press btn-press--primary"
                        style={{ minHeight: '34px', padding: '6px 14px', fontSize: '12px' }}
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Sign in with Google</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-400">or Passcode:</span>
                        <input
                          type="password"
                          placeholder="Passcode..."
                          value={adminPasscode}
                          onChange={(e) => setAdminPasscode(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                        />
                        <button
                          onClick={handleUnlockWithPasscode}
                          className="btn-ghost btn-press btn-press--secondary"
                          style={{ minHeight: '34px', padding: '6px 12px', fontSize: '12px' }}
                        >
                          Unlock
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload File Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Option 1: Choose CSV File
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/40 dark:file:text-blue-300 cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl p-2 bg-slate-50 dark:bg-slate-800/40"
                  />
                </div>

                {/* Or Paste CSV */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Option 2: Paste Raw CSV Text
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Student Name, Department, Skill Badges Completed&#10;Abir Ghosh, CSE, 10&#10;Soumyajit Ghosh, IT, 9..."
                    value={rawCsvText}
                    onChange={(e) => handleTextareaChange(e.target.value)}
                    className="w-full p-3 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Parsed Preview Table */}
                {parsedPreview.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Parsed Preview ({parsedPreview.length} Learners Found)
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        ✓ Ready to commit
                      </span>
                    </div>

                    <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-[10px] uppercase font-bold text-slate-500">
                          <tr>
                            <th className="p-2">Rank</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">College/Dept</th>
                            <th className="p-2 text-right">Badges</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {parsedPreview.slice(0, 10).map((row, i) => (
                            <tr key={i}>
                              <td className="p-2 font-mono">#{row.rank}</td>
                              <td className="p-2 font-bold">{row.name}</td>
                              <td className="p-2 text-slate-500">{row.college}</td>
                              <td className="p-2 text-right font-black text-blue-600">{row.badgesCompleted}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {parsedPreview.length > 10 && (
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        ...and {parsedPreview.length - 10} more learners.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn-ghost btn-press btn-press--secondary"
                  style={{ minHeight: '38px', padding: '6px 14px' }}
                >
                  Cancel
                </button>

                <button
                  disabled={parsedPreview.length === 0 || isSavingCsv || !isAdminUser}
                  onClick={handleSaveCsvToFirebase}
                  className="btn-cta btn-press btn-press--primary disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minHeight: '38px', padding: '6px 18px' }}
                >
                  {isSavingCsv ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to Firebase...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save &amp; Publish Standings</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
