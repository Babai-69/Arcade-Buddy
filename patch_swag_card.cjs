const fs = require('fs');
let code = fs.readFileSync('src/pages/SwagsPage.tsx', 'utf8');

const oldCard = `function SwagCard({ image, name, milestone, color }: any) {
  return (
    <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left group">
      <div className="aspect-square w-full overflow-hidden relative bg-slate-50 dark:bg-[#0d1117] p-6 flex items-center justify-center">
        <div className={\`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold rounded-full z-10 shadow-sm \${color}\`}>
          {milestone}
        </div>
        <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
        <p className="text-xs text-slate-500">Official Swag Bundle</p>
      </div>
    </div>
  );
}`;

const newCard = `function SwagCard({ image, name, milestone, color }: any) {
  return (
    <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-50 dark:bg-[#0d1117] p-6 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6 relative border-t border-slate-100 dark:border-slate-800">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex justify-center w-full">
          <div className={\`px-4 py-1 text-xs font-black tracking-widest uppercase rounded-full shadow-md border-2 border-white dark:border-[#161b22] \${color}\`}>
            {milestone}
          </div>
        </div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 mt-2">{name}</h3>
        <p className="text-sm font-semibold text-slate-500">Official Swag Bundle</p>
      </div>
    </div>
  );
}`;

code = code.replace(oldCard, newCard);
fs.writeFileSync('src/pages/SwagsPage.tsx', code);
