const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.get\("\/api\/calculator", async \(req, res\) => \{\s+const \{ url, startDate, endDate \} = req\.query;\s+if \(!url \|\| typeof url !== "string"\) \{\s+return res\.status\(400\)\.json\(\{ error: "Missing url parameter" \}\);\s+\}/;

const replacement = `app.get("/api/calculator", async (req, res) => {
    let { url, startDate, endDate } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing url parameter" });
    }
    
    // Rewrite skills.google to cloudskillsboost.google as it is more stable and prevents timeouts
    if (url.includes('skills.google/public_profiles/')) {
       url = url.replace('skills.google/public_profiles/', 'cloudskillsboost.google/public_profiles/');
    }
`;

code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Fixed");
