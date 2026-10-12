import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, X, Compass, ExternalLink, BookOpen, FileSpreadsheet, Gift, ShieldAlert, Award, Terminal, HelpCircle, CheckCircle, Search, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface ResourceItem {
  id?: string;
  category: string;
  title: string;
  description: string;
  linkText: string;
  link: string;
  internal: boolean;
  image: string;
  imageDark?: string;
}

const RESOURCES: ResourceItem[] = [
  {
    category: "GUIDE",
    title: "Quick-Start Guide 2026",
    description: "Step-by-step walkthrough to get started with Google Cloud Arcade, including account setup, lab credits, and earning your first digital badges.",
    linkText: "Read Quick-Start",
    link: "/quick-start",
    internal: true,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776604089/pre_assess_light_1_eoihas.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776604136/pre_assess_light_3_jqpblf.png",
  },
  {
    category: "SPREADSHEET",
    title: "Skill Badges Master Ledger",
    description: "Comprehensive spreadsheet listing all active skill badges in Google Cloud Arcade with lab counts, credit requirements, and topics.",
    linkText: "Open Master Sheet",
    link: "https://docs.google.com/spreadsheets/d/19Eql1t6lbqZQAzL2URepijHp7cdiTW1JHQTtt-mLsdc/edit?gid=678806814#gid=678806814",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603557/Skill_Badge_Light_1_lpitew.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603498/Skill_Badge_Dark_negpxy.png",
  },
  {
    category: "SPREADSHEET",
    title: "Lab-Free Courses Directory",
    description: "Curated spreadsheet of all available lab-free theory courses in the Google Cloud Arcade Facilitator Program curriculum.",
    linkText: "View Courses Sheet",
    link: "https://docs.google.com/spreadsheets/d/1iX6FM28pmS5pWym0D-9tNh18jOhY7c7PareuK36NcN0/edit?usp=sharing",
    internal: false,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603346/Lab_free_Dark_1_i4tgsn.png",
    imageDark: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776603346/Lab_free_Dark_q5erfq.png",
  },
  {
    category: "GUIDE",
    title: "Prize Counter Guide & FAQs",
    description: "Learn how the official Google Cloud Arcade Prize Counter operates, how to track your redemption status, and avoid common errors.",
    linkText: "View Prize Guide",
    link: "/resources/prize-counter-guide",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/a/b/ab1726e7ea048576b7df5c7762269cebd445a122.gif",
  },
  {
    category: "CHALLENGE",
    title: "Untrackable Badges List",
    description: "Explore the Work Meets Play series, how monthly limited badges work, why they cannot be auto-tracked on public profiles, and the 7 bonus points reward.",
    linkText: "View Untrackable Badges",
    link: "/resources/untrackable-badges",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/7/f/7fd46f23ee6895d3889b600b8b17e185defc750e.gif",
  },
  {
    category: "GUIDE",
    title: "GEAR Badges - Facilitator 2026",
    description: "Understand how to claim the 2 essential GEAR Badges on your Google Developer Profile to qualify for facilitator milestone bonuses.",
    linkText: "View GEAR Guide",
    link: "/resources/gear-badges",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/2/d/2dec3320e1d5a80276e302d54a9237ceb53be0f5.gif",
  },
  {
    category: "GALLERY",
    title: "Swag Tiers & Winner Showcase",
    description: "Explore the official 2026 Arcade Prize Tiers, previous collection drops, and photo proof from past global swag recipients.",
    linkText: "Open Swag Gallery",
    link: "/resources/swag-showcase-page",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/4X/0/b/5/0b54f368c9a6fc241e212b7aad7fbf7a548ce2ed.gif",
  },
  {
    category: "EVENT",
    title: "Google Cloud Learn with Communities",
    description: "Step-by-step enrollment guide, 200 free Google Skills credits redemption, 6-step roadmap, and campus community leaderboard.",
    linkText: "Event Hub & Guide",
    link: "/resources/learn-with-communities",
    internal: true,
    image: "https://media.geeksforgeeks.org/img-practice/prod/meta_tags/234/Web/Header/LwC-01_1790068256.png",
  },
  {
    category: "EVENT",
    title: "Arcade Facilitator Program",
    description: "Overview of the official Facilitator cohort, milestone bonus criteria, credit delivery timelines, and program terms.",
    linkText: "Facilitator Hub",
    link: "/facilitator",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1781892327/1_w99okg.png",
  },
  {
    category: "INFO",
    title: "Finding Your Public Profile URL",
    description: "Step-by-step instructions on making your Google Cloud Skills Boost profile public and grabbing your shareable verification link.",
    linkText: "Read Profile Help",
    link: "/public-profile-help",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1781892328/2_pg7die.png",
  },
  {
    category: "INFO",
    title: "Daily Lab Limits & Rate Controls",
    description: "Learn about the 5-lab daily limit policy, cooldown windows, and practical tips to maintain an uninterrupted learning schedule.",
    linkText: "Read Lab Limits",
    link: "/resources/daily-lab-limit-guide",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782318350/12_a0wpls.png",
  },
  {
    category: "VIDEO",
    title: "How to Claim Free Lab Credits",
    description: "Detailed walkthrough explaining how to activate your complimentary monthly Skills Boost credits pass with zero credit card required.",
    linkText: "Claim Free Credits",
    link: "/free-credits",
    internal: true,
    image: "https://res.cloudinary.com/dxzxw29ix/image/upload/q_auto/f_auto/v1776605639/free_credits_jw8ean.png",
  },
  {
    category: "INFO",
    title: "Waterfall Swag Distribution System",
    description: "Understand the Google Cloud Arcade 2026 Waterfall Tier system and how points cascade down tiers if top allotments fill.",
    linkText: "Read Waterfall Rules",
    link: "/resources/swag-distribution-system",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/3X/c/9/c9510d1f0ec87f932f291138a04ba9e0d6a5722d.gif",
  },
  {
    category: "INFO",
    title: "Arcade Points & Bonus Conversion",
    description: "Deep dive into the 1.0 point game conversion, 0.5 point skill badge calculation, and milestone bonus point stacking.",
    linkText: "Points System Guide",
    link: "/resources/point-system",
    internal: true,
    image: "https://d2yds90mtvelsl.cloudfront.net/original/4X/1/f/c/1fcc37481bf9ff636fa48fcd0314773f4e87f0cc.gif",
  }
];

