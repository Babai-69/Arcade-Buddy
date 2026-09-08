const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

// Ensure that grey is correctly mapped to 0 or 1, and so on.
// Let's modify the tooltip so the user can easily verify the logic
// by hovering over the box, e.g. title={`${count} badges`} which is already there!

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
