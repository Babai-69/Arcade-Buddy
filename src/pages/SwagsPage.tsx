import React, { useState } from 'react';
import { Info, ChevronRight, ArrowRight, Gift, X, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function SwagsPage() {
  const recentGallery = [
    "https://media.licdn.com/dms/image/v2/D4D22AQECxW1pKRz08Q/feedshare-shrink_800/feedshare-shrink_800/0/1704548452062?e=1790208000&v=beta&t=dm2sPnEmXS3qqduSAtEQCXhr-LW7ufdiN1EVuj87HvE",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-legend-swags.jpg",
    "https://media.licdn.com/dms/image/v2/D4D22AQFJEtmTj9qrPA/feedshare-shrink_800/B4DZXCO6ZUG4Ak-/0/1742720447177?e=2147483647&v=beta&t=G2v_3TILQPkocjR98A-neAKVFVFvftr-4xmkk3QD2mY",
    "https://d8it4huxumps7.cloudfront.net/uploads/images/festival/gallery/69e7e490907b2_screenshot_2026_0420_121818.jpg?d=600x600",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-champion-swags.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-2025-facilitator-swags.jpg"
  ];

  return (
    <div className="min-h-screen font-sans flex flex-col bg-slate-50 dark:bg-[#0d1117]">
      <div className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 max-w-6xl mx-auto w-full text-center">
        
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">
          <Link to="/" className="hover:text-indigo-500 transition-colors">&larr; HOME</Link> 
          &nbsp;&middot;&nbsp; 
          <Link to="/resources" className="hover:text-indigo-500 transition-colors">RESOURCES</Link> 
          &nbsp;&middot;&nbsp; 
          <span className="text-indigo-500 dark:text-indigo-400">SWAGS</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          How to Redeem Your <span className="text-[#7C3AED] dark:text-[#a78bfa]">Google</span><br/>
          <span className="text-[#7C3AED] dark:text-[#a78bfa]">Cloud Arcade</span> <span className="bg-[#FBBC04] text-slate-900 px-3 py-1.5 rounded-lg shadow-sm inline-block transform -rotate-1 mt-1">Swags & Prizes</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto text-[15px]">
          Follow this walkthrough to understand the Google Cloud Arcade swag redemption process, check your eligibility, and claim your well-earned prizes.
        </p>

        {/* Alert Box */}
        <div className="bg-[#FFFBEB] border border-[#FEF08A] dark:bg-[#433716]/30 dark:border-[#85712c] rounded-xl p-5 mb-16 max-w-4xl mx-auto flex gap-4 text-left shadow-sm">
          <div className="mt-0.5">
            <Info className="w-5 h-5 text-[#D97706] dark:text-[#FBBF24]" />
          </div>
          <div>
            <h4 className="font-bold text-[#92400E] dark:text-[#FDE68A] text-sm mb-1">Important Note About Swag Eligibility</h4>
            <p className="text-sm text-[#B45309] dark:text-[#FCD34D] leading-relaxed">
              Completing games and earning points does not automatically ship swags to you. You must wait for the official prize counter email to claim your items. Make sure your profile is public so the Arcade team can verify your lab activity and maintain your swag eligibility.
            </p>
          </div>
        </div>

        {/* Current Swag Tiers Preview Section */}
        <div className="w-full max-w-5xl mx-auto mb-20 text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Arcade Prize Tiers</h2>
          <p className="text-slate-500 mb-10 text-[15px] text-center max-w-2xl mx-auto">
            Discover the exciting tiers you can unlock. Each tier requires a specific amount of points, bringing you closer to exclusive Google Cloud Arcade rewards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SwagCard image="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Trooper.png?raw=true" name="Arcade Trooper" milestone="50 PTS" color="bg-[#4285F4] text-white" />
            <SwagCard image="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Ranger.png?raw=true" name="Arcade Ranger" milestone="75 PTS" color="bg-[#34A853] text-white" />
            <SwagCard image="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Champian.png?raw=true" name="Arcade Champion" milestone="95 PTS" color="bg-[#FBBC05] text-slate-900" />
            <SwagCard image="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Legend.png?raw=true" name="Arcade Legend" milestone="120+ PTS" color="bg-[#EA4335] text-white" />
          </div>
        </div>

        {/* Swag Drops Section */}
        <SwagDropsSection />

        

        {/* 3 Steps - Reward Redemption Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20 w-full">
          
          {/* Step 1 */}
          <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl p-8 pt-10 bg-white dark:bg-[#161b22] shadow-sm text-left flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex">
              <div className="bg-[#7C3AED] text-white px-5 py-1 text-[10px] font-black italic tracking-wider rounded-full shadow-sm">
                STEP 01
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Earn Required Points</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
              Participate in Arcade games and trivia to earn points. Track your points using the calculator to see which prize tiers you qualify for.
            </p>
            <Link to="/calculator" className="w-full bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-xs font-bold py-3 rounded-lg text-center transition-colors flex items-center justify-center gap-2">
              Calculate Your Points <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Step 2 */}
          <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl p-8 pt-10 bg-white dark:bg-[#161b22] shadow-sm text-left flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex">
              <div className="bg-[#F59E0B] text-white px-5 py-1 text-[10px] font-black italic tracking-wider rounded-full shadow-sm">
                STEP 02
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Wait for the Email</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
              At the end of the season, if you have enough points, you will receive an official email from Google Cloud with your unique redemption link.
            </p>
            <div className="w-full bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold py-3 rounded-lg text-center opacity-50 cursor-not-allowed">
              Check Email Inbox
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl p-8 pt-10 bg-white dark:bg-[#161b22] shadow-sm text-left flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex">
              <div className="bg-[#10B981] text-white px-5 py-1 text-[10px] font-black italic tracking-wider rounded-full shadow-sm">
                STEP 03
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Claim in Prize Counter</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
              Open the link, select your desired swag items based on your points, enter your shipping details, and wait for the delivery!
            </p>
            <Link to="/resources/prize-counter-guide" className="w-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 dark:text-black text-white text-xs font-bold py-3 rounded-lg text-center transition-colors flex items-center justify-center gap-2">
              View Prize Counter Guide <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Large section below - Gallery */}
        <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto w-full text-left shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Previous Cohort Swags Gallery</h2>
              <p className="text-slate-500 text-sm">Real Google Cloud Arcade participants showcasing their delivered swag kits around the world!</p>
            </div>
            <Link to="/resources/swag-showcase-page" className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
              Check the full gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="columns-2 md:columns-3 gap-3 md:gap-4">
            {recentGallery.map((src, i) => (
              <div key={i} className="mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-lg transition-all group">
                <img src={src} alt={`Winner ${i+1}`} className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SwagCard({ image, name, milestone, color }: any) {
  return (
    <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm text-center group hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_40px_rgba(255,140,40,0.6)] transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-50 dark:bg-[#0d1117] p-6 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6 relative border-t border-slate-100 dark:border-slate-800">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
          <div className={`px-4 py-1 text-xs font-black tracking-widest uppercase rounded-full shadow-md border-2 border-white dark:border-[#161b22] ${color}`}>
            {milestone}
          </div>
        </div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 mt-2">{name}</h3>
        <p className="text-sm font-semibold text-slate-500">Official Swag Bundle</p>
      </div>
    </div>
  );
}

const swagDrops = [
  {
    id: 1,
    name: "The Arcade Weather-Shield Jacket",
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1789493091/ChatGPT_Image_Sep_15_2026_10_52_46_PM_gwx7aq.png",
    tiers: ["Champion", "Legend"],
    specs: [
      { title: "Storm-ready weave", desc: "Repels light rain and shuts down gusting winds before they hit your layer." },
      { title: "Official branding", desc: "Clean Google Cloud logo on the left chest paired with the super cloud logo on the sleeve." },
      { title: "Total draft block", desc: "High collar, custom Velcro cuffs, and a ribbed elastic hem lock warmth in." },
      { title: "Secure cargo", desc: "Deep zippered hand-warmer pockets keep your essentials safe." },
      { title: "Weightless mobility", desc: "Technical performance without the heavy winter bulk." }
    ]
  }
];

function SwagDropsSection() {
  const [activeTab, setActiveTab] = useState('All Tiers');
  const tabs = ['All Tiers', 'Trooper', 'Ranger', 'Champion', 'Legend'];
  const [selectedSwag, setSelectedSwag] = useState<any>(null);

  const filteredSwags = swagDrops.filter(swag => 
    activeTab === 'All Tiers' || swag.tiers.includes(activeTab)
  );

  return (
    <div className="w-full max-w-5xl mx-auto mb-24 relative z-10 pt-4">
       {/* Subtle Grid Background for this section */}
       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
       
       <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 blur-[100px] rounded-full pointer-events-none"></div>
       
       <div className="text-center mb-10">
         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200/80 dark:border-orange-800/50 text-orange-500 dark:text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm">
           <Gift className="w-3.5 h-3.5" /> REWARDS VAULT
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-[#1e293b] dark:text-white mb-4">Swag Drops</h2>
         <p className="text-slate-500 text-[15px] max-w-lg mx-auto leading-relaxed">
           Unlock exclusive Arcade swag by completing challenges and reaching prize tiers.
         </p>
       </div>
       
       {/* Tabs */}
       <div className="flex flex-wrap justify-center gap-3 mb-10">
         {tabs.map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all border ${
               activeTab === tab 
                 ? 'bg-[#4285F4] text-white border-[#4285F4] shadow-[0_4px_14px_rgba(66,133,244,0.3)]' 
                 : 'bg-white dark:bg-[#161b22] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm'
             }`}
           >
             {tab}
           </button>
         ))}
       </div>

       {filteredSwags.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredSwags.map((swag) => (
             <motion.div 
               key={swag.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_40px_rgba(255,140,40,0.6)] transition-all duration-300 cursor-pointer group"
               onClick={() => setSelectedSwag(swag)}
             >
               <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center p-6">
                 <img 
                   src={swag.image} 
                   alt={swag.name} 
                   className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                 />
                 <div className="absolute top-4 left-4 flex gap-2">
                   {swag.tiers.filter(t => activeTab === 'All Tiers' || t === activeTab).map(t => (
                     <span key={t} className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${t === 'Champion' ? 'bg-[#FBBC05] text-slate-900' : 'bg-[#EA4335] text-white'}`}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{swag.name}</h3>
                 <p className="text-sm text-slate-500 font-medium flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                   View details <ArrowRight className="w-4 h-4" />
                 </p>
               </div>
             </motion.div>
           ))}
         </div>
       ) : (
         /* Empty State Box */
         <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-[32px] p-12 md:p-24 flex flex-col items-center justify-center text-center bg-white/60 dark:bg-[#161b22]/40 backdrop-blur-md relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] mx-4 md:mx-0">
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute w-[100px] h-[100px] rounded-full border border-dashed border-amber-200/80 dark:border-amber-900/50 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-[120px] h-[120px] rounded-full border border-dashed border-amber-100 dark:border-amber-900/30 animate-[spin_30s_linear_infinite_reverse]"></div>
              <div className="w-20 h-20 rounded-full bg-[#FFFBEB] dark:bg-amber-900/20 flex items-center justify-center relative z-10 shadow-sm border border-amber-100 dark:border-amber-900/30">
                <Gift className="w-10 h-10 text-[#F59E0B] drop-shadow-sm" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-[20px] font-black text-slate-900 dark:text-white mb-4">No Swag Drops for {activeTab}</h3>
            <p className="text-slate-500 text-[14px] max-w-[360px] mx-auto leading-relaxed">
              Check back later once rewards are announced for this tier.
            </p>
         </div>
       )}

       {/* Coming Soon Indicator */}
       <div className="mt-12 flex justify-center w-full pb-8">
         <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-500 dark:text-slate-300 font-bold text-sm shadow-inner border border-slate-300/50 dark:border-slate-600/50">
           {/* Animated CSS Clock */}
           <div className="relative w-[14px] h-[14px] rounded-full border-[2px] border-current flex items-center justify-center opacity-80">
             <div className="absolute top-1/2 left-1/2 w-[1.5px] h-1.5 bg-current origin-[50%_100%] -translate-x-1/2 -translate-y-full animate-[spin_12s_linear_infinite]" style={{ borderTopLeftRadius: '1px', borderTopRightRadius: '1px' }} />
             <div className="absolute top-1/2 left-1/2 w-[1px] h-2 bg-current origin-[50%_100%] -translate-x-1/2 -translate-y-full animate-[spin_2s_linear_infinite]" style={{ borderTopLeftRadius: '1px', borderTopRightRadius: '1px' }} />
           </div>
           Coming Soon
         </div>
       </div>

       {/* Modal for Swag Details */}
       <AnimatePresence>
         {selectedSwag && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
               onClick={() => setSelectedSwag(null)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row"
             >
               <button 
                 onClick={() => setSelectedSwag(null)}
                 className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors z-10"
               >
                 <X className="w-5 h-5" />
               </button>
               
               {/* Image Section */}
               <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8 md:p-12 relative min-h-[300px]">
                 <motion.img 
                   initial={{ scale: 0.8 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 0.4 }}
                   src={selectedSwag.image} 
                   alt={selectedSwag.name} 
                   className="w-full h-full object-contain drop-shadow-2xl"
                 />
                 <div className="absolute bottom-6 left-6 flex gap-2">
                   {selectedSwag.tiers.filter((t: string) => activeTab === 'All Tiers' || t === activeTab).map((t: string) => (
                     <span key={t} className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm ${t === 'Champion' ? 'bg-[#FBBC05] text-slate-900' : 'bg-[#EA4335] text-white'}`}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
               
               {/* Details Section */}
               <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                   {selectedSwag.name}
                 </h2>
                 
                 <div className="space-y-5 text-left">
                   {selectedSwag.specs.map((spec: any, idx: number) => (
                     <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       key={idx} 
                       className="flex gap-3 items-start"
                     >
                       <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
                       <div>
                         <span className="font-bold text-slate-900 dark:text-white mr-2">{spec.title}:</span>
                         <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{spec.desc}</span>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}
