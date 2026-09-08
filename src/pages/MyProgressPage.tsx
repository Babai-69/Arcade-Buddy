import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProgressDashboard } from '../components/UserProgressDashboard';

export function MyProgressPage() {
  const location = useLocation();

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
    <main className="flex-grow pt-16">
      <UserProgressDashboard />
    </main>
  );
}
