import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
  dotenv.config();
} else if (fs.existsSync(path.resolve(process.cwd(), '.env.example'))) {
  dotenv.config({ path: '.env.example' });
}

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import cors from "cors";
import * as cheerio from "cheerio";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import nodemailer from "nodemailer";
import { SKILL_BADGES } from "./src/data/skillBadges";
import { gameBadges as syllabusGameBadges, skillBadges as syllabusSkillBadges } from "./src/data/badgesData";
import { getPageSEO } from "./src/data/pageSEO";

function injectPageMetadata(html: string, pathname: string, host: string, protocol: string) {
  try {
    const seo = getPageSEO(pathname);
    const origin = `${protocol}://${host}`;
    const fullUrl = `${origin}${pathname}`;
    const imageUrl = seo.image.startsWith('http') ? seo.image : `${origin}${seo.image.startsWith('/') ? '' : '/'}${seo.image}`;

    let updated = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
    updated = updated.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${seo.description}" />`);
    updated = updated.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${seo.title}" />`);
    updated = updated.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${seo.description}" />`);
    updated = updated.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />`);
    updated = updated.replace(/<meta property="og:image:alt" content=".*?"\s*\/?>/i, `<meta property="og:image:alt" content="${seo.imageAlt}" />`);
    updated = updated.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${seo.title}" />`);
    updated = updated.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${seo.description}" />`);
    updated = updated.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
    updated = updated.replace(/<meta name="twitter:image:alt" content=".*?"\s*\/?>/i, `<meta name="twitter:image:alt" content="${seo.imageAlt}" />`);

    const extraMeta = `
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:url" content="${fullUrl}" />`;

    return updated.replace('</head>', `${extraMeta}\n  </head>`);
  } catch (e) {
    return html;
  }
}

