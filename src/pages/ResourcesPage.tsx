import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, X, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LabLimitAnimation } from '../components/LabLimitAnimation';

const resources = [
  {
    category: "GUIDE",
    title: "Quick-Start Guide 2026",
    description: "Step-by-step guide to quickly get started with Google Arcade, including account setup, navigation tips, and earn your first badges.",
    linkText: "CHECK IT ➡",
    link: "/quick-start",
    internal: true,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776604089/pre_assess_light_1_eoihas.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776604136/pre_assess_light_3_jqpblf.png",
    bg: "bg-blue-50 dark:bg-slate-800",
  },
  {
    category: "GUIDE",
    title: "Skill Badges List",
    description: "Comprehensive list of all available skill badges in Google Cloud Arcade with detailed information and requirements.",
    linkText: "View Badges ➠",
    link: "https://docs.google.com/spreadsheets/d/19Eql1t6lbqZQAzL2URepijHp7cdiTW1JHQTtt-mLsdc/edit?gid=678806814#gid=678806814",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603557/Skill_Badge_Light_1_lpitew.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603498/Skill_Badge_Dark_negpxy.png",
    bg: "bg-green-50 dark:bg-slate-800",
  },
  {
    category: "GUIDE",
    title: "Lab-free Courses",
    description: "Comprehensive list of all available lab-free courses in Google Cloud Arcade Facilitator Program's Syllabus.",
    linkText: "View Courses ➠",
    link: "https://docs.google.com/spreadsheets/d/1iX6FM28pmS5pWym0D-9tNh18jOhY7c7PareuK36NcN0/edit?usp=sharing",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603346/Lab_free_Dark_1_i4tgsn.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603346/Lab_free_Dark_q5erfq.png",
    bg: "bg-purple-50 dark:bg-slate-800",
  },
  {
    category: "GUIDE",
    title: "Prize Counter Guide",
    description: "Learn how to use the Prize Counter tool to track your rewards and prizes.",
    linkText: "View Guide ➡",
    link: "/resources/prize-counter-guide",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/a/b/ab1726e7ea048576b7df5c7762269cebd445a122.gif",
    bg: "bg-orange-50 dark:bg-slate-800",
  },
  {
    category: "GUIDE",
    title: "GEAR Badges - Facilitator 2026",
    description: "Learn how to claim GEAR Badges on your Google Developer Profile for the Arcade Facilitator Program.",
    linkText: "View Guide ➡",
    link: "/resources/gear-badges",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/2/d/2dec3320e1d5a80276e302d54a9237ceb53be0f5.gif",
    bg: "bg-blue-50 dark:bg-slate-800",
  },
  {
    category: "GALLERY",
    title: "Swag Tiers & Winner Showcase Gallery",
    description: "Explore official 2026 Arcade Prize Tiers, past collections, and the Hall of Swag Winners.",
    linkText: "View Gallery ➡",
    link: "/resources/swag-showcase-page",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/c/9/c9510d1f0ec87f932f291138a04ba9e0d6a5722d.gif",
    bg: "bg-green-50 dark:bg-slate-800",
  },
  {
    category: "EVENT",
    title: "Arcade Facilitator Program",
    description: "Join the Arcade Facilitator Program under my guidance to earn bonus points, enhance your Google Cloud skills, and get exclusive learning opportunities.",
    linkText: "Join Now→",
    link: "/facilitator",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1781892327/1_w99okg.png",
    bg: "bg-red-50 dark:bg-slate-800",
  },
  {
    category: "INFO",
    title: "How to find your public profile URL",
    description: "Learn how to locate and share your public profile URL in Google Cloud Skills Boost to track progress.",
    linkText: "Read More→",
    link: "/public-profile-help",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1781892328/2_pg7die.png",
    bg: "bg-yellow-50 dark:bg-slate-800",
  },
  {
    id: "lab-limit",
    category: "INFO",
    title: "Daily Lab Limit — How it works",
    description: "Understand the daily lab limits, what happens when you exceed them, and how to track your progress.",
    linkText: "Read More ➡",
    link: "#",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782318350/12_a0wpls.png",
    bg: "bg-blue-50 dark:bg-slate-800",
  },
  {
    category: "VIDEO",
    title: "How to Claim Free Credits",
    description: "Learn how to get free credits to complete your labs.",
    linkText: "CHECK IT ➡",
    link: "/free-credits",
    internal: true,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776605639/free_credits_jw8ean.png",
    bg: "bg-emerald-50 dark:bg-slate-800",
  },
  {
    id: "tier-waterfall",
    category: "INFO",
    title: "Tier Swag Distribution System",
    description: "Understand the Google Cloud Arcade 2026 Waterfall Tier System.",
    linkText: "CHECK IT ➡",
    link: "#",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782320743/image_nnuehs.png",
    bg: "bg-purple-50 dark:bg-slate-800",
  },
  {
    category: "INFO",
    title: "Google Cloud Arcade points system",
    description: "Complete breakdown of how Arcade points are earned, how Skill Badges and Game Badges are calculated, and how Facilitator Bonus Milestones boost your total score.",
    linkText: "View System ➡",
    link: "/resources/point-system",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/4X/1/f/c/1fcc37481bf9ff636fa48fcd0314773f4e87f0cc.gif",
    bg: "bg-blue-50 dark:bg-slate-800",
  }
];

