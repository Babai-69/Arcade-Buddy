import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';

interface RestrictedAccessProps {
  user: User | null;
}

export function RestrictedAccess({ user }: RestrictedAccessProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[560px] bg-transparent relative overflow-hidden flex flex-col items-center justify-center p-12 text-center z-0">
      {/* Soft Glow Blob (Calmer than 404, no animation) */}
      <div 
        className="absolute w-[320px] h-[320px] rounded-full top-[20%] left-1/2 -translate-x-1/2 blur-[60px] opacity-10 dark:opacity-20 z-[-1]"
        style={{
          background: 'radial-gradient(circle, #5b6cf9 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5b6cf9] to-[#8b5cf6] mb-6 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Lock className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-[#f5f5f7] mb-3">Access restricted</h2>
        
        {!user ? (
          <>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-[#8b8fa3] mb-8">
              This area is limited to Arcade Buddy administrators. Sign in with an authorized account to continue.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
              className="h-[42px] px-8 rounded-[10px] bg-gradient-to-r from-[#5b6cf9] to-[#8b5cf6] text-white font-medium hover:-translate-y-[2px] active:scale-95 transition-all duration-200 shadow-md shadow-indigo-500/20"
            >
              Sign in to continue
            </button>
          </>
        ) : (
          <>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-[#8b8fa3] mb-8">
              Your account doesn't have admin access. Contact the Arcade Buddy team if you believe this is a mistake.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="h-[42px] px-8 rounded-[10px] bg-white dark:bg-[#12172a] text-slate-900 dark:text-[#f5f5f7] font-medium border border-slate-200 dark:border-[#2a3352] hover:border-[#5b6cf9] dark:hover:border-[#5b6cf9] hover:-translate-y-[2px] active:scale-95 transition-all duration-200 shadow-sm"
            >
              Back to home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
