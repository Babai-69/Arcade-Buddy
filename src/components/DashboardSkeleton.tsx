import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 w-full max-w-7xl mx-auto space-y-6">
      
      {/* ProgramInformation Skeleton */}
      <div className="text-center mb-12 animate-pulse flex flex-col items-center">
        <div className="h-10 w-3/4 max-w-2xl bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
        <div className="h-4 w-1/2 max-w-md bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      </div>

      {/* Milestones Skeleton */}
      <section className="py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 shadow-lg h-64">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 mb-6"></div>
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full mt-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Row: Profile + Stats */}
      <div className="flex flex-col lg:flex-row gap-6 animate-pulse mt-12">
        
        {/* Profile Card Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden lg:w-1/3 border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex w-full">
            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 py-3 h-20"></div>
            <div className="w-1/2 bg-slate-300 dark:bg-slate-600 py-3 h-20"></div>
          </div>
          
          <div className="flex flex-col items-center pt-8 pb-6 px-6 bg-slate-50 dark:bg-slate-800/50 flex-grow">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-800 shadow-lg mb-6"></div>
            <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
            
            <div className="flex w-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 mb-8 overflow-hidden h-20">
              <div className="w-1/2 border-r border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-700/50"></div>
              <div className="w-1/2 bg-slate-50 dark:bg-slate-700/30"></div>
            </div>
            
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>

        {/* Right Stats Skeleton */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-2"></div>
                <div className="h-3 w-48 bg-slate-100 dark:bg-slate-700/50 rounded mx-auto mb-6"></div>
                
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 mb-6"></div>
                
                <div className="flex justify-between px-2">
                  <div className="w-16 h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="w-16 h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="w-16 h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
              
              <div className="w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
              
              <div className="md:w-64 flex flex-col justify-center">
                <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-2"></div>
                <div className="h-3 w-48 bg-slate-100 dark:bg-slate-700/50 rounded mx-auto mb-6"></div>
                
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
                
                <div className="h-16 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700 flex justify-between items-center mt-auto h-24">
            <div className="flex items-center gap-4 w-1/3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="w-1/3 flex flex-col items-center gap-2">
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
            </div>
            <div className="w-1/3 flex justify-end">
              <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
          </div>
          
          <div className="h-10 w-full bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700"></div>
        </div>
      </div>

      {/* Badges & Activity Row Skeleton */}
      <div className="flex flex-col md:flex-row gap-6 mt-8 animate-pulse">
        {/* Badges Donut Skeleton */}
        <div className="w-full md:w-1/3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center h-64">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6 self-start"></div>
          <div className="w-32 h-32 rounded-full border-8 border-slate-200 dark:border-slate-700 mb-4"></div>
        </div>
        
        {/* Activity Heatmap Skeleton */}
        <div className="w-full md:w-2/3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 h-64">
           <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
           </div>
           <div className="flex items-center justify-center gap-8 h-32">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
              <div className="grid grid-cols-7 gap-1.5 w-[200px]">
                {Array(35).fill(0).map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-sm bg-slate-200 dark:bg-slate-700"></div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
