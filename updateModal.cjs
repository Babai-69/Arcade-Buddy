const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2, TriangleAlert, CheckSquare, ExternalLink, Copy, Gift, Youtube, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CommunityWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasRegistered = localStorage.getItem('hasRegisteredForFacilitator');
    if (hasRegistered === 'true') {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegisteredYes = () => {
    localStorage.setItem('hasRegisteredForFacilitator', 'true');
    setIsOpen(false);
  };

  const handleRegisteredNo = () => {
    const code = "GCAF26-IN-C5V-KYM";
    navigator.clipboard.writeText(code).catch(err => console.error("Could not copy text: ", err));
    
    // Open Google Form
    window.open("https://forms.gle/Z2TX54F8bQ4ooV5c9", "_blank");
    // Open YouTube video
    window.open("https://youtu.be/J1tm4HRSHjc?si=sGCaxHDgTVkk-CiQ", "_blank");
    
    localStorage.setItem('hasRegisteredForFacilitator', 'true');
    setIsOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("GCAF26-IN-C5V-KYM");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#111622] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col border border-slate-800 my-8 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 mb-2 pr-8">
                <TriangleAlert className="w-6 h-6 text-yellow-400 shrink-0" />
                <h2 className="text-xl md:text-2xl font-bold text-yellow-400">Claim upto 45 FREE Arcade Points</h2>
              </div>
              <p className="text-slate-200 font-medium mb-6 text-sm md:text-base">
                Want to earn <span className="text-green-400 font-bold">45 bonus arcade points</span> for free with minimal effort?
              </p>

              {/* Register and Get Box */}
              <div className="border border-yellow-600/40 bg-yellow-950/10 rounded-xl p-4 md:p-5 mb-5">
                <h3 className="text-white font-bold mb-3">Register and Get:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-300 text-sm md:text-base">
                    <CheckSquare className="w-5 h-5 text-green-500 shrink-0 mt-0.5 bg-white rounded-sm" />
                    <span>45 Bonus Arcade Points</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm md:text-base">
                    <CheckSquare className="w-5 h-5 text-green-500 shrink-0 mt-0.5 bg-white rounded-sm" />
                    <span>750 Qwiklabs Credits to complete Skill Badges</span>
                  </li>
                </ul>
              </div>

              <div className="mb-5 text-sm md:text-base text-slate-300">
                <span className="font-medium">Fill this official registration form:</span>{' '}
                <a 
                  href="https://forms.gle/Z2TX54F8bQ4ooV5c9" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 font-bold"
                >
                  Register Here <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* How to Fill the Form */}
              <div className="border border-yellow-500/40 border-dashed rounded-xl p-4 md:p-5 mb-5 bg-slate-900/50">
                <h3 className="text-white font-bold mb-3">How to Fill the Form:</h3>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-slate-300 mb-4 text-sm md:text-base">
                  <li>Use your correct email and public profile URL</li>
                  <li>Choose <strong className="text-white">Yes</strong> when asked if you have a referral code</li>
                </ul>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-yellow-400/10 text-yellow-400 font-mono font-bold text-lg md:text-xl px-4 py-2 rounded-lg border border-yellow-400/20">
                    GCAF26-IN-C5V-KYM
                  </div>
                  <button 
                    onClick={handleCopy} 
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Special Bonus Box */}
              <div className="border border-slate-700 bg-slate-800/40 rounded-xl p-4 md:p-5 mb-5">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-400" /> Special Bonus:
                </h3>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-slate-300 mb-4 text-sm md:text-base">
                  <li>Access to a hidden leaderboard only for those who use our code</li>
                  <li>Top participants win exclusive gifts 🎁</li>
                </ul>
                <a href="https://arcade.google.com" target="_blank" className="text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 text-sm font-medium">
                  <ExternalLink className="w-3.5 h-3.5" /> View the Special Leaderboard
                </a>
              </div>

              {/* YouTube Help */}
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                <Youtube className="w-10 h-10 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">Need help with registration?</h4>
                  <p className="text-slate-400 text-sm">Watch our step-by-step YouTube guide to ensure you fill the form correctly.</p>
                </div>
                <a 
                  href="https://youtu.be/J1tm4HRSHjc?si=sGCaxHDgTVkk-CiQ" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="sm:ml-auto shrink-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
                >
                  Watch Video
                </a>
              </div>

              {/* Community */}
              <div className="border border-slate-700 bg-slate-800/40 rounded-xl p-4 md:p-5 mb-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Join Our Community
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://t.me/arcadebuddy" target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                    <Send className="w-5 h-5" /> Join Telegram
                  </a>
                  <a href="https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l" target="_blank" rel="noreferrer" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                    <MessageCircle className="w-5 h-5" /> Join WhatsApp
                  </a>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="font-bold text-white">Have you registered?</span>
                  </div>
                  <span className="text-sm text-slate-400">Required to use the platform</span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={handleRegisteredYes} className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Yes
                  </button>
                  <button onClick={handleRegisteredNo} className="flex-1 md:flex-none bg-slate-700 hover:bg-slate-600 text-white px-8 py-2.5 rounded-lg font-bold transition-colors">
                    No
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/CommunityWelcomeModal.tsx', content);
