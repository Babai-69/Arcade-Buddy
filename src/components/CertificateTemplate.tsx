import React from 'react';

interface CertificateTemplateProps {
  name: string;
  qrCodeUrl: string;
  innerRef?: React.Ref<HTMLDivElement>;
  id?: string;
}

export const CertificateTemplate = ({ name, qrCodeUrl, innerRef, id }: CertificateTemplateProps) => (
  <div 
    ref={innerRef}
    id={id}
    style={{ width: '1000px', height: '700px', fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#ffffff', borderColor: '#f1f5f9', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    className="relative overflow-hidden text-center flex flex-col items-center bg-white"
  >
    {/* Corner Blobs */}
    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#EA4335',  borderRadius: '43% 57% 70% 30% / 30% 55% 45% 70%' }}></div>
    <div className="absolute -top-24 -right-12 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#4285F4',  borderRadius: '23% 77% 10% 90% / 30% 24% 76% 70%' }}></div>
    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#34A853',  borderRadius: '63% 37% 30% 70% / 50% 64% 36% 50%' }}></div>
    <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#FBBC05',  borderRadius: '73% 27% 30% 70% / 80% 24% 76% 20%' }}></div>
    
    {/* Stack of 4 small colored dots (green, yellow, blue, red) */}
    <div className="absolute top-20 right-16 flex flex-col gap-3">
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#34A853' }}></div>
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FBBC05' }}></div>
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4285F4' }}></div>
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EA4335' }}></div>
    </div>

    {/* Header Content */}
    <div className="mt-12 z-10 w-full px-20">
      {/* Google Cloud wordmark */}
      <div className="flex justify-center items-center gap-3 mb-2">
        <div className="text-5xl font-bold tracking-tighter">
          <span className="" style={{ color: '#4285F4' }}>G</span>
          <span className="" style={{ color: '#EA4335' }}>o</span>
          <span className="" style={{ color: '#FBBC05' }}>o</span>
          <span className="" style={{ color: '#4285F4' }}>g</span>
          <span className="" style={{ color: '#34A853' }}>l</span>
          <span className="" style={{ color: '#EA4335' }}>e</span>
        </div>
        <div className="text-5xl tracking-tight" style={{ color: '#6b7280' }}>
          Cloud
        </div>
      </div>

      {/* Subtitle */}
      <p className="font-bold tracking-widest text-lg uppercase mb-4" style={{ color: '#4285F4' }}>
        ARCADE FACILITATOR PROGRAM 2026
      </p>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-6 tracking-tight" style={{ color: '#4A6CF7' }}>
        Certificate of Appreciation
      </h1>
      
      {/* Recipient Name */}
      <h2 className="text-6xl font-bold font-serif mb-1" style={{ color: '#F4A300',  fontFamily: 'Georgia, serif' }}>
        {name || 'Student Name'}
      </h2>
      
      {/* Dotted underline */}
      <div className="w-2/3 max-w-[600px] mx-auto border-b-2 border-dotted mb-5" style={{ borderColor: '#9aa0a6' }}></div>

      {/* Body Text */}
      <p className="text-lg leading-relaxed max-w-[700px] mx-auto mb-6 font-medium" style={{ color: '#1e7a4d' }}>
        For successfully completing the <span className="font-bold">Ultimate Milestone</span> of the Google Cloud Arcade Facilitator Program 2026, demonstrating outstanding consistency, dedication and cloud learning excellence during the program timeline.
      </p>

      {/* Info Pill */}
      <div 
        className="inline-flex justify-center items-center gap-8 rounded-2xl px-8 py-3 text-[15px] mb-4 bg-white"
        style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: '1px', borderStyle: 'solid', color: '#374151', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex flex-col items-center">
          <span className="font-bold text-[11px] uppercase tracking-wider mb-0.5" style={{ color: '#4285F4' }}>Program Duration</span>
          <span className="font-medium" style={{ color: '#1f2937' }}>13th July 2026 – 14th September 2026</span>
        </div>
        <div className="w-px h-8" style={{ backgroundColor: '#e5e7eb' }}></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[11px] uppercase tracking-wider mb-0.5" style={{ color: '#4285F4' }}>Milestone Achieved</span>
          <span className="font-medium" style={{ color: '#1f2937' }}>12 Game Badges + 66 Skill Badges</span>
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
        <div className="w-full border-b border-dotted mb-2" style={{ borderColor: '#9aa0a6' }}></div>
        <p className="font-bold text-lg" style={{ color: '#1f2937' }}>Abir Dey</p>
        <p className="text-sm" style={{ color: '#6b7280' }}>Arcade Facilitator</p>
      </div>

      {/* Center QR */}
      <div className="flex flex-col items-center justify-end pb-1">
        <div className="p-1.5 rounded-xl mb-2 bg-white" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: '1px', borderStyle: 'solid', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" className="w-[96px] h-[96px] rounded-lg" />
          ) : (
            <div className="w-[96px] h-[96px] flex items-center justify-center rounded-lg" style={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db', borderWidth: '1px', borderStyle: 'dashed' }}>
              <span className="text-[10px] text-center p-2 leading-tight" style={{ color: '#9ca3af' }}>Enter URL<br/>to generate<br/>QR</span>
            </div>
          )}
        </div>
        <p className="text-[11px] font-medium tracking-wide uppercase" style={{ color: '#6b7280' }}>Scan to Verify</p>
      </div>

      {/* Right Signature */}
      <div className="flex flex-col items-center w-[250px]">
        <img 
          src="https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782921368/f50b015a-ad12-4117-bba1-0d21503e0ff5_lz3yej.png" 
          alt="Signature" 
          className="h-16 object-contain mb-2 mix-blend-multiply"
          crossOrigin="anonymous" 
        />
        <div className="w-full border-b border-dotted mb-2" style={{ borderColor: '#9aa0a6' }}></div>
        <p className="font-bold text-lg" style={{ color: '#1f2937' }}>Tripti Gupta</p>
        <p className="text-sm" style={{ color: '#6b7280' }}>Arcade Facilitator</p>
      </div>
    </div>
  </div>
);
