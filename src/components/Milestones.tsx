import React, { useState, useEffect } from 'react';
import { MILESTONES } from '../types';
import { motion } from 'motion/react';
import { Target, Shield, Trophy, Crown, RefreshCw } from 'lucide-react';

const icons = [Target, Shield, Trophy, Crown];

const fallbackData = {
  trooper:  { spotsLeft: 5227, total: 6000 },
  ranger:   { spotsLeft: 3927, total: 4000 },
  champion: { spotsLeft: 2989, total: 3000 },
  legend:   { spotsLeft: 2500, total: 2500 }
};

interface SpotData {
  spotsLeft: number;
  total: number;
}

export function Milestones() {
  const [spotsData, setSpotsData] = useState<Record<string, SpotData>>(fallbackData);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [spotsLoading, setSpotsLoading] = useState(true);

  const fetchSpots = async () => {
    setSpotsLoading(true);
    try {
      const res = await fetch('/api/arcade-spots');
      const data = await res.json();
      if (data && data.trooper) {
        setSpotsData(data);
      }
      if (data.last_updated_at) {
        setLastUpdated(new Date(data.last_updated_at));
      } else {
        setLastUpdated(new Date());
      }
    } catch {
      // keep fallback values silently
    } finally {
      setSpotsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots(); // on load
    const interval = setInterval(fetchSpots, 30 * 60 * 1000); // 30 mins
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <section id="milestones" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900 dark:text-white">Swag Milestones</h2>
            <p className="text-slate-700 dark:text-slate-300">Track your progress and unlock exclusive rewards.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {MILESTONES.map((milestone, idx) => {
            const Icon = icons[idx];
            
            const tierKey = milestone.name.toLowerCase();
            const spotInfo = spotsData[tierKey] || fallbackData[tierKey as keyof typeof fallbackData];
            
            const filled = spotInfo.total - spotInfo.spotsLeft;
            const percentRaw = (filled / spotInfo.total) * 100;
            const percentDisplay = Math.round(percentRaw * 10) / 10;
            const barWidth = Math.max(2, Math.min(100, percentRaw));

            const gradientClasses: Record<string, string> = {
              'milestone-1': 'from-[#4285F4] to-[#1a65db]',
              'milestone-2': 'from-[#34A853] to-[#25823e]',
              'milestone-3': 'from-[#FBBC05] to-[#d49e00]',
              'milestone-4': 'from-[#EA4335] to-[#c72719]',
            };

            return (
              <motion.div 
                key={milestone.id}
                whileHover={{ y: -5 }}
                className="glass-card rounded-[2rem] p-6 relative overflow-hidden group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${milestone.colorClass}/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500`} />
                
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${milestone.colorClass}/10 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${milestone.textClass}`} />
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${milestone.colorClass}/10 ${milestone.textClass}`}>
                    {milestone.requiredPoints} Pts
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display mb-2 text-slate-900 dark:text-white">{milestone.name}</h3>
                <div className="min-h-[3rem]">
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{milestone.reward}</p>
                </div>
                
                <div className="mt-6">
                  {spotsLoading ? (
                    <div className="animate-pulse flex flex-col gap-2 relative">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-medium h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col relative w-full">
                      <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300 mb-2 font-medium">
                        <span>{spotInfo.spotsLeft.toLocaleString()} / {spotInfo.total.toLocaleString()} spots left</span>
                        <span className="font-bold">{percentDisplay}% Filled</span>
                      </div>
                      <div className="h-2.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-200/50 dark:border-slate-700/50 block">
                         <div 
                           className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradientClasses[milestone.id]} transition-all duration-1000 shadow-[0_0_8px_currentColor] z-10`} 
                           style={{ width: `${barWidth}%` }} 
                         />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {lastUpdated && !spotsLoading && (
          <div className="text-center mt-8">
            <p className="text-xs text-slate-500 font-medium">
              Last synced {getTimeAgo(lastUpdated)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
