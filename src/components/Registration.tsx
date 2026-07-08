import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, CheckCircle2, ArrowRight } from 'lucide-react';

export function Registration() {
  const [copied, setCopied] = useState(false);
  const code = "GCAF26-IN-C5V-KYM";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="register" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join the Program Now</h2>
        <p className="text-slate-500 dark:text-slate-400">Registrations are open. Start your Google Cloud Arcade journey today.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Registration Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden group border border-blue-100 dark:border-blue-900/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4285F4]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold font-display mb-4">Registration Form</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
            Register to participate in the Google Cloud Arcade Facilitator Program 2026. Make sure to use the referral code below!
          </p>
          <a href="https://docs.google.com/forms/?authuser=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#4285F4] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center shadow-lg shadow-blue-500/20">
            Open Registration Form <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-slate-500 mt-3 text-center sm:text-left">
            Ensure you have copied the Facilitator Code before filling the form.
          </p>
        </motion.div>

        {/* Code Card */}
        <motion.div 
           whileHover={{ y: -5 }}
          className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden group border border-green-100 dark:border-green-900/30"
        >
           <div className="absolute top-0 left-0 w-32 h-32 bg-[#34A853]/10 rounded-br-full -z-10 group-hover:scale-110 transition-transform" />
           <h3 className="text-2xl font-bold font-display mb-4">Facilitator Code</h3>
           <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
            Copy this unique community code and paste it in the registration form to join our tracking dashboard.
          </p>
          
          <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-2 items-center justify-between border border-slate-200 dark:border-slate-800">
            <code className="text-lg font-mono font-bold text-[#34A853] px-4 tracking-wider">{code}</code>
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center p-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-700 dark:text-slate-300"
              title="Copy Code"
            >
              {copied ? <CheckCircle2 className="h-5 w-5 text-[#34A853]" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          {copied && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-[#34A853] text-sm font-medium mt-3"
            >
              Code copied to clipboard!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
