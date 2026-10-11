# Google Search Console — Sitemap & Indexing Specification

> **Application**: Arcade Buddy (Google Cloud Arcade Facilitator Dashboard & Companion)  
> **Production Domain**: `https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app`  
> **XML Sitemap Endpoint**: `https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/sitemap.xml`  
> **Robots.txt Endpoint**: `https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/robots.txt`  
> **Date of Manifest**: October 9, 2026  
> **Protocol**: HTTPS (Strict Transport Security enabled)

---

## 1. Google Search Console Submission Guide

### Step 1: Open Google Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and enter the production URL prefix:  
   `https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app`

### Step 2: Verify Ownership
Choose either:
* **HTML Tag Verification**: Place the verification `<meta name="google-site-verification" content="..." />` tag in `index.html`.
* **Google Cloud Project DNS / Domain Verification**: Link via Google Cloud Console project settings.

### Step 3: Submit the Sitemap
1. In the Search Console sidebar, select **Indexing** &rarr; **Sitemaps**.
2. Under "Add a new sitemap", enter:  
   `sitemap.xml`
3. Click **Submit**. Google will process the 30+ URLs and crawl them according to the priority table below.

### Step 4: Verify Robots.txt & AI Crawler Permissions
Check that `robots.txt` responds with `200 OK` and allows Googlebot, GPTBot, and ClaudeBot:  
`https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/robots.txt`

---

## 2. Comprehensive URL Directory & Priority Mapping

### Group A: Core Tracking & Real-Time Dashboards (High Priority)

| Canonical URL Path | Page Title | Priority | Change Frequency | Target Search Queries |
| :--- | :--- | :---: | :---: | :--- |
| [`/`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/) | Arcade Buddy – Google Cloud Arcade Tracking & Facilitator Hub | `1.0` | Daily | google cloud arcade, arcade facilitator, skills boost points tracker |
| [`/leaderboard`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/leaderboard) | Arcade Leaderboard – Live Rankings & Top Facilitators | `0.9` | Hourly | arcade leaderboard, google cloud facilitator rankings, top learners |
| [`/dashboard`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/dashboard) | Arcade Dashboard – Track Points, Badges & Milestone Progress | `0.9` | Daily | my arcade dashboard, skills boost profile sync, badge tracker |
| [`/calculator`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/calculator) | Points Calculator – Estimate Milestones & Swag Tiers | `0.9` | Daily | arcade points calculator, swag calculator, trooper ranger champion legend |
| [`/my-progress`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/my-progress) | My Progress – Arcade Labs, Badges & Point Milestones | `0.7` | Daily | live profile audit, completed arcade badges, point deficiency check |

---

### Group B: Curriculum, Syllabus & Educational Tracks

| Canonical URL Path | Page Title | Priority | Change Frequency | Target Search Queries |
| :--- | :--- | :---: | :---: | :--- |
| [`/syllabus`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/syllabus) | Arcade Syllabus & Games – Labs, Skill Badges & Challenges | `0.9` | Weekly | arcade syllabus 2026, arcade games catalog, skill badge tracks |
| [`/facilitator`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/facilitator) | Facilitator Hub – Program Guides, Toolkit & Milestones | `0.8` | Weekly | facilitator toolkit, facilitator program guidelines, cohort rules |
| [`/quick-start`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/quick-start) | Quick Start Guide – Get Started with Google Cloud Arcade | `0.8` | Monthly | how to join google cloud arcade, beginner arcade guide, step by step |
| [`/free-credits`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/free-credits) | Free Cloud Credits – Redeem 200+ Arcade Monthly Credits | `0.8` | Weekly | free skills boost credits, arcade monthly free credits, zero cost labs |
| [`/public-profile-help`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/public-profile-help) | Public Profile Help – Share Your Skills Boost URL | `0.7` | Monthly | make skills boost profile public, share public profile url |

---

### Group C: Knowledge Base & Detailed Guides

