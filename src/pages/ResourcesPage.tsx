import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LabLimitAnimation } from '../components/LabLimitAnimation';

const resources = [
  {
    category: "GUIDE",
    title: "Quick-Start Guide 2026",
    description: "Step-by-step guide to quickly get started with Google Arcade, including account setup, navigation tips, and earn your first badges.",
    linkText: "View Slide ➠",
    link: "https://docs.google.com/document/d/1qsUsSBboyJ1Y1-TJJw0W8JH5WTppdcqfkeo5qw4KD8Q/edit?usp=sharing",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776604089/pre_assess_light_1_eoihas.png",
    bg: "bg-blue-50 dark:bg-slate-800",
  },
  {
    category: "DOCS",
    title: "Skill Badges List",
    description: "Comprehensive list of all available skill badges in Google Cloud Arcade with detailed information and requirements.",
    linkText: "View Badges ➠",
    link: "https://docs.google.com/spreadsheets/d/19Eql1t6lbqZQAzL2URepijHp7cdiTW1JHQTtt-mLsdc/edit?gid=678806814#gid=678806814",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603557/Skill_Badge_Light_1_lpitew.png",
    bg: "bg-green-50 dark:bg-slate-800",
  },
  {
    category: "DOCS",
    title: "Lab-free Courses",
    description: "Comprehensive list of all available lab-free courses in Google Cloud Arcade Facilitator Program's Syllabus.",
    linkText: "View Courses ➠",
    link: "https://docs.google.com/spreadsheets/d/1iX6FM28pmS5pWym0D-9tNh18jOhY7c7PareuK36NcN0/edit?usp=sharing",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603346/Lab_free_Dark_1_i4tgsn.png",
    bg: "bg-purple-50 dark:bg-slate-800",
  },
  {
    category: "GUIDE",
    title: "Prize Counter Guide",
    description: "Learn how to use the Prize Counter tool to track your rewards and prizes.",
    linkText: "View Slide ➠",
    link: "https://docs.google.com/document/d/1qvB9uGy3AG6k843OaSa2jVTroNusWx-dJiR8OYiLyVc/edit?usp=sharing",
    internal: false,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/4X/1/f/c/1fcc37481bf9ff636fa48fcd0314773f4e87f0cc.gif",
    bg: "bg-orange-50 dark:bg-slate-800",
  },
  {
    category: "EVENT",
    title: "Arcade Facilitator Program",
    description: "Join the Arcade Facilitator Program under my guidance to earn bonus points, enhance your Google Cloud skills, and get exclusive learning opportunities.",
    linkText: "Join Now→",
    link: "https://arcade-buddy.vercel.app/facilitator",
    internal: false,
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
    id: "free-credits",
    category: "VIDEO",
    title: "How to Claim Free Credits",
    description: "Learn how to get free credits to complete your labs.",
    linkText: "CHECK IT ➡",
    link: "#",
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
  }
];

export function ResourcesPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Resources & Guides</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore guides, tutorials, and community resources to enhance your Google Cloud Arcade journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((item, idx) => (
          <div key={idx} className={`glass-card flex flex-col h-full ${item.bg} overflow-hidden`}>
            {item.image && (
              <div className="w-full h-48 md:h-56 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-[#34A853] bg-[#34A853]/10 self-start px-2 py-1 rounded-md mb-3 tracking-wide">
                {item.category}
              </div>
              
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">{item.description}</p>
              
              {item.id ? (
                <button 
                  onClick={(e) => { e.preventDefault(); setActiveModal(item.id as string); }} 
                  className="self-start inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-auto"
                >
                  {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-1 font-black text-lg leading-none">➡</strong>
                </button>
              ) : item.internal ? (
                <Link to={item.link} className="self-start inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform mt-auto">
                  {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-1 font-black text-lg leading-none">➡</strong>
                </Link>
              ) : (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform mt-auto">
                  {item.linkText.replace(/[➡→➠]/g, '').trim()} <strong className="ml-1 font-black text-lg leading-none">➡</strong>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

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

      {activeModal === 'free-credits' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-50 border border-slate-200 dark:border-slate-800">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full relative bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/JA4RqST1DMQ?autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="p-6 md:p-8">
              <div className="inline-flex text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-md mb-4 tracking-wide items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Video
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-3">How to Claim Free Credits</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Watch this step-by-step video to learn how to get free credits for your Arcade journey. Follow along to ensure you never run out of credits while completing your labs.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
