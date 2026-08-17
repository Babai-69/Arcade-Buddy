import React from 'react';
import { motion } from 'motion/react';
import { ProfileChecker } from '../components/ProfileChecker';

export function CalculatorPage({ participants }: { participants: any[] }) {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-orange-500/10 to-red-500/20 blur-[150px]"
        />
      </div>

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-2xl rounded-3xl p-4 sm:p-8">
            <ProfileChecker participants={participants} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
