const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

// 1. Pass dotColor to Section 1 FeatureCards
code = code.replace(
  'bgClass="bg-indigo-50 dark:bg-indigo-500/10" />',
  'bgClass="bg-indigo-50 dark:bg-indigo-500/10" dotColor="bg-indigo-500" />'
);
code = code.replace(
  'bgClass="bg-emerald-50 dark:bg-emerald-500/10" />',
  'bgClass="bg-emerald-50 dark:bg-emerald-500/10" dotColor="bg-emerald-500" />'
);
code = code.replace(
  'bgClass="bg-blue-50 dark:bg-blue-500/10" />',
  'bgClass="bg-blue-50 dark:bg-blue-500/10" dotColor="bg-blue-500" />'
);
code = code.replace(
  'bgClass="bg-fuchsia-50 dark:bg-fuchsia-500/10" />',
  'bgClass="bg-fuchsia-50 dark:bg-fuchsia-500/10" dotColor="bg-amber-500" />' // image uses yellow/amber for 'completely free'
);

// 2. Pass dotColor to Section 2 FeatureCards
code = code.replace(
  'bgClass="bg-violet-50 dark:bg-violet-500/10" />',
  'bgClass="bg-violet-50 dark:bg-violet-500/10" dotColor="bg-violet-500" />'
);
code = code.replace(
  'bgClass="bg-cyan-50 dark:bg-cyan-500/10" />',
  'bgClass="bg-cyan-50 dark:bg-cyan-500/10" dotColor="bg-cyan-500" />'
);
code = code.replace(
  'bgClass="bg-amber-50 dark:bg-amber-500/10" />',
  'bgClass="bg-amber-50 dark:bg-amber-500/10" dotColor="bg-amber-500" />'
);
code = code.replace(
  'bgClass="bg-rose-50 dark:bg-rose-500/10" />',
  'bgClass="bg-rose-50 dark:bg-rose-500/10" dotColor="bg-rose-500" />'
);

// 3. Update FeatureCard component
const oldFeatureCard = `function FeatureCard({ icon: Icon, title, desc, colorClass = "text-blue-500", bgClass = "bg-blue-50 dark:bg-blue-500/10" }: any) {
  return (
    <div className="group bg-white dark:bg-[#0a0e17] border border-slate-200/80 dark:border-white/5 p-6 rounded-2xl text-left shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
       <div className={\`w-12 h-12 rounded-xl flex items-center justify-center mb-4 \${bgClass} transition-colors\`}>
         <Icon className={\`w-6 h-6 \${colorClass}\`} />
       </div>
       <div className="text-slate-900 dark:text-white font-bold text-[15.5px] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
         {title}
       </div>
       <p className="text-slate-500 dark:text-slate-400 text-[13.5px] leading-relaxed">
         {desc}
       </p>
    </div>
  );
}`;

const newFeatureCard = `function FeatureCard({ icon: Icon, title, desc, colorClass = "text-blue-500", bgClass = "bg-blue-50 dark:bg-blue-500/10", dotColor = "bg-blue-500" }: any) {
  return (
    <div className="group relative mt-2 bg-white dark:bg-[#0a0e17] border border-slate-200/80 dark:border-white/5 p-6 rounded-2xl text-left shadow-sm hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
       <div className="absolute top-0 left-6 -translate-y-1/2 flex items-center h-2">
         <div className={\`w-3.5 h-3.5 rounded-full \${dotColor} border-[3px] border-white dark:border-[#0a0e17]\`}></div>
         <div className="w-12 h-[1px] bg-slate-200 dark:bg-slate-700 ml-3 hidden sm:block"></div>
       </div>

       <div className="flex items-center gap-4 mb-4">
         <div className={\`w-10 h-10 rounded-xl flex items-center justify-center \${bgClass} transition-colors\`}>
           <Icon className={\`w-5 h-5 \${colorClass}\`} />
         </div>
         <div className="text-slate-900 dark:text-white font-bold text-[16px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
           {title}
         </div>
       </div>
       <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed">
         {desc}
       </p>
    </div>
  );
}`;

code = code.replace(oldFeatureCard, newFeatureCard);
fs.writeFileSync('src/pages/AboutPage.tsx', code, 'utf8');
console.log("Patched FeatureCard styling.");
