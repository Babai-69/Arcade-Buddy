const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const replacement = `
  let cachedGames = null;
  let cachedGamesTime = 0;

  app.get("/api/active-games", async (req, res) => {
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
           const match = cardText.match(/(?:access\\s*code|code)[\\s:]+([a-zA-Z0-9-]+)/i) || 
                         parentText.match(/(?:access\\s*code|code)[\\s:]+([a-zA-Z0-9-]+)/i);
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
  });`;

content = content.replace(/  app\.get\("\/api\/active-games"[\s\S]*?res\.status\(500\)\.json\(\{ error: "Failed to fetch active games" \}\);\n    \}\n  \}\);/, replacement.trim());
fs.writeFileSync('server.ts', content);
