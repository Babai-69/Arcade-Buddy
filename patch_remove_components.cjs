const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

// 1. Remove ArcadePointsSystem import
code = code.replace(
  "import { ArcadePointsSystem } from '../components/ArcadePointsSystem';\n", 
  ""
);

// 2. Remove ArcadePointsSystem usage
code = code.replace(
  "        <ArcadePointsSystem />\n",
  ""
);

// 3. Remove Prize Tiers section
const prizeTiersSection = `        {/* Prize Tiers */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900 dark:text-white">ARCADE PRIZE TIERS</h2>
            <p className="text-sm text-slate-500">Prize Tier spots refresh weekly. The first-come, first-served rule triggers at the highest level. Full Tier details & swag drops <a href="#" className="text-blue-500 underline">here</a>.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TierCard name="Trooper" points={50} totalPoints={totalPoints} spots={spots.trooper} icon="🕹️" bgClass="bg-[#FCE8E6]" borderClass="border-red-200" color="red" />
            <TierCard name="Ranger" points={75} totalPoints={totalPoints} spots={spots.ranger} icon="🎮" bgClass="bg-[#E8F0FE]" borderClass="border-blue-200" color="blue" />
            <TierCard name="Champion" points={95} totalPoints={totalPoints} spots={spots.champion} icon="👾" bgClass="bg-[#F3E8FD]" borderClass="border-purple-200" color="purple" />
            <TierCard name="Legend" points={120} totalPoints={totalPoints} spots={spots.legend} icon="🌟" bgClass="bg-[#E6F4EA]" borderClass="border-green-200" color="green" />
          </div>
          <div className="text-right text-xs text-slate-400 mt-2">Last refreshed: Aug 31, 2026 at 8:08 AM UTC</div>
        </div>
        
`;

code = code.replace(prizeTiersSection, "");

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
