import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProgressDashboard } from '../components/UserProgressDashboard';
import { CohortLockedOverlay } from '../components/CohortLockedOverlay';
import { BadgeValidatorModal } from '../components/BadgeValidatorModal';

export function MyProgressPage() {
  const location = useLocation();
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname.includes('/my-points')) {
      setTimeout(() => {
        const element = document.getElementById('my-points');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location]);

  return (
    <div className="w-full">
      <CohortLockedOverlay
        title="Facilitator Cohort Progress Vault"
        subtitle="The /my-progress tracking portal is undergoing layout and milestone calculation refinements for the upcoming facilitator program cohort. Only administrators can access this section during staging."
        cohortTag="Next Facilitator Cohort • Staging Locked"
        onOpenValidator={() => setIsValidatorOpen(true)}
      >
        <UserProgressDashboard onOpenValidator={() => setIsValidatorOpen(true)} />
      </CohortLockedOverlay>

      <BadgeValidatorModal
        isOpen={isValidatorOpen}
        onClose={() => setIsValidatorOpen(false)}
      />
    </div>
  );
}
