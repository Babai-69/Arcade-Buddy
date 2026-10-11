import React, { useState } from 'react';
import { Info, ChevronRight, ArrowRight, Gift, X, CheckCircle2, Award, ExternalLink, Sparkles, Package, HelpCircle, Truck, Calculator } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface SwagTier {
  name: string;
  milestone: string;
  points: number;
  image: string;
  accent: string;
  tagColor: string;
  tagBg: string;
  items: string[];
}

const SWAG_TIERS: SwagTier[] = [
  {
    name: "Arcade Trooper",
    milestone: "50 PTS",
    points: 50,
    image: "https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Trooper.png?raw=true",
    accent: "var(--b)",
    tagColor: "var(--b)",
    tagBg: "var(--t1)",
    items: ["Official Google Cloud T-Shirt", "Arcade Sticker Pack", "Branded Pen & Notebook"]
  },
  {
    name: "Arcade Ranger",
    milestone: "75 PTS",
    points: 75,
    image: "https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Ranger.png?raw=true",
    accent: "var(--gr)",
    tagColor: "var(--gr)",
    tagBg: "var(--t2)",
    items: ["Weather-Resistant Backpack", "Stainless Steel Bottle", "Trooper Welcome Kit"]
  },
  {
    name: "Arcade Champion",
    milestone: "95 PTS",
    points: 95,
    image: "https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Champian.png?raw=true",
    accent: "var(--y)",
    tagColor: "var(--y)",
    tagBg: "var(--t3)",
    items: ["Weather-Shield Jacket", "Wireless Audio Earbuds", "Ranger Swag Collection"]
  },
  {
    name: "Arcade Legend",
    milestone: "120+ PTS",
    points: 120,
    image: "https://cdn.jsdelivr.net/gh/prateekrajput08/ArcadePointsCalci-jsDelivr@main/images/swags/Legend.png?raw=true",
    accent: "var(--r)",
    tagColor: "var(--r)",
    tagBg: "var(--t4)",
    items: ["Executive Duffel Bag / Smartwatch", "Exclusive Legend Hoodie", "Complete Champion Kit"]
  }
];

const SWAG_DROPS = [
  {
    id: 1,
    name: "The Arcade Weather-Shield Jacket",
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1789493091/ChatGPT_Image_Sep_15_2026_10_52_46_PM_gwx7aq.png",
    tiers: ["Champion", "Legend"],
    accent: "var(--y)",
    specs: [
      { title: "Storm-ready weave", desc: "Repels light rain and shuts down gusting winds before they hit your layer." },
      { title: "Official branding", desc: "Clean Google Cloud logo on the left chest paired with the super cloud logo on the sleeve." },
      { title: "Total draft block", desc: "High collar, custom Velcro cuffs, and a ribbed elastic hem lock warmth in." },
      { title: "Secure cargo", desc: "Deep zippered hand-warmer pockets keep your essentials safe." },
      { title: "Weightless mobility", desc: "Technical performance without the heavy winter bulk." }
    ]
  },
  {
    id: 2,
    name: "The Arcade Performance Backpack",
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1790234352/ChatGPT_Image_Sep_24_2026_12_44_20_PM_iss75e.png",
    tiers: ["Ranger"],
    accent: "var(--gr)",
    specs: [
      { title: "Weather-resistant fabric", desc: "Water-resistant polyester protects gear from sudden drizzle and rain." },
      { title: "Padded laptop sleeve", desc: "Dedicated cushioned sleeve securely fits laptops up to 15.6 inches." },
      { title: "All-day comfort", desc: "Ergonomic shoulder straps and ventilated mesh back panel for effortless carry." },
      { title: "Room for essentials", desc: "Dual zip compartments plus quick-access exterior pocket for daily gear." },
      { title: "Clean styling", desc: "Modern black-and-grey color blocking with subtle Google Cloud accents." }
    ]
  }
];