async function startServer() {
  // Check required env vars on startup
  const requiredEnvVars = [
    'GEMINI_API_KEY',
  ];

  const missingVars = requiredEnvVars.filter(
    v => !process.env[v]
  );

  if (missingVars.length > 0) {
    console.warn(
      `⚠️ Missing environment variables: ${missingVars.join(', ')}`
    );
    console.warn(
      'Some features may not work correctly.'
    );
  } else {
    console.log('✅ All required environment variables found');
  }
  const app = express();
  
  // Fix Firebase Auth popup cross-origin communication on strict hosts (e.g. Render/Cloudflare)
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
  });
  const PORT = process.env.NODE_ENV === 'production' && process.env.PORT ? Number(process.env.PORT) : 3000;

  app.set('trust proxy', 1);

  // Enable CORS with support for Vercel frontend, previews, and localhost
  const allowedOrigins = [
    'https://arcade-buddy.vercel.app',
    'https://arcade-buddy.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, mobile, curl)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https:\/\/arcade-buddy(-[a-z0-9-]+)?\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.onrender\.com$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  app.use(helmet({
    contentSecurityPolicy: false, // disabled for Vite to work properly in dev
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginEmbedderPolicy: false
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    validate: { xForwardedForHeader: false, default: true }
  });
  app.use('/api/', limiter);

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Health check endpoints for pinging and Render uptime monitoring
  app.get(["/health", "/api/health"], (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      status: "ok",
      service: "arcade-buddy",
      timestamp: new Date().toISOString()
    });
  });

  
  app.post("/api/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing!");
        return res.status(500).json({
          error: "API key not configured",
          reply: "Configuration error. Please contact the admin."
        });
      }

      const chatSchema = z.object({
        message: z.string().min(1).max(2000),
        history: z.array(z.any()).optional()
      });

      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid input" });
      }

      const { message, history } = parseResult.data;

      const systemInstruction = `You are GArcade Assistant, an expert AI guide for the Google Cloud Skills Boost Arcade Facilitator program 2026.

You help students with:
1. Understanding points and badge calculations
2. Milestone requirements and progress
3. How to find their public profile URL
4. Program timeline and rules
5. Tier system (Trooper/Ranger/Champion/Legend)

KEY KNOWLEDGE BASE:

POINTS SYSTEM:
- Skill Badges = 0.5 points each
- Game Badges = 1 point each
- Trivia Badges = 1 point each
- Lab-free Courses = 0.5 points each
- Special Badges = 1 points each (Recently updated)

TIER THRESHOLDS:
- Trooper: 50 points (6000 spots)
- Ranger: 75 points (4000 spots)
- Champion: 95 points (3000 spots)
- Legend: 120 points (2500 spots)

FACILITATOR MILESTONE REQUIREMENTS:
- Milestone 1: 6 Game + 18 Skill → +5 bonus pts
- Milestone 2: 12 Game + 26 Skill → +10 bonus pts
- Milestone 3: 20 Game + 40 Skill → +15 bonus pts
- Ultimate: 28 Game + 54 Skill → +25 bonus pts
- Ultimate Plus: 36 Game + 66 Skill → +35 bonus pts

PRIZE DETAILS:
- Legend → premium swag (hoodies, bottles, etc.)
- Champion → remaining premium gear
- Ranger → standard swag
- Trooper → foundational rewards

WEBSITE FEATURES:
- Calculator: enter profile URL to get points
- Leaderboard: see program rankings
- Badge Tracker: track Jul 13-Sep 14 badges
- Facilitator page: milestone progress
- Syllabus: active games + skill badges list

Keep responses concise and helpful.
Use emojis sparingly for clarity.
If asked about a profile URL, tell them to use the Calculator feature on the site.

If you don't know something or cannot find the answer, say so honestly and add exactly: "For further help, feel free to email us at 📧 abir.facilitator@gmail.com and we'll get back to you as soon as possible! or join the channel for more information link https://chat.whatsapp.com/IHPSoiWBJ6d4SZrY1yUDty"
Never make up point values or requirements.`;

      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction,
      });

      const chat = model.startChat({
        history: (() => {
          let formatted = [];
          for (const msg of history || []) {
            const role = msg.role === 'user' ? 'user' : 'model';
            const parts = [{ text: msg.content || " " }];
            if (formatted.length === 0) {
              if (role === 'user') formatted.push({ role, parts });
            } else if (formatted[formatted.length - 1].role !== role) {
              formatted.push({ role, parts });
            } else {
              formatted[formatted.length - 1].parts[0].text += "\n" + parts[0].text;
            }
          }
          return formatted;
        })(),
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(message);
      const reply = result.response.text();

      return res.json({ reply });
    } catch (error: any) {
      console.error("Chat API error:", error.message);
      if (
        error.message?.includes('429') ||
        error.message?.includes('quota') ||
        error.message?.includes('Too Many Requests')
      ) {
        return res.status(200).json({
          reply: "I am receiving too many requests right now. Please wait a moment and try again! For urgent help email: 📧 abir.facilitator@gmail.com"
        });
      }
      return res.status(500).json({
        error: "Internal Server Error",
        reply: "Sorry, I am having trouble connecting right now. Please try again in a moment!"
      });
    }
  });

