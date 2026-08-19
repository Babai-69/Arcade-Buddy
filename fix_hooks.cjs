const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

const hooksCode = `                // Generate confetti once on render if totalPoints > 0
                React.useEffect(() => {
                   if(totalPoints > 0) {
                     setTimeout(() => {
                       confetti({
                         particleCount: 100,
                         spread: 70,
                         origin: { y: 0.6 },
                         colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8B7CFA']
                       });
                     }, 1500); // Trigger after count up finishes
                   }
                }, [totalPoints]);

                // Count-up hook
                const AnimatedPoints = ({ endVal }) => {
                  const [val, setVal] = React.useState(0);
                  React.useEffect(() => {
                    let startTime;
                    const duration = 1500;
                    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
                    
                    const step = (timestamp) => {
                      if (!startTime) startTime = timestamp;
                      const progress = Math.min((timestamp - startTime) / duration, 1);
                      setVal(Math.floor(easeOutCubic(progress) * endVal));
                      if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                  }, [endVal]);
                  return <>{val}</>;
                };`;

code = code.replace(hooksCode, '');

// Now we need to add AnimatedPoints OUTSIDE ProfileChecker.
// Let's find `export function ProfileChecker` and insert it above.
const animatedPointsComponent = `
const AnimatedPoints = ({ endVal }: { endVal: number }) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let startTime: number | undefined;
    const duration = 1500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setVal(Math.floor(easeOutCubic(progress) * endVal));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    if (endVal > 0) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8B7CFA']
        });
      }, 1500);
    }
  }, [endVal]);
  return <>{val}</>;
};

`;

code = code.replace('export function ProfileChecker', animatedPointsComponent + 'export function ProfileChecker');

fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
