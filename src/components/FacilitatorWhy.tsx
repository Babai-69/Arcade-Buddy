import React from 'react';

export function FacilitatorWhy() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-16 text-left">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">Why should I enrol in the program?</h2>
      <p className="text-slate-700 dark:text-slate-300 md:leading-relaxed mb-6">
        There are a lot of things in store for you. We want to make sure that by the end of this
        program:
      </p>
      
      <div className="mb-12">
        <p className="text-slate-700 dark:text-slate-300 md:leading-relaxed mb-8">
          1. You can showcase what you've learned here to your professional network using <strong className="text-slate-900 dark:text-white">Google Cloud-hosted digital badges (see below)</strong> that you can add to your resume and
          professional profiles like LinkedIn. 🏆
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-start py-2">
          {/* Default Unsplash images to be replaced by the user */}
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf26_game_badge.png" alt="Game Badge" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf_site_skill_badge_image.png" alt="Skill Badge" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf26_bc_game_badge.png" alt="Base Camp Badge" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-slate-700 dark:text-slate-300 md:leading-relaxed mb-8">
          2. And on top of these amazing badges, get a chance <strong className="text-slate-900 dark:text-white">to earn Arcade + Bonus Points
          and redeem them for some really cool Google Cloud goodies*</strong>. 💪 (See <a href="https://rsvp.withgoogle.com/events/arcade-facilitator/points-system" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Points System</a> section)
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-start mb-4">
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf26_prizes_image4.png" alt="Swag Bundle 1" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf26_prizes_image5.png" alt="Swag Bundle 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src="https://services.google.com/fh/files/misc/gcaf26_prizes_image6.png" alt="Swag Bundle 3" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="text-right mt-6">
          <p className="text-sm text-slate-500 italic font-medium">
            *The actual items might be different!
          </p>
        </div>
      </div>
    </div>
  );
}
