import React from 'react';
import { Hero } from '../components/Hero';
import { Community } from '../components/Community';
import { Registration } from '../components/Registration';
import { RegistrationSteps } from '../components/RegistrationSteps';

export function Home({ participants }: { participants: any[] }) {
  return (
    <div className="space-y-4">
      <Hero participants={participants} />
      <Community />
      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-4" />
      <Registration />
      <RegistrationSteps />
    </div>
  );
}
