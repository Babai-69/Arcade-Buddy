import React from 'react';
import { ArrowRight, Trophy, Sparkles, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SwagShowcase() {
  const swagsGallery = [
    "https://media.licdn.com/dms/image/v2/D4D22AQECxW1pKRz08Q/feedshare-shrink_800/feedshare-shrink_800/0/1704548452062?e=1790208000&v=beta&t=dm2sPnEmXS3qqduSAtEQCXhr-LW7ufdiN1EVuj87HvE",
    "https://media.licdn.com/dms/image/v2/D4D22AQFS4btTeQNHHg/feedshare-shrink_800/feedshare-shrink_800/0/1711896520626?e=2147483647&v=beta&t=GzYFFMyHZSOXL9pMTgYtPDxvoLbr21Q_qjdYYp4JSWo",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-legend-swags.jpg",
    "https://media.licdn.com/dms/image/v2/D4D22AQFJEtmTj9qrPA/feedshare-shrink_800/B4DZXCO6ZUG4Ak-/0/1742720447177?e=2147483647&v=beta&t=G2v_3TILQPkocjR98A-neAKVFVFvftr-4xmkk3QD2mY",
    "https://d8it4huxumps7.cloudfront.net/uploads/images/festival/gallery/69e7e490907b2_screenshot_2026_0420_121818.jpg?d=600x600",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-swags-showcase-2.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-champion-swags.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-trooper-2.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-cloud-lego-ranger.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-2025-facilitator-swags.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-1-2025-champion-swags.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-swags-showcase-4.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-1-2025-trooper-swags-3.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-champion-pack.jpg",
    "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-trooper-swags.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVpDAwUisUJ2tclVD1CzjvYSMim_wLfRvkHZX9HJIe8A&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKOTdyK-DMDIua53xSITMiQHcBb2BFOKSV0Uj15lAUigMAxqfCe4GCq8&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHg2dl0RpPVeYch7s7c43S6rgWb6mH7injPOx4U_nqajpel7m29WziDBE&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqWLXGaI9L8luIjz0j95P67lymLVAN7STqzBq_4vY3xX-jwwvNvBeLM79&s=10",
    "https://i.ytimg.com/vi/cd7iDnC3bUM/sddefault.jpg",
    "https://pbs.twimg.com/media/G0de9CXW4AAJVuL.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3aP6sGitmhrpqpr8CyhCCOqx7fv2pJ52yej2Ty0ygg&s=10",
    "https://media.licdn.com/dms/image/v2/C5622AQEjKmC-d9Dmbw/feedshare-shrink_800/feedshare-shrink_800/0/1641145492325?e=2147483647&v=beta&t=bi8qy4uLKMenqeHXFRNCIeRMklOzIIQBaNuNS07qGkM",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2fYK7hpVSLUo2XhP8-jevpe6b9-pSFA6ZW-l3KdorA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAKXsZGDK5SD20V7GiCWdAjZzX2WNB5XpT6Ysb3u6vyQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXILV6ScoN-AGQl2OoVWTfKuOgGso9_2Bx5bRqeSiKg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOszEpO8bbz4RPwGAJ87nn1J5s0NXKOdI2LVrZzq4d2Aka7fK0s8gLRk&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4w7VbPHFgwpIU1ZN85BsjZqAPwcGE4e6YhpsWTKJJQ&s=10",
    "https://media.licdn.com/dms/image/v2/D5622AQHAosUdfa3f1g/feedshare-shrink_800/B56ZXXE.baGoAk-/0/1743070172233?e=2147483647&v=beta&t=Y7fQ6JVVock_tY5j-7IlfiVgT7WZXMXGcBh6wHmNAbY",
    "https://preview.redd.it/finally-got-my-google-prizes-being-a-non-engineer-v0-zbaycm2j69wf1.jpeg?auto=webp&s=43b39d4bc979b82ac2e2ea3c8882c90e94bd3f2f"
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#0d1117] text-slate-900 dark:text-slate-100 font-sans max-w-6xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-16 pt-8">
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-indigo-500 mb-4 uppercase">
          <Link to="/resources" className="hover:underline">RESOURCES</Link> &gt; PRIZE SHOWCASE &gt; <span className="text-slate-400">GAME TIERS & WINNERS</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          <span className="text-indigo-500 dark:text-indigo-400">Google Cloud Arcade</span><br/>
          <span className="bg-[#FBBC04] text-slate-900 px-4 py-1.5 rounded-lg inline-block transform mt-2 shadow-sm">Swag Tiers & Showcase 🎁</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg mt-6">
          Explore the official <strong className="text-slate-800 dark:text-slate-200">2026 Arcade Prize Tiers</strong>, look back at past year swag collections (2023-2025), and browse real community winners displaying their official Google Cloud merchandise!
        </p>
      </div>

      {/* Redemption Guide Banner */}
      <div className="bg-[#111827] text-white rounded-2xl p-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FBBF24] mb-2 uppercase">
             <Trophy className="w-3 h-3" /> PRIZE REDEMPTION & ELIGIBILITY
          </div>
          <h3 className="text-xl font-bold mb-1">How to Claim Your Swags & Mandatory Rules</h3>
          <p className="text-sm text-slate-400">Learn claim code timelines, essential eligibility rules, and how to receive your rewards.</p>
        </div>
        <Link to="/resources/prize-counter-guide" className="shrink-0 bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 text-sm transition-colors shadow-sm">
          Read Redemption Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2026 Edition Tiers */}
      <div className="mb-20">
        <div className="text-[10px] font-bold tracking-widest text-indigo-500 mb-2 uppercase">
          2026 EDITION
        </div>
        <h2 className="text-3xl font-bold mb-3">Official 2026 Arcade Swag Tiers</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl text-sm">
          Accumulate points across skill badges, trivia games, and special events to reach your target prize tier.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Trooper */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl aspect-square flex items-center justify-center mb-4 overflow-hidden p-4">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Trooper.png?raw=true" alt="Trooper" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Trooper Tier</h3>
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded">50 PTS</span>
            </div>
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> TIER ONE • 6,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Arcade 2026</div>
            </div>
          </div>
          
          {/* Ranger */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl aspect-square flex items-center justify-center mb-4 overflow-hidden p-4">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Ranger.png?raw=true" alt="Ranger" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Ranger Tier</h3>
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded">75 PTS</span>
            </div>
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> TIER TWO • 4,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Arcade 2026</div>
            </div>
          </div>

          {/* Champion */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl aspect-square flex items-center justify-center mb-4 overflow-hidden p-4">
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Champian.png?raw=true" alt="Champion" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Champion Tier</h3>
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded">95 PTS</span>
            </div>
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> TIER MAX • 3,000 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Arcade 2026</div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl aspect-square flex items-center justify-center mb-4 overflow-hidden p-4 relative">
               <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/20 blur-xl rounded-full"></div>
               <img src="https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Legend.png?raw=true" alt="Legend" className="w-full h-full object-contain relative z-10" referrerPolicy="no-referrer" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Legend Tier</h3>
              <span className="bg-[#FBBC04] text-slate-900 text-[10px] font-bold px-2 py-1 rounded">120 PTS</span>
            </div>
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div> TOP TIER MAX • 2,500 slots</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Arcade 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Cohorts */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-3">Past Cohorts Arcade Swags</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl text-sm">
          Take a look back at the official merchandise delivered to Arcade champions in previous seasons.
        </p>

        <div className="space-y-6">
          {/* 2023 S1 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/past-swags-collection/arcade-season-1-2023-swags.png" alt="2023 Cohort 1" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2023 Cohort 1 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2023 COHORT 1</span>
               </div>
               <p className="text-xs text-slate-400">Official 2023 Cohort 1 prize collection featuring Google Cloud backpacks, t-shirts, caps, multi-port USB connectors, water bottles, hoodies, milestone swags, and much more.</p>
             </div>
          </div>

          {/* 2023 S2 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1788457913/arcade-season-2-2023-swags_t6bxpv.png" alt="2023 Season 2" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2023 Season 2 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2023 SEASON 2</span>
               </div>
               <p className="text-xs text-slate-400">Official 2023 Season 2 prize collection featuring Google Cloud backpacks, t-shirts, caps, multi-port USB connectors, high-grade water bottles, hoodies, milestone swags, and much more.</p>
             </div>
          </div>

          {/* 2024 S1 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1788457913/arcade-season-1-2024-swags_p8brbr.png" alt="2024 Season 1" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2024 Season 1 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2024 SEASON 1</span>
               </div>
               <p className="text-xs text-slate-400">Official 2024 Season 1 prize collection featuring Google Cloud backpacks (5 designs), t-shirts (5 designs), digital alarm clock, pens, 3D printer pen, camping lantern, mini vacuum cleaner, study lamps, desk lights, and much more.</p>
             </div>
          </div>

          {/* 2024 S2 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/past-swags-collection/arcade-season-2-2024-swags.jpg" alt="2024 Season 2" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2024 Season 2 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2024 SEASON 2</span>
               </div>
               <p className="text-xs text-slate-400">Official 2024 Season 2 prize collection featuring Google Cloud backpacks (3 designs), t-shirts, black & white hoodies, water bottles, laptop stand, mug, digital alarm clock, 5-in-1 desk cleaner, auto-stir coffee mug, laptop sleeve, 3D printer pen, foldable bottle, screen cleaner, and much more.</p>
             </div>
          </div>

          {/* 2025 S1 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/past-swags-collection/arcade-season-1-2025-swags.jpg" alt="2025 Season 1" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2025 Season 1 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2025 SEASON 1</span>
               </div>
               <p className="text-xs text-slate-400">Official Season 1 prize collection featuring Google Cloud t-shirts, laptop stand, ceramic mug, desk lamp, magnets, diary, pens, backpacks (3 designs), mini desk vacuum cleaner, 3D printer, and much more.</p>
             </div>
          </div>

          {/* 2025 S2 */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
             <div className="w-full bg-slate-800 relative">
               <img src="https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/past-swags-collection/arcade-season-2-2025-swags.jpg" alt="2025 Season 2" className="w-full h-auto object-contain" />
             </div>
             <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-white">Google Cloud Arcade 2025 Season 2 Swag Collection</h3>
                 <span className="text-[10px] font-bold bg-[#FBBC04] text-slate-900 px-2 py-1 rounded">2025 SEASON 2</span>
               </div>
               <p className="text-xs text-slate-400">Official Season 2 prize collection featuring Google Cloud t-shirts, water bottles, backpacks (2 designs), stickers, magnets, DIY Google Cloud logo, upright lamp, pens, multi-port USB hub, laptop sleeves, and much more.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Hall of Swag Winners */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">Hall of Swag Winners 🏆</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl text-sm">
          Real Google Cloud Arcade participants showcasing their delivered swag kits and reward boxes around the world!
        </p>

        <div className="columns-2 md:columns-4 lg:columns-5 gap-3 md:gap-4">
          {swagsGallery.map((src, i) => (
             <div key={i} className="mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:shadow-lg transition-all group">
               <img src={src} alt={`Winner ${i+1}`} className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
             </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#111827] text-white rounded-3xl p-8 relative overflow-hidden mt-12 border border-slate-800" style={{ width: '1149.87.px' }}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FBBF24] mb-3 uppercase">
              <Sparkles className="w-3 h-3" /> Check Your Swag Eligibility ✨
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              See Which Arcade Swag Tier You've Unlocked!
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Enter your Google Skills Boost profile URL on ArcadeBuddy to automatically calculate your points and see exactly which swag prize tier you are eligible to claim.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/calculator" className="w-full sm:w-auto text-center bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
              <Medal className="w-4 h-4" /> Check My Swag Tier
            </Link>
            <Link to="/resources/prize-counter-guide" className="w-full sm:w-auto text-center bg-transparent hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-slate-700">
              Prize Redemption Guide <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
