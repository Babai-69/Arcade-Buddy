const fs = require('fs');
let code = fs.readFileSync('src/components/ProgramInformation.tsx', 'utf8');

if (!code.includes('showChanges')) {
  // Add state variables
  code = code.replace(
    "const [isPlaying, setIsPlaying] = useState(false);",
    "const [isPlaying, setIsPlaying] = useState(false);\n  const [showChanges, setShowChanges] = useState(false);\n  const [showPoints, setShowPoints] = useState(false);"
  );

  // Add Star to imports
  if (!code.includes('Star')) {
    code = code.replace("import { Clock, Calendar, Info, PlayCircle } from 'lucide-react';", "import { Clock, Calendar, Info, PlayCircle, Star } from 'lucide-react';");
  }

  // Inject the toggle buttons below the subtitle
  const headerSection = `<p className="text-sm text-slate-500">Our arcade points calculator is specifically designed for the 2026 Google Cloud Arcade program.</p>\n      </div>`;
  const toggleButtons = `<p className="text-sm text-slate-500">Our arcade points calculator is specifically designed for the 2026 Google Cloud Arcade program.</p>\n        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">\n          <button \n            onClick={() => setShowChanges(!showChanges)}\n            className="px-6 py-2.5 rounded-full font-bold text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-all flex items-center gap-2 shadow-sm"\n          >\n            <Info className="w-4 h-4" /> \n            {showChanges ? "Hide Arcade Changes" : "What's Changing in 2026?"}\n          </button>\n          \n          <button \n            onClick={() => setShowPoints(!showPoints)}\n            className="px-6 py-2.5 rounded-full font-bold text-sm bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 transition-all flex items-center gap-2 shadow-sm"\n          >\n            <Star className="w-4 h-4" /> \n            {showPoints ? "Hide Points System" : "View Arcade Points System"}\n          </button>\n        </div>\n      </div>`;
  code = code.replace(headerSection, toggleButtons);

  // Wrap "What's Changing Section"
  const changesStart = `{/* What's Changing Section */}`;
  const changesEnd = `</ul>\n      </div>`;
  code = code.replace(changesStart, `{showChanges && (\n      <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">\n      {/* What's Changing Section */}`);
  code = code.replace(changesEnd, `</ul>\n      </div>\n      </div>\n      )}`);

  // Update layout for Video + Points System
  // From: <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  const layoutStart = `<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">`;
  const newLayoutStart = `<div className={\`grid grid-cols-1 \${showPoints ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-6\`}>`;
  code = code.replace(layoutStart, newLayoutStart);

  // Wrap "Arcade Points System"
  const pointsStart = `{/* Arcade Points System */}`;
  const pointsEnd = `</div>\n        </div>\n      </div>\n    </div>`;
  code = code.replace(pointsStart, `{showPoints && (\n        <div className="animate-in fade-in slide-in-from-right-8 duration-500">\n        {/* Arcade Points System */}`);
  code = code.replace(pointsEnd, `</div>\n        </div>\n        </div>\n      )}\n      </div>\n    </div>`);
  
  fs.writeFileSync('src/components/ProgramInformation.tsx', code);
}
