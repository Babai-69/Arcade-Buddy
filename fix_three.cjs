const fs = require('fs');
let code = fs.readFileSync('src/components/ThreeBackground.tsx', 'utf8');

code = code.replace(/MeshPhysicalMaterial/g, 'MeshPhongMaterial');
code = code.replace(/metalness: 0.35,/g, 'shininess: 100,');
code = code.replace(/roughness: 0.25,/g, 'specular: new THREE.Color(0xffffff),');
code = code.replace(/clearcoat: 0.6,/g, '');
code = code.replace(/clearcoatRoughness: 0.2,/g, '');

// Make them move faster
code = code.replace(/rotSpeedX: \(Math.random\(\)-0.5\)\*0.01/g, 'rotSpeedX: (Math.random()-0.5)*0.03');
code = code.replace(/rotSpeedY: \(Math.random\(\)-0.5\)\*0.01/g, 'rotSpeedY: (Math.random()-0.5)*0.03');
code = code.replace(/floatSpeed: 0.4 \+ Math.random\(\)\*0.6/g, 'floatSpeed: 0.8 + Math.random()*1.2');

fs.writeFileSync('src/components/ThreeBackground.tsx', code);
