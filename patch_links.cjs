const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const oldProgressLink = `<Link \n                              to="/my-progress"\n                              className="w-full text-center py-2.5 px-4 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-2"\n                            >\n                              📊 My Progress\n                            </Link>`;

code = code.replace(oldProgressLink, `<Link 
                              to="/dashboard"
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                              📊 View Dashboard
                            </Link>`);

fs.writeFileSync('src/components/ProfileChecker.tsx', code);
