import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChartBar, Settings, Upload, Award, Bell, Clock, Compass } from 'lucide-react';
import { auth, db, loginWithGoogleRedirect, logout } from '../../lib/firebase';
import { ensureUserExists } from '../../lib/userProgressService';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LoginModal } from '../auth/LoginModal';
import { CertificateModal } from '../auth/CertificateModal';

export function NavbarUserMenu() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [pendingQueries, setPendingQueries] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await ensureUserExists(currentUser);
        // Check for queries if admin
        const adminEmails = ['deya58690@gmail.com', 'tripti.arcade.25@gmail.com'];
        if (currentUser.email && adminEmails.includes(currentUser.email)) {
          const q = query(collection(db, 'queries'), where('status', '==', 'pending'));
          try {
            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            // Only keep ones that are within 48 hours or overdue
            setPendingQueries(docs);
          } catch(e) {
            console.error("Failed to load queries", e);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleCloseAll = () => setIsOpen(false);
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginModalOpen(true);
    window.addEventListener('open-login-modal', handleOpenLogin);
    return () => window.removeEventListener('open-login-modal', handleOpenLogin);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('arcadeProgressData');
    localStorage.removeItem('arcadeProfileUrl');
    localStorage.removeItem('arcadeLastSyncTime');
    sessionStorage.removeItem('arcadeSessionDashboardSynced');
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) {
    return (
      <div className="relative flex items-center" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="btn-press btn-press--icon shrink-0 !rounded-full aspect-square"
          style={{ background: 'var(--card)', borderRadius: '50%', flexShrink: 0 }}
          title="Profile & Tour"
          aria-label="Profile & Tour"
        >
          <User className="w-5 h-5" style={{ color: 'var(--ink)' }} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-3 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50">
            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile &amp; Help</p>
            </div>
            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="btn-press btn-press--sm btn-press--primary w-full text-left flex items-center gap-3"
              >
                <User className="w-4 h-4 text-white" />
                Sign In to Track
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new Event('start-welcome-tour'));
                }}
                className="btn-press btn-press--sm btn-press--secondary w-full text-left flex items-center gap-3"
              >
                <Compass className="w-4 h-4 text-amber-500" />
                Guided Tour
              </button>
            </div>
          </div>
        )}

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    );
  }

  const isAdmin = user.email === 'deya58690@gmail.com' || user.email === 'tripti.arcade.25@gmail.com';

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        style={{
          position: 'relative',
          width: '44px',
          height: '44px',
          minWidth: '44px',
          minHeight: '44px',
          aspectRatio: '1 / 1',
          cursor: 'pointer',
          flexShrink: 0,
          borderRadius: '50%',
          padding: 0,
          border: 'none',
          background: 'none',
          outline: 'none',
          display: 'inline-grid',
          placeItems: 'center'
        }}
        onClick={() => setIsOpen(!isOpen)}
        title={user?.displayName || user?.email || 'Profile'}
        aria-label="User Profile"
        className="focus:outline-none transition-transform active:scale-95"
      >
        {/* Rotating rainbow border ring */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            transform: 'translateZ(0)',
            isolation: 'isolate',
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              top: '-50%',
              left: '-50%',
              background: 'conic-gradient(#4285F4,#34A853,#FBBC05,#EA4335,#7c3aed,#4285F4)',
              animation: 'spinCW 3s linear infinite',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Clean background circle separating the image */}
        <div 
          style={{
            position: 'absolute',
            inset: '2.5px',
            borderRadius: '50%',
            background: 'var(--card)',
            zIndex: 1
          }}
        />

        {/* User photo OR initials fallback */}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ? `${user.displayName}'s profile photo` : 'User profile avatar'}
            className="rounded-full object-cover"
            style={{
              position: 'absolute',
              inset: '2.5px',
              width: 'calc(100% - 5px)',
              height: 'calc(100% - 5px)',
              borderRadius: '50%',
              objectFit: 'cover',
              zIndex: 2,
              display: 'block'
            }}
          />
        ) : (
          <div 
            style={{
              position: 'absolute',
              inset: '2.5px',
              width: 'calc(100% - 5px)',
              height: 'calc(100% - 5px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4285F4, #34A853)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              zIndex: 2
            }}
          >
            {user?.displayName?.charAt(0).toUpperCase()
              || user?.email?.charAt(0).toUpperCase()
              || 'A'}
          </div>
        )}

        {/* Green online dot */}
        <span 
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#34A853',
            border: '2px solid var(--card)',
            zIndex: 3,
            animation: 'pulse 2.5s ease-in-out infinite'
          }}
        />
        
        {/* Red notification dot if pending queries */}
        {isAdmin && pendingQueries.length > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid var(--card)',
              zIndex: 4,
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {user.displayName || 'Student'}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsCertificateModalOpen(true);
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
            >
              <Award className="w-4 h-4 text-green-500" />
              Download Certificate
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/my-progress');
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
            >
              <ChartBar className="w-4 h-4 text-blue-500" />
              My Progress
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new Event('start-welcome-tour'));
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              Guided Tour
            </button>
            
            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/admin-progress');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                >
                  <Settings className="w-4 h-4 text-purple-500" />
                  Admin: All Students
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/admin-feedback');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                >
                  <Settings className="w-4 h-4 text-blue-500" />
                  Admin: Feedback
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/admin-queries');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-red-500" />
                    Manage Queries & Feedback
                  </span>
                  {pendingQueries.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {pendingQueries.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/leaderboard');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                >
                  <Upload className="w-4 h-4 text-green-500" />
                  Upload CSV
                </button>
              </>
            )}
          </div>
          
          <div className="border-t border-slate-100 dark:border-slate-800 py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      <CertificateModal 
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        userEmail={user?.email}
      />
    </div>
  );
}
