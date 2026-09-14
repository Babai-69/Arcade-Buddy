const fs = require('fs');
let code = fs.readFileSync('src/components/CertificateTemplate.tsx', 'utf8');

// 1. Add more vertical space between the recipient's name and the paragraph text below it.
// 2. Add a bit more space between 'Certificate of Appreciation' and the recipient's name below it.
// Title:
// <h1 className="text-5xl font-bold mb-6 tracking-tight" style={{ color: '#4A6CF7' }}>
// change mb-6 to mb-10

// Recipient Name:
// <h2 className="text-6xl font-bold font-serif mb-1" style={{ color: '#F4A300',  fontFamily: 'Georgia, serif' }}>
// change mb-1 to mb-10

code = code.replace(
  /<h1 className="text-5xl font-bold mb-6 tracking-tight" style=\{\{ color: '#4A6CF7' \}\}>/g,
  '<h1 className="text-5xl font-bold mb-10 tracking-tight" style={{ color: \'#4A6CF7\' }}>'
);

code = code.replace(
  /<h2 className="text-6xl font-bold font-serif mb-1" style=\{\{ color: '#F4A300',  fontFamily: 'Georgia, serif' \}\}>/g,
  '<h2 className="text-6xl font-bold font-serif mb-10" style={{ color: \'#F4A300\',  fontFamily: \'Georgia, serif\' }}>'
);

// 3. Move both signatures ('Abir Dey' and 'Tripti Gupta') down slightly.
// Current images:
// <img 
//    src="..."
//    alt="Signature"
//    className="h-16 object-contain mb-2 mix-blend-multiply"

// Change mb-2 to mb-0

code = code.replace(
  /className="h-16 object-contain mb-2 mix-blend-multiply"/g,
  'className="h-16 object-contain mb-0 mix-blend-multiply"'
);

fs.writeFileSync('src/components/CertificateTemplate.tsx', code);
