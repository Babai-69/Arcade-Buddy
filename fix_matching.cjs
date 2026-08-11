const fs = require('fs');

function getSafeMatcher() {
  return `(dbName === bTitle || 
          (dbName.includes('network security') && bTitle.includes('network security')) ||
          (dbName.includes('spans and plans') && bTitle.includes('spans and plans')) ||
          (dbName.includes('base camp') && bTitle.includes('base camp')) ||
          (dbName.includes('adventure') && bTitle.includes('adventure')) ||
          (dbName.includes('voyage') && bTitle.includes('voyage')) ||
          (dbName.includes('trail') && bTitle.includes('trail')))`;
}

// Fix CheckProgress.tsx
let cp = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');
cp = cp.replace(/cbTitle === bName \|\| bName\.includes\(cbTitle\) \|\| cbTitle\.includes\(bName\)/g, 
  `(cbTitle === bName || 
             (bName.includes('network security') && cbTitle.includes('network security')) ||
             (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
             (bName.includes('base camp') && cbTitle.includes('base camp')) ||
             (bName.includes('adventure') && cbTitle.includes('adventure')) ||
             (bName.includes('voyage') && cbTitle.includes('voyage')) ||
             (bName.includes('trail') && cbTitle.includes('trail')))`);
             
cp = cp.replace(/dbName === bTitle \|\| bTitle\.includes\(dbName\) \|\| dbName\.includes\(bTitle\)/g, getSafeMatcher());
fs.writeFileSync('src/components/CheckProgress.tsx', cp, 'utf8');

// Fix UserProgressDashboard.tsx
let up = fs.readFileSync('src/components/UserProgressDashboard.tsx', 'utf8');
up = up.replace(/bTitle === gTitle \|\| bTitle\.includes\(gTitle\) \|\| gTitle\.includes\(bTitle\)/g, 
  `(bTitle === gTitle || 
             (bTitle.includes('network security') && gTitle.includes('network security')) ||
             (bTitle.includes('spans and plans') && gTitle.includes('spans and plans')) ||
             (bTitle.includes('base camp') && gTitle.includes('base camp')) ||
             (bTitle.includes('adventure') && gTitle.includes('adventure')) ||
             (bTitle.includes('voyage') && gTitle.includes('voyage')) ||
             (bTitle.includes('trail') && gTitle.includes('trail')))`);
             
up = up.replace(/bTitle === sTitle \|\| bTitle\.includes\(sTitle\) \|\| sTitle\.includes\(bTitle\)/g, `(bTitle === sTitle)`);
fs.writeFileSync('src/components/UserProgressDashboard.tsx', up, 'utf8');

