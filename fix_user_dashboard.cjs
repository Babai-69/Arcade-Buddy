const fs = require('fs');

let content = fs.readFileSync('src/components/UserProgressDashboard.tsx', 'utf8');

// For games
content = content.replace(
  /const isCompleted = data\.badges\.some\(\(b: any\) => b\.title\.toLowerCase\(\)\.trim\(\) === game\.title\.toLowerCase\(\)\.trim\(\) && b\.validForProgram\);/g,
  `const isCompleted = data.badges.some((b: any) => {
        const bTitle = b.title.toLowerCase().trim();
        const gTitle = game.title.toLowerCase().trim();
        return (bTitle === gTitle || bTitle.includes(gTitle) || gTitle.includes(bTitle)) && b.validForProgram;
      });`
);

// For skills
content = content.replace(
  /const isCompleted = data\.badges\.some\(\(b: any\) => b\.title\.toLowerCase\(\) === badgeName\.toLowerCase\(\) && b\.validForProgram\);/g,
  `const isCompleted = data.badges.some((b: any) => {
        const bTitle = b.title.toLowerCase().trim();
        const sTitle = badgeName.toLowerCase().trim();
        return (bTitle === sTitle || bTitle.includes(sTitle) || sTitle.includes(bTitle)) && b.validForProgram;
      });`
);

fs.writeFileSync('src/components/UserProgressDashboard.tsx', content, 'utf8');
