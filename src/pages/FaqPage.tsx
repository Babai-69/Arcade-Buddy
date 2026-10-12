import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  HelpCircle,
  Gift,
  Zap,
  CheckCircle2,
  Award,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  Globe,
  Calendar,
  Layers,
  ArrowRight,
  X,
  Compass,
  MessageSquare
} from 'lucide-react';
import { BackToResourcesButton } from '../components/common/BackToResourcesButton';

export interface FAQItem {
  id: string;
  category: 'Swags & Prizes' | 'Points & Credits' | 'Eligibility & Enrolment' | 'Labs & Rules' | 'General & Support';
  question: string;
  answer: React.ReactNode;
  tags?: string[];
}

export const ALL_FAQS: FAQItem[] = [
  // --- Eligibility & Enrolment ---
  {
    id: "c1_1",
    category: "Eligibility & Enrolment",
    question: "What is the eligibility criteria for enrolling in the program?",
    tags: ["enrolment", "age", "laptop", "internet", "facilitator"],
    answer: (
      <div className="space-y-3">
        <p className="text-slate-700 dark:text-slate-300">
          You need to meet these requirements if you want to enrol in the program:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>You need to have access to a working internet connection &amp; a laptop with latest Google Chrome browser.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>You need to be above <strong>18 years of age</strong>.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>You must have been referred by any of the &ldquo;Facilitators&rdquo; that are part of the program or should get auto assigned to a &ldquo;Facilitator Team&rdquo; once enrolled.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>You are part of the countries supported under the Google Skills Terms of Service.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "c1_2",
    category: "Eligibility & Enrolment",
    question: "The enrolment form is closed. How should I enrol in the program?",
    tags: ["seats", "cohort", "closed", "form"],
    answer: (
      <div className="space-y-2.5">
        <p>
          Each cohort has strictly limited seats. If the enrolment form is closed, it means that the capacity of that cohort has been filled.
        </p>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
          💡 <strong>Tip:</strong> Keep an eye on the home page and official community posts for future cohort release dates and open registration windows.
        </div>
      </div>
    )
  },
  {
    id: "c1_3",
    category: "Eligibility & Enrolment",
    question: "I did not receive an invitation email after applying through the enrolment form. What should I do?",
    tags: ["email", "invitation", "spam", "delay"],
    answer: (
      <div className="space-y-3">
        <p>Here is what you can do to locate your onboarding details:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>Please wait for <strong>24&ndash;48 hours</strong> after submitting the form as emails are queued and dispatched in automated batches.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>Check your email under <strong>SPAM, JUNK, or PROMOTIONS</strong> folders. Filters frequently miscategorize high-volume announcements.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <span>Reach out directly to your designated Facilitator or campus lead; they can verify your submission status in the cohort roster.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "c1_4",
    category: "Eligibility & Enrolment",
    question: "I need to make some changes to my registration details in the enrolment form, but it's closed now? What should I do?",
    tags: ["changes", "email edit", "form", "corrections"],
    answer: (
      <div className="space-y-2.5">
        <p>
          Once an enrolment form has closed, seats are locked and self-service edits are disabled to prevent duplicate allocations.
        </p>
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-xs sm:text-sm">
          ⚠️ <strong>Strict Rule:</strong> Email ID changes are <strong>NOT allowed</strong> under any circumstances once the form closes. You may only contact your facilitator for minor profile URL adjustments.
        </div>
      </div>
    )
  },
  {
    id: "c1_5",
    category: "Eligibility & Enrolment",
    question: "The links are not working in my enrolment email. What should I do?",
    tags: ["links", "broken link", "url", "copy paste"],
    answer: (
      <p>
        Sometimes due to security configurations or email client wrappers, hyperlinks in onboarding emails can break. You can simply <strong>copy and paste the plain text URLs</strong> printed beside each link directly into your browser address bar.
      </p>
    )
  },
  {
    id: "c1_6",
    category: "General & Support",
    question: "I have more questions about the Google Skills Arcade, where can I find them?",
    tags: ["arcade official", "faq", "cloudskillsboost"],
    answer: (
      <div className="space-y-3">
        <p>
          You can check the official Google Skills Arcade FAQ directory on the main platform portal. Scroll down to the bottom of the landing page:
        </p>
        <a
          href="https://go.cloudskillsboost.google/arcade"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
        >
          <span>Visit go.cloudskillsboost.google/arcade</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  },

  // --- Eligibility & Enrolment (Continued) ---
  {
    id: "c2_1",
    category: "Eligibility & Enrolment",
    question: "If I have already participated in last year's cohort of the program, can I participate in this year's cohort as well?",
    tags: ["returning participant", "previous cohort", "same email"],
    answer: (
      <p>
        <strong>Yes, you CAN!</strong> We encourage you to participate in the program using the <strong>same email address</strong> that you used last time so that your learning history and account continuity stay unified.
      </p>
    )
  },
  {
    id: "c2_2",
    category: "Eligibility & Enrolment",
    question: "Are users who participated or are participating in any other cloud campaigns or Arcade individually eligible?",
    tags: ["campaigns", "indonesia", "india", "eligibility"],
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Yes!</strong> You can participate in the program as long as your badge completions fall within the official program timeframe.
        </p>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          📌 <em>Regional Exclusion Rule:</em> Anyone participating in the Arcade Facilitator Indonesia cohort is <strong>NOT eligible</strong> to participate in the Arcade Facilitator India Cohort, and vice versa.
        </div>
      </div>
    )
  },
  {
    id: "c2_3",
    category: "Eligibility & Enrolment",
    question: "I have already completed the skill badges or games in the past. What should I do?",
    tags: ["past badges", "new account", "completion dates"],
    answer: (
      <div className="space-y-2.5">
        <p>
          To qualify for milestone points and prizes, badges and games must be completed strictly <strong>within the official season window</strong>. Badges earned prior to the cohort start date do not count.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          💡 If you have completed most badges already, you may create a fresh Google Skills account with a new email ID and enrol in the cohort using that new ID.
        </p>
      </div>
    )
  },
  {
    id: "c2_4",
    category: "Eligibility & Enrolment",
    question: "I am part of a Google Cloud Partner organization or doing custom org badges. Can I participate?",
    tags: ["partner", "corporate", "personal email"],
    answer: (
      <div className="space-y-2.5">
        <p>
          You can participate in your own personal capacity! We recommend joining using a <strong>personal email ID</strong> rather than corporate accounts.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Because the Arcade Facilitator initiative is a public community program, it only monitors badges from the public Google Skills catalog. Private corporate badge tracks are not recognized.
        </p>
      </div>
    )
  },

  // --- Points & Credits ---
  {
    id: "c2_5",
    category: "Points & Credits",
    question: "I have achieved all the milestones in the program. Will I get the Bonus Points associated with each of them?",
    tags: ["bonus points", "milestone stack", "audit"],
    answer: (
      <div className="space-y-2.5">
        <p>
          Bonus points do <strong>not stack cumulatively</strong> across Milestone 1, 2, 3, and 4. You are awarded the bonus points corresponding to the <strong>single highest milestone</strong> you attain at final evaluation.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <em>Exception:</em> The separate <strong>Bonus Milestone</strong> (+10 pts) does stack directly on top of your highest milestone tier!
        </p>
      </div>
    )
  },

  // --- Swags & Prizes ---
  {
    id: "c2_6",
    category: "Swags & Prizes",
    question: "I have completed few/all of the milestones. When will I get my prizes?",
    tags: ["prize counter", "timeline", "january 2027", "redemption"],
    answer: (
      <div className="space-y-3">
        <p>
          Once you have earned enough Arcade points, prizes are claimed when the official <strong>Arcade Prize Counter opens in January 2027</strong>.
        </p>
        <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 text-xs sm:text-sm">
          🎁 You will receive a redemption order link to select your physical swag tier. Until the counter opens, keep accumulating more badges to reach higher swag tiers!
        </div>
      </div>
    )
  },
  {
    id: "c2_7",
    category: "Swags & Prizes",
    question: "Where will the schwags be delivered — to my personal address?",
    tags: ["delivery", "address", "shipping time", "home delivery"],
    answer: (
      <div className="space-y-2.5">
        <p>
          <strong>Yes, directly to your door!</strong> You will be prompted to enter your preferred delivery address and contact phone number at the time of placing your prize order.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          ⏱️ It typically takes <strong>8 to 12 weeks</strong> for physical prize shipments to arrive once your order is processed.
        </p>
      </div>
    )
  },
  {
    id: "c2_8",
    category: "Swags & Prizes",
    question: "Is my country eligible for shipping prizes?",
    tags: ["sanctions", "shipping countries", "customs", "delivery"],
    answer: (
      <div className="space-y-3">
        <p>
          Prizes ship globally to almost all countries where Google Skills operates. However, shipments cannot be delivered to territories subject to US Treasury Sanctions.
        </p>
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-xs">
          <strong>Restricted Destinations:</strong> Pakistan, Bangladesh, Iraq, Iran, North Korea, Crimea, Cuba, Sevastopol city, and Syria cannot receive physical merchandise shipments. Participants in these regions may decline prizes or provide an alternate eligible address where permitted.
        </div>
      </div>
    )
  },
  {
    id: "c2_9",
    category: "Swags & Prizes",
    question: "Will users receive any certificate after completing any milestone in the program?",
    tags: ["certificate", "digital badge", "accreditation"],
    answer: (
      <p>
        Digital badges from Google are automatically minted on your public Google Skills profile for every completed quest, game, and skill badge. <strong>There are no paper or separate PDF certificates</strong>; your shareable digital credentials act as your official verified proof of achievement.
      </p>
    )
  },

  // --- Points & Credits (Continued) ---
  {
    id: "new_10",
    category: "Points & Credits",
    question: "How many points will I get when I complete a skill badge?",
    tags: ["conversion", "skill badge", "2 badges 1 point"],
    answer: (
      <div className="space-y-2.5">
        <p className="font-semibold text-blue-600 dark:text-blue-400">
          2 Skill Badges = 1 Arcade Point
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          For every 2 completed Skill Badges, you earn 1 point. For 4 badges you earn 2 points, for 6 badges you earn 3 points, and so forth.
        </p>
      </div>
    )
  },
  {
    id: "new_11",
    category: "Points & Credits",
    question: "I have earned only 1 skill badge. How many points will I get?",
    tags: ["single badge", "half point", "pair requirement"],
    answer: (
      <p>
        Earning only 1 Skill Badge is not sufficient to claim a point. You must complete at least <strong>2 Skill Badges</strong> to unlock your first point, as skill badges are redeemed in pairs.
      </p>
    )
  },
  {
    id: "new_12",
    category: "Swags & Prizes",
    question: "Will I receive any swags or physical certificates for the games?",
    tags: ["game points", "arcade point", "digital badge"],
    answer: (
      <p>
        Completing a game awards you a special digital badge on your Google Skills profile plus <strong>1 full Arcade Point</strong>. Points accumulate towards physical swag boxes at the Prize Counter.
      </p>
    )
  },
  {
    id: "new_13",
    category: "Swags & Prizes",
    question: "Are there prizes? What are the prizes?",
    tags: ["swag items", "hoodie", "backpack", "t-shirt", "bottle"],
    answer: (
      <p>
        <strong>Yes, genuine Google Cloud gear!</strong> Prizes range from custom t-shirts, caps, water bottles, and sticker packs up to premium backpacks, varsity jackets, mechanical keyboards, and tech gadgets in higher tiers.
      </p>
    )
  },
  {
    id: "new_14",
    category: "Swags & Prizes",
    question: "Do I get a prize as soon as I earn a badge?",
    tags: ["instant prize", "waiting", "prize counter"],
    answer: (
      <p>
        No, prizes are not dispatched instantly upon badge completion. Your points accumulate throughout the season until the <strong>Prize Counter opens in January 2027</strong>.
      </p>
    )
  },
  {
    id: "new_15",
    category: "Swags & Prizes",
    question: "When does the prize counter open?",
    tags: ["prize counter date", "january 2027", "schedule"],
    answer: (
      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
        🎉 <strong>Scheduled Window:</strong> The official Arcade Prize Counter is slated to open in <strong>early January 2027</strong> (approx. Jan 7&ndash;14, 2027). You will receive an invitation email on your registered Google Skills Boost email address.
      </div>
    )
  },
  {
    id: "new_16",
    category: "Swags & Prizes",
    question: "What do I have to do to get a prize?",
    tags: ["how to get prize", "steps", "activate arcade"],
    answer: (
      <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
        <li>Subscribe to the Google Cloud Arcade using your Skills account.</li>
        <li>Join games, complete hands-on labs, and earn Skill Badges.</li>
        <li>Each game earns 1 pt; every 2 skill badges earn 1 pt.</li>
        <li>Log into the Prize Counter when it opens and claim your swag tier!</li>
      </ol>
    )
  },
  {
    id: "new_17",
    category: "Swags & Prizes",
    question: "How will I know when the prize counter opens?",
    tags: ["notification", "announcement", "forum", "email"],
    answer: (
      <p>
        You will receive an official notification via email, community posts on the <strong>Google Cloud Community Forum</strong>, and telegram/campus facilitator alerts as soon as the redemption window goes live.
      </p>
    )
  },
  {
    id: "new_18",
    category: "Points & Credits",
    question: "How do arcade points work and do they expire?",
    tags: ["points expiry", "6 months", "arcade points"],
    answer: (
      <div className="space-y-2">
        <p>
          You receive 1 point per eligible game/trivia badge and 0.5 points per skill badge.
        </p>
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
          ⚠️ <strong>Notice:</strong> Points are valid for <strong>6 months</strong> from the date of the season. Ensure you redeem them before the window closes: <em>use it, don&apos;t lose it!</em>
        </div>
      </div>
    )
  },
  {
    id: "new_19",
    category: "Points & Credits",
    question: "How do I know how many arcade points I have?",
    tags: ["calculate points", "calculator", "profile"],
    answer: (
      <div className="space-y-2.5">
        <p>
          Compare your completed badges on your public Google Skills profile with the eligible games catalog.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          💡 You can also use our interactive <strong>Calculator tab</strong> on this site to automatically simulate and track your points.
        </p>
      </div>
    )
  },
  {
    id: "new_20",
    category: "Points & Credits",
    question: "How can I get more arcade points?",
    tags: ["more points", "tips", "play games"],
    answer: (
      <p>
        Play new games as they launch each month, participate in seasonal Trivia challenges, and complete Skill Badges from the syllabus! The more you learn, the more you earn.
      </p>
    )
  },
  {
    id: "new_21",
    category: "Labs & Rules",
    question: "What are the upcoming arcade games?",
    tags: ["upcoming", "schedule", "new games"],
    answer: (
      <p>
        Arcade games launch in monthly waves (Level 1, Level 2, Basecamp, and Trivia). Keep an eye on our <strong>Games directory</strong> and the official Google Cloud Community portal for drop dates.
      </p>
    )
  },
  {
    id: "new_22",
    category: "Swags & Prizes",
    question: "I don't want a prize. Can I still play?",
    tags: ["optional", "learning only", "no prize"],
    answer: (
      <p>
        <strong>Yes!</strong> Participating in games and earning skill badges is open to all learners solely for skill building and certification readiness. Swag redemption is completely optional.
      </p>
    )
  },
  {
    id: "new_23",
    category: "Points & Credits",
    question: "What is the cost? Do I need quarters or money?",
    tags: ["cost", "free", "no charge", "credits"],
    answer: (
      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
        There is zero financial cost to participate! Google Cloud Arcade games and promotional passes are 100% free with no quarters or credit cards needed.
      </p>
    )
  },
  {
    id: "new_24",
    category: "Eligibility & Enrolment",
    question: "Can I participate if I'm already in another Google program (e.g. Innovators, DevFest, Study Jams)?",
    tags: ["other programs", "innovators", "devfest"],
    answer: (
      <p>
        <strong>Yes!</strong> You may participate across multiple developer initiatives simultaneously, provided you abide by each program&apos;s independent requirements.
      </p>
    )
  },
  {
    id: "new_25",
    category: "Eligibility & Enrolment",
    question: "Can I participate if I'm located outside India or Indonesia?",
    tags: ["country", "global", "terms of service"],
    answer: (
      <p>
        Yes, anyone worldwide may participate in the standard Google Cloud Arcade as long as your location complies with the Google Skills Terms of Service.
      </p>
    )
  },
  {
    id: "new_26",
    category: "Swags & Prizes",
    question: "What about sending prizes to my specific country of residence?",
    tags: ["shipping", "residence", "customs"],
    answer: (
      <p>
        Google ships merchandise globally, with exceptions strictly limited to US Treasury sanctioned locations (Syria, North Korea, Iran, Cuba, Crimea/Sevastopol, etc.).
      </p>
    )
  },
  {
    id: "new_27",
    category: "Labs & Rules",
    question: "What if a lab isn't working or throws a quota error?",
    tags: ["broken lab", "support", "chat", "quota"],
    answer: (
      <div className="space-y-2.5">
        <p>
          First, end the lab, wait 3 minutes, and restart in an Incognito window.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          If an issue persists, click the <strong>&ldquo;Support / Chat&rdquo;</strong> icon inside the Google Cloud Skills Boost lab interface. Live operators are available 24/7 to resolve infrastructure issues.
        </p>
      </div>
    )
  },
  {
    id: "new_28",
    category: "Labs & Rules",
    question: "What if there are no more seats in a game?",
    tags: ["seats full", "capacity", "waitlist"],
    answer: (
      <p>
        Game access is allocated on a first-come, first-served basis. If a game fills up, additional seats frequently open during scheduled mid-month expansions, so check back regularly!
      </p>
    )
  },
  {
    id: "new_29",
    category: "Labs & Rules",
    question: "How does Google Skills Arcade ensure a safe and supportive community?",
    tags: ["safety", "community standards", "respect"],
    answer: (
      <p>
        The platform enforces community guidelines prohibiting harassment, unfair practices, and malicious scripts, fostering a collaborative and fair environment for all learners.
      </p>
    )
  },
  {
    id: "new_30",
    category: "Labs & Rules",
    question: "How can I ensure my participation is meaningful and aligned with the program goals?",
    tags: ["learning", "integrity", "best practice"],
    answer: (
      <p>
        Focus on genuine learning rather than copy-pasting commands. Understand the underlying Google Cloud services (BigQuery, IAM, Kubernetes, Vertex AI) to build marketable career skills.
      </p>
    )
  },
  {
    id: "new_31",
    category: "Labs & Rules",
    question: "What should I do if I suspect someone is using unfair practices or automated bots?",
    tags: ["report", "bots", "unfair", "cheating"],
    answer: (
      <p>
        You can submit a confidential report to the Google Cloud Communities moderation team. Every report is audited using server logs to protect honest learners.
      </p>
    )
  },
  {
    id: "new_32",
    category: "Labs & Rules",
    question: "Are there any learning resources available to help me complete labs?",
    tags: ["lab help", "documentation", "hints"],
    answer: (
      <p>
        Official lab instructions provide step-by-step guidance. You can also consult Google Cloud Documentation, Arcade Solution walkthroughs, and community study sessions.
      </p>
    )
  },
  {
    id: "new_33",
    category: "Labs & Rules",
    question: "Can I appeal a disqualification decision?",
    tags: ["appeal", "disqualification", "support"],
    answer: (
      <p>
        Yes. If you believe your account was flagged erroneously, contact Google Skills Boost support with your account email and relevant lab session IDs for manual review.
      </p>
    )
  },
  {
    id: "new_34",
    category: "Labs & Rules",
    question: "How does Google Skills Arcade handle violations of its policies?",
    tags: ["violations", "scripts", "ban", "disqualification"],
    answer: (
      <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-xs sm:text-sm">
        🚫 <strong>Zero Tolerance:</strong> Using automation scripts, credential sharing, or multi-account botting leads to immediate disqualification and permanent forfeiture of all accumulated swag points.
      </div>
    )
  },
  {
    id: "new_35",
    category: "Labs & Rules",
    question: "I've never used Google Skills Boost before. How do I get oriented?",
    tags: ["beginner", "orientation", "first lab"],
    answer: (
      <p>
        Welcome! Start with the free lab <em>&ldquo;A Tour of Google Cloud Hands-on Labs&rdquo; (GSP282)</em>. It walks you through starting a lab, accessing the temporary console, and ending your session properly.
      </p>
    )
  },
  {
    id: "new_36",
    category: "Points & Credits",
    question: "Are Arcade Facilitator Milestones different from the Google Skills Arcade Player achievements?",
    tags: ["facilitator vs player", "bonus stack", "milestones"],
    answer: (
      <div className="space-y-2.5">
        <p>
          <strong>Yes, they are distinct tracks!</strong> Facilitator Milestones are specific cohort goals that reward extra <strong>Bonus Points</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Bonus points earned through Facilitator Milestones are combined with your base Arcade points at the end of the cohort to determine your final swag tier.
        </p>
      </div>
    )
  },
  {
    id: "new_37",
    category: "Swags & Prizes",
    question: "Will there be more swag items in the Arcade?",
    tags: ["swag drops", "surprise", "merchandise"],
    answer: (
      <p>
        <strong>Yes!</strong> Google frequently adds surprise swag drops and seasonal items to the prize counter lineup before the ordering window goes live.
      </p>
    )
  },
  {
    id: "new_38",
    category: "Labs & Rules",
    question: "I already completed a few labs from this game in the past; do I need to redo them, or will my past completions automatically sync?",
    tags: ["sync past labs", "redo", "game completion"],
    answer: (
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
        ⚠️ <strong>Important:</strong> Game environments are isolated. Even if you previously finished a lab elsewhere, you must <strong>complete all labs inside the active game challenge</strong> during the active game window to earn that game badge.
      </div>
    )
  },
  {
    id: "new_39",
    category: "Points & Credits",
    question: "Can I share or gift my Arcade points to someone else?",
    tags: ["transfer points", "gift", "account bound"],
    answer: (
      <p>
        <strong>No.</strong> Arcade points are strictly tied to your personal Google Skills Boost learning record and cannot be transferred, gifted, or pooled across accounts.
      </p>
    )
  }
];

type CategoryFilter = 'All' | 'Swags & Prizes' | 'Points & Credits' | 'Eligibility & Enrolment' | 'Labs & Rules' | 'General & Support';

const CATEGORY_CONFIG: Record<
  CategoryFilter,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeStyle: string;
    description: string;
  }
> = {
  All: {
    label: 'All Questions',
    icon: Layers,
    accentColor: '#1a73e8',
    badgeStyle: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
    description: 'Browse all 45 verified answers across the entire program'
  },
  'Swags & Prizes': {
    label: 'Swags & Prizes',
    icon: Gift,
    accentColor: '#ea4335',
    badgeStyle: 'bg-red-500 text-white',
    description: 'Prize counter dates, delivery guidelines, and swag tiers'
  },
  'Points & Credits': {
    label: 'Points & Credits',
    icon: Zap,
    accentColor: '#fbbc05',
    badgeStyle: 'bg-amber-500 text-white',
    description: 'Conversion rates (2 badges = 1 pt), bonus stacking, and costs'
  },
  'Eligibility & Enrolment': {
    label: 'Eligibility & Enrolment',
    icon: CheckCircle2,
    accentColor: '#34a853',
    badgeStyle: 'bg-emerald-600 text-white',
    description: 'Cohort dates, facilitator referrals, and account rules'
  },
  'Labs & Rules': {
    label: 'Labs & Rules',
    icon: Award,
    accentColor: '#1a73e8',
    badgeStyle: 'bg-blue-600 text-white',
    description: 'Lab errors, game seats, integrity policies, and appeals'
  },
  'General & Support': {
    label: 'General & Support',
    icon: MessageCircle,
    accentColor: '#8b5cf6',
    badgeStyle: 'bg-purple-600 text-white',
    description: 'Official forums, support links, and community channels'
  }
};

const POPULAR_FAQS = [
  {
    id: 'new_15',
    title: 'When does the Prize Counter open?',
    category: 'Swags & Prizes',
    snippet: 'Slated for early January 2027 with invitation emails sent directly.'
  },
  {
    id: 'new_10',
    title: 'How do 2 Skill Badges convert into 1 Point?',
    category: 'Points & Credits',
    snippet: 'Every 2 completed skill badges equal 1 full Arcade point.'
  },
  {
    id: 'c2_7',
    title: 'Where will schwags be delivered?',
    category: 'Swags & Prizes',
    snippet: 'Delivered directly to your personal home address in 8–12 weeks.'
  },
  {
    id: 'new_38',
    title: 'Do past lab completions sync automatically?',
    category: 'Labs & Rules',
    snippet: 'No, all labs must be completed inside the active game challenge.'
  }
];

export function FaqPage() {
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['new_15', 'new_10']));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down'>>(() => {
    try {
      const saved = localStorage.getItem('arcade_faq_votes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Handle URL hash on load or change (e.g. /faq#c2_6)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const exists = ALL_FAQS.some(f => f.id === targetId);
      if (exists) {
        setOpenIds(prev => new Set([...prev, targetId]));
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    }
  }, [location.hash]);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const all = new Set(filteredFaqs.map(f => f.id));
    setOpenIds(all);
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleVote = (e: React.MouseEvent, id: string, type: 'up' | 'down') => {
    e.stopPropagation();
    setVotes(prev => {
      const updated = { ...prev, [id]: prev[id] === type ? undefined : type };
      try {
        localStorage.setItem('arcade_faq_votes', JSON.stringify(updated));
      } catch {}
      return updated as Record<string, 'up' | 'down'>;
    });
  };

  // Filter logic
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_FAQS.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      const qMatch = item.question.toLowerCase().includes(query);
      const tagMatch = item.tags?.some(t => t.toLowerCase().includes(query));
      const idMatch = item.id.toLowerCase().includes(query);
      const answerText = typeof item.answer === 'string' ? item.answer.toLowerCase() : '';
      const aMatch = answerText.includes(query);

      return qMatch || tagMatch || idMatch || aMatch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      All: ALL_FAQS.length,
      'Swags & Prizes': 0,
      'Points & Credits': 0,
      'Eligibility & Enrolment': 0,
      'Labs & Rules': 0,
      'General & Support': 0
    };
    ALL_FAQS.forEach(item => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, []);

  return (
    <div className="w-full min-h-screen pb-24 text-slate-800 dark:text-slate-100">
      {/* Top 4-Color RGBY Stripe */}
      <div
        className="w-full h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]"
        aria-hidden="true"
      />

      {/* Scoped High-Contrast Typography Styles for FAQ Answers */}
      <style>{`
        .faq-answer-content {
          color: #334155;
        }
        .faq-answer-content strong {
          color: #0f172a;
        }
        .dark .faq-answer-content {
          color: #e2e8f0 !important;
        }
        .dark .faq-answer-content p {
          color: #e2e8f0 !important;
        }
        .dark .faq-answer-content li {
          color: #e2e8f0 !important;
        }
        .dark .faq-answer-content span:not([class*="bg-"]):not([class*="text-red"]):not([class*="text-emerald"]):not([class*="text-amber"]):not([class*="text-blue"]):not([class*="text-purple"]) {
          color: #e2e8f0;
        }
        .dark .faq-answer-content strong {
          color: #ffffff !important;
          font-weight: 700;
        }
        .dark .faq-answer-content em {
          color: #cbd5e1;
        }
        .dark .faq-answer-content kbd {
          color: #f1f5f9 !important;
          background-color: #1e293b !important;
          border-color: #334155 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <BackToResourcesButton
            label="Back to Resources"
            to="/resources"
            handwrittenNote="45 verified answers from official guidelines ✨"
          />

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Official 2026/2027 Guidelines</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO BANNER: Neo-Brutalist Google Cloud Header */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 md:p-12 mb-10 bg-gradient-to-br from-slate-900 via-[#111827] to-[#1e1b4b] text-white shadow-2xl border border-slate-800">
          {/* Subtle Google colored decorative blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide uppercase text-amber-300 mb-4">
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Help Center &amp; Resolution Directory</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4 leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-amber-300">Questions</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
              Everything you need to know about Google Cloud Arcade points calculation, Prize Counter timelines, shipping rules, bonus milestones, and lab guidelines.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword, badge name, or clause ID (e.g. Prize Counter, 2 badges, shipping)..."
                className="w-full pl-12 sm:pl-13 pr-24 py-4 sm:py-4.5 rounded-2xl bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-medium border-2 border-transparent focus:border-blue-500 focus:outline-none shadow-xl transition-all"
              />

              <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-slate-200/80 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  /
                </kbd>
              </div>
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Quick Searches:</span>
              {[
                'Prize Counter',
                '2 Skill Badges = 1 Pt',
                'Shipping Countries',
                'Bonus Multiplier',
                'Lab Not Working',
                'Telegram Group'
              ].map(keyword => (
                <button
                  key={keyword}
                  onClick={() => setSearchQuery(keyword)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors cursor-pointer"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* POPULAR HIGHLIGHT CARDS: 4 Most-Asked Right Now */}
        {/* ========================================================================= */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-display flex items-center gap-2 text-slate-900 dark:text-white">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Most Common Inquiries</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Instant Answers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_FAQS.map(card => (
              <div
                key={card.id}
                onClick={() => {
                  setOpenIds(prev => new Set([...prev, card.id]));
                  const el = document.getElementById(card.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                      {card.category}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">#{card.id}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {card.snippet}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Filter by Category
              </span>
            </div>

            {/* Expand / Collapse Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(Object.keys(CATEGORY_CONFIG) as CategoryFilter[]).map(catKey => {
              const cfg = CATEGORY_CONFIG[catKey];
              const Icon = cfg.icon;
              const count = categoryCounts[catKey];
              const isActive = activeCategory === catKey;

              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                      : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-inherit' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{cfg.label}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-black ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/10 text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FAQ LIST SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 mb-2">
            <span>
              Showing <strong>{filteredFaqs.length}</strong> of {ALL_FAQS.length} questions
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Reset Search
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-6 text-center rounded-3xl bg-white dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                No matching questions found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5">
                We couldn&apos;t find any answers matching &ldquo;{searchQuery}&rdquo;. Try using broader terms like &ldquo;points&rdquo;, &ldquo;shipping&rdquo;, or &ldquo;enrolment&rdquo;.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Clear Search Filter
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                >
                  View All FAQs
                </button>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIds.has(faq.id);
              const cfg = CATEGORY_CONFIG[faq.category];
              const CategoryIcon = cfg?.icon || HelpCircle;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white/90 dark:bg-slate-900/70 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  {/* Header / Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Left Category Icon Pill */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                          faq.category === 'Swags & Prizes'
                            ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-800'
                            : faq.category === 'Points & Credits'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                            : faq.category === 'Eligibility & Enrolment'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : faq.category === 'Labs & Rules'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                            : 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                        }`}
                      >
                        <CategoryIcon className="w-5 h-5" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                              faq.category === 'Swags & Prizes'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                : faq.category === 'Points & Credits'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                : faq.category === 'Eligibility & Enrolment'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                : faq.category === 'Labs & Rules'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
                            }`}
                          >
                            {faq.category}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                            #{faq.id}
                          </span>
                        </div>

                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                          isOpen
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rotate-180'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {/* Answer Content */}
                          <div className="pl-0 sm:pl-14 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed space-y-3.5 faq-answer-content">
                            {faq.answer}
                          </div>

                          {/* Footer with Copy Link & Feedback */}
                          <div className="pl-0 sm:pl-14 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                            {/* Copy Link to this question */}
                            <button
                              onClick={e => handleCopyLink(e, faq.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                              title="Copy direct anchor link to this question"
                            >
                              {copiedId === faq.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Share Question Link</span>
                                </>
                              )}
                            </button>

                            {/* Helpful vote */}
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                              <span>Was this helpful?</span>
                              <button
                                onClick={e => handleVote(e, faq.id, 'up')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  votes[faq.id] === 'up'
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
                                }`}
                                title="Helpful"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={e => handleVote(e, faq.id, 'down')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  votes[faq.id] === 'down'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
                                }`}
                                title="Not helpful"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* ========================================================================= */}
        {/* STILL HAVE QUESTIONS? ESCALATION & OFFICIAL CHANNELS GRID */}
        {/* ========================================================================= */}
        <div className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-8">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Need Further Assistance?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white mt-3">
              Still Have Questions or Facing Lab Blockers?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              If your query is not listed above, connect directly with official Google Cloud Community Managers, campus facilitators, and the 24/7 technical helpdesk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* 1. Official Arcade Website */}
            <a
              href="https://go.cloudskillsboost.google/arcade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-900/50 text-blue-400 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                  Official Arcade Portal
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Official rules, live game challenges, and point guidelines on Google Skills.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-400">
                <span>Visit Arcade</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 2. Developer Program Forum */}
            <a
              href="https://www.googlecloudcommunity.com/gc/Google-Cloud-Skills-Boost/bd-p/skills-boost"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                  Google Cloud Forums
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Ask Community Managers and peers for troubleshooting advice.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>Join Discussion</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 3. Interactive Calculator */}
            <a
              href="/calculator"
              className="p-5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-900/50 text-amber-400 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  Points Calculator
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Simulate your games and skill badges to see which swag tier you have hit.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 4. Support Desk */}
            <a
              href="https://skills.google/support"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-900/50 text-purple-400 flex items-center justify-center mb-3">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-purple-400 transition-colors">
                  Helpdesk Support
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  24/7 technical lab assistance, quota resets, and credential audits.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-purple-400">
                <span>Open Ticket</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
