const fs = require('fs');

// Fix CheckProgress.tsx
let cp = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');

const cpOldMatch = `return cb.validForProgram !== false && (cbTitle === bName || 
             (bName.includes('network security') && cbTitle.includes('network security')) ||
             (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
             (bName.includes('base camp') && cbTitle.includes('base camp')) ||
             (bName.includes('adventure') && cbTitle.includes('adventure')) ||
             (bName.includes('voyage') && cbTitle.includes('voyage')) ||
             (bName.includes('trail') && cbTitle.includes('trail')));`;

const cpNewMatch = `const isMatch = cbTitle === bName || 
             (bName.includes('network security') && cbTitle.includes('network security')) ||
             (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
             (bName.includes('base camp') && cbTitle.includes('base camp')) ||
             (bName.includes('adventure') && cbTitle.includes('adventure')) ||
             (bName.includes('voyage') && cbTitle.includes('voyage')) ||
             (bName.includes('trail') && cbTitle.includes('trail'));

      if (!isMatch || cb.validForProgram === false) return false;
      
      const isGeneric = ['base camp', 'adventure', 'voyage', 'trail'].some(kw => bName.includes(kw) && cbTitle !== bName);
      if (isGeneric) {
        if (!cb.earnedDate || (!cb.earnedDate.includes('Aug') && !cb.earnedDate.includes('Sep'))) {
          return false;
        }
      }
      return true;`;

cp = cp.replace(cpOldMatch, cpNewMatch);

const cpFoundInDbOld = `return (dbName === bTitle || 
          (dbName.includes('network security') && bTitle.includes('network security')) ||
          (dbName.includes('spans and plans') && bTitle.includes('spans and plans')) ||
          (dbName.includes('base camp') && bTitle.includes('base camp')) ||
          (dbName.includes('adventure') && bTitle.includes('adventure')) ||
          (dbName.includes('voyage') && bTitle.includes('voyage')) ||
          (dbName.includes('trail') && bTitle.includes('trail')));`;

const cpFoundInDbNew = `const isMatch = dbName === bTitle || 
          (dbName.includes('network security') && bTitle.includes('network security')) ||
          (dbName.includes('spans and plans') && bTitle.includes('spans and plans')) ||
          (dbName.includes('base camp') && bTitle.includes('base camp')) ||
          (dbName.includes('adventure') && bTitle.includes('adventure')) ||
          (dbName.includes('voyage') && bTitle.includes('voyage')) ||
          (dbName.includes('trail') && bTitle.includes('trail'));
          
          if (!isMatch) return false;
          
          const isGeneric = ['base camp', 'adventure', 'voyage', 'trail'].some(kw => dbName.includes(kw) && dbName !== bTitle);
          if (isGeneric) {
            if (!b.earnedDate || (!b.earnedDate.includes('Aug') && !b.earnedDate.includes('Sep'))) {
              return false;
            }
          }
          return true;`;

cp = cp.replace(cpFoundInDbOld, cpFoundInDbNew);

fs.writeFileSync('src/components/CheckProgress.tsx', cp, 'utf8');

// Fix UserProgressDashboard.tsx
let up = fs.readFileSync('src/components/UserProgressDashboard.tsx', 'utf8');

const upOldMatch = `return ((bTitle === gTitle || 
             (bTitle.includes('network security') && gTitle.includes('network security')) ||
             (bTitle.includes('spans and plans') && gTitle.includes('spans and plans')) ||
             (bTitle.includes('base camp') && gTitle.includes('base camp')) ||
             (bTitle.includes('adventure') && gTitle.includes('adventure')) ||
             (bTitle.includes('voyage') && gTitle.includes('voyage')) ||
             (bTitle.includes('trail') && gTitle.includes('trail')))) && b.validForProgram;`;

const upNewMatch = `const isMatch = bTitle === gTitle || 
             (bTitle.includes('network security') && gTitle.includes('network security')) ||
             (bTitle.includes('spans and plans') && gTitle.includes('spans and plans')) ||
             (bTitle.includes('base camp') && gTitle.includes('base camp')) ||
             (bTitle.includes('adventure') && gTitle.includes('adventure')) ||
             (bTitle.includes('voyage') && gTitle.includes('voyage')) ||
             (bTitle.includes('trail') && gTitle.includes('trail'));
             
        if (!isMatch || !b.validForProgram) return false;
        
        const isGeneric = ['base camp', 'adventure', 'voyage', 'trail'].some(kw => gTitle.includes(kw) && bTitle !== gTitle);
        if (isGeneric) {
          if (!b.earnedDate || (!b.earnedDate.includes('Aug') && !b.earnedDate.includes('Sep'))) {
            return false;
          }
        }
        return true;`;

up = up.replace(upOldMatch, upNewMatch);

fs.writeFileSync('src/components/UserProgressDashboard.tsx', up, 'utf8');

