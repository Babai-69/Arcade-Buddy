const fs = require('fs');
let code = fs.readFileSync('src/components/ProgramInformation.tsx', 'utf8');

// The issue is an unbalanced JSX tag structure. Let's find the end of the file and rewrite it cleanly.
const replacement = `      {showPoints && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 group-hover:bg-green-500/10 transition-colors duration-500" />
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white text-center mb-6">Arcade Points System</h3>
            <div className="space-y-3">
              <PointRow icon="🚀" name="Arcade Adventure" points="1 pt each" color="bg-[#8b5cf6]" />
              <PointRow icon="🚢" name="Arcade Voyage" points="1 pt each" color="bg-[#0ea5e9]" />
              <PointRow icon="🧭" name="Arcade Trail" points="1 pt each" color="bg-[#8b5cf6]" />
              <PointRow icon="👑" name="Arcade Special" points="X pt each" color="bg-[#f43f5e]" />
              <PointRow icon="⚡" name="Base Camp" points="1 pt each" color="bg-[#f97316]" />
              <PointRow icon="🛠️" name="Skill Badge" points="0.5 pt each" color="bg-[#22c55e]" />
              <PointRow icon="🏆" name="Facilitator Milestones" points="Bonus pts" color="bg-[#0ea5e9]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PointRow({ icon, name, points, color }: { icon: string, name: string, points: string, color: string }) {`;

// We use regex to replace everything from {showPoints && ( to function PointRow
const regex = /\{showPoints && \([\s\S]*?function PointRow\(\{ icon, name, points, color \}: \{ icon: string, name: string, points: string, color: string \}\) \{/;
code = code.replace(regex, replacement);

fs.writeFileSync('src/components/ProgramInformation.tsx', code);
