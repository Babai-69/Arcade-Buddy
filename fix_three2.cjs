const fs = require('fs');
let code = fs.readFileSync('src/components/ThreeBackground.tsx', 'utf8');

// Increase ambient light
code = code.replace(/scene.add\(new THREE.AmbientLight\(0xffffff, 0.55\)\);/g, 'scene.add(new THREE.AmbientLight(0xffffff, 1.2));');
// Increase point lights
code = code.replace(/2.2/g, '10');
code = code.replace(/1.6/g, '8');
code = code.replace(/1.2/g, '8');

// Faster rotation and floating
code = code.replace(/rotSpeedX: \(Math.random\(\)-0.5\)\*0.03/g, 'rotSpeedX: (Math.random()-0.5)*0.08');
code = code.replace(/rotSpeedY: \(Math.random\(\)-0.5\)\*0.03/g, 'rotSpeedY: (Math.random()-0.5)*0.08');
code = code.replace(/floatSpeed: 0.8 \+ Math.random\(\)\*1.2/g, 'floatSpeed: 1.5 + Math.random()*2.0');

// add more geometries to make it look nicer
code = code.replace(/const COUNT = 16;/g, 'const COUNT = 30;');

fs.writeFileSync('src/components/ThreeBackground.tsx', code);
