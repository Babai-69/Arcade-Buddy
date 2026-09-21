import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Info, Star, Award, ChevronDown, ChevronUp, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProgramInformation() {
  // Both options default to open on initial visit; user choices persist across refreshes
  const [showChanges, setShowChanges] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('arcade_show_changes_2026');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return true; // Default: OPEN when user first opens the page
  });

  const [showPoints, setShowPoints] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('arcade_show_points_system');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return true; // Default: OPEN when user first opens the page
  });

  const toggleChanges = () => {
    setShowChanges((prev: boolean) => {
      const next = !prev;
      try {
        localStorage.setItem('arcade_show_changes_2026', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save changes toggle state:', err);
      }
      return next;
    });
  };

  const togglePoints = () => {
    setShowPoints((prev: boolean) => {
      const next = !prev;
      try {
        localStorage.setItem('arcade_show_points_system', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save points toggle state:', err);
      }
      return next;
    });
  };

  // Prize Counter opening date: January 7, 2027 at 05:30:00 (matching Prize Redemption Guide)
  const targetDate = new Date('2027-01-07T05:30:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  // Initialize countdown immediately with calculated values
  const [prizeCountdown, setPrizeCountdown] = useState(calculateTimeLeft);

  useEffect(() => {
    const updateCountdown = () => {
      setPrizeCountdown(calculateTimeLeft());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="program-information" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-2 sm:pb-4">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight mb-4">
          Google Cloud Arcade 2026 Program Information
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore official 2026 updates, campaign timelines, and live badge-to-point conversion guidelines.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          <button
            id="btn-whats-changing"
            onClick={toggleChanges}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
              showChanges
                ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-400/40'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{showChanges ? "Hide Arcade Changes" : "What's Changing in 2026?"}</span>
            {showChanges ? <ChevronUp className="w-4 h-4 ml-0.5" /> : <ChevronDown className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            id="btn-points-system"
            onClick={togglePoints}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
              showPoints
                ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>{showPoints ? "Hide Points System" : "View Arcade Points System"}</span>
            {showPoints ? <ChevronUp className="w-4 h-4 ml-0.5" /> : <ChevronDown className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* What's Changing Section */}
      {showChanges && (
        <div className="mb-12 sm:mb-14 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-200 dark:border-blue-900/40 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white">
                What's Changing in the Arcade
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              At Google Skills Arcade, the best learning happens when you have space to build, experiment, make mistakes, and truly understand how things work. The 2026 updates lean further into that hands-on philosophy so learners can focus on practical, career-ready skills at their own pace.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  title: 'Sunset of Sprints & Cert Zone',
                  desc: 'Google Skills Arcade Sprints and Certification Zone are being sunset so the focus stays on deeper hands-on learning.'
                },
                {
                  title: 'Optimized Labs per Game',
                  desc: 'The number of labs per game is being reduced to give learners more time to explore, experiment, and build confidence.'
                },
                {
                  title: 'Streamlined Point Weights',
                  desc: 'Every game will now be worth 1 Arcade point, creating a more balanced reward system across cloud, data, and AI journeys.'
                },
                {
                  title: 'Facilitators Support',
                  desc: 'Arcade Facilitators provide guidance, technical support, and practical direction whenever learners get stuck.'
                },
                {
                  title: 'Updated Prize Counter & Tiers',
                  desc: 'New Arcade tiers and an updated Prize Counter are arriving with a clear, achievable pathway to top tiers.'
                }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Points System & Schedule Ledger Section */}
      {showPoints && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Section Heading matching screenshot */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] font-black tracking-widest text-[#4285F4] dark:text-[#60A5FA] uppercase mb-1.5 block">
              SCHEDULE &amp; LEDGER
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white">
              Dates and points at a glance
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Card: Basecamp Schedule (faithful to user screenshot) */}
            <div className="rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-lg flex flex-col justify-start">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#4285F4]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">Basecamp Schedule</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Official campaign timelines</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Season 2026
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Arcade Program */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-3 h-3 rounded-full bg-[#34A853] mt-1.5 flex-shrink-0 shadow-sm shadow-[#34A853]/40 animate-pulse" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-slate-900 dark:text-white">Arcade Program</span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          Active
                        </span>
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                        January 1, 2026 – December 31, 2026
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Earn points from games &amp; skill badges
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                  {/* Facilitator Program */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-3 h-3 rounded-full bg-[#4285F4] mt-1.5 flex-shrink-0 shadow-sm shadow-[#4285F4]/40" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-slate-900 dark:text-white">Facilitator Program</span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                        July 13, 2026 – September 14, 2026
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Earn bonus points as a facilitator
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                  {/* Facilitator Program Ended Banner */}
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs md:text-sm font-semibold">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>Facilitator Program Ended</span>
                  </div>
                </div>
              </div>

              {/* Prize Counter Countdown Footer (Selected Element Focus) */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4285F4]" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Prize Counter Opens In</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    Live Countdown
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-2.5 sm:p-3 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black font-display text-[#4285F4] dark:text-[#60A5FA] tabular-nums">
                      {prizeCountdown.days}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      DAYS
                    </div>
                  </div>
                  <div className="bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-2.5 sm:p-3 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black font-display text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {String(prizeCountdown.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      HRS
                    </div>
                  </div>
                  <div className="bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-2.5 sm:p-3 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black font-display text-purple-600 dark:text-purple-400 tabular-nums">
                      {String(prizeCountdown.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      MIN
                    </div>
                  </div>
                  <div className="bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-2.5 sm:p-3 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {String(prizeCountdown.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      SEC
                    </div>
                  </div>
                </div>

                {/* Estimated opening date notice matching Prize Counter Guide */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong>Estimated Date:</strong> Approx. Jan 7, 2027 (±2-3 days)</span>
                  </div>
                  <Link
                    to="/resources/prize-counter-guide"
                    className="text-[#4285F4] dark:text-[#60A5FA] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Counter Guide</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Card: Badges to Points System */}
            <div className="rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">Arcade Points System</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Badges to points conversion</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1 rounded-full">
                    2026 Rules
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <PointRow icon="🚀" name="Arcade Adventure" points="1 pt each" color="bg-[#8b5cf6]" />
                  <PointRow icon="🚢" name="Arcade Voyage" points="1 pt each" color="bg-[#0ea5e9]" />
                  <PointRow icon="🧭" name="Arcade Trail" points="1 pt each" color="bg-[#8b5cf6]" />
                  <PointRow icon="⚡" name="Base Camp" points="1 pt each" color="bg-[#f97316]" />
                  <PointRow icon="🛠️" name="Skill Badge" points="0.5 pt each" color="bg-[#22c55e]" />
                  <PointRow icon="🏆" name="Facilitator Milestones" points="Bonus pts" color="bg-[#0ea5e9]" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>2 Skill Badges = 1 Arcade Point</span>
                </div>
                <Link
                  to="/resources/point-system"
                  className="font-bold text-[#4285F4] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Points Breakdown</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PointRow({
  icon,
  name,
  points,
  color
}: {
  icon: string;
  name: string;
  points: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-700/50 transition-all">
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <span className="font-semibold text-xs md:text-sm text-slate-800 dark:text-slate-200">{name}</span>
      </div>
      <div className={`${color} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm`}>
        {points}
      </div>
    </div>
  );
}
