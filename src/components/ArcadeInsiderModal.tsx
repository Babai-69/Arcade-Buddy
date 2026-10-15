import React, { useState, useEffect } from 'react';
import { Mail, X, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isInsiderAnnouncementActive } from '../utils/announcementUtils';

interface ArcadeInsiderModalProps {
  onDismiss?: () => void;
}

export function ArcadeInsiderModal({ onDismiss }: ArcadeInsiderModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // If the 7-day announcement period has expired, it automatically vanishes
    if (!isInsiderAnnouncementActive()) {
      setIsOpen(false);
      if (onDismiss) onDismiss();
      return;
    }
  }, [onDismiss]);

  const handleClose = () => {
    try {
      localStorage.setItem('arcade_insider_october_email_seen', 'true');
    } catch (e) {
      console.warn('Could not set localStorage', e);
    }
    setIsOpen(false);
    if (onDismiss) onDismiss();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="insider-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_#1a73e8] overflow-hidden p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top colored accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'linear-gradient(90deg, #1a73e8 0%, #34a853 33%, #fbbc04 66%, #ea4335 100%)'
          }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3 mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            Official Program Notice
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            October 2026
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 text-2xl shadow-sm">
            📬
          </div>
          <div>
            <h3
              id="insider-modal-title"
              className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white leading-tight"
            >
              Arcade Insider Emails Have Rolled Out!
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Monthly points report &amp; milestone qualification statement
            </p>
          </div>
        </div>

        {/* Announcement Description */}
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          <p>
            The official Google Cloud <strong>Arcade Insider emails for October</strong> have been dispatched to all registered participants!
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Important:</strong> Please check your{' '}
              <span className="font-black underline decoration-amber-500">Inbox</span>,{' '}
              <span className="font-black underline decoration-amber-500">Spam</span>, and{' '}
              <span className="font-black underline decoration-amber-500">Promotions</span> folders! Automated program communications frequently get filtered into promotions or spam tabs.
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review your email to confirm your verified badge count, Arcade points balance, and Swag Tier eligibility.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/dashboard"
            onClick={handleClose}
            className="w-full sm:flex-1 btn-press btn-press--primary py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <span>Open Dashboard &amp; Check Tiers</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-center"
          >
            Got it, I&apos;ll Check
          </button>
        </div>
      </div>
    </div>
  );
}
