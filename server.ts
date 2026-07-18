import dotenv from 'dotenv';
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
import cors from "cors";
import * as cheerio from "cheerio";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import { gameBadges as syllabusGameBadges } from "./src/data/badgesData";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Configuration
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
- Milestone 2: 8 Game + 34 Skill → +15 bonus pts
- Milestone 3: 10 Game + 50 Skill → +25 bonus pts
- Ultimate: 12 Game + 66 Skill → +35 bonus pts
- Bonus Milestone: +10 extra pts (if M1+ reached)

PROGRAM TIMELINE:
- Start: July 13, 2026 at 5PM IST
- End: September 14, 2026 at 11:59PM IST
- Only badges in this window count for bonus

DAILY LAB LIMIT:
- Maximum 15 labs per 24-hour rolling window
- Window starts from first lab (not midnight)
- Failed labs still count
- After limit: +1 lab every 2 hours
- Lab-free courses have no limit

HOW TO GET PUBLIC PROFILE URL:
1. Go to cloudskillsboost.google.com
2. Click profile picture → Settings
3. Enable "Make profile public"
4. Go to /profile/ — copy the URL
5. Format: skills.google/public_profiles/YOUR-ID

MONTHLY ARCADE GAMES (6 per month):
- Arcade Base Camp
- Arcade Adventure
- Arcade Voyage
- Arcade Trail
- Arcade Special Monthly Game
- New Arcade Monthly Game

WATERFALL PRIZE SYSTEM:
- Legend → first access to premium rewards
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      });
      
      res.json({ reply: response.text });
    } catch (e) {
      console.error('Chat API Error:', e);
      res.status(500).json({ error: "Failed to fetch response", details: e.message });
    }
  });

