const fs = require('fs');
let code = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');

// Patch 1: isCompleted logic
const oldIsCompletedLogic = `      const isMatch = cbTitle === bName || 
             (bName.includes('network security') && cbTitle.includes('network security')) ||
             (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
             (bName.includes('base camp') && cbTitle.includes('base camp')) ||
             (bName.includes('adventure') && cbTitle.includes('adventure')) ||
             (bName.includes('voyage') && cbTitle.includes('voyage')) ||
             (bName.includes('trail') && cbTitle.includes('trail'));

      if (!isMatch || cb.validForProgram === false) return false;`;

const newIsCompletedLogic = `      const exactMatch = cbTitle === bName || cbTitle.replace(/-/g, '') === bName.replace(/-/g, '');
      if (exactMatch && cb.validForProgram !== false) return true;

      const isCbReTrail = cbTitle.includes('re-trail') || cbTitle.includes('retrail');
      const isBReTrail = bName.includes('re-trail') || bName.includes('retrail');

      const isMatch = 
             (bName.includes('network security') && cbTitle.includes('network security')) ||
             (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
             (bName.includes('base camp') && cbTitle.includes('base camp')) ||
             (bName.includes('adventure') && cbTitle.includes('adventure')) ||
             (bName.includes('voyage') && cbTitle.includes('voyage')) ||
             (bName.includes('trail') && cbTitle.includes('trail') && isCbReTrail === isBReTrail);

      if (!isMatch || cb.validForProgram === false) return false;`;

code = code.replace(oldIsCompletedLogic, newIsCompletedLogic);

// Patch 2: foundInDb logic
const oldFoundInDbLogic = `          const isMatch = dbName === bTitle || 
          (dbName.includes('network security') && bTitle.includes('network security')) ||
          (dbName.includes('spans and plans') && bTitle.includes('spans and plans')) ||
          (dbName.includes('base camp') && bTitle.includes('base camp')) ||
          (dbName.includes('adventure') && bTitle.includes('adventure')) ||
          (dbName.includes('voyage') && bTitle.includes('voyage')) ||
          (dbName.includes('trail') && bTitle.includes('trail'));
          
          if (!isMatch) return false;`;

const newFoundInDbLogic = `          const exactMatch = dbName === bTitle || dbName.replace(/-/g, '') === bTitle.replace(/-/g, '');
          if (exactMatch) return true;

          const isBTitleReTrail = bTitle.includes('re-trail') || bTitle.includes('retrail');
          const isDbReTrail = dbName.includes('re-trail') || dbName.includes('retrail');

          const isMatch = 
          (dbName.includes('network security') && bTitle.includes('network security')) ||
          (dbName.includes('spans and plans') && bTitle.includes('spans and plans')) ||
          (dbName.includes('base camp') && bTitle.includes('base camp')) ||
          (dbName.includes('adventure') && bTitle.includes('adventure')) ||
          (dbName.includes('voyage') && bTitle.includes('voyage')) ||
          (dbName.includes('trail') && bTitle.includes('trail') && isBTitleReTrail === isDbReTrail);
          
          if (!isMatch) return false;`;

code = code.replace(oldFoundInDbLogic, newFoundInDbLogic);

fs.writeFileSync('src/components/CheckProgress.tsx', code, 'utf8');
console.log("Patched CheckProgress.tsx");
