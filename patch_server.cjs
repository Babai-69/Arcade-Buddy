const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const routeCode = `
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
`;

code = code.replace("  // API 404 fallback to prevent index.html being sent for API requests", routeCode);

fs.writeFileSync('server.ts', code);
