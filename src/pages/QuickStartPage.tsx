import React from 'react';
import { User, PlayCircle, ExternalLink } from 'lucide-react';

export function QuickStartPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-16">
      {/* Header */}
      <div className="w-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <User className="w-8 h-8 text-white mb-4" />
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
          
          <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700/50 shadow-xl relative group">
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
            
            <div className="mt-4 flex justify-center">
              <a 
                href="https://docs.google.com/presentation/d/19lEbGOwf6BiM-f-KaHNiUE_F85ZYRsSftLmfNYAPD-g/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Full Screen
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

          <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700/50 shadow-xl">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative group bg-black cursor-pointer">
              <img 
                src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782719340/maxresdefault_fhpfju.jpg" 
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <PlayCircle className="w-16 h-16 text-red-600 group-hover:scale-110 transition-transform bg-white rounded-full" />
              </div>
              <a 
                href="https://youtu.be/uNGDg-nesxc?si=-qclxfRpB3qnxsPn"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Play Video"
              ></a>
            </div>
            
            <div className="mt-4 flex justify-center">
              <a 
                href="https://youtu.be/uNGDg-nesxc?si=-qclxfRpB3qnxsPn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
