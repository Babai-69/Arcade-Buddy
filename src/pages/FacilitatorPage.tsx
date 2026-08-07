import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FacilitatorBonus } from '../components/FacilitatorBonus';
import { FacilitatorDetails } from '../components/FacilitatorDetails';
import { FacilitatorWhy } from '../components/FacilitatorWhy';
import { PointsSystem } from '../components/PointsSystem';
import { HowBonusWorks } from '../components/HowBonusWorks';

export function FacilitatorPage() {
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
    <div className="space-y-4 pt-24 pb-20">
      <FacilitatorDetails />
      <FacilitatorWhy />
      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-10" />
      <div id="points-system"><PointsSystem /></div>
      <HowBonusWorks />
      <FacilitatorBonus />
    </div>
  );
}