export function ResourcesPage() {
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; title: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const counts: Record<string, number> = { ALL: RESOURCES.length };
    RESOURCES.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    const keys = Object.keys(counts).filter(k => k !== 'ALL').sort();
    return ['ALL', ...keys].map(k => ({ id: k, count: counts[k] }));
  }, []);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(item => {
      const matchesTab = activeTab === 'ALL' || item.category === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="resources-page-root">
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

        .resources-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftRes 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        @keyframes driftRes {
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

        .resources-wrap {
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
          gap: 20px;
        }

        .bento-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 20px;
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

        /* Filter Switcher */
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

        /* Image Modal */
        .img-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .img-modal-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 24px;
          padding: 24px;
          max-width: 720px;
          width: 100%;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          position: relative;
        }

        @media (max-width: 900px) {
          .bento-card { grid-column: span 12 !important; }
        }
      `}</style>

      <div className="resources-wrap">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '24px', textTransform: 'uppercase' }}>
          <Link to="/" style={{ color: 'var(--b)', textDecoration: 'none' }}>&larr; HOME</Link>
          <span>&middot;</span>
          <span>RESOURCES &amp; GUIDES</span>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--y)' }} />
            CURATED STUDY MATERIALS
          </div>
          <h1 className="home-h1">
            Arcade Learning <span style={{ color: 'var(--y)' }}>Resources</span>
          </h1>
          <p className="home-sec-sub" style={{ margin: '0 auto 16px' }}>
            Master spreadsheets, step-by-step quickstarts, rate limit guides, and verification toolkits designed to keep you ahead in the Google Cloud Arcade &amp; Facilitator journey.
          </p>
          <div style={{ marginBottom: '24px' }}>
            <span className="handwritten">Everything you need to study, calculate, and redeem 📚</span>
          </div>

          {/* Quick Category Summary */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '20px', padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--mut)', boxShadow: '0 8px 24px var(--sh)' }}>
            <div><strong style={{ color: 'var(--ink)' }}>{RESOURCES.length}</strong> Curated Guides</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--b)' }}>2</strong> Google Sheets Trackers</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--gr)' }}>100% Free</strong> Community Access</div>
          </div>
        </section>

        {/* Filter Navigation */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="filter-switcher">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`filter-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              >
                {cat.id === 'ALL' ? 'All Resources' : cat.id} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="search-wrap">
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--mut)' }} />
          <input
            type="text"
            placeholder="Search guides, spreadsheets, limits, profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Resource Cards Grid */}
        <div className="bento-grid" style={{ marginBottom: '64px' }}>
          {filteredResources.map((item, idx) => {
            const isInternal = item.internal;
            const categoryAccent = item.category === 'GUIDE' ? 'var(--b)' : item.category === 'SPREADSHEET' ? 'var(--gr)' : item.category === 'GALLERY' ? '#a855f7' : item.category === 'EVENT' ? 'var(--r)' : 'var(--y)';

            return (
              <div
                key={idx}
                className="bento-card"
                style={{ gridColumn: 'span 4' }}
              >
                {/* Thumbnail Image */}
                <div
                  style={{
                    height: '170px',
                    width: '100%',
                    position: 'relative',
                    background: 'var(--card)',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveModalImg({ src: item.image, title: item.title })}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} - Arcade resource illustration`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span
                      className="bento-tag"
                      style={{
                        color: categoryAccent,
                        borderColor: categoryAccent,
                        background: 'var(--card)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.55, marginBottom: '20px', flexGrow: 1 }}>
                    {item.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--ln)' }}>
                    {isInternal ? (
                      <Link
                        to={item.link}
                        className="btn-ghost btn-press btn-press--secondary"
                        style={{ width: '100%', justifyContent: 'space-between', padding: '9px 16px' }}
                      >
                        <span>{item.linkText}</span>
                        <ArrowRight style={{ width: '14px', height: '14px', color: 'var(--b)' }} />
                      </Link>
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost btn-press btn-press--secondary"
                        style={{ width: '100%', justifyContent: 'space-between', padding: '9px 16px' }}
                      >
                        <span>{item.linkText}</span>
                        <ExternalLink style={{ width: '14px', height: '14px', color: 'var(--gr)' }} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '20px', marginBottom: '40px' }}>
            <Search style={{ width: '36px', height: '36px', color: 'var(--mut)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>No resources match your search</h3>
            <p style={{ fontSize: '14px', color: 'var(--mut)', maxWidth: '400px', margin: '0 auto 16px' }}>
              Try searching for a different keyword or reset your category filters.
            </p>
            <button onClick={() => { setActiveTab('ALL'); setSearchQuery(''); }} className="btn-ghost btn-press btn-press--secondary">
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Community Help Footer */}
        <section style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '40px 24px', boxShadow: '0 16px 36px var(--sh)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--gr)' }} />
            COMMUNITY-TESTED KNOWLEDGE
          </div>
          <h2 className="home-h2" style={{ marginBottom: '12px' }}>
            Looking For Something <span style={{ color: 'var(--b)' }}>Specific</span>?
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6 }}>
            Our community study guides and spreadsheets are updated weekly as new games and bonus milestones are released. Join the Telegram discussion group to request new walkthroughs.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/syllabus" className="btn-cta btn-press btn-press--primary">
              <BookOpen style={{ width: '16px', height: '16px' }} />
              Open Active Syllabus
            </Link>
            <Link to="/calculator" className="btn-ghost btn-press btn-press--secondary">
              Point Calculator &rarr;
            </Link>
            <Link to="/faq" className="btn-ghost btn-press btn-press--secondary">
              Common Questions FAQ &rarr;
            </Link>
          </div>
        </section>

      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {activeModalImg && (
          <div
            className="img-modal-backdrop"
            onClick={() => setActiveModalImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="img-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  {activeModalImg.title}
                </h4>
                <button
                  onClick={() => setActiveModalImg(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mut)', padding: '4px' }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
              <img
                src={activeModalImg.src}
                alt={`${activeModalImg.title} - Full size preview`}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px' }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
