const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const oldButtons = `<div className="flex flex-col gap-3">
                            <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                              View Profile
                            </a>
                            <Link 
                              to="/dashboard"
                              className="w-full text-center py-2.5 px-4 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                              📊 View Dashboard
                            </Link>
                            <Link 
                              to="/roadmap"
                              state={{ participant: result }}
                              className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm font-bold text-white transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                              <span className="relative z-10">🚀 Your Personalised Roadmap</span>
                            </Link>
                          </div>`;

const newButtons = `<div className="flex flex-col gap-3">
                            <div className="flex gap-3 w-full">
                              <a href={result.profileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                                View Profile
                              </a>
                              <Link 
                                to="/dashboard"
                                className="flex-1 text-center py-2.5 px-2 rounded-xl border border-emerald-400/50 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm flex items-center justify-center gap-1"
                              >
                                📊 View Dashboard
                              </Link>
                            </div>
                            <Link 
                              to="/roadmap"
                              state={{ participant: result }}
                              className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm font-bold text-white transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                              <span className="relative z-10">🚀 Your Personalised Roadmap</span>
                            </Link>
                          </div>`;

code = code.replace(oldButtons, newButtons);
fs.writeFileSync('src/components/ProfileChecker.tsx', code);
