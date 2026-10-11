import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Medal } from 'lucide-react';

interface Performer {
  rank: number;
  name: string;
  points: number;
  tier: string;
}

const defaultTopPerformers: Performer[] = [
  { rank: 1, name: 'Ranitth Reddy', points: 165, tier: 'Legend' },
  { rank: 2, name: 'Solleti Ajay Kumar', points: 164, tier: 'Legend' },
  { rank: 3, name: 'Sakshi Kumari', points: 162.5, tier: 'Legend' },
  { rank: 4, name: 'Janakiram N', points: 159.5, tier: 'Legend' },
  { rank: 5, name: 'Nandan Bhimani', points: 159, tier: 'Legend' },
];

export function HomeSummitRoster({ participants = [] }: { participants?: any[] }) {
  // If participants array has data, take top 5; otherwise use default top performers
  const topList: Performer[] =
    participants.length >= 5
      ? [...participants]
          .sort((a, b) => (b.arcadePoints || b.totalPoints || 0) - (a.arcadePoints || a.totalPoints || 0))
          .slice(0, 5)
          .map((p, idx) => ({
            rank: idx + 1,
            name: p.name || 'Anonymous Learner',
            points: p.arcadePoints || p.totalPoints || 0,
            tier: p.milestoneEarned || 'Legend',
          }))
      : defaultTopPerformers;

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-1.5 block font-display">
            SUMMIT ROSTER
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Top Arcade performers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            See how you stack up against other learners
          </p>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-700/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="py-3.5 px-6 w-16">
                    #
                  </th>
                  <th scope="col" className="py-3.5 px-6">
                    NAME
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-center">
                    POINTS
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right">
                    TIER
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {topList.map((player) => (
                  <tr
                    key={player.rank}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono text-xs font-bold text-slate-500">
                      {player.rank === 1 ? (
                        <Medal className="w-4 h-4 text-amber-500" />
                      ) : player.rank === 2 ? (
                        <Medal className="w-4 h-4 text-slate-400" />
                      ) : player.rank === 3 ? (
                        <Medal className="w-4 h-4 text-amber-700" />
                      ) : (
                        `#${player.rank}`
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                      {player.name}
                    </td>
                    <td className="py-3.5 px-6 text-center font-bold font-mono text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm tabular-nums">
                      {player.points}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-2.5 py-0.5 rounded-full inline-block">
                        {player.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Link Footer */}
          <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-700/60 flex justify-center">
            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-102"
            >
              <span>View Full Leaderboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
