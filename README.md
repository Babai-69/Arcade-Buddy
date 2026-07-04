<div align="center">

<img src="https://arcade-buddy-385186531056.asia-southeast1.run.app/favicon.ico" width="80" height="80" alt="Arcade Buddy Logo"/>

# 🕹️ Arcade Buddy

### Your Ultimate Google Cloud Arcade Companion

[![Live App](https://img.shields.io/badge/Live%20App-arcade--buddy-blue?style=for-the-badge&logo=google-cloud)](https://arcade-buddy-385186531056.asia-southeast1.run.app)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Google Cloud Run](https://img.shields.io/badge/Cloud%20Run-Deployed-4285F4?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/run)

**Track badges · Calculate points · Climb the leaderboard · Win swags 🎁**

[🚀 Live Demo](https://arcade-buddy-385186531056.asia-southeast1.run.app) · [📊 Leaderboard](https://arcade-buddy-385186531056.asia-southeast1.run.app/leaderboard) · [🧮 Calculator](https://arcade-buddy-385186531056.asia-southeast1.run.app/calculator) · [🎓 Facilitator](https://arcade-buddy-385186531056.asia-southeast1.run.app/facilitator)

---

</div>

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Program Rules](#-program-rules)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🎯 About

**Arcade Buddy** is a comprehensive companion web application built for participants and facilitators of the **Google Cloud Skills Boost Arcade 2026** program. It provides real-time milestone tracking, automated profile point calculation, an active games directory, and complete program guidelines — all in one place.

> Built and maintained by **Abir Dey**, Google Cloud Arcade Facilitator 2026.

---

## ✨ Features

### 🧮 Points Calculator
- Input your **Google Cloud Skills Boost public profile URL**
- Automatically fetches and parses all earned badges
- Intelligently classifies badges by type:
  - 🎮 **Game Badges** → 1 pt each (Adventure, Voyage, Trail, Base Camp, Special, New Game)
  - 🎯 **Skill Badges** → 0.5 pts each (hands-on challenge labs)
  - ❓ **Trivia Badges** → 1 pt each
  - 📚 **Lab-free Courses** → 0.5 pts each
- Shows **Total Points**, **Base Points**, and **Bonus Points**
- Displays **current tier** and **points needed** for next tier
- Filters badges by **2026 season only**

### 🏆 Live Leaderboard
- Real-time rankings updated via **Firebase Firestore**
- Shows Rank, Participant, Points, Badge breakdown, Milestone, Tier
- **Search** by name · **Filter** by milestone, tier, and access status
- **24h change** column tracking daily progress
- Tier breakdown stats: Trooper / Ranger / Champion / Legend counts
- Admin-only **CSV upload** panel with Google Authentication

### 📊 Live Milestone Tracker
- Scrapes official Google Cloud Arcade page **every 2 hours**
- Shows **spots remaining** and **% filled** for all 4 tiers:

| Tier | Points Required | Total Spots |
|------|----------------|-------------|
| 🔵 Trooper | 50 pts | 6,000 |
| 🟠 Ranger | 75 pts | 4,000 |
| 🟣 Champion | 95 pts | 3,000 |
| 🟢 Legend | 120 pts | 2,500 |

- File-based JSON cache for instant loading
- "Last synced X minutes ago" timestamp
- Fallback parsing logic for resilience

### 🎯 Facilitator Bonus Calculator
- Calculates points **only within the program window**:
  `July 13, 2026 (5PM IST) → September 14, 2026 (11:59PM IST)`
- Only **Game Badges + Skill Badges** count for facilitator bonus
- Shows progress toward all 4 bonus milestones:

| Milestone | Games Required | Skills Required | Bonus Points |
|-----------|---------------|-----------------|--------------|
| Milestone 1 | 6 games | 18 skill badges | +5 pts |
| Milestone 2 | 8 games | 34 skill badges | +15 pts |
| Milestone 3 | 10 games | 50 skill badges | +25 pts |
| Ultimate | 12 games | 66 skill badges | +35 pts |
| Bonus Milestone | (if M1+ reached) | — | +10 pts |

### 🎮 Active Games Directory
- Lists all **currently active Arcade games** with badge images
- Month-by-month view (July active, August/September coming soon)
- **Copyable access codes** for each game
- Locked placeholder cards for upcoming months
- Progress bar showing games revealed per month

### 📚 Program Syllabus
- Complete structured reference for **skill badges** (90+ listed)
- Organized by difficulty: Beginner / Intermediate / Advanced
- **Lab-free courses** for each difficulty level
- Daily lab limit explainer with interactive animation:
  - Max 15 labs per 24-hour rolling window
  - Auto-simulation shows how the limit fills up
  - Recovery options: 24hr full reset or +1 lab every 2hrs

### 🎁 Swag & Prize Information
- Explains the **Waterfall Prize Distribution System**:
  - Legend → first access to premium rewards
  - Champion → remaining premium + exclusive gear
  - Ranger → standard high-quality swag
  - Trooper → foundational rewards
- Interactive prize distribution animation

### 📂 Resources Section
- How to claim **free Google Cloud credits**
- How to find your **public profile URL**
- Prize counter guide
- Program enrollment guide PDF

---

## 🖥️ Screenshots

> *Coming soon — add screenshots of your app here*

| Dashboard | Calculator | Leaderboard |
|-----------|------------|-------------|
| ![Dashboard]() | ![Calculator]() | ![Leaderboard]() |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | ~5.8 | Type safety |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Styling |
| motion/react | 12 | Animations |
| lucide-react | 0.546 | Icons |
| recharts | 3 | Charts |
| react-router-dom | 7 | Routing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | 4 | HTTP server |
| Cheerio | 1.2 | HTML parsing |
| nodemailer | — | Email notifications |
| tsx | 4 | TypeScript execution |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Google Cloud Run | Hosting & deployment |
| Firebase Firestore | Leaderboard database |
| Firebase Auth | Google Sign-In |
| GitHub | Version control |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  ARCADE BUDDY                       │
│                                                     │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │   React SPA  │    │    Express.js Backend    │   │
│  │  (Vite +     │◄──►│                          │   │
│  │  TypeScript) │    │  /api/calculator         │   │
│  └──────────────┘    │  /api/arcade-spots       │   │
│                      │  /api/milestones/spots   │   │
│                      │  /api/notify-query       │   │
│                      └──────────┬───────────────┘   │
│                                 │                   │
│  ┌──────────────┐    ┌─────────▼───────────────┐    │
│  │   Firebase   │    │   External Sources      │    │
│  │  Firestore   │    │                         │    │
│  │  (Leaderboard│    │  cloudskillsboost.google│    │
│  │   + Auth)    │    │  arcadepointscalci.in   │    │
│  └──────────────┘    │  go.cloudskillsboost.   │    │
│                      │  google/arcade          │    │
│                      └─────────────────────────┘    │
└─────────────────────────────────────────────────────┘
         Deployed on Google Cloud Run
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Google Firebase project
- A Gemini API key (from Google AI Studio)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Babai-69/arcade-buddy.git
cd arcade-buddy

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Add your environment variables (see below)

# 5. Run locally
npm run dev
```

The app will be available at `http://localhost:3000`
---
> ⚠️ **Never commit `.env.local` to GitHub.** It's already in `.gitignore`.

> 📝 Get your Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

> 📝 Gmail SMTP requires an **App Password** (not your regular password). Generate one at myaccount.google.com → Security → 2-Step Verification → App Passwords.

---

## 📁 Project Structure

```
arcade-buddy/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Landing page hero section
│   │   ├── Leaderboard.tsx  # Live leaderboard with Firebase
│   │   ├── Calculator.tsx   # Points calculator
│   │   ├── Facilitator.tsx  # Facilitator program page
│   │   ├── Syllabus.tsx     # Program syllabus & games
│   │   ├── Swags.tsx        # Prize & swag information
│   │   ├── Resources.tsx    # Guides & resources
│   │   ├── About.tsx        # About page
│   │   └── layout/
│   │       └── Navbar.tsx   # Navigation bar
│   ├── pages/               # Page components
│   ├── lib/
│   │   ├── firebase.ts      # Firebase initialization
│   │   └── utils.ts         # Utility functions
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── data/
│   │   └── sampleData.ts    # Sample/seed data
│   ├── App.tsx              # Root component & routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── server.ts                # Express.js backend
├── public/                  # Static assets
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind configuration
├── package.json
└── .env.example             # Environment variables template
```
---
---

## 📋 Program Rules

### Badge Point Values (2026)
```
Game Badges    → 1.0 pt each
Skill Badges   → 0.5 pts each
Trivia Badges  → 1.0 pt each
Special Badges → 2.0 pts each
Lab-free       → 0.5 pts each
```

### Tier Thresholds (2026)
```
No Tier   → below 50 pts
Trooper   → 50 pts
Ranger    → 75 pts
Champion  → 95 pts
Legend    → 120 pts
```

### Facilitator Program Window
```
Start: July 13, 2026 at 5:00 PM IST
End:   September 14, 2026 at 11:59 PM IST

Only Game + Skill badges in this window
count toward facilitator bonus milestones.
```

### Daily Lab Limit
```
Maximum 15 labs per 24-hour rolling window
(not midnight to midnight — from first lab taken)
Failed/incomplete labs still count toward limit
Recovery: +1 lab every 2 hours after limit hit
```

---

## 🤝 Contributing

This is a personal project built for the Google Cloud Arcade community. If you find bugs or have suggestions:

1. Open an issue on GitHub
2. Or reach out directly through the contact form on the website

---

## 👤 Author

<div align="center">

**Abir Dey**

*Google Cloud Arcade Facilitator 2026*
*Electronics & Communication Engineering Graduate*
*Quality & Testing Engineer | Aspiring Data Analyst*

[![GitHub](https://img.shields.io/badge/GitHub-Babai--69-181717?style=for-the-badge&logo=github)](https://github.com/Babai-69)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abir%20Dey-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/abir-dey-a34914254/)
[![YouTube](https://img.shields.io/badge/YouTube-ARCADE%20WITH%20US-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@ARCADEWITHUS_We)

</div>

---

<div align="center">

**Built with ❤️ for the Google Cloud Arcade Community**

⭐ Star this repo if Arcade Buddy helped you track your progress!

*© 2026 Arcade Buddy · Not affiliated with Google LLC*

</div>
