import React from 'react';
import { X, ArrowRight, Compass, Gamepad2, Award, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: () => void;
}

export function WelcomeModal({ isOpen, onClose, onStartTour }: WelcomeModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleStartTour = () => {
    onClose();
    if (onStartTour) {
      onStartTour();
    } else {
      window.dispatchEvent(new CustomEvent('start-welcome-tour'));
    }
  };

  const handleExplore = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_#1a73e8] overflow-hidden p-6 sm:p-8 text-left transition-all animate-in fade-in zoom-in-95 duration-200"
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
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close Welcome Card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Home Page Style Live Pill Badge */}
        <div className="flex items-center gap-2 mb-3 mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
            Arcade Season 2026
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            Community Companion
          </span>
        </div>

        {/* Header & Clean Subheading from Home Page Aesthetic */}
        <div className="mb-4">
          <h3
            id="welcome-modal-title"
            className="text-2xl sm:text-[26px] font-black font-display text-slate-900 dark:text-white leading-tight tracking-tight"
          >
            Welcome to Arcade Buddy
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1.5 leading-relaxed">
            Your community hub for tracking Google Cloud Skills Arcade points, monitoring Facilitator milestones, and calculating your swag prizes.
          </p>
        </div>

        {/* 4 Feature Highlights Grid (Inspired by Home.tsx cards, no AI cliches, no 10 lab solution word) */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 shadow-[2px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="p-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Gamepad2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white">Arcade Games</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              1.0 point per game badge throughout 2026
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 shadow-[2px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                <Award className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white">Skill Badges</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              0.5 points each — every 2 badges add 1 pt
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 shadow-[2px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="p-1 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white">Swag Tiers</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Trooper, Ranger, Champion &amp; Legend
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 shadow-[2px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="p-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white">Leaderboard</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Live standings across active learners
            </p>
          </div>
        </div>

        {/* Action Buttons Styled Directly with Home Page Pressing Design */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleExplore}
            className="w-full sm:flex-1 btn-press btn-press--primary py-3.5 px-5 text-sm font-black flex items-center justify-center gap-2 cursor-pointer text-white"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleStartTour}
            className="w-full sm:w-auto btn-press btn-press--secondary py-3.5 px-5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200"
          >
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Quick Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
}
