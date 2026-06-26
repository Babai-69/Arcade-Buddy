import * as cheerio from "cheerio";

async function main() {
  const url = "https://www.cloudskillsboost.google/public_profiles/7a0c9c4d-4215-4f16-a18c-47784257bde1";
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // count badges
  const profileName = $("h1").text().trim();
  console.log("Name:", profileName);

  let gameBadges = 0;
  let triviaBadges = 0;
  let skillBadges = 0;
  
  $(".profile-badge").each((i, el) => {
     // print the text inside
     console.log("Badge:", $(el).text().trim());
  });
  
}
main();
