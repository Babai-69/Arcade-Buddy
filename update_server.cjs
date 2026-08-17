const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const games = \[\];([\s\S]*?)cachedGames = games;/;

const replacement = `const games: any[] = [];
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
           const match = cardText.match(/(?:access\\s*code|code)[\\s:]+([a-zA-Z0-9-]+)/i) || 
                         parentText.match(/(?:access\\s*code|code)[\\s:]+([a-zA-Z0-9-]+)/i);
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

      cachedGames = games;`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code, 'utf8');