const RECENT_GALLERY = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKOTdyK-DMDIua53xSITMiQHcBb2BFOKSV0Uj15lAUigMAxqfCe4GCq8&s=10",
  "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-legend-swags.jpg",
  "https://media.licdn.com/dms/image/v2/D4D22AQFJEtmTj9qrPA/feedshare-shrink_800/B4DZXCO6ZUG4Ak-/0/1742720447177?e=2147483647&v=beta&t=G2v_3TILQPkocjR98A-neAKVFVFvftr-4xmkk3QD2mY",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/festival/gallery/69e7e490907b2_screenshot_2026_0420_121818.jpg?d=600x600",
  "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-season-2-2025-champion-swags.jpg",
  "https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/version-2/swags-gallery/arcade-2025-facilitator-swags.jpg"
];

export function SwagsPage() {
  const [activeDropTab, setActiveDropTab] = useState('All Tiers');
  const [selectedDrop, setSelectedDrop] = useState<any>(null);
  const [activeGalleryModal, setActiveGalleryModal] = useState<string | null>(null);

  const dropTabs = ['All Tiers', 'Trooper', 'Ranger', 'Champion', 'Legend'];

  const filteredDrops = SWAG_DROPS.filter(swag =>
    activeDropTab === 'All Tiers' || swag.tiers.includes(activeDropTab)
  );

  return (
    <div className="swags-page-root">
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

        .swags-page-root {
          font-family: "Space Grotesk", system-ui, sans-serif;
          color: var(--ink);
          background: linear-gradient(120deg, var(--g1), var(--g2) 45%, var(--g3));
          background-size: 200% 200%;
          animation: driftSwags 18s ease-in-out infinite alternate;
          min-height: 100vh;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        @keyframes driftSwags {
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

        .swags-wrap {
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

        /* 3-Step Redemption Roadmap */
        .path-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .path-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 18px;
          padding: 24px;
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
        }
        .filter-tab-btn.active {
          background: var(--b);
          color: #fff;
          box-shadow: 0 4px 14px rgba(26,115,232,.3);
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

        /* Modal */
        .drop-modal-backdrop {
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
        .drop-modal-card {
          background: var(--card);
          border: 1px solid var(--ln);
          border-radius: 24px;
          padding: 28px;
          max-width: 680px;
          width: 100%;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          position: relative;
        }

        @media (max-width: 900px) {
          .bento-card { grid-column: span 12 !important; }
          .path-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="swags-wrap">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', color: 'var(--mut)', marginBottom: '24px', textTransform: 'uppercase' }}>
          <Link to="/" style={{ color: 'var(--b)', textDecoration: 'none' }}>&larr; HOME</Link>
          <span>&middot;</span>
          <Link to="/resources" style={{ color: 'var(--mut)', textDecoration: 'none' }}>RESOURCES</Link>
          <span>&middot;</span>
          <span>SWAGS &amp; PRIZE REDEMPTION</span>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--r)' }} />
            PRIZE COUNTER &amp; MERCHANDISE
          </div>
          <h1 className="home-h1">
            Arcade Swags &amp; <span style={{ color: 'var(--r)' }}>Prizes Guide</span>
          </h1>
          <p className="home-sec-sub" style={{ margin: '0 auto 16px' }}>
            Understand the Google Cloud Arcade prize tiers, milestone conversion points, redemption schedules, and global zero-cost delivery procedures.
          </p>
          <div style={{ marginBottom: '24px' }}>
            <span className="handwritten">Redeem your hard-earned points for authentic Google Cloud gear 🎁</span>
          </div>

          {/* Quick Stats Strip */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '20px', padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--mut)', boxShadow: '0 8px 24px var(--sh)' }}>
            <div><strong style={{ color: 'var(--b)' }}>4</strong> Achievement Tiers</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--gr)' }}>January 2027</strong> Prize Counter</div>
            <div>&bull;</div>
            <div><strong style={{ color: 'var(--r)' }}>100% Free</strong> Global Shipping</div>
          </div>
        </section>

        {/* Eligibility Callout Box */}
        <div className="info-callout">
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(251, 188, 5, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
            <Info style={{ width: '20px', height: '20px', color: '#F59E0B' }} />
          </div>
          <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontSize: '15px' }}>
              Important Note About Swag Eligibility &amp; Redemption
            </div>
            <p style={{ margin: 0, color: 'var(--mut)' }}>
              Completing labs and collecting points does not automatically dispatch packages. When the official Prize Counter opens in early 2027, you will receive an invitation email from Google Cloud Skills Boost with your unique ordering link. Maintain an active public profile URL so your lab completions remain verifiable!
            </p>
          </div>
        </div>

        {/* 4 Arcade Prize Tiers Grid */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--b)' }} />
              MILESTONE TARGETS
            </div>
            <h2 className="home-h2">
              Official Arcade <span style={{ color: 'var(--b)' }}>Prize Tiers</span>
            </h2>
            <p className="home-sec-sub">
              Accumulate points from Arcade games, skill badges, and cohort milestone bonuses to qualify for these official merchandise bundles.
            </p>
          </div>

          <div className="bento-grid">
            {SWAG_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="bento-card"
                style={{ gridColumn: 'span 3', padding: '20px' }}
              >
                {/* Header Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span
                    className="bento-tag"
                    style={{ color: tier.tagColor, borderColor: tier.tagColor, background: tier.tagBg }}
                  >
                    {tier.milestone}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--mut)' }}>
                    Tier {tier.points >= 120 ? '4' : tier.points >= 95 ? '3' : tier.points >= 75 ? '2' : '1'}
                  </span>
                </div>

                {/* Tier Image */}
                <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: 'var(--card)', borderRadius: '14px', padding: '12px' }}>
                  <img
                    src={tier.image}
                    alt={`${tier.name} Swag Tier Bundle`}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>

                {/* Tier Title */}
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                  {tier.name}
                </h3>
                <div style={{ fontSize: '12px', color: tier.accent, fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                  Threshold: {tier.milestone}
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--mut)', marginBottom: '16px', flexGrow: 1 }}>
                  {tier.items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 style={{ width: '13px', height: '13px', color: tier.accent, flexShrink: 0 }} />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Link */}
                <div style={{ borderTop: '1px solid var(--ln)', paddingTop: '12px', marginTop: 'auto' }}>
                  <Link
                    to="/calculator"
                    className="btn-ghost btn-press btn-press--secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '8px 12px', fontSize: '12px' }}
                  >
                    Check Eligibility &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Swag Drops Spotlight */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--y)' }} />
              SIGNATURE MERCHANDISE
            </div>
            <h2 className="home-h2">
              Featured <span style={{ color: 'var(--y)' }}>Swag Drops</span>
            </h2>
            <p className="home-sec-sub">
              Engineered with premium technical fabrics and official Google Cloud detailing. Filter by tier to view specifications.
            </p>
          </div>

          {/* Tab Filter */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="filter-switcher">
              {dropTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveDropTab(tab)}
                  className={`filter-tab-btn ${activeDropTab === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bento-grid">
            {filteredDrops.map(drop => (
              <div
                key={drop.id}
                className="bento-card"
                style={{ gridColumn: 'span 6', padding: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {drop.tiers.map((t: string) => (
                      <span key={t} className="bento-tag" style={{ color: drop.accent, borderColor: drop.accent }}>
                        {t} Tier
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedDrop(drop)}
                    className="btn-ghost btn-press btn-press--secondary"
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                  >
                    View Specs
                  </button>
                </div>

                <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                  <img
                    src={drop.image}
                    alt={`${drop.name} - Official Google Cloud Arcade Reward`}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>

                <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                  {drop.name}
                </h3>

                <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.55, margin: 0 }}>
                  {drop.specs[0].desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Step Redemption Roadmap */}
        <section style={{ marginBottom: '64px' }}>
          <div className="home-sec-head">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--gr)' }} />
              FULFILLMENT WORKFLOW
            </div>
            <h2 className="home-h2">
              How To <span style={{ color: 'var(--gr)' }}>Claim Rewards</span>
            </h2>
            <p className="home-sec-sub">
              Three straightforward stages between accumulating points and receiving your package at your doorstep.
            </p>
          </div>

          <div className="path-grid">
            <div className="path-card">
              <div className="path-num">01</div>
              <div className="path-card-title">Earn Required Points</div>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5, margin: '0 0 16px', flexGrow: 1 }}>
                Participate in monthly Arcade games, speed runs, and skill badges. Use the Arcade Buddy calculator to tally points and monitor tier qualification.
              </p>
              <Link to="/calculator" className="btn-cta btn-press btn-press--primary" style={{ width: 'fit-content' }}>
                Open Calculator &rarr;
              </Link>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t2)', color: 'var(--gr)' }}>02</div>
              <div className="path-card-title">Receive Official Email</div>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5, margin: '0 0 16px', flexGrow: 1 }}>
                At the end of the season, Google Cloud Skills Boost sends a unique redemption invitation link to the email associated with your verified public profile.
              </p>
              <a
                href="https://mail.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-press btn-press--secondary"
                style={{ width: 'fit-content' }}
              >
                Check Gmail Inbox <ExternalLink style={{ width: '13px', height: '13px' }} />
              </a>
            </div>

            <div className="path-card">
              <div className="path-num" style={{ background: 'var(--t3)', color: 'var(--y)' }}>03</div>
              <div className="path-card-title">Select Gear &amp; Ship</div>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.5, margin: '0 0 16px', flexGrow: 1 }}>
                Enter your shipping address in the Prize Counter. Google covers 100% of global delivery and customs handling with zero out-of-pocket charges.
              </p>
              <Link to="/resources/prize-counter-guide" className="btn-ghost btn-press btn-press--secondary" style={{ width: 'fit-content' }}>
                Prize Counter Guide &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Previous Cohort Gallery */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">
                <span className="dot" style={{ background: 'var(--b)' }} />
                COMMUNITY PROOF
              </div>
              <h2 className="home-h2" style={{ margin: 0 }}>
                Previous Cohort <span style={{ color: 'var(--b)' }}>Swags Gallery</span>
              </h2>
            </div>
            <Link to="/resources/swag-showcase-page" className="btn-ghost btn-press btn-press--secondary">
              Full Showcase &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {RECENT_GALLERY.map((img, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--ln)',
                  background: 'var(--card)',
                  cursor: 'pointer',
                  height: '220px'
                }}
                onClick={() => setActiveGalleryModal(img)}
              >
                <img
                  src={img}
                  alt={`Google Cloud Arcade Delivered Swag Item ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Footer */}
        <section style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '40px 24px', boxShadow: '0 16px 36px var(--sh)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" style={{ background: 'var(--gr)' }} />
            JOIN THE WINNERS
          </div>
          <h2 className="home-h2" style={{ marginBottom: '12px' }}>
            Check How Many Points You Need For <span style={{ color: 'var(--b)' }}>Your Swag</span>
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6 }}>
            Track completed games, estimate milestone bonuses, and see remaining spots across Trooper, Ranger, Champion, and Legend tiers.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/calculator" className="btn-cta btn-press btn-press--primary">
              <Calculator style={{ width: '16px', height: '16px' }} />
              Open Point Calculator
            </Link>
            <Link to="/syllabus" className="btn-ghost btn-press btn-press--secondary">
              Explore Active Syllabus &rarr;
            </Link>
            <Link to="/resources" className="btn-ghost btn-press btn-press--secondary">
              Learning Resources &rarr;
            </Link>
          </div>
        </section>

      </div>

      {/* Item Specs Modal */}
      <AnimatePresence>
        {selectedDrop && (
          <div className="drop-modal-backdrop" onClick={() => setSelectedDrop(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="drop-modal-card"
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div>
                  <span className="bento-tag" style={{ color: selectedDrop.accent, borderColor: selectedDrop.accent, marginBottom: '6px', display: 'inline-block' }}>
                    {selectedDrop.tiers.join(' & ')} Tier
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                    {selectedDrop.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDrop(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mut)' }}
                >
                  <X style={{ width: '22px', height: '22px' }} />
                </button>
              </div>

              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pill)', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
                <img
                  src={selectedDrop.image}
                  alt={`${selectedDrop.name} - Detailed Product Preview`}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedDrop.specs.map((sp: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: selectedDrop.accent, flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
                      <strong style={{ color: 'var(--ink)' }}>{sp.title}:</strong>{' '}
                      <span style={{ color: 'var(--mut)' }}>{sp.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {activeGalleryModal && (
          <div className="drop-modal-backdrop" onClick={() => setActiveGalleryModal(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ maxWidth: '800px', width: '100%', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGalleryModal(null)}
                style={{ position: 'absolute', top: '-40px', right: '0', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X style={{ width: '28px', height: '28px' }} />
              </button>
              <img
                src={activeGalleryModal}
                alt="Google Cloud Arcade Past Season Swags Fullsize Gallery Preview"
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
