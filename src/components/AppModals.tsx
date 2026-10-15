import React, { useState, useEffect } from 'react';
import { ArcadeInsiderModal } from './ArcadeInsiderModal';
import { WelcomeModal } from './WelcomeModal';
import { isInsiderAnnouncementActive } from '../utils/announcementUtils';

export function AppModals() {
  const [showInsider, setShowInsider] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isInsiderActive = isInsiderAnnouncementActive();

    // Check if user has seen insider popup
    let hasSeenInsider = false;
    let hasSeenWelcome = false;

    try {
      hasSeenInsider = !!localStorage.getItem('arcade_insider_october_email_seen');
      hasSeenWelcome = !!localStorage.getItem('arcade_welcome_modal_seen');
    } catch (e) {
      console.warn('Could not read modal state from localStorage', e);
    }

    if (isInsiderActive && !hasSeenInsider) {
      // 7-day period is active and user hasn't seen insider modal yet -> show insider modal
      const timer = setTimeout(() => {
        setShowInsider(true);
      }, 900);
      return () => clearTimeout(timer);
    } else if (!hasSeenWelcome) {
      // Either 7 days have passed (insider vanished) OR user already saw the insider announcement -> show welcome card
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInsiderDismiss = () => {
    setShowInsider(false);
    try {
      localStorage.setItem('arcade_insider_october_email_seen', 'true');
      const hasSeenWelcome = !!localStorage.getItem('arcade_welcome_modal_seen');
      if (!hasSeenWelcome) {
        // Show welcome modal shortly after closing insider modal
        setTimeout(() => {
          setShowWelcome(true);
        }, 350);
      }
    } catch (e) {
      console.warn('Could not update localStorage', e);
    }
  };

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
    try {
      localStorage.setItem('arcade_welcome_modal_seen', 'true');
    } catch (e) {
      console.warn('Could not update localStorage', e);
    }
  };

  return (
    <>
      {showInsider && <ArcadeInsiderModal onDismiss={handleInsiderDismiss} />}
      {showWelcome && (
        <WelcomeModal
          isOpen={showWelcome}
          onClose={handleWelcomeDismiss}
        />
      )}
    </>
  );
}
