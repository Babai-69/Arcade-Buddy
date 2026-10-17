import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

/* -------------------------------------------------------------------------- */
/*                               TYPED CONSTANTS                              */
/* -------------------------------------------------------------------------- */

export interface LeaderboardEntry {
  name: string;
  points: string;
  tier: string;
  rank?: number;
  initials?: string;
  avatarBg?: string;
}

export const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'pranjal', points: '84.5 Pts', tier: 'Champion', rank: 1, initials: 'PR', avatarBg: '#EA580C' },
  { name: 'bhaswati mondal', points: '78.0 Pts', tier: 'Champion', rank: 2, initials: 'BM', avatarBg: '#7C3AED' },
  { name: 'debayan karar', points: '72.5 Pts', tier: 'Ranger', rank: 3, initials: 'DK', avatarBg: '#F59E0B' },
  { name: 'subrat kumar mohanty', points: '68.0 Pts', tier: 'Trooper', rank: 4, initials: 'SM', avatarBg: '#06B6D4' },
  { name: 'anick roy', points: '65.5 Pts', tier: 'Trooper', rank: 5, initials: 'AR', avatarBg: '#5A6B82' },
];

export const LEADERBOARD: LeaderboardEntry[] = DEFAULT_LEADERBOARD;

export interface TestimonialEntry {
  name: string;
  role: string;
  text: string;
  avatarUrl?: string;
}

export const TESTIMONIALS_ROW_1: TestimonialEntry[] = [
  {
    name: 'Anant Shikhare',
    role: 'Arcade Participant • Pune',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHtRdZWAm24jw/profile-displayphoto-scale_200_200/B56Zi7MEzcHMAY-/0/1755487162576?e=2147483647&v=beta&t=i3kFJpFUuvz06llyulJ6NQj3WL26UfwZYYd_gUBh-Qc',
    text: 'Bhai tu na hota to ye Arcade complete hi nahi hota yaar! Vertex AI challenge lab me 3 ghante se fasa hua tha, yaha exact steps dekh ke 10 min me pass ho gaya. Dil se shukriya bhai 🙏'
  },
  {
    name: 'Tanvi Deshmukh',
    role: 'Final Year CSE • Nagpur',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP-VzYKSGNEXpCf-DLe6Is3H8UBjfH1ydA1ypqtPsHVHdwGgZKQTJjnPs&s=10',
    text: 'Pehle laga tha December tak points manage karna bohot hard hoga, but syllabus page pe saare October games ke access codes ek jagah mil gaye. Trick-or-Metric wala lab kal hi finish kiya, +1 point locked!'
  },
  {
    name: 'Rohan Mehta',
    role: 'Cloud Enthusiast • Delhi',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/C4E03AQEwpCqO0Rs2jA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1608754101980?e=2147483647&v=beta&t=3freflnk2tBm8oKQHW9d-Evzr3_CPPL67iqdQ5TOJf8',
    text: 'Calculator tool ekdum next level hai bro. Mujhe laga tha Sept 14 ke baad sab points waste ho gaye, par yaha clear bataya ki December tak games ke points add honge. 48 arcade points done so far 🔥'
  },
  {
    name: 'Shreya Mukherjee',
    role: 'B.Tech 3rd Year • Kolkata',
    avatarUrl: 'https://www.ceew.in/sites/default/files/styles/our_team_view_image_style/public/teams/anushka-goswami-edited-image.jpg?itok=dsqBEAZV',
    text: 'Bhai sach batau toh official portal pe search karna was a big headache. Yaha Beginner aur Intermediate filter karke seedhe direct links mil jate hai. Zero credits me 25+ skill badges bana liye!'
  },
  {
    name: 'Kavya Ramanathan',
    role: 'Cloud Developer • Chennai',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASEsOmgwe1g4sBUSpGdmk9XzeGZN3sfU8p9FGHLLbng&s=10',
    text: 'The syllabus layout and instant search saved me dozens of hours. Having direct links to labs that do not deduct monthly credits made completing 20+ skill badges effortless.'
  },
  {
    name: 'Siddharth Roy',
    role: '@sidd_cloud • Hyderabad',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHVj9BVydL-Ng/profile-displayphoto-shrink_200_200/B4DZaIj1iRGsAc-/0/1746047818796?e=2147483647&v=beta&t=CK1UgV3rTMbqi39Yna6dXlgrkftMT4GZabwe2ioy9EI',
    text: 'Reached 60 arcade points earlier this week! Super helpful community and clean interface without any misleading fluff. Highly recommended to anyone targeting the swag box.'
  },
  {
    name: 'Arjun Patel',
    role: 'DevOps Intern • Ahmedabad',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHux_o2IwdHfw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718224659057?e=2147483647&v=beta&t=rbdRaaotMdBJzeJzRlXh0tORlQE2gnhK3Jlcqp7Lwys',
    text: 'Bhai one-click copy of game codes is so satisfying! Cloud Shell commands copy-paste karke speed run ho gaya. 10/10 tool for every serious learner.'
  }
];

export const TESTIMONIALS_ROW_2: TestimonialEntry[] = [
  {
    name: 'Harsh Vardhan',
    role: 'DevOps Aspirant • Jaipur',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQECxzHyh_SSX1xZ-ORTLPYv8NrxJJ6_wDUm658q_frNul0_BuV434Lgkk&s=10',
    text: 'Kubernetes load balancer lab me bar-bar pod crash ho raha tha. Community Telegram pe query pucha and 15 minute me solution mil gaya. Aise peer support kahi aur nahi dekha!'
  },
  {
    name: 'Pooja Nambiar',
    role: 'IT Student • Kochi',
    avatarUrl: 'https://cst.princeton.edu/sites/g/files/toruqf6481/files/styles/freeform_750w/public/2024-11/aanya_kasera.jpeg?itok=2S_uAEUO',
    text: 'Hamare college ke WhatsApp group me sab Arcade Buddy hi use kar rahe hai. Leaderboard pe dosto ke sath compete karne me alag hi maza aata hai. Legend tier swag jacket loading soon 😎'
  },
  {
    name: 'Ayush Tiwari',
    role: 'Cloud Learner • Lucknow',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQFLhK1BV5nOFw/profile-displayphoto-scale_200_200/B4DZojHNkRJUAY-/0/1761525685599?e=2147483647&v=beta&t=dkiZZkT2oTnFzZjt7-M0NTorngupEcIw8J-3jY8KykY',
    text: 'Site Reliability Engineer simulator lab was genuinely tough, but steps itne simple aur clear the ki first attempt me 100% score mila. Keep it up team!'
  },
  {
    name: 'Aanya Sen',
    role: 'Student • Bengaluru',
    avatarUrl: 'https://www.ceew.in/sites/default/files/styles/our_team_view_image_style/public/teams/aanya-singh-edited.jpg?itok=LmKujYE4',
    text: 'Mujhe laga tha normal labs bhi bonus me count honge, tab calculator ne clearly samjhaya ki unknown labs lab-free count hote hai. Transparent counting saved me from huge confusion.'
  },
  {
    name: 'Marcus Vance',
    role: 'Solutions Architect • London',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    text: 'This dashboard takes the guesswork out of Google Cloud Arcade calculations. Knowing exact cutoffs between cohort facilitator milestones and standard points is invaluable.'
  },
  {
    name: 'Rupasri Myneni',
    role: 'Arcade Student • Vijayawada',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvgZ-kKLeMVXZ7Cthzpf53qfkqX-uE2sPqWT2Rnp6pwg&s=10',
    text: 'I was frantically searching for the October 2026 game access codes on Reddit and Discord. Found every single active code here in five seconds flat. Genuinely grateful!'
  },
  {
    name: 'Nikhil Joshi',
    role: 'Tier-3 College Coder • Ahmedabad',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80',
    text: 'Genuinely great effort bhai. Hum tier-3 college students ke liye Google Cloud seekhne ka ye best tarika ban gaya hai without spending any extra money.'
  }
];

export const TESTIMONIALS: TestimonialEntry[] = [...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_2];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can I still earn Arcade points now that the Facilitator program cohort ended?',
    answer:
      'Yes. The overall Google Cloud Arcade runs through December 31, 2026, so you can keep completing games and skill badges and collecting points for the January 2027 redemption.',
  },
  {
    question: 'How do Skill Badges and Arcade Games convert into Arcade Points?',
    answer:
      'One completed Arcade Game adds 1.0 Arcade Point. Skill Badges are worth 0.5 points each, so two badges add up to 1.0 point.',
  },
  {
    question: 'When does the Prize Counter open and how do I claim swags?',
    answer:
      'The Prize Counter is estimated to open on January 7, 2027. Keep your public Skills Boost profile URL safe, because you will need it to claim your points.',
  },
  {
    question: 'Are the hands-on labs on Google Cloud Skills Boost free to complete?',
    answer:
      'The program offers 100% free hands-on access to the curated Arcade labs. Check the syllabus page for the full list of games and labs.',
  },
  {
    question: 'Where can I see my live position and point tally?',
    answer:
      'Open the Live Leaderboard for rankings, and use the Calculator to see your own point total and milestone progress.',
  },
];

export interface StepItem {
  num: string;
  title: string;
  desc: string;
  linkText: string;
  href: string;
  isExternal?: boolean;
}

export const STEPS: StepItem[] = [
  {
    num: '01',
    title: 'Activate Skills Boost Profile',
    desc: 'Create your account on Google Cloud Skills Boost, enable your public profile, and access hands-on lab credits.',
    linkText: 'Skills Boost Portal',
    href: 'https://www.cloudskillsboost.google/',
    isExternal: true,
  },
  {
    num: '02',
    title: 'Complete Hands-on Labs',
    desc: 'Solve interactive quests and earn verified digital skill badges across Cloud Architecture, DevOps, and Generative AI.',
    linkText: 'Explore Syllabus',
    href: '/syllabus',
    isExternal: false,
  },
  {
    num: '03',
    title: 'Track Points & Milestones',
    desc: 'Use the Arcade Buddy calculator to tally badge conversions, check facilitator bonuses, and monitor your leaderboard rank.',
    linkText: 'Open Calculator',
    href: '/calculator',
    isExternal: false,
  },
  {
    num: '04',
    title: 'Redeem Official Swags',
    desc: 'When the Prize Counter opens in early 2027, exchange your accumulated points for exclusive Google Cloud merchandise.',
    linkText: 'Swag Guide',
    href: '/swags',
    isExternal: false,
  },
];

export interface BentoCardItem {
  id: string;
  span: string;
  accent: string;
  icon: string;
  tag: string;
  title: string;
  text: string;
  footerLeft: string;
  linkText: string;
  href: string;
}

