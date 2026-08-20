const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

const oldGlass = `  .glass-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }
  
  .dark .glass-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }

  .dark .glass-panel {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }`;

const newGlass = `  .glass-card {
    background: #FFFFFF;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .dark .glass-card {
    background: rgba(30, 27, 46, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }

  .dark .glass-card:hover {
    border-color: rgba(192, 132, 252, 0.5); /* Violet glow */
    box-shadow: 0 8px 32px 0 rgba(192, 132, 252, 0.15);
  }

  .glass-panel {
    background: #FFFFFF;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .dark .glass-panel {
    background: rgba(30, 27, 46, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }`;

if (code.includes(oldGlass)) {
  code = code.replace(oldGlass, newGlass);
  console.log("Patched glass css.");
} else {
  console.log("Could not find exact glass css.");
}

fs.writeFileSync('src/index.css', code, 'utf8');
