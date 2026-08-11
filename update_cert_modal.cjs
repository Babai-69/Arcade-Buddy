const fs = require('fs');

let content = fs.readFileSync('src/components/auth/CertificateModal.tsx', 'utf8');

// Imports
content = content.replace("import QRCode from 'qrcode';", `import QRCode from 'qrcode';\nimport html2canvas from 'html2canvas';\nimport { CertificateTemplate } from '../CertificateTemplate';\nimport { useRef, useEffect } from 'react';`);

content = content.replace("  const [isDownloading, setIsDownloading] = useState(false);", `  const [isDownloading, setIsDownloading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileUrl) {
      QRCode.toDataURL(profileUrl, { margin: 1, width: 256 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error("QR Code Error:", err));
    }
  }, [profileUrl]);`);

// Replace handleDownload body
const handleDownloadRegex = /const handleDownload = async \(\) => \{.*?\n  \};/s;

const newHandleDownload = `const handleDownload = async () => {
    if (!isEligible || !name || !profileUrl || !certificateRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1000,
        height: 700
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(\`Arcade_Certificate_\${name.replace(/\\s+/g, '_')}.pdf\`);
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };`;

content = content.replace(handleDownloadRegex, newHandleDownload);

// Insert hidden div
const hiddenDiv = `
          {isEligible && (
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', pointerEvents: 'none' }}>
              <CertificateTemplate name={name} qrCodeUrl={qrCodeUrl} innerRef={certificateRef} id="certificate-modal-print-box" />
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-8">`;

content = content.replace('          <div className="flex justify-end gap-3 mt-8">', hiddenDiv);

fs.writeFileSync('src/components/auth/CertificateModal.tsx', content, 'utf8');
