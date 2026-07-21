import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    step: 1,
    title: 'Base Arcade Points',
    description: 'Earned from games, skill badges & special events'
  },
  {
    step: 2,
    title: 'Special Game Adjustment',
    description: 'Special games apply custom point values before bonus'
  },
  {
    step: 3,
    title: 'Milestone Check',
    description: "System checks which milestones you've completed"
  },
  {
    step: 4,
    title: 'Bonus Applied',
    description: 'Bonus points from highest milestone added to base'
  },
  {
    step: 5,
    title: 'Final Total',
    description: 'Base + bonus = your adjusted Arcade points'
  }
];

export function HowBonusWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-[#111111] shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-[24px] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xl">🧮</span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How Bonus Calculation Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 dark:bg-[#1a1a1a] border border-slate-100 dark:border-[#2a2a2a] rounded-xl p-5 flex flex-col items-center text-center hover:bg-slate-100 dark:hover:bg-[#222222] transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-4
                ${i === 0 ? 'bg-[#ff9800]/10 text-[#ff9800]' :
                  i === 1 ? 'bg-[#f44336]/10 text-[#f44336]' :
                  i === 2 ? 'bg-[#ffc107]/10 text-[#ffc107]' :
                  i === 3 ? 'bg-[#00e676]/10 text-[#00e676]' :
                  'bg-[#ab47bc]/10 text-[#ab47bc]'}`}
              >
                {s.step}
              </div>
              <h3 className={`font-bold mb-2 text-sm
                ${i === 0 ? 'text-[#ff9800]' :
                  i === 1 ? 'text-[#f44336]' :
                  i === 2 ? 'text-[#ffc107]' :
                  i === 3 ? 'text-[#00e676]' :
                  'text-[#ab47bc]'}`}
              >
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
