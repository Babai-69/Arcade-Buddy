const fs = require('fs');
let content = fs.readFileSync('src/pages/FaqPage.tsx', 'utf8');

// Find the first occurrence of "type FaqCategory ="
const firstOccur = content.indexOf("type FaqCategory =");
if (firstOccur !== -1) {
  // Find the original start
  const allFaqsEnd = content.indexOf("];", content.indexOf("const allFaqs =")) + 2;
  
  // Cut content up to allFaqsEnd
  const topPart = content.substring(0, allFaqsEnd);
  
  // The script has the replacement part
  const rest = content.substring(firstOccur);
  
  // Find if there are duplicates of "type FaqCategory =" inside `rest`
  const secondOccur = rest.indexOf("type FaqCategory =", 10);
  
  if (secondOccur !== -1) {
     // cut from topPart to secondOccur
     content = topPart + "\n\n" + rest.substring(secondOccur);
     fs.writeFileSync('src/pages/FaqPage.tsx', content);
     console.log("Fixed duplicates!");
  }
}
