import React from 'react';
import { AlertTriangle, ExternalLink, ArrowRight, ShieldAlert, CheckCircle2, PlayCircle, Info, Clock, Lightbulb } from 'lucide-react';
import { YouTubeVideo } from './YouTubeVideo';
import { Link } from 'react-router-dom';

export function GearBadgesGuide() {
  return (
    <div className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 p-6 md:p-10 font-sans max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800">
      
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          How to Claim <span className="bg-[#FBBC04] text-slate-900 px-2 rounded-lg inline-block transform shadow-sm">GEAR Badges</span> on<br />
          Your <span className="text-indigo-500 dark:text-indigo-400">Google Developer Profile</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base md:text-lg mb-8">
          When participating in the <strong className="text-slate-800 dark:text-slate-200">Arcade Facilitator Program</strong>, these <span className="text-indigo-500 font-bold">2 essential badges</span> must be completed on your Google Developer Profile.
        </p>
      </div>

      {/* Warning Box */}
      <div className="border border-yellow-300 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-2xl p-6 mb-12 shadow-sm flex gap-4">
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" />
        <div>
          <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500 mb-2">Facing Profile or Auto-Login Issues?</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            If you get automatically logged into a different Google account or encounter profile redirect errors while claiming the badge, try performing all these steps inside an <strong className="underline decoration-2 underline-offset-2">Incognito / Private Window</strong>. This ensures you log in with the exact email address used during your Arcade Facilitator enrollment.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">The 2 Essential Facilitator Badges</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Badge 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col items-start">
          <div className="w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-xl h-40 flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-800/50 relative overflow-hidden">
             <img src="https://developers.google.com/static/profile/badges/community/gear/arcade/badge.png" alt="Arcade GEAR Badge" className="w-32 h-32 object-contain" />
          </div>
          <h3 className="text-xl font-bold mb-2">Arcade - GEAR Badge</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            An instant digital badge earned directly via Google Developer Profile page award link in under a minute.
          </p>
          <a href="https://developers.google.com/profile/badges/community/gear/arcade/award" className="bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 text-sm transition-colors shadow-sm">
            Claim Badge 1 <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Badge 2 */}
        <div className="bg-white dark:bg-slate-900 border border-indigo-400 dark:border-indigo-500/50 rounded-2xl p-6 shadow-sm flex flex-col items-start">
          <div className="w-full bg-[#f0fdf4] dark:bg-emerald-900/20 rounded-xl h-40 flex items-center justify-center mb-6 relative overflow-hidden">
             <img src="https://developers.google.com/static/profile/badges/community/gear/badge.svg" alt="GEAR Badge" className="w-20 h-20 object-contain drop-shadow-sm" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">GEAR Badge</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            Gemini Enterprise Agent Ready program badge earned by registering and completing the GEAR program enrollment.
          </p>
          <a href="https://developers.google.com/program/gear/" className="bg-[#7b61ff] hover:bg-[#6a50e6] text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 text-sm transition-colors shadow-sm">
            Claim Badge 2 <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-indigo-500 mb-2 uppercase border border-indigo-200 dark:border-indigo-700/50 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full w-fit">
          BADGE 1 • CLAIMING GUIDE
        </div>
        <h2 className="text-2xl font-bold mb-3">Instructions to Earn the Arcade - GEAR Badge</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
          Follow these 4 steps in sequence to claim your digital award:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col relative pt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded shadow-md skew-x-[-10deg]">
               <span className="skew-x-[10deg] block">STEP 01</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-center">Sign In to Account</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow text-center">
              Make sure you are signed in to your Google Developer Program account using your Facilitator email.
            </p>
            <a href="https://me.developers.google.com/u/me" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
              Sign In to Google Developer <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col relative pt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded shadow-md skew-x-[-10deg]">
               <span className="skew-x-[10deg] block">STEP 02</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-center">Navigate to Award Page</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow text-center">
              Once signed in, click below to open the official direct badge award page:
            </p>
            <a href="https://developers.google.com/profile/badges/community/gear/arcade/award" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
              Open Award Page <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col relative pt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FBBC04] text-slate-900 text-[10px] font-bold px-3 py-1 rounded shadow-md skew-x-[-10deg]">
               <span className="skew-x-[10deg] block">STEP 03</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-center">Wait 10 - 15 Seconds</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow text-center">
              Once there, wait for <strong>10-15 seconds</strong>. <strong className="underline decoration-2">DO NOT</strong> navigate away from the page and do not click anything.
            </p>
            <div className="w-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Stay on Page for 10-15s
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm">
           <h3 className="text-xl font-bold mb-3">Step 04 - Confirmation Toast & Profile Verification</h3>
           <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
             You should now see a notification toast at the bottom of the screen indicating that you have successfully earned the badge. Click on <strong>"View Profile"</strong> to confirm that the badge has been added to your Google Developer Profile.
           </p>
           <div className="w-full aspect-[2/1] bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4 overflow-hidden">
              <img src="https://services.google.com/fh/files/misc/arcade_gear_badge_toast.png" alt="Toast confirmation" className="w-full h-full object-contain" />
           </div>

           <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
             <h4 className="text-lg font-bold mb-4">Video Guide: Claiming the Badge</h4>
             <YouTubeVideo 
                videoId="HdmX2tQFRVI" 
                title="GEAR Badge Video Guide" 
                className="w-full aspect-video rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm" 
             />
           </div>

           <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
             <span className="text-xs text-slate-500">Verify your earned digital badge on your official developer profile dashboard:</span>
             <a href="https://me.developers.google.com/u/me" className="bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold py-2 px-6 rounded-lg flex items-center gap-2 text-xs transition-colors shadow-sm">
                View Google Developer Profile <ExternalLink className="w-3 h-3" />
             </a>
           </div>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* Part 2 Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-emerald-600 mb-2 uppercase border border-emerald-200 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
          BADGE 2 • GEAR PROGRAM ENROLLMENT
        </div>
        <h2 className="text-2xl font-bold mb-3">Steps for the GEAR Badge (Gemini Enterprise Agent Ready)</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-4xl">
          You must have signed up for the GEAR program while enrolling and earned the GEAR badge on your Google Developer profile. Follow the steps below or watch the video guide:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           {/* Card 1 */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="w-full bg-[#f4fcf6] dark:bg-emerald-900/20 rounded-xl py-6 px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-4 mb-6 border border-emerald-100 dark:border-emerald-800/50">
                 <div className="shrink-0 bg-white rounded-full p-2 shadow-sm border border-slate-100 dark:border-slate-800">
                   <img src="https://developers.google.com/static/profile/badges/community/gear/badge.svg" alt="GEAR Badge" className="w-14 h-14 object-contain drop-shadow-sm" />
                 </div>
                 <div className="flex flex-col text-left">
                   <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1">GOOGLE DEVELOPER PROGRAM</p>
                   <p className="font-bold text-slate-900 dark:text-white text-lg leading-tight">Gemini Enterprise Agent Ready</p>
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Enroll in the GEAR Program</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Register for the Gemini Enterprise Agent Ready initiative on the official Google Developer platform to earn your GEAR badge and satisfy Facilitator program eligibility.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                 <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <span><strong className="text-slate-800 dark:text-slate-200">Official Google Initiative</strong> — Gemini Enterprise Agent Ready enrollment</span>
                 </li>
                 <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7b61ff] mt-1.5 shrink-0"></div>
                    <span><strong className="text-slate-800 dark:text-slate-200">100% Free Developer Badge</strong> — Added to your Google Developer profile</span>
                 </li>
                 <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                    <span><strong className="text-slate-800 dark:text-slate-200">Facilitator Mandatory</strong> — Required for milestone bonus point validation</span>
                 </li>
              </ul>
              <a href="https://developers.google.com/program/gear/" target="_blank" rel="noopener noreferrer" className="w-full bg-[#7b61ff] hover:bg-[#6a50e6] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm">
                Sign Up for GEAR Program <ExternalLink className="w-4 h-4" />
              </a>
           </div>

           {/* Card 2 */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded border border-red-200 dark:border-red-800/50">
                    <PlayCircle className="w-3 h-3" /> VIDEO WALKTHROUGH
                 </span>
                 <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Watch on YouTube</a>
              </div>
              <h3 className="text-xl font-bold mb-3">Video Guide: How to Earn the GEAR Badge</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Watch this step-by-step video guide to see how to enroll in GEAR and claim the badge on your developer profile.
              </p>
              
              <YouTubeVideo 
                videoId="_vTVDxbVlhQ" 
                title="How to create your Google Developer Profile & earn the GEAR badge?" 
                className="w-full aspect-video rounded-xl mb-6 border border-slate-700" 
              />
              <a href="https://youtu.be/_vTVDxbVlhQ?si=64WDMmSi656jVnka" target="_blank" rel="noopener noreferrer" className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors border border-slate-700 mt-auto shadow-sm">
                <PlayCircle className="w-4 h-4" /> Open Video on YouTube
              </a>
           </div>
        </div>

        {/* Info Box */}
        <div className="border border-yellow-300 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-2xl p-6 shadow-sm flex gap-4">
          <Info className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Important Enrollment Email Reminder</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ensure that you use the <strong className="underline decoration-2 underline-offset-2">same email address</strong> for your Google Developer Program account as you used when registering for the Arcade Facilitator Program so your progress can be properly verified and tracked.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#111827] text-white rounded-3xl p-8 relative overflow-hidden mt-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FBBF24] mb-3 uppercase">
              <Lightbulb className="w-3 h-3" /> Track Your Facilitator Progress
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              No More Manual Tracking — Calculate Points Instantly! ⚡
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Check your dashboard on ArcadeBuddy to automatically track completed badges, GEAR eligibility, and milestone bonus tiers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/calculator" className="w-full sm:w-auto text-center bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
              Calculate My Points Now
            </Link>
            <Link to="/facilitator" className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-slate-700">
              Learn more about Facilitator Program <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
