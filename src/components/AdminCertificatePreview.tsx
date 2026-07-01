import React, { useState, useRef, useEffect } from 'react';
import { Award, Download, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

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
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(profileUrl)}`);
      if (!res.ok) throw new Error('Could not fetch profile. Ensure your profile is public.');
      
      const data = await res.json();
      const userStats = {
        gameBadges: data.gameBadges || 0,
        skillBadges: data.skillBadges || 0
      };

      if (userStats.gameBadges >= 12 && userStats.skillBadges >= 66) {
        setSuccess('User is eligible! Generating certificate...');
        await generateCertificatePDF(name);
      } else {
        setError(`Not eligible. Found ${userStats.skillBadges} Skill Badges (needs 66) and ${userStats.gameBadges} Game Badges (needs 12).`);
      }
    } catch (err: any) {
      setError(err.message || 'Error verifying profile.');
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
        height: 700,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('certificate-preview-box');
          if (el) {
            el.style.transform = 'none';
            el.parentElement!.style.transform = 'none';
          }
        }
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
            {/* The Certificate Template */}
            <div 
              ref={certificateRef}
              id="certificate-preview-box"
              style={{ width: '1000px', height: '700px', fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="bg-white border-4 border-slate-100 shadow-xl relative overflow-hidden text-center flex flex-col items-center"
            >
              {/* Corner Blobs */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#EA4335] rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ borderRadius: '43% 57% 70% 30% / 30% 55% 45% 70%' }}></div>
              <div className="absolute -top-24 -right-12 w-80 h-80 bg-[#4285F4] rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ borderRadius: '23% 77% 10% 90% / 30% 24% 76% 70%' }}></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#34A853] rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ borderRadius: '63% 37% 30% 70% / 50% 64% 36% 50%' }}></div>
              <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-[#FBBC05] rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ borderRadius: '73% 27% 30% 70% / 80% 24% 76% 20%' }}></div>
              
              {/* Stack of 4 small colored dots (green, yellow, blue, red) */}
              <div className="absolute top-20 right-16 flex flex-col gap-3">
                <div className="w-4 h-4 rounded-full bg-[#34A853]"></div>
                <div className="w-4 h-4 rounded-full bg-[#FBBC05]"></div>
                <div className="w-4 h-4 rounded-full bg-[#4285F4]"></div>
                <div className="w-4 h-4 rounded-full bg-[#EA4335]"></div>
              </div>

              {/* Header Content */}
              <div className="mt-12 z-10 w-full px-20">
                {/* Google Cloud wordmark */}
                <div className="flex justify-center items-center gap-3 mb-2">
                  <div className="text-5xl font-bold tracking-tighter">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </div>
                  <div className="text-5xl text-gray-500 tracking-tight">
                    Cloud
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-[#4285F4] font-bold tracking-widest text-lg uppercase mb-4">
                  ARCADE FACILITATOR PROGRAM 2026
                </p>

                {/* Title */}
                <h1 className="text-5xl font-bold text-[#4A6CF7] mb-6 tracking-tight">
                  Certificate of Appreciation
                </h1>
                
                {/* Recipient Name */}
                <h2 className="text-6xl font-bold text-[#F4A300] font-serif mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {name || 'Student Name'}
                </h2>
                
                {/* Dotted underline */}
                <div className="w-2/3 max-w-[600px] mx-auto border-b-2 border-dotted border-[#9aa0a6] mb-5"></div>

                {/* Body Text */}
                <p className="text-[#1e7a4d] text-lg leading-relaxed max-w-[700px] mx-auto mb-6 font-medium">
                  For successfully completing the <span className="font-bold">Ultimate Milestone</span> of the Google Cloud Arcade Facilitator Program 2026, demonstrating outstanding consistency, dedication and cloud learning excellence during the program timeline.
                </p>

                {/* Info Pill */}
                <div className="inline-flex justify-center items-center gap-8 bg-white border border-gray-200 rounded-2xl px-8 py-3 text-gray-700 text-[15px] shadow-sm mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#4285F4] text-[11px] uppercase tracking-wider mb-0.5">Program Duration</span>
                    <span className="font-medium text-gray-800">13th July 2026 – 14th September 2026</span>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#4285F4] text-[11px] uppercase tracking-wider mb-0.5">Milestone Achieved</span>
                    <span className="font-medium text-gray-800">12 Game Badges + 66 Skill Badges</span>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="absolute bottom-12 left-0 w-full px-20 flex justify-between items-end z-10">
                {/* Left Signature */}
                <div className="flex flex-col items-center w-[250px]">
                  <img 
                    src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782921503/signature_mqwxcl.png" 
                    alt="Signature" 
                    className="h-16 object-contain mb-2 mix-blend-multiply" 
                    crossOrigin="anonymous"
                  />
                  <div className="w-full border-b border-dotted border-[#9aa0a6] mb-2"></div>
                  <p className="font-bold text-gray-800 text-lg">Abir Dey</p>
                  <p className="text-gray-500 text-sm">Arcade Facilitator</p>
                </div>

                {/* Center QR */}
                <div className="flex flex-col items-center justify-end pb-1">
                  <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 mb-2">
                    {qrCodeUrl ? (
                      <img src={qrCodeUrl} alt="QR Code" className="w-[96px] h-[96px] rounded-lg" />
                    ) : (
                      <div className="w-[96px] h-[96px] bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                        <span className="text-gray-400 text-[10px] text-center p-2 leading-tight">Enter URL<br/>to generate<br/>QR</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-[11px] font-medium tracking-wide uppercase">Scan to Verify</p>
                </div>

                {/* Right Signature */}
                <div className="flex flex-col items-center w-[250px]">
                  <img 
                    src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782921368/f50b015a-ad12-4117-bba1-0d21503e0ff5_lz3yej.png" 
                    alt="Signature" 
                    className="h-16 object-contain mb-2 mix-blend-multiply"
                    crossOrigin="anonymous" 
                  />
                  <div className="w-full border-b border-dotted border-[#9aa0a6] mb-2"></div>
                  <p className="font-bold text-gray-800 text-lg">Tripti Gupta</p>
                  <p className="text-gray-500 text-sm">Arcade Facilitator</p>
                </div>
              </div>

            </div>
          </div>
          
          <p className="text-xs text-slate-400 mt-4 text-center">
            * High resolution PDF will be generated upon successful profile verification.
          </p>
        </div>
      </div>
    </div>
  );
}

