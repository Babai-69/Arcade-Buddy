const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

if (!code.includes('DashboardSkeleton')) {
  code = code.replace(
    "import { PosterModal } from '../components/PosterModal';",
    "import { PosterModal } from '../components/PosterModal';\nimport { DashboardSkeleton } from '../components/DashboardSkeleton';"
  );
}

const oldLoader = `<div className="min-h-screen pt-24 flex justify-center items-center">\n        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>\n      </div>`;

if (code.includes(oldLoader)) {
  code = code.replace(oldLoader, '<DashboardSkeleton />');
}

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
