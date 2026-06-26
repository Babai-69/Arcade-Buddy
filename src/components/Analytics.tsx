import React from 'react';
import { Participant } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  participants: Participant[];
}

export function Analytics({ participants = [] }: AnalyticsProps) {
  // Top 5 Performers Data
  const topPerformers = [...participants].sort((a, b) => b.arcadePoints - a.arcadePoints).slice(0, 5).map(p => ({
    name: p.name.split(' ')[0], 
    points: p.arcadePoints
  }));

  // Milestone Distribution
  const stdCount = participants.filter(p => p.arcadePoints >= 50 && p.arcadePoints < 75).length;
  const advCount = participants.filter(p => p.arcadePoints >= 75 && p.arcadePoints < 95).length;
  const premCount = participants.filter(p => p.arcadePoints >= 95 && p.arcadePoints < 120).length;
  const ultCount = participants.filter(p => p.arcadePoints >= 120).length;
  const noneCount = participants.filter(p => p.arcadePoints < 50).length;

  const milestoneData = [
    { name: 'None', value: noneCount },
    { name: 'Standard', value: stdCount },
    { name: 'Advanced', value: advCount },
    { name: 'Premium', value: premCount },
    { name: 'Ultimate', value: ultCount },
  ];

  const COLORS = ['#94a3b8', '#4285F4', '#34A853', '#FBBC05', '#EA4335'];

  return (
    <section id="analytics" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Program Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400">Insights into community performance and engagement.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold font-display mb-6 text-center">Top 5 Performers</h3>
            <div className="h-[300px] w-full">
              {topPerformers.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPerformers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(66, 133, 244, 0.1)' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="points" fill="#4285F4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-medium">No data available</div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
             <h3 className="text-xl font-bold font-display mb-6 text-center">Milestone Distribution</h3>
             <div className="h-[300px] w-full flex items-center justify-center">
                {participants.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={milestoneData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {milestoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-medium">No data available</div>
                )}
             </div>
             {participants.length > 0 && (
             <div className="flex flex-wrap justify-center gap-4 mt-2">
                {milestoneData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    {entry.name}: {entry.value}
                  </div>
                ))}
             </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
