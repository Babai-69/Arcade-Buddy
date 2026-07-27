import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { RoadmapGlobe } from '../components/RoadmapGlobe';
import { Participant } from '../types';
import { RECOMMENDED_LABS } from '../data/roadmapData';
import { SKILL_BADGES } from '../data/skillBadges';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { AnimatedTimer } from '../components/AnimatedTimer';

const TIERS = [
  { name: 'No Tier', min: 0, max: 49.5 },
  { name: 'Arcade Trooper', min: 50, max: 74.5 },
  { name: 'Arcade Ranger', min: 75, max: 94.5 },
  { name: 'Arcade Champion', min: 95, max: 119.5 },
  { name: 'Arcade Legend', min: 120, max: 9999 }
];

const MILESTONES = [
  { name: 'Milestone 1', games: 6, skills: 18, bonus: 5, totalPoints: 20 },
  { name: 'Milestone 2', games: 8, skills: 34, bonus: 15, totalPoints: 40 },
  { name: 'Milestone 3', games: 10, skills: 50, bonus: 25, totalPoints: 60 },
  { name: 'Ultimate Milestone', games: 12, skills: 66, bonus: 35, totalPoints: 80 }
];

// Helper UI Components
const StatRow = ({ label, value, suffix = '', isText = false, delay = 0 }: any) => (
  <div className="flex justify-between items-center py-3 border-b border-white/5">
     <span className="text-[11px] sm:text-xs text-[#5B6478] tracking-widest uppercase">{label}</span>
     {isText ? (
        <span className="font-serif text-lg sm:text-xl text-white animate-fade-in-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>{value}</span>
     ) : (
        <AnimatedNumber value={Number(value)} suffix={suffix} delay={delay} className="font-serif text-lg sm:text-xl text-white" />
     )}
  </div>
);

const ProgressBar = ({ percentage, color = 'bg-[#6FE3D6]', delay = 0 }: any) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(Math.min(100, Math.max(0, percentage))), delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);
  
  return (
    <div className="w-full h-1 bg-white/10 overflow-hidden rounded-full">
       <div className={`h-full ${color} transition-all duration-[1500ms] ease-out`} style={{ width: `${width}%` }} />
    </div>
  );
}

const CheckboxRow = ({ label, value, target, delay, hideTick = false, activeColor = '#6FE3D6' }: any) => {
  const isDone = value >= target;
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5">
       <div 
         className="w-[22px] h-[22px] rounded flex items-center justify-center flex-shrink-0 transition-all duration-[1200ms] ease-out text-[#070B14]" 
         style={{ 
           transitionDelay: `${delay}ms`, 
           backgroundColor: activeColor, 
           boxShadow: `0 0 10px ${activeColor}66` 
         }}
       >
         {isDone && !hideTick && <Check size={14} strokeWidth={3.5} />}
       </div>
       <div className="flex-1 text-[#8993A8] text-[13px] sm:text-sm">{label}</div>
       <AnimatedNumber value={value} delay={delay} className="font-mono text-[13px] sm:text-sm text-white" />
    </div>
  );
}

