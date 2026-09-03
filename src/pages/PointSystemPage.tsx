import React from 'react';
import { ArcadePointsSystem } from '../components/ArcadePointsSystem';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PointSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-6">
        <Link 
          to="/resources" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm font-bold bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
      </div>
      <ArcadePointsSystem />
    </div>
  );
}
