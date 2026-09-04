import React from 'react';
import { Info, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeliveryTimelineCard } from '../components/RewardDeliveryCard';

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

        {/* Timeline Integration */}
        <div className="w-full max-w-4xl mx-auto mb-24">
          <DeliveryTimelineCard />
        </div>

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
    <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left group">
      <div className="aspect-square w-full overflow-hidden relative bg-slate-50 dark:bg-[#0d1117] p-6 flex items-center justify-center">
        <div className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold rounded-full z-10 shadow-sm ${color}`}>
          {milestone}
        </div>
        <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
        <p className="text-xs text-slate-500">Official Swag Bundle</p>
      </div>
    </div>
  );
}
