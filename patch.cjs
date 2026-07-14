const fs = require('fs');

const file1 = 'src/components/FacilitatorBadgeTracker.tsx';
let content1 = fs.readFileSync(file1, 'utf8');

const regex1 = /const START_DATE =[\s\S]*?return \{ gameBadges: games, skillBadges: skills, excludedBadges: excluded \};\n  \}, \[participant\]\);/g;

const replacement1 = `  const { gameBadges, skillBadges, excludedBadges } = useMemo(() => {
    const games: BadgeRecord[] = [];
    const skills: BadgeRecord[] = [];
    const excluded: { badge: BadgeRecord, reason: string }[] = [];

    if (participant && participant.badges) {
      participant.badges.forEach(badge => {
        if (!badge.validForProgram) {
          excluded.push({ badge, reason: 'Outside program timeline or invalid' });
          return;
        }

        if (badge.category === 'Game') {
          games.push(badge);
        } else if (badge.category === 'Skill') {
          skills.push(badge);
        } else {
          excluded.push({ badge, reason: 'Not eligible type (' + badge.category + ')' });
        }
      });
    }

    return { gameBadges: games, skillBadges: skills, excludedBadges: excluded };
  }, [participant]);`;

content1 = content1.replace(regex1, replacement1);
fs.writeFileSync(file1, content1);

const file2 = 'src/components/BadgeTracker.tsx';
let content2 = fs.readFileSync(file2, 'utf8');

const regex2 = /\/\/ Constants for Date Boundaries[\s\S]*?return \{\n      eligibleBadges: eligible,\n      excludedBadges: excluded,\n      stats: \{\n        total: eligible.length,\n        games: gameCount,\n        skills: skillCount,\n        points: eligiblePoints\n      \}\n    \};\n  \}, \[participant\]\);/g;

const replacement2 = `  const { eligibleBadges, excludedBadges, stats } = useMemo(() => {
    const eligible: BadgeRecord[] = [];
    const excluded: BadgeRecord[] = [];
    let gameCount = 0;
    let skillCount = 0;
    let eligiblePoints = 0;

    if (participant && participant.badges) {
      participant.badges.forEach(badge => {
        if (badge.validForProgram) {
          eligible.push(badge);
          if (badge.category === 'Game') {
            gameCount++;
            eligiblePoints += 1;
          } else if (badge.category === 'Skill') {
            skillCount++;
            eligiblePoints += 0.5;
          }
        } else {
          excluded.push(badge);
        }
      });
    }

    return {
      eligibleBadges: eligible,
      excludedBadges: excluded,
      stats: {
        total: eligible.length,
        games: gameCount,
        skills: skillCount,
        points: eligiblePoints
      }
    };
  }, [participant]);`;

content2 = content2.replace(regex2, replacement2);
fs.writeFileSync(file2, content2);