const WeeklyPlan = ({ gamesNeeded, skillsNeeded }: { gamesNeeded: number, skillsNeeded: number }) => {
  const w1G = Math.ceil(gamesNeeded * 0.4);
  const w1S = Math.ceil(skillsNeeded * 0.4);
  const w2G = Math.ceil(gamesNeeded * 0.3);
  const w2S = Math.ceil(skillsNeeded * 0.3);
  const w3G = Math.ceil(gamesNeeded * 0.2);
  const w3S = Math.ceil(skillsNeeded * 0.2);
  const w4G = Math.max(0, gamesNeeded - w1G - w2G - w3G);
  const w4S = Math.max(0, skillsNeeded - w1S - w2S - w3S);

  const weeks = [
    { title: 'Week 1: High Momentum', games: w1G, skills: w1S },
    { title: 'Week 2: Consistent Pace', games: w2G, skills: w2S },
    { title: 'Week 3: The Final Push', games: w3G, skills: w3S },
    { title: 'Week 4: Ultimate Milestone', games: w4G, skills: w4S }
  ].filter(w => w.games > 0 || w.skills > 0);

  if (weeks.length === 0) {
    return (
      <div className="bg-[#070B14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
        <h3 className="font-serif text-3xl text-[#6FE3D6] mb-3">You've conquered the Ultimate Milestone!</h3>
        <p className="text-[#8993A8]">Maintain your knowledge by exploring advanced AI labs and sharing your expertise with the community.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#070B14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
       <h3 className="font-serif text-3xl text-white mb-8">Your Study Schedule</h3>
       <div className="relative border-l border-white/10 ml-4 space-y-10 pb-4">
          {weeks.map((w, i) => (
            <div key={i} className="relative pl-8 animate-fade-in-up" style={{ animationDelay: `${200 * i}ms`, animationFillMode: 'both' }}>
               <div className={`absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full ${i === 0 ? 'bg-[#6FE3D6] text-[#6FE3D6] shadow-[0_0_10px_currentColor]' : 'bg-[#5B6478] text-transparent'}`} />
               <h4 className={`font-serif text-xl mb-3 ${i === 0 ? 'text-white' : 'text-[#8993A8]'}`}>{w.title}</h4>
               <div className="flex flex-wrap gap-4">
                 {w.games > 0 && <div className="text-xs sm:text-sm font-medium text-[#5B8DEF] bg-[#5B8DEF]/10 px-3 py-1.5 rounded border border-[#5B8DEF]/30">{w.games} Games</div>}
                 {w.skills > 0 && <div className="text-xs sm:text-sm font-medium text-[#F5A623] bg-[#F5A623]/10 px-3 py-1.5 rounded border border-[#F5A623]/30">{w.skills} Skills</div>}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

export function RoadmapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const participant = location.state?.participant as Participant;

  useEffect(() => {
    if (!participant) {
      navigate('/calculator');
    }
  }, [participant, navigate]);

  if (!participant) {
    return null;
  }

  const { arcadePoints, gameBadges, skillBadges, name } = participant;
  const currentTotal = arcadePoints; // Total Arcade Score
  
  const currentTierIndex = TIERS.findIndex(t => currentTotal >= t.min && currentTotal <= t.max);
  const currentTier = currentTierIndex !== -1 ? TIERS[currentTierIndex] : TIERS[0];
  const nextTier = currentTierIndex < TIERS.length - 1 ? TIERS[currentTierIndex + 1] : null;

  const pointsNeeded = nextTier ? Math.max(0, nextTier.min - currentTotal) : 0;
  const estimatedDays = Math.ceil(pointsNeeded / 1.5); // Assume 1.5 points per day
  const confidence = pointsNeeded > 0 ? Math.min(99, Math.max(75, 100 - estimatedDays)) : 100;
  
  // Figure out the next milestone
  let targetMilestone = MILESTONES.find(m => gameBadges < m.games || skillBadges < m.skills);
  if (!targetMilestone) targetMilestone = MILESTONES[MILESTONES.length - 1]; // All done

  const ultimateMilestone = MILESTONES[MILESTONES.length - 1];
  const gamesNeededForUltimate = Math.max(0, ultimateMilestone.games - gameBadges);
  const skillsNeededForUltimate = Math.max(0, ultimateMilestone.skills - skillBadges);

  // Recommendations Logic
  let recs: any[] = [];
  if (gameBadges < 4) {
    recs.push({ name: 'Level 1: Google Cloud Infrastructure', category: 'Game Badge', difficulty: 'Varies', time: '4-6 Hours', link: 'https://go.qwiklabs.com/arcade' });
    recs.push({ name: 'Level 2: Data & AI', category: 'Game Badge', difficulty: 'Varies', time: '4-6 Hours', link: 'https://go.qwiklabs.com/arcade' });
    recs.push({ name: 'Trivia: Week 1', category: 'Trivia Game Badge', difficulty: 'Easy', time: '1 Hour', link: 'https://go.qwiklabs.com/arcade' });
    recs.push({ name: 'Trivia: Week 2', category: 'Trivia Game Badge', difficulty: 'Easy', time: '1 Hour', link: 'https://go.qwiklabs.com/arcade' });
  }

  let skillRecs = [...RECOMMENDED_LABS];
  if (skillBadges > 66) {
    skillRecs = skillRecs.filter(r => r.difficulty === 'Medium' || r.difficulty === 'Hard' || r.difficulty === 'Advanced');
  } else if (skillBadges <= 20) {
    skillRecs = skillRecs.filter(r => r.difficulty === 'Easy');
  }
  
  // Attach links from SKILL_BADGES
  skillRecs = skillRecs.map(r => {
    const found = SKILL_BADGES.find(sb => sb.name === r.name);
    return { ...r, link: found ? found.link : 'https://www.cloudskillsboost.google/catalog' };
  });

  recs = [...recs, ...skillRecs].slice(0, 6);

  // Timer & Wait Message Logic
  const now = new Date();
  const currentMonth = now.getMonth(); // 6 for July, 7 for August, 8 for September
  const currentYear = now.getFullYear();

  let targetDate = new Date(currentYear, 6, 31, 23, 59, 59);
  let monthName = 'July';
  if (currentMonth === 7) {
    targetDate = new Date(currentYear, 7, 31, 23, 59, 59);
    monthName = 'August';
  } else if (currentMonth >= 8) {
    targetDate = new Date(currentYear, 8, 14, 23, 59, 59);
    monthName = 'September';
  }

  let waitMessage = null;
  if (skillBadges >= 66) {
    if (currentMonth <= 6 && gameBadges >= 5) {
      waitMessage = "Come back again in August when new games will be launched!";
    } else if (currentMonth === 7 && gameBadges >= 5) {
      waitMessage = "Come back later in September for new games!";
    }
  }

  return (
    <div className="min-h-screen bg-[#030509] text-[#EAEEF7] font-sans selection:bg-[#5B8DEF] selection:text-[#04070d] overflow-x-hidden">
      <RoadmapGlobe />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 sm:px-14 sm:py-7 bg-[#04060b]/70 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="font-serif text-lg tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6FE3D6] shadow-[0_0_10px_#6FE3D6]"></span> 
          Arcade Buddy
        </div>
        <Link to="/calculator" className="px-5 py-2 rounded-md bg-transparent border border-white/10 text-[#EAEEF7] font-medium text-sm hover:border-white/30 hover:bg-white/5 transition-all">
          Back to Calculator
        </Link>
      </nav>

      <main className="relative z-[2] pt-[150px] pb-20 px-6 sm:px-14 max-w-[1400px] mx-auto">
        
        {/* Centered Timer Section */}
        <div className="flex justify-center mb-16 animate-fade-in-up">
           <div className="bg-[#070B14]/80 backdrop-blur-md border border-[#6FE3D6]/30 rounded-2xl p-6 sm:px-12 shadow-[0_0_20px_rgba(111,227,214,0.15)] flex flex-col items-center">
             <div className="text-[11px] text-[#5B6478] tracking-widest uppercase mb-4 text-center">Time Left in {monthName}</div>
             <AnimatedTimer targetDate={targetDate} />
           </div>
        </div>

        {/* Header Section */}
        <div className="mb-16 sm:mb-24 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
           <div className="flex items-center gap-2 font-mono text-[11.5px] text-[#5B6478] tracking-[0.14em] uppercase mb-8">
             <span className="w-5 h-px bg-[#5B6478]"></span>
             AI-Powered Roadmap
           </div>
           <h1 className="font-serif text-5xl sm:text-[82px] leading-[1.08] tracking-[-0.01em] max-w-[820px] mb-8 text-white">
             Hello <span className="text-[#6FE3D6] font-bold italic animate-neon-pulse">{name ? name.split(' ')[0] : 'Learner'}</span> <span className="animate-wave origin-bottom-right inline-block">👋</span><br />
             Here is your <em>mission plan.</em>
           </h1>
           <p className="text-[#8993A8] text-lg max-w-[480px] leading-relaxed">
             Based on your public profile, we've analyzed your progress and built a personalized path to reach the next tier.
           </p>
        </div>

        {/* Dashboard Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 bg-[#070B14]/80 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 sm:p-12 shadow-2xl">
             
             {/* Left Column */}
             <div className="flex flex-col gap-8 lg:border-r border-white/10 lg:pr-12">
                 <div>
                     <h2 className="font-serif text-3xl sm:text-4xl leading-[1.1] tracking-[-0.01em] mb-6 text-white flex items-center gap-3">
                         <span className="text-3xl animate-wave origin-bottom-right inline-block">👋</span> 
                         <span>Hello <span className="text-[#6FE3D6] font-bold italic animate-neon-pulse">{name ? name.split(' ')[0] : 'Learner'}</span></span>
                     </h2>
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6FE3D6]/30 bg-[#6FE3D6]/10 text-[#6FE3D6] text-sm font-medium">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#6FE3D6] shadow-[0_0_6px_#6FE3D6]"></span>
                         {currentTier.name}
                     </div>
                 </div>

                 <div className="space-y-1">
                    <StatRow label="CURRENT POINTS" value={currentTotal} delay={100} />
                    <StatRow label="NEXT TIER" value={nextTier?.name || 'Maxed Out'} isText delay={200} />
                    <StatRow label="POINTS NEEDED" value={pointsNeeded} suffix=" more" delay={300} />
                    <StatRow label="ESTIMATED COMPLETION" value={pointsNeeded > 0 ? estimatedDays : 0} suffix=" days" delay={400} />
                    <StatRow label="CONFIDENCE" value={confidence} suffix="%" delay={500} />
                 </div>
             </div>

             {/* Right Column */}
             <div className="flex flex-col justify-center gap-10">
                <div>
                   <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[11px] sm:text-xs text-[#5B6478] tracking-widest uppercase">PROGRESS TO NEXT TIER</span>
                      <AnimatedNumber value={currentTotal} className="font-serif text-2xl sm:text-3xl text-white" delay={600} />
                   </div>
                   <ProgressBar percentage={(currentTotal / (nextTier?.min || Math.max(currentTotal, 1))) * 100} delay={700} />
                </div>

                <div>
                   <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[11px] sm:text-xs text-[#5B6478] tracking-widest uppercase">NEXT FACILITATOR MILESTONE</span>
                      <span className="font-serif text-lg sm:text-xl text-white text-right">{pointsNeeded > 0 ? targetMilestone.name : 'All milestones unlocked'}</span>
                   </div>
                   <ProgressBar percentage={((gameBadges + skillBadges) / (targetMilestone.games + targetMilestone.skills)) * 100} color="bg-[#5B8DEF]" delay={800} />
                </div>

                <div className="space-y-1">
                   <CheckboxRow label="Arcade Games completed" value={gameBadges} target={targetMilestone.games} delay={900} activeColor="#5B8DEF" />
                   <CheckboxRow label="Skill Badges completed" value={skillBadges} target={targetMilestone.skills} delay={1000} hideTick={true} activeColor="#6FE3D6" />
                </div>
             </div>
          </div>
        </section>

        {/* Study Schedule Section */}
        {currentTotal <= 20 && (
          <section className="mb-24">
             <WeeklyPlan gamesNeeded={gamesNeededForUltimate} skillsNeeded={skillsNeededForUltimate} />
          </section>
        )}

        {/* Recommendations Section */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mb-10">
            <div>
              <div className="font-mono text-[#5B6478] text-[11px] sm:text-[11.5px] tracking-[0.14em] uppercase mb-4">Smart Recommendations</div>
              <h2 className="font-serif text-3xl sm:text-4xl max-w-[560px] leading-tight">Fastest path to {targetMilestone.name}.</h2>
            </div>
            {!waitMessage && (
              <p className="text-[#8993A8] text-sm sm:text-[15px] max-w-[340px] leading-relaxed">
                We selected these labs because they match your current level and offer the quickest progression to your next milestone.
              </p>
            )}
          </div>

          {waitMessage ? (
            <div className="bg-[#070B14]/80 backdrop-blur-md border border-[#6FE3D6]/30 rounded-2xl p-10 shadow-[0_0_20px_rgba(111,227,214,0.15)] text-center">
               <h3 className="text-[#6FE3D6] font-serif text-3xl mb-4" style={{ textShadow: '0 0 10px rgba(111,227,214,0.6)' }}>{waitMessage}</h3>
               <p className="text-[#8993A8] text-lg">You have already completed the required skill badges and this month's available game badges. Great job!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {recs.map((lab, i) => (
                <a key={i} href={lab.link} target="_blank" rel="noreferrer" className="group bg-[#070B14]/90 backdrop-blur-sm p-8 sm:p-10 hover:bg-[#0B1220]/90 transition-all block">
                  <div className="font-mono text-[10px] sm:text-[11px] text-[#5B6478] tracking-[0.06em] mb-6 flex justify-between">
                    <span>0{i+1}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6FE3D6] -translate-x-2 group-hover:translate-x-0">Start Lab ↗</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl mb-4 text-[#EAEEF7] group-hover:text-[#6FE3D6] transition-colors line-clamp-2">{lab.name}</h3>
                  <p className="text-[12.5px] sm:text-[13.5px] text-[#8993A8] leading-relaxed mb-6">
                    {lab.category} — <span className={lab.difficulty === 'Hard' || lab.difficulty === 'Advanced' ? 'text-[#F5A623]' : 'text-white'}>{lab.difficulty}</span>
                  </p>
                  <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono text-[#5B8DEF]">
                    <span>{lab.time}</span>
                    <span>{lab.category.includes('Game') ? '+1.0 Pts' : '+0.5 Pts'}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

      </main>
      
      <footer className="relative z-[2] border-t border-white/10 px-6 sm:px-14 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-[12.5px] text-[#5B6478] bg-[#030509]">
        <span>© {new Date().getFullYear()} Arcade Buddy — AI Roadmap</span>
        <a href="#top" className="hover:text-white transition-colors">Back to top ↑</a>
      </footer>

    </div>
  );
}
