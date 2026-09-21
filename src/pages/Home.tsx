import React from 'react';
import { Hero } from '../components/Hero';
import { Community } from '../components/Community';
import { ProgramInformation } from '../components/ProgramInformation';
import { Registration } from '../components/Registration';
import { RegistrationSteps } from '../components/RegistrationSteps';
import { RegistrationGuideWidget } from '../components/RegistrationGuideWidget';

export function Home({ participants }: { participants: any[] }) {
  return (
    <div className="relative flex flex-col">
      <Hero participants={participants} />
      <Community />
      <ProgramInformation />
      <Registration />
      <RegistrationSteps />
      <RegistrationGuideWidget />
    </div>
  );
}
