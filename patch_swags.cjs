const fs = require('fs');
let code = fs.readFileSync('src/pages/SwagsPage.tsx', 'utf8');

// Add new icons
if (!code.includes('Shirt,')) {
    code = code.replace("import { Gift } from 'lucide-react';", "import { Gift, Shirt, Coffee, Backpack, Sparkles, Ticket } from 'lucide-react';");
}

// Keep the text the exact same as instructed, but improve the UI and add more details.
const oldEmptyState = `{/* Empty State */}
        <div className="flex flex-col items-center justify-center mt-6 mb-16 max-w-lg mx-auto">
          <div className="text-blue-500 mb-8">
            <Gift className="w-24 h-24 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">No Swag Drops Announced Yet</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] mb-2 leading-relaxed">
            Google Cloud has not officially revealed any Arcade Season 2026 swag rewards yet.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-[15px]">
            Check back later once rewards are announced.
          </p>
        </div>`;

const newEmptyState = `{/* Empty State */}
        <div className="relative glass-panel rounded-3xl p-10 md:p-14 flex flex-col items-center justify-center mt-6 mb-20 max-w-3xl mx-auto overflow-hidden shadow-[0_8px_32px_rgba(66,133,244,0.08)]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 pointer-events-none"></div>
          
          <div className="relative z-10 text-blue-500 mb-8 bg-white dark:bg-slate-800 p-6 rounded-full shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/10">
            <Gift className="w-20 h-20 stroke-[1.5]" />
          </div>
          <h2 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-4">No Swag Drops Announced Yet</h2>
          <p className="relative z-10 text-slate-600 dark:text-slate-300 text-[15px] mb-2 leading-relaxed text-center max-w-md">
            Google Cloud has not officially revealed any Arcade Season 2026 swag rewards yet.
          </p>
          <p className="relative z-10 text-slate-600 dark:text-slate-300 text-[15px] text-center max-w-md mb-12">
            Check back later once rewards are announced.
          </p>

          {/* Added details about upcoming swags (Anticipated Drops) */}
          <div className="relative z-10 w-full pt-8 border-t border-slate-200 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 text-center">Anticipated Swag Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform shadow-sm">
                <Shirt className="w-7 h-7 mx-auto mb-3 text-blue-500" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Apparel</div>
                <div className="text-[11px] text-slate-500">T-Shirts & Hoodies</div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform shadow-sm">
                <Backpack className="w-7 h-7 mx-auto mb-3 text-green-500" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Gear</div>
                <div className="text-[11px] text-slate-500">Backpacks & Bags</div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform shadow-sm">
                <Coffee className="w-7 h-7 mx-auto mb-3 text-yellow-500" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Drinkware</div>
                <div className="text-[11px] text-slate-500">Mugs & Bottles</div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform shadow-sm">
                <Sparkles className="w-7 h-7 mx-auto mb-3 text-purple-500" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Collectibles</div>
                <div className="text-[11px] text-slate-500">Pins & Stickers</div>
              </div>
            </div>
          </div>
        </div>`;

code = code.replace(oldEmptyState, newEmptyState);
fs.writeFileSync('src/pages/SwagsPage.tsx', code, 'utf8');
console.log("Patched SwagsPage");
