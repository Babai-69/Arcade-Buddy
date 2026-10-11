import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackToResourcesButtonProps {
  className?: string;
  label?: string;
  to?: string;
  handwrittenNote?: string;
}

export function BackToResourcesButton({
  className = '',
  label = 'Back to Resources',
  to = '/resources',
  handwrittenNote
}: BackToResourcesButtonProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Link
        to={to}
        className="inline-flex items-center gap-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-sm font-bold bg-white dark:bg-slate-900 px-5 py-2.5 rounded-full border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 transform hover:-translate-x-0.5 group active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-white transition-colors shrink-0" />
        <span>{label}</span>
      </Link>
      {handwrittenNote && (
        <span 
          className="text-amber-600 dark:text-amber-400 text-lg hidden sm:inline-block font-semibold -rotate-2 select-none"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {handwrittenNote}
        </span>
      )}
    </div>
  );
}
