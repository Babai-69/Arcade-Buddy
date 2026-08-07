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
    }
  }, [location]);

  return (
    <main className="flex-grow pt-16">
      <UserProgressDashboard />
    </main>
  );
}
