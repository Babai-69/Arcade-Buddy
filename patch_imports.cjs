const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

if (!code.includes('import { ProgramInformation }')) {
  code = code.replace(
    "import { ChevronLeft, ChevronRight } from 'lucide-react';",
    "import { ChevronLeft, ChevronRight } from 'lucide-react';\nimport { ProgramInformation } from '../components/ProgramInformation';\nimport { ArcadePointsSystem } from '../components/ArcadePointsSystem';\nimport { Milestones } from '../components/Milestones';"
  );
}

const target = '<div className="max-w-7xl mx-auto space-y-6">';
if (code.includes(target) && !code.includes('<ProgramInformation />')) {
  code = code.replace(
    target,
    target + '\n        <ProgramInformation />\n        <Milestones />\n        <ArcadePointsSystem />\n'
  );
}

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
