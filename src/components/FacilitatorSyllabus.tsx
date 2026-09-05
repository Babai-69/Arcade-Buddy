import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  ExternalLink, Beaker, Coins, Gamepad2, Layers, ChevronDown, ChevronUp, Lock, Copy, Check , Calendar, Gift, Zap, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useArcadeGames } from '../utils/arcadeApi';


const julyGames = [
  { title: "Arcade Base Camp", img: "https://services.google.com/fh/files/misc/basecamp-july.png", code: "LOCKED" },
  { title: "Arcade Adventure", img: "https://services.google.com/fh/files/misc/adv-july.png", code: "LOCKED" },
  { title: "Arcade Voyage", img: "https://services.google.com/fh/files/misc/voyuge-july.png", code: "LOCKED" },
  { title: "Arcade Trail", img: "https://services.google.com/fh/files/misc/trail-july.png", code: "LOCKED" },
  { title: "Arcade Simulator", img: "https://services.google.com/fh/files/misc/special-july.png", code: "LOCKED" },
  { title: "Safe Spaces", img: "https://services.google.com/fh/files/misc/new-special-game.png", code: "LOCKED" }
];

const augustGames = [
  { title: "Arcade Base Camp", img: "https://cdn.qwiklabs.com/nXo%2Bc%2FLavbtJXZma1hYLmBxApy6Cr6CZiR1Bnukj5dk%3D", code: "LOCKED" },
  { title: "Arcade Adventure: Data Vault", img: "https://cdn.qwiklabs.com/vQwBzyge8g7JI%2Fs9rWfu%2BvXJurcIOnP0A9wKR7U4i14%3D", code: "LOCKED" },
  { title: "Arcade Voyage: Google Sheets", img: "https://cdn.qwiklabs.com/yn3KXIRZy6Md4qAEmKiYk6SEuHg0a7gDEaqc2H4o1Cs%3D", code: "LOCKED" },
  { title: "Arcade Trail: Cloud Delivery Systems", img: "https://cdn.qwiklabs.com/fRCfiQc6gVA%2BSEUkSvc7agSfPUGUiHmYaI4kslS9mSw%3D", code: "LOCKED" },
  { title: "Arcade Simulator: Network Security Engineer", img: "https://cdn.qwiklabs.com/KU0Jp50XMAj26Vmx1iNYlmxJUltgvVVAa3YI0Xgssjg%3D", code: "LOCKED" },
  { title: "Spans and Plans", img: "https://cdn.qwiklabs.com/jf0VYLPQlpqie%2FRI4cjTeBwtiL3xPto3PBIM5b8iSzI%3D", code: "LOCKED" },
];

