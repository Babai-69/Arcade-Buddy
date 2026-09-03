import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, Lightbulb, ExternalLink, ShieldAlert, ArrowRight, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrizeRedemptionGuide() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: January 7, 2027, at 5:30 AM
    const targetDate = new Date('2027-01-07T05:30:00').getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const [slots, setSlots] = useState({
    legend: 2500,
    champion: 3000,
    ranger: 4000,
    trooper: 6000
  });

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch('/api/arcade-spots');
        const data = await res.json();
        if (data && data.trooper) {
          setSlots({
            legend: data.legend.spotsLeft,
            champion: data.champion.spotsLeft,
            ranger: data.ranger.spotsLeft,
            trooper: data.trooper.spotsLeft
          });
        }
      } catch (err) {
        console.error("Failed to fetch slots data", err);
      }
    };
    
    fetchSlots();
    // Update every 1 hour
    const interval = setInterval(fetchSlots, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 p-6 md:p-10 font-sans max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800">
      
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          <span className="text-indigo-500 dark:text-indigo-400">Google Cloud Arcade </span>
          <span className="text-slate-900 dark:text-white">2026</span>
          <br />
          <span className="bg-[#FBBC04] text-slate-900 px-4 py-1.5 rounded-lg inline-block transform mt-2 shadow-sm">Prize Redemption Guide</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base md:text-lg mb-8">
          Complete guide on <strong className="text-slate-800 dark:text-slate-200">how to claim your official Arcade swags</strong> once you reach your target prize tier, mandatory eligibility prerequisites, and a quick overview of the new <span className="text-indigo-500 font-semibold">Waterfall Distribution System</span>.
        </p>

        <a 
          href="https://docs.google.com/document/d/1qvB9uGy3AG6k843OaSa2jVTroNusWx-dJiR8OYiLyVc/edit?tab=t.0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5" />
          Download Guide to Order Swags
        </a>
      </div>

      {/* Prerequisites Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-orange-500 mb-2 uppercase">
          <ShieldAlert className="w-3 h-3" /> MUST BE COMPLETED BEFOREHAND
        </div>
        <h2 className="text-2xl font-bold mb-2">Mandatory Program Prerequisites & Timeline</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Complete these mandatory prerequisites beforehand to ensure your account is officially enrolled and eligible when the Prize Counter opens.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-[10px] font-bold px-2 py-1 rounded">STEP 01</span>
              <span className="border border-yellow-200 text-yellow-600 dark:border-yellow-700/50 dark:text-yellow-500 text-[10px] font-bold px-2 py-1 rounded">MANDATORY</span>
            </div>
            <h3 className="text-lg font-bold mb-3">Use 1 Email & Complete Registration</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
              Make sure your Google Cloud Skills Boost account, the official Arcade Registration Form, and any Facilitator registrations use the <strong className="underline decoration-2 underline-offset-2">exact same email address</strong>.
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScwpRj34Ysw5GEjeubPlkG49MECZTG3z820O_2Uz85IxJ9qcg/viewform" target="_blank" rel="noopener noreferrer" className="w-full bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
              Fill Registration Form <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-[10px] font-bold px-2 py-1 rounded">STEP 02</span>
              <span className="border border-indigo-200 text-indigo-600 dark:border-indigo-700/50 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded">PUBLIC SETTING</span>
            </div>
            <h3 className="text-lg font-bold mb-3">Keep Profile Settings Public</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
              Your Skills Boost profile must be set to <strong className="text-slate-800 dark:text-slate-200">Public</strong> so Google Cloud automated verification scripts can index your completed badges and record your points.
            </p>
            <Link to="/public-profile-help" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
              Public Profile Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-[10px] font-bold px-2 py-1 rounded">STEP 03</span>
              <span className="border border-orange-200 text-orange-600 dark:border-orange-700/50 dark:text-orange-500 text-[10px] font-bold px-2 py-1 rounded">ESTIMATED TIMELINE</span>
            </div>
            <h3 className="text-lg font-bold mb-4">Prize Counter Opens In:</h3>
            
            <div className="flex gap-2 justify-between mb-4 flex-grow">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-lg md:text-xl text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/50 shadow-inner">{timeLeft.days}</div>
                <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-indigo-200 dark:border-indigo-700/50 flex items-center justify-center font-bold text-lg md:text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner">{timeLeft.hours}</div>
                <span className="text-[9px] font-bold text-indigo-400 mt-1 uppercase tracking-wider">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-lg md:text-xl text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/50 shadow-inner">{timeLeft.minutes}</div>
                <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Mins</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-orange-200 dark:border-orange-700/50 flex items-center justify-center font-bold text-lg md:text-xl text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 shadow-inner">{timeLeft.seconds}</div>
                <span className="text-[9px] font-bold text-orange-400 mt-1 uppercase tracking-wider">Secs</span>
              </div>
            </div>

            <div className="flex gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
              <p><strong>Estimated Date:</strong> Approx. Jan 7th based on past program cycles. May vary by ±2-3 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <div className="border border-yellow-300 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-500 font-bold text-sm mb-3 uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5" /> CRITICAL EMAIL & REGISTRATION REQUIREMENTS
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          Make sure to complete all program registrations—your <strong className="text-slate-900 dark:text-white">Skills Boost account</strong>, the <strong className="text-slate-900 dark:text-white">Official Arcade Form</strong>, and any <strong className="text-slate-900 dark:text-white">Facilitator Program</strong>—using the <strong className="text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-2">EXACT SAME EMAIL ADDRESS</strong>. Never unsubscribe from official Arcade emails or <strong className="text-slate-900 dark:text-white">Arcade Insider</strong> monthly newsletters, as unsubscribing will cause automated tracking failures and prevent receiving prize claim codes.
        </p>

        <div className="bg-white dark:bg-slate-900 border border-yellow-200 dark:border-yellow-700/30 rounded-xl p-4 flex gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">What is the Arcade Insider Email?</h4>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200">Arcade Insider</strong> is Google's official monthly email report showing accumulated points earned from the start to a specific cutoff date. While it is Google's official source, for <strong className="text-slate-800 dark:text-slate-200">101% up-to-date, real-time results</strong> at any moment, calculate your latest points on ArcadeBuddy!
            </p>
          </div>
        </div>
      </div>

      {/* Waterfall System */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-indigo-500 mb-2 uppercase">
          WATERFALL SYSTEM & TIER CAPS
        </div>
        <h2 className="text-2xl font-bold mb-3">Waterfall Distribution System & Tier Slot Capacities</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-4xl">
          Google Cloud uses a protected "Waterfall System" to distribute rewards fairly on a first-come, first-served basis starting at Legend Tier. If a higher tier reaches its cap, your prize eligibility automatically moves to secure your spot in the next lower tier.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Legend */}
          <div className="border-2 border-dashed border-yellow-400 bg-yellow-50/30 dark:bg-yellow-900/10 rounded-2xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm">LEGEND TIER</h3>
              <span className="bg-[#FBBC04] text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded">120+ PTS</span>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>TOTAL CAPACITY:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">2,500 slots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AVAILABLE NOW:</span>
                <span className="text-red-500 font-bold">{slots.legend.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-auto leading-relaxed">
              First 2,500 claims. If filled, eligibility moves to Champion Tier.
            </p>
          </div>

          {/* Champion */}
          <div className="border-2 border-dashed border-purple-400 bg-purple-50/30 dark:bg-purple-900/10 rounded-2xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm">CHAMPION TIER</h3>
              <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">95+ PTS</span>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-700/50 rounded-xl p-4 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>TOTAL CAPACITY:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">3,000 slots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AVAILABLE NOW:</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">{slots.champion.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-auto leading-relaxed">
              First 3,000 claims. If filled, eligibility moves to Ranger Tier.
            </p>
          </div>

          {/* Ranger */}
          <div className="border-2 border-dashed border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm">RANGER TIER</h3>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">75+ PTS</span>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-700/50 rounded-xl p-4 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>TOTAL CAPACITY:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">4,000 slots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AVAILABLE NOW:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{slots.ranger.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-auto leading-relaxed">
              First 4,000 claims. If filled, eligibility moves to Trooper Tier.
            </p>
          </div>

          {/* Trooper */}
          <div className="border-2 border-dashed border-blue-400 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm">TROOPER TIER</h3>
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">50+ PTS</span>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-700/50 rounded-xl p-4 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>TOTAL CAPACITY:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">6,000 slots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AVAILABLE NOW:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{slots.trooper.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-auto leading-relaxed">
              First 5,000 claims across the program season.
            </p>
          </div>

        </div>

        {/* Green Info Box */}
        <div className="bg-emerald-50/80 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-emerald-500" /> NO NEED TO WORRY: SLOTS ARE PLENTIFUL!
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
            Please don't worry when seeing tier slot caps! Google Cloud carefully reviewed last season's data and set these new 2026 limits <strong className="text-slate-900 dark:text-white">significantly higher than the total number of players who actually claimed prizes last year</strong>. As long as you play fair, build skills, and earn your points, there is plenty of room for you to receive your rewards!
          </p>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-2">
            <span className="font-bold">✨</span> Slot counts update weekly on the official Arcade Page at claims progress.
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#111827] text-white rounded-3xl p-8 relative overflow-hidden mt-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FBBF24] mb-3 uppercase">
              <Trophy className="w-3 h-3" /> Swag Tier Status
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Ready to See Which Swag Tier You've Earned? 🏆
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Calculate your live Arcade points in seconds to see exactly where you stand on the Waterfall tier ladder and verify your prize eligibility.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link to="/calculator" className="w-full sm:w-auto text-center bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
              Check My Swag Tier <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/swags" className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-slate-700">
              View Swag Tiers Showcase
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
