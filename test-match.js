const bName1 = 'arcade trail: cloud delivery systems';
const cbTitle1 = 'arcade retrail';

const isCbReTrail = cbTitle1.includes('re-trail') || cbTitle1.includes('retrail');
const isBReTrail = bName1.includes('re-trail') || bName1.includes('retrail');

console.log(isCbReTrail === isBReTrail); // should be false