app.post("/api/notify-query", async (req, res) => {
    try {
      const querySchema = z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        profileUrl: z.string().url().optional().or(z.literal('')),
        queryType: z.string().min(1).max(100),
        message: z.string().min(1).max(5000),
        attachments: z.array(z.any()).optional()
      });

      const parseResult = querySchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }

      const { name, email, profileUrl, queryType, message, attachments } = parseResult.data;
      
      const smtpUser = process.env.SMTP_USER || "support.arcadebuddy@gmail.com";
      const smtpPass = process.env.SMTP_PASS || "suhzmteebcfbisgg";

      if (!smtpUser || !smtpPass) {
        return res.json({ success: true, emailSent: false, message: 'SMTP credentials not configured on server. Query saved to database.' });
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: smtpUser,
        to: [smtpUser, email].filter(Boolean).join(", "), // Send to self/admin and user
        replyTo: email,
        subject: `[Support Query] ${queryType} - ${name}`,
        html: `
          <h2>New Support Query</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Profile URL:</strong> <a href="${profileUrl}">${profileUrl}</a></p>
          <p><strong>Query Type:</strong> ${queryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        attachments: attachments ? attachments.map((att: any) => ({
          filename: att.filename,
          content: att.content,
          encoding: 'base64'
        })) : []
      };

      // Send email
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, emailSent: true });
    } catch (error: any) {
      console.error('Failed to process request:', error);
      res.status(500).json({ success: false, message: "An internal error occurred while processing the request." });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const feedbackSchema = z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        rating: z.number().min(1).max(5),
        review: z.string().min(1).max(5000)
      });
      
      const parseResult = feedbackSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }
      
      const { name, email, rating, review } = parseResult.data;
      
      const smtpUser = process.env.SMTP_USER || "support.arcadebuddy@gmail.com";
      const smtpPass = process.env.SMTP_PASS || "suhzmteebcfbisgg";

      if (!smtpUser || !smtpPass) {
        return res.json({ success: true, emailSent: false, message: 'SMTP credentials not configured on server. Feedback saved to database.' });
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: smtpUser,
        to: smtpUser, // Send to admin
        replyTo: email,
        subject: `[Arcade Feedback] ${rating}/5 Stars - ${name}`,
        html: `
          <h2>New Platform Feedback</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Rating:</strong> ${rating} / 5</p>
          <p><strong>Review:</strong></p>
          <p>${review}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      return res.json({ success: true, emailSent: true });
    } catch (error: any) {
      console.error('Failed to process feedback:', error);
      res.status(500).json({ success: false, message: "An internal error occurred while processing feedback." });
    }
  });

  // Background scraper for Arcade spots
  let cachedSpots = {
    lastUpdated: null as string | null,
    data: {
      trooper:  { spotsLeft: 5227, total: 6000 },
      ranger:   { spotsLeft: 3927, total: 4000 },
      champion: { spotsLeft: 2989, total: 3000 },
      legend:   { spotsLeft: 2500, total: 2500 }
    },
    rawSpotsLeft: {} as Record<string, { text: string, percent: string }>
  };

  const DB_FILE = path.join(process.cwd(), 'milestones.json');
  try {
    if (fs.existsSync(DB_FILE)) {
      cachedSpots = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error("Failed to load milestones db:", e);
  }

  async function scrapeArcadeSpots() {
    try {
      const response = await fetch('https://go.cloudskillsboost.google/arcade');
      let html = await response.text();
      html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      const $ = cheerio.load(html);
      
      let updated = false;
      const newData = JSON.parse(JSON.stringify(cachedSpots.data));
      const newRawSpots = JSON.parse(JSON.stringify(cachedSpots.rawSpotsLeft || {}));

      // A resilient selector strategy: find any element that looks like a tier card
      // by looking for the milestone names, and then finding the spots fraction.
      const contentText = $("body").text();
      
      const milestonesToMatch = [
        { name: "Trooper", key: "trooper", milestoneKey: "milestone-1" },
        { name: "Ranger", key: "ranger", milestoneKey: "milestone-2" },
        { name: "Champion", key: "champion", milestoneKey: "milestone-3" },
        { name: "Legend", key: "legend", milestoneKey: "milestone-4" }
      ];

      // fallback class-based search first (fastest)
      let foundViaClasses = false;
      $(".tier-card, .card").each((i, el) => {
         const text = $(el).text();
         for (const tier of milestonesToMatch) {
            if (text.toLowerCase().includes(tier.name.toLowerCase())) {
               // find fraction like "5,227 / 6,000"
               const match = text.match(/([\d,]+)\s*\/\s*([\d,]+)/);
               if (match) {
                 newData[tier.key] = {
                   spotsLeft: parseInt(match[1].replace(/,/g, ''), 10),
                   total: parseInt(match[2].replace(/,/g, ''), 10)
                 };
                 // get percent text if available, e.g. "87%"
                 const pctMatch = text.match(/(\d+)%/);
                 newRawSpots[tier.milestoneKey] = { 
                   text: match[0], 
                   percent: pctMatch ? pctMatch[0] : '' 
                 };
                 updated = true;
                 foundViaClasses = true;
               }
            }
         }
      });

      // if completely failed to find via cards, try regex over whole body
      if (!foundViaClasses) {
         for (const tier of milestonesToMatch) {
            // Very naive regex looking for the milestone name followed closely by a fraction
            const regex = new RegExp(`${tier.name}[\\s\\S]{0,200}?([\\d,]+)\\s*\\/\\s*([\\d,]+)`, 'i');
            const match = contentText.match(regex);
            if (match) {
               newData[tier.key] = {
                 spotsLeft: parseInt(match[1].replace(/,/g, ''), 10),
                 total: parseInt(match[2].replace(/,/g, ''), 10)
               };
               newRawSpots[tier.milestoneKey] = { text: `${match[1]} / ${match[2]}`, percent: '' };
               updated = true;
            }
         }
      }

      if (updated) {
        cachedSpots.data = newData;
        cachedSpots.rawSpotsLeft = newRawSpots;
        cachedSpots.lastUpdated = new Date().toISOString();
        fs.writeFileSync(DB_FILE, JSON.stringify(cachedSpots, null, 2), 'utf8');
        console.log(`[Scraper] Successfully updated spots at ${cachedSpots.lastUpdated}`);
      }
    } catch (err) {
      console.error("[Scraper] Failed to scrape arcade spots:", err);
    }
  }

  // Run scraper immediately, then every 2 hours
  scrapeArcadeSpots();
  setInterval(scrapeArcadeSpots, 2 * 60 * 60 * 1000);

  app.get("/api/arcade-spots", async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json({
      ...cachedSpots.data,
      last_updated_at: cachedSpots.lastUpdated
    });
  });

  app.get("/api/calculator", async (req, res) => {
    let { url, startDate, endDate } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing required 'url' query parameter" });
    }

    const rawUrl = url.trim();

    // 1. SSRF Protection & URL format validation
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL format. Please provide a valid HTTP/HTTPS URL." });
    }

    const allowedHosts = [
      'www.skills.google',
      'skills.google',
      'www.cloudskillsboost.google',
      'cloudskillsboost.google'
    ];

    const hostnameLower = parsedUrl.hostname.toLowerCase();
    if (!allowedHosts.includes(hostnameLower)) {
      return res.status(400).json({
        error: `Invalid domain '${parsedUrl.hostname}'. Profile URL host must be www.skills.google or cloudskillsboost.google.`
      });
    }

    if (!parsedUrl.pathname.startsWith('/public_profiles/')) {
      return res.status(400).json({
        error: "Invalid profile URL path. Path must begin with '/public_profiles/<id>'."
      });
    }

    const profileId = parsedUrl.pathname.replace(/^\/public_profiles\//, '').replace(/\/$/, '').trim();
    if (!profileId || profileId.length < 3) {
      return res.status(400).json({
        error: "Invalid profile ID. Profile path must include a valid profile identifier."
      });
    }

    // Construct upstream URL on cloudskillsboost.google CDN
    const upstreamUrl = `https://www.cloudskillsboost.google/public_profiles/${encodeURIComponent(profileId)}`;

    const ARCADE_START_DATE = new Date('2026-01-01T00:00:00Z');
    const ARCADE_END_DATE = new Date('2026-12-31T23:59:59Z');
    const FACILITATOR_START_DATE = startDate ? new Date(startDate as string) : new Date('2026-07-13T00:00:00Z');
    const FACILITATOR_END_DATE = endDate ? new Date(endDate as string) : new Date('2026-09-14T18:29:00Z');

    try {
      console.log(`[Scraper] Fetching upstream profile: ${upstreamUrl}`);

      const response = await fetch(upstreamUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: AbortSignal.timeout(25000)
      });

      const status = response.status;
      const html = await response.text();

      // Log status, response length, and the first 200 characters of the upstream response on server for debugging
      console.log(`[Scraper] Upstream status: ${status}, length: ${html.length}, preview: ${JSON.stringify(html.slice(0, 200))}`);

      // Distinct HTTP status codes
      if (status === 404) {
        return res.status(404).json({
          error: "Profile not found on Google Cloud Skills Boost. Please verify your profile ID/URL."
        });
      }

      if (status === 403) {
        return res.status(403).json({
          error: "Access blocked by skills.google (HTTP 403 Forbidden). Upstream rate-limiting or security check active."
        });
      }

      if (status === 429) {
        return res.status(429).json({
          error: "Rate-limited by skills.google (HTTP 429 Too Many Requests). Please wait a moment and try again."
        });
      }

      if (status >= 500) {
        return res.status(502).json({
          error: `Upstream error from skills.google (HTTP ${status}). Google Cloud Skills Boost is temporarily unavailable.`
        });
      }

      if (!response.ok) {
        return res.status(502).json({
          error: `Upstream request failed with HTTP ${status}.`
        });
      }

      const $ = cheerio.load(html);

      // Check if truly private profile
      const isExplicitlyPrivate =
        html.includes("This profile is private") ||
        html.includes("profile is not public") ||
        html.includes("Private Profile") ||
        $(".profile-private").length > 0;

      const profileAvatar = $("ql-avatar").attr("src") || "";
      const profileAvatarTitle = $("ql-avatar").attr("title");
      const h1Text = $("h1").text().trim();
      const pageTitle = $("title").text().replace(" | Google Cloud Skills Boost", "").trim();
      const profileName = profileAvatarTitle || h1Text || pageTitle;

      const badgesCount = $(".profile-badge").length;

      // Check if upstream returned or redirected to the generic homepage (profile not found)
      const isHomepageFallback =
        pageTitle.includes("Build AI skills") ||
        pageTitle === "Google Cloud Skills Boost" ||
        (badgesCount === 0 && !profileAvatarTitle && !profileAvatar && !html.includes("ql-avatar"));

      if (isHomepageFallback && !profileAvatarTitle && badgesCount === 0) {
        return res.status(404).json({
          error: "Profile not found on Google Cloud Skills Boost. Please verify your profile ID/URL."
        });
      }

      // 422: Profile is truly private (page loaded with 200 OK but has no public data)
      if (isExplicitlyPrivate || (!profileName && badgesCount === 0 && !profileAvatar)) {
        return res.status(422).json({
          error: "Profile is private. Please set your Google Cloud Skills Boost profile to Public in account settings."
        });
      }

      let triviaBadges = 0;
      let gameBadges = 0;
      let skillBadges = 0;
      let specialBadges = 0;
      let facilitatorGameBadges = 0;
      let facilitatorSkillBadges = 0;

      const seenBadges = new Set<string>();
      const badgesList: any[] = [];

      const normalizeStr = (s: string) => s.toLowerCase().replace(/[:\-_,.]/g, ' ').replace(/\s+/g, ' ').trim();

      $(".profile-badge").each((i, el) => {
        const rawText = $(el).text() || "";
        const badgeText   = $(el).text();
        const altText     = $(el).find('img').attr('alt') || '';
        const ariaLabel   = $(el).attr('aria-label') || '';
        const allText     = (badgeText + " " + altText + " " + ariaLabel).toLowerCase();

        // Skip Completion Badges entirely
        if (allText.includes("completion badge")) {
          return;
        }

        const title = $(el).find(".badge-title, .ql-title-medium").text().trim() || $(el).attr('alt') || rawText || "";
        const titleLower = title.toLowerCase().trim();
        const normTitle = normalizeStr(titleLower);

        // Extract the date and check timeline
        const dateText = $(el).find(".ql-body-medium.l-mbs, .ql-body-medium").text().trim();
        let earnedDate = dateText;
        let validForArcade = true;
        let validForFacilitator = true;
        let cleanDateStr = "";
        let parsedDate = null;
        if (dateText) {
          cleanDateStr = dateText.replace("Earned ", "").replace(/ EDT| EST| PDT| PST/g, "").trim();
          parsedDate = new Date(cleanDateStr + " UTC");
          if (!isNaN(parsedDate.getTime())) {
            if (parsedDate < ARCADE_START_DATE || parsedDate > ARCADE_END_DATE) {
              validForArcade = false;
            }
            if (parsedDate < FACILITATOR_START_DATE || parsedDate > FACILITATOR_END_DATE) {
              validForFacilitator = false;
            }
          } else {
            const match = dateText.match(/(20\d\d)/);
            if (match) {
              const year = parseInt(match[1], 10);
              if (year !== 2026) {
                validForArcade = false;
                validForFacilitator = false;
              }
            }
          }
        }

        if (!titleLower || seenBadges.has(titleLower)) return;
        seenBadges.add(titleLower);

        let category = "Lab-free";
        let points = 0;

        const isSyllabusGame = syllabusGameBadges.some(gb => {
          const normGb = normalizeStr(gb.name);
          return normGb === normTitle || normTitle.includes(normGb) || normGb.includes(normTitle);
        });

        // Check if title matches valid skill badges
        const isMatchedSkillBadge = SKILL_BADGES.some(b => {
          const nb = normalizeStr(b.name);
          return nb === normTitle || normTitle.includes(nb) || nb.includes(normTitle);
        }) || syllabusSkillBadges.some(b => {
          const nb = normalizeStr(b.name);
          return nb === normTitle || normTitle.includes(nb) || nb.includes(normTitle);
        });

        const isExplicitSkillBadge = 
          isMatchedSkillBadge ||
          allText.includes("skill badge") ||
          titleLower.includes("skill badge") ||
          $(el).find('img[alt*="Skill Badge"], .badge-icon[alt*="Skill Badge"]').length > 0;

        // Classify badges
        if (
          isSyllabusGame ||
          titleLower.includes("the arcade") ||
          titleLower.includes("level 1") ||
          titleLower.includes("level 2") ||
          titleLower.includes("level 3") ||
          titleLower.includes("trail") ||
          titleLower.includes("voyage") ||
          titleLower.includes("adventure") ||
          titleLower.includes("sprint") ||
          titleLower.includes("arcade game") ||
          titleLower.includes("monthly game") ||
          titleLower.includes("simulator") ||
          titleLower.includes("spans and plans") ||
          titleLower.includes("pitch perfect") ||
          titleLower.includes("trick-or-metric") ||
          titleLower.includes("base camp")
        ) {
          category = "Game";
          points = 1;
          if (validForArcade) gameBadges++;
          if (validForFacilitator) facilitatorGameBadges++;
        } else if (titleLower.includes("trivia") || titleLower.includes("quiz")) {
          category = "Trivia";
          points = 1;
          if (validForArcade) triviaBadges++;
        } else if (
          titleLower.includes("facilitator") ||
          titleLower.includes("work meet play") ||
          titleLower.includes("milestone") ||
          titleLower.includes("special") ||
          titleLower.includes("bonus") ||
          (titleLower.includes("event") && !titleLower.includes("eventarc") && !titleLower.includes("event-driven"))
        ) {
          category = "Special";
          points = 1;
          if (validForArcade) specialBadges++;
        } else if (isExplicitSkillBadge) {
          category = "Skill";
          points = 0.5;
          if (validForArcade) skillBadges += 1;
          if (validForFacilitator) facilitatorSkillBadges += 1;
        } else {
          // Unknown badges are treated as lab-free badges and contain 0 points
          category = "Lab-free";
          points = 0;
        }

        badgesList.push({
          id: titleLower,
          title: title,
          earnedDate: earnedDate,
          category: category,
          points: validForArcade ? points : 0,
          // validForProgram is true only for facilitator-eligible badges (<= Sept 14)
          validForProgram: validForFacilitator,
          validForArcade: validForArcade,
          _debugCleanDate: cleanDateStr,
          _debugParsedDate: parsedDate ? parsedDate.toISOString() : null,
          _debugStartDate: ARCADE_START_DATE.toISOString()
        });
      });

      // Overall Arcade Points: past points + current points
      const arcadePoints = gameBadges + triviaBadges + specialBadges + (skillBadges * 0.5);

      // Determine avatar URL
      const avatarUrl = $("ql-avatar").attr("src") || "";

      // Determine user's League or Medal (Bronze, Silver, Gold, Diamond)
      let league: 'bronze' | 'silver' | 'gold' | 'diamond' = 'bronze';
      let leagueName = 'Bronze League';

      const lowerHtml = html.toLowerCase();

      if (
        lowerHtml.includes('diamond league') ||
        lowerHtml.includes('diamond medal') ||
        lowerHtml.includes('diamond-league') ||
        $('[alt*="Diamond" i]').length > 0 ||
        $('[title*="Diamond" i]').length > 0 ||
        $('.diamond, .league-diamond').length > 0
      ) {
        league = 'diamond';
        leagueName = 'Diamond League';
      } else if (
        lowerHtml.includes('gold league') ||
        lowerHtml.includes('gold medal') ||
        lowerHtml.includes('gold-league') ||
        $('[alt*="Gold" i]').length > 0 ||
        $('[title*="Gold" i]').length > 0 ||
        $('.gold, .league-gold').length > 0
      ) {
        league = 'gold';
        leagueName = 'Gold League';
      } else if (
        lowerHtml.includes('silver league') ||
        lowerHtml.includes('silver medal') ||
        lowerHtml.includes('silver-league') ||
        $('[alt*="Silver" i]').length > 0 ||
        $('[title*="Silver" i]').length > 0 ||
        $('.silver, .league-silver').length > 0
      ) {
        league = 'silver';
        leagueName = 'Silver League';
      } else if (
        lowerHtml.includes('bronze league') ||
        lowerHtml.includes('bronze medal') ||
        lowerHtml.includes('bronze-league') ||
        $('[alt*="Bronze" i]').length > 0 ||
        $('[title*="Bronze" i]').length > 0 ||
        $('.bronze, .league-bronze').length > 0
      ) {
        league = 'bronze';
        leagueName = 'Bronze League';
      } else {
        // Fallback: If not explicitly found in HTML strings, calculate from profile milestone & badges count
        const totalCompletedBadges = badgesCount || (gameBadges + triviaBadges + specialBadges + skillBadges);
        if (totalCompletedBadges >= 50 || arcadePoints >= 60) {
          league = 'diamond';
          leagueName = 'Diamond League';
        } else if (totalCompletedBadges >= 25 || arcadePoints >= 30) {
          league = 'gold';
          leagueName = 'Gold League';
        } else if (totalCompletedBadges >= 10 || arcadePoints >= 10) {
          league = 'silver';
          leagueName = 'Silver League';
        } else {
          league = 'bronze';
          leagueName = 'Bronze League';
        }
      }

      res.json({
        name: profileName,
        avatarUrl,
        arcadePoints,
        gameBadges,
        triviaBadges,
        specialBadges,
        skillBadges,
        facilitatorGameBadges,
        facilitatorSkillBadges,
        league,
        leagueName,
        badges: badgesList
      });
    } catch (e: any) {
      console.error("[Scraper Error]", e);
      if (e.name === 'TimeoutError' || e.name === 'AbortError' || e.code === 'UND_ERR_CONNECT_TIMEOUT') {
        return res.status(504).json({
          error: "Gateway timeout: skills.google took too long to respond (>25s). Please try again."
        });
      }
      return res.status(502).json({
        error: `Upstream failure: Could not connect to skills.google (${e.message || 'Network error'}).`
      });
    }
  });

  app.get("/api/milestones/spots", async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(cachedSpots.rawSpotsLeft);
  });

