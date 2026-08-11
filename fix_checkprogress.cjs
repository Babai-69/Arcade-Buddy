const fs = require('fs');

let content = fs.readFileSync('src/components/CheckProgress.tsx', 'utf8');

const regexIsCompleted = /const isCompleted = \(b: \{name: string\}\) => completedBadges\.some\(cb =>\s+cb\.title\.toLowerCase\(\)\.trim\(\) === b\.name\.toLowerCase\(\)\.trim\(\)\s+\);/s;
const newIsCompleted = `const isCompleted = (b: {name: string}) => completedBadges.some(cb => {
      const cbTitle = cb.title.toLowerCase().trim();
      const bName = b.name.toLowerCase().trim();
      return cbTitle === bName || bName.includes(cbTitle) || cbTitle.includes(bName);
    });`;
    
content = content.replace(regexIsCompleted, newIsCompleted);

const regexFoundInDb = /const foundInDb = allPossibleBadges\.find\(dbBadge =>\s+dbBadge\.name\.toLowerCase\(\)\.trim\(\) === b\.title\.toLowerCase\(\)\.trim\(\)\s+\);/s;
const newFoundInDb = `const foundInDb = allPossibleBadges.find(dbBadge => {
          const dbName = dbBadge.name.toLowerCase().trim();
          const bTitle = b.title.toLowerCase().trim();
          return dbName === bTitle || bTitle.includes(dbName) || dbName.includes(bTitle);
        });`;

content = content.replace(regexFoundInDb, newFoundInDb);

fs.writeFileSync('src/components/CheckProgress.tsx', content, 'utf8');
