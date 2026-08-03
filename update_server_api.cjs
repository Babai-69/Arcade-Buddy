const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const oldBlock = `           if (img.includes('bc') || img.includes('base')) title = "Arcade Base Camp";
           else if (img.includes('adv')) title = "Arcade Adventure";
           else if (img.includes('voy')) title = "Arcade Voyage";
           else if (img.includes('trail')) title = "Arcade Trail";
           else if (img.includes('simulater-aug')) title = "Arcade Simulator: Network Security Engineer";
           else if (img.includes('special-aug')) title = "Spans and Plans";`;

const newBlock = `           if (img.includes('bc') || img.includes('base')) title = "Arcade Base Camp";
           else if (img.includes('adv')) title = "Arcade Adventure";
           else if (img.includes('voy')) title = "Arcade Voyage";
           else if (img.includes('trail')) title = "Arcade Trail";
           else if (img.includes('simulater-aug')) title = "Arcade Simulator: Network Security Engineer";
           else if (img.includes('special-aug')) title = "Spans and Plans";
           else if (img.includes('Spaces')) title = "Safe Spaces";
           else if (img.includes('work') || img.includes('special-july')) {
             title = "Arcade Simulator";
           }`;

// Since I already edited server.ts, let's just make sure it returns the correct titles for all cases.
// I'll just regex replace the whole if/else chain for img checks.
