const fs = require('fs');

let content = fs.readFileSync('src/components/FacilitatorCalculator.tsx', 'utf8');

const target = `      setData({
        name: json.name,
        avatarUrl: json.avatarUrl,
        gameBadges: validGameBadges,
        skillBadges: validSkillBadges,
        gearBadgesCount: Math.min(gearBadgesCount, 4), // cap at 4
        allSkillBadges,
        allGameBadges
      });`;

const newCode = target + `\n
      // Save for UserProgressDashboard to pick up
      localStorage.setItem('arcadeProfileUrl', url);
      // Wait, we also need to store the FULL json output into arcadeProgressData so it can parse it
      // Let's store json as arcadeProgressData
      localStorage.setItem('arcadeProgressData', JSON.stringify(json));
      
      const prevRecent = JSON.parse(localStorage.getItem('arcadeRecentUrls') || '[]');
      const newRecent = [url, ...prevRecent.filter(u => u !== url)].slice(0, 5);
      localStorage.setItem('arcadeRecentUrls', JSON.stringify(newRecent));
`;

content = content.replace(target, newCode);
fs.writeFileSync('src/components/FacilitatorCalculator.tsx', content);
