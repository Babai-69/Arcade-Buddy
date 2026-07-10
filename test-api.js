const cheerio = require('cheerio');

async function test() {
  const url = 'https://www.skills.google/public_profiles/e264c665-e317-4ede-9694-cbaa41426c9d';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  $(".profile-badge").each((i, el) => {
    const rawText = $(el).text() || "";
    const title = $(el).find(".badge-title, .ql-title-medium").text().trim() || $(el).attr('alt') || rawText || "";
    console.log("Badge found:", title);
  });
}
test();
