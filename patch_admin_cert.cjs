const fs = require('fs');
let code = fs.readFileSync('src/components/AdminCertificatePreview.tsx', 'utf8');

code = code.replace(
  /This module generates the Ultimate Milestone Certificate for users who meet the criteria within the program timeline\.\s*<strong> Criteria: &ge;66 Skill Badges AND &ge;12 Game Badges\.<\/strong>/g,
  "This module generates the Certificate for users who meet at least Milestone 1 criteria within the program timeline.\n            <strong> Criteria: &ge;18 Skill Badges AND &ge;6 Game Badges.</strong>"
);

fs.writeFileSync('src/components/AdminCertificatePreview.tsx', code);
