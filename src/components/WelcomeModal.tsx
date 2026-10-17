import React, { useState } from 'react';
import {
  X,
  Users,
  Share2,
  Send,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Clock,
  Copy,
  Check,
  Linkedin,
  Twitter,
  ArrowRight,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: (markAsSeen?: boolean) => void;
  onStartTour?: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [activeTab, setActiveTab] = useState<'community' | 'share'>('community');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const communityTips = [
    {
      badge: 'OFFICIAL REGISTRATION',
      title: 'Fill the Official Arcade Subscription Form',
      desc: "Don't forget to submit the official Google Cloud Arcade 2026 subscription form so your account is officially enrolled and eligible for swags when the Prize Counter opens.",
      note: 'Make sure to use your registered Skills Boost email address.',
      buttonText: 'Open Subscription Form',
      buttonUrl: 'https://forms.gle/2h6xCvY3sW29pw4p7'
    },
    {
      badge: 'BADGE SYLLABUS',
      title: 'Explore Monthly Games & Skill Badges',
      desc: 'Complete challenge labs, active trivia games, and monthly skill tracks to accumulate points toward Trooper, Ranger, Champion, and Legend swag tiers.',
      note: 'Every 2 skill badges earn 1 full Arcade point.',
      buttonText: 'Explore Syllabus',
      buttonUrl: '/syllabus'
    },
    {
      badge: 'MILESTONE BONUS',
      title: 'Unlock Facilitator Cohort Bonus Points',
      desc: 'Enrolled participants can earn up to +25 bonus milestone points by balancing completed game badges and skill quests before cohort deadlines.',
      note: 'Sync your public Skills Boost profile on the Dashboard to see your live standing.',
      buttonText: 'Check Dashboard',
      buttonUrl: '/dashboard'
    }
  ];

  const currentTip = communityTips[currentTipIndex];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % communityTips.length);
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app';
  };

  const shareUrl = getShareUrl();
  const shareText = 'Calculate your Google Cloud Arcade points, track Facilitator milestone bonuses, and see swag prize tiers with Arcade Buddy!';

  const handleShare = (platform: 'linkedin' | 'whatsapp' | 'telegram' | 'twitter') => {
    let url = '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleGotIt = () => {
    onClose(true);
  };

  const handleRemindLater = () => {
    onClose(false);
  };

  return (
    <div
      className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={() => onClose(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-[#141A2E] rounded-3xl border-2 border-slate-900 dark:border-slate-700 shadow-[5px_5px_0_#1a73e8] sm:shadow-[8px_8px_0_#1a73e8] p-5 sm:p-7 text-left transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 4-Color Google Accent Stripe (Matches Home.tsx top-rgby-stripe) */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'linear-gradient(90deg, #1A73E8 0%, #34A853 33%, #FBBC04 66%, #EA4335 100%)'
          }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close Welcome Card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Subtitle */}
        <div className="pr-8 mb-4">
          <h2
            id="welcome-modal-title"
            className="text-2xl sm:text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight tracking-tight"
          >
            Join Our{' '}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
              Arcade Community
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-relaxed">
            Get instant lab help, track your points, and stay updated with the latest Google Cloud Arcade guides.
          </p>
        </div>

        {/* 2 Slide Tabs Segmented Control */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-900/90 rounded-2xl border-2 border-slate-200 dark:border-slate-800 gap-1.5 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`btn-press py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'community'
                ? '!bg-[#7c3aed] !text-white !border-slate-900 shadow-sm'
                : '!bg-transparent !border-transparent !shadow-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Community &amp; Guides</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('share')}
            className={`btn-press py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'share'
                ? '!bg-[#7c3aed] !text-white !border-slate-900 shadow-sm'
                : '!bg-transparent !border-transparent !shadow-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share ArcadeBuddy</span>
          </button>
        </div>

        {/* Slide 1: Community & Guides */}
        {activeTab === 'community' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Telegram & WhatsApp Big Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Telegram Card */}
              <a
                href="https://t.me/arcadebuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press p-3.5 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0088cc] text-white flex items-center justify-between gap-3 shadow-[3px_3px_0_var(--edge)] group no-underline"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-white -rotate-12 translate-x-0.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-sm text-white leading-tight">Telegram Group</div>
                    <div className="text-[11px] text-sky-100 font-medium truncate">Instant Lab Support</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press p-3.5 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white flex items-center justify-between gap-3 shadow-[3px_3px_0_var(--edge)] group no-underline"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-sm text-white leading-tight">WhatsApp Group</div>
                    <div className="text-[11px] text-emerald-100 font-medium truncate">Community Updates</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Official Registration Box with Next Tip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-slate-300 dark:border-slate-700 relative">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                  {currentTip.badge}
                </span>
                <button
                  type="button"
                  onClick={handleNextTip}
                  className="btn-press btn-press--sm px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300"
                  style={{ background: 'var(--card)' }}
                  title="Click to see next helpful tip"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Next Tip</span>
                </button>
              </div>

              <h3 className="font-black text-base text-slate-900 dark:text-white leading-snug mb-1.5">
                {currentTip.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-3">
                {currentTip.desc}
              </p>

              {/* Highlight Note */}
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-2.5 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200 font-bold mb-3.5">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{currentTip.note}</span>
              </div>

              {/* Action Link */}
              <div className="flex justify-end">
                <a
                  href={currentTip.buttonUrl}
                  target={currentTip.buttonUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="btn-press btn-press--primary py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 text-white shadow-[3px_3px_0_var(--edge)] no-underline"
                  style={{ background: '#7c3aed' }}
                >
                  <span>{currentTip.buttonText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Slide 2: Share ArcadeBuddy */}
        {activeTab === 'share' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top Share Callout */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white mb-1">
                <span className="text-rose-500">❤️</span>
                <span>Share ArcadeBuddy with Friends</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Help friends and classmates calculate their points and track incomplete Google Cloud Arcade badges.
              </p>
            </div>

            {/* 4 Social Share Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* LinkedIn */}
              <button
                type="button"
                onClick={() => handleShare('linkedin')}
                className="btn-press p-3 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group"
                style={{ boxShadow: '3px 3px 0 var(--edge)' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0a66c2]/10 text-[#0a66c2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="btn-press p-3 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group"
                style={{ boxShadow: '3px 3px 0 var(--edge)' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#25d366]/15 text-[#25d366] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">WhatsApp</span>
              </button>

              {/* Telegram */}
              <button
                type="button"
                onClick={() => handleShare('telegram')}
                className="btn-press p-3 rounded-2xl border-2 border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group"
                style={{ boxShadow: '3px 3px 0 var(--edge)' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0088cc]/15 text-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-4 h-4 -rotate-12 translate-x-0.5" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Telegram</span>
              </button>

              {/* X / Twitter */}
              <button
                type="button"
                onClick={() => handleShare('twitter')}
                className="btn-press p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center group"
                style={{ boxShadow: '3px 3px 0 var(--edge)' }}
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Twitter className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">X / Twitter</span>
              </button>
            </div>

            {/* Copy Link Full-Width Bar */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`btn-press w-full py-3.5 px-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                copied
                  ? '!bg-emerald-500 !text-white !border-emerald-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy ArcadeBuddy Link</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Modal Bottom Footer (Both Slides) */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleRemindLater}
            className="btn-press btn-press--secondary py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300"
          >
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Remind Me Later</span>
          </button>

          <button
            type="button"
            onClick={handleGotIt}
            className="btn-press py-2.5 px-6 rounded-xl text-xs sm:text-sm font-black text-white cursor-pointer shadow-[3px_3px_0_var(--edge)]"
            style={{ background: '#7c3aed' }}
          >
            <span>Got It</span>
          </button>
        </div>
      </div>
    </div>
  );
}
