const fs = require('fs');

let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const target = `                    {/* Centered pill CTA button */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="flex justify-center mb-2"
                    >
                      <Link 
                        to="/my-progress" 
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,124,250,0.4)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5B6CF9] via-[#8B5CF6] to-[#5B6CF9] bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] group-hover:opacity-90"></div>
                        <span className="relative z-10 drop-shadow-md">View Detailed Progress & Share Card</span>
                        <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>`;

code = code.replace(target, "");

fs.writeFileSync('src/components/ProfileChecker.tsx', code);
console.log("Removed the button.");
