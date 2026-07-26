const fs = require('fs');
let code = fs.readFileSync('src/components/ThreeBackground.tsx', 'utf8');

code = code.replace(/opacity:0.85/g, 'opacity: 1, emissive: colors[i % colors.length], emissiveIntensity: 0.2');

fs.writeFileSync('src/components/ThreeBackground.tsx', code);