| Canonical URL Path | Page Title | Priority | Change Frequency | Target Search Queries |
| :--- | :--- | :---: | :---: | :--- |
| [`/resources`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources) | Arcade Resources – Guides, Swag Tiers & Study Materials | `0.8` | Weekly | arcade documentation, study material, facilitator resources |
| [`/resources/point-system`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/point-system) | Arcade Point System – Points Breakdown & Scoring Rules | `0.8` | Monthly | how are arcade points calculated, skill badge points formula |
| [`/resources/prize-counter-guide`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/prize-counter-guide) | Prize Counter Guide – Claim Swags & Arcade Rewards | `0.8` | Monthly | prize counter open date, how to claim arcade swag, shipping verification |
| [`/resources/gear-badges`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/gear-badges) | GEAR Badges Guide – Google Cloud Arcade Enrolment | `0.8` | Monthly | gear badge guide, gemini enterprise agent ready badge, enrolment |
| [`/resources/bonus-milestone`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/bonus-milestone) | Bonus Milestones – Extra Arcade Points & Tier Unlocks | `0.7` | Monthly | facilitator bonus milestones, extra arcade points, tier bonuses |
| [`/resources/daily-lab-limit-guide`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/daily-lab-limit-guide) | Daily Lab Limits Guide – Lab Limits & Reset Windows | `0.7` | Monthly | skills boost daily lab limit, lab quota reset time, quota error |
| [`/resources/swag-distribution-system`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/swag-distribution-system) | Swag Distribution System – Delivery, Customs & Tracking | `0.7` | Monthly | google cloud swag shipping, customs tax international delivery |

---

### Group D: Swag Rewards & Prize Counter

| Canonical URL Path | Page Title | Priority | Change Frequency | Target Search Queries |
| :--- | :--- | :---: | :---: | :--- |
| [`/swags`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/swags) | Arcade Swags & Tiers – Trooper, Ranger, Champion & Legend | `0.8` | Weekly | google cloud swags, arcade goodies, hoodie backpack pins |
| [`/resources/swag-showcase-page`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/resources/swag-showcase-page) | Swag Showcase – Past & Current Season Arcade Rewards | `0.7` | Monthly | past season swag showcase, 2023 2024 2025 arcade prizes |

---

### Group E: Community, Support & Roadmap

| Canonical URL Path | Page Title | Priority | Change Frequency | Target Search Queries |
| :--- | :--- | :---: | :---: | :--- |
| [`/faq`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/faq) | Frequently Asked Questions – Google Cloud Arcade Help | `0.7` | Weekly | arcade faqs, questions about arcade, prize counter faq |
| [`/support`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/support) | Support Desk – Ticket Submission & Quick Solutions | `0.7` | Weekly | arcade support, submit support ticket, report missing points |
| [`/feedback`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/feedback) | Participant Feedback – Share Thoughts & Improve | `0.6` | Monthly | feedback form, report bug arcade buddy, feature suggestion |
| [`/about`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/about) | About Arcade Buddy – Mission, Team & Community | `0.6` | Monthly | about arcade buddy, community facilitators, mission |
| [`/roadmap`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/roadmap) | Arcade Roadmap – Upcoming Features & Program Schedule | `0.7` | Weekly | arcade release schedule, upcoming arcade games, deadlines |
| [`/contact-us`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/contact-us) | Contact Us – Arcade Support & Facilitator Help | `0.6` | Monthly | contact arcade facilitator, email support |

---

### Group F: Legal & Program Policies (Low Volatility)

| Canonical URL Path | Page Title | Priority | Change Frequency |
| :--- | :--- | :---: | :---: |
| [`/disclaimer`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/disclaimer) | Disclaimer & Program Notice | `0.4` | Yearly |
| [`/privacy`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/privacy) | Privacy Policy | `0.4` | Yearly |
| [`/terms`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/terms) | Terms of Service | `0.4` | Yearly |
| [`/code-of-conduct`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/code-of-conduct) | Code of Conduct – Community Standards | `0.4` | Yearly |
| [`/program-tncs`](https://ais-pre-pflgad73xzsoyh5n3pewa4-735276502020.asia-southeast1.run.app/program-tncs) | Arcade Program Terms & Conditions | `0.4` | Yearly |

---

## 3. Disallowed Administrative Endpoints (Excluded from Search Index)

The following paths are explicitly marked `Disallow` in `robots.txt` to preserve privacy and prevent indexing of non-public cohort administrative views:

* `/api/*` (Backend proxy routes & Gemini API endpoints)
* `/admin-progress` (Facilitator student roster monitoring)
* `/admin-feedback` (Private student feedback management)
* `/admin-queries` (Administrative support ticket inbox)
