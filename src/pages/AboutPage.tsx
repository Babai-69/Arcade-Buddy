import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, Users, Layers, Rocket, ShieldAlert, Cloud, Code, GitMerge, FileText, Gift, Award, Zap, Terminal, Database, Shield, HelpCircle, LayoutGrid, Gamepad2 } from 'lucide-react';
import { FacilitatorCards } from '../components/FacilitatorCards';
import { SupportSection } from '../components/SupportSection';

export function AboutPage() {
  return (
    <div className="min-h-screen font-sans flex flex-col font-medium relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">
          <Link to="/" className="hover:text-indigo-500 transition-colors">&larr; HOME</Link> 
          &nbsp;&middot;&nbsp; 
          <span className="text-indigo-500 dark:text-indigo-400">ABOUT PROGRAM</span>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            About the <span className="text-[#7C3AED] dark:text-[#a78bfa]">Program</span><br/>
            <span className="text-[#7C3AED] dark:text-[#a78bfa]">Arcade</span> <span className="bg-[#FBBC04] text-slate-900 px-3 py-1.5 rounded-lg shadow-sm inline-block transform -rotate-1 mt-1">Buddy Platform</span>
          </h1>
        </div>

        {/* Animated SVG Header */}
        <div className="w-full flex flex-col items-center mb-12">
          <img 
            src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1785227440/arcade_buddy_loop_usjvw7.svg" 
            alt="Arcade Buddy Loop" 
            className="w-64 md:w-96 lg:w-[800px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Important Note */}
        <div className="bg-[#FFFBEB] border border-[#FEF08A] dark:bg-[#433716]/30 dark:border-[#85712c] rounded-xl p-5 mb-16 max-w-4xl w-full flex gap-4 text-left shadow-sm">
          <div className="mt-0.5 shrink-0">
            <ShieldAlert className="w-5 h-5 text-[#D97706] dark:text-[#FBBF24]" />
          </div>
          <div>
            <h4 className="font-bold text-[#92400E] dark:text-[#FDE68A] text-sm mb-1">Important Note</h4>
            <p className="text-[#B45309] dark:text-[#FCD34D] text-[13.5px] sm:text-sm leading-relaxed">
              Although this site offers details about The Arcade, please note that our <a href="https://arcade-buddy.onrender.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline cursor-pointer">Google Cloud Arcade Buddy</a> is an independent, unofficial tool and has no connection to or endorsement from Google. For accurate and official information about the Arcade program, including any support needs, please use the official resources listed above or reach out to Google Skills support directly via email: <a href="mailto:support-skills@google.com" className="font-bold hover:underline">support-skills@google.com</a>.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="w-full text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-8 md:p-10 mb-10 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-blue-500/30 dark:border-blue-500/50 shadow-sm mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">⚙️ Mechanics</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
              How Arcade <span className="bg-gradient-to-r from-[#4285F4] to-[#7c3aed] bg-clip-text text-transparent">Works</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <FeatureCard icon={Gamepad2} title="Gamified Learning" desc="Structured challenges that make cloud learning engaging." colorClass="text-indigo-500 dark:text-indigo-400" bgClass="bg-indigo-50 dark:bg-indigo-500/10" dotColor="bg-indigo-500" />
            <FeatureCard icon={FileText} title="Monthly Challenges" desc="New labs and challenges released regularly." colorClass="text-emerald-500 dark:text-emerald-400" bgClass="bg-emerald-50 dark:bg-emerald-500/10" dotColor="bg-emerald-500" />
            <FeatureCard icon={Terminal} title="Hands-on Labs" desc="Practice real-world Google Cloud scenarios." colorClass="text-blue-500 dark:text-blue-400" bgClass="bg-blue-50 dark:bg-blue-500/10" dotColor="bg-blue-500" />
            <FeatureCard icon={Gift} title="Completely Free" desc="Accessible to everyone with no participation cost." colorClass="text-fuchsia-500 dark:text-fuchsia-400" bgClass="bg-fuchsia-50 dark:bg-fuchsia-500/10" dotColor="bg-amber-500" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-8 md:p-10 mb-10 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-green-500/30 dark:border-green-500/50 shadow-sm mb-4">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">🌱 Skill Tree</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
              Skills You Will <span className="bg-gradient-to-r from-[#34A853] to-[#10b981] bg-clip-text text-transparent">Build</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FeatureCard icon={Zap} title="Generative AI" desc="Hands-on with Gemini, Vertex AI, and GenAI workflows." colorClass="text-violet-500 dark:text-violet-400" bgClass="bg-violet-50 dark:bg-violet-500/10" dotColor="bg-violet-500" />
            <FeatureCard icon={Cloud} title="Cloud Fundamentals" desc="BigQuery, Kubernetes, Firebase, networking, and security." colorClass="text-cyan-500 dark:text-cyan-400" bgClass="bg-cyan-50 dark:bg-cyan-500/10" dotColor="bg-cyan-500" />
            <FeatureCard icon={Code} title="Prompt Engineering" desc="Design prompts to maximize AI outputs." colorClass="text-amber-500 dark:text-amber-400" bgClass="bg-amber-50 dark:bg-amber-500/10" dotColor="bg-amber-500" />
            <FeatureCard icon={Database} title="Practical Experience" desc="Real labs to solidify learning through practice." colorClass="text-rose-500 dark:text-rose-400" bgClass="bg-rose-50 dark:bg-rose-500/10" dotColor="bg-rose-500" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="w-full text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-8 md:p-10 mb-10 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-amber-500/30 dark:border-amber-500/50 shadow-sm mb-4">
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">🚀 Path to Success</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
              The <span className="bg-gradient-to-r from-[#FBBC05] to-[#f59e0b] bg-clip-text text-transparent">Journey</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard icon={LayoutGrid} title="Choose Challenges" desc="Select labs based on your interests." colorClass="text-teal-500 dark:text-teal-400" bgClass="bg-teal-50 dark:bg-teal-500/10" />
            <FeatureCard icon={Award} title="Earn Points" desc="Complete labs to earn points and badges." colorClass="text-yellow-500 dark:text-yellow-400" bgClass="bg-yellow-50 dark:bg-yellow-500/10" />
            <FeatureCard icon={Gift} title="Progress & Rewards" desc="Level up and unlock Arcade swags." colorClass="text-pink-500 dark:text-pink-400" bgClass="bg-pink-50 dark:bg-pink-500/10" />
          </div>
        </div>

        {/* Section 4 */}
        <div className="w-full text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-8 md:p-10 mb-10 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-indigo-500/30 dark:border-indigo-500/50 shadow-sm mb-4">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">✨ Platform Info</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
              About <span className="bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">Arcade Buddy</span>
            </h2>
          </motion.div>
          <div className="glass-panel rounded-3xl p-8 md:p-10 text-left shadow-lg max-w-4xl mx-auto relative overflow-hidden group hover:border-blue-200 dark:hover:border-white/10 transition-colors">
             <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Cloud className="w-48 h-48" />
             </div>
             <div className="flex items-center gap-4 mb-6 text-slate-900 dark:text-white font-bold text-xl md:text-2xl relative z-10">
               <div className="bg-white dark:bg-blue-500/20 p-3 rounded-2xl shadow-sm">
                 <Cloud className="w-7 h-7 text-blue-600 dark:text-blue-400" />
               </div>
               Arcade Buddy Platform
             </div>
             <p className="text-slate-600 dark:text-slate-400 text-[15px] md:text-base leading-relaxed relative z-10 max-w-2xl">
               Google Cloud Arcade Buddy is a community-driven learning platform built to support Google Cloud Arcade participants. It helps learners track progress, understand lab workflows, explore Arcade programs, and stay updated with challenges, points, and rewards — all in one place.
             </p>
          </div>
        </div>

        {/* Developer Profile */}
        <div className="w-full max-w-5xl mx-auto mb-16">
           <FacilitatorCards />
        </div>

        {/* Support Section */}
        <div className="w-full max-w-5xl mx-auto mb-16">
           <SupportSection />
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, colorClass = "text-blue-500", bgClass = "bg-blue-50 dark:bg-blue-500/10", dotColor = "bg-blue-500" }: any) {
  return (
    <div className="group relative mt-2 glass-panel p-6 rounded-2xl text-left shadow-sm hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
       <div className="absolute top-0 left-6 -translate-y-1/2 flex items-center h-2">
         <div className={`w-3.5 h-3.5 rounded-full ${dotColor} border-[3px] border-white dark:border-[#0a0e17]`}></div>
         <div className="w-12 h-[1px] bg-slate-200 dark:bg-slate-700 ml-3 hidden sm:block"></div>
       </div>

       <div className="flex items-center gap-4 mb-4">
         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgClass} transition-colors`}>
           <Icon className={`w-5 h-5 ${colorClass}`} />
         </div>
         <div className="text-slate-900 dark:text-white font-bold text-[16px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
           {title}
         </div>
       </div>
       <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed">
         {desc}
       </p>
    </div>
  );
}

function LinkCard({ title, sub, href }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-[#f8f9fc] hover:bg-[#f0f4ff] transition-colors rounded-xl p-3 flex justify-between items-center group border border-transparent hover:border-blue-100">
      <div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{title}</div>
        <div className="text-sm font-semibold text-slate-900">{sub}</div>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
    </a>
  );
}
