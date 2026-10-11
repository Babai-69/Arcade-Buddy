import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Beaker,
  Coins,
  Gamepad2,
  Layers,
  ChevronDown,
  ChevronUp,
  Lock,
  Copy,
  Check,
  Calendar,
  Gift,
  Zap,
  Info,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArcadeGames } from '../utils/arcadeApi';

import { skillBadges as catalogSkillBadges } from '../data/badgesData';
import { initialBadges } from '../lib/badgeData';

interface GameItem {
  title: string;
  img: string;
  code: string;
  month: string;
  link: string;
}

interface BadgeItem {
  title: string;
  labs: number;
  credits: number;
  link: string;
  img: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const JULY_GAMES: GameItem[] = [
  {
    title: "Arcade Base Camp July 2026",
    img: "https://cdn.qwiklabs.com/4U2vlpzq9reboYn5uEz23BcGACB2gzE7LYgjWcLnMj4%3D",
    code: "1q-basecamp-072026",
    link: "https://www.skills.google/games/7313?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-july-arcade26",
    month: "July"
  },
  {
    title: "Arcade Adventure: Low-Code Development",
    img: "https://cdn.qwiklabs.com/4fQLKgjIAxTZlNT4DG%2BEmZyldujFT7hY7%2BnCNVSYJGg%3D",
    code: "1q-lowcode-072026",
    link: "https://www.skills.google/games/7314?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-july-arcade26",
    month: "July"
  },
  {
    title: "Arcade Voyage: Cloud Storage and Data Governance",
    img: "https://cdn.qwiklabs.com/uJ%2FftsI%2Bv10gDukvMs1C4f3%2FoylCzKlux7CZmWfiZeU%3D",
    code: "1q-cloudstorage-072026",
    link: "https://www.skills.google/games/7315?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-july-arcade26",
    month: "July"
  },
  {
    title: "Arcade Trail: Google Workspace Administration",
    img: "https://cdn.qwiklabs.com/7NGqQ0TzcNOq14AvQlqClQuuz61PtIFk0RfLEXYd%2BC0%3D",
    code: "1q-workspace-072026",
    link: "https://www.skills.google/games/7316?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-july-arcade26",
    month: "July"
  },
  {
    title: "Arcade Simulator: Data Mesh Architect",
    img: "https://cdn.qwiklabs.com/FmH2T828fUAOnuLlIHjzrYPpDescyl%2FLUeVbeHJj%2Ffk%3D",
    code: "1q-datamesh-072026",
    link: "https://www.skills.google/games/7317?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-july-arcade26",
    month: "July"
  },
  {
    title: "Safe Spaces",
    img: "https://cdn.qwiklabs.com/wlgUr4hLSfy8uOE7nNMh8rnzMD%2BXoq72kifWCPTWhtw%3D",
    code: "1q-safespaces-072026",
    link: "https://www.skills.google/games/7318?utm_source=googleskills&utm_medium=lp&utm_campaign=wmpgame-july-arcade26",
    month: "July"
  }
];

const AUGUST_GAMES: GameItem[] = [
  {
    title: "Arcade Base Camp August 2026",
    img: "https://cdn.qwiklabs.com/nXo%2Bc%2FLavbtJXZma1hYLmBxApy6Cr6CZiR1Bnukj5dk%3D",
    code: "1q-basecamp-29401",
    link: "https://www.skills.google/games/7394",
    month: "August"
  },
  {
    title: "Arcade Adventure: Data Vault",
    img: "https://cdn.qwiklabs.com/vQwBzyge8g7JI%2Fs9rWfu%2BvXJurcIOnP0A9wKR7U4i14%3D",
    code: "1q-datavault-30291",
    link: "https://www.skills.google/games/7395",
    month: "August"
  },
  {
    title: "Arcade Voyage: Google Sheets",
    img: "https://cdn.qwiklabs.com/yn3KXIRZy6Md4qAEmKiYk6SEuHg0a7gDEaqc2H4o1Cs%3D",
    code: "1q-sheets-10928",
    link: "https://www.skills.google/games/7398",
    month: "August"
  },
  {
    title: "Arcade Trail: Cloud Delivery Systems",
    img: "https://cdn.qwiklabs.com/fRCfiQc6gVA%2BSEUkSvc7agSfPUGUiHmYaI4kslS9mSw%3D",
    code: "1q-delivery-49102",
    link: "https://www.skills.google/games/7396",
    month: "August"
  },
  {
    title: "Arcade Simulator: Network Security Engineer",
    img: "https://cdn.qwiklabs.com/KU0Jp50XMAj26Vmx1iNYlmxJUltgvVVAa3YI0Xgssjg%3D",
    code: "1q-network-83921",
    link: "https://www.skills.google/games/7397",
    month: "August"
  },
  {
    title: "Spans and Plans",
    img: "https://cdn.qwiklabs.com/jf0VYLPQlpqie%2FRI4cjTeBwtiL3xPto3PBIM5b8iSzI%3D",
    code: "1q-spans-92014",
    link: "https://www.skills.google/games/7399",
    month: "August"
  },
  {
    title: "Arcade Re-Trail",
    img: "https://cdn.qwiklabs.com/eEC4APNIAxpy40bcPc0lLR5bM4amNO3Zl%2Fcw73e%2B7LQ%3D",
    code: "1q-vaults-39213",
    link: "https://www.skills.google/games/7426?utm_source=googleskills&utm_medium=lp&utm_campaign=retrail-Aug-arcade26",
    month: "August"
  }
];

const SEPTEMBER_GAMES: GameItem[] = [
  {
    title: "Arcade Simulator: DevOps Engineer",
    img: "https://services.google.com/fh/files/events/gcaf26_arcade_sim_sep.png",
    code: "1q-devops-065131",
    link: "https://www.skills.google/games/7445?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-Sep-arcade26",
    month: "September"
  },
  {
    title: "Pitch Perfect",
    img: "https://services.google.com/fh/files/events/gcaf26_pitch_perfect_game_sep.png",
    code: "1q-analysis-5026",
    link: "https://www.skills.google/games/7446?utm_source=googleskills&utm_medium=lp&utm_campaign=Special-Sep-arcade26",
    month: "September"
  },
  {
    title: "Arcade Base Camp September 2026",
    img: "https://services.google.com/fh/files/events/gcaf26_basecamp_sep.png",
    code: "1q-basecamp-09304",
    link: "https://www.skills.google/games/7444?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Sep-arcade26",
    month: "September"
  },
  {
    title: "Arcade Adventure September 2026",
    img: "https://services.google.com/fh/files/events/gcaf26_adventure_sep.png",
    code: "1q-architecture-01381",
    link: "https://www.skills.google/games/7441?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-Sep-arcade26",
    month: "September"
  },
  {
    title: "Arcade Voyage September 2026",
    img: "https://services.google.com/fh/files/events/gcaf26_voyage_sep.png",
    code: "1q-microservice-9210",
    link: "https://www.skills.google/games/7442?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Sep-arcade26",
    month: "September"
  },
  {
    title: "Arcade Trail September 2026",
    img: "https://services.google.com/fh/files/events/gcaf26_trail_sep.png",
    code: "1q-vpcpeering-3469",
    link: "https://www.skills.google/games/7443?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Sep-arcade26",
    month: "September"
  }
];

const OCTOBER_GAMES: GameItem[] = [
  {
    title: "Trick-or-Metric",
    img: "https://services.google.com/fh/files/events/gcaf26_trick_or_metric_oct.png",
    code: "1q-spooky-33057",
    link: "https://www.skills.google/games/7488?utm_source=googleskills&utm_medium=lp&utm_campaign=trick-or-metric-Oct-arcade26",
    month: "October"
  },
  {
    title: "Arcade Simulator: Site Reliability Engineer",
    img: "https://services.google.com/fh/files/events/gcaf26_arcade_sim_oct.png",
    code: "1q-reliability-21924",
    link: "https://www.skills.google/games/7485?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-Oct-arcade26",
    month: "October"
  },
  {
    title: "Arcade Base Camp October 2026",
    img: "https://services.google.com/fh/files/events/gcaf26_basecamp_oct.png",
    code: "1q-basecamp-61332",
    link: "https://www.skills.google/games/7484?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Oct-arcade26",
    month: "October"
  },
  {
    title: "Arcade Adventure: Google Cloud ML APIs",
    img: "https://services.google.com/fh/files/events/gcaf26_adventure_oct.png",
    code: "1q-endpoint-01297",
    link: "https://www.skills.google/games/7481?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-Oct-arcade26",
    month: "October"
  },
  {
    title: "Arcade Voyage: Language, Voice, and Multimodal Processing",
    img: "https://services.google.com/fh/files/events/gcaf26_voyage_oct.png",
    code: "1q-synthesis-10713",
    link: "https://www.skills.google/games/7482?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Oct-arcade26",
    month: "October"
  },
  {
    title: "Arcade Trail: Containers & Load Balancing",
    img: "https://services.google.com/fh/files/events/gcaf26_trail_oct.png",
    code: "1q-package-53921",
    link: "https://www.skills.google/games/7483?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Oct-arcade26",
    month: "October"
  }
];

const PAST_GAMES: GameItem[] = [...SEPTEMBER_GAMES, ...AUGUST_GAMES, ...JULY_GAMES];
const ALL_GAMES: GameItem[] = [...OCTOBER_GAMES, ...PAST_GAMES];

const metaMap = new Map<string, { diff: string; credits: number }>();
initialBadges.forEach(b => metaMap.set(b.badgeName.toLowerCase().trim(), { diff: b.difficultyLevel, credits: b.estimatedCredits }));

const ALL_BADGES: BadgeItem[] = catalogSkillBadges.map(b => {
  const meta = metaMap.get(b.name.toLowerCase().trim());
  let level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
  if (meta) {
    if (meta.diff === 'Easy') level = 'Beginner';
    else if (meta.diff === 'Hard' || meta.diff === 'Advanced') level = 'Advanced';
    else level = 'Intermediate';
  } else {
    const n = b.name.toLowerCase();
    if (n.includes('get started') || n.includes('basics') || n.includes('fundamentals') || n.includes('first')) level = 'Beginner';
    else if (n.includes('architecture') || n.includes('deepmind') || n.includes('advanced') || n.includes('expert') || n.includes('mesh')) level = 'Advanced';
  }
  return {
    title: b.name,
    img: b.image && b.image !== 'No Image' ? b.image : 'https://cdn.qwiklabs.com/%2BVrQu7%2Bfm7hBi%2FI8OUUQmDMVS2c4nibG2IN7Q9Vv0rg%3D',
    link: b.link && b.link !== '#' ? b.link : 'https://www.skills.google/course_templates/750',
    level,
    labs: meta ? Math.max(3, meta.credits) : 4,
    credits: meta ? meta.credits : 3
  };
});

const BEGINNER_BADGES = ALL_BADGES.filter(b => b.level === 'Beginner');
const INTERMEDIATE_BADGES = ALL_BADGES.filter(b => b.level === 'Intermediate');
const ADVANCED_BADGES = ALL_BADGES.filter(b => b.level === 'Advanced');

export function SyllabusPage() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [pastMonthTab, setPastMonthTab] = useState<'ALL' | 'SEPTEMBER' | 'AUGUST' | 'JULY'>('ALL');

