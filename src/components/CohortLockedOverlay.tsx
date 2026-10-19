import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ShieldAlert, Sparkles, KeyRound, ArrowRight, Eye, Check, X, LogIn, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const ADMIN_EMAILS = ['deya58690@gmail.com', 'tripti.arcade.25@gmail.com'];
const ADMIN_PASSCODE = 'arcade2026';

interface CohortLockedOverlayProps {
  title: string;
  subtitle: string;
  cohortTag?: string;
  children: React.ReactNode;
  onOpenValidator?: () => void;
  defaultLocked?: boolean;
}

export function CohortLockedOverlay({
  title,
  subtitle,
  cohortTag = 'Next Facilitator Cohort • Staging Locked',
  children,
  onOpenValidator,
  defaultLocked = true
}: CohortLockedOverlayProps) {
  const [user, setUser] = useState<User | null>(null);
  
  // Default to showing the locked preview so admins can immediately see and verify it
  const [isLocked, setIsLocked] = useState(() => {
    const saved = localStorage.getItem('arcade_cohort_preview_state');
    if (saved === 'unlocked') return false;
    return defaultLocked;
  });
  
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const isUserAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const handleToggleLock = () => {
    const nextState = !isLocked;
    setIsLocked(nextState);
    localStorage.setItem('arcade_cohort_preview_state', nextState ? 'locked' : 'unlocked');
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim().toLowerCase() === ADMIN_PASSCODE.toLowerCase()) {
      setIsLocked(false);
      localStorage.setItem('arcade_cohort_preview_state', 'unlocked');
      setShowPasscodeModal(false);
      setPasscodeError(false);
      setPasscodeInput('');
    } else {
      setPasscodeError(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Top Staging Control Bar - Allows toggling lock preview anytime */}
      <div className="sticky top-16 z-40 bg-slate-900/95 text-white px-4 py-2.5 backdrop-blur-md border-b border-slate-800 shadow-md flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-ping'}`} />
          <span className="font-semibold text-slate-200">
            {isLocked ? '🔒 Lock Preview Mode:' : '🔓 Admin Staging Mode:'}
          </span>
          <span className="text-slate-400 hidden sm:inline">
            {isLocked 
              ? 'Showing how the locked section looks to learners for the upcoming cohort' 
              : 'Viewing fully unlocked staging interface'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenValidator && (
            <button
              type="button"
              onClick={onOpenValidator}
              className="px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <span>Audit Badges</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleLock}
            className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              isLocked 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-sm'
                : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
            }`}
          >
            {isLocked ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>Switch to Unlocked Admin View</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Preview Locked State</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area - Blurred when locked */}
      <div 
        className={`transition-all duration-700 ease-out ${
          isLocked 
            ? 'filter blur-[12px] select-none pointer-events-none opacity-40 max-h-[120vh] overflow-hidden scale-[0.99]' 
            : 'filter-none opacity-100 scale-100'
        }`}
      >
        {children}
      </div>

      {/* Blurry Lock Overlay Floating Card */}
      {isLocked && (
        <div className="absolute inset-0 z-30 flex items-start justify-center pt-16 sm:pt-24 pb-32 px-4 sm:px-6 pointer-events-auto animate-fade-in">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-purple-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Frosted Glass Lock Card */}
          <div className="relative w-full max-w-xl mx-auto rounded-3xl p-8 sm:p-11 text-center bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]">
            
            {/* Glowing Lock Icon */}
            <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 blur-xl opacity-50 animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-xl border border-white/30">
                <Lock className="w-9 h-9" />
              </div>
            </div>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{cohortTag}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-md mx-auto">
              {subtitle}
            </p>

            {/* Public Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <Link
                to="/syllabus"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
              >
                <span>Live October Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/calculator"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <span>Public Calculator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Admin Bypass Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Admin access only during staging</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLocked(false)}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Admin View</span>
                </button>

                <span>&bull;</span>

                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(true)}
                  className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Passcode</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Admin Passcode Modal */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-sm">
                <KeyRound className="w-4 h-4 text-blue-500" />
                <span>Admin Passcode Unlock</span>
              </div>
              <button
                onClick={() => setShowPasscodeModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Enter the facilitator staging passcode (<code className="font-mono text-blue-500">arcade2026</code>) to unlock.
            </p>
            <form onSubmit={handlePasscodeSubmit} className="space-y-3">
              <input
                type="password"
                placeholder="Enter passcode..."
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                autoFocus
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                  passcodeError ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white`}
              />
              {passcodeError && (
                <p className="text-xs text-red-500">Incorrect passcode. Please try again.</p>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
