import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function ProgramDates() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Target date: July 13, 2026 17:00:00 GMT+0530 (IST) -> 11:30:00Z
    const targetDate = new Date('2026-07-13T11:30:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsLive(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative text-slate-800 dark:text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass-card rounded-[2rem] p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm bg-white/50 dark:bg-slate-800/50"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-[#4285F4]" />
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Important Program Dates</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">Arcade Program</h3>
              <p className="font-semibold text-slate-700 dark:text-slate-300">January 1, 2026 - December 31, 2026</p>
              <p className="text-slate-500 dark:text-slate-400">Earn points from games, trivia, skill badges & courses</p>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">Facilitator Program</h3>
              <p className="font-semibold text-slate-700 dark:text-slate-300">July 13, 2026 - September 14, 2026</p>
              <p className="text-slate-500 dark:text-slate-400">Earn bonus points as a facilitator</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mt-8">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <h4 className="font-bold font-display text-slate-800 dark:text-slate-200">
                  {isLive ? 'Facilitator Program Status:' : 'Facilitator Program Starts In:'}
                </h4>
              </div>

              {isLive ? (
                <div className="text-center py-4 bg-[#34A853]/10 border border-[#34A853]/20 rounded-xl">
                   <span className="text-2xl font-bold text-[#34A853] flex items-center justify-center gap-2">
                     <span className="w-3 h-3 rounded-full bg-[#34A853] animate-pulse"></span>
                     PROGRAM IS LIVE
                   </span>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-3xl lg:text-4xl font-bold font-display text-[#4285F4] mb-1">{timeLeft.days}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">DAYS</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-3xl lg:text-4xl font-bold font-display text-[#4285F4] mb-1">{timeLeft.hours}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">HOURS</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-3xl lg:text-4xl font-bold font-display text-[#4285F4] mb-1">{timeLeft.minutes}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">MINUTES</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-3xl lg:text-4xl font-bold font-display text-[#4285F4] mb-1">{timeLeft.seconds}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">SECONDS</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
