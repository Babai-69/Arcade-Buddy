const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add imports
const imports = `import { DailyLabLimitGuidePage } from './pages/DailyLabLimitGuidePage';
import { SwagDistributionSystemPage } from './pages/SwagDistributionSystemPage';`;

code = code.replace(/import \{ BonusMilestonePage \} from '\.\/pages\/BonusMilestonePage';/, "import { BonusMilestonePage } from './pages/BonusMilestonePage';\n" + imports);

// Add routes
const routes = `<Route path="/resources/daily-lab-limit-guide" element={<PageTransition><DailyLabLimitGuidePage /></PageTransition>} />
              <Route path="/resources/swag-distribution-system" element={<PageTransition><SwagDistributionSystemPage /></PageTransition>} />`;

code = code.replace(/<Route path="\/resources\/bonus-milestone" element=\{<PageTransition><BonusMilestonePage \/><\/PageTransition>\} \/>/, "<Route path=\"/resources/bonus-milestone\" element={<PageTransition><BonusMilestonePage /></PageTransition>} />\n              " + routes);

fs.writeFileSync('src/App.tsx', code);
