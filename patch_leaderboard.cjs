const fs = require('fs');
let code = fs.readFileSync('src/pages/TrueLeaderboardPage.tsx', 'utf8');

// 1. Add Clock to lucide-react imports
if (!code.includes('Clock,')) {
    code = code.replace("import { Search", "import { Search, Clock");
}

// 2. Replace the old notice
const oldNotice = `<div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200">
           <strong>Please note:</strong> The leaderboard section reflects a progress report that is 24 hours old and does not show the current badge count. It will be updated daily after 24 hours with the most current values. Don't worry if you don't see the exact badge count on the leaderboard!
         </div>`;

const newNotice = `<div className="bg-[#f4f7fc] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
           <div className="bg-[#e4effe] dark:bg-blue-800/50 p-3 rounded-2xl flex-shrink-0">
             <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
           </div>
           <div>
             <div className="flex flex-wrap items-center gap-3 mb-1">
               <h4 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">Daily Leaderboard Update</h4>
               <span className="bg-[#e4effe] dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                 Once Every 24 Hours
               </span>
             </div>
             <p className="text-[13.5px] md:text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1 md:mt-0">
               The leaderboard updates once every 24 hours, specifically between <span className="text-blue-600 dark:text-blue-400 font-bold">1:00 PM and 8:00 PM</span> daily.
             </p>
           </div>
         </div>`;

code = code.replace(oldNotice, newNotice);
fs.writeFileSync('src/pages/TrueLeaderboardPage.tsx', code, 'utf8');
console.log("Patched TrueLeaderboardPage");
