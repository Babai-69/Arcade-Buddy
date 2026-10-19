/**
 * CLI Badge Asset Validator Runner
 * Execute via: npx tsx scripts/validate-badges.ts
 */

import { gameBadges, skillBadges } from '../src/data/badgesData';
import { validateBadgeMetadata, validateBadgeImageAccessibility } from '../src/utils/badgeValidator';

async function main() {
  console.log('\n======================================================');
  console.log('🔍 GOOGLE CLOUD ARCADE BADGE ASSET & METADATA AUDITOR');
  console.log('======================================================\n');

  console.log(`Checking ${gameBadges.length} Game Badges from badgesData.ts...`);

  const report = validateBadgeMetadata(gameBadges);

  console.log(`\n📋 Metadata Audit Summary:`);
  console.log(`- Total Badges Checked: ${report.totalBadgesChecked}`);
  console.log(`- Missing Assets: ${report.missingAssets.length}`);
  console.log(`- Duplicate Names: ${report.duplicates.names.length}`);
  console.log(`- Shared/Duplicate Images: ${report.duplicates.images.length}`);
  console.log(`- Duplicate Links: ${report.duplicates.links.length}`);

  if (report.missingAssets.length > 0) {
    console.log('\n❌ MISSING ASSETS:');
    report.missingAssets.forEach(m => {
      console.log(`  - "${m.title}": missing [${m.missingFields.join(', ')}]`);
    });
  }

  if (report.duplicates.images.length > 0) {
    console.log('\n⚠️ SHARED / DUPLICATE IMAGE URLS:');
    report.duplicates.images.forEach(d => {
      console.log(`  - Asset: ${d.url}`);
      console.log(`    Reused in: ${d.badges.join(' | ')}`);
    });
  }

  console.log('\n🌐 Performing live HTTP accessibility pings on image URLs...');
  const liveResults = await validateBadgeImageAccessibility(gameBadges);
  const broken = liveResults.filter(r => !r.ok);

  console.log(`\n📡 Live Reachability: ${liveResults.length - broken.length}/${liveResults.length} assets healthy`);

  if (broken.length > 0) {
    console.log('\n❌ UNREACHABLE ASSETS:');
    broken.forEach(b => {
      console.log(`  - [${b.status}] ${b.title}: ${b.url}`);
    });
  } else {
    console.log('✅ All checked badge image assets returned HTTP 200 OK!');
  }

  console.log('\n======================================================\n');
}

main().catch(console.error);
