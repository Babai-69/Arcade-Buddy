import React, { useState, useMemo } from 'react';
import { gameBadges, skillBadges } from '../data/badgesData';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckProgressProps {
  completedBadges: { title: string; earnedDate?: string; category?: string; points?: number; validForProgram?: boolean }[];
}

export function CheckProgress({ completedBadges }: CheckProgressProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState<'incomplete' | 'completed'>('incomplete');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const tabs = ['All', 'Game', 'Skills'];

  const allBadges = useMemo(() => {
    const isCompleted = (b: {name: string}) => completedBadges.some(cb => 
      cb.title.toLowerCase().includes(b.name.toLowerCase()) || 
      b.name.toLowerCase().includes(cb.title.toLowerCase())
    );
    
    const game = gameBadges
      .filter(b => !isCompleted(b))
      .map(b => ({ ...b, category: 'Game', points: 1, type: 'GAME' }));
      
    const skill = skillBadges
      .filter(b => !isCompleted(b))
      .map(b => ({ ...b, category: 'Skill', points: 0.5, type: 'SKILL' }));
      
    return [...game, ...skill];
  }, [completedBadges]);

  const completedBadgesData = useMemo(() => {
    const START = new Date('2026-07-13T00:00:00Z');
    const END = new Date('2026-09-14T18:29:00Z');

    return completedBadges
      .filter(b => b.category === 'Skill' || b.category === 'Game')
      .map(b => {
        const foundInDb = [...gameBadges, ...skillBadges].find(dbBadge => 
          dbBadge.name.toLowerCase().includes(b.title.toLowerCase()) ||
          b.title.toLowerCase().includes(dbBadge.name.toLowerCase())
        );
        
        const dateStr = (b.earnedDate || '').replace(/^Earned\s+(on\s+)?/i, '').trim();
        const badgeDate = new Date(dateStr);
        const validForProgram = b.validForProgram !== undefined ? b.validForProgram : (badgeDate >= START && badgeDate <= END);

        return {
          name: b.title,
          category: b.category,
          points: b.points || (b.category === 'Skill' ? 0.5 : 1),
          type: (b.category || '').toUpperCase() === 'GAME' ? 'GAME' : 'SKILL',
          earnedDate: dateStr,
          validForProgram,
          image: foundInDb ? foundInDb.image : 'No Image',
          link: foundInDb ? foundInDb.link : '#',
        };
      });
  }, [completedBadges]);

  const filteredBadges = useMemo(() => {
    const sourceBadges = viewMode === 'incomplete' ? allBadges : completedBadgesData;

    return sourceBadges.filter(badge => {
      // Filter by tab
      if (activeTab === 'Game' && badge.category !== 'Game') return false;
      if (activeTab === 'Skills' && badge.category !== 'Skill') return false;
      if (['Lab-free', 'Trivia', 'Special'].includes(activeTab)) return false; // Hardcoded empty for now
      
      // Filter by search
      if (searchQuery && !badge.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  }, [allBadges, completedBadgesData, activeTab, searchQuery, viewMode]);

  const displayedBadges = filteredBadges.slice(0, visibleCount);
  const remainingCount = filteredBadges.length - visibleCount;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSlug = (name: string) => {
    return '1q-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 10) + '-' + Math.floor(Math.random() * 90000 + 10000);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[16px] border border-slate-200 dark:border-slate-700 shadow-sm p-6 font-sans mt-8 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => { setViewMode('incomplete'); setVisibleCount(9); }}
            className={`text-xl md:text-2xl font-bold transition-all relative ${viewMode === 'incomplete' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Incomplete Badges
            {viewMode === 'incomplete' && <motion.div layoutId="tab-indicator" className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
          <button
            onClick={() => { setViewMode('completed'); setVisibleCount(9); }}
            className={`text-xl md:text-2xl font-bold transition-all relative ${viewMode === 'completed' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Completed Badges
            {viewMode === 'completed' && <motion.div layoutId="tab-indicator" className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
        </div>
        <div className="relative mt-4 md:mt-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {tabs.map(tab => {
          let count = 0;
          const sourceBadges = viewMode === 'incomplete' ? allBadges : completedBadgesData;
          if (tab === 'All') count = sourceBadges.length;
          else if (tab === 'Game') count = sourceBadges.filter(b => b.category === 'Game').length;
          else if (tab === 'Skills') count = sourceBadges.filter(b => b.category === 'Skill').length;

          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setVisibleCount(9); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#1a2b4c] dark:bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive ? 'bg-blue-500/20 text-blue-100' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filteredBadges.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No badges in this category yet.
        </div>
      ) : (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedBadges.map((badge) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={badge.name} 
                  className={`bg-white dark:bg-slate-800 border ${viewMode === 'completed' ? ((badge as any).validForProgram ? 'border-[#34A853]/50 ring-1 ring-[#34A853]/50' : 'border-slate-200 dark:border-slate-700 opacity-70 grayscale') : 'border-slate-200 dark:border-slate-700'} rounded-[16px] overflow-hidden flex flex-col hover:shadow-md transition-shadow relative`}
                >
                  {viewMode === 'completed' && (
                    <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm ${
                         (badge as any).validForProgram 
                         ? 'bg-[#34A853] text-white' 
                         : 'bg-slate-500 text-white'
                       }`}>
                          {(badge as any).validForProgram && <CheckCircle2 className="w-3 h-3" />}
                          {(badge as any).validForProgram ? 'COUNTED' : 'NOT COUNTED'}
                       </span>
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 ${
                      badge.type === 'GAME' ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {badge.type}
                    </span>
                    {(badge.name.toLowerCase().includes('july') || (badge.link && badge.link.toLowerCase().includes('july'))) ? (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 dark:bg-slate-900 text-white">
                        JULY
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-center mb-6">
                    {badge.image && badge.image !== 'No Image' ? (
                      <img src={badge.image} alt={badge.name} className="w-32 h-32 object-contain" onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }} />
                    ) : null}
                    <div className={`w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center ${badge.image && badge.image !== 'No Image' ? 'hidden' : ''}`}>
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-full" />
                    </div>
                  </div>

                  <h3 className="font-bold text-[#1a2b4c] dark:text-white text-base leading-tight mb-4 line-clamp-2 min-h-[2.5rem]">
                    {badge.name}
                  </h3>

                  <div className="mt-auto flex items-center justify-between">
                    {badge.type === 'GAME' ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-full text-xs text-slate-500 dark:text-slate-400">
                        <span className="truncate max-w-[100px]">{getSlug(badge.name)}</span>
                        <button onClick={() => handleCopy(getSlug(badge.name))} className="hover:text-slate-800 dark:hover:text-white transition-colors">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}
                    <span className="text-xs font-bold text-blue-500 flex items-center gap-1">
                      <span>⚡</span> {badge.points} Point{badge.points !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {viewMode === 'incomplete' ? (
                  <div className="px-4 pb-4 mt-auto">
                    <a
                      href={badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#1a2b4c] dark:bg-blue-600 hover:bg-[#111d33] dark:hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
                    >
                      Start Challenge &rarr;
                    </a>
                  </div>
                ) : (
                  <div className="px-4 pb-4 mt-auto border-t border-slate-100 dark:border-slate-700 pt-3">
                    <p className="text-xs text-slate-500 text-center font-medium">
                      Earned: {(badge as any).earnedDate}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>

          {filteredBadges.length > 9 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev >= filteredBadges.length ? 9 : filteredBadges.length)}
                className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {visibleCount >= filteredBadges.length ? 'Show Less' : `Show More (${remainingCount} more)`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
