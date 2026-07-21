import React from 'react';
import { ProfileChecker } from '../components/ProfileChecker';

export function CalculatorPage({ participants }: { participants: any[] }) {
  return (
    <div className="pt-24 pb-20 px-4">
      <ProfileChecker participants={participants} />
    </div>
  );
}
