import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Calendar,
  AlertCircle,
  Award,
  CheckCircle2,
  Info,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Gamepad2,
  FileText,
  Gift,
  Check,
  ChevronRight,
  HelpCircle,
  Layers,
  Send,
  MessageCircle,
  Calculator
} from 'lucide-react';

interface MilestoneData {
  id: number;
  title: string;
  games: number;
  badges: number;
  gamePoints: number;
  badgePoints: number;
  bonusPoints: number;
  totalArcadePoints: number;
  bonusStackTotal: number;
  accent: string;
  tagColor: string;
  note: string;
}

const MILESTONES: MilestoneData[] = [
  {
    id: 1,
    title: "Milestone 1",
    games: 6,
    badges: 18,
    gamePoints: 6,
    badgePoints: 9,
    bonusPoints: 5,
    totalArcadePoints: 15,
    bonusStackTotal: 30,
    accent: "var(--b)",
    tagColor: "var(--t1)",
    note: "On completion of Milestone 1, you become eligible to participate in the Bonus Milestone. Complete it to earn an additional 10 bonus points, bringing your total to 15 + 5 + 10 = 30 points."
  },
  {
    id: 2,
    title: "Milestone 2",
    games: 8,
    badges: 34,
    gamePoints: 8,
    badgePoints: 17,
    bonusPoints: 15,
    totalArcadePoints: 25,
    bonusStackTotal: 50,
    accent: "var(--gr)",
    tagColor: "var(--t2)",
    note: "If you complete the Bonus Milestone alongside Milestone 2, you earn an extra 10 bonus points, bringing your total to 25 + 15 + 10 = 50 points."
  },
  {
    id: 3,
    title: "Milestone 3",
    games: 10,
    badges: 50,
    gamePoints: 10,
    badgePoints: 25,
    bonusPoints: 25,
    totalArcadePoints: 35,
    bonusStackTotal: 70,
    accent: "var(--y)",
    tagColor: "var(--t3)",
    note: "If you complete the Bonus Milestone alongside Milestone 3, you earn an extra 10 bonus points, bringing your total to 35 + 25 + 10 = 70 points."
  },
  {
    id: 4,
    title: "Ultimate Milestone",
    games: 12,
    badges: 66,
    gamePoints: 12,
    badgePoints: 33,
    bonusPoints: 35,
    totalArcadePoints: 45,
    bonusStackTotal: 90,
    accent: "var(--r)",
    tagColor: "var(--t4)",
    note: "If you complete the Bonus Milestone alongside the Ultimate Milestone, you earn an extra 10 bonus points, bringing your total to 45 + 35 + 10 = 90 points."
  }
];

const BONUS_STEPS = [
  {
    step: "01",
    title: "Base Arcade Points",
    desc: "Earned from completing Arcade Games, verified Skill Badges, and special seasonal challenges.",
    color: "var(--b)",
    bg: "var(--t1)"
  },
  {
    step: "02",
    title: "Special Game Adjustment",
    desc: "Special promotional games apply custom point multipliers directly to your base total before bonus calculation.",
    color: "var(--r)",
    bg: "var(--t4)"
  },
  {
    step: "03",
    title: "Milestone Audit",
    desc: "The system audits which cohort milestones you have fully satisfied (Games + Skill Badges completed).",
    color: "var(--y)",
    bg: "var(--t3)"
  },
  {
    step: "04",
    title: "Bonus Points Applied",
    desc: "Bonus points from your single highest completed milestone (plus Bonus Milestone if finished) are added.",
    color: "var(--gr)",
    bg: "var(--t2)"
  },
  {
    step: "05",
    title: "Final Tally for Swags",
    desc: "Base points + Bonus points = your official adjusted Arcade points total ready for the Prize Counter.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.12)"
  }
];

