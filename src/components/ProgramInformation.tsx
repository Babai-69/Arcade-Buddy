import React, { useState, useEffect } from 'react';
import { Calendar, Clock, PlayCircle, Info, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function ProgramInformation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerState, setTimerState] = useState<'upcoming' | 'registration' | 'live' | 'ended'>('upcoming');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    const startDate = new Date('2026-07-13T11:30:00Z').getTime();
    const registrationEndDate = new Date('2026-07-20T18:29:00Z').getTime();
    const endDate = new Date('2026-09-14T18:29:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      
      let distance = 0;
      if (now < startDate) {
        setTimerState('upcoming');
        distance = startDate - now;
      } else if (now >= startDate && now < registrationEndDate) {
        setTimerState('registration');
        distance = registrationEndDate - now;
      } else if (now >= registrationEndDate && now <= endDate) {
        setTimerState('live');
        distance = endDate - now;
      } else {
        setTimerState('ended');
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Google Cloud Arcade 2026 Program Information</h2>
        <p className="text-sm text-slate-500">Our arcade points calculator is specifically designed for the 2026 Google Cloud Arcade program.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button 
            onClick={() => setShowChanges(!showChanges)}
            className="px-6 py-2.5 rounded-full font-bold text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Info className="w-4 h-4" /> 
            {showChanges ? "Hide Arcade Changes" : "What's Changing in 2026?"}
          </button>
          
          <button 
            onClick={() => setShowPoints(!showPoints)}
            className="px-6 py-2.5 rounded-full font-bold text-sm bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Star className="w-4 h-4" /> 
            {showPoints ? "Hide Points System" : "View Arcade Points System"}
          </button>
        </div>
      </div>

      {showChanges && (
      <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* What's Changing Section */}
      <div className="glass-panel rounded-[2rem] p-6 md:p-10 shadow-xl border border-blue-100 dark:border-blue-900/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors duration-500" />
         <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400"><Info className="w-4 h-4" /></div> What's Changing in the Arcade</h3>
         <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
           At Google Skills Arcade, the best learning happens when you have space to build, experiment, make mistakes, and truly understand how things work. The 2026 updates lean further into that hands-on philosophy so learners can focus on practical, career-ready skills at their own pace.
         </p>
         <ul className="space-y-3">
           <li className="flex items-start gap-3">
             <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400">Google Skills Arcade Sprints and Certification Zone are being sunset so the focus stays on deeper hands-on learning.</p>
           </li>
           <li className="flex items-start gap-3">
             <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400">The number of labs per game is being reduced to give learners more time to explore, experiment, and build confidence.</p>
           </li>
           <li className="flex items-start gap-3">
             <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400">Every game will now be worth 1 Arcade point, creating a more balanced reward system across cloud, data, and AI journeys.</p>
           </li>
           <li className="flex items-start gap-3">
             <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400">Arcade Facilitators are coming soon to help with guidance, support, and practical direction whenever learners get stuck.</p>
           </li>
           <li className="flex items-start gap-3">
             <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4285F4] flex-shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400">New Arcade tiers and an updated Prize Counter are on the way, with the path to top tiers still designed to stay clear and achievable.</p>
           </li>
         </ul>
      </div>
      </div>
      )}

              {showPoints && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 group-hover:bg-green-500/10 transition-colors duration-500" />
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white text-center mb-6">Arcade Points System</h3>
            <div className="space-y-3">
              <PointRow icon="🚀" name="Arcade Adventure" points="1 pt each" color="bg-[#8b5cf6]" />
              <PointRow icon="🚢" name="Arcade Voyage" points="1 pt each" color="bg-[#0ea5e9]" />
              <PointRow icon="🧭" name="Arcade Trail" points="1 pt each" color="bg-[#8b5cf6]" />
              <PointRow icon="👑" name="Arcade Special" points="X pt each" color="bg-[#f43f5e]" />
              <PointRow icon="⚡" name="Base Camp" points="1 pt each" color="bg-[#f97316]" />
              <PointRow icon="🛠️" name="Skill Badge" points="0.5 pt each" color="bg-[#22c55e]" />
              <PointRow icon="🏆" name="Facilitator Milestones" points="Bonus pts" color="bg-[#0ea5e9]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PointRow({ icon, name, points, color }: { icon: string, name: string, points: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all shadow-sm hover:shadow-md hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{name}</span>
      </div>
      <div className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
        {points}
      </div>
    </div>
  );
}
