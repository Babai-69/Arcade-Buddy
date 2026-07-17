import React from 'react';
import { Target, CheckCircle2, Lock, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface MilestoneProgressProps {
  gameBadges: number;
  skillBadges: number;
}

const MILESTONE_DATA = [
  { id: 1, label: 'Milestone 1', gamesRequired: 6, skillsRequired: 18, bonusPoints: 5 },
  { id: 2, label: 'Milestone 2', gamesRequired: 8, skillsRequired: 34, bonusPoints: 15 },
  { id: 3, label: 'Milestone 3', gamesRequired: 10, skillsRequired: 50, bonusPoints: 25 },
  { id: 4, label: 'Ultimate', gamesRequired: 12, skillsRequired: 66, bonusPoints: 35 },
];

export function MilestoneProgress({ gameBadges, skillBadges }: MilestoneProgressProps) {
  // Determine states
  const milestones = MILESTONE_DATA.map((m) => {
    return {
      ...m,
      isCompleted: gameBadges >= m.gamesRequired && skillBadges >= m.skillsRequired,
    };
  });

  const firstIncompleteIndex = milestones.findIndex((m) => !m.isCompleted);
  const currentTargetIndex = firstIncompleteIndex === -1 ? milestones.length - 1 : firstIncompleteIndex; // if all completed, ultimate is target? Or no target. Let's say -1 means all completed.

  const nodes = [
    { id: 'start', label: 'Start', pts: '0 pts', isCompleted: true, isCurrent: false, isLocked: false },
    ...milestones.map((m, idx) => {
      const isCompleted = m.isCompleted;
      const isCurrent = idx === currentTargetIndex && !isCompleted;
      const isLocked = !isCompleted && !isCurrent;
      return {
        id: `milestone${m.id}`,
        label: m.label,
        pts: `+${m.bonusPoints} pts`,
        isCompleted,
        isCurrent,
        isLocked,
        ...m
      };
    })
  ];

  const currentTargetNode = nodes.find(n => n.isCurrent);

  return (
    <div className="w-full space-y-10 font-sans mt-8">
      {/* SECTION 1 — HORIZONTAL STEPPER TIMELINE */}
      <div className="relative flex justify-between items-start max-w-4xl mx-auto px-2 sm:px-6">
        {/* Connecting lines */}
        <div className="absolute top-6 left-[12%] right-[12%] sm:left-[10%] sm:right-[10%] h-[4px] bg-slate-200 dark:bg-slate-700 rounded-full z-0" />
        <div className="absolute top-6 left-[12%] sm:left-[10%] h-[4px] bg-gradient-to-r from-[#22c55e] to-[#3b82f6] rounded-full z-0 transition-all duration-1000" style={{ width: `${Math.min(100, (() => {
          let totalProgress = 0;
          for (let i = 1; i < nodes.length; i++) {
            const prevGames = nodes[i - 1].gamesRequired || 0;
            const prevSkills = nodes[i - 1].skillsRequired || 0;
            const currGames = nodes[i].gamesRequired;
            const currSkills = nodes[i].skillsRequired;
            
            if (gameBadges >= currGames && skillBadges >= currSkills) {
              totalProgress += 25;
            } else {
              const gameProgress = Math.max(0, Math.min(1, (gameBadges - prevGames) / (currGames - prevGames)));
              const skillProgress = Math.max(0, Math.min(1, (skillBadges - prevSkills) / (currSkills - prevSkills)));
              const segmentProgress = (gameProgress + skillProgress) / 2;
              totalProgress += segmentProgress * 25;
              break;
            }
          }
          // The line only spans 80% of the container (from 10% to 90%). 
          // 25 progress corresponds to 25% of that 80% width, which is just 25% of the line.
          // Wait, if total line width is 100% of the *absolute positioned element*.
          // Our line's width is dynamically set as a percentage of the width available from left-10% to the end.
          // Since it's absolute, width=100% means width of the container. 
          // So if we want it to cover 80% of the container (up to right-10%), we should multiply totalProgress by 0.8.
          // OR, even better, we set left-10% and max-width-80%.
          return totalProgress * 0.8; // Actually, left-[10%] means it starts at 10%. To reach 90%, max width is 80%.
          // Let's use left-[10%] and set width to `calc(${totalProgress}% * 0.8)`.
          // Wait, 100% of the container width. So `totalProgress * 0.8`.
        })())}%` }} />

        {nodes.map((node, idx) => {
          let Icon = Lock;
          let circleClass = 'w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-[3px] border-slate-200 text-slate-300';
          let statusText = 'Locked';
          let statusColor = 'text-slate-400';
          let wrapperClass = 'bg-white rounded-full z-10';

          if (node.isCompleted) {
            Icon = Star;
            circleClass = 'w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-[4px] border-[#22c55e] text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]';
            statusText = 'Completed';
            statusColor = 'text-[#22c55e]';
          } else if (node.isCurrent) {
            Icon = Target;
            // A gradient border effect using a wrapper
            wrapperClass = 'p-[3px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] z-10';
            circleClass = 'w-full h-full rounded-full flex items-center justify-center bg-white text-blue-500';
            statusText = 'Next Target';
            statusColor = 'text-blue-500 font-bold';
          } else {
            // Locked
            circleClass = 'w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-[3px] border-slate-200 text-slate-300';
          }

          return (
            <motion.div 
              key={node.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div className={wrapperClass + (node.isCurrent ? " w-12 h-12 sm:w-14 sm:h-14" : "")}>
                <div className={circleClass}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="text-center mt-2">
                <p className={`text-xs sm:text-sm font-bold ${node.isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {node.label}
                </p>
                <p className="text-xs text-slate-500">{node.pts}</p>
                {node.id !== 'start' && (
                  <p className={`text-[10px] sm:text-xs mt-1 ${statusColor}`}>
                    {statusText}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SECTION 2 — MILESTONE DETAIL CARD */}
      {currentTargetNode && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {currentTargetNode.label} Requirements
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  Current Target 🎯
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Requires completing the following badges</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold px-4 py-2 rounded-xl text-sm shrink-0">
              {currentTargetNode.pts}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Game Badges */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-slate-800 dark:text-slate-200">Game Badges</span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {Math.min(gameBadges, currentTargetNode.gamesRequired!)} / {currentTargetNode.gamesRequired}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (gameBadges / currentTargetNode.gamesRequired!) * 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#4285F4] to-[#7c3aed] rounded-full"
                />
              </div>
            </div>

            {/* Right: Skill Badges */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Skill Badges</span>
                  {skillBadges >= currentTargetNode.skillsRequired! && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {Math.min(skillBadges, currentTargetNode.skillsRequired!)} / {currentTargetNode.skillsRequired}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (skillBadges / currentTargetNode.skillsRequired!) * 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${skillBadges >= currentTargetNode.skillsRequired! ? 'bg-[#34A853]' : 'bg-gradient-to-r from-teal-400 to-[#34A853]'}`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 3 — MILESTONES OVERVIEW (ALL STACKED) */}
      <div className="max-w-4xl mx-auto space-y-4">
        {nodes.slice(1).map((node, idx) => {
          let rowBg = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm';
          let borderAccent = '';
          
          if (node.isCompleted) {
            rowBg = 'bg-white dark:bg-slate-900 shadow-md';
            borderAccent = 'border-l-4 border-l-blue-500';
          } else if (node.isCurrent) {
            rowBg = 'bg-[#eff6ff] dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50 shadow-md border';
          } else if (node.isLocked) {
            rowBg = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 shadow-none opacity-80 grayscale-[20%] border';
          }

          return (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative rounded-xl overflow-hidden ${rowBg} ${borderAccent} p-5 sm:p-6`}
            >
              {node.isCurrent && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Current Goal
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Col 1: Info */}
                <div className="md:w-[30%]">
                  <h4 className={`text-lg font-bold mb-1 ${node.isLocked ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {node.label}
                  </h4>
                  <p className="text-blue-500 font-medium text-sm mb-2">Requires:</p>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-4">
                    <li>• {node.gamesRequired} Game Badges</li>
                    <li>• {node.skillsRequired} Skill Badges</li>
                  </ul>
                  
                  <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-bold ${
                    node.isCompleted 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : node.isCurrent
                        ? 'border-2 border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                  }`}>
                    {node.pts}
                  </div>
                </div>

                {/* Col 2 & 3: Progress Bars */}
                <div className="md:w-[70%] grid sm:grid-cols-2 gap-4 w-full">
                  {/* Game Badges */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Game Badges</span>
                      <span className="text-xs font-medium text-slate-500">
                        {Math.min(gameBadges, node.gamesRequired!)} / {node.gamesRequired}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${node.isLocked ? 'bg-slate-400' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (gameBadges / node.gamesRequired!) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Skill Badges</span>
                      <span className="text-xs font-medium text-slate-500">
                        {Math.min(skillBadges, node.skillsRequired!)} / {node.skillsRequired}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${node.isLocked ? 'bg-slate-400' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (skillBadges / node.skillsRequired!) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
