const fs = require('fs');
let code = fs.readFileSync('src/pages/SwagsPage.tsx', 'utf8');

code = code.replace(
  'swag.tiers.map(t =>',
  "swag.tiers.filter(t => activeTab === 'All Tiers' || t === activeTab).map(t =>"
);

code = code.replace(
  'selectedSwag.tiers.map((t: string) =>',
  "selectedSwag.tiers.filter((t: string) => activeTab === 'All Tiers' || t === activeTab).map((t: string) =>"
);

fs.writeFileSync('src/pages/SwagsPage.tsx', code);
