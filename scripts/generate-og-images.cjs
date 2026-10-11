const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const cards = [
  {
    filename: 'og-home.png',
    tag: 'OFFICIAL COMPANION',
    title: 'Arcade Buddy',
    subtitle: 'The Ultimate Google Cloud Arcade Companion',
    description: 'Track your points, skill badges, games, cohort leaderboard, and unlock official Google Cloud swag tiers with real-time analytics.',
    chips: ['🎯 Live Points Sync', '🏆 Cohort Rankings', '🎁 Swag Milestones', '🕹️ Lab Games & Trivia'],
    accent: '#4285F4'
  },
  {
    filename: 'og-leaderboard.png',
    tag: 'REAL-TIME RANKINGS',
    title: 'Arcade Leaderboard',
    subtitle: 'Live Rankings & Top Facilitator Performers',
    description: 'See where you stand in the cohort. Compare points, completed skill badges, game achievements, and milestone badges in real-time.',
    chips: ['🥇 Top Facilitators', '⚡ Live Points Tracking', '🎖️ Verified Badges', '📈 Cohort Analytics'],
    accent: '#FBBC04'
  },
  {
    filename: 'og-dashboard.png',
    tag: 'PERSONAL TRACKER',
    title: 'Participant Dashboard',
    subtitle: 'Personalized Arcade Analytics & Milestone Progress',
    description: 'Connect your Google Cloud Skills Boost public profile to track every badge, calculate points, and monitor your path to next swag tier.',
    chips: ['📊 Profile Sync', '🎯 Milestone Progress', '🏷️ Badge Audit', '📜 Achievement Poster'],
    accent: '#34A853'
  },
  {
    filename: 'og-calculator.png',
    tag: 'MILESTONE ESTIMATOR',
    title: 'Points & Swag Calculator',
    subtitle: 'Plan Your Path to Swag Tiers Accurately',
    description: 'Calculate required skill badges, trivia games, and lab points to reach Trooper, Ranger, Champion, or Legend tier before deadlines.',
    chips: ['🧮 Interactive Calculator', '🎒 Trooper & Ranger', '🏆 Champion & Legend', '⚡ Bonus Points'],
    accent: '#EA4335'
  },
  {
    filename: 'og-facilitator.png',
    tag: 'PROGRAM LEADERSHIP',
    title: 'Facilitator Hub',
    subtitle: 'Cohort Management, Toolkits & Program Guidelines',
    description: 'Empowering Google Cloud Arcade Facilitators with cohort tracking, communication templates, syllabus guides, and student support tools.',
    chips: ['👥 Cohort Roster', '🛠️ Facilitator Toolkit', '📑 Program Rules', '📢 Announcement Kits'],
    accent: '#4285F4'
  },
  {
    filename: 'og-syllabus.png',
    tag: 'LEARNING PATHWAY',
    title: 'Arcade Syllabus & Games',
    subtitle: 'Complete Directory of Labs, Games & Skill Badges',
    description: 'Explore all active and upcoming Arcade games, trivia labs, base camp badges, and skill tracks with direct activation links.',
    chips: ['🕹️ Game Badges', '⭐ Skill Badges', '🏕️ Base Camp', '🚀 Direct Lab Links'],
    accent: '#34A853'
  },
  {
    filename: 'og-resources.png',
    tag: 'KNOWLEDGE REPOSITORY',
    title: 'Arcade Resources & Guides',
    subtitle: 'Curated Documentation, Calculators & Tips',
    description: 'Comprehensive guides covering point calculations, daily lab limits, prize counter redemption, swag distribution, and GEAR badges.',
    chips: ['📚 Detailed Guides', '⏰ Lab Reset Timers', '📦 Shipping & Customs', '🎁 Prize Counter'],
    accent: '#FBBC04'
  },
  {
    filename: 'og-swags.png',
    tag: 'REWARD SHOWCASE',
    title: 'Arcade Swag Showcase & Tiers',
    subtitle: 'Trooper, Ranger, Champion & Legend Rewards',
    description: 'Discover the official Google Cloud swag collections, prize boxes, exclusive hoodies, backpacks, tech accessories, and pin sets.',
    chips: ['📦 Tier Unlocks', '🎒 Premium Backpacks', '👕 Exclusive Apparel', '🏅 Collectible Pins'],
    accent: '#EA4335'
  },
  {
    filename: 'og-point-system.png',
    tag: 'SCORING RULES',
    title: 'Arcade Point System Guide',
    subtitle: 'How Points, Badges & Milestones Are Calculated',
    description: 'Learn the exact math behind Google Cloud Arcade points, skill badge multipliers, game completions, and facilitator bonus credits.',
    chips: ['🔢 Scoring Rules', '🎖️ Badge Points', '🎮 Game Values', '✨ Milestone Bonuses'],
    accent: '#4285F4'
  },
  {
    filename: 'og-prize-counter.png',
    tag: 'REDEMPTION GUIDE',
    title: 'Prize Counter Claim Guide',
    subtitle: 'How to Claim Your Official Swags When Counter Opens',
    description: 'Step-by-step instructions for redeeming your hard-earned Arcade points for physical swags, verifying addresses, and shipping details.',
    chips: ['🛍️ Order Steps', '📬 Address Verification', '🚚 Tracking Orders', '⚠️ Customs Info'],
    accent: '#34A853'
  },
  {
    filename: 'og-gear-badges.png',
    tag: 'PROGRAM ENROLMENT',
    title: 'GEAR Badges & Enrolment Guide',
    subtitle: 'Enrolment Badges & Facilitator Milestone Activation',
    description: 'Understand the GEAR enrolment badge process, verify your participation, and unlock special cohort milestone achievements.',
    chips: ['⚙️ GEAR Badge', '📋 Step-by-Step Guide', '✅ Profile Verification', '🌟 Bonus Unlocks'],
    accent: '#FBBC04'
  },
  {
    filename: 'og-quickstart.png',
    tag: 'GET STARTED',
    title: 'Arcade Quick Start Guide',
    subtitle: 'From Zero to Your First Cloud Badge in 5 Steps',
    description: 'New to Google Cloud Arcade? Learn how to register, set up your Skills Boost account, claim credits, and start earning badges today.',
    chips: ['🚀 5-Step Onboarding', '☁️ Skills Boost Setup', '💳 Free Lab Access', '💡 Beginner Tips'],
    accent: '#4285F4'
  },
  {
    filename: 'og-free-credits.png',
    tag: 'ZERO-COST ACCESS',
    title: 'Free Google Cloud Credits',
    subtitle: 'Claim 200+ Monthly Credits for Arcade Hands-on Labs',
    description: 'Get monthly free credits and subscription passes to complete Google Cloud Arcade labs without spending any money.',
    chips: ['💳 Free Monthly Credits', '🎟️ Lab Access Passes', '🔑 Promo Codes', '📚 Zero Cost Learning'],
    accent: '#34A853'
  },
  {
    filename: 'og-profile-help.png',
    tag: 'SETUP GUIDE',
    title: 'Public Profile Help',
    subtitle: 'Make Your Google Cloud Skills Boost Profile Public',
    description: 'Ensure your facilitator and the Arcade system can track your badges and award your points accurately by publishing your profile link.',
    chips: ['🔗 Public Link Setup', '🔒 Privacy Settings', '🔄 Profile Verification', '⚡ Instant Sync'],
    accent: '#EA4335'
  },
  {
    filename: 'og-progress.png',
    tag: 'LIVE AUDIT',
    title: 'My Progress Tracker',
    subtitle: 'Inspect Completed Labs, Badges & Milestone Status',
    description: 'Live profile audit showing completed skill badges, game badges, trivia dates, and your remaining steps to the next swag tier.',
    chips: ['🔍 Real-Time Audit', '📋 Badge Breakdown', '⏳ Target Deficit', '🎯 Tier Roadmap'],
    accent: '#4285F4'
  },
  {
    filename: 'og-roadmap.png',
    tag: 'SCHEDULE & DEADLINES',
    title: 'Arcade Season Roadmap',
    subtitle: 'Game Releases, Milestones & Prize Counter Windows',
    description: 'Stay ahead of important Arcade deadlines, game drops, facilitator milestones, and prize counter redemption open dates.',
    chips: ['📅 Season Schedule', '🎮 Release Dates', '⏰ Crucial Deadlines', '🔔 Event Reminders'],
    accent: '#FBBC04'
  },
  {
    filename: 'og-about.png',
    tag: 'COMMUNITY & MISSION',
    title: 'About Arcade Buddy',
    subtitle: 'Built by Facilitators for Google Cloud Enthusiasts',
    description: 'Discover the story behind Arcade Buddy, our open-source tools, developer team, and community-driven mission to help learners succeed.',
    chips: ['🤝 Open Source', '👨‍💻 Facilitator Built', '💡 Learner First', '🌐 Global Community'],
    accent: '#34A853'
  },
  {
    filename: 'og-support.png',
    tag: 'HELP & SUPPORT',
    title: 'Arcade Support Desk',
    subtitle: 'Direct Help with Profile Sync, Credits & Swag Queries',
    description: 'Have a question or facing an issue with points or lab access? Reach out to community mentors and facilitators for quick assistance.',
    chips: ['🎫 Ticket Desk', '💬 Fast Resolution', '🤝 Community Mentors', '❓ Common Fixes'],
    accent: '#EA4335'
  },
  {
    filename: 'og-faq.png',
    tag: 'COMMON QUESTIONS',
    title: 'Frequently Asked Questions',
    subtitle: 'Instant Answers to Top Google Cloud Arcade Questions',
    description: 'Answers regarding points, swag tiers, delivery timelines, daily lab limits, milestone deadlines, and facilitator requirements.',
    chips: ['💡 Top Questions', '📦 Shipping FAQs', '🎮 Game Rules', '🏅 Badge Verification'],
    accent: '#4285F4'
  },
  {
    filename: 'og-legal.png',
    tag: 'POLICY & TERMS',
    title: 'Arcade Policies & Terms',
    subtitle: 'Community Code of Conduct & Program Disclaimer',
    description: 'Important legal notices, privacy commitments, participant code of conduct, and Google Cloud Arcade Facilitator program rules.',
    chips: ['📜 Terms of Service', '🛡️ Privacy Policy', '🤝 Code of Conduct', '⚖️ Program Notice'],
    accent: '#64748B'
  },
  {
    filename: 'og-default.png',
    tag: 'GOOGLE CLOUD ARCADE',
    title: 'Arcade Buddy Hub',
    subtitle: 'Your Central Hub for Google Cloud Arcade Progress',
    description: 'Everything you need to track points, complete syllabus labs, climb the leaderboard, and unlock official Google Cloud swags.',
    chips: ['🚀 Live Tracking', '🏆 Leaderboard', '🎁 Swag Tiers', '📚 Resource Library'],
    accent: '#4285F4'
  }
];

