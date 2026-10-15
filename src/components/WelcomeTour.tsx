import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Compass } from 'lucide-react';
import { createPortal } from 'react-dom';

const steps = [
  { sel: '#nav-home', title: 'You are on the Home page', desc: "This is where every visitor lands first — the program overview, the countdown, and quick links to everything else. I'll walk you through the rest of the site from here.", placement: 'bottom' },
  { sel: '#nav-dashboard', title: 'Dashboard — your personal command center', desc: 'This is where the Arcade program itself lives: your current points, tier progress, active Facilitator Milestones, and how many days are left in the Jul–Sep 2026 cohort.', placement: 'bottom' },
  { sel: '#nav-leaderboard', title: 'Leaderboard — find yourself in the ranks', desc: "Every participant who's enrolled shows up here, ranked by points. Try searching your name below — this is exactly how it works on the real page.", demo: 'leaderboard', placement: 'bottom' },
  { sel: '#nav-facilitator', title: 'Facilitator', desc: 'Everything about the facilitator program — your Facilitator points system, community responsibilities, and tools to help you support your student group.', placement: 'bottom' },
  { sel: '#nav-resources', title: 'Resources', desc: 'All the study material, lab guides, and trackers you need for the Arcade games and skill badges, organized in one place.', placement: 'bottom' },
  { sel: '#nav-swags', title: 'Swags', desc: 'See every reward tier — Trooper, Ranger, Champion, Legend — and exactly how many points each one takes to unlock.', placement: 'bottom' },
  { sel: '#nav-about', title: 'About', desc: 'Learn about the facilitator behind this program, get support if something looks wrong, and check the FAQs before asking in the community.', placement: 'bottom' },
  { sel: '#nav-notif', title: 'Notifications', desc: 'Announcements, deadline reminders, and updates about your submission all land here — worth checking often during the cohort.', placement: 'bottom-left' },
  { sel: '#nav-calc', title: 'Calculator', desc: 'A quick points calculator so you can estimate your Arcade points & tier progress without opening the full Dashboard.', placement: 'bottom-left' },
  { sel: '#nav-profile', title: 'Your Profile', desc: 'This analyzes your Google Cloud Skills Boost profile and turns your games and badges into your real Arcade points.', placement: 'bottom-left' },
  { sel: null, custom: 'chat', title: 'Chatbot', desc: "Got a question at 2am? The chatbot in the bottom-right corner knows the program inside out and answers instantly.", placement: 'top-left' },
];

