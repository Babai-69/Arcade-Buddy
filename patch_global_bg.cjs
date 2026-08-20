const fs = require('fs');

// 1. Update Home.tsx
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
homeCode = homeCode.replace("import { ThreeBackground } from '../components/ThreeBackground';", "");
homeCode = homeCode.replace("<ThreeBackground />", "");
fs.writeFileSync('src/pages/Home.tsx', homeCode, 'utf8');

// 2. Update App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
if (!appCode.includes("ThreeBackground")) {
  appCode = appCode.replace("import { Navbar }", "import { ThreeBackground } from './components/ThreeBackground';\nimport { Navbar }");
}
appCode = appCode.replace("{location.pathname !== '/' && <div className=\"mesh-bg\"></div>}", "<ThreeBackground />");
fs.writeFileSync('src/App.tsx', appCode, 'utf8');

console.log("Global background applied.");
