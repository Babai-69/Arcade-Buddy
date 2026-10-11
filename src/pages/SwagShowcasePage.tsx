import React from 'react';
import { SwagShowcase } from '../components/SwagShowcase';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

export function SwagShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-6">
        <BackToResourcesButton handwrittenNote="← past & current swag collections 🎁" />
      </div>
      <SwagShowcase />
    </div>
  );
}