export function FacilitatorPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="facilitator-page-root">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Top 4-Color Stripe */}
      <div className="top-rgby-stripe" aria-hidden="true" />

      {/* Embedded CSS Style System */}
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

        .facilitator-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftFac 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        @keyframes driftFac {
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

        .fac-wrap {
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
          font-size: clamp(32px, 4.8vw, 58px);
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

        .home-sec-head {
          margin-bottom: 32px;
          text-align: left;
        }

        .home-sec-sub {
          font-size: 15px;
          line-height: 1.6;
          color: var(--mut);
          max-width: 680px;
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

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
        }

        .bento-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
          padding: 26px;
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

        .bento-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .bento-p {
          font-size: 14px;
          line-height: 1.6;
          color: var(--mut);
          margin-bottom: 16px;
        }

        /* Timeline Path Cards */
        .path-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .path-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 16px;
          padding: 22px 18px;
          position: relative;
          transition: transform .2s, border-color .2s;
          display: flex;
          flex-direction: column;
        }
        .path-card:hover {
          transform: translateY(-2px);
          border-color: var(--b);
        }

        .path-num {
          font-size: 11px;
          font-weight: 700;
          color: var(--b);
          background: var(--t1);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .path-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .path-card-desc {
          font-size: 13px;
          color: var(--mut);
          line-height: 1.5;
        }

        /* Alert Callout */
        .status-alert-box {
          background: var(--t4);
          border: 1px solid rgba(234, 67, 53, 0.3);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
          color: var(--ink);
        }

        /* Info Callout */
        .info-callout {
          background: var(--t3);
          border: 1px solid rgba(251, 188, 5, 0.35);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-top: 24px;
        }

        /* Milestone Table */
        .milestone-table {
          width: 100%;
          border-collapse: collapse;
          margin: 14px 0;
          font-size: 13px;
        }
        .milestone-table td {
          padding: 8px 0;
          border-bottom: 1px solid var(--ln);
        }
        .milestone-table td:last-child {
          text-align: right;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card { grid-column: span 12 !important; }
          .path-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .path-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="fac-wrap">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '24px', textTransform: 'uppercase' }}>
          <Link to="/" style={{ color: 'var(--b)', textDecoration: 'none' }}>&larr; HOME</Link>
          <span>&middot;</span>
          <span>FACILITATOR PROGRAM '26</span>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'left', marginBottom: '48px' }}>
          <div className="eyebrow">
            <span className="dot" style={{ background: 'var(--b)' }} />
            GOOGLE CLOUD ARCADE 2026
          </div>
          <h1 className="home-h1">
            Facilitator Program <span style={{ color: 'var(--b)' }}>'26</span>
          </h1>
          <p style={{ maxWidth: '820px', fontSize: '16px', lineHeight: 1.65, color: 'var(--mut)', marginBottom: '16px' }}>
            The Arcade Facilitator Program is an official no-cost learning initiative where technical practitioners of all skill levels learn cloud engineering, deploy real AI agents, build serverless applications, and analyze BigQuery datasets while accumulating <strong style={{ color: 'var(--ink)' }}>Arcade + Bonus Points</strong> towards exclusive Google Cloud merchandise and benefits.
          </p>
          <div style={{ marginBottom: '24px' }}>
            <span className="handwritten">Learn hands-on skills, earn verifiable badges &amp; claim swags 🌟</span>
          </div>

          {/* Registration Closed Notice Banner */}
          <div className="status-alert-box">
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(234, 67, 53, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertCircle style={{ width: '20px', height: '20px', color: 'var(--r)' }} />
            </div>
            <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--r)', display: 'block', marginBottom: '2px' }}>
                Program Registrations Officially Closed
              </strong>
              <span>
                All facilitator cohort seats are now filled. Registered participants have until <strong style={{ color: 'var(--ink)' }}>September 14, 2026 (11:59 PM GMT+5:30)</strong> to complete their games, skill badges, and milestones.
              </span>
            </div>
          </div>

          {/* Key Program Timeline Dates */}
          <div className="path-grid" style={{ marginBottom: '32px' }}>
            <div className="path-card">
              <div className="path-num">01</div>
              <div className="path-card-title">July 13, 2026</div>
              <div className="path-card-desc">
                <strong>05:00 PM GMT+5:30</strong> &middot; Program timeline and registration form officially opened for all learners.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t2)', color: 'var(--gr)' }}>02</div>
              <div className="path-card-title">July 20, 2026</div>
              <div className="path-card-desc">
                <strong>11:59 PM GMT+5:30</strong> &middot; Enrolment deadline reached and registration closed as all capacity filled.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t3)', color: 'var(--y)' }}>03</div>
              <div className="path-card-title">24–48 Hours</div>
              <div className="path-card-desc">
                Enrolled participants received email passes with instructions to activate their <strong>100% Free Credits Pass</strong>.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t4)', color: 'var(--r)' }}>04</div>
              <div className="path-card-title">Sept 14, 2026</div>
              <div className="path-card-desc">
                <strong>11:59 PM GMT+5:30</strong> &middot; Facilitator cohort deadline to complete milestones and earn bonus points.
              </div>
            </div>
          </div>

          {/* Google Cloud Progress Bar Decorative Image */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--ln)', background: 'var(--card)' }}>
            <img
              src="https://services.google.com/fh/files/events/cf_site_progress_bar.png"
              alt="Google Cloud Brand Colors Decorative Border"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* Section 2: Why Enrol in the Program? */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--gr)' }} />
              OUTCOMES &amp; VALUE
            </div>
            <h2 className="home-h2">
              Why Enrol in the <span style={{ color: 'var(--gr)' }}>Facilitator Program</span>?
            </h2>
            <p className="home-sec-sub">
              By participating in this structured cohort, you achieve two major milestones: professional credentials and exclusive Google Cloud physical swag rewards.
            </p>
          </div>

          <div className="bento-grid">
            
            {/* Card 1: Google Cloud Digital Badges */}
            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--t1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award style={{ width: '20px', height: '20px', color: 'var(--b)' }} />
                </div>
                <div>
                  <span className="bento-tag" style={{ color: 'var(--b)', borderColor: 'var(--b)' }}>Credentials</span>
                  <div className="bento-title" style={{ marginTop: '4px' }}>1. Verifiable Digital Badges</div>
                </div>
              </div>
              <p className="bento-p">
                Showcase your hands-on cloud skills to your professional network. Google Cloud-hosted digital badges verify your mastery and can be pinned to your resume, portfolio, and LinkedIn profile. 🏆
              </p>

              {/* Badges Image Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf26_game_badge.png"
                    alt="Google Cloud Arcade Game Badge Example"
                    style={{ width: '100%', height: '80px', objectFit: 'contain', margin: '0 auto 6px' }}
                  />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink)' }}>Arcade Game</div>
                  <div style={{ fontSize: '10px', color: 'var(--mut)' }}>1.0 Point</div>
                </div>

                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf_site_skill_badge_image.png"
                    alt="Google Cloud Skill Badge Example"
                    style={{ width: '100%', height: '80px', objectFit: 'contain', margin: '0 auto 6px' }}
                  />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink)' }}>Skill Badge</div>
                  <div style={{ fontSize: '10px', color: 'var(--mut)' }}>0.5 Points</div>
                </div>

                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf26_bc_game_badge.png"
                    alt="Google Cloud Base Camp Challenge Badge Example"
                    style={{ width: '100%', height: '80px', objectFit: 'contain', margin: '0 auto 6px' }}
                  />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink)' }}>Base Camp</div>
                  <div style={{ fontSize: '10px', color: 'var(--mut)' }}>1.0 Point</div>
                </div>
              </div>
            </div>

            {/* Card 2: Exclusive Swags & Goodies */}
            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift style={{ width: '20px', height: '20px', color: 'var(--gr)' }} />
                </div>
                <div>
                  <span className="bento-tag" style={{ color: 'var(--gr)', borderColor: 'var(--gr)' }}>Rewards</span>
                  <div className="bento-title" style={{ marginTop: '4px' }}>2. Arcade + Bonus Points for Goodies</div>
                </div>
              </div>
              <p className="bento-p">
                Accumulate Arcade + Bonus Points by finishing games, skill badges, and cohort milestones. Redeem your points for exclusive Google Cloud gear when the Prize Counter opens in early 2027! 💪
              </p>

              {/* Swag Preview Images */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', overflow: 'hidden' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf26_prizes_image4.png"
                    alt="Google Cloud Arcade Swag Bundle A Preview"
                    style={{ width: '100%', height: '90px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '6px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: 'var(--mut)' }}>Bundle Preview A</div>
                </div>

                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', overflow: 'hidden' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf26_prizes_image5.png"
                    alt="Google Cloud Arcade Swag Bundle B Preview"
                    style={{ width: '100%', height: '90px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '6px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: 'var(--mut)' }}>Bundle Preview B</div>
                </div>

                <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '14px', overflow: 'hidden' }}>
                  <img
                    src="https://services.google.com/fh/files/misc/gcaf26_prizes_image6.png"
                    alt="Google Cloud Arcade Swag Bundle C Preview"
                    style={{ width: '100%', height: '90px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '6px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: 'var(--mut)' }}>Bundle Preview C</div>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '11px', fontStyle: 'italic', color: 'var(--mut)' }}>
                *Actual swag bundle contents and items may vary based on regional fulfillment availability.
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Points System (Anchor: points-system) */}
        <section id="points-system" style={{ marginBottom: '64px', scrollMarginTop: '100px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--y)' }} />
              CONVERSION FORMULA
            </div>
            <h2 className="home-h2">
              Facilitator <span style={{ color: 'var(--y)' }}>Points System</span>
            </h2>
            <p className="home-sec-sub">
              For every game, skill badge, and cohort milestone completed, you earn "Arcade + Bonus Points" that directly count towards prize counter redemptions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
            
            {/* Left Column: Rules Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="bento-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--t1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gamepad2 style={{ width: '18px', height: '18px', color: 'var(--b)' }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>Arcade Game Badges</div>
                </div>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5 }}>
                  For each completed <strong>"Game"</strong> badge, you receive <strong>1.0 Arcade Point</strong>. <br />
                  <span style={{ fontSize: '12px', opacity: 0.85 }}>Example: 2 completed game badges = 2.0 Arcade points.</span>
                </p>
              </div>

              <div className="bento-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award style={{ width: '18px', height: '18px', color: 'var(--gr)' }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>Google Cloud Skill Badges</div>
                </div>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5 }}>
                  For every <strong>2 "Skill Badge"</strong> completions, you receive <strong>1.0 Arcade Point</strong> (0.5 Pts per badge). <br />
                  <span style={{ fontSize: '12px', opacity: 0.85 }}>Example: 4 skill badges = 2.0 Arcade points.</span>
                </p>
              </div>

              <div className="bento-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--t3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles style={{ width: '18px', height: '18px', color: 'var(--y)' }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>Cohort Milestones</div>
                </div>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5 }}>
                  Completing cohort milestones awards <strong>Bonus Arcade Points</strong> (up to 35+ bonus points). You receive bonus points for your highest milestone attained.
                </p>
              </div>

              <div style={{ paddingTop: '8px' }}>
                <Link to="/calculator" className="btn-cta btn-press btn-press--primary" style={{ width: 'fit-content' }}>
                  <Calculator style={{ width: '16px', height: '16px' }} />
                  Open Point Calculator
                </Link>
              </div>
            </div>

            {/* Right Column: Points Diagram Image */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '20px', padding: '16px', boxShadow: '0 16px 36px var(--sh)' }}>
              <img
                src="https://services.google.com/fh/files/misc/gcaf26-points-system.png"
                alt="Official Google Cloud Facilitator Points System Conversion Diagram"
                style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
              />
              <div style={{ padding: '12px 6px 4px', fontSize: '12px', color: 'var(--mut)', textAlign: 'center' }}>
                Official Google Cloud Facilitator Points Conversion Guide
              </div>
            </div>

          </div>

          {/* Important Points Guidance Box */}
          <div className="info-callout">
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(251, 188, 5, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <Info style={{ width: '20px', height: '20px', color: '#F59E0B' }} />
            </div>
            <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontSize: '15px' }}>
                Important Program Note (Please Read Before Reviewing Milestones)
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--mut)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  Earning cohort milestones provides <strong>Bonus Points</strong> to accumulate and add to your base <strong>Arcade Points</strong>. Reaching a milestone is not the swag itself — your total accumulated points are what you redeem at the official Arcade Prize Counter.
                </li>
                <li>
                  Prize counter merchandise tiers have <strong>limited spots</strong>. We strongly recommend completing your milestones as early as possible so that your total score qualifies you for your preferred swag tier when the counter opens.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: How Bonus Works (5 Steps) */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--b)' }} />
              STEP-BY-STEP AUDIT
            </div>
            <h2 className="home-h2">
              How <span style={{ color: 'var(--b)' }}>Bonus Calculation</span> Works
            </h2>
            <p className="home-sec-sub">
              Your points are calculated in five predictable stages to ensure fairness, transparency, and accuracy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {BONUS_STEPS.map((s) => (
              <div
                key={s.step}
                className="path-card"
                style={{ padding: '20px' }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: s.bg,
                    color: s.color,
                    fontWeight: 700,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: s.color, marginBottom: '6px' }}>
                  {s.title}
                </div>
                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--mut)', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Program Milestones & Bonuses (Anchor: milestones) */}
        <section id="milestones" style={{ marginBottom: '64px', scrollMarginTop: '100px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--r)' }} />
              COHORT TARGETS
            </div>
            <h2 className="home-h2">
              Program <span style={{ color: 'var(--r)' }}>Milestones</span> &amp; Bonuses
            </h2>
            <p className="home-sec-sub">
              Review the required games and skill badges for each official milestone, along with their bonus point yields.
            </p>
          </div>

          {/* Bonus Milestone Live Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(66, 133, 244, 0.08))',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: '20px',
              padding: '24px 28px',
              marginBottom: '32px',
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'rgba(124, 58, 237, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Award style={{ width: '28px', height: '28px', color: '#a855f7' }} />
            </div>

            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>
                  Introducing the Bonus Milestone 🏆
                </span>
                <span
                  style={{
                    background: 'rgba(52, 168, 83, 0.2)',
                    color: 'var(--gr)',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase'
                  }}
                >
                  Live Now
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--mut)', lineHeight: 1.5 }}>
                The Bonus Milestone is now live! Complete it to earn an extra <strong style={{ color: '#a855f7' }}>10 Bonus Points</strong> and build your first AI agent with Google Cloud.
              </p>
            </div>

            <div style={{ flexShrink: 0 }}>
              <Link
                to="/resources/bonus-milestone"
                className="btn-cta btn-press"
                style={{ background: '#7c3aed', color: '#ffffff', padding: '10px 20px', fontSize: '13px' }}
              >
                View Bonus Milestone Details &rarr;
              </Link>
            </div>
          </div>

          {/* 4 Milestones Bento Grid */}
          <div className="bento-grid">
            {MILESTONES.map((m) => (
              <div
                key={m.id}
                className="bento-card"
                style={{ gridColumn: 'span 6' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: m.tagColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award style={{ width: '20px', height: '20px', color: m.accent }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>
                        🏆 {m.title}
                      </div>
                      <div style={{ fontSize: '11px', color: m.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                        +{m.bonusPoints} Bonus Points
                      </div>
                    </div>
                  </div>

                  <span className="bento-tag" style={{ color: m.accent, borderColor: m.accent }}>
                    Level {m.id}
                  </span>
                </div>

                {/* Requirements Checklist */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px', padding: '10px 14px', background: 'var(--pill)', borderRadius: '12px', border: '1px solid var(--ln)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--gr)' }} />
                    <span>ANY {m.games} Games</span>
                  </div>
                  <span style={{ color: 'var(--ln)' }}>&bull;</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--gr)' }} />
                    <span>ANY {m.badges} Skill Badges</span>
                  </div>
                </div>

                {/* Points Table Breakdown */}
                <table className="milestone-table">
                  <tbody>
                    <tr>
                      <td style={{ color: 'var(--mut)' }}>{m.games} Arcade Games</td>
                      <td style={{ color: 'var(--ink)' }}>{m.gamePoints} Pts</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--mut)' }}>{m.badges} Skill Badges (0.5 ea)</td>
                      <td style={{ color: 'var(--ink)' }}>{m.badgePoints} Pts</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--mut)' }}>Milestone Bonus Yield</td>
                      <td style={{ color: m.accent }}>+{m.bonusPoints} Bonus Pts</td>
                    </tr>
                    <tr style={{ borderBottom: 'none' }}>
                      <td style={{ fontWeight: 700, color: 'var(--ink)', paddingTop: '10px' }}>
                        Total Arcade + Bonus:
                      </td>
                      <td style={{ fontWeight: 700, color: m.accent, fontSize: '15px', paddingTop: '10px' }}>
                        {m.totalArcadePoints + m.bonusPoints} Points
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Bonus Milestone Stacking Note */}
                <div style={{ background: 'var(--t1)', border: '1px solid rgba(66, 133, 244, 0.25)', borderRadius: '12px', padding: '12px', fontSize: '12px', lineHeight: 1.5, color: 'var(--ink)', marginTop: 'auto' }}>
                  <div style={{ fontWeight: 700, color: 'var(--b)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles style={{ width: '13px', height: '13px' }} />
                    Bonus Milestone Stacking:
                  </div>
                  <span>{m.note}</span>
                </div>

                <div style={{ marginTop: '10px', fontSize: '10.5px', color: 'var(--mut)', fontStyle: 'italic' }}>
                  *You receive bonus points only for the highest milestone achieved.
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Next Steps Quick Navigation Footer */}
        <section style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '40px 24px', boxShadow: '0 16px 36px var(--sh)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--gr)' }} />
            READY TO LEVEL UP?
          </div>
          <h2 className="home-h2" style={{ marginBottom: '12px' }}>
            Explore Our <span style={{ color: 'var(--b)' }}>Arcade Toolkits</span>
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6 }}>
            Calculate your exact points tally, review the full active syllabus of labs, check remaining tier slots, and join our active Telegram &amp; WhatsApp study groups.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/calculator" className="btn-cta btn-press btn-press--primary">
              <Calculator style={{ width: '16px', height: '16px' }} />
              Open Calculator
            </Link>
            <Link to="/syllabus" className="btn-ghost btn-press btn-press--secondary">
              Explore Active Syllabus &rarr;
            </Link>
            <Link to="/swags" className="btn-ghost btn-press btn-press--secondary">
              Swag Tier Guide &rarr;
            </Link>
            <Link to="/faq" className="btn-ghost btn-press btn-press--secondary">
              Facilitator FAQ &rarr;
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