export const BENTO_CARDS: BentoCardItem[] = [
  {
    id: 'a',
    span: 'c7',
    accent: 'var(--b)',
    icon: 'game',
    tag: 'Q4 Cohort',
    title: 'Arcade Games & Active Syllabus',
    text: 'Earn points by completing interactive cloud scenarios in DevOps, BigQuery, Infrastructure, and Vertex AI. Every completed game directly adds 1 full point to your tally.',
    footerLeft: 'Over 50+ labs with step-by-step guides',
    linkText: 'View Full Syllabus',
    href: '/syllabus',
  },
  {
    id: 'b',
    span: 'c5',
    accent: 'var(--gr)',
    icon: 'calc',
    tag: '2026 Conversion',
    title: 'Points & Badges Ledger',
    text: 'Transparent, predictable point math for every badge earned on Skills Boost.',
    footerLeft: 'Real-time calculations',
    linkText: 'Launch Calculator',
    href: '/calculator',
  },
  {
    id: 'c',
    span: 'c5',
    accent: 'var(--yt)',
    icon: 'gift',
    tag: 'Prize Counter',
    title: 'Swag & Milestone Rewards',
    text: 'Redeem earned arcade points for official Google Cloud merchandise delivered directly to your doorstep.',
    footerLeft: 'Free global shipping',
    linkText: 'View Swag Showcase',
    href: '/swags',
  },
  {
    id: 'd',
    span: 'c7',
    accent: 'var(--r)',
    icon: 'layers',
    tag: 'Learner Intel',
    title: "Season 2026 Status & What's Ahead",
    text: "The Facilitator cohort concluded on September 14, 2026, but the overarching Google Cloud Arcade runs all the way through December 31, 2026. You can continue learning, completing skill badges, and collecting points for the upcoming January 2027 redemption.",
    footerLeft: 'Official FAQ & Guidelines',
    linkText: 'Read Facilitator FAQ',
    href: '/faq',
  },
];

export interface CommunityCardItem {
  name: string;
  members: string;
  desc: string;
  btnText: string;
  href: string;
  icon: string;
  colorVar: string;
  tintVar: string;
}

export const COMMUNITY_CARDS: CommunityCardItem[] = [
  {
    name: 'Telegram Discussion',
    members: '2,500+ Members',
    desc: 'Instant lab assistance, arcade announcements, and peer support.',
    btnText: 'Join Telegram',
    href: 'https://t.me/arcadebuddy',
    icon: 'send',
    colorVar: 'var(--b)',
    tintVar: 'var(--t1)',
  },
  {
    name: 'WhatsApp Community',
    members: '1,000+ Members',
    desc: 'Active study group sharing daily arcade lab tips and milestones.',
    btnText: 'Join WhatsApp',
    href: 'https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l',
    icon: 'chat',
    colorVar: 'var(--gr)',
    tintVar: 'var(--t2)',
  },
  {
    name: 'YouTube Guide Channel',
    members: 'Video Guides',
    desc: 'Watch step-by-step video walkthroughs for tricky Arcade quests.',
    btnText: 'Watch Guides',
    href: 'https://www.youtube.com/@ARCADEWITHUS_We',
    icon: 'play',
    colorVar: 'var(--r)',
    tintVar: 'var(--t4)',
  },
  {
    name: 'GDG Announcements',
    members: 'Official Forum',
    desc: 'Official Google Developer Group events, webinars, and updates.',
    btnText: 'Visit Forum',
    href: 'https://discuss.google.dev/tag/learning',
    icon: 'cloud',
    colorVar: 'var(--yt)',
    tintVar: 'var(--t3)',
  },
];

export interface TierSpotInfo {
  spotsLeft: number;
  total: number;
}

export const DEFAULT_DASHBOARD_SPOTS: Record<string, TierSpotInfo> = {
  trooper: { spotsLeft: 3727, total: 6000 },
  ranger: { spotsLeft: 1701, total: 4000 },
  champion: { spotsLeft: 606, total: 3000 },
  legend: { spotsLeft: 1321, total: 2500 },
};

export interface SwagTierMeta {
  key: 'trooper' | 'ranger' | 'champion' | 'legend';
  id: string;
  tierName: string;
  level: string;
  milestonePoints: string;
  accent: string;
  icon: string;
  swagItems: string;
  desc: string;
}

export const SWAG_TIER_METAS: SwagTierMeta[] = [
  {
    key: 'trooper',
    id: 'tier-trooper',
    tierName: 'Arcade Trooper',
    level: 'Standard Tier',
    milestonePoints: '50 PTS',
    accent: 'var(--b)',
    icon: 'game',
    swagItems: 'The Arcade Travel Bottle, Official T-Shirt & Stickers Pack',
    desc: 'Perfect milestone for beginners completing core labs and active arcade games.',
  },
  {
    key: 'ranger',
    id: 'tier-ranger',
    tierName: 'Arcade Ranger',
    level: 'Advanced Tier',
    milestonePoints: '75 PTS',
    accent: 'var(--gr)',
    icon: 'shield',
    swagItems: 'The Arcade Travel Bottle, Weather-Resistant Backpack & Swags',
    desc: 'Achieved by completing skill quests and cloud architecture scenarios.',
  },
  {
    key: 'champion',
    id: 'tier-champion',
    tierName: 'Arcade Champion',
    level: 'Premium Tier',
    milestonePoints: '95 PTS',
    accent: 'var(--yt)',
    icon: 'trophy',
    swagItems: 'Premium Executive Hoodie, Insulated Mug & Cap',
    desc: 'Elite learners mastering Vertex AI, DevOps, and BigQuery skill tracks.',
  },
  {
    key: 'legend',
    id: 'tier-legend',
    tierName: 'Arcade Legend',
    level: 'Ultimate Tier',
    milestonePoints: '120+ PTS',
    accent: 'var(--r)',
    icon: 'crown',
    swagItems: 'Complete Ultimate Swag Box, Tech Backpack & Trophy',
    desc: 'Top cohort achievers with maximum bonus multipliers and badge mastery.',
  },
];

/* -------------------------------------------------------------------------- */
/*                               SVG ICON PATHS                               */
/* -------------------------------------------------------------------------- */

const SVG_PATHS: Record<string, string> = {
  game: 'M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5 2l-1-1H8l-1 1a3 3 0 0 1-5-2v-2a4 4 0 0 1 4-4zM8 11v3M6.5 12.5h3',
  trophy: 'M7 4h10v4a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 13v4M8 21h8',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15 9l-2 5-5 1 2-5z',
  shield: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-6 6-6s6 3 6 6M17 8a2.5 2.5 0 0 1 0 5M18 15c2 .6 3 2.4 3 5',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
  star: 'M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.5 6.7 19.5l1.1-6L3.4 9.3l6-.8z',
  calc: 'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 7h8M8 12h2M14 12h2M8 16h2M14 16h2',
  gift: 'M4 9h16v4H4zM6 13v7h12v-7M12 9v11',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  ext: 'M7 17L17 7M8 7h9v9',
  send: 'M21 3L3 11l7 3 3 7z',
  chat: 'M21 12a8 8 0 0 1-11.500 7.200L4 20l1-4.500A8 8 0 1 1 21 12z',
  play: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM10 9l5 3-5 3z',
  cloud: 'M6 19a5 5 0 0 1-.6-10A6.5 6.5 0 0 1 18 8.5 5.25 5.25 0 0 1 17.5 19z',
  help: 'M9.5 9a2.5 2.5 0 1 1 3.5 2.300c-.7.4-1 1-1 1.700M12 17v.5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  chev: 'M6 9l6 6 6-6',
  crown: 'M3 18h18M4 8l4 4 4-7 4 7 4-4-2 10H6z',
  medal: 'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13L7 21l5-3 5 3-1.5-8',
};

