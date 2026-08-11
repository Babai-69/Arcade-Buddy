const fs = require('fs');

let cp = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');
cp = cp.replace(/return \(cbTitle === bName \|\| \n\s+\(bName\.includes\('network security'\) && cbTitle\.includes\('network security'\)\) \|\|/g, 
  `return cb.validForProgram !== false && (cbTitle === bName || 
             (bName.includes('network security') && cbTitle.includes('network security')) ||`);

fs.writeFileSync('src/components/CheckProgress.tsx', cp, 'utf8');

