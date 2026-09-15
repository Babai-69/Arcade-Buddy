const fs = require('fs');
let code = fs.readFileSync('src/components/CertificateTemplate.tsx', 'utf8');

code = code.replace(
  "interface CertificateTemplateProps {",
  "interface CertificateTemplateProps {\n  milestoneName?: string;"
);

code = code.replace(
  "export const CertificateTemplate = ({ name, qrCodeUrl, innerRef, id }: CertificateTemplateProps) => (",
  "export const CertificateTemplate = ({ name, qrCodeUrl, milestoneName, innerRef, id }: CertificateTemplateProps) => ("
);

// We want to replace:
// For successfully completing the <span className="font-bold">Ultimate Milestone</span>
// With:
// For successfully completing <span className="font-bold">{milestoneName || 'the Ultimate Milestone'}</span>

code = code.replace(
  /For successfully completing the <span className="font-bold">Ultimate Milestone<\/span>/g,
  'For successfully completing <span className="font-bold">{milestoneName || \'the Ultimate Milestone\'}</span>'
);

fs.writeFileSync('src/components/CertificateTemplate.tsx', code);
