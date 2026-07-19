const fs = require('fs');
let serverTs = fs.readFileSync('server.ts', 'utf8');

serverTs = serverTs.replace(/model: "gemini-2\.0-flash",/g, 'model: "gemini-1.5-flash",');

const catchRegex = /\} catch \(error: any\) \{\s*console\.error\("Chat API error:", error\.message\);\s*return res\.status\(500\)\.json\(\{\s*error: error\.message,\s*reply: "Sorry, I am having trouble connecting right now\. Please try again in a moment!"\s*\}\);\s*\}/s;

const newCatch = `} catch (error: any) {
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
        error: error.message,
        reply: "Sorry, I am having trouble connecting right now. Please try again in a moment!"
      });
    }`;

if(catchRegex.test(serverTs)) {
    serverTs = serverTs.replace(catchRegex, newCatch);
    fs.writeFileSync('server.ts', serverTs);
    console.log("Successfully updated server.ts");
} else {
    console.log("Failed to match catch block.");
}
