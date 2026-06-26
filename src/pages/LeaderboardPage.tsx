import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileChecker } from '../components/ProfileChecker';
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
    <div className="space-y-4 pt-24 pb-20 px-4">
      <ProgramInformation />
      <Milestones />
      <ProfileChecker participants={participants} />
      <HelpfulResources />
    </div>
  );
}