function generateHTML(card) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #090D16;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #F8FAFC;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 72px;
      position: relative;
      overflow: hidden;
    }
    /* Background subtle grid & ambient glows */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.8;
      z-index: 0;
    }
    .glow-1 {
      position: absolute;
      top: -120px;
      right: -100px;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, ${card.accent}33 0%, transparent 70%);
      filter: blur(60px);
      z-index: 1;
    }
    .glow-2 {
      position: absolute;
      bottom: -150px;
      left: 100px;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, transparent 70%);
      filter: blur(70px);
      z-index: 1;
    }
    /* Google 4-color top bar */
    .top-color-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      display: flex;
      z-index: 10;
    }
    .color-blue { flex: 1; background: #4285F4; }
    .color-red { flex: 1; background: #EA4335; }
    .color-yellow { flex: 1; background: #FBBC04; }
    .color-green { flex: 1; background: #34A853; }

    .content {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 22px;
      max-width: 950px;
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: ${card.accent}20;
      border: 1.5px solid ${card.accent}60;
      color: #FFFFFF;
    }
    .brand-pill {
      font-size: 14px;
      font-weight: 700;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .brand-pill span {
      color: #38BDF8;
    }

    .title {
      font-size: 56px;
      font-weight: 900;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
    .subtitle {
      font-size: 26px;
      font-weight: 700;
      line-height: 1.25;
      color: ${card.accent};
      letter-spacing: -0.01em;
    }
    .description {
      font-size: 19px;
      font-weight: 400;
      line-height: 1.5;
      color: #CBD5E1;
      max-width: 880px;
    }

    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 6px;
    }
    .chip {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 15px;
      font-weight: 600;
      color: #E2E8F0;
      backdrop-filter: blur(8px);
    }

    .footer {
      position: relative;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .footer-logo {
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 20px;
      color: #0F172A;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .footer-brand {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }
    .footer-desc {
      font-size: 14px;
      color: #64748B;
      font-weight: 500;
    }
    .footer-right {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 700;
      color: #94A3B8;
      letter-spacing: 0.05em;
    }
    .badge-icon-box {
      position: absolute;
      right: 72px;
      top: 110px;
      width: 170px;
      height: 170px;
      background: rgba(15, 23, 42, 0.7);
      border: 2px solid ${card.accent}50;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 16px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
      z-index: 6;
      backdrop-filter: blur(12px);
    }
    .badge-icon {
      font-size: 58px;
      margin-bottom: 6px;
    }
    .badge-sub {
      font-size: 13px;
      font-weight: 800;
      color: ${card.accent};
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="top-color-bar">
    <div class="color-blue"></div>
    <div class="color-red"></div>
    <div class="color-yellow"></div>
    <div class="color-green"></div>
  </div>
  <div class="bg-grid"></div>
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <div class="badge-icon-box">
    <div class="badge-icon">☁️</div>
    <div class="badge-sub">Arcade 2026</div>
  </div>

  <div class="content">
    <div class="header-row">
      <div class="badge-tag">
        <span>●</span> ${card.tag}
      </div>
      <div class="brand-pill">
        Google Cloud Arcade <span>Facilitator Cohort</span>
      </div>
    </div>

    <div>
      <h1 class="title">${card.title}</h1>
      <h2 class="subtitle">${card.subtitle}</h2>
    </div>

    <p class="description">${card.description}</p>

    <div class="chips-row">
      ${card.chips.map(chip => `<div class="chip">${chip}</div>`).join('')}
    </div>
  </div>

  <div class="footer">
    <div class="footer-left">
      <div class="footer-logo">⚡</div>
      <div>
        <div class="footer-brand">Arcade Buddy</div>
        <div class="footer-desc">Google Cloud Arcade Facilitator Dashboard & Progress Hub</div>
      </div>
    </div>
    <div class="footer-right">
      <span>arcadebuddy.app</span>
      <span>•</span>
      <span>GOOGLE CLOUD SKILLS BOOST</span>
    </div>
  </div>
</body>
</html>`;
}

async function run() {
  console.log('Launching Puppeteer to generate high-resolution OG images...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const card of cards) {
    const html = generateHTML(card);
    await page.setContent(html, { waitUntil: 'load' });
    const outPath = path.join(process.cwd(), 'public', 'og', card.filename);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Generated: ${card.filename}`);
  }

  await browser.close();
  console.log('All OG images generated successfully!');
}

run().catch(err => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
