const START_DATE = new Date('2026-07-13T00:00:00Z');
const END_DATE = new Date('2026-09-14T18:29:00Z');

let dateText = "Earned Jul 13, 2026 EDT";
let cleanDateStr = dateText.replace("Earned ", "").replace(/ EDT| EST| PDT| PST/g, "").trim();
let parsedDate = new Date(cleanDateStr);

console.log("cleanDateStr:", cleanDateStr);
console.log("parsedDate:", parsedDate);
console.log("parsedDate.getTime():", parsedDate.getTime());
console.log("START_DATE.getTime():", START_DATE.getTime());
console.log("parsedDate < START_DATE", parsedDate < START_DATE);