const beginnerBadges = [
  { title: "Create Your First Gemini Enterprise Application", labs: 1, credits: 0, link: "https://www.skills.google/paths/3546/course_templates/1586" },
  { title: "Develop AI-Powered Prototypes in Google AI Studio", labs: 4, credits: 0, link: "https://www.skills.google/course_templates/1426" },
  { title: "The Basics of Google Cloud Compute", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/754" },
  { title: "Implement Event-Driven Messaging and Automation Workflows", labs: 3, credits: 2, link: "https://www.skills.google/course_templates/728" },
  { title: "Implement Cloud Storage and Data Protection Solutions", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/725" },
  { title: "Create a Streaming Data Lake on Cloud Storage", labs: 4, credits: 3, link: "https://www.skills.google/course_templates/705" },
  { title: "Deploy and Manage Applications on Google App Engine", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/671" },
  { title: "Implement Speech and Language Solutions with Pre-trained APIs", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/700" },
  { title: "Using the Google Cloud Speech API", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/756" },
  { title: "Analyze Speech and Language with Google APIs", labs: 4, credits: 8, link: "https://www.skills.google/course_templates/634" },
  { title: "Store, Process, and Manage Data on Google Cloud - Console", labs: 4, credits: 3, link: "https://www.skills.google/course_templates/658" },
  { title: "Store, Process, and Manage Data on Google Cloud - Command Line", labs: 4, credits: 3, link: "https://www.skills.google/course_templates/659" },
  { title: "Migrate MySQL Data to Cloud SQL Using Database Migration Service", labs: 5, credits: 5, link: "https://www.skills.google/course_templates/629" },
  { title: "Get Started with Sensitive Data Protection", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/750" },
  { title: "Analyze Images with the Cloud Vision API", labs: 4, credits: 12, link: "https://www.skills.google/course_templates/633" },
  { title: "Build Event-Driven Applications with Eventarc", labs: 4, credits: 3, link: "https://www.skills.google/course_templates/727" },
  { title: "Configure Service Accounts and IAM Roles for Google Cloud", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/702" }
];

const intermediateBadges = [
  { title: "Engineer AI Agents with Agent Development Kit (ADK)", labs: 1, credits: 5, link: "https://www.skills.google/course_templates/1596" },
  { title: "Build Real World AI Applications with Gemini and Imagen", labs: 4, credits: 0, link: "https://www.skills.google/course_templates/1076" },
  { title: "Build a Smart Cloud Application with Vibe Coding and MCP", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/1459" },
  { title: "Implement Cloud Collaboration and Productivity Workflows", labs: 7, credits: 0, link: "https://www.skills.google/course_templates/676" },
  { title: "Analyze BigQuery Data in Connected Sheets", labs: 4, credits: 0, link: "https://www.skills.google/course_templates/632" },
  { title: "Streaming Analytics into BigQuery", labs: 4, credits: 2, link: "https://www.skills.google/course_templates/752" },
  { title: "Create a Secure Data Lake on Cloud Storage", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/704" },
  { title: "Secure Lakehouse Data", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/751" },
  { title: "Enrich Metadata and Discovery of Lakehouse Data", labs: 4, credits: 3, link: "https://www.skills.google/course_templates/753" },
  { title: "Monitor and Manage Google Cloud Resources", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/653" },
  { title: "Monitor and Log with Google Cloud Observability", labs: 5, credits: 9, link: "https://www.skills.google/course_templates/749" },
  { title: "Set Up a Google Cloud Network", labs: 4, credits: 8, link: "https://www.skills.google/course_templates/641" },
  { title: "Integrate BigQuery Data and Google Workspace using Apps Script", labs: 4, credits: 2, link: "https://www.skills.google/course_templates/737" },
  { title: "Engineer Data for Predictive Modeling with BigQuery ML", labs: 4, credits: 15, link: "https://www.skills.google/course_templates/627" },
  { title: "Implement DevOps Workflows in Google Cloud", labs: 4, credits: 16, link: "https://www.skills.google/course_templates/716" },
  { title: "Create ML Models with BigQuery ML", labs: 5, credits: 11, link: "https://www.skills.google/course_templates/626" },
  { title: "Build a Website on Google Cloud", labs: 5, credits: 13, link: "https://www.skills.google/course_templates/638" }
];

const advancedBadges = [
  { title: "Explore Generative AI in Agent Platform", labs: 4, credits: 16, link: "https://www.skills.google/course_templates/959" },
  { title: "Implementing Cloud Load Balancing for Compute Engine", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/648" },
  { title: "Prompt Design in Agent Platform", labs: 4, credits: 4, link: "https://www.skills.google/course_templates/976" },
  { title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG", labs: 4, credits: 20, link: "https://www.skills.google/course_templates/981" },
  { title: "Develop GenAI Apps with Gemini and Streamlit", labs: 5, credits: 20, link: "https://www.skills.google/course_templates/978" },
  { title: "Set Up an App Dev Environment on Google Cloud", labs: 10, credits: 8, link: "https://www.skills.google/course_templates/637" },
  { title: "Develop Your Google Cloud Network", labs: 6, credits: 18, link: "https://www.skills.google/course_templates/625" },
  { title: "Build a Secure Google Cloud Network", labs: 6, credits: 30, link: "https://www.skills.google/course_templates/654" },
  { title: "Deploy Kubernetes Applications on Google Cloud", labs: 4, credits: 12, link: "https://www.skills.google/course_templates/663" },
  { title: "Derive Insights from BigQuery Data", labs: 7, credits: 6, link: "https://www.skills.google/course_templates/623" },
  { title: "Build LookML Objects in Looker", labs: 5, credits: 0, link: "https://www.skills.google/course_templates/639" },
  { title: "Manage Data Models in Looker", labs: 6, credits: 0, link: "https://www.skills.google/course_templates/651" },
  { title: "Prepare Data for Looker Dashboards and Reports", labs: 5, credits: 0, link: "https://www.skills.google/course_templates/628" },
  { title: "Develop Serverless Apps with Firebase", labs: 4, credits: 16, link: "https://www.skills.google/course_templates/649" },
  { title: "Cloud Architecture: Design, Implement, and Manage", labs: 6, credits: 32, link: "https://www.skills.google/course_templates/640" },
  { title: "Build Global and Regional Load Balancing Solutions", labs: 4, credits: 20, link: "https://www.skills.google/course_templates/1558" },
  { title: "Google DeepMind: Train A Small Language Model", labs: 1, credits: 5, link: "https://www.skills.google/course_templates/1453" }
];

const BadgeCard: React.FC<{ badge: any }> = ({ badge }) => {
  return (
    <div className="bg-transparent rounded-xl border border-slate-200/60 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col h-full hover:border-slate-300 dark:hover:border-slate-600">
      <div className="p-6 flex-1 flex flex-col">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {badge.title}
        </h4>
        <div className="mt-auto flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Beaker className="w-4 h-4" />
            {badge.labs} Labs
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            <Coins className="w-4 h-4" />
            {badge.credits} Credits
          </span>
        </div>
      </div>
      <a 
        href={badge.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-6 py-3 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        Open Skill Badge
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function AccordionSection({ title, isOpen, onToggle, children }: { title: React.ReactNode, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) {
  return (
       <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-800"
      >
        <span className="font-medium text-slate-900 dark:text-white text-lg">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0 ml-4" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 ml-4" />}
      </button>
      {isOpen && (
        <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/50">
          {children}
        </div>
      )}
    </div>
  );
}

export function FacilitatorSyllabus() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { activeGames, loading, error } = useArcadeGames();

  const currentMonth = new Date().getMonth(); // 0 = Jan ... 5 = Jun, 6 = Jul, 7 = Aug, 8 = Sep
  
  const isJulyActive = currentMonth === 6;
  const isJulyPast = currentMonth > 6;
  
  const isAugustActive = currentMonth === 7;
  const isAugustPast = currentMonth > 7;

  const isSeptemberActive = currentMonth === 8;
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  return (
    <section className="pb-12 bg-transparent pt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">
            <Link to="/" className="hover:text-indigo-500 transition-colors">&larr; HOME</Link> 
            &nbsp;&middot;&nbsp; 
            <span className="text-indigo-500 dark:text-indigo-400">SYLLABUS</span>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Syllabus for the <span className="text-[#7C3AED] dark:text-[#a78bfa]">Program</span><br/>
              <span className="text-[#7C3AED] dark:text-[#a78bfa]">Arcade</span> <span className="bg-[#FBBC04] text-slate-900 px-3 py-1.5 rounded-lg shadow-sm inline-block transform -rotate-1 mt-1">Games & Badges</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-[15px]">
            While you can find all the active games on the <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Google Skills Arcade website</a> directly, we are maintaining a copy of the same here so that it becomes easier for you to find badges and complete them to earn "Arcade Points". 
            <br/><br/>
            (<Link to="/resources/point-system" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">See points system</Link> for more details)
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-[#FFFBEB] border border-[#FEF08A] dark:bg-[#433716]/30 dark:border-[#85712c] rounded-xl p-5 mb-20 max-w-4xl mx-auto flex gap-4 text-left shadow-sm">
          <div className="mt-0.5">
            <Info className="w-5 h-5 text-[#D97706] dark:text-[#FBBF24]" />
          </div>
          <div>
            <h4 className="font-bold text-[#92400E] dark:text-[#FDE68A] text-sm mb-1">Recommended Strategy</h4>
            <p className="text-sm text-[#B45309] dark:text-[#FCD34D] leading-relaxed">
              It's better to complete the Arcade games first since they have a deadline in a given month. Complete as many skill badges as you can later to earn more "Arcade Points".
            </p>
          </div>
        </div>

        {/* GEAR Badges Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-blue-500 fill-current" /> GEAR Badges - Facilitator 2026
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Earn both on your Google Developer Profile to qualify for Bonus Points when you reach a milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Badge 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white dark:bg-[#1a1d27] rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              {/* Top half: gradient background */}
              <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-600 relative flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-20">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-xs font-bold text-blue-600">GEAR</span>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-3 right-3 bg-amber-400 px-3 py-1 rounded-full shadow-md z-20"
                >
                  <span className="text-xs font-bold text-amber-900">Required</span>
                </motion.div>
                
                <img 
                  src="https://developers.google.com/static/profile/badges/community/gear/badge.svg" 
                  alt="GEAR Program Enrolment Badge"
                  className="w-28 h-28 object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Bottom half: details */}
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">GEAR Program Enrolment Badge</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Deadline: 14/09/26, 11:59 PM</span>
                </div>
                <a 
                  href="https://developers.google.com/program/gear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  View Badge <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Badge 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white dark:bg-[#1a1d27] rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              {/* Top half: gradient background */}
              <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-600 relative flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-20">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-xs font-bold text-blue-600">GEAR</span>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-3 right-3 bg-amber-400 px-3 py-1 rounded-full shadow-md z-20"
                >
                  <span className="text-xs font-bold text-amber-900">Required</span>
                </motion.div>
                
                <img 
                  src="https://developers.google.com/static/profile/badges/community/gear/arcade/badge.png" 
                  alt="Arcade - GEAR Badge"
                  className="w-32 h-32 object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Bottom half: details */}
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">Arcade - GEAR Badge</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Deadline: 14/09/26, 11:59 PM</span>
                </div>
                <a 
                  href="https://developers.google.com/profile/badges/community/gear/arcade/award"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  View Badge <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Warning Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              boxShadow: ['0px 0px 0px rgba(245, 158, 11, 0)', '0px 0px 15px rgba(245, 158, 11, 0.3)', '0px 0px 0px rgba(245, 158, 11, 0)'],
              borderColor: ['rgba(253, 230, 138, 1)', 'rgba(245, 158, 11, 0.6)', 'rgba(253, 230, 138, 1)']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="max-w-4xl mx-auto bg-[#fffbeb] dark:bg-amber-500/10 rounded-xl p-5 flex gap-4 items-start shadow-sm relative overflow-hidden border-2"
          >
            <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 h-full"></div>
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <p className="text-base md:text-lg text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              Earning BOTH the <a href="https://youtu.be/_vTVDxbVlhQ" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline font-bold">GEAR program enrollment badge</a> & <a href="https://youtu.be/HdmX2tQFRVI?si=09aPtP7WVp3A9Xa0" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline font-bold">Arcade - GEAR badge</a> on your Google Developer Profile is <strong className="text-red-600 dark:text-red-400 font-extrabold uppercase bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded shadow-sm inline-block transform -rotate-1">MANDATORY / REQUIRED</strong> for you to be eligible to receive <strong>Bonus Points</strong> when you reach a milestone.
            </p>
          </motion.div>

          {/* Guide Section Link */}
          <div className="mt-8 flex justify-center">
             <Link to="/resources/gear-badges" className="bg-[#eff6ff] hover:bg-[#dbeafe] dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-bold py-3.5 px-6 rounded-xl flex items-center gap-3 transition-colors shadow-sm">
               <Info className="w-5 h-5" />
               View Guide: How to Get GEAR Badges
             </Link>
          </div>
        </div>

{/* Arcade Games Section */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-10 mb-8 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-blue-500/30 dark:border-blue-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(66,133,244,0.3)] mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">🎮 Updated Monthly</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-[#4285F4] to-[#7c3aed] bg-clip-text text-transparent">Arcade</span> Games
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
              Complete these games to earn Arcade Points. Typically 6 new games release every month, plus extra chances!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-blue-500 dark:text-blue-400 text-lg">🎮</span> 6+ Games/Month
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-amber-500 dark:text-amber-400 text-lg">⏱️</span> Limited Seats
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-green-500 dark:text-green-400 text-lg">⭐</span> 1 Point Each
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#4285F4]/5 border border-[#4285F4]/20 rounded-2xl p-5 md:p-6 mb-10"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4 border-l-4 border-amber-500 pl-4 py-1">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white mr-2">💡 Recommended:</span>
                  Complete Arcade Games first — they have monthly deadlines. Skill badges can be done anytime.
                </p>
              </div>
              <div className="flex items-start gap-4 border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white mr-2">📌</span>
                  In 2 months you can earn up to 18 game badges (Adventure, Trail, Voyage, Base Camp for each month).
                </p>
              </div>
            </div>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">September 2026 Games</h3>
              {isSeptemberActive ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active Now
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  Locked
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium">
                August 2026 
                {isAugustActive ? (
                  <span className="text-green-600 dark:text-green-400 ml-1">— Active Now</span>
                ) : (
                  <span className="opacity-70 ml-1">— Closed</span>
                )}
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hidden md:block">
                July 2026 
                {isJulyActive ? (
                  <span className="text-green-600 dark:text-green-400 ml-1">— Active Now</span>
                ) : (
                  <span className="opacity-70 ml-1">— Closed</span>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isSeptemberActive && activeGames.length > 0 ? activeGames.map((game, idx) => (
              <motion.div 
                key={`september-active-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center group hover:border-[#4285F4] dark:hover:border-[#4285F4] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(66,133,244,0.15)] dark:hover:shadow-[0_8px_30px_rgba(66,133,244,0.2)] transition-all duration-300"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0d1117] flex items-center justify-center mb-6">
                  <img 
                    src={game.img} 
                    alt={game.title || `Game ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="w-full mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{game.title || `Game ${idx + 1}`}</h4>
                    <span className="px-2.5 py-1 rounded bg-green-50 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Access Code</p>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10 transition-colors">
                      <code className={`font-mono text-sm ${game.code === "Coming Soon!" ? "text-amber-600 dark:text-amber-400 font-sans font-medium" : "text-green-600 dark:text-green-400"}`}>
                        {game.code || "Coming Soon!"}
                      </code>
                      <button 
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                        onClick={() => {
                          if (game.code && game.code !== "Coming Soon!") {
                            navigator.clipboard.writeText(game.code);
                          }
                        }}
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <a 
                      href={game.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#3367d6] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Challenge <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )) : [1, 2, 3].map((_, idx) => (
              <motion.div 
                key={`august-soon-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="bg-slate-50/80 dark:bg-[#1a1d27]/40 border border-slate-200 dark:border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden opacity-60"
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Lock className="w-16 h-16 text-slate-400 opacity-80" />
                </div>
                
                <div className="w-full aspect-square bg-slate-200/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 mb-6 z-10">
                  <span className="text-xs font-medium text-slate-500">Aug 2026</span>
                </div>
                <div className="w-full mt-auto z-10 text-center">
                  <h4 className="font-medium text-slate-500 dark:text-slate-400 text-lg mb-2">Locked</h4>
                  <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center mb-10">
            <p className="text-sm font-medium text-slate-500 mb-3">
              This month: {activeGames.length} of {activeGames.length > 0 ? activeGames.length : 3} games shown 
            </p>
            <div className="w-full max-w-md h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              August 2026 — {isAugustActive ? "Active" : "Closed"}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {augustGames.map((game, idx) => {
              const gameName = game.title || `Game ${idx + 1}`;
              
              return (
                <motion.div 
                  key={`august-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center group transition-all duration-300 opacity-60"
                >
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Lock className="w-16 h-16 text-slate-400 opacity-80" />
                  </div>
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0d1117] flex items-center justify-center mb-6">
                    <img 
                      src={game.img} 
                      alt={gameName} 
                      className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="w-full mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{gameName}</h4>
                      <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold">
                        CLOSED
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 mb-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Access Code</p>
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/5 opacity-50 cursor-not-allowed">
                        <code className="font-mono text-sm text-slate-400">
                          LOCKED
                        </code>
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              July 2026 — {isJulyActive ? "Active" : "Closed"}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {julyGames.map((game, idx) => {
              const gameName = game.title || `Game ${idx + 1}`;
              
              if (isJulyActive) {
                // If by some reason it is July (e.g. testing), we could show them as active
                // but since activeGames would fetch July games if it were July, we just use activeGames here if we wanted.
                // However, let's keep it simple and just show locked since it's August now.
              }

              return (
                <motion.div 
                  key={`july-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center group transition-all duration-300 opacity-60"
                >
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Lock className="w-16 h-16 text-slate-400 opacity-80" />
                  </div>
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0d1117] flex items-center justify-center mb-6">
                    <img 
                      src={game.img} 
                      alt={gameName} 
                      className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="w-full mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{gameName}</h4>
                      <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold">
                        JUL 2026
                      </span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Access Code</p>
                      <p className="text-slate-500 font-medium">CLOSED</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Learning Path Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 dark:bg-slate-900 w-full rounded-2xl p-10 mb-10 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-amber-500/30 dark:border-amber-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(251,188,5,0.3)] mb-4">
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">🎯 Learning Paths</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Google Cloud <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">Skill</span> Badges
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
            Choose your learning path based on your experience level and master Google Cloud and AI technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="text-blue-500 dark:text-blue-400 text-lg">📈</span> 3 Levels
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="text-amber-500 dark:text-amber-400 text-lg">🏆</span> 51 Badges Total
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="text-green-500 dark:text-green-400 text-lg">⭐</span> 2 Badges = 1 Point
            </div>
          </div>
        </motion.div>

        {/* Fast-Track Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#FFFAF0] dark:bg-amber-900/10 border border-[#FBE6A2] dark:border-amber-500/20 rounded-2xl p-5 md:p-7 mb-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 shadow-sm w-full"
        >
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDF1D5] dark:bg-amber-500/20 rounded-md text-xs font-bold text-[#B46B18] dark:text-amber-500 tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-current" /> FAST-TRACK SKILL BADGES
            </div>
            
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              Skip Preparatory Labs & Take Only the Challenge Lab!
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Unlike Game Badges (which require completing every lab under the badge), <strong className="text-slate-900 dark:text-white">Skill Badges</strong> can be earned instantly by skipping preparatory labs and directly completing only the final <strong className="text-[#F59E0B] dark:text-amber-500">Challenge Lab</strong>.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Click any Skill Badge link below to open its course page. Then, locate and click the option to take the challenge (as shown in the preview) to jump straight to the Challenge Lab!
            </p>
          </div>
          
          <div className="w-full lg:w-[40%] max-w-[420px] shrink-0 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-slate-700 shadow-md">
            <img 
              src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1788548209/Screenshot_2026-09-05_002616_fhtlcf.png" 
              alt="Challenge Lab Preview" 
              className="w-full h-auto transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
            />
          </div>
        </motion.div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-10">
          
          <AccordionSection 
            title="Beginner: Get Started with Google Cloud & AI (17 Skill Badges)"
            isOpen={openSections.includes('beginner')}
            onToggle={() => toggleSection('beginner')}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
                Perfect for newcomers starting their Google Cloud and AI journey. These skill badges introduce cloud fundamentals, AI tools, storage, networking, databases, and application deployment.
              </p>
              <div className="shrink-0 inline-flex flex-wrap items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">65 Labs</span>
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">67 Credits</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beginnerBadges.map((badge, idx) => (
                <BadgeCard key={idx} badge={badge} />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection 
            title="Intermediate: Dive Deeper into Google Cloud & AI (17 Skill Badges)"
            isOpen={openSections.includes('intermediate')}
            onToggle={() => toggleSection('intermediate')}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
                Build production-ready cloud solutions while exploring AI applications, observability, networking, security, data engineering, DevOps, and machine learning.
              </p>
              <div className="shrink-0 inline-flex flex-wrap items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">71 Labs</span>
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">100 Credits</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {intermediateBadges.map((badge, idx) => (
                <BadgeCard key={idx} badge={badge} />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection 
            title="Advanced: Take your Google Cloud & AI Skills to Next Level (17 Skill Badges)"
            isOpen={openSections.includes('advanced')}
            onToggle={() => toggleSection('advanced')}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
                Master advanced cloud architecture, networking, Kubernetes, GenAI applications, Looker analytics, Firebase, multimodal AI, and enterprise-scale cloud solutions.
              </p>
              <div className="shrink-0 inline-flex flex-wrap items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">89 Labs</span>
                <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">211 Credits</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedBadges.map((badge, idx) => (
                <BadgeCard key={idx} badge={badge} />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection 
            title="Looking for more Skill Badges?"
            isOpen={openSections.includes('more')}
            onToggle={() => toggleSection('more')}
          >
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
              Since, we only have a list of 51 skill badges here, in order to earn the ultimate milestone, you will have to search for 15 more skill badges and complete them from our <a href="https://docs.google.com/spreadsheets/d/19Eql1t6lbqZQAzL2URepijHp7cdiTW1JHQTtt-mLsdc/edit?gid=678806814#gid=678806814" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">catalog here</a>.
            </p>
          </AccordionSection>

        </div>

        {/* Verify Completion Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Verify Completion</h2>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Use the <strong className="text-slate-900 dark:text-white">Arcade Buddy Points Calculator</strong> to:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Track earned badges</span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Filter incomplete ones</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Sort badges by difficulty</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">Monitor your progress</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/my-progress"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-md shadow-blue-500/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              View My Progress
            </Link>
            
            <Link 
              to="/calculator" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-md shadow-[#7C3AED]/20"
            >
              Calculate My Points
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

