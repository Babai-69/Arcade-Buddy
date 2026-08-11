const fs = require('fs');

let content = fs.readFileSync('src/components/auth/CertificateModal.tsx', 'utf8');

const replacement = `import html2canvas from 'html2canvas';
import { CertificateTemplate } from '../CertificateTemplate';
import { useRef } from 'react';

// Insert this inside CertificateModal component:
// const certificateRef = useRef<HTMLDivElement>(null);
// const [qrCodeUrl, setQrCodeUrl] = useState('');
`;

// It's probably easier to just overwrite the file or use multi_edit.
