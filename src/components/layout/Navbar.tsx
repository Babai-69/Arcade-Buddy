import React, { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Home, LayoutGrid, User, BookOpen, Folder, Gift, Info, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import brandLogo from '../../assets/images/logo.png';

import { NavbarUserMenu } from './NavbarUserMenu';
import { NavbarNotifications } from './NavbarNotifications';

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-[18px] h-[18px]" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutGrid className="w-[18px] h-[18px]" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-[18px] h-[18px]" /> },
    { name: 'Facilitator', path: '/facilitator', icon: <User className="w-[18px] h-[18px]" /> },
    { name: 'Syllabus', path: '/syllabus', icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { name: 'Resources', path: '/resources', icon: <Folder className="w-[18px] h-[18px]" /> },
    { name: 'Swags', path: '/swags', icon: <Gift className="w-[18px] h-[18px]" /> },
    { name: 'About', path: '/about', icon: <Info className="w-[18px] h-[18px]" /> },
  ];

  return (
    <nav className="fixed w-full z-50 glass-card border-b-0 backdrop-blur-xl bg-white/60 dark:bg-slate-950/60 transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2.5 z-10 w-[200px] select-none group">
            <img
              src={brandLogo}
              alt="Arcade Buddy"
              className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] object-contain drop-shadow-[0_2px_8px_rgba(66,133,244,0.35)] dark:drop-shadow-[0_0_14px_rgba(91,141,239,0.7)] transition-transform duration-200 group-hover:scale-105"
            />
            <span
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
              className="text-2xl sm:text-[28px] font-bold tracking-tight bg-gradient-to-r from-[#4285F4] via-[#6366f1] to-[#34A853] dark:from-[#5B8DEF] dark:via-[#818cf8] dark:to-[#4ADE80] bg-clip-text text-transparent hidden sm:inline-block leading-none select-none transition-all duration-200 group-hover:brightness-110"
            >
              Arcade Buddy
            </span>
          </Link>
          
          {/* Navigation - Center Pill Style */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] rounded-full p-2 gap-1.5 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  id={`nav-${link.name.toLowerCase()}`}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 h-10 px-[14px] rounded-full border-none cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out overflow-hidden ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="shrink-0">{link.icon}</span>
                  <span 
                    className="transition-all duration-300 ease-out inline-block"
                    style={{
                      maxWidth: isActive ? '160px' : '0',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Actions - Right */}
          <div className="hidden md:flex items-center space-x-3.5 z-10 min-w-[240px] justify-end">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="btn-press btn-press--icon shrink-0 !rounded-full aspect-square"
              style={{ background: 'var(--card)', borderRadius: '50%', flexShrink: 0 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
            <Link
              id="nav-calc"
              to="/calculator"
              className="btn-press btn-press--sm inline-flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: 'var(--ink)', color: 'var(--card)' }}
            >
              Calculator
            </Link>
            <div id="nav-notif" className="shrink-0"><NavbarNotifications /></div>
            <div id="nav-profile" className="shrink-0"><NavbarUserMenu /></div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2 z-10">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="btn-press btn-press--icon shrink-0 !rounded-full aspect-square"
              style={{ background: 'var(--card)', borderRadius: '50%', flexShrink: 0 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>
            <NavbarNotifications />
            <NavbarUserMenu />
            <button 
              className="btn-press btn-press--icon text-slate-800 dark:text-white"
              style={{ background: 'var(--card)' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-xl absolute w-full left-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-[#4285F4] bg-blue-50 dark:bg-blue-900/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/calculator"
                className="btn-press btn-press--sm block text-center w-full font-bold text-sm"
                style={{ background: 'var(--ink)', color: 'var(--card)' }}
              >
                Calculator
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
