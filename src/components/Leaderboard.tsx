import React, { useState, useMemo } from 'react';
import { Participant, MILESTONES } from '../types';
import { Search, ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight, Minus, Trophy, Medal } from 'lucide-react';
import { motion } from 'motion/react';

interface LeaderboardProps {
  participants: Participant[];
}

export function Leaderboard({ participants = [] }: LeaderboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Participant>('arcadePoints');
  const [sortAsc, setSortAsc] = useState(false);
  const [milestoneFilter, setMilestoneFilter] = useState('all');

  const getMilestoneStatus = (points: number) => {
    return [...MILESTONES].reverse().find(m => points >= m.requiredPoints)?.name || 'None';
  };

  const filteredAndSorted = useMemo(() => {
    let result = participants.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (milestoneFilter !== 'all') {
      result = result.filter(p => p.milestoneEarned.toLowerCase().includes(milestoneFilter.toLowerCase()) || (p.arcadePoints >= 120 && milestoneFilter.includes('Legend')) || (p.arcadePoints >= 95 && milestoneFilter.includes('Premium')) || (p.arcadePoints >= 75 && milestoneFilter.includes('Advanced')) || (p.arcadePoints >= 50 && milestoneFilter.includes('Standard'))); // Fuzzy fallback
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

    return result;
  }, [participants, searchTerm, sortField, sortAsc, milestoneFilter]);

  const handleSort = (field: keyof Participant) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section id="leaderboard" className="py-10 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Program Leaderboard</h2>
            <p className="text-slate-500 dark:text-slate-400">Live rankings updated daily.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name or community..." 
                className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="py-2 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50"
              value={milestoneFilter}
              onChange={(e) => setMilestoneFilter(e.target.value)}
            >
              <option value="all">All Milestones</option>
              {MILESTONES.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
              <option value="None">None</option>
            </select>
          </div>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" onClick={() => handleSort('currentRank')}>
                    <div className="flex items-center gap-1">Rank {sortField === 'currentRank' && (sortAsc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">Participant {sortField === 'name' && (sortAsc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" onClick={() => handleSort('arcadePoints')}>
                     <div className="flex items-center gap-1">Points {sortField === 'arcadePoints' && (sortAsc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</div>
                  </th>
                  <th className="px-6 py-4 hidden sm:table-cell cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" onClick={() => handleSort('dailyPoints')}>
                     <div className="flex items-center gap-1">24h Change {sortField === 'dailyPoints' && (sortAsc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</div>
                  </th>
                  <th className="px-6 py-4">Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 block md:table-row-group">
                {filteredAndSorted.map((p, idx) => {
                   const rC = p.previousRank - p.currentRank; 
                   return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={p.id} 
                    className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer block md:table-row"
                  >
                    <td className="px-6 py-4 block md:table-cell whitespace-nowrap">
                       <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg w-6">{p.currentRank}</span>
                        {p.currentRank === 1 && <Trophy className="h-5 w-5 text-[#FBBC05]" />}
                        {p.currentRank === 2 && <Medal className="h-5 w-5 text-slate-400" />}
                        {p.currentRank === 3 && <Medal className="h-5 w-5 text-amber-700" />}
                       </div>
                    </td>
                    <td className="px-6 py-4 block md:table-cell whitespace-nowrap">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-slate-500 md:hidden mt-1">{p.email}</div>
                    </td>
                    <td className="px-6 py-4 block md:table-cell font-bold text-[#4285F4] whitespace-nowrap">{p.arcadePoints}</td>
                    <td className="px-6 py-4 hidden sm:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {p.dailyPoints > 0 ? (
                           <span className="flex items-center text-xs font-medium text-[#34A853] bg-[#34A853]/10 px-2 py-1 rounded-full">
                             <ArrowUpRight className="h-3 w-3 mr-1" /> +{p.dailyPoints}
                           </span>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                        {rC > 0 && <span className="text-xs text-[#34A853] ml-2 flex items-center" title={`Improved by ${rC} positions`}><ChevronUp className="h-3 w-3"/>{rC}</span>}
                        {rC < 0 && <span className="text-xs text-[#EA4335] ml-2 flex items-center" title={`Dropped by ${Math.abs(rC)} positions`}><ChevronDown className="h-3 w-3"/>{Math.abs(rC)}</span>}
                        {rC === 0 && <span className="text-xs text-slate-400 ml-2 flex items-center"><Minus className="h-3 w-3"/></span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 block md:table-cell whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        getMilestoneStatus(p.arcadePoints) === 'Legend' ? 'bg-[#EA4335]/10 text-[#EA4335]' :
                        getMilestoneStatus(p.arcadePoints) === 'Champion' ? 'bg-[#FBBC05]/10 text-[#FBBC05]' :
                        getMilestoneStatus(p.arcadePoints) === 'Ranger' ? 'bg-[#34A853]/10 text-[#34A853]' :
                        getMilestoneStatus(p.arcadePoints) === 'Explorer' ? 'bg-[#4285F4]/10 text-[#4285F4]' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {getMilestoneStatus(p.arcadePoints)}
                      </span>
                    </td>
                  </motion.tr>
                )})}
              </tbody>
            </table>
            {filteredAndSorted.length === 0 && (
              <div className="p-8 text-center text-slate-500">No participants found matching the criteria.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