  const handleCopyCode = (code: string, id: string) => {
    if (code && code !== "Coming Soon!" && code !== "LOCKED") {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  const filteredBadges = useMemo(() => {
    return ALL_BADGES.filter(badge => {
      const matchesSearch = badge.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeTab === 'ALL') return true;
      if (activeTab === 'BEGINNER') return badge.level === 'Beginner';
      if (activeTab === 'INTERMEDIATE') return badge.level === 'Intermediate';
      if (activeTab === 'ADVANCED') return badge.level === 'Advanced';
      return false;
    });
  }, [activeTab, searchQuery]);

  const filteredOctoberGames = useMemo(() => {
    if (activeTab === 'BEGINNER' || activeTab === 'INTERMEDIATE' || activeTab === 'ADVANCED' || activeTab === 'PAST_GAMES') {
      return [];
    }
    return OCTOBER_GAMES.filter(g => {
      const q = searchQuery.toLowerCase();
      return g.title.toLowerCase().includes(q) || g.code.toLowerCase().includes(q) || g.month.toLowerCase().includes(q);
    });
  }, [activeTab, searchQuery]);

  const filteredPastGames = useMemo(() => {
    if (activeTab === 'BEGINNER' || activeTab === 'INTERMEDIATE' || activeTab === 'ADVANCED' || activeTab === 'LIVE_GAMES') {
      return [];
    }
    return PAST_GAMES.filter(g => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = g.title.toLowerCase().includes(q) || g.code.toLowerCase().includes(q) || g.month.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (pastMonthTab === 'ALL') return true;
      if (pastMonthTab === 'SEPTEMBER') return g.month === 'September';
      if (pastMonthTab === 'AUGUST') return g.month === 'August';
      if (pastMonthTab === 'JULY') return g.month === 'July';
      return true;
    });
  }, [activeTab, searchQuery, pastMonthTab]);

