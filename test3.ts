import { gameBadges } from './src/data/badgesData';
import { fetchArcadeGames } from './src/utils/arcadeApi';

const completedBadges = [
  { title: "Some skill", validForProgram: true },
  { title: "Another skill", validForProgram: true }
];

async function run() {
  const activeGames = await fetchArcadeGames();

  const isCompleted = (b) => completedBadges.some(cb => {
    const cbTitle = cb.title.toLowerCase().trim();
    const bName = b.name.toLowerCase().trim();
    const exactMatch = cbTitle === bName || cbTitle.replace(/-/g, '') === bName.replace(/-/g, '');
    if (exactMatch && cb.validForProgram !== false) return true;
    const isCbReTrail = cbTitle.includes('re-trail') || cbTitle.includes('retrail');
    const isBReTrail = bName.includes('re-trail') || bName.includes('retrail');
    const isMatch = 
           (bName.includes('devops engineer') && cbTitle.includes('devops engineer')) ||
           (bName.includes('pitch perfect') && cbTitle.includes('pitch perfect')) ||
           (bName.includes('network security') && cbTitle.includes('network security')) ||
           (bName.includes('spans and plans') && cbTitle.includes('spans and plans')) ||
           (bName.includes('base camp') && cbTitle.includes('base camp')) ||
           (bName.includes('adventure') && cbTitle.includes('adventure')) ||
           (bName.includes('voyage') && cbTitle.includes('voyage')) ||
           (bName.includes('trail') && cbTitle.includes('trail') && isCbReTrail === isBReTrail);

    if (!isMatch || cb.validForProgram === false) return false;
    
    const isGeneric = ['base camp', 'adventure', 'voyage', 'trail'].some(kw => bName.includes(kw) && cbTitle !== bName);
    if (isGeneric) {
      if (!cb.earnedDate || (!cb.earnedDate.includes('Aug') && !cb.earnedDate.includes('Sep'))) {
        return false;
      }
    }
    return true;
  });

  const dynamicGameBadges = activeGames.map(ag => ({
    name: ag.title,
    image: ag.img,
    link: ag.link
  }));

  const combinedGameBadges = [...dynamicGameBadges];
  gameBadges.forEach(gb => {
    if (!combinedGameBadges.some(b => b.name.toLowerCase() === gb.name.toLowerCase())) {
      combinedGameBadges.push(gb);
    }
  });

  const game = combinedGameBadges
    .filter(b => !isCompleted(b))
    .map(b => ({ ...b, category: 'Game', points: 1, type: 'GAME' }));

  console.log(game.length);
}

run();
