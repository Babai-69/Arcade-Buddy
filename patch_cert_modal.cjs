const fs = require('fs');
let code = fs.readFileSync('src/components/auth/CertificateModal.tsx', 'utf8');

// We need to change the eligibility logic.
// Currently:
// const [isEligible, setIsEligible] = useState<boolean | null>(null);
// We'll add milestoneName state as well.
code = code.replace(
  "const [isEligible, setIsEligible] = useState<boolean | null>(null);",
  "const [isEligible, setIsEligible] = useState<boolean | null>(null);\n  const [milestoneName, setMilestoneName] = useState<string>('Ultimate Milestone');"
);

// Look for eligibility check logic:
/*
      // Ultimate Milestone criteria
      if (stats.gameBadges >= 12 && stats.skillBadges >= 66) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }
*/

const oldLogic = `// Ultimate Milestone criteria
      if (stats.gameBadges >= 12 && stats.skillBadges >= 66) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }`;

const newLogic = `// Minimum Milestone 1 criteria
      const g = stats.gameBadges;
      const s = stats.skillBadges;
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

// Update UI texts.
code = code.replace(/To be eligible for the Ultimate Milestone certificate, you must have completed:/g, "To be eligible to download your certificate, you must have reached at least Milestone 1 by completing:");
code = code.replace(/<li>12 or more Game Badges<\/li>\s*<li>66 or more Skill Badges<\/li>/, "<li>6 or more Game Badges</li>\n                    <li>18 or more Skill Badges</li>");

code = code.replace(/You haven't reached the Ultimate Milestone criteria./g, "You haven't reached the minimum criteria (Milestone 1).");
code = code.replace(/Game Badges: \{stats\.gameBadges\} \/ 12/, "Game Badges: {stats.gameBadges} / 6");
code = code.replace(/Skill Badges: \{stats\.skillBadges\} \/ 66/, "Skill Badges: {stats.skillBadges} / 18");

code = code.replace(/You are eligible for the Ultimate Milestone certificate./g, "You are eligible for a certificate! You have achieved {milestoneName}.");

// Update the hidden CertificateTemplate to pass milestoneName
code = code.replace(
  /<CertificateTemplate name=\{name\} qrCodeUrl=\{qrCodeUrl\} innerRef=\{certificateRef\} id="user-certificate" \/>/g,
  "<CertificateTemplate name={name} qrCodeUrl={qrCodeUrl} milestoneName={milestoneName} innerRef={certificateRef} id=\"user-certificate\" />"
);

fs.writeFileSync('src/components/auth/CertificateModal.tsx', code);