  return (
    <div className="syllabus-page-root">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Top 4-Color Stripe */}
      <div className="top-rgby-stripe" aria-hidden="true" />

      {/* Embedded CSS Styling System */}
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

        .syllabus-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftSyllabus 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        @keyframes driftSyllabus {
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

        .syllabus-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .08em;
          font-weight: 700;
          color: var(--mut);
          margin-bottom: 10px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .home-h1 {
          font-size: clamp(32px, 4.8vw, 56px);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 16px;
        }

        .home-h2 {
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 12px;
        }

        .home-sec-sub {
          font-size: 15px;
          line-height: 1.6;
          color: var(--mut);
          max-width: 720px;
        }

        .handwritten {
          font-family: 'Caveat', cursive;
          font-size: 21px;
          color: var(--mut);
          display: inline-block;
          transform: rotate(-1.5deg);
        }

        /* Buttons */
        .btn-cta {
          background: #1A73E8;
          color: #fff !important;
          padding: 12px 24px;
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
          text-decoration: none;
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
          padding: 11px 20px;
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
          text-decoration: none;
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

        /* Bento Grid & Cards */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
        }

        .bento-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 18px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          display: flex;
          flex-direction: column;
        }
        .bento-card:hover {
          transform: translateY(-3px);
          border-color: rgba(66, 133, 244, 0.4);
          box-shadow: 0 16px 36px var(--sh);
        }

