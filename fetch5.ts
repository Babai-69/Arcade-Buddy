import fs from 'fs';
async function run() {
  const htmlRes = await fetch('https://arcadepointscalci.in/calculator');
  const html = await htmlRes.text();
  const jsMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (jsMatch) {
    const jsRes = await fetch(`https://arcadepointscalci.in${jsMatch[1]}`);
    const jsContent = await jsRes.text();
    
    const extractSpots = (name) => {
      const regex = new RegExp(`"${name}".{0,20}?"(\\d+)\\s*/\\s*(\\d+)\\s*spots left"`, 'i');
      const match = jsContent.match(regex);
      if (match) {
        return { spotsLeft: parseInt(match[1]), total: parseInt(match[2]) };
      }
      return null;
    };
    
    console.log("Trooper:", extractSpots("Trooper"));
    console.log("Ranger:", extractSpots("Ranger"));
    console.log("Champion:", extractSpots("Champion"));
    console.log("Legend:", extractSpots("Legend"));
  }
}
run();
