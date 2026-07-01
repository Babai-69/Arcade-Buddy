import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Download, Award, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string | null;
}

export function CertificateModal({ isOpen, onClose, userEmail }: CertificateModalProps) {
  const [name, setName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{ gameBadges: number; skillBadges: number } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  // Program ends Sept 14, 2026.
  const programEndDate = new Date('2026-09-14T00:00:00Z');
  const isAfterProgramEnd = new Date() > programEndDate;

  const handleCheckEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !profileUrl) {
      setError('Please provide both your name and public profile URL.');
      return;
    }

    if (!isAfterProgramEnd) {
      setError('Certificate download will be available after the program ends on Sept 14, 2026.');
      return;
    }

    if (!profileUrl.includes('cloudskillsboost.google/public_profiles/') && !profileUrl.includes('skills.google/public_profiles/')) {
      setError('Please provide a valid Google Cloud Skills Boost public profile URL.');
      return;
    }

    setIsLoading(true);
    setError('');
    setIsEligible(null);
    setStats(null);

    try {
      const res = await fetch(`/api/calculator?url=${encodeURIComponent(profileUrl)}`);
      if (!res.ok) {
        throw new Error('Could not fetch profile. Ensure your profile is public.');
      }
      const data = await res.json();
      
      setStats({
        gameBadges: data.gameBadges || 0,
        skillBadges: data.skillBadges || 0
      });

      // Ultimate Milestone criteria
      if (data.gameBadges >= 12 && data.skillBadges >= 66) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while verifying your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!isEligible || !name || !profileUrl) return;
    
    setIsDownloading(true);
    
    try {
      // Create a basic certificate PDF design.
      // A more complex design could use pre-rendered images, 
      // but the user said "I will give you a Certificate Model Demo... you just add his name and QR".
      // We will create a functional placeholder design using jsPDF.
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();

      // Background color
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(0, 0, width, height, 'F');
      
      // Border
      doc.setDrawColor(66, 133, 244); // Google Blue
      doc.setLineWidth(4);
      doc.rect(10, 10, width - 20, height - 20);
      
      // Title
      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFontSize(40);
      doc.setFont("helvetica", "bold");
      doc.text("Certificate of Completion", width / 2, 50, { align: 'center' });
      
      // Subtitle
      doc.setFontSize(20);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text("This certificate is proudly presented to", width / 2, 75, { align: 'center' });
      
      // Name
      doc.setFontSize(36);
      doc.setTextColor(66, 133, 244); // Google Blue
      doc.setFont("helvetica", "bold");
      doc.text(name, width / 2, 100, { align: 'center' });
      
      // Description
      doc.setFontSize(16);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.setFont("helvetica", "normal");
      doc.text("for successfully achieving the Ultimate Milestone", width / 2, 120, { align: 'center' });
      doc.text("in the Google Cloud Arcade 2026 Program.", width / 2, 130, { align: 'center' });
      
      // Stats
      if (stats) {
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont("helvetica", "bold");
        doc.text(`Game Badges: ${stats.gameBadges}   |   Skill Badges: ${stats.skillBadges}`, width / 2, 150, { align: 'center' });
      }

      // Generate QR Code for the profile URL
      const qrDataUrl = await QRCode.toDataURL(profileUrl, { margin: 1, width: 100 });
      doc.addImage(qrDataUrl, 'PNG', width / 2 - 25, 160, 50, 50);

      // Save PDF
      doc.save(`Arcade_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
      
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#4285F4]" />
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Download Certificate
              </h2>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAfterProgramEnd ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm">
                Certificates will be available for download after the program ends on <strong>September 14, 2026</strong>. Please check back later!
              </p>
            </div>
          ) : (
            <>
              {isEligible === null && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    To be eligible for the Ultimate Milestone certificate, you must have completed:
                  </p>
                  <ul className="text-sm font-medium text-slate-700 dark:text-slate-200 list-disc pl-5">
                    <li>12 or more Game Badges</li>
                    <li>66 or more Skill Badges</li>
                  </ul>
                </div>
              )}

              <form onSubmit={handleCheckEligibility} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                    disabled={isEligible === true}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Public Profile URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="url"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      className="pl-9 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 pr-4 focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all outline-none"
                      placeholder="https://www.skills.google/public_profiles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      disabled={isEligible === true}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {isEligible === null && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#4285F4] hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-70 mt-2 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : 'Check Eligibility'}
                  </button>
                )}
              </form>

              {isEligible === false && stats && (
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm mb-1">Not Eligible Yet</h3>
                    <p className="text-sm mb-2">You haven't reached the Ultimate Milestone criteria.</p>
                    <div className="text-sm font-medium bg-white/50 dark:bg-black/20 p-2 rounded">
                      <div>Game Badges: {stats.gameBadges} / 12</div>
                      <div>Skill Badges: {stats.skillBadges} / 66</div>
                    </div>
                  </div>
                </div>
              )}

              {isEligible === true && stats && (
                <div className="mt-6 text-center animate-fade-in">
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-xl mb-4">
                    <h3 className="font-bold text-lg mb-1">🎉 Congratulations!</h3>
                    <p className="text-sm">You are eligible for the Ultimate Milestone certificate.</p>
                    <div className="text-sm font-medium mt-2">
                      Completed: {stats.gameBadges} Game Badges, {stats.skillBadges} Skill Badges
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full bg-[#34A853] hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isDownloading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download PDF Certificate
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 mt-3">
                    You can only download this certificate once. A QR code to your public profile will be included.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