        .bento-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .08em;
          font-weight: 700;
          color: var(--mut);
          background: var(--pill);
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid var(--ln);
          width: fit-content;
        }

        /* Filter Tabs */
        .filter-switcher {
          display: inline-flex;
          flex-wrap: wrap;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 999px;
          padding: 4px;
          gap: 4px;
          margin-bottom: 24px;
        }

        .filter-tab-btn {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: .2s;
          color: var(--mut);
          background: transparent;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .filter-tab-btn.active {
          background: var(--b);
          color: #fff;
          box-shadow: 0 4px 14px rgba(26,115,232,.3);
        }

        /* Search Input */
        .search-wrap {
          position: relative;
          max-width: 440px;
          width: 100%;
          margin: 0 auto 36px;
        }
        .search-input {
          width: 100%;
          padding: 12px 18px 12px 44px;
          border-radius: 999px;
          border: 1px solid var(--ln);
          background: var(--card);
          color: var(--ink);
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .search-input:focus {
          border-color: var(--b);
          box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2);
        }

        /* Callout Box */
        .info-callout {
          background: var(--t3);
          border: 1px solid rgba(251, 188, 5, 0.35);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .bento-card { grid-column: span 12 !important; }
        }
      `}</style>

      <div className="syllabus-wrap">

        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '24px', textTransform: 'uppercase' }}>
          <Link to="/" style={{ color: 'var(--b)', textDecoration: 'none' }}>&larr; HOME</Link>
          <span>&middot;</span>
          <span>ACTIVE SYLLABUS &amp; LABS</span>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--b)' }} />
            OFFICIAL ARCADE CURRICULUM
          </div>
          <h1 className="home-h1">
            Active Arcade <span style={{ color: 'var(--b)' }}>Syllabus</span>
          </h1>
          <p className="home-sec-sub" style={{ margin: '0 auto 16px' }}>
            Explore the comprehensive catalog of official Google Cloud hands-on challenges, monthly game quests, and verified skill badges. Every game adds 1.0 point; every 2 skill badges add 1.0 point.
          </p>
          <div style={{ marginBottom: '24px' }}>
            <span className="handwritten">Complete hands-on labs, collect badges &amp; level up your cloud rank 🚀</span>
          </div>

          {/* Quick Stats Strip */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '20px', padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--mut)', boxShadow: '0 8px 24px var(--sh)' }}>
            <div><strong style={{ color: 'var(--ink)' }}>{ALL_BADGES.length}+</strong> Verified Skill Badges</div>
            <div>&bull;</div>
            <div><strong style={{ color: '#10B981' }}>{OCTOBER_GAMES.length}</strong> Live October Quests</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--b)' }}>{PAST_GAMES.length}</strong> Archived Past Games</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--gr)' }}>100% Free</strong> Hands-on Lab Access</div>
          </div>
        </section>

        {/* Program Extension & Strategy Advice Callout */}
        <div className="info-callout" style={{ borderLeft: '4px solid var(--b)', background: 'rgba(66, 133, 244, 0.06)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
            <Calendar style={{ width: '20px', height: '20px', color: '#4285F4' }} />
          </div>
          <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span>Arcade Program Continues Until December 31, 2026!</span>
              <span className="bento-tag" style={{ color: '#10B981', borderColor: '#10B981', fontSize: '11px' }}>October Active Now</span>
            </div>
            <p style={{ margin: '0 0 6px', color: 'var(--mut)' }}>
              Keep building cloud skills and completing labs! Each completed Arcade game adds <strong>+1.0 point</strong> and every 2 valid skill badges add <strong>+1.0 point</strong> directly to your overall Arcade Swag counter. Past points plus current points simply accumulate toward your overall tier rewards.
            </p>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--mut)', opacity: 0.9 }}>
              ⚠️ <em>Notice on Facilitator Program:</em> While the Facilitator cohort milestone bonus evaluation closed on September 14, all game badges and skill badges completed through December count in full towards your Arcade Points! (Unknown badges not in the syllabus are treated as lab-free badges with 0 points).
            </p>
          </div>
        </div>

        {/* GEAR Badges Spotlight */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">
                <span className="dot" style={{ background: 'var(--gr)' }} />
                GOOGLE DEVELOPER PROFILE
              </div>
              <h2 className="home-h2" style={{ margin: 0 }}>
                GEAR Badges &middot; Facilitator 2026
              </h2>
            </div>
            <Link to="/resources/gear-badges" className="btn-ghost btn-press btn-press--secondary">
              GEAR Badge Guide &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--t1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img
                    src="https://developers.google.com/static/profile/badges/community/gear/badge.svg"
                    alt="GEAR Program Enrolment Community Badge"
                    style={{ width: '34px', height: '34px', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <span className="bento-tag" style={{ color: 'var(--b)', borderColor: 'var(--b)' }}>Required</span>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginTop: '4px' }}>
                    Program Enrolment Badge
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.5, margin: 0 }}>
                Earned upon joining the Facilitator cohort. Connect your developer profile to verify eligibility for milestone bonus points.
              </p>
            </div>

            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap style={{ width: '28px', height: '28px', color: 'var(--gr)' }} />
                </div>
                <div>
                  <span className="bento-tag" style={{ color: 'var(--gr)', borderColor: 'var(--gr)' }}>Milestone Proof</span>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginTop: '4px' }}>
                    Cohort Completion Badge
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.5, margin: 0 }}>
                Granted on reaching Milestone 1 or higher before the September 14 deadline. Required for facilitator bonus recognition.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Navigation & Search Bar */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="filter-switcher">
            <button onClick={() => setActiveTab('ALL')} className={`filter-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}>
              All Curriculum ({ALL_GAMES.length + ALL_BADGES.length})
            </button>
            <button onClick={() => setActiveTab('LIVE_GAMES')} className={`filter-tab-btn ${activeTab === 'LIVE_GAMES' ? 'active' : ''}`}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> Live October Games ({OCTOBER_GAMES.length})
            </button>
            <button onClick={() => setActiveTab('BEGINNER')} className={`filter-tab-btn ${activeTab === 'BEGINNER' ? 'active' : ''}`}>
              Beginner Badges ({BEGINNER_BADGES.length})
            </button>
            <button onClick={() => setActiveTab('INTERMEDIATE')} className={`filter-tab-btn ${activeTab === 'INTERMEDIATE' ? 'active' : ''}`}>
              Intermediate Badges ({INTERMEDIATE_BADGES.length})
            </button>
            <button onClick={() => setActiveTab('ADVANCED')} className={`filter-tab-btn ${activeTab === 'ADVANCED' ? 'active' : ''}`}>
              Advanced Badges ({ADVANCED_BADGES.length})
            </button>
            <button onClick={() => setActiveTab('PAST_GAMES')} className={`filter-tab-btn ${activeTab === 'PAST_GAMES' ? 'active' : ''}`}>
              <Gamepad2 style={{ width: '14px', height: '14px' }} /> Past Games ({PAST_GAMES.length})
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-wrap">
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--mut)' }} />
          <input
            type="text"
            placeholder="Search lab titles, topics (Gemini, BigQuery, GKE, SRE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Live October Games Section */}
        {filteredOctoberGames.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="dot" style={{ background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                  <span>CURRENT LIVE QUESTS &middot; OCTOBER 2026</span>
                  <span className="bento-tag" style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.08)', fontSize: '10.5px', padding: '2px 8px' }}>
                    LIVE NOW
                  </span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  October 2026 Live Game Badges
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12.5px', color: '#10B981', fontWeight: 600, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '5px 12px', borderRadius: '999px' }}>
                  Ends October 31, 2026
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--mut)', background: 'var(--card)', padding: '5px 12px', borderRadius: '999px', border: '1px solid var(--ln)' }}>
                  {filteredOctoberGames.length} Quests &middot; <strong>+1.0 Pt Each</strong>
                </span>
              </div>
            </div>

            <div className="bento-grid">
              {filteredOctoberGames.map((game, idx) => (
                <div key={idx} className="bento-card" style={{ gridColumn: 'span 4', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="bento-tag" style={{ color: '#10B981', borderColor: '#10B981', background: 'rgba(16, 185, 129, 0.08)' }}>
                      October Live Quest
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gr)', background: 'var(--t2)', padding: '2px 8px', borderRadius: '6px' }}>
                      +1.0 Arcade Pt
                    </span>
                  </div>

                  <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', background: 'var(--card)', borderRadius: '12px', padding: '10px' }}>
                    <img
                      src={game.img}
                      alt={`${game.title} - Arcade game badge preview`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://cdn.qwiklabs.com/4U2vlpzq9reboYn5uEz23BcGACB2gzE7LYgjWcLnMj4%3D";
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    {game.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--ln)', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--mut)', background: 'var(--bg)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--ln)' }}>
                        <Lock style={{ width: '12px', height: '12px', flexShrink: 0, color: '#10B981' }} />
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ink)' }}>{game.code}</span>
                      </div>
                      {game.code && game.code !== 'LOCKED' && (
                        <button
                          onClick={() => handleCopyCode(game.code, `oct-${idx}`)}
                          className="btn-ghost"
                          style={{ padding: '4px 7px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px', borderRadius: '6px', cursor: 'pointer' }}
                          title="Copy access code"
                        >
                          {copiedCodeId === `oct-${idx}` ? (
                            <>
                              <Check style={{ width: '12px', height: '12px', color: '#10B981' }} />
                              <span style={{ color: '#10B981', fontSize: '10px', fontWeight: 700 }}>Copied</span>
                            </>
                          ) : (
                            <Copy style={{ width: '12px', height: '12px' }} />
                          )}
                        </button>
                      )}
                    </div>

                    <a
                      href={game.link || "https://go.cloudskillsboost.google/arcade"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-press btn-press--secondary"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Play Game <ExternalLink style={{ width: '12px', height: '12px' }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skill Badges Directory */}
        {filteredBadges.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div className="eyebrow">
                  <span className="dot" style={{ background: 'var(--gr)' }} />
                  SKILLS BOOST BADGES
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  Hands-on Skill Badges
                </h3>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--mut)' }}>
                {filteredBadges.length} Courses Found &middot; 0.5 Pts Each
              </span>
            </div>

            <div className="bento-grid">
              {filteredBadges.map((badge, idx) => (
                <div key={idx} className="bento-card" style={{ gridColumn: 'span 4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      className="bento-tag"
                      style={{
                        color: badge.level === 'Beginner' ? 'var(--b)' : badge.level === 'Intermediate' ? 'var(--gr)' : 'var(--r)',
                        borderColor: badge.level === 'Beginner' ? 'var(--b)' : badge.level === 'Intermediate' ? 'var(--gr)' : 'var(--r)'
                      }}
                    >
                      {badge.level}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--y)' }}>
                      0.5 Arcade Pt
                    </span>
                  </div>

                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', background: 'var(--card)', borderRadius: '10px', padding: '6px' }}>
                    <img
                      src={badge.img}
                      alt={badge.title}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)', marginBottom: '14px', lineHeight: 1.4, flexGrow: 1 }}>
                    {badge.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 600, color: 'var(--b)', background: 'var(--t1)', padding: '3px 8px', borderRadius: '6px' }}>
                      <Beaker style={{ width: '13px', height: '13px' }} />
                      {badge.labs} {badge.labs === 1 ? 'Lab' : 'Labs'}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 600, color: badge.credits === 0 ? 'var(--gr)' : 'var(--mut)', background: badge.credits === 0 ? 'var(--t2)' : 'var(--pill)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--ln)' }}>
                      <Coins style={{ width: '13px', height: '13px' }} />
                      {badge.credits === 0 ? '0 Credits (Free)' : `${badge.credits} Credits`}
                    </span>
                  </div>

                  <a
                    href={badge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost btn-press btn-press--secondary"
                    style={{ justifyContent: 'space-between', padding: '10px 14px', fontSize: '12.5px', marginTop: 'auto' }}
                  >
                    <span>Start Skill Badge</span>
                    <ExternalLink style={{ width: '13px', height: '13px', color: 'var(--b)' }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Game Badges Section (July, August, September) */}
        {filteredPastGames.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div className="eyebrow">
                  <span className="dot" style={{ background: 'var(--mut)' }} />
                  PREVIOUS SEASONS ARCHIVE &middot; 2026
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  Past Game Badges (July, August &amp; September)
                </h3>
              </div>

              {/* Month tabs for Past Games */}
              <div style={{ display: 'inline-flex', gap: '6px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '999px', padding: '4px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPastMonthTab('ALL')}
                  className={`filter-tab-btn ${pastMonthTab === 'ALL' ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  All Past ({PAST_GAMES.length})
                </button>
                <button
                  onClick={() => setPastMonthTab('SEPTEMBER')}
                  className={`filter-tab-btn ${pastMonthTab === 'SEPTEMBER' ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  September ({SEPTEMBER_GAMES.length})
                </button>
                <button
                  onClick={() => setPastMonthTab('AUGUST')}
                  className={`filter-tab-btn ${pastMonthTab === 'AUGUST' ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  August ({AUGUST_GAMES.length})
                </button>
                <button
                  onClick={() => setPastMonthTab('JULY')}
                  className={`filter-tab-btn ${pastMonthTab === 'JULY' ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  July ({JULY_GAMES.length})
                </button>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '20px', lineHeight: 1.5, background: 'var(--card)', padding: '14px 20px', borderRadius: '14px', border: '1px solid var(--ln)' }}>
              💡 <strong>Past Game Points Policy:</strong> All completed game badges from July, August, and September still award <strong>+1.0 Arcade Point</strong> each directly into your overall Arcade points counter through December 31, 2026. (While Facilitator cohort milestone bonus evaluations concluded on September 14, these game badges accumulate normally to overall Arcade Points).
            </div>

            <div className="bento-grid">
              {filteredPastGames.map((game, idx) => (
                <div key={idx} className="bento-card" style={{ gridColumn: 'span 4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="bento-tag" style={{ color: 'var(--b)', borderColor: 'var(--b)' }}>
                      {game.month} Quest
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gr)' }}>
                      +1.0 Pt
                    </span>
                  </div>

                  <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', background: 'var(--card)', borderRadius: '12px', padding: '10px' }}>
                    <img
                      src={game.img}
                      alt={`${game.title} - Arcade game badge preview`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://cdn.qwiklabs.com/4U2vlpzq9reboYn5uEz23BcGACB2gzE7LYgjWcLnMj4%3D";
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                    {game.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--ln)', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--mut)', background: 'var(--bg)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--ln)' }}>
                        <Lock style={{ width: '12px', height: '12px', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{game.code}</span>
                      </div>
                      {game.code && game.code !== 'LOCKED' && (
                        <button
                          onClick={() => handleCopyCode(game.code, `past-${game.month}-${idx}`)}
                          className="btn-ghost"
                          style={{ padding: '4px 7px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px', borderRadius: '6px', cursor: 'pointer' }}
                          title="Copy access code"
                        >
                          {copiedCodeId === `past-${game.month}-${idx}` ? (
                            <>
                              <Check style={{ width: '12px', height: '12px', color: '#10B981' }} />
                              <span style={{ color: '#10B981', fontSize: '10px', fontWeight: 700 }}>Copied</span>
                            </>
                          ) : (
                            <Copy style={{ width: '12px', height: '12px' }} />
                          )}
                        </button>
                      )}
                    </div>

                    <a
                      href={game.link || "https://go.cloudskillsboost.google/arcade"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-press btn-press--secondary"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Play Game <ExternalLink style={{ width: '12px', height: '12px' }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredBadges.length === 0 && filteredOctoberGames.length === 0 && filteredPastGames.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '20px', marginBottom: '40px' }}>
            <Search style={{ width: '36px', height: '36px', color: 'var(--mut)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>No labs match your search</h3>
            <p style={{ fontSize: '14px', color: 'var(--mut)', maxWidth: '400px', margin: '0 auto 16px' }}>
              Try searching for a different keyword like "Gemini", "BigQuery", "Storage", or reset your category filters.
            </p>
            <button onClick={() => { setActiveTab('ALL'); setSearchQuery(''); }} className="btn-ghost btn-press btn-press--secondary">
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Toolkits Footer */}
        <section style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '40px 24px', boxShadow: '0 16px 36px var(--sh)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--gr)' }} />
            TRACK YOUR ACHIEVEMENTS
          </div>
          <h2 className="home-h2" style={{ marginBottom: '12px' }}>
            Ready to Tally Your <span style={{ color: 'var(--b)' }}>Arcade Points</span>?
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6 }}>
            Use the automated point calculator to tally completed games, calculate milestone bonuses, and see which swag tier you qualify for.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/calculator" className="btn-cta btn-press btn-press--primary">
              <Calculator style={{ width: '16px', height: '16px' }} />
              Open Point Calculator
            </Link>
            <Link to="/swags" className="btn-ghost btn-press btn-press--secondary">
              View Swag Tiers &rarr;
            </Link>
            <Link to="/resources" className="btn-ghost btn-press btn-press--secondary">
              Explore Resources &rarr;
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
