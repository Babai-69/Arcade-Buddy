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
        className="btn-press btn-press--sm inline-flex items-center gap-2.5 text-sm font-bold bg-[var(--card)] text-[var(--ink)] px-4 py-2 rounded-xl border-2 border-[var(--edge)] shadow-[4px_4px_0_var(--edge)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--edge)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-75 group select-none no-underline cursor-pointer"
        style={{
          border: '2px solid var(--edge)',
          boxShadow: '4px 4px 0 var(--edge)',
        }}
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 group-hover:-translate-x-1 transition-all duration-150 shrink-0" />
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
