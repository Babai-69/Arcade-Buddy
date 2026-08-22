import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Milestones } from '../components/Milestones';
import { ProgramInformation } from '../components/ProgramInformation';
import { HelpfulResources } from '../components/HelpfulResources';

export function LeaderboardPage({ participants }: { participants: any[] }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans flex flex-col pt-24 pb-20 px-4">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-16">
      <ProgramInformation />
      <Milestones />
      <HelpfulResources />
      </div>
    </div>
  );
}
