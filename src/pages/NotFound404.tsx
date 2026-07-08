import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

export function NotFound404() {
  const navigate = useNavigate();
  const [lottieError, setLottieError] = useState(false);

  return (
    <div className="min-h-[560px] bg-transparent relative overflow-hidden flex flex-col items-center justify-center p-12 text-center z-0">
      {/* Starfield / Particles */}
      <div className="absolute inset-0 z-[-2] dark:opacity-100 opacity-0 transition-opacity duration-500">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0.2 + Math.random() * 0.6, 0.05, 0.2 + Math.random() * 0.6] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Glow Blob */}
      <motion.div 
        className="absolute w-[320px] h-[320px] rounded-full top-[20%] left-1/2 -translate-x-1/2 blur-[60px] opacity-20 dark:opacity-25 z-[-1]"
        style={{
          background: 'radial-gradient(circle, #5b6cf9 0%, transparent 70%)',
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        {!lottieError ? (
          <div className="dark:bg-transparent bg-[#12172a] rounded-[24px] p-2 sm:bg-transparent sm:p-0 sm:shadow-none shadow-lg mb-6 max-w-[320px] w-full">
            <DotLottieReact
              src="https://assets3.lottiefiles.com/packages/lf20_suhe7qtm.json"
              loop
              autoplay
              onError={() => setLottieError(true)}
              style={{ width: '100%', maxWidth: '320px', minWidth: '200px', height: 'auto', margin: '0 auto' }}
            />
          </div>
        ) : (
          <motion.div
            className="text-[96px] font-display font-bold leading-none mb-6"
            style={{
              background: 'linear-gradient(90deg, #5b6cf9, #8b5cf6, #5b6cf9)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px'
            }}
          >
            404
          </motion.div>
        )}

        <h2 className="text-xl font-bold text-slate-900 dark:text-[#f5f5f7] mb-2 mt-4">Lost in the arcade</h2>
        <p className="text-[15px] text-slate-600 dark:text-[#8b8fa3] mb-8">
          This page doesn't exist — the link might be broken or the page may have moved.
        </p>

        <div className="flex gap-3 justify-center w-full">
          <button 
            onClick={() => navigate('/')}
            className="h-[42px] px-6 rounded-[10px] bg-gradient-to-r from-[#5b6cf9] to-[#8b5cf6] text-white font-medium hover:-translate-y-[2px] active:scale-95 transition-all duration-200 shadow-md shadow-indigo-500/20"
          >
            Back to home
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="h-[42px] px-6 rounded-[10px] bg-white dark:bg-[#12172a] text-slate-900 dark:text-[#f5f5f7] font-medium border border-slate-200 dark:border-[#2a3352] hover:border-[#5b6cf9] dark:hover:border-[#5b6cf9] hover:-translate-y-[2px] active:scale-95 transition-all duration-200 shadow-sm"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
