const START_DATE = new Date('2026-07-13T00:00:00Z');
const END_DATE = new Date('2026-09-14T18:29:00Z');

let dateText = "Earned Jul 13, 2026 EDT";
let validForProgram = true;

let cleanDateStr = dateText.replace("Earned ", "").replace(/ EDT| EST| PDT| PST/g, "").trim();
let parsedDate = new Date(cleanDateStr + " UTC");

if (!isNaN(parsedDate.getTime())) {
  if (parsedDate < START_DATE || parsedDate > END_DATE) validForProgram = false;
} else {
  validForProgram = false;
}

console.log(cleanDateStr, parsedDate.getTime(), parsedDate.toISOString(), validForProgram);