export function ResourcesPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('ALL');

  useEffect(() => {
    const handleCloseAll = () => setActiveModal(null);
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { ALL: resources.length };
    resources.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    // Ensure order if we want, or just sort alphabetically after ALL
    const keys = Object.keys(counts).filter(k => k !== 'ALL').sort();
    return ['ALL', ...keys].map(k => ({ id: k, count: counts[k] }));
  }, []);

  const filteredResources = useMemo(() => {
    if (activeTab === 'ALL') return resources;
    return resources.filter(r => r.category === activeTab);
  }, [activeTab]);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-black/50 text-[#34A853] text-xs font-bold tracking-widest mb-6 backdrop-blur-sm">
          <Compass className="w-4 h-4" /> RESOURCE HUB
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">Resources & Guides</h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Skill badge sheets, lab-free course lists, milestone guides, and community links to help plan your next move.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === cat.id 
                ? 'bg-blue-400 text-slate-900 shadow-[0_0_20px_rgba(96,165,250,0.5)] dark:shadow-[0_0_20px_rgba(96,165,250,0.3)] transform -translate-y-0.5' 
                : 'bg-white/40 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.id}
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === cat.id 
                ? 'bg-blue-300/50 text-slate-900' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </motion.div>
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredResources.map((item, idx) => (
            <motion.div 
              layout
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`glass-card flex flex-col h-full ${item.bg} overflow-hidden group hover:shadow-[0_0_30px_rgba(66,133,244,0.2)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300`}
            >
              {(item.image || item.imageDark) && (
                <div className="w-full h-48 md:h-56 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {/* Always render images but hide based on dark mode class if both exist, otherwise use the single image */}
                  {item.image && item.imageDark ? (
                    <>
                      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover dark:hidden transition-transform duration-500 group-hover:scale-105" />
                      <img src={item.imageDark} alt={item.title} className="absolute inset-0 w-full h-full object-cover hidden dark:block transition-transform duration-500 group-hover:scale-105" />
                    </>
                  ) : (
                    <img src={item.image || item.imageDark} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  {/* Subtle overlay on hover for extra polish */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Glow behind text on hover (dark mode only) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/0 group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 rounded-full blur-3xl transition-colors duration-500 pointer-events-none" />
                
                <div className="text-xs font-bold text-[#6366F1] dark:text-[#C084FC] bg-indigo-50 dark:bg-[#2A1B4E] self-start px-3 py-1.5 rounded-full mb-4 tracking-wider z-10 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                  {item.category}
                </div>
                
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 z-10">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed z-10">{item.description}</p>
                
                {item.id ? (
                  <button 
                    onClick={(e) => { e.preventDefault(); setActiveModal(item.id as string); }} 
                    className="self-start inline-flex items-center justify-center bg-blue-500 dark:bg-[#2563EB] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors mt-auto shadow-md group-hover:shadow-blue-500/25 z-10"
                  >
                    {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-2 font-black text-lg leading-none group-hover:translate-x-1 transition-transform">↗</strong>
                  </button>
                ) : item.internal ? (
                  <Link to={item.link} className="self-start inline-flex items-center justify-center bg-blue-500 dark:bg-[#2563EB] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors mt-auto shadow-md group-hover:shadow-blue-500/25 z-10">
                    {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-2 font-black text-lg leading-none group-hover:translate-x-1 transition-transform">↗</strong>
                  </Link>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center justify-center bg-blue-500 dark:bg-[#2563EB] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors mt-auto shadow-md group-hover:shadow-blue-500/25 z-10">
                    {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-2 font-black text-lg leading-none group-hover:translate-x-1 transition-transform">↗</strong>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modals */}
      {activeModal === 'tier-waterfall' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)} />
          <div className="relative bg-transparent rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl z-50">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-10 border border-white/20 backdrop-blur-sm">
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full min-h-[600px] bg-[#0d1117] rounded-2xl overflow-hidden border border-slate-700">
              <iframe 
                src="/tier-waterfall.html" 
                className="w-full h-full border-0" 
                style={{ minHeight: '600px' }}
                title="Tier Waterfall Animation"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'lab-limit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-50 border border-slate-200 dark:border-slate-800">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 pt-12 md:p-8 md:pt-14">
              <LabLimitAnimation defaultOpen={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
