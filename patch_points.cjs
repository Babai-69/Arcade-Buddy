const fs = require('fs');
let content = fs.readFileSync('src/components/PointsSystem.tsx', 'utf8');
content = content.replace('<div className="w-full max-w-7xl', '<div id="points-system" className="w-full max-w-7xl');
fs.writeFileSync('src/components/PointsSystem.tsx', content);

let content2 = fs.readFileSync('src/components/FacilitatorSyllabus.tsx', 'utf8');
content2 = content2.replace('<Link to="/facilitator"', '<Link to="/facilitator#points-system"');
fs.writeFileSync('src/components/FacilitatorSyllabus.tsx', content2);