export function WelcomeTour() {
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lbFilter, setLbFilter] = useState('');
  const [ringStyle, setRingStyle] = useState<React.CSSProperties>({});
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseAll = () => {
      if (tourActive) setTourActive(false);
    };
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, [tourActive]);

  const startTour = () => {
    setTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setTourActive(false);
    try {
      localStorage.setItem('arcadeBuddyWelcomeDismissedTime', Date.now().toString());
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const handleStartTour = () => {
      startTour();
    };
    window.addEventListener('start-welcome-tour', handleStartTour);
    return () => window.removeEventListener('start-welcome-tour', handleStartTour);
  }, []);

  useEffect(() => {
    if (!tourActive) {
      document.body.style.overflow = '';
      return;
    }
    
    document.body.style.overflow = 'hidden';
    const step = steps[currentStep];
    
    // allow time for scroll and render
    const timer = setTimeout(() => {
      let target: HTMLElement | null = null;
      if (step.custom === 'chat') target = document.querySelector('.fab-chat');
      else if (step.sel) {
        target = document.querySelector(step.sel);
        // Fallback for mobile menu if desktop menu is hidden
        if (!target || target.offsetParent === null) {
          const mobileSel = step.sel.replace('#nav-', '#mobile-nav-');
          const mobileTarget = document.querySelector(mobileSel) as HTMLElement;
          if (mobileTarget && mobileTarget.offsetParent !== null) {
             target = mobileTarget;
          }
        }
      }

      if (target) {
        if (target.offsetParent !== null) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        setTimeout(() => {
          if (target!.offsetParent === null) {
             // Target is hidden, fallback to center of screen
             setRingStyle({ opacity: 0 });
             setCardStyle({
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
             });
             return;
          }

          const r = target!.getBoundingClientRect();
          
          setRingStyle({
            opacity: 1,
            top: `${r.top - 8}px`,
            left: `${r.left - 8}px`,
            width: `${r.width + 16}px`,
            height: `${r.height + 16}px`,
            borderRadius: step.custom === 'chat' ? '50%' : '16px'
          });

          const cardW = 328;
          let top, left;
          const placement = step.placement;
          const cardH = cardRef.current ? cardRef.current.offsetHeight : 260;
          if (placement === 'bottom') {
            top = r.bottom + 18;
            left = Math.min(window.innerWidth - cardW - 16, Math.max(16, r.left + r.width / 2 - cardW / 2));
          } else if (placement === 'bottom-left') {
            top = r.bottom + 18;
            left = Math.max(16, r.right - cardW);
          } else if (placement === 'top-left') {
            top = r.top - 18 - cardH;
            left = Math.max(16, r.right - cardW);
          } else {
            top = r.top - 18 - cardH;
            left = Math.min(window.innerWidth - cardW - 16, r.left);
          }
          
          setCardStyle({
            transform: 'none',
            top: `${top}px`,
            left: `${left}px`,
          });
        }, 220);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [tourActive, currentStep]);

  useEffect(() => {
    const handleResize = () => {
      if (tourActive) {
        // Trigger a re-render/re-position
        setCurrentStep(s => s);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tourActive]);

  const sampleLb = ['Tripti Gupta','Abir Dey','Jaadu','Jeethalal','Rohit Sharma','Virat Kohli'];

  return (
    <>
      <style>{`
        @keyframes welcomeIn { from { opacity: 0; transform: translateY(18px) scale(0.97); } to { opacity: 1; transform: none; } }
        @keyframes shimmer { to { background-position: -200% 0; } }
        @keyframes blink { 0%, 90%, 100% { transform: scaleY(1); } 94% { transform: scaleY(0.15); } }
        @keyframes wave { 0%, 100% { transform: rotate(0deg); } 20% { transform: rotate(-32deg); } 40% { transform: rotate(-8deg); } 60% { transform: rotate(-28deg); } 80% { transform: rotate(-6deg); } }
        @keyframes antennaPulse { 0%, 100% { fill: #FBBC04; filter: drop-shadow(0 0 2px #FBBC04); } 50% { fill: #EA4335; filter: drop-shadow(0 0 6px #EA4335); } }
      `}</style>
      <button
        className={`fab-chat fixed bottom-6 right-6 ${tourActive && steps[currentStep].custom === 'chat' ? 'z-[600]' : 'z-[60]'} btn-press btn-press--icon cursor-pointer`}
        style={{ background: 'var(--card)', color: 'var(--ink)' }}
        title="Chatbot"
        aria-label="Chatbot"
      >
        <MessageCircle size={22} />
      </button>

      {tourActive && createPortal(
        <div id="tour-overlay" className="fixed inset-0 z-[500] block">
          <div id="tour-dim" className="absolute inset-0 bg-[#14161A]/55" style={{ transition: 'clip-path 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)' }}></div>
          <div id="tour-ring" className="absolute rounded-2xl border-2 border-[#FBBC04] shadow-[0_0_0_6px_rgba(251,188,4,.18),_0_0_30px_rgba(251,188,4,.35)] pointer-events-none" style={{ transition: 'all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s', ...ringStyle }}></div>
          <div ref={cardRef} className="absolute w-[328px] bg-white rounded-[18px] shadow-[0_24px_60px_rgba(20,22,26,.28)] pt-5 px-5 pb-[18px]" style={{ transition: 'top 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)', ...cardStyle }}>
            
            <div className="flex items-center gap-3">
              <svg className="w-[52px] h-[52px] shrink-0" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <rect x="60" y="16" width="8" height="14" rx="4" fill="#5F6368"/>
                <circle cx="64" cy="12" r="6" style={{ animation: 'antennaPulse 1.8s ease-in-out infinite' }}/>
                <rect x="28" y="30" width="72" height="56" rx="22" fill="#1A73E8"/>
                <rect x="37" y="38" width="54" height="36" rx="15" fill="#E8F0FE"/>
                <ellipse cx="45" cy="64" rx="5" ry="3.5" fill="#FBBC04" opacity=".55"/>
                <ellipse cx="83" cy="64" rx="5" ry="3.5" fill="#FBBC04" opacity=".55"/>
                <g style={{ animation: 'blink 3.2s ease-in-out infinite', transformOrigin: 'center' }}><circle cx="53" cy="55" r="5.6" fill="#174EA6"/><circle cx="55" cy="53" r="1.6" fill="#fff"/></g>
                <g style={{ animation: 'blink 3.2s ease-in-out infinite', transformOrigin: 'center', animationDelay: '.15s' }}><circle cx="75" cy="55" r="5.6" fill="#174EA6"/><circle cx="77" cy="53" r="1.6" fill="#fff"/></g>
                <path d="M55 65 Q64 71 73 65" stroke="#174EA6" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
                <rect x="38" y="88" width="52" height="30" rx="14" fill="#34A853"/>
                <circle cx="64" cy="103" r="6" fill="#fff" opacity=".85"/>
                <rect x="14" y="92" width="16" height="9" rx="4.5" fill="#EA4335"/>
                <g style={{ transformOrigin: '92px 94.5px', transformBox: 'view-box', animation: 'wave 1.2s ease-in-out infinite' }}>
                  <rect x="92" y="90" width="18" height="9" rx="4.5" fill="#EA4335"/>
                  <circle cx="108" cy="94.5" r="7.5" fill="#FBBC04"/>
                </g>
                <rect x="44" y="114" width="12" height="9" rx="4" fill="#5F6368"/>
                <rect x="72" y="114" width="12" height="9" rx="4" fill="#5F6368"/>
              </svg>
              <div>
                <div className="font-display font-bold text-[13.5px] text-[#1A73E8]">Arcade Buddy</div>
                <div className="text-[11px] text-[#80868B] uppercase tracking-[0.03em]">Step {currentStep + 1} of {steps.length}</div>
              </div>
            </div>

            <div className="font-display font-bold text-[16.5px] mt-3 text-[#202124]">{steps[currentStep].title}</div>
            <div className="mt-1.5 text-[13.5px] text-[#5F6368] leading-[1.55]">{steps[currentStep].desc}</div>
            
            <div className="mt-3">
              {steps[currentStep].demo === 'leaderboard' && (
                <>
                  <input type="text" value={lbFilter} onChange={e => setLbFilter(e.target.value)} className="w-full py-[9px] px-3 border border-[#DADCE0] rounded-[10px] text-[13px] outline-none focus:border-[#1A73E8]" placeholder="Type a name to search…" />
                  <div className="mt-2 max-h-[110px] overflow-auto border border-[#DADCE0] rounded-[10px]">
                    {sampleLb.map((n, i) => ({ n, rank: i + 1 })).filter(r => r.n.toLowerCase().includes(lbFilter.toLowerCase())).length > 0 ? (
                      sampleLb.map((n, i) => ({ n, rank: i + 1 })).filter(r => r.n.toLowerCase().includes(lbFilter.toLowerCase())).map(r => (
                        <div key={r.rank} className={`flex justify-between py-2 px-3 text-[12.5px] border-b border-[#DADCE0] last:border-b-0 text-[#202124] ${lbFilter && r.n.toLowerCase().includes(lbFilter.toLowerCase()) && lbFilter.length > 1 ? 'bg-[#E8F0FE] font-semibold' : ''}`}>
                          <span>#{r.rank} {r.n}</span>
                          <span>{600 - r.rank * 37} pts</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between py-2 px-3 text-[12.5px] text-[#202124]">No participant found</div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-[5px]">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-[#1A73E8] w-4' : 'bg-[#DADCE0] w-1.5'}`}></span>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <span onClick={endTour} className="text-xs text-[#80868B] cursor-pointer underline mr-1 hover:text-[#5F6368]">Skip tour</span>
                <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0} className={`btn-press btn-press--sm btn-press--secondary ${currentStep === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>Back</button>
                <button onClick={() => currentStep === steps.length - 1 ? endTour() : setCurrentStep(s => s + 1)} className="btn-press btn-press--sm btn-press--primary">{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
