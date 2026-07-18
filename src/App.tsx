import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { TrueLeaderboardPage } from './pages/TrueLeaderboardPage';
import { LeaderboardPage as DashboardPage } from './pages/LeaderboardPage';
import { FacilitatorPage } from './pages/FacilitatorPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { QuickStartPage } from './pages/QuickStartPage';
import { FreeCreditsPage } from './pages/FreeCreditsPage';
import { SwagsPage } from './pages/SwagsPage';
import { SyllabusPage } from './pages/SyllabusPage';
import { PublicProfileHelpPage } from './pages/PublicProfileHelpPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CodeOfConductPage } from './pages/CodeOfConductPage';
import { ProgramTnCsPage } from './pages/ProgramTnCsPage';
import { FaqPage } from './pages/FaqPage';
import { MyProgressPage } from './pages/MyProgressPage';
import { AdminProgressPage } from './pages/AdminProgressPage';
import { SupportPage } from './pages/SupportPage';
import { BonusMilestonePage } from './pages/BonusMilestonePage';
import { NotFound404 } from './pages/NotFound404';
import { AdminPanel } from './components/AdminPanel';
import { ScrollToTop } from './components/ScrollToTop';
import { AccessGuard } from './components/AccessGuard';
import { ChatBot } from './components/ChatBot';
import { mockParticipants } from './data/sampleData';
import { Participant } from './types';

export default function App() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <ScrollToTop />
      <div className="mesh-bg"></div>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <AccessGuard>
          <AnimatePresence mode="wait">
            {/* @ts-ignore */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home participants={participants} /></PageTransition>} />
              <Route path="/leaderboard" element={<PageTransition><TrueLeaderboardPage /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><DashboardPage participants={participants} /></PageTransition>} />
              <Route path="/facilitator" element={<PageTransition><FacilitatorPage /></PageTransition>} />
              <Route path="/syllabus" element={<PageTransition><SyllabusPage /></PageTransition>} />
              <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
              <Route path="/resources/bonus-milestone" element={<PageTransition><BonusMilestonePage /></PageTransition>} />
              <Route path="/quick-start" element={<PageTransition><QuickStartPage /></PageTransition>} />
              <Route path="/free-credits" element={<PageTransition><FreeCreditsPage /></PageTransition>} />
              <Route path="/public-profile-help" element={<PageTransition><PublicProfileHelpPage /></PageTransition>} />
              <Route path="/swags" element={<PageTransition><SwagsPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/my-progress" element={<PageTransition><MyProgressPage /></PageTransition>} />
              <Route path="/admin-progress" element={<PageTransition><AdminProgressPage /></PageTransition>} />
              <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
              <Route path="/code-of-conduct" element={<PageTransition><CodeOfConductPage /></PageTransition>} />
              <Route path="/program-tncs" element={<PageTransition><ProgramTnCsPage /></PageTransition>} />
              <Route path="/support" element={<PageTransition><SupportPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound404 /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </AccessGuard>
        
        {/* Hidden Admin Route using hash for easy access by the creator */}
        {window.location.hash === '#admin' && (
          <div className="mt-20">
            <AdminPanel onUpdateParticipants={setParticipants} />
          </div>
        )}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