app.post("/api/notify-query", async (req, res) => {
    try {
      const { name, email, profileUrl, queryType, message, attachments } = req.body;
      
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

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
      res.status(500).json({ success: false, message: error.message });
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
    const { url, startDate, endDate } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    const START_DATE = startDate ? new Date(startDate as string) : new Date('2026-07-13T00:00:00Z');
    const END_DATE = endDate ? new Date(endDate as string) : new Date('2026-09-14T18:29:00Z');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(404).json({ error: "Profile not found or invalid URL" });
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);

      const profileName = $("ql-avatar").attr("title") || $("title").text().replace(" | Google Cloud Skills Boost", "").trim();

      let triviaBadges = 0;
      let gameBadges = 0;
      let skillBadges = 0;
      let specialBadges = 0;

      const seenBadges = new Set<string>();
      const badgesList: any[] = [];

      $(".profile-badge").each((i, el) => {
        const rawText = $(el).text() || "";
        const badgeText   = $(el).text();
        const altText     = $(el).find('img').attr('alt') || '';
        const ariaLabel   = $(el).attr('aria-label') || '';
        const allText     = (badgeText + altText + ariaLabel).toLowerCase();

        const title = $(el).find(".badge-title, .ql-title-medium").text().trim() || $(el).attr('alt') || rawText || "";
        const titleLower = title.toLowerCase();

        // Extract the year and check timeline
        const dateText = $(el).find(".ql-body-medium.l-mbs, .ql-body-medium").text().trim();
        let earnedDate = dateText;
        let validForProgram = true;
        let cleanDateStr = "";
        let parsedDate = null;
        if (dateText) {
          cleanDateStr = dateText.replace("Earned ", "").replace(/ EDT| EST| PDT| PST/g, "").trim();
          parsedDate = new Date(cleanDateStr + " UTC");
          if (!isNaN(parsedDate.getTime())) {
            console.log("title", title, "cleanDateStr", cleanDateStr, "parsedDate", parsedDate.toISOString(), "START_DATE", START_DATE.toISOString(), "parsedDate < START_DATE", parsedDate < START_DATE);

            if (parsedDate < START_DATE || parsedDate > END_DATE) validForProgram = false;
          } else {
            const match = dateText.match(/(20\d\d)/);
            if (match) {
              const year = parseInt(match[1], 10);
              if (year !== 2026) validForProgram = false;
            }
          }
        }

        if (!titleLower || seenBadges.has(titleLower)) return;
        seenBadges.add(titleLower);

        let category = "Other";
        let points = 0;

        const isSyllabusGame = syllabusGameBadges.some(
          gb => gb.name.toLowerCase().trim() === titleLower
        );

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
          titleLower.includes("base camp")
        ) {
          if (validForProgram) gameBadges++;
          category = "Game";
          points = 1;
        } else if (titleLower.includes("trivia") || titleLower.includes("quiz")) {
          if (validForProgram) triviaBadges++;
          category = "Trivia";
          points = 1;
        } else if (
          titleLower.includes("facilitator") ||
          titleLower.includes("work meet play") ||
          titleLower.includes("milestone") ||
          titleLower.includes("special") ||
          titleLower.includes("bonus") ||
          (titleLower.includes("event") && !titleLower.includes("eventarc") && !titleLower.includes("event-driven"))
        ) {
          if (validForProgram) specialBadges++;
          category = "Special";
          points = 1;
        } else {
          // Check for Lab-free courses (known titles from syllabus or similar matching)
          const labFreeTitles = [
            "digital transformation with google cloud",
            "exploring data transformation with google cloud",
            "infrastructure and application modernization with google cloud",
            "scaling with google cloud operations",
            "innovating with google cloud artificial intelligence",
            "trust and security with google cloud",
            "gen ai: beyond the chatbot",
            "gen ai: unlock foundational concepts",
            "google drive",
            "google docs",
            "google slides",
            "google meet",
            "google sheets",
            "google calendar",
            "gen ai: navigate the landscape",
            "gen ai apps: transform your work",
            "introduction to large language models",
            "responsible ai: applying ai principles with google cloud",            
            "responsible ai for digital leaders with google cloud",
            "ai infrastructure: introduction to ai hypercomputer",
            "machine learning operations (mlops) with vertex ai: model evaluation",
            "conversational ai on vertex ai and dialogflow cx",
            "building complex end to end self-service experiences in dialogflow cx",
            "gen ai agents: transform your organization"
          ];
          
          if (labFreeTitles.includes(titleLower)) {
            category = "Lab-free";
            points = 0;
          } else if (allText.includes("skill badge")) {
            if (validForProgram) skillBadges += 1;
            category = "Skill";
            points = 0.5;
          } else {
            // Default to skill badge as fallback
            if (validForProgram) skillBadges += 1;
            category = "Skill";
            points = 0.5;
          }
        }

        badgesList.push({
          id: titleLower,
          title: title,
          earnedDate: earnedDate,
          category: category,
          points: points,
          validForProgram,
          _debugCleanDate: cleanDateStr,
          _debugParsedDate: parsedDate ? parsedDate.toISOString() : null,
          _debugStartDate: START_DATE ? START_DATE.toISOString() : null

        });
      });

      const arcadePoints = gameBadges + triviaBadges + specialBadges + (skillBadges * 0.5);

      // Determine avatar URL
      const avatarUrl = $("ql-avatar").attr("src") || "";

      res.json({
        name: profileName,
        avatarUrl,
        arcadePoints,
        gameBadges,
        triviaBadges,
        specialBadges,
        skillBadges,
        badges: badgesList
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch profile" });
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

      const games = [];
      $('.card').each((i, el) => {
        const link = $(el).find('a').attr('href');
        const img = $(el).find('img').attr('src');
        if (link && link.includes('skills.google/games/') && img) {
           let title = "Arcade Game";
           let finalImg = img;
           if (img.includes('bc') || img.includes('base')) title = "Arcade Base Camp";
           else if (img.includes('adv')) title = "Arcade Adventure";
           else if (img.includes('voy')) title = "Arcade Voyage";
           else if (img.includes('trail')) title = "Arcade Trail";
           else if (img.includes('Spaces')) title = "Safe Spaces";
           else if (img.includes('work') || img.includes('special')) {
             title = "Arcade Simulator";
             finalImg = "https://services.google.com/fh/files/misc/special-july.png";
           }
           else if (img.includes('logic')) return; // Ignore Special Monthly Game
           
           let code = "Coming Soon!";
           const cardText = $(el).text();
           const parentText = $(el).parent().text();
           const match = cardText.match(/(?:access\s*code|code)[\s:]+([a-zA-Z0-9-]+)/i) || 
                         parentText.match(/(?:access\s*code|code)[\s:]+([a-zA-Z0-9-]+)/i);
           if (match && match[1]) {
             code = match[1];
           }

           if (code === "1q-security-19110") {
             title = "Safe Spaces";
             finalImg = "https://services.google.com/fh/files/misc/new-special-game.png";
           }

           games.push({ link, img: finalImg, title, code });
        }
      });

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

  // API 404 fallback to prevent index.html being sent for API requests

  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
