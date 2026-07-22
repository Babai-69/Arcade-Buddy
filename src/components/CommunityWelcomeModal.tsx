import React, { useState, useEffect } from 'react';
import { X, Check, MessageCircle, ExternalLink, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export function CommunityWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('hasDismissedCommunityModal');
    if (hasDismissed === 'true') {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem('hasDismissedCommunityModal', 'true');
    setIsOpen(false);
  };

  const handleRemindLater = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#111111] w-full max-w-md rounded-[24px] shadow-2xl flex flex-col relative overflow-hidden"
          >
            {/* RGB Top Border */}
            <div 
              className="h-1.5 w-full" 
              style={{ background: 'linear-gradient(90deg, #4285F4 0%, #9b72cb 25%, #EA4335 50%, #FBBC05 75%, #34A853 100%)' }}
            ></div>

            <button
              onClick={handleRemindLater}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8 pt-10">
              <div className="flex justify-center mb-6">
                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  Facilitator-Led Community
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-4 leading-tight">
                Build your Google Cloud skills with a community beside you.
              </h2>
              
              <p className="text-slate-600 dark:text-gray-400 text-center text-sm mb-6 leading-relaxed">
                Join our Arcade Facilitator '26 community for verified updates, enrollment guidance, learning resources, and peer support.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-700 dark:text-gray-300 font-medium">Verified program updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-700 dark:text-gray-300 font-medium">Enrollment and profile guidance</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-700 dark:text-gray-300 font-medium">Community learning support</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-5 mb-4 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Join the WhatsApp Community</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed mb-3">
                      Updates, reminders, guidance, and participant discussions.
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-xs font-medium mb-4">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      1000+ Members
                    </div>
                  </div>
                </div>
                <a 
                  href="https://whatsapp.com/channel/0029VbCahmFFCCoVQMV7ix1s" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 rounded-lg flex items-center justify-center transition-colors"
                >
                  Join on WhatsApp
                </a>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Prefer Telegram?</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">Receive the same essential community updates.</p>
                </div>
                <a 
                  href="https://t.me/arcadebuddy" 
                  target="_blank" 
                  rel="noreferrer"
                  className="shrink-0 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <div className="bg-[#0088cc] rounded-full p-1 flex items-center justify-center">
                    <Send className="w-3 h-3 text-white -ml-0.5" />
                  </div>
                  Join Telegram Community
                </a>
              </div>
              
              <div className="text-center mb-6">
                <Link to="/about" onClick={() => setIsOpen(false)} className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
                  View official Facilitator '26 program details
                </Link>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  This is an independent facilitator-led community hub. Official program rules and updates are provided by Google.
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={handleRemindLater}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
                >
                  Remind Me Later
                </button>
                <button 
                  onClick={handleDontShowAgain}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
                >
                  Don't Show Again
                </button>
              </div>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

