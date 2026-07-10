import React, { useState, useMemo } from 'react';
import { Info, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ArcadeLoader } from './ArcadeLoader';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function WeeklyProgress({ profileUrl }: { profileUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [badgeDates, setBadgeDates] = useState<Date[]>([]);
  
  // Window: July 13, 2026 17:00 IST to Sept 14, 2026 23:59 IST (using UTC)
  const TRACKING_START = new Date('2026-07-13T11:30:00Z');
  const TRACKING_END = new Date('2026-09-14T18:29:00Z');
  
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const now = new Date();
    let refDate = now < TRACKING_START ? TRACKING_START : now > TRACKING_END ? TRACKING_END : now;
    const day = refDate.getDay();
    const diff = refDate.getDate() - day;
    const startOfWeek = new Date(refDate.setDate(diff));
    startOfWeek.setHours(0,0,0,0);
    return startOfWeek;
  });

  const handleTrack = async (targetUrl: string) => {
    if (!targetUrl) return;
    setLoading(true);
    setError('');
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch profile');
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const dates: Date[] = [];
      const regex = /Earned\s+([A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4}\s+[A-Z]+)/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const dateStr = match[1];
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          if (date >= TRACKING_START && date <= TRACKING_END) {
            dates.push(date);
          }
        }
      }
      
      setBadgeDates(dates);
    } catch (err: any) {
      setError(err.message || 'Error tracking profile');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (profileUrl) {
      handleTrack(profileUrl);
    }
  }, [profileUrl]);

  const nextWeek = () => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  const prevWeek = () => {
    setCurrentWeekStart(prev => {
      const prevDate = new Date(prev);
      prevDate.setDate(prevDate.getDate() - 7);
      return prevDate;
    });
  };

  const chartData = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return days.map((dayName, index) => {
      const dayDate = new Date(currentWeekStart);
      dayDate.setDate(dayDate.getDate() + index);
      
      const count = badgeDates.filter(d => 
        d.getFullYear() === dayDate.getFullYear() &&
        d.getMonth() === dayDate.getMonth() &&
        d.getDate() === dayDate.getDate()
      ).length;

      return {
        name: dayName,
        date: dayDate,
        count
      };
    });
  }, [currentWeekStart, badgeDates]);
  
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const colors: any = {
      Sunday: '#94a3b8',
      Monday: '#3b82f6',
      Tuesday: '#14b8a6',
      Wednesday: '#94a3b8',
      Thursday: '#3b82f6',
      Friday: '#f97316',
      Saturday: '#f97316',
    };
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill={colors[payload.value]} fontSize={12}>
          {payload.value}
        </text>
      </g>
    );
  };

  const maxCount = Math.max(...chartData.map(d => d.count), 4);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[16px] border border-slate-200 dark:border-slate-700 shadow-sm p-6 font-sans mt-8 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 group relative">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Weekly Progress</h2>
          <Info className="w-5 h-5 text-slate-400 cursor-help" />
          <div className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-2 bg-slate-800 text-xs text-white rounded shadow-lg z-10">
            Number of badges earned each day this week
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

      <div className="flex items-center justify-between mb-4">
        <button onClick={prevWeek} className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-sm flex items-center transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous week
        </button>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {currentWeekStart.toLocaleDateString()} - {new Date(currentWeekStart.getTime() + 6 * 86400000).toLocaleDateString()}
        </span>
        <button onClick={nextWeek} className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-sm flex items-center transition-colors">
          Next week <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="h-[300px] w-full relative">
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center">
            <ArcadeLoader />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={<CustomizedAxisTick />} axisLine={{ stroke: '#94a3b8' }} tickLine={false} />
            <YAxis domain={[0, maxCount]} allowDecimals={false} axisLine={{ stroke: '#94a3b8' }} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`${value} badges`, 'Earned']}
            />
            <Line type="monotone" dataKey="count" stroke="#1a2b4c" strokeWidth={2} dot={{ r: 4, fill: '#1a2b4c' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
