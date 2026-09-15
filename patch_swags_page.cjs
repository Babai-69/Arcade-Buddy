const fs = require('fs');
let code = fs.readFileSync('src/pages/SwagsPage.tsx', 'utf8');

// Add imports
code = code.replace(
  "import { Info, ChevronRight, ArrowRight, Gift } from 'lucide-react';",
  "import { Info, ChevronRight, ArrowRight, Gift, X, CheckCircle2 } from 'lucide-react';\nimport { AnimatePresence, motion } from 'motion/react';"
);

// Rewrite SwagDropsSection
const newSwagDropsSection = `const swagDrops = [
  {
    id: 1,
    name: "The Arcade Weather-Shield Jacket",
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1789493091/ChatGPT_Image_Sep_15_2026_10_52_46_PM_gwx7aq.png",
    tiers: ["Champion", "Legend"],
    specs: [
      { title: "Storm-ready weave", desc: "Repels light rain and shuts down gusting winds before they hit your layer." },
      { title: "Official branding", desc: "Clean Google Cloud logo on the left chest paired with the super cloud logo on the sleeve." },
      { title: "Total draft block", desc: "High collar, custom Velcro cuffs, and a ribbed elastic hem lock warmth in." },
      { title: "Secure cargo", desc: "Deep zippered hand-warmer pockets keep your essentials safe." },
      { title: "Weightless mobility", desc: "Technical performance without the heavy winter bulk." }
    ]
  }
];

function SwagDropsSection() {
  const [activeTab, setActiveTab] = useState('All Tiers');
  const tabs = ['All Tiers', 'Trooper', 'Ranger', 'Champion', 'Legend'];
  const [selectedSwag, setSelectedSwag] = useState<any>(null);

  const filteredSwags = swagDrops.filter(swag => 
    activeTab === 'All Tiers' || swag.tiers.includes(activeTab)
  );

  return (
    <div className="w-full max-w-5xl mx-auto mb-24 relative z-10 pt-4">
       {/* Subtle Grid Background for this section */}
       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
       
       <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 blur-[100px] rounded-full pointer-events-none"></div>
       
       <div className="text-center mb-10">
         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200/80 dark:border-orange-800/50 text-orange-500 dark:text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm">
           <Gift className="w-3.5 h-3.5" /> REWARDS VAULT
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-[#1e293b] dark:text-white mb-4">Swag Drops</h2>
         <p className="text-slate-500 text-[15px] max-w-lg mx-auto leading-relaxed">
           Unlock exclusive Arcade swag by completing challenges and reaching prize tiers.
         </p>
       </div>
       
       {/* Tabs */}
       <div className="flex flex-wrap justify-center gap-3 mb-10">
         {tabs.map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={\`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all border \${
               activeTab === tab 
                 ? 'bg-[#4285F4] text-white border-[#4285F4] shadow-[0_4px_14px_rgba(66,133,244,0.3)]' 
                 : 'bg-white dark:bg-[#161b22] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm'
             }\`}
           >
             {tab}
           </button>
         ))}
       </div>

       {filteredSwags.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredSwags.map((swag) => (
             <motion.div 
               key={swag.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
               onClick={() => setSelectedSwag(swag)}
             >
               <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center p-6">
                 <img 
                   src={swag.image} 
                   alt={swag.name} 
                   className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                 />
                 <div className="absolute top-4 left-4 flex gap-2">
                   {swag.tiers.map(t => (
                     <span key={t} className={\`px-2 py-1 text-[10px] font-bold uppercase rounded-full \${t === 'Champion' ? 'bg-[#FBBC05] text-slate-900' : 'bg-[#EA4335] text-white'}\`}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{swag.name}</h3>
                 <p className="text-sm text-slate-500 font-medium flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                   View details <ArrowRight className="w-4 h-4" />
                 </p>
               </div>
             </motion.div>
           ))}
         </div>
       ) : (
         /* Empty State Box */
         <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-[32px] p-12 md:p-24 flex flex-col items-center justify-center text-center bg-white/60 dark:bg-[#161b22]/40 backdrop-blur-md relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] mx-4 md:mx-0">
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute w-[100px] h-[100px] rounded-full border border-dashed border-amber-200/80 dark:border-amber-900/50 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-[120px] h-[120px] rounded-full border border-dashed border-amber-100 dark:border-amber-900/30 animate-[spin_30s_linear_infinite_reverse]"></div>
              <div className="w-20 h-20 rounded-full bg-[#FFFBEB] dark:bg-amber-900/20 flex items-center justify-center relative z-10 shadow-sm border border-amber-100 dark:border-amber-900/30">
                <Gift className="w-10 h-10 text-[#F59E0B] drop-shadow-sm" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-[20px] font-black text-slate-900 dark:text-white mb-4">No Swag Drops for {activeTab}</h3>
            <p className="text-slate-500 text-[14px] max-w-[360px] mx-auto leading-relaxed">
              Check back later once rewards are announced for this tier.
            </p>
         </div>
       )}

       {/* Modal for Swag Details */}
       <AnimatePresence>
         {selectedSwag && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
               onClick={() => setSelectedSwag(null)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row"
             >
               <button 
                 onClick={() => setSelectedSwag(null)}
                 className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors z-10"
               >
                 <X className="w-5 h-5" />
               </button>
               
               {/* Image Section */}
               <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8 md:p-12 relative min-h-[300px]">
                 <motion.img 
                   initial={{ scale: 0.8 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 0.4 }}
                   src={selectedSwag.image} 
                   alt={selectedSwag.name} 
                   className="w-full h-full object-contain drop-shadow-2xl"
                 />
                 <div className="absolute bottom-6 left-6 flex gap-2">
                   {selectedSwag.tiers.map((t: string) => (
                     <span key={t} className={\`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm \${t === 'Champion' ? 'bg-[#FBBC05] text-slate-900' : 'bg-[#EA4335] text-white'}\`}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
               
               {/* Details Section */}
               <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                   {selectedSwag.name}
                 </h2>
                 
                 <div className="space-y-5">
                   {selectedSwag.specs.map((spec: any, idx: number) => (
                     <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       key={idx} 
                       className="flex gap-3 items-start"
                     >
                       <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
                       <div>
                         <span className="font-bold text-slate-900 dark:text-white mr-2">{spec.title}:</span>
                         <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{spec.desc}</span>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}`;

// I need to replace the entire SwagDropsSection function.
const codeStr = code;
const startIdx = codeStr.indexOf("function SwagDropsSection()");
if (startIdx !== -1) {
  // It goes until the end of the file or the end of the function.
  // In this file, SwagDropsSection is the last function.
  code = codeStr.substring(0, startIdx) + newSwagDropsSection + "\n";
  fs.writeFileSync('src/pages/SwagsPage.tsx', code);
}
