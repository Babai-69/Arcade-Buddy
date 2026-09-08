const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const target = `<div className="flex gap-3 w-full">
                              <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                                View Profile
                              </a>
                              <Link 
                                to="/dashboard"
                                className="flex-1 text-center py-2.5 px-2 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-1"
                              >
                                📊 View Dashboard
                              </Link>
                            </div>`;

const replacement = `<div className="flex gap-3 w-full">
                              <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 px-2 rounded-xl border border-gray-300 dark:border-slate-600 text-xs sm:text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm flex items-center justify-center">
                                View Profile
                              </a>
                              <Link 
                                to="/dashboard"
                                className="flex-1 text-center py-2.5 px-2 rounded-xl border border-emerald-400/50 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-1"
                              >
                                📊 Dashboard
                              </Link>
                            </div>
                            <Link 
                              to="/my-progress"
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-blue-400/50 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                              📈 Basic Tracker (/my-progress)
                            </Link>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/ProfileChecker.tsx', code);
