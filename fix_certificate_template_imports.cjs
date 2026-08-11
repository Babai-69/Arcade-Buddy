const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCertificatePreview.tsx', 'utf8');

const regex = /const CertificateTemplate.*?\n\);\n/s;
content = content.replace(regex, "import { CertificateTemplate } from './CertificateTemplate';\n");

fs.writeFileSync('src/components/AdminCertificatePreview.tsx', content, 'utf8');
