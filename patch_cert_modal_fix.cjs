const fs = require('fs');
let code = fs.readFileSync('src/components/auth/CertificateModal.tsx', 'utf8');

const oldLogic = `// Ultimate Milestone criteria
      if (data.gameBadges >= 12 && data.skillBadges >= 66) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }`;

const newLogic = `// Minimum Milestone 1 criteria
      const g = data.gameBadges || 0;
      const s = data.skillBadges || 0;
      if (g >= 12 && s >= 66) {
        setIsEligible(true);
        setMilestoneName('the Ultimate Milestone');
      } else if (g >= 10 && s >= 50) {
        setIsEligible(true);
        setMilestoneName('Milestone 3');
      } else if (g >= 8 && s >= 34) {
        setIsEligible(true);
        setMilestoneName('Milestone 2');
      } else if (g >= 6 && s >= 18) {
        setIsEligible(true);
        setMilestoneName('Milestone 1');
      } else {
        setIsEligible(false);
        setMilestoneName('');
      }`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/auth/CertificateModal.tsx', code);
