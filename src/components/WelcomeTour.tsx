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
  const [showWelcome, setShowWelcome] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lbFilter, setLbFilter] = useState('');
  const [ringStyle, setRingStyle] = useState<React.CSSProperties>({});
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissedTime = localStorage.getItem('arcadeBuddyWelcomeDismissedTime');
    const now = Date.now();
    let shouldShow = true;
    
    if (dismissedTime) {
      const timePassed = now - parseInt(dismissedTime, 10);
      const daysPassed = timePassed / (1000 * 60 * 60 * 24);
      if (daysPassed < 10) {
        shouldShow = false;
      }
    }
    
    if (shouldShow) {
      const timer = setTimeout(() => {
        // Show entry welcome card modal first when user opens the website
        setShowWelcome(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeWelcome = () => {
    setShowWelcome(false);
  };

  const dontShowAgain = () => {
    localStorage.setItem('arcadeBuddyWelcomeDismissedTime', Date.now().toString());
    closeWelcome();
  };

  const startTour = () => {
    closeWelcome();
    setTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setTourActive(false);
    // When they finish or skip the tour, don't show it for 10 days
    localStorage.setItem('arcadeBuddyWelcomeDismissedTime', Date.now().toString());
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
      <button className={`fab-chat fixed bottom-6 right-6 ${tourActive && steps[currentStep].custom === 'chat' ? 'z-[600]' : 'z-[60]'} w-[52px] h-[52px] rounded-full bg-white border border-[#DADCE0] flex items-center justify-center text-[20px] shadow-[0_8px_20px_rgba(32,33,36,0.12)] cursor-pointer text-[#5F6368] hover:bg-slate-50 transition-colors`} title="Chatbot">
        <MessageCircle size={24} />
      </button>

      {showWelcome && createPortal(
        <div id="welcome" className="fixed inset-0 z-[700] flex items-start justify-center pt-10 px-4 overflow-y-auto" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(26,115,232,.10), transparent 60%), rgba(20,22,26,.45)', backdropFilter: 'blur(6px)' }}>
          <div className="relative w-full max-w-[432px] mx-auto bg-white rounded-[26px] shadow-[0_30px_80px_rgba(20,22,26,.35),_0_4px_14px_rgba(20,22,26,.08)] overflow-hidden text-left animate-[welcomeIn_0.5s_cubic-bezier(0.2,0.8,0.2,1)] mb-10">
            <div className="h-[6px] w-full" style={{ background: 'linear-gradient(90deg,#1A73E8,#34A853,#FBBC04,#EA4335,#1A73E8)', backgroundSize: '200% 100%', animation: 'shimmer 5s linear infinite' }}></div>
            <button onClick={closeWelcome} className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center text-[#80868B] text-base cursor-pointer bg-transparent border-none hover:bg-[#F6F8FC] hover:text-[#202124] transition-colors" aria-label="Close">✕</button>
            <div className="pt-[26px] px-[28px] pb-[22px] max-sm:px-5">
              
              <div className="flex justify-center">
                <svg className="w-[96px] h-[96px]" style={{ filter: 'drop-shadow(0 10px 18px rgba(26,115,232,.25))' }} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
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
              </div>

              <div className="flex justify-center mt-0.5">
                <span className="inline-flex items-center gap-[6px] bg-[#E8F0FE] text-[#174EA6] font-display font-bold text-[11px] tracking-[0.04em] uppercase py-[7px] px-[14px] rounded-full">🤝 Facilitator-led community</span>
              </div>

              <div className="font-display font-bold text-[21px] leading-[1.28] mt-3 text-center text-[#202124]">
                Hi, I'm your Arcade Buddy! 👋<br/>Let's <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#1A73E8,#34A853)' }}>get you set up</span>.
              </div>

              <div className="mt-[22px] bg-[#F6F8FC] border border-[#DADCE0] rounded-[18px] p-[18px]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E9F9EF] flex items-center justify-center text-[19px] shrink-0">💬</div>
                  <div>
                    <div className="font-display font-bold text-[14.5px] text-[#202124]">Join the WhatsApp Community</div>
                    <div className="mt-0.5 text-[12.5px] text-[#5F6368] leading-[1.5]">Updates, reminders, guidance, and participant discussions.</div>
                    <div className="mt-[9px] inline-flex items-center gap-1.5 text-xs font-medium text-[#1A73E8]">👥 1000+ Members</div>
                  </div>
                </div>
                <a href="https://whatsapp.com/channel/0029VbCahmFFCCoVQMV7ix1s" target="_blank" rel="noopener" className="mt-3.5 w-full flex justify-center bg-[#25D366] text-white py-[13px] rounded-full font-bold text-[14.5px] shadow-[0_8px_18px_rgba(37,211,102,.32)] hover:-translate-y-[1px] transition-transform">Join on WhatsApp</a>
              </div>

              <div className="mt-3 bg-[#F6F8FC] border border-[#DADCE0] rounded-[18px] py-[15px] px-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-display font-bold text-[13.5px] text-[#202124]">Prefer Telegram?</div>
                  <div className="mt-[3px] text-xs text-[#5F6368] leading-[1.5]">Receive the same essential community updates.</div>
                </div>
                <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener" className="shrink-0 bg-white border border-[#DADCE0] py-[9px] px-[14px] rounded-full text-[12.5px] font-semibold text-[#202124] inline-flex items-center gap-[7px] whitespace-nowrap hover:bg-[#F6F8FC] transition-colors">
                  <span className="w-5 h-5 rounded-full bg-[#229ED9] text-white flex items-center justify-center text-[11px]">➤</span>
                  Join Telegram
                </a>
              </div>

              <div className="mt-[22px]">
                <button onClick={startTour} className="w-full flex justify-center text-white py-[14px] rounded-full font-medium text-[14.5px] shadow-[0_6px_18px_rgba(26,115,232,.35)] hover:-translate-y-[2px] transition-transform" style={{ background: 'linear-gradient(90deg,#1A73E8,#4FA8FF)' }}>🧭 Take the quick tour with me</button>
              </div>

              <div className="mt-5 text-center text-[12.5px] font-medium text-[#1A73E8]">
                <a href="https://rsvp.withgoogle.com/events/arcade-facilitator/home">View official Facilitator '26 program details</a>
              </div>
              <div className="mt-1.5 text-center text-[11.5px] text-[#80868B] leading-[1.5]">
                This is an independent facilitator-led community hub.<br/>Official program rules and updates are provided by Google.
              </div>

              <div className="mt-[18px] pt-4 border-t border-[#DADCE0] flex justify-between items-center">
                <span onClick={closeWelcome} className="text-[12.5px] text-[#80868B] cursor-pointer hover:text-[#5F6368] hover:underline">Remind Me Later</span>
                <span onClick={dontShowAgain} className="text-[12.5px] text-[#80868B] cursor-pointer hover:text-[#5F6368] hover:underline">Don't Show Again</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

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
                <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0} className={`py-2 px-4 rounded-full text-[12.5px] font-medium cursor-pointer border border-[#DADCE0] bg-white text-[#202124] hover:bg-slate-50 transition-colors ${currentStep === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>Back</button>
                <button onClick={() => currentStep === steps.length - 1 ? endTour() : setCurrentStep(s => s + 1)} className="py-2 px-4 rounded-full text-[12.5px] font-medium cursor-pointer border border-[#1A73E8] bg-[#1A73E8] text-white hover:bg-blue-700 transition-colors">{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
