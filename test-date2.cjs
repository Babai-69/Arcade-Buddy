const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('profile.html', 'utf8');
const $ = cheerio.load(html);

const START_DATE = new Date('2026-07-13T00:00:00Z');
const END_DATE = new Date('2026-09-14T18:29:00Z');

$(".profile-badge").each((i, el) => {
  const rawText = $(el).text() || "";
  const title = $(el).find(".badge-title, .ql-title-medium").text().trim() || $(el).attr('alt') || rawText || "";
  const dateText = $(el).find(".ql-body-medium.l-mbs, .ql-body-medium").text().trim();
  let validForProgram = true;
  if (dateText) {
    let cleanDateStr = dateText.replace("Earned ", "").replace(/ EDT| EST| PDT| PST/g, "").trim();
    let parsedDate = new Date(cleanDateStr);
    if (!isNaN(parsedDate.getTime())) {
      if (parsedDate < START_DATE || parsedDate > END_DATE) validForProgram = false;
    } else {
      validForProgram = false;
    }
    console.log(title, "|", cleanDateStr, "|", parsedDate.getTime(), "|", validForProgram);
  }
});
