const fs = require('fs');
let code = fs.readFileSync('src/components/LabLimitAnimation.tsx', 'utf8');

const oldHeader = `<button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white text-lg">Daily Lab Limit — How it works</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>`;

// Remove the expandable button header since it's on its own page now
code = code.replace(oldHeader, "");

// Remove the condition for isOpen, make it always render the body
code = code.replace(/\{isOpen && \(\s*<div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-700">/, '<div className="p-6 md:p-8">');
code = code.replace(/<\/div>\s*\)\}\s*<\/div>/, '</div>\n    </div>');

// Add descriptive steps above the interactive demo
const stepsHtml = `
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">New Lab Limits - 15 labs/24 hours:</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              As per the new lab limits on Google Cloud Skills Boost - to prevent misuse of the platform, any user can <strong className="text-slate-900 dark:text-white">ONLY complete 15 labs per 24 hours.</strong> Once this limit expires, you will receive <strong className="text-slate-900 dark:text-white">1 NEW lab attempt every 2 hours.</strong> You can find more detailed information on this in our FAQs here.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              Once you are near your 15th lab in the last 24 hours, you will also receive <strong className="text-blue-600 dark:text-blue-400">the following warning</strong> from the platform using which you can effectively track your labs usage and plan your lab time for the future.
            </p>
          </div>
`;

code = code.replace(/<div className="flex justify-center mb-8">/, stepsHtml + '\n          <div className="flex justify-center mb-8">');

fs.writeFileSync('src/components/LabLimitAnimation.tsx', code);
