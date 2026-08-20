const fs = require('fs');

let code = fs.readFileSync('src/components/InlineBadgeTracker.tsx', 'utf8');

const animatedPointsCode = `
const AnimatedPoints = ({ endVal }: { endVal: number }) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let startTime: number | undefined;
    const duration = 1500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setVal(endVal * easeOutCubic(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(endVal);
      }
    };
    requestAnimationFrame(animate);
  }, [endVal]);

  return <>{val % 1 === 0 ? val : val.toFixed(1)}</>;
};

export function InlineBadgeTracker`;

code = code.replace("export function InlineBadgeTracker", animatedPointsCode);

code = code.replace(
  '<p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>',
  '<p className="text-3xl font-bold text-slate-900 dark:text-white"><AnimatedPoints endVal={stats.total} /></p>'
);
code = code.replace(
  '<p className="text-3xl font-bold text-[#4285F4]">{stats.games}</p>',
  '<p className="text-3xl font-bold text-[#4285F4]"><AnimatedPoints endVal={stats.games} /></p>'
);
code = code.replace(
  '<p className="text-3xl font-bold text-[#FBBC05]">{stats.skills}</p>',
  '<p className="text-3xl font-bold text-[#FBBC05]"><AnimatedPoints endVal={stats.skills} /></p>'
);
code = code.replace(
  '<p className="text-3xl font-bold text-[#34A853]">{stats.points}</p>',
  '<p className="text-3xl font-bold text-[#34A853]"><AnimatedPoints endVal={stats.points} /></p>'
);

fs.writeFileSync('src/components/InlineBadgeTracker.tsx', code);
console.log("Added AnimatedPoints to InlineBadgeTracker");
