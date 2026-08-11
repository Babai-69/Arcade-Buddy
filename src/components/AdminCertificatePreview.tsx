import React, { useState, useRef, useEffect } from 'react';
import { Award, Download, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

import { CertificateTemplate } from './CertificateTemplate';

export function AdminCertificatePreview() {
  const [name, setName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  // Generate QR code for the preview template automatically when url changes
  useEffect(() => {
    if (profileUrl) {
      QRCode.toDataURL(profileUrl, { margin: 0, width: 120 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err));
    } else {
      setQrCodeUrl('');
    }
  }, [profileUrl]);

  const handleTestGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !profileUrl) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      setSuccess('Generating certificate...');
      await generateCertificatePDF(name);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setLoading(false);
    }
  };

  const generateCertificatePDF = async (userName: string) => {
    if (!certificateRef.current) return;
    
    try {
      // Create a wrapper div to temporarily hold a clone without scale for clean capture
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // high resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1000,
        height: 700
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Force A4 portrait regardless of landscape content
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit exactly within A4 width with a small 10mm margin
      const margin = 10;
      const printWidth = pdfWidth - (margin * 2);
      // Landscape aspect ratio is 1000/700 = 1.428... -> height = width * (700/1000)
      const printHeight = (700 * printWidth) / 1000; 
      
      // Perfectly center vertically on the portrait page
      const xPos = margin;
      const yPos = (pdfHeight - printHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xPos, yPos, printWidth, printHeight, undefined, 'FAST');
      pdf.save(`Arcade_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Error generating the PDF document.');
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg uppercase tracking-wider">
        Admin Preview
      </div>
      
      <div className="flex flex-col xl:flex-row gap-8 mt-4">
        {/* Left Side: Explain and Test Form */}
        <div className="w-full xl:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              Certificate Generator System
            </h3>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This module generates the Ultimate Milestone Certificate for users who meet the criteria within the program timeline. 
            <strong> Criteria: &ge;66 Skill Badges AND &ge;12 Game Badges.</strong>
          </p>
          
          <form onSubmit={handleTestGeneration} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Test Generation (Live Check)</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Public Profile URL
              </label>
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://www.skills.google/public_profiles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-5 h-5" /> Download Certificate
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-start gap-2 text-sm mt-3">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-start gap-2 text-sm mt-3">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Visual Template Preview */}
        <div className="w-full xl:w-2/3 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 overflow-x-auto">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 tracking-wider uppercase">Visual Template Preview</p>
          
          <div className="origin-top lg:scale-[0.8] xl:scale-[0.62] transform" style={{ width: '1000px', height: '700px', transformOrigin: 'top center' }}>
            <CertificateTemplate name={name} qrCodeUrl={qrCodeUrl} id="certificate-preview-box" />
          </div>
          
          <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', pointerEvents: 'none' }}>
            <CertificateTemplate name={name} qrCodeUrl={qrCodeUrl} id="certificate-print-box" innerRef={certificateRef} />
          </div>
          
          <p className="text-xs text-slate-400 mt-4 text-center">
            * High resolution PDF will be generated upon successful profile verification.
          </p>
        </div>
      </div>
    </div>
  );
}

