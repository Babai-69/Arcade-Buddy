const fs = require('fs');
let serverTs = fs.readFileSync('server.ts', 'utf8');

if (!serverTs.includes('import dotenv')) {
  serverTs = "import dotenv from 'dotenv';\ndotenv.config();\n" + serverTs;
}

if (!serverTs.includes('import { GoogleGenerativeAI } from "@google/generative-ai"')) {
  serverTs = 'import { GoogleGenerativeAI } from "@google/generative-ai";\n' + serverTs;
}

serverTs = serverTs.replace(/import \{ GoogleGenAI \} from '@google\/genai';\n?/g, '');

const chatApiRegex = /app\.post\("\/api\/chat", async \(req, res\) => \{[\s\S]*?res\.status\(500\)\.json\(\{ error: "Failed to fetch response", details: e\.message \}\);\n    \}\n  \}\);/;

const newChatApi = `app.post("/api/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing!");
        return res.status(500).json({
          error: "API key not configured",
          reply: "Configuration error. Please contact the admin."
        });
      }

      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = \`You are GArcade Assistant, an expert AI guide for the Google Cloud Skills Boost Arcade Facilitator program 2026.

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
Never make up point values or requirements.\`;

      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction,
      });

      const chat = model.startChat({
        history: (history || []).slice(-10).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
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
      return res.status(500).json({
        error: error.message,
        reply: "Sorry, I am having trouble connecting right now. Please try again in a moment!"
      });
    }
  });`;

serverTs = serverTs.replace(chatApiRegex, newChatApi);

// Fix 4
const startServerRegex = /async function startServer\(\) \{/;
const startServerReplacement = `async function startServer() {
  // Check required env vars on startup
  const requiredEnvVars = [
    'GEMINI_API_KEY',
  ];

  const missingVars = requiredEnvVars.filter(
    v => !process.env[v]
  );

  if (missingVars.length > 0) {
    console.warn(
      \`⚠️ Missing environment variables: \${missingVars.join(', ')}\`
    );
    console.warn(
      'Some features may not work correctly.'
    );
  } else {
    console.log('✅ All required environment variables found');
  }`;

serverTs = serverTs.replace(startServerRegex, startServerReplacement);

fs.writeFileSync('server.ts', serverTs);
