import React from 'react';
import { SupportSection } from '../components/SupportSection';
import { Link } from 'react-router-dom';

export function ContactUsPage() {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-slate-50 dark:bg-[#0d1117]">
      <div className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 max-w-6xl mx-auto w-full text-center">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">
          <Link to="/" className="hover:text-[#F15A24] transition-colors">&larr; HOME</Link> 
           &nbsp;&middot;&nbsp;
           <span className="text-[#F15A24] dark:text-[#F15A24]">CONTACT US</span>
        </div>
        
        <SupportSection />
      </div>
    </div>
  );
}