function SvgIcon({ name, className = '' }: { name: string; className?: string }) {
  const d = SVG_PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={`svg-icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOKS                                */
/* -------------------------------------------------------------------------- */

function useReveal(options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.classList.add('in');
      setIsInView(true);
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        options
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      el.classList.add('in');
      setIsInView(true);
    }
  }, []);

  return [ref, isInView] as const;
}

function useCountUp(target: number, duration = 1900, shouldStart = true) {
  const [val, setVal] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVal(target);
      return;
    }

    if (animatedRef.current) {
      setVal(target);
      return;
    }

    if (!shouldStart) {
      return;
    }

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Buttery smooth quintic ease-out deceleration curve
      const ease = 1 - Math.pow(1 - progress, 4);
      setVal(Math.round(target * ease));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        animatedRef.current = true;
        setVal(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldStart]);

  return val;
}

function useCountUpFloat(target: number, duration = 1900, shouldStart = true) {
  const [val, setVal] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVal(target);
      return;
    }

    if (animatedRef.current) {
      setVal(target);
      return;
    }

    if (!shouldStart) {
      return;
    }

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Buttery smooth quintic ease-out deceleration curve
      const ease = 1 - Math.pow(1 - progress, 4);
      setVal(Math.round(target * ease * 10) / 10);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        animatedRef.current = true;
        setVal(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldStart]);

  return val;
}

function useCountdown(targetIso = '2027-01-07T05:30:00') {
  const calculate = () => {
    // Matches PrizeRedemptionGuide.tsx exactly: Target date January 7, 2027, at 5:30 AM
    const targetDate = new Date(targetIso).getTime();
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0 || isNaN(difference)) {
      return {
        days: '00',
        hours: '00',
        mins: '00',
        secs: '00',
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((difference / 1000 / 60) % 60);
    const secs = Math.floor((difference / 1000) % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    setTimeLeft(calculate());
    const timer = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  return timeLeft;
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function Home({ participants }: { participants?: any[] }) {
  // Reveal refs for each section with intersection tracking
  const [sec2Ref, sec2InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec3Ref, sec3InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [secSpotsRef, secSpotsInView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec4Ref, sec4InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec5Ref, sec5InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec6Ref, sec6InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec7Ref, sec7InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const [sec8Ref, sec8InView] = useReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Section 2 animated stats
  const learnersCount = useCountUp(1290, 1900, sec2InView);
  const labsCount = useCountUp(50, 1900, sec2InView);
  const ratingVal = useCountUpFloat(4.7, 1900, sec2InView);
  const tiersCount = useCountUp(4, 1500, sec2InView);
  const countdown = useCountdown('2027-01-07T05:30:00');

  // Section 3 animated numbers
  const bentoLabsCount = useCountUp(50, 1600, sec3InView);
  const ledgerGamePt = useCountUpFloat(1.0, 1400, sec3InView);
  const ledgerSkillPt = useCountUpFloat(0.5, 1400, sec3InView);

  // Dashboard tier spots state fetched from /api/arcade-spots (same real-time source as Dashboard)
  const [dashboardSpots, setDashboardSpots] = useState<Record<string, TierSpotInfo>>(DEFAULT_DASHBOARD_SPOTS);

  useEffect(() => {
    const fetchLatestSpots = () => {
      fetch('/api/arcade-spots')
        .then((r) => r.json())
        .then((d) => {
          if (d && d.trooper && d.ranger && d.champion && d.legend) {
            setDashboardSpots({
              trooper: {
                spotsLeft: typeof d.trooper.spotsLeft === 'number' ? d.trooper.spotsLeft : parseInt(d.trooper.spotsLeft, 10) || DEFAULT_DASHBOARD_SPOTS.trooper.spotsLeft,
                total: typeof d.trooper.total === 'number' ? d.trooper.total : parseInt(d.trooper.total, 10) || DEFAULT_DASHBOARD_SPOTS.trooper.total,
              },
              ranger: {
                spotsLeft: typeof d.ranger.spotsLeft === 'number' ? d.ranger.spotsLeft : parseInt(d.ranger.spotsLeft, 10) || DEFAULT_DASHBOARD_SPOTS.ranger.spotsLeft,
                total: typeof d.ranger.total === 'number' ? d.ranger.total : parseInt(d.ranger.total, 10) || DEFAULT_DASHBOARD_SPOTS.ranger.total,
              },
              champion: {
                spotsLeft: typeof d.champion.spotsLeft === 'number' ? d.champion.spotsLeft : parseInt(d.champion.spotsLeft, 10) || DEFAULT_DASHBOARD_SPOTS.champion.spotsLeft,
                total: typeof d.champion.total === 'number' ? d.champion.total : parseInt(d.champion.total, 10) || DEFAULT_DASHBOARD_SPOTS.champion.total,
              },
              legend: {
                spotsLeft: typeof d.legend.spotsLeft === 'number' ? d.legend.spotsLeft : parseInt(d.legend.spotsLeft, 10) || DEFAULT_DASHBOARD_SPOTS.legend.spotsLeft,
                total: typeof d.legend.total === 'number' ? d.legend.total : parseInt(d.legend.total, 10) || DEFAULT_DASHBOARD_SPOTS.legend.total,
              },
            });
          }
        })
        .catch((err) => {
          console.warn('Dashboard spots fetch error on Home:', err);
        });
    };

    fetchLatestSpots();
    // Continuously check for updates every 60s so future scraper/dashboard updates reflect live
    const interval = setInterval(fetchLatestSpots, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSlotsSum =
    (dashboardSpots.trooper?.total || 6000) +
    (dashboardSpots.ranger?.total || 4000) +
    (dashboardSpots.champion?.total || 3000) +
    (dashboardSpots.legend?.total || 2500);

  const totalSpotsLeftSum =
    (dashboardSpots.trooper?.spotsLeft ?? 3727) +
    (dashboardSpots.ranger?.spotsLeft ?? 1701) +
    (dashboardSpots.champion?.spotsLeft ?? 606) +
    (dashboardSpots.legend?.spotsLeft ?? 1321);

  const totalClaimedSum = Math.max(0, totalSlotsSum - totalSpotsLeftSum);
  const overallPercentage = totalSlotsSum > 0 ? Math.round((totalClaimedSum / totalSlotsSum) * 1000) / 10 : 0;

  // Spots Left for each tier animated counters using live dashboard amounts
  const spotsLeftCount = useCountUp(totalSpotsLeftSum, 1800, secSpotsInView);
  const spotsClaimedCount = useCountUp(totalClaimedSum, 1800, secSpotsInView);
  const trooperLeft = useCountUp(dashboardSpots.trooper.spotsLeft, 1600, secSpotsInView);
  const rangerLeft = useCountUp(dashboardSpots.ranger.spotsLeft, 1600, secSpotsInView);
  const championLeft = useCountUp(dashboardSpots.champion.spotsLeft, 1600, secSpotsInView);
  const legendLeft = useCountUp(dashboardSpots.legend.spotsLeft, 1600, secSpotsInView);

  // Section 6 animated community member counts
  const commCount1 = useCountUp(1800, 1800, sec6InView);
  const commCount2 = useCountUp(3000, 1800, sec6InView);
  const commCount3 = useCountUp(750, 1800, sec6InView);
  const commCount4 = useCountUp(15000, 1800, sec6InView);

  // Leaderboard interactive cursor glow
  const lbCardRef = useRef<HTMLDivElement | null>(null);

  const handleLeaderboardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lbCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--lb-mouse-x', `${x}px`);
    el.style.setProperty('--lb-mouse-y', `${y}px`);
    el.style.setProperty('--lb-glow-opacity', '1');
  };

  const handleLeaderboardMouseLeave = () => {
    const el = lbCardRef.current;
    if (!el) return;
    el.style.setProperty('--lb-glow-opacity', '0');
  };

  // Live leaderboard state with actual rankings
  const [liveLeaderboard, setLiveLeaderboard] = useState<LeaderboardEntry[]>(DEFAULT_LEADERBOARD);

  useEffect(() => {
    if (participants && participants.length > 0) {
      const sorted = [...participants]
        .sort((a, b) => (Number(b.points) || 0) - (Number(a.points) || 0))
        .slice(0, 5)
        .map((p, idx) => ({
          name: p.name || 'Learner',
          points: `${p.points} Pts`,
          tier: p.tier || (Number(p.points) >= 120 ? 'Legend' : Number(p.points) >= 95 ? 'Champion' : Number(p.points) >= 75 ? 'Ranger' : 'Trooper'),
          rank: idx + 1,
          initials: (p.name || 'User').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
          avatarBg: ['#EA580C', '#7C3AED', '#F59E0B', '#06B6D4', '#5A6B82'][idx % 5],
        }));
      if (sorted.length > 0) {
        setLiveLeaderboard(sorted);
        return;
      }
    }

    try {
      const unsub = onSnapshot(collection(db, 'leaderboard'), (snapshot) => {
        if (snapshot.empty) return;
        const rows: any[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.participants && Array.isArray(d.participants)) {
            rows.push(...d.participants);
          } else {
            rows.push(d);
          }
        });
        if (rows.length > 0) {
          const sorted = rows
            .filter((r) => r.name)
            .sort((a, b) => (Number(b.points) || 0) - (Number(a.points) || 0))
            .slice(0, 5)
            .map((p, idx) => {
              const pts = typeof p.points === 'number' ? p.points : parseFloat(p.points) || 0;
              return {
                name: p.name || 'Learner',
                points: `${pts} Pts`,
                tier: p.tier || (pts >= 120 ? 'Legend' : pts >= 95 ? 'Champion' : pts >= 75 ? 'Ranger' : 'Trooper'),
                rank: idx + 1,
                initials: (p.name || 'User').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
                avatarBg: ['#EA580C', '#7C3AED', '#F59E0B', '#06B6D4', '#5A6B82'][idx % 5],
              };
            });
          if (sorted.length >= 3) {
            setLiveLeaderboard(sorted);
          }
        }
      }, (err) => {
        console.warn('Leaderboard snapshot listener:', err);
      });
      return () => unsub();
    } catch (e) {
      console.warn('Leaderboard connection error:', e);
    }
  }, [participants]);

  const top1 = liveLeaderboard[0] || DEFAULT_LEADERBOARD[0];
  const top2 = liveLeaderboard[1] || DEFAULT_LEADERBOARD[1];
  const top3 = liveLeaderboard[2] || DEFAULT_LEADERBOARD[2];
  const top4 = liveLeaderboard[3] || DEFAULT_LEADERBOARD[3];
  const top5 = liveLeaderboard[4] || DEFAULT_LEADERBOARD[4];

  // Helper to parse points string to number
  const parsePts = (str?: string) => {
    if (!str) return 0;
    const match = String(str).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const p1Target = parsePts(top1.points);
  const p2Target = parsePts(top2.points);
  const p3Target = parsePts(top3.points);
  const p4Target = parsePts(top4.points);
  const p5Target = parsePts(top5.points);

  const p1Count = useCountUpFloat(p1Target, 1600, sec5InView);
  const p2Count = useCountUpFloat(p2Target, 1600, sec5InView);
  const p3Count = useCountUpFloat(p3Target, 1600, sec5InView);
  const p4Count = useCountUpFloat(p4Target, 1600, sec5InView);
  const p5Count = useCountUpFloat(p5Target, 1600, sec5InView);

  const formatPts = (val: number) => {
    return Number.isInteger(val) ? `${val} Pts` : `${val.toFixed(1)} Pts`;
  };

  return (
    <div className="home-root">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Embedded Token & Component Styles */}
      <style>{`
        :root {
          --ink: #E8EAED;
          --mut: #9AA0A6;
          --card: #141A2E;
          --ln: rgba(255,255,255,.1);
          --pill: rgba(20,26,46,.8);
          --b: #4C8DFF;
          --r: #EA4335;
          --y: #FBBC05;
          --yt: #FDD663;
          --gr: #34A853;
          --t1: #1C2848;
          --t2: #12332B;
          --t3: #3A2D1A;
          --t4: #3A1F24;
          --g1: #0C1022;
          --g2: #0D1430;
          --g3: #0A1D22;
          --sh: rgba(0,0,0,.35);
        }

        :root[data-theme="light"],
        html:not(.dark) {
          --ink: #202124;
          --mut: #5F6368;
          --card: #fff;
          --ln: #DADCE0;
          --pill: rgba(255,255,255,.88);
          --b: #1A73E8;
          --r: #D93025;
          --y: #FBBC05;
          --yt: #B06000;
          --gr: #1E8E3E;
          --t1: #E8F0FE;
          --t2: #E6F4EA;
          --t3: #FEF7E0;
          --t4: #FCE8E6;
          --g1: #fff;
          --g2: #F8F9FA;
          --g3: #F1F6FE;
          --sh: rgba(60,64,67,.16);
        }

        .home-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: drift 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        @keyframes drift {
          to { background-position: 100% 100%; }
        }

        .top-rgby-stripe {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: 9999;
          background: linear-gradient(90deg, #4285F4 25%, #EA4335 25% 50%, #FBBC05 50% 75%, #34A853 75%);
          pointer-events: none;
        }

        .home-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .svg-icon {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex: none;
        }

        .home-root :focus-visible {
          outline: 2px solid var(--r);
          outline-offset: 3px;
        }

        /* Buttons */
        .btn-cta {
          background: #1A73E8;
          color: #fff !important;
          padding: 14px 24px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid var(--edge);
          box-shadow: 5px 5px 0 var(--edge);
          transition: transform .09s ease-out, box-shadow .09s ease-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          white-space: nowrap;
          min-height: 44px;
        }
        .btn-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--edge);
        }
        .btn-cta:active,
        .btn-cta.is-pressed {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--edge);
        }

        .btn-ghost {
          border: 2px solid var(--edge);
          padding: 12px 20px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 5px 5px 0 var(--edge);
          transition: transform .09s ease-out, box-shadow .09s ease-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--card);
          color: var(--ink);
          cursor: pointer;
          white-space: nowrap;
          min-height: 44px;
        }
        .btn-ghost:hover {
          background: var(--card);
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--edge);
        }
        .btn-ghost:active,
        .btn-ghost.is-pressed {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--edge);
        }

        /* Enhanced Interactive Hero Action Buttons */
        .hero-btn-explore {
          position: relative;
          background: #1A73E8;
          padding: 14px 24px;
          border-radius: 14px;
          border: 2px solid var(--edge);
          box-shadow: 5px 5px 0 var(--edge);
          font-weight: 600;
          font-size: 14.5px;
          color: #ffffff !important;
          transition: transform .09s ease-out, box-shadow .09s ease-out;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          min-height: 44px;
        }
        .hero-btn-explore:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--edge);
        }
        .hero-btn-explore:active,
        .hero-btn-explore.is-pressed {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--edge);
        }
        .hero-btn-explore .btn-game-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-explore:hover .btn-game-icon {
          animation: heroGameWiggle 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-explore .hero-btn-pill {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 2.5px 8px;
          border-radius: 999px;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .hero-btn-explore:hover .hero-btn-pill {
          background: #ffffff;
          color: #1A73E8;
          transform: scale(1.06);
        }
        .hero-btn-explore .hero-btn-arrow {
          display: inline-block;
          font-size: 15px;
          font-weight: 700;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-explore:hover .hero-btn-arrow {
          transform: translateX(4px);
        }

        .hero-btn-leaderboard {
          position: relative;
          background: var(--card);
          border: 2px solid var(--edge);
          padding: 14px 24px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14.5px;
          color: var(--ink);
          box-shadow: 5px 5px 0 var(--edge);
          transition: transform .09s ease-out, box-shadow .09s ease-out;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          min-height: 44px;
        }
        .hero-btn-leaderboard:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--edge);
          background: var(--card);
        }
        .hero-btn-leaderboard:active,
        .hero-btn-leaderboard.is-pressed {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--edge);
        }
        .hero-btn-leaderboard .btn-trophy-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #F59E0B;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-leaderboard:hover .btn-trophy-icon {
          animation: heroTrophyTilt 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-leaderboard .hero-btn-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          position: relative;
          display: inline-block;
          flex-shrink: 0;
        }
        .hero-btn-leaderboard .hero-btn-live-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid #10B981;
          animation: heroLivePulse 1.8s infinite;
        }
        .hero-btn-leaderboard .hero-btn-arrow {
          display: inline-block;
          font-size: 15px;
          font-weight: 700;
          color: var(--mut);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
        }
        .hero-btn-leaderboard:hover .hero-btn-arrow {
          transform: translateX(4px);
          color: #F59E0B;
        }

        @keyframes heroGameWiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-12deg) scale(1.18); }
          75% { transform: rotate(12deg) scale(1.18); }
        }
        @keyframes heroTrophyTilt {
          0%, 100% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 0px transparent); }
          30% { transform: rotate(-14deg) scale(1.22); filter: drop-shadow(0 0 8px rgba(251, 188, 4, 0.8)); }
          65% { transform: rotate(10deg) scale(1.22); filter: drop-shadow(0 0 8px rgba(251, 188, 4, 0.8)); }
        }
        @keyframes heroLivePulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .btn-muted {
          border: 1px solid transparent;
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
          color: var(--mut);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          cursor: pointer;
          transition: color .2s;
          white-space: nowrap;
        }
        .btn-muted:hover {
          color: var(--ink);
        }

        /* Typography */
        .home-h1 {
          font-size: clamp(28px, 4.8vw, 64px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          font-weight: 700;
        }
        .home-h1 .w {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          animation: wordUp .7s cubic-bezier(.2,.8,.2,1) forwards;
        }
        @keyframes wordUp {
          to {
            opacity: 1;
            transform: none;
          }
        }

        .gt {
          background: linear-gradient(90deg, var(--b), var(--r), var(--y), var(--gr));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .home-h2 {
          font-size: clamp(28px, 3.8vw, 42px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          font-weight: 700;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--gr);
          margin-bottom: 12px;
        }

        .hn {
          font: 600 27px/1.1 'Caveat', cursive;
          display: inline-block;
          margin-top: 16px;
          transform: rotate(-2deg);
          color: var(--c);
          text-decoration: underline wavy 1.5px;
          text-underline-offset: 7px;
        }

        .sec-head {
          text-align: center;
          margin-bottom: 40px;
        }
        .sec-head p {
          color: var(--mut);
          font-size: 15px;
          margin: 12px auto 0;
          max-width: 56ch;
          line-height: 1.6;
        }

        .home-sec {
          padding-top: 96px;
        }

        /* Hero */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 40px;
          align-items: center;
          padding: 56px 0 48px;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--pill);
          border: 1px solid var(--ln);
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 12px;
          color: var(--mut);
          margin-bottom: 28px;
        }
        .hero-chip b {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gr);
          box-shadow: 0 0 0 4px rgba(52,211,153,.2);
        }
        .hero-chip em {
          font-style: normal;
          color: var(--b);
          font-weight: 600;
        }

        .hero-sub {
          color: var(--mut);
          font-size: 17px;
          max-width: 48ch;
          margin: 22px 0 26px;
          line-height: 1.6;
        }

        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 22px;
          font-size: 13px;
          color: var(--mut);
          margin-top: 26px;
        }
        .hero-trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .hero-trust svg {
          width: 16px;
          height: 16px;
          color: var(--gr);
        }

        /* Hero Right Floating Card - Exact Match to Screenshot */
        .hero-shot {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 28px;
          padding: 16px 18px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
          transform: rotate(-1.5deg);
          animation: heroBob 6s ease-in-out infinite;
          width: 100%;
          max-width: 470px;
          margin-left: auto;
          margin-right: auto;
        }

        :root[data-theme="dark"] .hero-shot,
        html.dark .hero-shot {
          background: #141A2E;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
        }

        @keyframes heroBob {
          50% { transform: rotate(-1.5deg) translateY(-8px); }
        }

        .washi-tape {
          position: absolute;
          top: -9px;
          width: 64px;
          height: 20px;
          background: rgba(195, 200, 218, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 2px;
          backdrop-filter: blur(2px);
          z-index: 10;
        }
        .washi-tape.a {
          left: 28px;
          transform: rotate(-3deg);
        }
        .washi-tape.b {
          right: 28px;
          transform: rotate(2deg);
        }

        .hero-panel {
          background: #EBF3FE;
          border-radius: 18px;
          padding: 20px 22px 18px;
        }

        :root[data-theme="dark"] .hero-panel,
        html.dark .hero-panel {
          background: #1A243F;
        }

        .hero-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 8px;
        }

        :root[data-theme="dark"] .hero-tag,
        html.dark .hero-tag {
          color: #94A3B8;
        }

        .hero-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
        }

        .hero-panel-title {
          font-size: 19px;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.25;
          margin: 0;
        }

        :root[data-theme="dark"] .hero-panel-title,
        html.dark .hero-panel-title {
          color: #F8FAFC;
        }

        .hero-guide-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--card);
          color: var(--ink);
          border: 2px solid var(--edge);
          border-radius: 12px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 4px 4px 0 var(--edge);
          transition: transform .09s ease-out, box-shadow .09s ease-out;
          text-decoration: none;
          flex-shrink: 0;
          min-height: 38px;
        }
        .hero-guide-btn:hover {
          color: var(--ink);
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--edge);
        }
        .hero-guide-btn:active,
        .hero-guide-btn.is-pressed {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 var(--edge);
        }

        .cd-head-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding: 0 2px;
        }

        .cd-head-title {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        :root[data-theme="dark"] .cd-head-title,
        html.dark .cd-head-title {
          color: #CBD5E1;
        }

        .cd-head-est {
          font-size: 12px;
          color: #64748B;
        }

        :root[data-theme="dark"] .cd-head-est,
        html.dark .cd-head-est {
          color: #94A3B8;
        }

        .cd-boxes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .cd-stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 10px 4px 8px;
          text-align: center;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }

        :root[data-theme="dark"] .cd-stat-card,
        html.dark .cd-stat-card {
          background: #141A2E;
          border-color: #334155;
        }

        .cd-stat-val {
          font-size: 28px;
          font-weight: 800;
          line-height: 1;
        }

        .cd-stat-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 5px;
        }

        :root[data-theme="dark"] .cd-stat-lbl,
        html.dark .cd-stat-lbl {
          color: #94A3B8;
        }

        .prize-corner-sticker {
          position: absolute;
          right: -8px;
          bottom: -12px;
          background: #00B074;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 10px;
          box-shadow: 0 8px 18px rgba(0, 176, 116, 0.4);
          transform: rotate(-3deg);
          pointer-events: none;
          z-index: 20;
        }

        /* Stats Strip - Single Horizontal Line */
        .stats-bar {
          background: var(--pill);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--ln);
          border-radius: 28px;
          padding: 16px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 12px 40px var(--sh);
          position: relative;
        }
        @media (min-width: 1024px) {
          .stats-bar {
            flex-wrap: nowrap;
          }
        }
        @media (max-width: 1023px) {
          .stats-bar {
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 11px;
          flex-shrink: 0;
        }
        .stat-ic {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          flex: none;
          transition: transform 0.25s ease;
        }
        .stat-item:hover .stat-ic {
          transform: scale(1.08);
        }
        .stat-num {
          font-size: 26px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -.02em;
          white-space: nowrap;
        }
        .stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          color: var(--mut);
          text-transform: uppercase;
          margin-top: 4px;
          white-space: nowrap;
        }
        .stat-divider {
          width: 1px;
          height: 38px;
          align-self: center;
          background: var(--ln);
          flex-shrink: 0;
        }
        .stat-note {
          font-family: 'Caveat', cursive;
          font-size: 24px;
          line-height: 1.1;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .stat-notify-btn {
          padding: 11px 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: transform .09s ease-out, box-shadow .09s ease-out;
        }
        .stat-notify-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--edge);
        }
        .stat-notify-btn:active,
        .stat-notify-btn.is-pressed {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--edge);
        }
        .stat-notify-btn:hover .stat-btn-bell {
          animation: bellRing 0.5s ease;
        }
        @keyframes bellRing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-16deg); }
          40% { transform: rotate(16deg); }
          60% { transform: rotate(-8deg); }
          80% { transform: rotate(8deg); }
        }

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }
        .bento-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 24px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform .25s, box-shadow .25s;
          position: relative;
          overflow: hidden;
        }
        .bento-card::before {
          content: "";
          position: absolute;
          top: -60px;
          right: -60px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: var(--c);
          opacity: .12;
          transition: opacity .3s, transform .5s;
        }
        .bento-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 44px var(--sh);
        }
        .bento-card:hover::before {
          opacity: .22;
          transform: scale(1.3);
        }
        .bento-card.c7 { grid-column: span 7; }
        .bento-card.c5 { grid-column: span 5; }

        .bento-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bento-top .ic-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: color-mix(in srgb, var(--c) 18%, transparent);
          color: var(--c);
        }
        .bento-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 99px;
          background: color-mix(in srgb, var(--c) 16%, transparent);
          color: var(--c);
        }

        .bento-card h3 {
          font-size: 22px;
          letter-spacing: -.02em;
          font-weight: 700;
        }
        .bento-card > p {
          font-size: 14px;
          color: var(--mut);
          line-height: 1.6;
        }

        .mini-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .mini-grid div,
        .ledger-row {
          background: var(--t1);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 13px;
        }
        .mini-grid b,
        .ledger-row b {
          display: block;
          font-size: 13px;
          color: var(--ink);
        }
        .mini-grid small,
        .ledger-row small {
          color: var(--mut);
          font-size: 12px;
          display: block;
        }

        .ledger-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ledger-row span {
          color: var(--c);
          font-weight: 600;
          font-size: 13px;
          white-space: nowrap;
        }

        .bento-foot {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--mut);
          padding-top: 10px;
        }
        .bento-foot a {
          color: var(--c);
          font-weight: 600;
          font-size: 13px;
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }
        .bento-foot a svg {
          width: 14px;
          height: 14px;
          transition: transform .2s;
        }
        .bento-foot a:hover svg {
          transform: translateX(3px);
        }

        .callout-ahead {
          border-left: 3px solid var(--c);
          background: var(--t4);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13px;
          color: var(--mut);
          line-height: 1.5;
        }
        .callout-ahead b {
          display: block;
          color: var(--ink);
          margin-bottom: 2px;
        }

        /* Spots Left for Each Tier Section */
        .spots-overview-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 26px;
          padding: 28px 32px;
          box-shadow: 0 20px 48px var(--sh);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }
        .spots-overview-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--b), var(--r), var(--y), var(--gr));
        }
        .spots-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 99px;
          background: color-mix(in srgb, var(--r) 12%, transparent);
          color: var(--r);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--r);
          position: relative;
        }
        .pulse-dot::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: var(--r);
          opacity: .6;
          animation: pulsePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulsePing {
          0% { transform: scale(1); opacity: .8; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .spots-big-num {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -.03em;
          color: var(--ink);
          line-height: 1.1;
        }
        .spots-big-num small {
          font-size: 18px;
          font-weight: 600;
          color: var(--mut);
          letter-spacing: normal;
        }
        .spots-progress-track {
          width: 100%;
          height: 12px;
          border-radius: 99px;
          background: var(--t1);
          overflow: hidden;
          position: relative;
          margin: 16px 0 12px;
          border: 1px solid var(--ln);
        }
        .spots-progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--b) 0%, var(--yt) 60%, var(--r) 100%);
          transition: width 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .spots-progress-fill::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          animation: spotShimmer 2.4s infinite;
        }
        @keyframes spotShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .spots-track-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .track-spot-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
          padding: 22px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform .25s, box-shadow .25s;
          overflow: hidden;
        }
        .track-spot-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px var(--sh);
        }
        .track-spot-card::before {
          content: "";
          position: absolute;
          top: -40px;
          right: -40px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--c);
          opacity: .10;
          pointer-events: none;
          transition: transform .4s, opacity .4s;
        }
        .track-spot-card:hover::before {
          transform: scale(1.3);
          opacity: .18;
        }
        .track-spot-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .track-spot-ic {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: color-mix(in srgb, var(--c) 16%, transparent);
          color: var(--c);
        }
        .track-spot-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
          background: color-mix(in srgb, var(--c) 14%, transparent);
          color: var(--c);
        }
        .track-spot-card h3 {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
          color: var(--ink);
        }
        .track-spot-card p {
          font-size: 13px;
          color: var(--mut);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .track-spot-bar {
          height: 6px;
          border-radius: 99px;
          background: var(--t1);
          overflow: hidden;
          margin-top: 4px;
        }
        .track-spot-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: var(--c);
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .track-spot-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding-top: 8px;
          border-top: 1px solid var(--ln);
        }

        /* Roadmap Steps */
        .path-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
        }
        .path-grid::before {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          top: 30px;
          border-top: 2px dashed var(--ln);
          pointer-events: none;
        }
        .step-card {
          position: relative;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
          padding: 24px;
          transition: transform .25s, box-shadow .25s;
        }
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px var(--sh);
        }
        .step-num {
          display: inline-grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--b);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 18px;
          position: relative;
          box-shadow: 0 0 0 6px var(--card);
        }
        .step-card:nth-child(2) .step-num { background: var(--r); }
        .step-card:nth-child(3) .step-num { background: var(--y); color: #202124; }
        .step-card:nth-child(4) .step-num { background: var(--gr); }

        .step-card h3 {
          font-size: 17px;
          line-height: 1.25;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .step-card p {
          font-size: 13px;
          color: var(--mut);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .step-card a {
          font-size: 12px;
          font-weight: 600;
          color: var(--b);
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }

        /* Leaderboard */
        .lb-card {
          position: relative;
          overflow: hidden;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 26px;
          padding: 18px 28px;
          box-shadow: 0 20px 50px var(--sh);
          transition: border-color .3s, box-shadow .3s;
        }
        .lb-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 26px;
          opacity: var(--lb-glow-opacity, 0);
          background: radial-gradient(600px circle at var(--lb-mouse-x, 50%) var(--lb-mouse-y, 50%), rgba(234, 88, 12, 0.18), rgba(245, 158, 11, 0.14), rgba(6, 182, 212, 0.12), rgba(124, 58, 237, 0.08), transparent 70%);
          transition: opacity .35s ease;
          z-index: 1;
        }
        .lb-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 26px;
          padding: 1.5px;
          background: radial-gradient(400px circle at var(--lb-mouse-x, 50%) var(--lb-mouse-y, 50%), rgba(251, 191, 36, 0.55), rgba(234, 88, 12, 0.45), rgba(6, 182, 212, 0.35), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: var(--lb-glow-opacity, 0);
          transition: opacity .35s ease;
          z-index: 2;
        }
        .lb-card > * {
          position: relative;
          z-index: 3;
        }
        .lb-row {
          display: grid;
          grid-template-columns: 48px 1fr 100px 110px;
          align-items: center;
          padding: 16px 8px;
          border-top: 1px solid var(--ln);
          font-size: 15px;
          transition: background .2s;
        }
        .lb-row:hover {
          background: var(--t1);
        }
        .lb-row.h {
          border: 0;
          font-size: 11px;
          letter-spacing: .12em;
          color: var(--mut);
          font-weight: 600;
        }
        .lb-row b {
          color: var(--gr);
          font-weight: 700;
        }
        .lb-row span:first-child {
          color: var(--yt);
          font-weight: 700;
          font-size: 14px;
        }
        .lb-tier-pill {
          background: var(--t3);
          color: var(--yt);
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          justify-self: start;
        }

        /* Community */
        .comm-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .comm-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
          padding: 22px;
          transition: transform .25s, box-shadow .25s;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .comm-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px var(--sh);
        }
        .comm-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-top: 10px;
        }
        .comm-card p {
          font-size: 13px;
          color: var(--mut);
          flex: 1;
          line-height: 1.5;
        }
        .comm-btn {
          margin-top: 12px;
          background: var(--card);
          border: 2px solid var(--edge);
          border-radius: 12px;
          box-shadow: 4px 4px 0 var(--edge);
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          transition: transform .09s ease-out, box-shadow .09s ease-out, background .2s, color .2s;
          color: var(--ink);
          cursor: pointer;
          user-select: none;
        }
        .comm-card:hover .comm-btn {
          background: var(--c);
          color: #fff;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--edge);
        }
        .comm-btn:active,
        .comm-btn.is-pressed,
        .comm-card:active .comm-btn {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 var(--edge);
        }

        .help-strip {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
          padding: 16px 20px;
          flex-wrap: wrap;
        }
        .help-strip .help-ic {
          width: 40px;
          height: 40px;
          background: var(--b);
          color: #fff;
          border-radius: 12px;
          display: grid;
          place-items: center;
          flex: none;
        }
        .help-strip .help-text {
          flex: 1;
          min-width: 200px;
        }
        .help-strip .help-text b {
          display: block;
          font-size: 14px;
          color: var(--ink);
        }
        .help-strip .help-text small {
          color: var(--mut);
          font-size: 12px;
        }

        /* Marquee */
        .marquee-viewport {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          margin-bottom: 16px;
          animation: marqueeScroll 55s linear infinite;
        }
        .marquee-track.r {
          animation-direction: reverse;
        }
        .marquee-viewport:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          to { transform: translateX(-50%); }
        }

        .quote-card {
          width: 290px;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 18px;
          padding: 18px;
          font-size: 13px;
          color: var(--mut);
          transition: box-shadow .25s;
          flex-shrink: 0;
          line-height: 1.5;
        }
        .quote-card:hover {
          box-shadow: 0 14px 30px var(--sh);
        }
        .quote-card header {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
          color: var(--ink);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.2;
        }
        .quote-card header small {
          display: block;
          font-weight: 400;
          color: var(--mut);
          font-size: 11px;
        }
        .quote-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-style: normal;
          flex: none;
          font-weight: 700;
          object-fit: cover;
          overflow: hidden;
        }
        i.quote-avatar {
          font-size: 13px;
        }
        img.quote-avatar {
          border: 1.5px solid var(--ln);
        }
        .quote-card:nth-child(4n+1) i.quote-avatar { background: var(--t1); color: var(--b); }
        .quote-card:nth-child(4n+2) i.quote-avatar { background: var(--t4); color: var(--r); }
        .quote-card:nth-child(4n+3) i.quote-avatar { background: var(--t3); color: var(--yt); }
        .quote-card:nth-child(4n) i.quote-avatar { background: var(--t2); color: var(--gr); }

        .quote-stars {
          display: block;
          color: var(--y);
          font-style: normal;
          letter-spacing: 2px;
          font-size: 12px;
          margin-bottom: 8px;
        }

        /* FAQ */
        .faq-wrap {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: 12px;
        }
        .faq-item {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 16px;
          transition: border-color .2s;
        }
        .faq-item[open] {
          border-color: var(--r);
        }
        .faq-item summary {
          list-style: none;
          cursor: pointer;
          padding: 18px 22px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          color: var(--ink);
        }
        .faq-item summary::-webkit-details-marker {
          display: none;
        }
        .faq-item summary svg {
          transition: transform .25s;
          color: var(--mut);
          width: 20px;
          height: 20px;
        }
        .faq-item[open] summary svg {
          transform: rotate(180deg);
        }
        .faq-item p {
          padding: 0 22px 20px;
          color: var(--mut);
          font-size: 14px;
          line-height: 1.6;
          animation: faqFade .4s forwards;
          opacity: 0;
        }
        @keyframes faqFade {
          to { opacity: 1; transform: none; }
        }

        .faq-footer-link {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: var(--mut);
        }
        .faq-footer-link a {
          color: var(--b);
          font-weight: 600;
        }

        /* Scroll reveal */
        .rv {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .rv.in {
          opacity: 1;
          transform: none;
        }

        /* Staggered reveals for cards inside sections */
        .rv .sec-head {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rv.in .sec-head {
          opacity: 1;
          transform: none;
        }

        .rv .bento-card,
        .rv .step-card,
        .rv .comm-card,
        .rv .faq-item,
        .rv .stat-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s;
        }
        .rv.in .bento-card,
        .rv.in .step-card,
        .rv.in .comm-card,
        .rv.in .faq-item,
        .rv.in .stat-item {
          opacity: 1;
          transform: none;
        }

        .rv.in .bento-card:nth-child(1),
        .rv.in .step-card:nth-child(1),
        .rv.in .comm-card:nth-child(1),
        .rv.in .stat-item:nth-child(1) {
          transition-delay: 0.08s;
        }
        .rv.in .bento-card:nth-child(2),
        .rv.in .step-card:nth-child(2),
        .rv.in .comm-card:nth-child(2),
        .rv.in .stat-item:nth-child(3) {
          transition-delay: 0.16s;
        }
        .rv.in .bento-card:nth-child(3),
        .rv.in .step-card:nth-child(3),
        .rv.in .comm-card:nth-child(3),
        .rv.in .stat-item:nth-child(5) {
          transition-delay: 0.24s;
        }
        .rv.in .bento-card:nth-child(4),
        .rv.in .step-card:nth-child(4),
        .rv.in .comm-card:nth-child(4) {
          transition-delay: 0.32s;
        }

        /* Podium columns reveal */
        .podium-col {
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out;
        }
        .rv:not(.in) .podium-col {
          opacity: 0;
          transform: translateY(32px);
        }
        .rv.in .podium-col-1 { transition-delay: 0.12s; }
        .rv.in .podium-col-2 { transition-delay: 0.20s; }
        .rv.in .podium-col-3 { transition-delay: 0.28s; }
        .rv.in .podium-col-4 { transition-delay: 0.36s; }
        .rv.in .podium-col-5 { transition-delay: 0.44s; }

        /* Responsive */
        @media(max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .bento-card.c7,
          .bento-card.c5 { grid-column: span 12; }
          .spots-track-grid,
          .path-grid,
          .comm-grid { grid-template-columns: 1fr 1fr; }
          .path-grid::before,
          .stat-divider { display: none; }
          .stat-note { margin-left: 0; }
        }

        @media(max-width: 640px) {
          .home-wrap { padding: 0 16px; }
          .hero-shot { transform: none !important; margin-top: 16px; max-width: 100%; }
          .hero-btn-explore,
          .hero-btn-leaderboard {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
          .cd-boxes-grid { gap: 6px; }
          .cd-stat-card { padding: 8px 2px 6px; }
          .cd-stat-val { font-size: 20px; }
          .hero-panel { padding: 16px 14px 14px; }
        }

        @media(max-width: 560px) {
          .spots-track-grid,
          .path-grid,
          .comm-grid,
          .mini-grid { grid-template-columns: 1fr; }
          .spots-overview-card { padding: 20px 16px; }
          .spots-big-num { font-size: 32px; }
          .lb-row { grid-template-columns: 36px 1fr 60px; }
          .lb-row > :nth-child(4) { display: none; }
        }

        @media(prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
          .home-h1 .w,
          .rv,
          .faq-item p {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* 4px RGBY Stripe at the very top of page (z-index above navbar) */}
      <div className="top-rgby-stripe" aria-hidden="true" />

      <div className="home-wrap">
        {/* ------------------------------------------------------------------ */}
        {/*                           1. HERO SECTION                          */}
        {/* ------------------------------------------------------------------ */}
        <section className="hero-grid" id="about">
          <div>
            {/* Status Chip Pill */}
            <div className="hero-chip">
              <b aria-hidden="true" />
              <span>Google Cloud Arcade 2026 is Active</span>
              <span aria-hidden="true">|</span>
              <em>OCT Games Live</em>
            </div>

            {/* Word-by-word Reveal H1 - Master Cloud Skills in 1 line */}
            <h1 className="home-h1">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                <span className="w" style={{ animationDelay: '0.05s' }}>Master</span>{' '}
                <span className="w" style={{ animationDelay: '0.12s' }}>Cloud</span>{' '}
                <span className="w" style={{ animationDelay: '0.19s' }}>Skills.</span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap">
                <span className="w gt" style={{ animationDelay: '0.30s' }}>Track</span>{' '}
                <span className="w gt" style={{ animationDelay: '0.37s' }}>Arcade</span>{' '}
                <span className="w gt" style={{ animationDelay: '0.44s' }}>Rewards.</span>
              </span>
            </h1>

            <p className="hero-sub">
              The premier companion for the Google Cloud Arcade Program. Complete hands-on cloud labs, calculate milestone points in real time, follow live leaderboards, and prepare for the 2027 Prize Counter.
            </p>

            <div className="flex flex-wrap gap-3.5 items-center pb-2 pr-2">
              <Link to="/syllabus" className="hero-btn-explore group">
                <span className="btn-game-icon"><SvgIcon name="game" /></span>
                <span>Explore Syllabus &amp; Games</span>
                <span className="hero-btn-pill">OCT LIVE</span>
                <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/leaderboard" className="hero-btn-leaderboard group">
                <span className="btn-trophy-icon"><SvgIcon name="trophy" /></span>
                <span>Live Leaderboard</span>
                <span className="hero-btn-live-dot" title="Live Synced Standings" />
                <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="hero-trust">
              <span>
                <SvgIcon name="spark" />
                <span>100% Free Hands-on Access</span>
              </span>
              <span>
                <SvgIcon name="shield" />
                <span>Official Google Cloud Curated Labs</span>
              </span>
            </div>
          </div>

          {/* Right Floating Card - Exactly matching the screenshot */}
          <div className="hero-shot">
            <span className="washi-tape a" aria-hidden="true" />
            <span className="washi-tape b" aria-hidden="true" />

            <div className="hero-panel">
              <div className="hero-tag">ARCADE COMPANION 2026</div>

              <div className="hero-panel-head">
                <h3 className="hero-panel-title">
                  Prize redemption window opens<br />January 7, 2027
                </h3>
                <Link to="/resources/prize-counter-guide" className="hero-guide-btn">
                  Guide
                </Link>
              </div>

              <div className="cd-head-row">
                <span className="cd-head-title">Prize Counter Countdown</span>
                <span className="cd-head-est">Jan 7, 2027 • 5:30 AM</span>
              </div>

              <div className="cd-boxes-grid" id="cd">
                {/* DAYS */}
                <div className="cd-stat-card">
                  <div className="cd-stat-val text-[#2563EB] dark:text-[#60A5FA]">
                    {countdown.days}
                  </div>
                  <div className="cd-stat-lbl">DAYS</div>
                </div>

                {/* HOURS */}
                <div className="cd-stat-card">
                  <div className="cd-stat-val text-[#C26100] dark:text-[#FBBF24]">
                    {countdown.hours}
                  </div>
                  <div className="cd-stat-lbl">HOURS</div>
                </div>

                {/* MINS */}
                <div className="cd-stat-card">
                  <div className="cd-stat-val text-[#DC2626] dark:text-[#F87171]">
                    {countdown.mins}
                  </div>
                  <div className="cd-stat-lbl">MINS</div>
                </div>

                {/* SECS */}
                <div className="cd-stat-card">
                  <div className="cd-stat-val text-[#16A34A] dark:text-[#4ADE80]">
                    {countdown.secs}
                  </div>
                  <div className="cd-stat-lbl">SECS</div>
                </div>
              </div>
            </div>

            <span className="prize-corner-sticker">PRIZE COUNTER</span>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                          2. STATS STRIP                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="stats-bar rv" ref={sec2Ref}>
          <div className="stat-item">
            <div className="stat-ic" style={{ background: 'var(--t1)', color: 'var(--b)' }}>
              <SvgIcon name="users" />
            </div>
            <div>
              <div className="stat-num">{learnersCount.toLocaleString()}+</div>
              <div className="stat-label">Active learners</div>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-ic" style={{ background: 'var(--t2)', color: 'var(--gr)' }}>
              <SvgIcon name="flask" />
            </div>
            <div>
              <div className="stat-num">{labsCount}+</div>
              <div className="stat-label">Hands-on labs</div>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-item">
            <div className="stat-ic" style={{ background: 'var(--t3)', color: 'var(--yt)' }}>
              <SvgIcon name="star" />
            </div>
            <div>
              <div className="stat-num">
                {ratingVal.toFixed(1)}<small style={{ fontSize: '16px', color: 'var(--mut)' }}>/5</small>
              </div>
              <div className="stat-label">Average rating</div>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          {/* 4th Stat: Swag Tiers */}
          <div className="stat-item">
            <div className="stat-ic" style={{ background: 'var(--t4)', color: 'var(--r)' }}>
              <SvgIcon name="gift" />
            </div>
            <div>
              <div className="stat-num">{tiersCount} Tiers</div>
              <div className="stat-label">Trooper &bull; Legend</div>
            </div>
          </div>

          <div className="stat-divider" aria-hidden="true" />

          <div className="stat-note">
            See you<br />next season!
          </div>

          <a
            href="#mentorship"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('mentorship');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="btn-cta stat-notify-btn"
          >
            <span>GET NOTIFIED</span>
            <span className="stat-btn-bell" aria-hidden="true">🔔</span>
          </a>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*                      3. PROGRAM ARCHITECTURE                       */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" ref={sec3Ref}>
          <div className="sec-head">
            <div className="eyebrow">Program Architecture</div>
            <h2 className="home-h2">Everything You Need to Know for Season 2026</h2>
            <p>
              Understand how badges convert to arcade points, explore available game paths, and discover the path to exclusive Google Cloud swags.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--b)' }}>
              Know your points!
            </div>
          </div>

          <div className="bento-grid">
            {/* Card A (blue) */}
            <div className="bento-card c7" style={{ ['--c' as any]: 'var(--b)' }}>
              <div className="bento-top">
                <div className="ic-box">
                  <SvgIcon name="game" />
                </div>
                <span className="bento-pill">Q4 Cohort</span>
              </div>
              <h3>Arcade Games &amp; Active Syllabus</h3>
              <p>
                Earn points by completing interactive cloud scenarios in DevOps, BigQuery, Infrastructure, and Vertex AI. Every completed game directly adds 1 full point to your tally.
              </p>
              <div className="mini-grid">
                <div>
                  <b>Base Camp &amp; Essentials</b>
                  <small>Hands-on GCP fundamental labs</small>
                </div>
                <div>
                  <b>Generative AI Journeys</b>
                  <small>Vertex AI, Gemini &amp; Prompting</small>
                </div>
              </div>
              <div className="bento-foot">
                <span>Over {bentoLabsCount}+ labs with step-by-step guides</span>
                <Link to="/syllabus">
                  <span>View Full Syllabus</span>
                  <SvgIcon name="arrow" />
                </Link>
              </div>
            </div>

            {/* Card B (green) */}
            <div className="bento-card c5" style={{ ['--c' as any]: 'var(--gr)' }}>
              <div className="bento-top">
                <div className="ic-box">
                  <SvgIcon name="calc" />
                </div>
                <span className="bento-pill">2026 Conversion</span>
              </div>
              <h3>Points &amp; Badges Ledger</h3>
              <p>Transparent, predictable point math for every badge earned on Skills Boost.</p>
              <div>
                <div className="ledger-row">
                  <b>1 Arcade Game</b>
                  <span>{ledgerGamePt.toFixed(1)} Arcade Point</span>
                </div>
                <div className="ledger-row">
                  <b>2 Skill Badges</b>
                  <span>1.0 Arcade Point ({ledgerSkillPt.toFixed(1)} pt each)</span>
                </div>
                <div className="ledger-row">
                  <b>Facilitator Milestones</b>
                  <span>Bonus Multipliers</span>
                </div>
              </div>
              <div className="bento-foot">
                <span>Real-time calculations</span>
                <Link to="/calculator">
                  <span>Launch Calculator</span>
                  <SvgIcon name="arrow" />
                </Link>
              </div>
            </div>

            {/* Card C (yellow, use --yt for text) */}
            <div className="bento-card c5" style={{ ['--c' as any]: 'var(--yt)' }}>
              <div className="bento-top">
                <div className="ic-box">
                  <SvgIcon name="gift" />
                </div>
                <span className="bento-pill">Prize Counter</span>
              </div>
              <h3>Swag &amp; Milestone Rewards</h3>
              <p>
                Redeem earned arcade points for official Google Cloud merchandise delivered directly to your doorstep.
              </p>
              <div className="mini-grid">
                <div>
                  <small>Standard Tier</small>
                  <b>T-Shirt &amp; Pen Pack</b>
                </div>
                <div>
                  <small>Advanced Tier</small>
                  <b>Steel Bottle &amp; Bag</b>
                </div>
                <div>
                  <small>Premium Tier</small>
                  <b>Executive Hoodie</b>
                </div>
                <div>
                  <small>Ultimate Tier</small>
                  <b>Complete Swag Box</b>
                </div>
              </div>
              <div className="bento-foot">
                <span>Free global shipping</span>
                <Link to="/swags">
                  <span>View Swag Showcase</span>
                  <SvgIcon name="arrow" />
                </Link>
              </div>
            </div>

            {/* Card D (red) */}
            <div className="bento-card c7" style={{ ['--c' as any]: 'var(--r)' }}>
              <div className="bento-top">
                <div className="ic-box">
                  <SvgIcon name="layers" />
                </div>
                <span className="bento-pill">Learner Intel</span>
              </div>
              <h3>Season 2026 Status &amp; What's Ahead</h3>
              <p>
                The Facilitator cohort concluded on September 14, 2026, but the overarching Google Cloud Arcade runs all the way through December 31, 2026. You can continue learning, completing skill badges, and collecting points for the upcoming January 2027 redemption.
              </p>
              <div className="callout-ahead">
                <b>Next major milestone: Prize Counter opening</b>
                Estimated opening: January 7, 2027. Keep your public profile URL safe to claim your points.
              </div>
              <div className="bento-foot">
                <span>Official FAQ &amp; Guidelines</span>
                <Link to="/faq">
                  <span>Read Facilitator FAQ</span>
                  <SvgIcon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*               TIER SPOTS & SWAG CAPACITY TRACKER                   */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" id="spots-left" ref={secSpotsRef}>
          <div className="sec-head">
            <div className="eyebrow">Tier Allocation &amp; Capacity</div>
            <h2 className="home-h2">How Many Spots Are Left for Each Tier?</h2>
            <p>
              Track real-time swag eligibility and remaining prize slots for each Arcade milestone tier before the January 2027 Prize Counter window. Spots are allocated based on verified badge points and synced live with the dashboard.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--r)' }}>
              Only {(spotsLeftCount || totalSpotsLeftSum).toLocaleString()} spots left across all tiers!
            </div>
          </div>

          {/* Main Capacity Overview Card */}
          <div className="spots-overview-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--ln)]">
              <div className="flex items-center gap-3">
                <span className="spots-live-pill">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span>LIVE TIER CAPACITY TRACKER</span>
                </span>
                <span className="text-xs font-semibold text-[var(--mut)] hidden sm:inline">
                  Synced with Dashboard • Season 2026
                </span>
              </div>
              <div className="text-xs font-medium text-[var(--mut)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Prize Counter Opens: January 7, 2027</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
              {/* Left Column: Big Spots Counter & Progress Bar */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <div className="spots-big-num">
                    <span>{spotsLeftCount.toLocaleString()}</span>
                    <small> / {totalSlotsSum.toLocaleString()} Total Prize Slots</small>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900/50">
                    High Demand • {overallPercentage}% Claimed
                  </span>
                </div>
                <div className="text-sm font-semibold text-[var(--ink)]">
                  Remaining Swag Allocations Across Trooper, Ranger, Champion &amp; Legend
                </div>
                <div className="text-xs text-[var(--mut)] mt-1">
                  {totalClaimedSum.toLocaleString()} verified learners have unlocked tiers. Redemptions are fulfilled in order of point verification.
                </div>

                {/* Styled Progress Bar */}
                <div className="spots-progress-track" role="progressbar" aria-valuenow={overallPercentage} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="spots-progress-fill"
                    style={{ width: secSpotsInView ? `${overallPercentage}%` : '0%' }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs text-[var(--mut)] font-semibold">
                  <span>0 Claimed</span>
                  <span className="text-[var(--ink)]">{spotsClaimedCount.toLocaleString()} Slots Claimed ({overallPercentage}%)</span>
                  <span>{totalSlotsSum.toLocaleString()} Total Cap</span>
                </div>
              </div>

              {/* Right Column: Key Enrollment Insights */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--t1)] border border-[var(--ln)]">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-bold text-sm">
                    <SvgIcon name="gift" />
                  </div>
                  <div className="text-xs">
                    <b className="block text-[var(--ink)]">Free Worldwide Swag Delivery</b>
                    <span className="text-[var(--mut)]">Delivered directly to your doorstep at zero cost</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--t2)] border border-[var(--ln)]">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 font-bold text-sm">
                    <SvgIcon name="shield" />
                  </div>
                  <div className="text-xs">
                    <b className="block text-[var(--ink)]">Official Google Cloud Verification</b>
                    <span className="text-[var(--mut)]">Verified via your public Skills Boost profile</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--t3)] border border-[var(--ln)]">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 font-bold text-sm">
                    <SvgIcon name="trophy" />
                  </div>
                  <div className="text-xs">
                    <b className="block text-[var(--ink)]">Milestone Multipliers Active</b>
                    <span className="text-[var(--mut)]">Bonus points apply towards tier upgrades</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout & Quick Action */}
            <div className="pt-4 border-t border-[var(--ln)] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[var(--mut)] flex items-center gap-2">
                <SvgIcon name="spark" className="w-4 h-4 text-amber-500" />
                <span>Check your current points to see which swag tier you have unlocked.</span>
              </div>
              <div className="flex items-center gap-3 pb-2 pr-2">
                <Link to="/calculator" className="btn-cta" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  <span>Calculate My Tier</span>
                  <SvgIcon name="calc" />
                </Link>
                <Link to="/resources/swag-showcase-page" className="btn-ghost" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <span>View Swag Gallery</span>
                  <SvgIcon name="arrow" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Tier Cards Grid */}
          <div className="spots-track-grid">
            {SWAG_TIER_METAS.map((tier) => {
              const spotInfo = dashboardSpots[tier.key] || DEFAULT_DASHBOARD_SPOTS[tier.key];
              const capacity = spotInfo.total;
              const spotsLeft = spotInfo.spotsLeft;
              const claimed = Math.max(0, capacity - spotsLeft);
              const percentage = capacity > 0 ? Math.min(100, Math.max(0, Math.round((claimed / capacity) * 1000) / 10)) : 0;
              const animatedLeft =
                tier.key === 'trooper' ? trooperLeft : tier.key === 'ranger' ? rangerLeft : tier.key === 'champion' ? championLeft : legendLeft;
              const statusTag =
                percentage >= 90
                  ? `Critical (${percentage}% Full)`
                  : percentage >= 80
                  ? `Filling Fast (${percentage}%)`
                  : `${percentage}% Claimed`;

              return (
                <div
                  key={tier.id}
                  className="track-spot-card"
                  style={{ ['--c' as any]: tier.accent }}
                >
                  <div className="track-spot-head">
                    <div className="track-spot-ic">
                      <SvgIcon name={tier.icon} />
                    </div>
                    <span className="track-spot-pill">{statusTag}</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--mut)]">
                        {tier.level}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-black"
                        style={{ background: `color-mix(in srgb, ${tier.accent} 16%, transparent)`, color: tier.accent }}
                      >
                        {tier.milestonePoints}
                      </span>
                    </div>
                    <h3>{tier.tierName}</h3>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--t1)] border border-[var(--ln)] text-xs">
                    <span className="text-[var(--mut)] block text-[10px] uppercase font-semibold">Includes</span>
                    <b className="text-[var(--ink)] block mt-0.5">{tier.swagItems}</b>
                  </div>

                  <p>{tier.desc}</p>

                  {/* Spots Left Counter and Bar */}
                  <div className="mt-auto pt-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs text-[var(--mut)] font-medium">Spots Left</span>
                      <span className="text-base font-extrabold text-[var(--ink)]">
                        {animatedLeft.toLocaleString()} <small className="text-xs font-normal text-[var(--mut)]">/ {capacity.toLocaleString()}</small>
                      </span>
                    </div>

                    <div className="track-spot-bar">
                      <div
                        className="track-spot-bar-fill"
                        style={{ width: secSpotsInView ? `${percentage}%` : '0%' }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[var(--mut)] font-semibold mt-1">
                      <span>{claimed.toLocaleString()} claimed</span>
                      <span style={{ color: tier.accent }}>{percentage}% filled</span>
                    </div>
                  </div>

                  <div className="track-spot-foot">
                    <span className="text-[var(--mut)] text-xs">January 2027</span>
                    <Link
                      to="/swags"
                      className="inline-flex items-center gap-1 font-semibold text-xs transition-transform hover:translate-x-0.5"
                      style={{ color: tier.accent }}
                    >
                      <span>Explore Swag</span>
                      <SvgIcon name="arrow" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                   4. HOW GOOGLE CLOUD ARCADE WORKS                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" ref={sec4Ref}>
          <div className="sec-head">
            <div className="eyebrow">The Roadmap</div>
            <h2 className="home-h2">How Google Cloud Arcade Works</h2>
            <p>
              A step-by-step pathway from zero cloud experience to earning industry-recognized badges and authentic Google merchandise.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--r)' }}>
              Four steps, that's all!
            </div>
          </div>

          <div className="path-grid">
            {STEPS.map((st) => (
              <div key={st.num} className="step-card">
                <span className="step-num">{st.num}</span>
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
                {st.isExternal ? (
                  <a href={st.href} target="_blank" rel="noopener noreferrer">
                    <span>{st.linkText}</span>
                    <SvgIcon name="ext" />
                  </a>
                ) : (
                  <Link to={st.href}>
                    <span>{st.linkText}</span>
                    <SvgIcon name="arrow" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                        5. TOP PERFORMERS                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" ref={sec5Ref}>
          <div className="sec-head">
            <div className="eyebrow">Final standings</div>
            <h2 className="home-h2">Top performers</h2>
            <p>Season 2026 rankings, ordered by Arcade points.</p>
            <div className="hn" style={{ ['--c' as any]: 'var(--yt)' }}>
              Hats off to the champions!
            </div>
          </div>

          <div
            className="lb-card"
            id="lb"
            ref={lbCardRef}
            onMouseMove={handleLeaderboardMouseMove}
            onMouseLeave={handleLeaderboardMouseLeave}
          >
            {/* Visual Podium: 5 Bars (4th, 2nd, 1st, 3rd, 5th) */}
            <div className="pt-2 pb-4 px-1 sm:px-4 overflow-x-auto no-scrollbar">
              <div className="relative flex justify-center items-end gap-1.5 sm:gap-4 md:gap-6 mx-auto pt-6 min-h-[310px] sm:min-h-[350px] max-w-3xl min-w-[314px]">
                {/* 4th Place: Subrat Kumar Mohanty */}
                <div className="podium-col podium-col-4 flex flex-col items-center justify-end w-[54px] sm:w-[96px] md:w-[124px] group transition-transform hover:-translate-y-1">
                  <div className="flex flex-col items-center justify-center mb-2.5 z-10 w-full text-center">
                    <div
                      className="w-10 h-10 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base shadow-md mb-1.5 border-2 border-cyan-300 dark:border-cyan-500/50"
                      style={{ background: top4.avatarBg || '#06B6D4' }}
                    >
                      {top4.initials || 'SM'}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[9px] sm:text-xs md:text-sm capitalize truncate w-full px-0.5">
                      {top4.name}
                    </span>
                    <div className="mt-1 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold text-[8px] sm:text-[11px] bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 whitespace-nowrap shadow-xs">
                      {formatPts(p4Count)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl sm:rounded-t-2xl border-t-2 border-l border-r border-[#CBD5E1] dark:border-[#475569] bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] dark:from-[#1E293B] dark:to-[#0F172A] h-[105px] sm:h-[125px] md:h-[140px] flex items-center justify-center relative shadow-sm">
                    <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#64748B] dark:text-[#94A3B8]">
                      4
                    </span>
                  </div>
                </div>

                {/* 2nd Place: Bhaswati Mondal */}
                <div className="podium-col podium-col-2 flex flex-col items-center justify-end w-[58px] sm:w-[104px] md:w-[136px] group transition-transform hover:-translate-y-1">
                  <div className="flex flex-col items-center justify-center mb-2.5 z-10 w-full text-center">
                    <div
                      className="w-11 h-11 sm:w-15 sm:h-15 md:w-17 md:h-17 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-lg shadow-md mb-1.5 border-2 border-purple-300 dark:border-purple-500/50"
                      style={{ background: top2.avatarBg || '#7C3AED' }}
                    >
                      {top2.initials || 'BM'}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[9px] sm:text-xs md:text-sm capitalize truncate w-full px-0.5">
                      {top2.name}
                    </span>
                    <div className="mt-1 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold text-[8px] sm:text-[11px] bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] dark:bg-[#2e264d] dark:text-[#DDD6FE] dark:border-[#5b4d99] whitespace-nowrap shadow-xs">
                      {formatPts(p2Count)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl sm:rounded-t-2xl border-t-2 border-l border-r border-[#DDD6FE] dark:border-[#5b4d99] bg-gradient-to-b from-[#F5F3FF] to-[#EDE9FE] dark:from-[#2e264d] dark:to-[#1e1b33] h-[150px] sm:h-[175px] md:h-[195px] flex items-center justify-center relative shadow-sm">
                    <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#7C3AED] dark:text-[#DDD6FE]">
                      2
                    </span>
                  </div>
                </div>

                {/* 1st Place: Pranjal (Center, Tallest, Crown) */}
                <div className="podium-col podium-col-1 flex flex-col items-center justify-end w-[66px] sm:w-[118px] md:w-[152px] group transition-transform hover:-translate-y-1 z-10">
                  <div className="flex flex-col items-center justify-center mb-2.5 z-10 w-full text-center relative">
                    <div className="text-amber-500 mb-0.5 animate-bounce" style={{ animationDuration: '3s' }}>
                      <SvgIcon name="crown" className="w-5 h-5 sm:w-7 sm:h-7 mx-auto" />
                    </div>
                    <div
                      className="w-13 h-13 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-black text-sm sm:text-xl md:text-2xl shadow-xl mb-1.5 border-3 border-amber-300 dark:border-amber-400"
                      style={{ background: top1.avatarBg || '#EA580C' }}
                    >
                      {top1.initials || 'PR'}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-sm md:text-base capitalize truncate w-full px-0.5">
                      {top1.name}
                    </span>
                    <div className="mt-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-[9px] sm:text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md whitespace-nowrap">
                      {formatPts(p1Count)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl sm:rounded-t-2xl border-t-2 border-l border-r border-[#FDE047] dark:border-[#a18121] bg-gradient-to-b from-[#FFF5CC] to-[#FEF08A] dark:from-[#433108] dark:to-[#2e2105] h-[190px] sm:h-[220px] md:h-[250px] flex items-center justify-center relative shadow-md">
                    <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#EAB308] dark:text-[#FDE047]">
                      1
                    </span>
                  </div>
                </div>

                {/* 3rd Place: Debayan Karar */}
                <div className="podium-col podium-col-3 flex flex-col items-center justify-end w-[58px] sm:w-[104px] md:w-[136px] group transition-transform hover:-translate-y-1">
                  <div className="flex flex-col items-center justify-center mb-2.5 z-10 w-full text-center">
                    <div
                      className="w-11 h-11 sm:w-15 sm:h-15 md:w-17 md:h-17 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-lg shadow-md mb-1.5 border-2 border-amber-200 dark:border-amber-600/50"
                      style={{ background: top3.avatarBg || '#F59E0B' }}
                    >
                      {top3.initials || 'DK'}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[9px] sm:text-xs md:text-sm capitalize truncate w-full px-0.5">
                      {top3.name}
                    </span>
                    <div className="mt-1 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold text-[8px] sm:text-[11px] bg-[#FFFBEB] text-[#D97706] border border-[#FEF08A] dark:bg-[#433716] dark:text-[#FEF08A] dark:border-[#85712c] whitespace-nowrap shadow-xs">
                      {formatPts(p3Count)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl sm:rounded-t-2xl border-t-2 border-l border-r border-[#FEF08A] dark:border-[#85712c] bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] dark:from-[#433716] dark:to-[#2d240d] h-[130px] sm:h-[150px] md:h-[170px] flex items-center justify-center relative shadow-sm">
                    <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#D97706] dark:text-[#FEF08A]">
                      3
                    </span>
                  </div>
                </div>

                {/* 5th Place: Anick Roy */}
                <div className="podium-col podium-col-5 flex flex-col items-center justify-end w-[54px] sm:w-[96px] md:w-[124px] group transition-transform hover:-translate-y-1">
                  <div className="flex flex-col items-center justify-center mb-2.5 z-10 w-full text-center">
                    <div
                      className="w-10 h-10 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base shadow-md mb-1.5 border-2 border-slate-300 dark:border-slate-600"
                      style={{ background: top5.avatarBg || '#5A6B82' }}
                    >
                      {top5.initials || 'AR'}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[9px] sm:text-xs md:text-sm capitalize truncate w-full px-0.5">
                      {top5.name}
                    </span>
                    <div className="mt-1 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold text-[8px] sm:text-[11px] bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 whitespace-nowrap shadow-xs">
                      {formatPts(p5Count)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl sm:rounded-t-2xl border-t-2 border-l border-r border-[#E2E8F0] dark:border-[#334155] bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] dark:from-[#1E293B] dark:to-[#0B132B] h-[85px] sm:h-[100px] md:h-[115px] flex items-center justify-center relative shadow-sm">
                    <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#94A3B8] dark:text-[#CBD5E1]">
                      5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/leaderboard" className="btn-cta">
              <span>View full leaderboard</span>
              <SvgIcon name="arrow" />
            </Link>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                        6. LEARN TOGETHER                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" id="mentorship" ref={sec6Ref}>
          <div className="sec-head">
            <div className="eyebrow">Mentorship &amp; Support</div>
            <h2 className="home-h2">Learn Together, Never Get Stuck</h2>
            <p>
              Connect with thousands of fellow Google Cloud learners, facilitators, and mentors across our active social and technical groups.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--gr)' }}>
              You're never alone here
            </div>
          </div>

          <div className="comm-grid">
            {COMMUNITY_CARDS.map((card, idx) => {
              const countVal = idx === 0 ? commCount1 : idx === 1 ? commCount2 : idx === 2 ? commCount3 : commCount4;
              return (
                <a
                  key={card.name}
                  className="comm-card"
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ['--c' as any]: card.colorVar }}
                >
                  <div className="flex justify-between items-center">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: card.tintVar, color: card.colorVar }}
                    >
                      <SvgIcon name={card.icon} />
                    </div>
                    <small style={{ color: 'var(--mut)', fontSize: '11px', fontWeight: 600 }}>
                      {countVal.toLocaleString()}+ members
                    </small>
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.desc}</p>
                  <span className="comm-btn">
                    <span>{card.btnText}</span>
                    <SvgIcon name="ext" />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="help-strip">
            <div className="help-ic">
              <SvgIcon name="help" />
            </div>
            <div className="help-text">
              <b>Have a specific question about badges or points?</b>
              <small>Submit a query ticket and our facilitator community will assist you.</small>
            </div>
            <Link to="/support" className="btn-ghost">
              <span>Raise a Query Ticket</span>
              <SvgIcon name="arrow" />
            </Link>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                        7. LEARNER QUOTES                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" ref={sec7Ref}>
          <div className="sec-head">
            <div className="eyebrow">Learner Quotes</div>
            <h2 className="home-h2">Kind words from the community</h2>
            <p>
              Messages from learners who finished labs, earned badges and climbed the leaderboard.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--r)' }}>
              Straight from our learners
            </div>
          </div>

          <div className="marquee-viewport" id="mq">
            {/* Track 1: Leftward infinite scroll (Row 1) */}
            <div className="marquee-track">
              {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((q, idx) => (
                <div key={`t1-${idx}`} className="quote-card">
                  <header>
                    {q.avatarUrl ? (
                      <img
                        src={q.avatarUrl}
                        alt={q.name}
                        className="quote-avatar"
                        loading="lazy"
                      />
                    ) : (
                      <i className="quote-avatar">
                        {q.name.charAt(0) || 'L'}
                      </i>
                    )}
                    <span>
                      {q.name}
                      <small>{q.role}</small>
                    </span>
                  </header>
                  <em className="quote-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</em>
                  <p>{q.text}</p>
                </div>
              ))}
            </div>

            {/* Track 2: Rightward infinite scroll (Row 2 - completely separate set) */}
            <div className="marquee-track r">
              {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((q, idx) => (
                <div key={`t2-${idx}`} className="quote-card">
                  <header>
                    {q.avatarUrl ? (
                      <img
                        src={q.avatarUrl}
                        alt={q.name}
                        className="quote-avatar"
                        loading="lazy"
                      />
                    ) : (
                      <i className="quote-avatar">
                        {q.name.charAt(0) || 'L'}
                      </i>
                    )}
                    <span>
                      {q.name}
                      <small>{q.role}</small>
                    </span>
                  </header>
                  <em className="quote-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</em>
                  <p>{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/*                               8. FAQ                               */}
        {/* ------------------------------------------------------------------ */}
        <section className="home-sec rv" id="faq" ref={sec8Ref} style={{ paddingBottom: '96px' }}>
          <div className="sec-head">
            <div className="eyebrow">Quick Intel</div>
            <h2 className="home-h2">Frequently Asked Questions</h2>
            <p>
              Clear answers to common questions about points, deadlines, and prize redemptions.
            </p>
            <div className="hn" style={{ ['--c' as any]: 'var(--b)' }}>
              Still curious? Ask away!
            </div>
          </div>

          <div className="faq-wrap">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>
                  <span>{item.question}</span>
                  <SvgIcon name="chev" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <p className="faq-footer-link">
            Looking for more detailed program guidelines?{' '}
            <Link to="/faq">Visit the Full FAQ Directory</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
