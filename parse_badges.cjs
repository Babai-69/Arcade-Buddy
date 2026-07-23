const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
  const url = 'https://www.cloudskillsboost.google/public_profiles/7a0c9c4d-4215-4f16-a18c-47784257bde1';
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const badges = [];
  const START_DATE = new Date('2026-07-13T00:00:00Z');
  const END_DATE = new Date('2026-09-14T18:29:00Z');
  
  $('.profile-badge').each((i, el) => {
    const title = $(el).find('span.ql-title-medium').text().trim();
    const dateStr = $(el).find('span.ql-body-medium').text().replace('Earned', '').trim();
    const date = new Date(dateStr);
    
    if (date >= START_DATE && date <= END_DATE) {
        badges.push(title);
    }
  });

  fs.writeFileSync('badges_dump.json', JSON.stringify(badges, null, 2));
  console.log('Dumped to badges_dump.json');
}

run();
