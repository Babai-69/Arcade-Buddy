import React from 'react';
import { ArcadePointsSystem } from '../components/ArcadePointsSystem';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

export function PointSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-6">
        <BackToResourcesButton handwrittenNote="← points breakdown & formula 🧮" />
      </div>
      <ArcadePointsSystem />
    </div>
  );
}