let cachedGames = null;
  let cachedGamesTime = 0;

  app.get("/api/arcade-activity", async (req, res) => {
    try {
      if (cachedGames && Date.now() - cachedGamesTime < 5 * 60 * 1000) {
        return res.json({ games: cachedGames });
      }
      const response = await fetch("https://go.cloudskillsboost.google/arcade");
      let html = await response.text();
      html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      const $ = cheerio.load(html);

      const games: any[] = [];
      $('.card').each((i, el) => {
        const link = $(el).find('a').attr('href');
        const img = $(el).find('img').attr('src');
        if (link && link.includes('skills.google/games/') && img) {
           let title = "Arcade Game";
           let finalImg = img;
           
           if (link.includes('7394') || img.includes('bc') || img.includes('base')) {
               title = "Arcade Base Camp August 2026";
               finalImg = "https://cdn.qwiklabs.com/nXo%2Bc%2FLavbtJXZma1hYLmBxApy6Cr6CZiR1Bnukj5dk%3D";
           } else if (link.includes('7395') || img.includes('adv')) {
               title = "Arcade Adventure: Data Vault";
               finalImg = "https://cdn.qwiklabs.com/vQwBzyge8g7JI%2Fs9rWfu%2BvXJurcIOnP0A9wKR7U4i14%3D";
           } else if (link.includes('7398') || img.includes('voy')) {
               title = "Arcade Voyage: Google Sheets";
               finalImg = "https://cdn.qwiklabs.com/yn3KXIRZy6Md4qAEmKiYk6SEuHg0a7gDEaqc2H4o1Cs%3D";
           } else if (link.includes('7426') || link.includes('retrail')) {
               title = "Arcade Re-Trail";
               finalImg = "https://cdn.qwiklabs.com/eEC4APNIAxpy40bcPc0lLR5bM4amNO3Zl%2Fcw73e%2B7LQ%3D";
           } else if (link.includes('7396') || img.includes('trail')) {
               title = "Arcade Trail: Cloud Delivery Systems";
               finalImg = "https://cdn.qwiklabs.com/fRCfiQc6gVA%2BSEUkSvc7agSfPUGUiHmYaI4kslS9mSw%3D";
           } else if (link.includes('7397') || img.includes('simulater-aug')) {
               title = "Arcade Simulator: Network Security Engineer";
               finalImg = "https://cdn.qwiklabs.com/KU0Jp50XMAj26Vmx1iNYlmxJUltgvVVAa3YI0Xgssjg%3D";
           } else if (link.includes('7399') || img.includes('special-aug')) {
               title = "Spans and Plans";
               finalImg = "https://cdn.qwiklabs.com/jf0VYLPQlpqie%2FRI4cjTeBwtiL3xPto3PBIM5b8iSzI%3D";
           }
           
           let code = "Coming Soon!";
           const cardText = $(el).text();
           const parentText = $(el).parent().text();
           const match = cardText.match(/(?:access\s*code|code)[\s:]+([a-zA-Z0-9-]+)/i) || 
                         parentText.match(/(?:access\s*code|code)[\s:]+([a-zA-Z0-9-]+)/i);
           if (match && match[1]) {
             code = match[1];
           }

           games.push({ link, img: finalImg, title, code });
        }
      });
      
      // Ensure Arcade Re-Trail is added as it is an extra chance
      const hasReTrail = games.some(g => g.link.includes('7426'));
      if (!hasReTrail) {
          games.push({
             title: "Arcade Re-Trail",
             img: "https://cdn.qwiklabs.com/eEC4APNIAxpy40bcPc0lLR5bM4amNO3Zl%2Fcw73e%2B7LQ%3D",
             link: "https://www.skills.google/games/7426?utm_source=googleskills&utm_medium=lp&utm_campaign=retrail-Aug-arcade26",
             code: "1q-vaults-39213"
          });
      }

      cachedGames = games;
      cachedGamesTime = Date.now();
      res.json({ games });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch active games" });
    }
  });


  app.get("/api/discourse-notifications", async (req, res) => {
    try {
      const response = await fetch("https://discuss.google.dev/tag/learning.json");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications from Discourse");
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.post("/api/roadmap-recommendations", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const { gameBadges, skillBadges, points, recommendedLabs } = req.body;
      
      const genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY as string,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `Based on the following user progress in the Google Cloud Skills Boost program:
Game Badges: ${gameBadges}
Skill Badges: ${skillBadges}
Total Points: ${points}

Please recommend 6 labs from the following list of recommended labs. Pick labs that best fit the user's progress. If they have fewer badges (beginners), prefer "Easy" labs. If they have many (advanced), prefer "Medium" or "Hard" labs.

Available Labs:
${JSON.stringify(recommendedLabs, null, 2)}

Return the response in JSON format as an array of objects. Each object should have the exact same structure as the input objects. Include a "reasoning" string property in each object explaining why this lab is a good fit for this user.`;

      const response = await genAI.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                time: { type: Type.STRING },
                link: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["name", "category", "difficulty", "time", "reasoning"]
            }
          }
        }
      });
      
      const jsonStr = response.text || "[]";
      const recs = JSON.parse(jsonStr);
      
      return res.json({ recommendations: recs });
    } catch (e: any) {
        console.error("Roadmap generation error:", e);
        return res.status(500).json({ error: "Failed to generate roadmap" });
    }
  });

  // API 404 fallback to prevent index.html being sent for API requests
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  // Express error handler for API routes to guarantee JSON on all error paths
  app.use('/api', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[API Error Handler]', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
      status: err.status || 500
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      try {
        let html = fs.readFileSync(indexHtmlPath, 'utf8');
        const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
        const host = req.get('host') || 'localhost:3000';
        html = injectPageMetadata(html, req.path, host, proto);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
      } catch (err) {
        res.sendFile(indexHtmlPath);
      }
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${PORT} in use, retrying...`);
    } else {
      console.error('Server listen error:', err);
    }
  });
}

startServer();
