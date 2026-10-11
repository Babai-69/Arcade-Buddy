export interface PageSEOMeta {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  keywords?: string[];
  type?: 'website' | 'article';
  schema?: Record<string, any>;
}

const PRODUCTION_URL = 'https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app';

export const DEFAULT_SEO: PageSEOMeta = {
  title: 'Arcade Buddy – Google Cloud Arcade Tracking & Facilitator Hub',
  description: 'Track your Google Cloud Arcade Facilitator milestones, points, skill badges, games, swag tiers, and live cohort leaderboard with Arcade Buddy.',
  image: '/og/og-home.png',
  imageAlt: 'Arcade Buddy - Google Cloud Arcade Facilitator Hub Preview',
  keywords: [
    'Google Cloud Arcade',
    'Arcade Facilitator',
    'Google Cloud Skills Boost',
    'Arcade Points Calculator',
    'Arcade Swags',
    'Skill Badges',
    'Arcade Leaderboard'
  ],
  type: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Arcade Buddy',
    'url': PRODUCTION_URL,
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'All',
    'description': 'Real-time dashboard and tracking companion for Google Cloud Arcade Facilitator program participants.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  }
};

export const PAGE_SEO_MAP: Record<string, PageSEOMeta> = {
  '/': {
    title: 'Arcade Buddy – Google Cloud Arcade Tracking & Facilitator Hub',
    description: 'Track your Google Cloud Arcade Facilitator milestones, points, skill badges, games, swag tiers, and live cohort leaderboard with Arcade Buddy.',
    image: '/og/og-home.png',
    imageAlt: 'Arcade Buddy - Google Cloud Arcade Facilitator Hub',
    keywords: ['Google Cloud Arcade', 'Arcade Facilitator', 'Cloud Skills Boost', 'Arcade Swag Points', 'Google Cloud Badges'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${PRODUCTION_URL}/#website`,
          'url': PRODUCTION_URL,
          'name': 'Arcade Buddy',
          'description': 'The Ultimate Companion for Google Cloud Arcade Facilitator program participants.',
          'inLanguage': 'en-US'
        },
        {
          '@type': 'WebApplication',
          '@id': `${PRODUCTION_URL}/#app`,
          'name': 'Arcade Buddy Platform',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'All',
          'url': PRODUCTION_URL,
          'description': 'Calculate points, track badges, and monitor cohort standing in real-time.',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
        },
        {
          '@type': 'Organization',
          '@id': `${PRODUCTION_URL}/#organization`,
          'name': 'Arcade Buddy Community',
          'url': PRODUCTION_URL,
          'logo': `${PRODUCTION_URL}/logo.png`,
          'sameAs': [
            'https://t.me/cloudarcade',
            'https://whatsapp.com/channel/0029VbCahmFFCCoVQMV7ix1s'
          ]
        }
      ]
    }
  },
  '/leaderboard': {
    title: 'Arcade Leaderboard – Live Rankings & Top Facilitators | Arcade Buddy',
    description: 'Explore live Google Cloud Arcade cohort rankings. Compare points, completed skill badges, game achievements, and milestone statuses in real-time.',
    image: '/og/og-leaderboard.png',
    imageAlt: 'Google Cloud Arcade Live Leaderboard and Cohort Standings',
    keywords: ['Arcade Leaderboard', 'Google Cloud Rankings', 'Facilitator Standings', 'Top Cloud Learners'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Google Cloud Arcade Live Facilitator Leaderboard',
      'description': 'Live cohort rankings and verified points standings for Google Cloud Arcade learners.',
      'url': `${PRODUCTION_URL}/leaderboard`,
      'numberOfItems': 100
    }
  },
  '/dashboard': {
    title: 'Arcade Dashboard – Track Points, Badges & Milestone Progress | Arcade Buddy',
    description: 'Connect your Google Cloud Skills Boost public profile to track every badge, calculate points, and monitor your path to next swag tier.',
    image: '/og/og-dashboard.png',
    imageAlt: 'Participant Arcade Dashboard and Milestone Tracker',
    keywords: ['Arcade Dashboard', 'My Arcade Points', 'Badge Tracker', 'Skills Boost Profile Sync'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Arcade Buddy Participant Dashboard',
      'applicationCategory': 'EducationalApplication',
      'url': `${PRODUCTION_URL}/dashboard`,
      'description': 'Synchronize public Skills Boost profiles to track completed labs, trivia, and swag milestones.'
    }
  },
  '/calculator': {
    title: 'Points Calculator – Estimate Milestones & Swag Tiers | Arcade Buddy',
    description: 'Calculate required skill badges, trivia games, and lab points to reach Trooper, Ranger, Champion, or Legend tier before program deadlines.',
    image: '/og/og-calculator.png',
    imageAlt: 'Google Cloud Arcade Points & Swag Tier Calculator',
    keywords: ['Arcade Points Calculator', 'Swag Tier Estimator', 'Arcade Milestones', 'Trooper Ranger Champion Legend'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Arcade Points & Swag Tier Calculator',
      'applicationCategory': 'CalculatorApplication',
      'url': `${PRODUCTION_URL}/calculator`,
      'description': 'Estimate the exact number of skill badges and arcade games needed to unlock Google Cloud swag tiers.'
    }
  },
  '/facilitator': {
    title: 'Facilitator Hub – Program Guides, Toolkit & Milestones | Arcade Buddy',
    description: 'Official toolkit and guidance for Google Cloud Arcade Facilitators: program rules, syllabus links, bonus milestone details, and support resources.',
    image: '/og/og-facilitator.png',
    imageAlt: 'Google Cloud Arcade Facilitator Program Hub',
    keywords: ['Facilitator Hub', 'Arcade Facilitator Program', 'Bonus Milestones', 'Facilitator Toolkit'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      'name': 'Google Cloud Arcade Facilitator Program Hub',
      'description': 'Comprehensive program syllabus, bonus milestone rules, and student onboarding toolkit for facilitators.',
      'provider': {
        '@type': 'Organization',
        'name': 'Google Cloud Arcade Facilitators'
      }
    }
  },
  '/syllabus': {
    title: 'Arcade Syllabus & Games – Labs, Skill Badges & Challenges | Arcade Buddy',
    description: 'Explore all active and upcoming Arcade games, trivia labs, base camp badges, and skill tracks with direct activation links.',
    image: '/og/og-syllabus.png',
    imageAlt: 'Google Cloud Arcade Syllabus, Games and Skill Badges Directory',
    keywords: ['Arcade Syllabus', 'Arcade Games', 'Skill Badges Directory', 'Base Camp Labs'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Google Cloud Arcade Curriculum & Syllabus',
      'description': 'Interactive catalog of Google Cloud hands-on labs, game challenges, and 50+ skill badges.',
      'provider': {
        '@type': 'Organization',
        'name': 'Google Cloud Skills Boost'
      }
    }
  },
  '/resources': {
    title: 'Arcade Resources – Guides, Swag Tiers & Study Materials | Arcade Buddy',
    description: 'Comprehensive guides covering point calculations, daily lab limits, prize counter redemption, swag distribution, and GEAR badges.',
    image: '/og/og-resources.png',
    imageAlt: 'Google Cloud Arcade Knowledge Base and Resources Hub',
    keywords: ['Arcade Resources', 'Arcade Documentation', 'Lab Guides', 'Prize Counter Instructions'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Google Cloud Arcade Resources Knowledge Base',
      'url': `${PRODUCTION_URL}/resources`,
      'description': 'Curated collection of official documentation, point guides, and shipping information.'
    }
  },
  '/resources/point-system': {
    title: 'Arcade Point System – Points Breakdown & Scoring Rules | Arcade Buddy',
    description: 'Learn the exact math behind Google Cloud Arcade points, skill badge multipliers, game completions, and facilitator bonus credits.',
    image: '/og/og-point-system.png',
    imageAlt: 'Arcade Point System Breakdown and Scoring Formula',
    keywords: ['Arcade Point System', 'Arcade Scoring Rules', 'Badge Multipliers', 'Bonus Points'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Calculate Google Cloud Arcade Points',
      'description': 'Step-by-step breakdown of how game badges, skill badges, and bonus milestones convert to arcade points.',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Complete Arcade Games',
          'text': 'Each completed Arcade game badge awards 1.0 point.'
        },
        {
          '@type': 'HowToStep',
          'name': 'Earn Google Cloud Skill Badges',
          'text': 'Every 2 completed skill badges award 1.0 point (0.5 point each).'
        },
        {
          '@type': 'HowToStep',
          'name': 'Hit Cohort Milestones',
          'text': 'Reach facilitator milestones to unlock up to 35+ bonus points.'
        }
      ]
    }
  },
  '/resources/prize-counter-guide': {
    title: 'Prize Counter Guide – Claim Swags & Arcade Rewards | Arcade Buddy',
    description: 'Step-by-step instructions for redeeming your hard-earned Arcade points for physical swags, verifying addresses, and shipping details.',
    image: '/og/og-prize-counter.png',
    imageAlt: 'Google Cloud Arcade Prize Counter Redemption Guide',
    keywords: ['Prize Counter Guide', 'Claim Swag', 'Arcade Rewards', 'Redemption Link'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Claim Google Cloud Arcade Swags in the Prize Counter',
      'description': 'Guide to ordering prizes when the Google Cloud Arcade Prize Counter opens.',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Qualify with Points',
          'text': 'Reach at least 50 points for Trooper Tier or up to 120 points for Legend Tier.'
        },
        {
          '@type': 'HowToStep',
          'name': 'Receive Official Email',
          'text': 'Receive your personalized redemption link from Google Cloud Skills Boost.'
        },
        {
          '@type': 'HowToStep',
          'name': 'Enter Shipping Address',
          'text': 'Confirm your global delivery address. Google covers 100% of shipping and customs.'
        }
      ]
    }
  },
  '/resources/gear-badges': {
    title: 'GEAR Badges Guide – Google Cloud Arcade Enrolment | Arcade Buddy',
    description: 'Understand the GEAR enrolment badge process, verify your participation, and unlock special cohort milestone achievements.',
    image: '/og/og-gear-badges.png',
    imageAlt: 'Google Cloud GEAR Badges and Enrolment Verification Guide',
    keywords: ['GEAR Badges', 'Program Enrolment Badge', 'Facilitator Verification', 'GEAR Community'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Earn the GEAR Program Enrolment Badge',
      'description': 'Instructions to claim the official Gemini Enterprise Agent Ready (GEAR) badge.'
    }
  },
  '/resources/swag-showcase-page': {
    title: 'Swag Showcase – Past & Current Season Arcade Rewards | Arcade Buddy',
    description: 'Discover the official Google Cloud swag collections, prize boxes, exclusive hoodies, backpacks, tech accessories, and pin sets.',
    image: '/og/og-swags.png',
    imageAlt: 'Google Cloud Arcade Swag Showcase and Past Collections',
    keywords: ['Swag Showcase', 'Arcade Swag Box', 'Google Cloud Hoodie', 'Arcade Goodies'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Google Cloud Arcade Past Swag Collections',
      'description': 'Showcase of delivered Google Cloud prizes from 2023, 2024, 2025, and 2026 seasons.'
    }
  },
  '/resources/bonus-milestone': {
    title: 'Bonus Milestones – Extra Arcade Points & Tier Unlocks | Arcade Buddy',
    description: 'Detailed breakdown of facilitator bonus milestones: requirements, deadline dates, and how to claim up to 35+ bonus Arcade points.',
    image: '/og/og-point-system.png',
    imageAlt: 'Google Cloud Arcade Facilitator Bonus Milestones Guide',
    keywords: ['Bonus Milestones', 'Facilitator Bonus Points', 'Tier Unlocks', 'Cohort Goals'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Unlock Facilitator Bonus Milestones',
      'description': 'Complete cohort milestone tiers to earn significant bonus points towards higher swag tiers.'
    }
  },
  '/resources/daily-lab-limit-guide': {
    title: 'Daily Lab Limits Guide – Lab Limits & Reset Windows | Arcade Buddy',
    description: 'Avoid lab quota lockouts with our comprehensive guide on daily lab limits, error resolution, and Google Cloud reset schedules.',
    image: '/og/og-resources.png',
    imageAlt: 'Google Cloud Skills Boost Daily Lab Quota Limits Guide',
    keywords: ['Daily Lab Limits', 'Lab Quota Exceeded', 'Skills Boost Lab Reset', 'Arcade Lab Help'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Manage Skills Boost Daily Lab Quota Limits',
      'description': 'Techniques to prevent lab lockouts and understand Google Cloud daily quota reset windows.'
    }
  },
  '/resources/swag-distribution-system': {
    title: 'Swag Distribution System – Delivery, Customs & Tracking | Arcade Buddy',
    description: 'Learn how Google Cloud packages, handles customs, and ships physical Arcade prizes internationally directly to your doorstep.',
    image: '/og/og-prize-counter.png',
    imageAlt: 'Arcade Swag Shipping, Customs and Delivery System',
    keywords: ['Swag Distribution', 'Arcade Shipping', 'Customs Clearance', 'Global Delivery'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'name': 'Google Cloud Swag Distribution & Logistics Overview',
      'description': 'Complete breakdown of international prize packaging, dispatch, tracking, and customs clearance.'
    }
  },
  '/quick-start': {
    title: 'Quick Start Guide – Get Started with Google Cloud Arcade | Arcade Buddy',
    description: 'New to Google Cloud Arcade? Learn how to register, set up your Skills Boost account, claim credits, and start earning badges today.',
    image: '/og/og-quickstart.png',
    imageAlt: 'Google Cloud Arcade 5-Step Quick Start Guide',
    keywords: ['Arcade Quick Start', 'Beginner Guide', 'Skills Boost Onboarding', 'How to Start Arcade'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': '5 Steps to Start Google Cloud Arcade',
      'description': 'Beginner onboarding walkthrough from account creation to earning your first cloud badge.'
    }
  },
  '/free-credits': {
    title: 'Free Cloud Credits – Redeem 200+ Arcade Monthly Credits | Arcade Buddy',
    description: 'Get monthly free credits and subscription passes to complete Google Cloud Arcade labs without spending any money.',
    image: '/og/og-free-credits.png',
    imageAlt: 'Free Google Cloud Skills Boost Lab Credits and Passes',
    keywords: ['Free Cloud Credits', 'Arcade Monthly Credits', 'Skills Boost Pass', 'Zero Cost Labs'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Claim Free Google Cloud Lab Credits',
      'description': 'Redeem monthly promo passes and credit codes to practice hands-on labs at zero cost.'
    }
  },
  '/public-profile-help': {
    title: 'Public Profile Help – Share Your Skills Boost URL | Arcade Buddy',
    description: 'Ensure your facilitator and the Arcade system can track your badges and award your points accurately by publishing your profile link.',
    image: '/og/og-profile-help.png',
    imageAlt: 'Public Profile Setup and URL Sharing Instructions',
    keywords: ['Public Profile Help', 'Skills Boost Profile URL', 'Share Profile', 'Arcade Sync'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Make Your Google Cloud Skills Boost Profile Public',
      'description': 'Instructions to generate and share your public profile link so facilitator points sync properly.'
    }
  },
  '/swags': {
    title: 'Arcade Swags & Tiers – Trooper, Ranger, Champion & Legend | Arcade Buddy',
    description: 'Check out official Google Cloud swag collections across Trooper, Ranger, Champion, and Legend tiers with real-time remaining quota.',
    image: '/og/og-swags.png',
    imageAlt: 'Official Google Cloud Arcade Swag Tiers & Rewards',
    keywords: ['Arcade Swags', 'Trooper Tier', 'Ranger Tier', 'Champion Tier', 'Legend Tier'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Google Cloud Arcade Official Swag Bundles',
      'description': 'Physical rewards including hoodies, backpacks, tech accessories, and pins earned through Arcade points.',
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'USD',
        'lowPrice': '0',
        'highPrice': '0',
        'offerCount': 4
      }
    }
  },
  '/contact-us': {
    title: 'Contact Us – Arcade Support & Facilitator Help | Arcade Buddy',
    description: 'Reach out to the Arcade Buddy team and community facilitators for assistance with profile sync, lab issues, and program guidance.',
    image: '/og/og-about.png',
    imageAlt: 'Contact Arcade Buddy Support and Mentors',
    keywords: ['Contact Us', 'Arcade Facilitator Support', 'Community Mentors', 'Get Help'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Arcade Buddy Mentors & Support',
      'url': `${PRODUCTION_URL}/contact-us`
    }
  },
  '/about': {
    title: 'About Arcade Buddy – Mission, Team & Facilitator Community | Arcade Buddy',
    description: 'Discover the story behind Arcade Buddy, our open-source tools, developer team, and community-driven mission to help learners succeed.',
    image: '/og/og-about.png',
    imageAlt: 'About Arcade Buddy Platform, Mission and Community',
    keywords: ['About Arcade Buddy', 'Community Mission', 'Google Cloud Facilitators', 'Open Source Tools'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About Arcade Buddy Platform & Facilitators',
      'url': `${PRODUCTION_URL}/about`
    }
  },
  '/roadmap': {
    title: 'Arcade Roadmap – Upcoming Features & Program Schedule | Arcade Buddy',
    description: 'Stay ahead of important Arcade deadlines, game drops, facilitator milestones, and prize counter redemption open dates.',
    image: '/og/og-roadmap.png',
    imageAlt: 'Arcade Season Schedule, Roadmap and Release Dates',
    keywords: ['Arcade Roadmap', 'Program Deadlines', 'Game Drop Dates', 'Prize Counter Schedule'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Google Cloud Arcade Program Roadmap & Schedule',
      'url': `${PRODUCTION_URL}/roadmap`
    }
  },
  '/disclaimer': {
    title: 'Disclaimer & Program Notice | Arcade Buddy',
    description: 'Important legal notices, non-affiliation disclaimer with Google LLC, and terms regarding community-driven Arcade tracking tools.',
    image: '/og/og-legal.png',
    imageAlt: 'Arcade Buddy Legal Disclaimer and Official Notice',
    keywords: ['Disclaimer', 'Non-affiliation Notice', 'Terms of Use', 'Program Guidelines'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      'name': 'Arcade Buddy Non-Affiliation Disclaimer',
      'url': `${PRODUCTION_URL}/disclaimer`
    }
  },
  '/my-progress': {
    title: 'My Progress – Arcade Labs, Badges & Point Milestones | Arcade Buddy',
    description: 'Live profile audit showing completed skill badges, game badges, trivia dates, and your remaining steps to the next swag tier.',
    image: '/og/og-progress.png',
    imageAlt: 'Personal Arcade Progress Audit and Milestone Tracking',
    keywords: ['My Progress', 'Live Profile Audit', 'Completed Badges', 'Arcade Points Status'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Personal Arcade Progress Auditor',
      'url': `${PRODUCTION_URL}/my-progress`
    }
  },
  '/faq': {
    title: 'Frequently Asked Questions – Google Cloud Arcade Help | Arcade Buddy',
    description: 'Answers regarding points, swag tiers, delivery timelines, daily lab limits, milestone deadlines, and facilitator requirements.',
    image: '/og/og-faq.png',
    imageAlt: 'Google Cloud Arcade Frequently Asked Questions and Answers',
    keywords: ['Arcade FAQ', 'Common Questions', 'Swag Delivery FAQs', 'Points Questions'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How are Google Cloud Arcade points calculated?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Each completed Arcade Game badge awards 1.0 point. Every 2 completed Google Cloud Skill Badges award 1.0 point (0.5 point each). Bonus points are awarded for cohort milestones.'
          }
        },
        {
          '@type': 'Question',
          'name': 'When does the Arcade Prize Counter open?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The Prize Counter typically opens in December / early 2027 where participants receive an official redemption email to choose their swag items.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I avoid daily lab quota limits on Skills Boost?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Plan your labs across the month, avoid canceling labs prematurely, and wait for the 24-hour reset window if a quota limit warning appears.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are Google Cloud Arcade swags shipped internationally for free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, Google covers 100% of global delivery charges and customs fees for physical swag rewards to eligible participant addresses.'
          }
        }
      ]
    }
  },
  '/privacy': {
    title: 'Privacy Policy | Arcade Buddy',
    description: 'Learn how Arcade Buddy respects your privacy, safeguards public profile data, and handles user authentication securely.',
    image: '/og/og-legal.png',
    imageAlt: 'Arcade Buddy Privacy Policy and Data Handling Notice',
    keywords: ['Privacy Policy', 'Data Protection', 'Security', 'User Privacy'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      'name': 'Arcade Buddy Privacy Policy',
      'url': `${PRODUCTION_URL}/privacy`
    }
  },
  '/terms': {
    title: 'Terms of Service | Arcade Buddy',
    description: 'Review the terms, conditions, and guidelines governing the use of Arcade Buddy and its automated cohort assistance features.',
    image: '/og/og-legal.png',
    imageAlt: 'Arcade Buddy Terms of Service and Usage Conditions',
    keywords: ['Terms of Service', 'User Agreement', 'Platform Rules', 'Acceptable Use'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      'name': 'Arcade Buddy Terms of Service',
      'url': `${PRODUCTION_URL}/terms`
    }
  },
  '/code-of-conduct': {
    title: 'Code of Conduct – Arcade Community Standards | Arcade Buddy',
    description: 'Our community pledge to maintain a welcoming, inclusive, and collaborative learning environment for all Google Cloud learners.',
    image: '/og/og-legal.png',
    imageAlt: 'Google Cloud Arcade Community Code of Conduct',
    keywords: ['Code of Conduct', 'Community Standards', 'Respectful Learning', 'Collaboration'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      'name': 'Arcade Community Code of Conduct',
      'url': `${PRODUCTION_URL}/code-of-conduct`
    }
  },
  '/program-tncs': {
    title: 'Program Terms & Conditions | Arcade Buddy',
    description: 'Official rules, eligibility criteria, and swag claim terms for Google Cloud Arcade and Facilitator cohort participants.',
    image: '/og/og-legal.png',
    imageAlt: 'Google Cloud Arcade Program Terms and Conditions',
    keywords: ['Program Terms', 'Arcade Rules', 'Swag Eligibility', 'Official Guidelines'],
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      'name': 'Arcade Program Terms & Conditions',
      'url': `${PRODUCTION_URL}/program-tncs`
    }
  },
  '/support': {
    title: 'Support Desk – Ticket Submission & Quick Solutions | Arcade Buddy',
    description: 'Have a question or facing an issue with points or lab access? Reach out to community mentors and facilitators for quick assistance.',
    image: '/og/og-support.png',
    imageAlt: 'Arcade Buddy Community Support and Help Desk',
    keywords: ['Support Desk', 'Ticket Submission', 'Profile Help', 'Mentorship Support'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Arcade Buddy Help & Support Center',
      'description': 'Direct inquiry desk and support center for Google Cloud Arcade participants.',
      'url': `${PRODUCTION_URL}/support`
    }
  },
  '/feedback': {
    title: 'Participant Feedback – Share Thoughts & Improve Arcade Buddy | Arcade Buddy',
    description: 'Share your feedback, report visual bugs, or suggest features to help us make Arcade Buddy better for everyone.',
    image: '/og/og-support.png',
    imageAlt: 'Participant Feedback and Feature Suggestion Form',
    keywords: ['Participant Feedback', 'Suggestions', 'User Feedback', 'Bug Report'],
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Participant Feedback Form',
      'url': `${PRODUCTION_URL}/feedback`
    }
  }
};

/**
 * Returns the matching SEO metadata for a given pathname.
 */
export function getPageSEO(pathname: string): PageSEOMeta {
  const normalized = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  if (PAGE_SEO_MAP[normalized]) {
    return PAGE_SEO_MAP[normalized];
  }

  // Check prefix matches for nested routes if any
  for (const [key, meta] of Object.entries(PAGE_SEO_MAP)) {
    if (key !== '/' && normalized.startsWith(key)) {
      return meta;
    }
  }

  return {
    ...DEFAULT_SEO,
    title: 'Page Not Found (404) | Arcade Buddy',
    description: 'The requested page could not be found on Arcade Buddy. Return to the home dashboard to continue tracking your Google Cloud Arcade journey.',
    image: '/og/og-default.png',
    imageAlt: 'Page Not Found - Arcade Buddy'
  };
}
