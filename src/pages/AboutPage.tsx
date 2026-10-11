import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldAlert,
  Cloud,
  Code,
  FileText,
  Gift,
  Award,
  Zap,
  Terminal,
  Database,
  Gamepad2,
  Linkedin,
  Github,
  Instagram,
  Globe,
  Youtube,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Check,
  Sparkles,
  Heart
} from 'lucide-react';
import developerImage from '../assets/images/regenerated_image_1782030896719.jpg';

interface FacilitatorProfile {
  id: number;
  role: string;
  name: string;
  badge: string;
  bio: string[];
  image: string;
  tag: string;
  accent: string;
  links: { title: string; sub: string; href: string; icon: string }[];
}

const FACILITATORS: FacilitatorProfile[] = [
  {
    id: 1,
    role: "Lead Developer & Creator",
    name: "Abir Dey",
    badge: "Architect & Maintainer",
    accent: "var(--b)",
    bio: [
      "I am an independent web developer, tech explorer, and passionate Google Cloud enthusiast. Everything on the Arcade Buddy platform is designed, engineered, and maintained by me to give our global community the cleanest learning experience possible.",
      "I actively build developer tools and study platforms for the Google Cloud Arcade community, helping learners understand lab architectures, track milestone progress, and navigate tricky cloud setups without getting stuck.",
      "I'm also the creator behind Arcade With Us (a dedicated learning hub that provides comprehensive study guides, console walk-throughs, and step-by-step guidance for students and facilitators)."
    ],
    image: developerImage,
    tag: "Meet The Lead Developer",
    links: [
      { title: "LinkedIn", sub: "Abir Dey", href: "https://www.linkedin.com/in/abir-dey-a34914254/", icon: "linkedin" },
      { title: "GitHub", sub: "@Arcade-With-Us", href: "https://github.com/Arcade-With-Us/", icon: "github" },
      { title: "Portfolio", sub: "abirdey.netlify.app", href: "https://abirdey.netlify.app/", icon: "globe" },
      { title: "Instagram", sub: "@dey_babai001", href: "https://www.instagram.com/dey_babai001/", icon: "instagram" },
    ]
  },
  {
    id: 2,
    role: "Co-Facilitator & Content Creator",
    name: "Tripti Gupta",
    badge: "Community Educator",
    accent: "var(--r)",
    bio: [
      "Hello everyone! My name is Tripti Gupta. I'm a final-year B.Tech student in Electronics and Communication Engineering at Dr. B. C. Roy Engineering College.",
      "I am thrilled to be your co-facilitator and partner alongside Abir Dey in our 2026 Arcade Facilitator journey. I focus on creating helpful video breakdowns, step-by-step lab walk-throughs, and active community mentoring.",
      "Our mission is to ensure every participant, regardless of their prior cloud experience, feels supported and equipped to earn their skill badges, milestone bonuses, and official Google Cloud swag."
    ],
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782142565/WhatsApp_Image_2026-06-22_at_20.40.39_zllhbo.jpg",
    tag: "Meet The Co-Facilitator",
    links: [
      { title: "YouTube", sub: "@ARCADEWITHUS_We", href: "https://www.youtube.com/@ARCADEWITHUS_We", icon: "youtube" },
      { title: "LinkedIn", sub: "Tripti Gupta", href: "https://www.linkedin.com/in/tripti-gupta-a28a6832b", icon: "linkedin" },
      { title: "Instagram", sub: "@studywith_tripti", href: "https://www.instagram.com/_.studywith_tripti._?igsh=MW4xZ3U1NTYzdnplcQ==", icon: "instagram" },
    ]
  }
];

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeFacilitator = FACILITATORS[activeTab];
  const avatarWrapRef = useRef<HTMLDivElement>(null);

  const handleFacilitatorMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = avatarWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.hypot(dx, dy);

    // Activates when cursor moves near to the facilitator image card (within 480px radius)
    const maxRadius = 480;
    const proximity = Math.max(0, Math.min(1, 1 - dist / maxRadius));

    // Magnetic spot position: smoothly moves towards cursor while bound within the glowing perimeter
    const angle = Math.atan2(dy, dx);
    const spotDist = Math.min(dist * 0.45, 95);
    const spotX = rect.width / 2 + Math.cos(angle) * spotDist;
    const spotY = rect.height / 2 + Math.sin(angle) * spotDist;

    wrap.style.setProperty('--proximity', proximity.toFixed(3));
    wrap.style.setProperty('--glow-x', `${spotX.toFixed(1)}px`);
    wrap.style.setProperty('--glow-y', `${spotY.toFixed(1)}px`);
  };

  const handleFacilitatorMouseLeave = () => {
    const wrap = avatarWrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty('--proximity', '0');
    wrap.style.setProperty('--glow-x', '102px');
    wrap.style.setProperty('--glow-y', '102px');
  };

  const renderSocialIcon = (icon: string) => {
    const cls = "w-4 h-4";
    switch (icon) {
      case 'linkedin': return <Linkedin className={`${cls} text-[#0077b5]`} />;
      case 'github': return <Github className={`${cls} text-slate-900 dark:text-white`} />;
      case 'instagram': return <Instagram className={`${cls} text-[#e1306c]`} />;
      case 'youtube': return <Youtube className={`${cls} text-[#ff0000]`} />;
      case 'globe': return <Globe className={`${cls} text-emerald-500`} />;
      default: return <ExternalLink className={`${cls} text-slate-400`} />;
    }
  };

  return (
    <div className="about-page-root">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Top 4-Color Stripe */}
      <div className="top-rgby-stripe" aria-hidden="true" />

      {/* Embedded Design System Styles */}
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

        .about-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftAbout 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        @keyframes driftAbout {
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

        .about-wrap {
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

        .bento-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
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
        }

        .bento-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          flex-shrink: 0;
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
          flex-grow: 1;
        }

        .bento-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--ln);
          font-size: 12px;
          color: var(--mut);
        }

        /* 4-Step Roadmap Path Grid */
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

        /* Facilitator Showcase Tabs */
        .fac-switcher {
          display: inline-flex;
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 999px;
          padding: 4px;
          gap: 4px;
          margin-bottom: 24px;
        }
        .fac-tab-btn {
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: .2s;
          color: var(--mut);
          background: transparent;
        }
        .fac-tab-btn.active {
          background: var(--b);
          color: #fff;
          box-shadow: 0 4px 14px rgba(26,115,232,.3);
        }

        .fac-card-main {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 24px;
          padding: 36px;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 36px;
          align-items: start;
        }

        .fac-avatar-wrap {
          position: relative;
          width: 204px;
          height: 204px;
          margin: 0 auto;
          cursor: pointer;
          border-radius: 50%;
          --glow-x: 102px;
          --glow-y: 102px;
          --proximity: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fac-avatar-wrap:hover {
          transform: scale(1.02);
        }

        /* 1. Large ambient soft aura circle */
        .fac-circle-glow-outer {
          position: absolute;
          inset: -44px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow, rgba(66, 133, 244, 0.35)) 0%, rgba(66, 133, 244, 0.12) 45%, transparent 72%);
          filter: blur(24px);
          opacity: calc(0.35 + var(--proximity, 0) * 0.65);
          transform: scale(calc(0.94 + var(--proximity, 0) * 0.14));
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
          animation: facPulseCircle 4s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        /* 2. Outer smooth concentric glowing ring */
        .fac-circle-glow-ring1 {
          position: absolute;
          inset: -28px;
          border-radius: 50%;
          border: 1.5px solid var(--accent-ring, rgba(66, 133, 244, 0.45));
          box-shadow: 0 0 28px var(--accent-glow, rgba(66, 133, 244, 0.38)), inset 0 0 16px var(--accent-glow, rgba(66, 133, 244, 0.18));
          opacity: calc(0.3 + var(--proximity, 0) * 0.7);
          transform: scale(calc(0.96 + var(--proximity, 0) * 0.08));
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        /* 3. Middle smooth concentric glowing ring */
        .fac-circle-glow-ring2 {
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          border: 1.5px solid var(--accent-ring-inner, rgba(66, 133, 244, 0.65));
          box-shadow: 0 0 20px var(--accent-glow-spot, rgba(66, 133, 244, 0.55)), inset 0 0 10px var(--accent-glow-spot, rgba(66, 133, 244, 0.25));
          opacity: calc(0.45 + var(--proximity, 0) * 0.55);
          transform: scale(calc(0.98 + var(--proximity, 0) * 0.05));
          transition: transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease;
          pointer-events: none;
          z-index: 0;
        }

        /* 4. Delicate inner glowing circle ring */
        .fac-circle-glow-ring3 {
          position: absolute;
          inset: -7px;
          border-radius: 50%;
          border: 1px solid var(--accent-ring-inner, rgba(66, 133, 244, 0.8));
          box-shadow: 0 0 14px var(--accent-glow-spot, rgba(66, 133, 244, 0.6));
          opacity: calc(0.5 + var(--proximity, 0) * 0.5);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
          z-index: 0;
        }

        /* 5. Expanding ripple wave on cursor proximity */
        .fac-circle-glow-ripple {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px dashed var(--accent-ring, rgba(66, 133, 244, 0.5));
          opacity: calc(var(--proximity, 0) * 0.6);
          animation: facRippleExpand 3s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* 6. Dynamic cursor-following glowing spot orb */
        .fac-circle-glow-spot {
          position: absolute;
          width: 140px;
          height: 140px;
          left: var(--glow-x, 102px);
          top: var(--glow-y, 102px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow-spot, rgba(66, 133, 244, 0.8)) 0%, rgba(66, 133, 244, 0.25) 45%, transparent 70%);
          filter: blur(14px);
          opacity: calc(0.3 + var(--proximity, 0) * 0.7);
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .fac-avatar-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--card);
          box-shadow: 0 8px 24px var(--sh), 0 0 calc(var(--proximity, 0) * 28px) var(--accent-glow, rgba(66, 133, 244, 0.4));
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
        }

        .fac-avatar-wrap:hover .fac-avatar-img {
          transform: scale(1.03);
          box-shadow: 0 12px 32px var(--sh), 0 0 34px var(--accent-glow, rgba(66, 133, 244, 0.55));
        }

        @keyframes facPulseCircle {
          0% { transform: scale(0.94); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.85; }
          100% { transform: scale(0.94); opacity: 0.4; }
        }

        @keyframes facRippleExpand {
          0% { transform: scale(0.92); opacity: 0.7; }
          100% { transform: scale(1.28); opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card { grid-column: span 12 !important; }
          .path-grid { grid-template-columns: repeat(2, 1fr); }
          .fac-card-main { grid-template-columns: 1fr; text-align: center; }
          .fac-avatar-wrap { margin-bottom: 12px; }
        }
        @media (max-width: 600px) {
          .path-grid { grid-template-columns: 1fr; }
          .fac-card-main { padding: 24px; }
        }
      `}</style>

      <div className="about-wrap">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '24px', textTransform: 'uppercase' }}>
          <Link to="/" style={{ color: 'var(--b)', textDecoration: 'none' }}>&larr; HOME</Link>
          <span>&middot;</span>
          <span>ABOUT PLATFORM &amp; FACILITATOR</span>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--b)' }} />
            GOOGLE CLOUD ARCADE BUDDY
          </div>
          <h1 className="home-h1">
            Empowering Cloud Learners <span style={{ color: 'var(--b)' }}>Worldwide</span>
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto 20px', fontSize: '16px', lineHeight: 1.6, color: 'var(--mut)' }}>
            Google Cloud Arcade Buddy is a modern, community-driven platform built by learners, for learners. We provide clear point calculators, curated syllabus roadmaps, and real-time guidance to help you master hands-on Google Cloud technologies and claim official Arcade rewards.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <span className="handwritten">Built with heart for the Google Cloud community 🚀</span>
          </div>

          {/* Animated Header Loop Banner */}
          <div style={{ maxWidth: '820px', margin: '0 auto 36px', background: 'transparent', border: 'none', boxShadow: 'none', padding: '12px' }}>
            <img
              src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1785227440/arcade_buddy_loop_usjvw7.svg"
              alt="Google Cloud Arcade Buddy Community Loop Illustration"
              style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
            />
          </div>
        </section>

        {/* Important Official Disclaimer Notice */}
        <div className="info-callout">
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(251, 188, 5, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
            <ShieldAlert style={{ width: '20px', height: '20px', color: '#F59E0B' }} />
          </div>
          <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontSize: '15px' }}>
              Important Note &amp; Official Program Scope
            </div>
            <p style={{ color: 'var(--mut)', margin: 0 }}>
              Although this portal provides comprehensive resources and guides for The Arcade, please note that <strong>Google Cloud Arcade Buddy</strong> is an independent, community-built tool and is not officially affiliated with or endorsed by Google LLC. For official Google Cloud Skills Boost program queries and direct account support, please reach out to Google Skills support directly at{' '}
              <a href="mailto:support-skills@google.com" style={{ color: 'var(--b)', fontWeight: 600, textDecoration: 'underline' }}>
                support-skills@google.com
              </a>.
            </p>
          </div>
        </div>

        {/* Section 1: How Arcade Works */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--gr)' }} />
              PROGRAM ARCHITECTURE
            </div>
            <h2 className="home-h2">
              How The <span style={{ color: 'var(--b)' }}>Arcade Works</span>
            </h2>
            <p className="home-sec-sub">
              Google Cloud Arcade turns cloud learning into an interactive quest with measurable milestones, skill badges, and physical swag deliverables.
            </p>
          </div>

          <div className="bento-grid">
            <div className="bento-card" style={{ gridColumn: 'span 3' }}>
              <div className="bento-top">
                <span className="bento-tag">Engaging Quests</span>
              </div>
              <div className="bento-icon-box" style={{ background: 'var(--t1)', color: 'var(--b)' }}>
                <Gamepad2 style={{ width: '22px', height: '22px' }} />
              </div>
              <div className="bento-title">Gamified Learning</div>
              <p className="bento-p">
                Structured challenges, trivia quizzes, and interactive scenarios make acquiring cloud architecture expertise genuinely fun and rewarding.
              </p>
              <div className="bento-foot">
                <span>Interactive Labs</span>
                <span style={{ color: 'var(--b)', fontWeight: 600 }}>1 Pt / Game</span>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 3' }}>
              <div className="bento-top">
                <span className="bento-tag">Continuous Drops</span>
              </div>
              <div className="bento-icon-box" style={{ background: 'var(--t2)', color: 'var(--gr)' }}>
                <FileText style={{ width: '22px', height: '22px' }} />
              </div>
              <div className="bento-title">Monthly Challenges</div>
              <p className="bento-p">
                Fresh games, seasonal speed runs, and specialized challenge labs drop on the 1st and 15th of every month across all cloud tracks.
              </p>
              <div className="bento-foot">
                <span>Regular Updates</span>
                <span style={{ color: 'var(--gr)', fontWeight: 600 }}>Active Cohorts</span>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 3' }}>
              <div className="bento-top">
                <span className="bento-tag">Console Practice</span>
              </div>
              <div className="bento-icon-box" style={{ background: 'var(--t3)', color: 'var(--y)' }}>
                <Terminal style={{ width: '22px', height: '22px' }} />
              </div>
              <div className="bento-title">Hands-on Labs</div>
              <p className="bento-p">
                Real-world Google Cloud environments without consuming personal credits. Build actual deployments and earn verifiable digital badges.
              </p>
              <div className="bento-foot">
                <span>0.5 Pt / Badge</span>
                <span style={{ color: 'var(--y)', fontWeight: 600 }}>Skills Boost</span>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 3' }}>
              <div className="bento-top">
                <span className="bento-tag">Zero Barriers</span>
              </div>
              <div className="bento-icon-box" style={{ background: 'var(--t4)', color: 'var(--r)' }}>
                <Gift style={{ width: '22px', height: '22px' }} />
              </div>
              <div className="bento-title">Completely Free</div>
              <p className="bento-p">
                Free passes and lab credits are made available so that developers, students, and engineers of any background can participate with zero friction.
              </p>
              <div className="bento-foot">
                <span>No Credit Card</span>
                <span style={{ color: 'var(--r)', fontWeight: 600 }}>100% Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Skills You Will Build */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--b)' }} />
              TECHNICAL COMPETENCIES
            </div>
            <h2 className="home-h2">
              Skills You Will <span style={{ color: 'var(--gr)' }}>Build</span>
            </h2>
            <p className="home-sec-sub">
              Hands-on mastery across modern cloud disciplines required by top technology companies.
            </p>
          </div>

          <div className="bento-grid">
            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div className="bento-top">
                <span className="bento-tag" style={{ color: 'var(--b)', borderColor: 'var(--b)' }}>Frontier AI</span>
                <Sparkles style={{ width: '18px', height: '18px', color: 'var(--b)' }} />
              </div>
              <div className="bento-title">Generative AI &amp; Multimodal Agents</div>
              <p className="bento-p">
                Deploy Gemini Pro, Vertex AI Studio workflows, embeddings, function calling, and vector retrieval pipelines. Practice multimodal prompt engineering and fine-tuning on enterprise datasets.
              </p>
              <div className="bento-foot">
                <span>Vertex AI &middot; Gemini &middot; Vector Search</span>
                <Link to="/syllabus" style={{ color: 'var(--b)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore Labs <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div className="bento-top">
                <span className="bento-tag" style={{ color: 'var(--gr)', borderColor: 'var(--gr)' }}>Infrastructure</span>
                <Cloud style={{ width: '18px', height: '18px', color: 'var(--gr)' }} />
              </div>
              <div className="bento-title">Core Cloud &amp; Container Architecture</div>
              <p className="bento-p">
                Build resilient distributed systems on Google Kubernetes Engine (GKE), Cloud Run serverless services, Compute Engine instance groups, VPC networking, Cloud Load Balancing, and IAM governance.
              </p>
              <div className="bento-foot">
                <span>GKE &middot; Cloud Run &middot; VPC &middot; IAM</span>
                <Link to="/syllabus" style={{ color: 'var(--gr)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore Labs <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div className="bento-top">
                <span className="bento-tag" style={{ color: 'var(--y)', borderColor: 'var(--y)' }}>Data Engineering</span>
                <Database style={{ width: '18px', height: '18px', color: 'var(--y)' }} />
              </div>
              <div className="bento-title">BigQuery Analytics &amp; Streaming Pipelines</div>
              <p className="bento-p">
                Query petabyte-scale datasets with BigQuery SQL, design pub/sub real-time streaming architectures, orchestrate workflows with Cloud Composer, and visualize insights in Looker Studio.
              </p>
              <div className="bento-foot">
                <span>BigQuery &middot; Dataflow &middot; Looker Studio</span>
                <Link to="/syllabus" style={{ color: 'var(--y)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore Labs <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </div>
            </div>

            <div className="bento-card" style={{ gridColumn: 'span 6' }}>
              <div className="bento-top">
                <span className="bento-tag" style={{ color: 'var(--r)', borderColor: 'var(--r)' }}>DevOps &amp; Security</span>
                <Zap style={{ width: '18px', height: '18px', color: 'var(--r)' }} />
              </div>
              <div className="bento-title">Cloud Operations, CI/CD &amp; Defense</div>
              <p className="bento-p">
                Automate deployments using Cloud Build, Artifact Registry, Terraform, and GitOps workflows. Implement proactive site reliability with Cloud Monitoring, Logging, and Security Command Center.
              </p>
              <div className="bento-foot">
                <span>Cloud Build &middot; Terraform &middot; SRE</span>
                <Link to="/syllabus" style={{ color: 'var(--r)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore Labs <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Arcade Journey */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--y)' }} />
              THE ARCADE ROADMAP
            </div>
            <h2 className="home-h2">
              The <span style={{ color: 'var(--y)' }}>Journey</span> to Rewards
            </h2>
            <p className="home-sec-sub">
              Follow this straightforward 4-step path from starting your first lab to claiming official Google Cloud swags.
            </p>
          </div>

          <div className="path-grid">
            <div className="path-card">
              <div className="path-num">01</div>
              <div className="path-card-title">Choose Challenges</div>
              <div className="path-card-desc">
                Select from our curated list of active Arcade games and skill badges that align with your career goals and interests.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t2)', color: 'var(--gr)' }}>02</div>
              <div className="path-card-title">Earn Badges &amp; Points</div>
              <div className="path-card-desc">
                Execute interactive labs on Skills Boost. Each game awards 1 point; every 2 skill badges award 1 additional point.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t3)', color: 'var(--y)' }}>03</div>
              <div className="path-card-title">Track Milestones</div>
              <div className="path-card-desc">
                Use the Arcade Buddy point calculator to track your progress towards Trooper, Ranger, Champion, or Legend swag tiers.
              </div>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t4)', color: 'var(--r)' }}>04</div>
              <div className="path-card-title">Redeem Swags</div>
              <div className="path-card-desc">
                When the Prize Counter opens in early 2027, use your verified profile URL to claim official Google Cloud jackets, bags, and tees.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: About the Arcade Buddy Platform */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--r)' }} />
              PLATFORM ARCHITECTURE &amp; VALUES
            </div>
            <h2 className="home-h2">
              About The <span style={{ color: 'var(--b)' }}>Arcade Buddy</span> Platform
            </h2>
          </div>

          <div className="bento-card" style={{ padding: '36px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'var(--t1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cloud style={{ width: '28px', height: '28px', color: 'var(--b)' }} />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}>Arcade Buddy Ecosystem</div>
                <div style={{ fontSize: '13px', color: 'var(--mut)' }}>Engineered for precision, speed, and learner delight</div>
              </div>
            </div>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--mut)', marginBottom: '24px', maxWidth: '840px' }}>
              Google Cloud Arcade Buddy was created out of a simple need: participants in the Arcade and Facilitator programs frequently faced fragmented point tables, confusing badge conversion rules, and unclear milestone criteria. Arcade Buddy unifies everything into one responsive, high-performance workspace — offering automated point calculators, real-time leaderboard sync, comprehensive syllabus guides, and verified milestone strategies.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--ln)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--gr)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Automated Point Calculator</div>
                  <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Precise base + milestone bonus math</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--gr)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Live Leaderboard &amp; Ranks</div>
                  <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Interactive rankings with cursor glow</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--gr)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Active Syllabus Guides</div>
                  <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Step-by-step game quest directions</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--gr)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Prize Counter Intel</div>
                  <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Tier capacity and spots-left tracker</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Meet the Creators & Facilitators */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--b)' }} />
              COMMUNITY LEADERSHIP
            </div>
            <h2 className="home-h2">
              Meet The <span style={{ color: 'var(--b)' }}>Facilitators</span>
            </h2>
            <p className="home-sec-sub">
              The engineers and educators who design, build, and support the Arcade Buddy learning community.
            </p>
          </div>

          {/* Switcher Buttons */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="fac-switcher">
              {FACILITATORS.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(idx)}
                  className={`fac-tab-btn ${activeTab === idx ? 'active' : ''}`}
                >
                  {f.name} &middot; {f.role.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Facilitator Card */}
          <div
            className="fac-card-main"
            onMouseMove={handleFacilitatorMouseMove}
            onMouseLeave={handleFacilitatorMouseLeave}
          >
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                ref={avatarWrapRef}
                className="fac-avatar-wrap"
                style={{
                  '--accent-glow': activeFacilitator.id === 1 ? 'rgba(66, 133, 244, 0.45)' : 'rgba(234, 67, 53, 0.45)',
                  '--accent-glow-spot': activeFacilitator.id === 1 ? 'rgba(66, 133, 244, 0.85)' : 'rgba(234, 67, 53, 0.85)',
                  '--accent-ring': activeFacilitator.id === 1 ? 'rgba(66, 133, 244, 0.5)' : 'rgba(234, 67, 53, 0.5)',
                  '--accent-ring-inner': activeFacilitator.id === 1 ? 'rgba(66, 133, 244, 0.75)' : 'rgba(234, 67, 53, 0.75)',
                } as React.CSSProperties}
              >
                {/* Smooth concentric glowing circles on cursor proximity */}
                <div className="fac-circle-glow-outer" aria-hidden="true" />
                <div className="fac-circle-glow-ring1" aria-hidden="true" />
                <div className="fac-circle-glow-ring2" aria-hidden="true" />
                <div className="fac-circle-glow-ring3" aria-hidden="true" />
                <div className="fac-circle-glow-ripple" aria-hidden="true" />
                <div className="fac-circle-glow-spot" aria-hidden="true" />

                <img
                  src={activeFacilitator.image}
                  alt={`${activeFacilitator.name} - Facilitator profile photo`}
                  className="fac-avatar-img"
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <span className="bento-tag" style={{ display: 'inline-block', marginBottom: '8px' }}>
                  {activeFacilitator.badge}
                </span>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  BASED IN INDIA
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: activeFacilitator.accent, marginBottom: '8px' }}>
                <Code style={{ width: '14px', height: '14px' }} />
                <span>{activeFacilitator.tag}</span>
              </div>

              <h3 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                Hi, I'm <span style={{ color: activeFacilitator.accent }}>{activeFacilitator.name}</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--mut)', fontSize: '14.5px', lineHeight: 1.65, marginBottom: '24px' }}>
                {activeFacilitator.bio.map((para, i) => (
                  <p key={i} style={{ margin: 0 }}>{para}</p>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--ln)', paddingTop: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '12px' }}>
                  CONNECT &amp; FOLLOW
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {activeFacilitator.links.map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-press btn-press--secondary"
                      style={{ justifyContent: 'space-between', padding: '10px 16px', fontSize: '13px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {renderSocialIcon(lnk.icon)}
                        <div>
                          <div style={{ fontSize: '10px', color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                            {lnk.title}
                          </div>
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{lnk.sub}</div>
                        </div>
                      </div>
                      <ExternalLink style={{ width: '14px', height: '14px', color: 'var(--mut)' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Community & Mentorship Action Footer */}
        <section style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '40px 24px', boxShadow: '0 16px 36px var(--sh)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--gr)' }} />
            JOIN THE STUDY GROUPS
          </div>
          <h2 className="home-h2" style={{ marginBottom: '12px' }}>
            Need Help With A <span style={{ color: 'var(--b)' }}>Cloud Lab</span>?
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6 }}>
            Join thousands of active learners in our Telegram and WhatsApp channels. Ask technical questions, get walkthrough tips from peers, and celebrate badge completions together.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a
              href="https://t.me/arcade_with_us"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-press"
              style={{ background: '#0088cc', color: '#ffffff' }}
            >
              <Send style={{ width: '16px', height: '16px' }} />
              Join Telegram Community
            </a>
            <a
              href="https://chat.whatsapp.com/DKK6z9tP8Kk2yZ5ZqG6ZqY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-press"
              style={{ background: '#25D366', color: '#ffffff' }}
            >
              <MessageCircle style={{ width: '16px', height: '16px' }} />
              Join WhatsApp Community
            </a>
            <Link to="/calculator" className="btn-ghost btn-press btn-press--secondary">
              Open Point Calculator &rarr;
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
