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
          titleLower.includes("event")
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

          const halfPointSkillBadges = [
            "analyze bigquery data in connected sheets",
            "analyze images with the cloud vision api",
            "analyze sentiment with natural language api",
            "app building with appsheet",
            "build a website on google cloud",
            "cloud speech api: 3 ways",
            "create and manage cloud sql for postgresql instances",
            "derive insights from bigquery data",
            "develop ai-powered prototypes in google ai studio",
            "develop with apps script and appsheet",
            "explore generative ai with the gemini api in vertex ai",
            "get started with api gateway",
            "get started with cloud storage",
            "get started with dataplex",
            "get started with eventarc",
            "get started with google workspace tools",
            "get started with looker",
            "get started with pub/sub",
            "get started with sensitive data protection",
            "kickstarting application development with gemini code assist",
            "monitor and manage google cloud resources",
            "monitoring in google cloud",
            "networking fundamentals on google cloud",
            "prepare data for looker dashboards and reports",
            "prepare data for ml apis on google cloud",
            "prompt design in vertex ai",
            "set up a google cloud network",
            "set up an app dev environment on google cloud",
            "share data using google data cloud",
            "store, process, and manage data on google cloud - console",
            "tag and discover biglake data",
            "the basics of google cloud compute",
            "use apis to work with cloud storage",
            "use functions, formulas, and charts in google sheets",
            "use machine learning apis on google cloud",
            "using the google cloud speech api",
            "analyze speech and language with google apis",
            "app engine: 3 ways",
            "automate data capture at scale with document ai",
            "build google cloud infrastructure for aws professionals",
            "build infrastructure with terraform on google cloud",
            "build lookml objects in looker",
            "build a data warehouse with bigquery",
            "build a smart cloud application with vibe coding and mcp",
            "cloud run functions: 3 ways",
            "configure service accounts and iam roles for google cloud",
            "create ml models with bigquery ml",
            "create a secure data lake on cloud storage",
            "create a streaming data lake on cloud storage",
            "create and manage bigtable instances",
            "create and manage cloud spanner instances",
            "develop gen ai apps with gemini and streamlit",
            "develop serverless applications on cloud run",
            "develop serverless apps with firebase",
            "develop your google cloud network",
            "enhance gemini model capabilities",
            "implement ci/cd pipelines on google cloud",
            "implement cloud security fundamentals on google cloud",
            "implement devops workflows in google cloud",
            "implement load balancing on compute engine",
            "implementing cloud load balancing for compute engine",
            "integrate bigquery data and google workspace using apps script",
            "manage data models in looker",
            "migrate mysql data to cloud sql using database migration service",
            "monitor and log with google cloud observability",
            "optimize costs for google kubernetes engine",
            "perform predictive data analysis in bigquery",
            "privileged access with iam",
            "secure biglake data",
            "store, process, and manage data on google cloud - command line",
            "streaming analytics into bigquery",
            "build custom processors with document ai",
            "build real world ai applications with gemini and imagen",
            "build a data mesh with dataplex",
            "build a secure google cloud network",
            "connecting cloud networks with ncc",
            "deploy kubernetes applications on google cloud",
            "deploy and manage apigee x",
            "designing network security in google cloud",
            "detect manufacturing defects using visual inspection ai",
            "develop and secure apis with apigee x",
            "discover and protect sensitive data across your ecosystem",
            "engineer data for predictive modeling with bigquery ml",
            "implement multimodal vector search with bigquery",
            "inspect rich documents with gemini multimodality and multimodal rag",
            "manage kubernetes in google cloud",
            "mitigate threats and vulnerabilities with security command center",
            "protect cloud traffic with chrome enterprise premium security",
            "secure software delivery",
            "analyze and reason on multimodal data with gemini",
            "build and deploy machine learning solutions on vertex ai",
            "cloud architecture: design, implement, and manage",
            "deploy multi-agent architectures",
            "google deepmind: train a small language model"
          ];

          if (labFreeTitles.includes(titleLower)) {
            category = "Lab-free";
            points = 0;
          } else if (halfPointSkillBadges.includes(titleLower)) {
            if (validForProgram) skillBadges += 1;
            category = "Skill";
            points = 0.5;
          } else {
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
