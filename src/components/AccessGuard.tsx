import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { RestrictedAccess } from '../pages/RestrictedAccess';

export function AccessGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isRestrictedPath = location.pathname.startsWith('/admin') || location.pathname.startsWith('/query');

  if (isRestrictedPath) {
    if (loading) {
      return (
        <div className="min-h-[560px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#5b6cf9] border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    const isAdmin = user && (user.email === 'deya58690@gmail.com' || user.email === 'tripti.arcade.25@gmail.com');
    if (!isAdmin) {
      return <RestrictedAccess user={user} />;
    }
  }

  return <>{children}</>;
}
