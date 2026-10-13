import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Send,
  Star,
  HelpCircle,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  Users,
  Youtube,
  ExternalLink,
  Mail,
  BookOpen,
  Trophy,
  Gamepad2,
  Award,
  Gift,
  Lightbulb,
  Cloud,
} from 'lucide-react';
import footerLogo from '../../assets/images/logo.png';

export function Footer() {
  const buildDate = new Date(typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : Date.now());
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(buildDate);
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata',
  }).format(buildDate);

  return (
    <footer className="glass-card mt-24 border-t dark:border-slate-800 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support & Feedback Action Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10 mb-10 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link
            to="/support"
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-slate-800/60 dark:to-indigo-950/20 border border-blue-100 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Need help or assistance?</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Raise a query regarding points, badges, or syllabus</p>
              </div>
            </div>
            <span className="btn-press btn-press--sm text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ background: 'var(--card)', color: 'var(--ink)' }}>
              Raise a query →
            </span>
          </Link>

          <Link
            to="/feedback"
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-pink-50/60 dark:from-slate-800/60 dark:to-purple-950/20 border border-purple-100 dark:border-slate-700/60 hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Have feedback or suggestions?</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Share your thoughts to help us improve the platform</p>
              </div>
            </div>
            <span className="btn-press btn-press--sm text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ background: 'var(--card)', color: 'var(--ink)' }}>
              Share feedback →
            </span>
          </Link>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Info & Community Stats (Cols 1-4) */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={footerLogo}
                alt="Google Cloud Arcade Buddy"
                className="w-[32px] h-[32px] object-contain flex-shrink-0 drop-shadow-[0_2px_6px_rgba(66,133,244,0.35)] dark:drop-shadow-[0_0_12px_rgba(91,141,239,0.7)]"
              />
              <span
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                className="text-2xl sm:text-[26px] font-bold text-slate-900 dark:text-white tracking-tight leading-none"
              >
                Google Cloud <span className="bg-gradient-to-r from-[#4285F4] via-[#6366f1] to-[#34A853] dark:from-[#5B8DEF] dark:via-[#818cf8] dark:to-[#4ADE80] bg-clip-text text-transparent">Arcade Buddy</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Master Cloud Skills, earn badges, track milestones, and unlock official Google Cloud rewards through the Facilitator Program 2026.
            </p>

            {/* Compact Community Stats Pill */}
            <div className="inline-flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <Users className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span><strong className="font-semibold text-slate-900 dark:text-white">1,290+</strong> Visits</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span><strong className="font-semibold text-slate-900 dark:text-white">4.7</strong>/5 Rating</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://github.com/Arcade-With-Us/"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abir-dey-a34914254/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/arcadebuddy"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/abir_dey18"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/dey_babai001/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-pink-600 bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/facilitator" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <BookOpen className="w-4 h-4 text-[#4285F4] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>About Program</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <Trophy className="w-4 h-4 text-[#FBBC04] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Live Leaderboard</span>
                </Link>
              </li>
              <li>
                <Link to="/syllabus" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <Gamepad2 className="w-4 h-4 text-[#34A853] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Syllabus & Arcade Games</span>
                </Link>
              </li>
              <li>
                <a href="/resources/point-system" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <Award className="w-4 h-4 text-[#EA4335] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Points System & Bonus</span>
                </a>
              </li>
              <li>
                <a href="/swags" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <Gift className="w-4 h-4 text-[#34A853] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Swags & Milestones</span>
                </a>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <HelpCircle className="w-4 h-4 text-[#4285F4] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                  <Lightbulb className="w-4 h-4 text-[#FBBC04] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Resources & Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Channels (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500 group transition-colors">
                  <Send className="w-4 h-4 text-[#0088cc] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Telegram Group</span>
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-500 group transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Group</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ARCADEWITHUS_We" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 group transition-colors">
                  <Youtube className="w-4 h-4 text-[#FF0000] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>YouTube Channel</span>
                </a>
              </li>
              <li>
                <a href="https://discuss.google.dev/tag/learning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500 group transition-colors">
                  <Cloud className="w-4 h-4 text-[#4285F4] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>GDG Announcements</span>
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="flex items-center gap-2 hover:text-amber-500 group transition-colors">
                  <Mail className="w-4 h-4 text-[#FBBC04] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals & Official Support (Cols 10-12) */}
          <div className="md:col-span-2 lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display mb-3">
                Official Portals
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://go.cloudskillsboost.google/arcade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-[#4285F4] flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Google Cloud Arcade</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://rsvp.withgoogle.com/events/arcade-facilitator/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#34A853] flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Arcade Facilitator Program</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display mb-2.5">
                Official Support
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Facilitator Support:</span>
                  <a
                    href="mailto:arcade-facilitator@google.com"
                    className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span>arcade-facilitator@google.com</span>
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Skills Boost Support:</span>
                  <a
                    href="mailto:support-skills@google.com"
                    className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span>support-skills@google.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Unified Subfooter */}
        <div className="border-t border-slate-200/80 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 Arcade Buddy. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span>Last updated: {formattedDate} at {formattedTime} IST</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 font-medium">
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms</Link>
            <Link to="/code-of-conduct" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Code of Conduct</Link>
            <Link to="/program-tncs" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Program TnCs</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span>
              Made with ❤️ by{' '}
              <a
                href="https://www.linkedin.com/in/abir-dey-a34914254/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 transition-colors font-semibold"
              >
                Abir Dey
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
