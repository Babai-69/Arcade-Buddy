import React from 'react';
import { motion } from 'motion/react';
import { LabLimitAnimation } from '../components/LabLimitAnimation';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DailyLabLimitGuidePage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/resources" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Resources
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Daily Lab Limit <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Guide</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Understand the daily lab limits, what happens when you exceed them, and how to track your progress effectively.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 md:p-10">
            <LabLimitAnimation defaultOpen={true} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
