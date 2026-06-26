import React from 'react';
import { Calendar } from 'lucide-react';

export function FacilitatorDetails() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-16 text-left">
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase mb-1">GOOGLE CLOUD ARCADE</p>
      <h1 className="text-5xl md:text-7xl font-display text-slate-900 dark:text-white mb-6">Facilitator '26</h1>
      
      <p className="text-lg text-slate-700 dark:text-slate-300 md:leading-relaxed mb-6">
        The Arcade Facilitator Program is a no-cost gaming campaign where technical practitioners of all levels can learn new cloud skills like deploying AI agents, application development, big data & AI/ML and earn Google Cloud credentials & points to use towards <strong className="text-slate-900 dark:text-white">claiming prizes and Google Cloud benefits.</strong>
      </p>
      
      <p className="text-lg font-bold text-slate-900 dark:text-white mb-8">
        Enrolments will OPEN soon!
      </p>
      
      <div className="space-y-4 mb-10">
        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-slate-700 dark:text-slate-300 mt-0.5 flex-shrink-0" />
          <p className="text-slate-700 dark:text-slate-300 font-medium text-lg">July 13, 2026 at 5:00 PM - September 14, 2026 at 11:59 PM GMT+5:30</p>
        </div>
        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-slate-700 dark:text-slate-300 mt-0.5 flex-shrink-0" />
          <p className="text-slate-700 dark:text-slate-300 font-medium text-lg">Registration opens on July 13, 2026 at 5:00 PM GMT+5:30</p>
        </div>
      </div>
      
      <div className="w-full">
         <img src="https://services.google.com/fh/files/events/cf_site_progress_bar.png" alt="Google Cloud Colors Border" className="w-full h-auto object-contain rounded-md" />
      </div>
    </div>
  );
}
