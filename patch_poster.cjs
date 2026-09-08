const fs = require('fs');
let code = fs.readFileSync('src/components/PosterModal.tsx', 'utf8');

// Update imports
code = code.replace(
  "import { X, Download, Share2, Rocket, Moon, Twitter, Linkedin, Facebook } from 'lucide-react';",
  "import { X, Download, Share2, Rocket, Moon, Twitter, Linkedin, Facebook, Star, Sparkles } from 'lucide-react';"
);

const oldPosterStart = '{/* POSTER CONTAINER */}';
const oldPosterEnd = '</div>\n        </div>\n\n        <div className="p-6 border-t';

const oldSegment = code.substring(code.indexOf(oldPosterStart), code.indexOf(oldPosterEnd) + oldPosterEnd.length - 35); // approximately

const newPoster = `{/* POSTER CONTAINER */}
          <div 
            ref={posterRef} 
            className="w-[600px] h-[315px] relative overflow-hidden rounded-xl shadow-2xl shrink-0 border border-slate-700"
            style={{
              background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 100%)',
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Rich Background elements */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            {/* Animated/Glowing stars */}
            <div className="absolute top-8 left-16 text-yellow-200/40"><Star size={16} fill="currentColor" /></div>
            <div className="absolute top-12 left-1/4 text-white/20"><Star size={12} fill="currentColor" /></div>
            <div className="absolute bottom-16 left-1/3 text-blue-200/30"><Star size={20} fill="currentColor" /></div>
            <div className="absolute top-20 right-1/4 text-purple-200/30"><Star size={14} fill="currentColor" /></div>
            <div className="absolute bottom-24 right-16 text-white/20"><Star size={10} fill="currentColor" /></div>

            {/* Constellation lines / Accents */}
            <div className="absolute top-10 left-10 text-white/20 rotate-45 opacity-80 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><Rocket size={56} /></div>
            <div className="absolute top-8 right-12 text-white/20 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"><Moon size={48} /></div>
            
            {/* Vibrant Glowing Orbs */}
            <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-blue-500/40 rounded-full blur-[64px]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[64px]"></div>
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/30 rounded-full blur-[50px]"></div>

            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
              
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-400 text-xl filter drop-shadow-md">🎮</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-wide text-lg drop-shadow-sm">Google Cloud Arcade</span>
              </div>
              
              <h1 className="text-4xl font-black mb-5 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-[0_2px_15px_rgba(250,204,21,0.4)]">
                THE ARCADE
              </h1>

              {/* Premium Glassmorphism Card */}
              <div className="w-full max-w-md border border-white/20 bg-white/5 rounded-2xl p-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Inner card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-blue-400/50">»</div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-blue-400/50">«</div>
                
                <div className="relative z-10">
                  <div className="bg-slate-900/80 rounded-full py-1.5 px-8 mx-auto inline-block mb-3 border border-white/10 shadow-inner">
                    <span className="font-extrabold text-xl text-white tracking-wide">{name}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="text-yellow-400/80 w-6 h-6" />
                    <div className="text-[72px] font-black text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tighter">
                      {points}
                    </div>
                    <Sparkles className="text-yellow-400/80 w-6 h-6" />
                  </div>
                  
                  <div className="text-[11px] text-blue-300 font-bold tracking-[0.25em] uppercase mb-4 mt-1">
                    Arcade Points
                  </div>

                  <div className="border-t border-white/10 pt-4 flex flex-col items-center">
                    <div className="inline-block border border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 rounded-lg px-6 py-1.5 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                      <span className="font-black text-yellow-400 tracking-widest uppercase text-lg">{tier}</span>
                    </div>
                    <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1.5 font-semibold">Prize Tier</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Swag Elements */}
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg">
                  <span className="text-xl filter drop-shadow-md">☁️</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg">
                  <span className="text-sm filter drop-shadow-md">🏆</span>
                </div>
              </div>
              
              <div className="absolute bottom-5 right-6 flex items-center gap-2 filter drop-shadow-xl bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                 <span className="text-2xl hover:scale-110 transition-transform">🎒</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">👕</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">☕</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">🖊️</span>
              </div>
            </div>
          </div>`;

code = code.substring(0, code.indexOf(oldPosterStart)) + newPoster + code.substring(code.indexOf(oldPosterEnd));

fs.writeFileSync('src/components/PosterModal.tsx', code);
