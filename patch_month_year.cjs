const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

code = code.replace(
  "📅 {month}",
  "📅 {month} {currentDate.getFullYear()}"
);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
