import React from 'react';
import { PrizeRedemptionGuide } from '../components/PrizeRedemptionGuide';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

export function PrizeCounterGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-6">
        <BackToResourcesButton handwrittenNote="← explore more guides & tools" />
      </div>
      <PrizeRedemptionGuide />
    </div>
  );
}
