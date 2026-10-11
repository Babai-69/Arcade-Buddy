import React from 'react';
import { User, PlayCircle, ExternalLink, ArrowRight, Gift, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

export function QuickStartPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-8 pb-20">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <BackToResourcesButton handwrittenNote="← beginners onboarding guide 🚀" />
      </div>

      {/* Header */}
      <div className="w-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 py-16 px-4 text-center rounded-3xl max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <User className="w-10 h-10 text-white mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
            Get Started With Google Cloud Arcade
          </h1>
          <p className="text-lg md:text-xl text-white font-medium mb-3">
            Complete Beginners Guide to Onboarding Google Cloud Arcade 2026 Season 1
          </p>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Learn how to set up your Google Skills account, navigate the platform, and start earning arcade points through various activities and challenges.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Complete Onboarding Guide */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              📖 Complete Onboarding Guide
            </h2>
            <p className="text-slate-400 text-sm">
              Follow this step-by-step presentation to get started with Google Cloud Arcade
            </p>
          </div>
          
          <div className="bg-[#1e293b] p-4 sm:p-6 rounded-2xl border border-slate-700/50 shadow-xl relative group">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-800">
              <iframe
                src="https://docs.google.com/presentation/d/19lEbGOwf6BiM-f-KaHNiUE_F85ZYRsSftLmfNYAPD-g/embed?start=false&loop=false&delayms=3000"
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen={true}
                title="Complete Onboarding Guide"
              ></iframe>
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <span 
                style={{ fontFamily: "'Caveat', cursive" }} 
                className="text-purple-300 text-lg font-bold -rotate-1 select-none"
              >
                slides presentation 📊
              </span>
              <a 
                href="https://docs.google.com/presentation/d/19lEbGOwf6BiM-f-KaHNiUE_F85ZYRsSftLmfNYAPD-g/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg shadow-purple-500/25 transform hover:-translate-y-0.5 active:translate-y-0 border border-purple-400/30 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Full Screen</span>
              </a>
            </div>
          </div>
        </div>

        {/* Video Guide */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              🎬 Video Guide: Arcade 2026 Explained
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Watch this detailed walkthrough to get started with Google Cloud Arcade, registration process, earning points, and Facilitator program details.
            </p>
          </div>

          <div className="bg-[#1e293b] p-4 sm:p-6 rounded-2xl border border-slate-700/50 shadow-xl">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative group bg-black cursor-pointer">
              <img 
                src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782719340/maxresdefault_fhpfju.jpg" 
                alt="Google Cloud Arcade Quick Start Walkthrough Video Thumbnail"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <PlayCircle className="w-16 h-16 text-red-600 group-hover:scale-110 transition-transform bg-white rounded-full shadow-lg" />
              </div>
              <a 
                href="https://youtu.be/uNGDg-nesxc?si=-qclxfRpB3qnxsPn"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Play Video"
              ></a>
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <span 
                style={{ fontFamily: "'Caveat', cursive" }} 
                className="text-red-400 text-lg font-bold rotate-1 select-none"
              >
                video walkthrough (10 mins) 🎥
              </span>
              <a 
                href="https://youtu.be/uNGDg-nesxc?si=-qclxfRpB3qnxsPn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg shadow-red-600/30 transform hover:-translate-y-0.5 active:translate-y-0 border border-red-400/30 text-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 rounded-3xl p-8 text-center flex flex-col items-center gap-4 shadow-xl">
          <span 
            style={{ fontFamily: "'Caveat', cursive" }} 
            className="text-amber-400 text-2xl font-bold -rotate-1 select-none"
          >
            ready to start? claim free credits first! 🎁✨
          </span>
          <h3 className="text-2xl font-black text-white">Next Steps on Your Arcade Journey</h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Grab 309 free lab credits so you don't spend a single dollar, then browse the active badges catalog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link 
              to="/free-credits"
              className="bg-[#FBBC04] hover:bg-[#F9AB00] text-slate-900 font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/35 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 border border-yellow-400/50 text-sm"
            >
              <Gift className="w-4 h-4" />
              <span>Claim 309 Free Credits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/syllabus"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 border border-slate-700 hover:border-slate-600 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Badge Syllabus</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
