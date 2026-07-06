const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const fallbackBlock = `  // API 404 fallback to prevent index.html being sent for API requests
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  // Vite middleware for development`;

content = content.replace('  // Vite middleware for development', fallbackBlock);
fs.writeFileSync('server.ts', content);
