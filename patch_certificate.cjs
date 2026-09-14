const fs = require('fs');
let code = fs.readFileSync('src/components/CertificateTemplate.tsx', 'utf8');

// 1. Remove the dotted underline beneath the recipient name
code = code.replace(
  /\{\/\* Dotted underline \*\/\}\s*<div className="w-2\/3 max-w-\[600px\] mx-auto border-b-2 border-dotted mb-5" style=\{\{ borderColor: '#9aa0a6' \}\}\><\/div>/,
  ""
);

// 2. Remove the Info Pill box
const infoPillRegex = /\{\/\* Info Pill \*\/\}\s*<div[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
// Wait, the closing tags for Info Pill:
//       <div ...>
//         <div ...>...</div>
//         <div ...></div>
//         <div ...>...</div>
//       </div>
// So that's three inner divs and one outer div.

code = code.replace(
  /\{\/\* Info Pill \*\/\}\s*<div\s*className="inline-flex justify-center items-center gap-8 rounded-2xl px-8 py-3 text-\[15px\] mb-4 bg-white"[\s\S]*?Milestone Achieved[\s\S]*?66 Skill Badges<\/span>\s*<\/div>\s*<\/div>/,
  ""
);

fs.writeFileSync('src/components/CertificateTemplate.tsx', code);
