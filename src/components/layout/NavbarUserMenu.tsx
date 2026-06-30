import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChartBar, Settings, Upload, Award } from 'lucide-react';
import { auth, loginWithGoogleRedirect, logout } from '../../lib/firebase';
import { ensureUserExists } from '../../lib/userProgressService';
import { onAuthStateChanged } from 'firebase/auth';
import { LoginModal } from '../auth/LoginModal';
import { CertificateModal } from '../auth/CertificateModal';

export function NavbarUserMenu() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await ensureUserExists(currentUser);
      }
    });
    return () => unsubscribe();
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

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) {
    return (
      <>
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm border border-slate-200 dark:border-slate-700"
          title="Sign In to Track Progress"
        >
          <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  }

  const isAdmin = user.email === 'deya58690@gmail.com' || user.email === 'tripti.arcade.25@gmail.com';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        style={{
          position: 'relative',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          flexShrink: 0
        }}
        onClick={() => setIsOpen(!isOpen)}
        title={user?.displayName || user?.email || 'Profile'}
      >
        {/* Rotating glow ring */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '50%',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: 'conic-gradient(#4285F4,#34A853,#FBBC05,#EA4335,#7c3aed,#4285F4)',
            animation: 'spinCW 3s linear infinite'
          }}/>
        </div>

        {/* Dark gap between ring and photo */}
        <div style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '50%',
          background: '#0f1117',
          zIndex: 1
        }}/>

        {/* User photo OR initials fallback */}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            style={{
              position: 'absolute',
              inset: '2px',
              width: 'calc(100% - 4px)',
              height: 'calc(100% - 4px)',
              borderRadius: '50%',
              objectFit: 'cover',
              zIndex: 2
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: '2px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4285F4, #34A853)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: '#fff',
            zIndex: 2
          }}>
            {user?.displayName?.charAt(0).toUpperCase() 
             || user?.email?.charAt(0).toUpperCase() 
             || 'A'}
          </div>
        )}

        {/* Green online dot */}
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          background: '#34A853',
          border: '2px solid #0f1117',
          zIndex: 3,
          animation: 'pulse 2.5s ease-in-out infinite'
        }}/>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50">
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
