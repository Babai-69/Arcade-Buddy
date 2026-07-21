import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Linkedin, Github, Instagram, Globe, Youtube, Send as SendIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import developerImage from '../assets/images/regenerated_image_1782030896719.jpg';
const getIcon = (title: string) => {
  const baseClass = "w-6 h-6";
  switch (title.toLowerCase()) {
    case 'linkedin': return <Linkedin className={`${baseClass} text-[#0077b5]`} />;
    case 'github': return <Github className={`${baseClass} text-slate-900 dark:text-white`} />;
    case 'instagram': return <Instagram className={`${baseClass} text-[#e1306c]`} />;
    case 'youtube': return <Youtube className={`${baseClass} text-[#ff0000]`} />;
    case 'telegram': return <SendIcon className={`${baseClass} text-[#0088cc]`} />;
    case 'portfolio': return <Globe className={`${baseClass} text-emerald-500`} />;
    default: return <ExternalLink className={`${baseClass} text-slate-500`} />;
  }
};

const facilitators = [
  {
    id: 1,
    role: "Individual Developer",
    name: "Abir Dey",
    bio: "I am an independent web developer, tech explorer, and cloud enthusiast. Everything on this platform is designed, coded, and maintained by me. I actively build tools for the Google Cloud Arcade community, helping learners understand labs, track progress, and navigate challenges more efficiently.\n\nI work on multiple personal web projects, with this Arcade Buddy being one of my favorites! I'm also the creator behind Arcade With Us (a dedicated study guide platform designed to help students navigate Google Cloud console setups).",
    image: developerImage,
    tag: "Meet The Facilitator",
    links: [
      { title: "LinkedIn", sub: "Profile", href: "https://www.linkedin.com/in/abir-dey-a34914254/" },
      { title: "GitHub", sub: "@Arcade-With-Us", href: "https://github.com/Arcade-With-Us/" },
      { title: "Instagram", sub: "@dey_babai001", href: "https://www.instagram.com/dey_babai001/" },
      { title: "Portfolio", sub: "@babai", href: "https://abirdey.netlify.app/" },
    ]
  },
  {
    id: 2,
    role: "Content Creator",
    name: "Tripti Gupta",
    bio: "Hello everyone, My name is Tripti Gupta. I'm a B.Tech final year student pursuing a degree in Electronics and Communication Engineering from Dr. B. C. Roy Engineering College. I'm obliged to be your co-facilitator and at the same time very happy to be a partner of Abir Dey in this Arcade Facilitator Journey of 2026.",
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782142565/WhatsApp_Image_2026-06-22_at_20.40.39_zllhbo.jpg",
    tag: "Meet The Co-Facilitator",
    links: [
      { title: "Instagram", sub: "@studywith_tripti", href: "https://www.instagram.com/_.studywith_tripti._?igsh=MW4xZ3U1NTYzdnplcQ==" },
      { title: "LinkedIn", sub: "Tripti Gupta", href: "https://www.linkedin.com/in/tripti-gupta-a28a6832b" },
      { title: "YouTube", sub: "Arcade With Us", href: "https://www.youtube.com/@ARCADEWITHUS_We" },
    ]
  }
];

export function FacilitatorCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="w-full relative pb-12" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto min-h-[450px] flex items-start justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full relative"
          >
            <div className="w-full flex flex-col md:flex-row gap-8 text-left bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border-0">
              
              {/* Left Column */}
              <div className="flex flex-col items-center flex-shrink-0 w-full md:w-56 mt-4">
                 <div className="relative group w-48 h-48 mb-5 rounded-full">
                   <div className="absolute inset-0 rounded-full transition-all duration-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] dark:shadow-[0_0_20px_rgba(255,140,40,0.6)] dark:group-hover:shadow-[0_0_40px_rgba(255,140,40,0.9)] z-0"></div>
                   <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#f0f4ff] dark:border-slate-800 relative z-10 bg-white dark:bg-slate-900">
                     <img src={facilitators[currentIndex].image} alt={facilitators[currentIndex].name} className="w-full h-full object-cover relative z-20" />
                   </div>
                 </div>
                 <span className="bg-[#f0f4ff] dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-sm whitespace-nowrap">
                   {facilitators[currentIndex].role}
                 </span>
                 <span className="text-xs text-slate-500 font-bold tracking-wider uppercase">BASED IN INDIA</span>
              </div>
              
              {/* Right Column */}
              <div className="flex-1">
                 <span className="bg-[#f0f4ff] dark:bg-slate-800 text-blue-500 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-max mb-5">
                    <Code className="w-3.5 h-3.5" /> {facilitators[currentIndex].tag}
                 </span>
                 <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-5">
                   Hi, I'm <span className="text-blue-500">{facilitators[currentIndex].name}</span>
                 </h3>
                 <div className="text-sm leading-relaxed mb-8 flex flex-col gap-3 text-slate-600 dark:text-slate-400">
                   {facilitators[currentIndex].bio.split('\n\n').map((paragraph, i) => (
                     <p key={i}>{paragraph}</p>
                   ))}
                 </div>
                 <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Connect With Me</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {facilitators[currentIndex].links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#f8f9fc] dark:bg-slate-800/50 hover:bg-[#f0f4ff] dark:hover:bg-slate-800 transition-colors rounded-xl p-4 flex justify-between items-center group border border-transparent hover:border-blue-100 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          {getIcon(link.title)}
                          <div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{link.title}</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{link.sub}</div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </a>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3">
        {facilitators.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-blue-500 w-6' : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
