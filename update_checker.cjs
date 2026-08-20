const fs = require('fs');

let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

// 1. Remove imports for old trackers and add InlineBadgeTracker
code = code.replace(
  "import { BadgeTracker } from './BadgeTracker';",
  "import { InlineBadgeTracker } from './InlineBadgeTracker';"
);
code = code.replace("import { FacilitatorBadgeTracker } from './FacilitatorBadgeTracker';\n", "");

// 2. Remove state for trackers
code = code.replace("const [isBadgeTrackerOpen, setIsBadgeTrackerOpen] = useState(false);\n", "");
code = code.replace("const [isFacilitatorBadgeTrackerOpen, setIsFacilitatorBadgeTrackerOpen] = useState(false);\n", "");

// 3. Replace the Badge Tracker button with My Progress
const oldButton = `<button 
                              onClick={() => setIsFacilitatorBadgeTrackerOpen(true)}
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-amber-400/50 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all shadow-sm"
                            >
                              🗓️ Badge Tracker
                            </button>`;
const newButton = `<Link 
                              to="/my-progress"
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                              📊 My Progress
                            </Link>`;
if (code.includes(oldButton)) {
  code = code.replace(oldButton, newButton);
} else {
  console.log("Could not find the Badge Tracker button exact string.");
  // let's try a regex
  code = code.replace(/<button[^>]*onClick=\{\(\) => setIsFacilitatorBadgeTrackerOpen\(true\)\}[^>]*>[\s\S]*?<\/button>/, newButton);
}

// 4. Remove the modals and add InlineBadgeTracker at the bottom of the result container
const oldModals = `<BadgeTracker 
        isOpen={isBadgeTrackerOpen} 
        onClose={() => setIsBadgeTrackerOpen(false)} 
        participant={result} 
      />
      <FacilitatorBadgeTracker 
        isOpen={isFacilitatorBadgeTrackerOpen} 
        onClose={() => setIsFacilitatorBadgeTrackerOpen(false)} 
        participant={result}
        isRegistered={isRegistered} 
      />`;
const newInline = `<InlineBadgeTracker participant={result} />`;

if (code.includes(oldModals)) {
  code = code.replace(oldModals, newInline);
} else {
  // Try regex
  code = code.replace(/<BadgeTracker[\s\S]*?\/>\s*<FacilitatorBadgeTracker[\s\S]*?\/>/, newInline);
}

fs.writeFileSync('src/components/ProfileChecker.tsx', code);
console.log("Updated ProfileChecker.tsx");
