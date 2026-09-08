import React, { useRef, useState } from 'react';
import { X, Download, Share2, Rocket, Moon, Twitter, Linkedin, Facebook, Star, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  points: number;
  tier: string;
}

export function PosterModal({ isOpen, onClose, name, points, tier }: PosterModalProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);
    try {
      // Small delay to ensure styles are applied
      await new Promise(r => setTimeout(r, 100));
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `arcade-poster-${name.replace(/\\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareText = `I just reached the ${tier} tier in the Google Cloud Arcade with ${points} points! 🎮☁️ Join me in the Arcade! #GoogleCloud #GoogleCloudArcade`;
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Google Cloud Arcade Progress',
          text: shareText,
          url: window.location.origin
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    }
  };

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.origin)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 dark:border-slate-700 relative">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Share your Arcade progress</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex justify-center overflow-x-auto">
          {/* POSTER CONTAINER */}
          <div 
            ref={posterRef} 
            className="w-[600px] h-[315px] relative overflow-hidden rounded-xl shadow-2xl shrink-0 border border-slate-700"
            style={{
              background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 100%)',
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Rich Background elements */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            {/* Animated/Glowing stars */}
            <div className="absolute top-8 left-16 text-yellow-200/40"><Star size={16} fill="currentColor" /></div>
            <div className="absolute top-12 left-1/4 text-white/20"><Star size={12} fill="currentColor" /></div>
            <div className="absolute bottom-16 left-1/3 text-blue-200/30"><Star size={20} fill="currentColor" /></div>
            <div className="absolute top-20 right-1/4 text-purple-200/30"><Star size={14} fill="currentColor" /></div>
            <div className="absolute bottom-24 right-16 text-white/20"><Star size={10} fill="currentColor" /></div>

            {/* Constellation lines / Accents */}
            <div className="absolute top-10 left-10 text-white/20 rotate-45 opacity-80 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><Rocket size={56} /></div>
            <div className="absolute top-8 right-12 text-white/20 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"><Moon size={48} /></div>
            
            {/* Vibrant Glowing Orbs */}
            <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-blue-500/40 rounded-full blur-[64px]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[64px]"></div>
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/30 rounded-full blur-[50px]"></div>

            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
              
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-400 text-xl filter drop-shadow-md">🎮</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-wide text-lg drop-shadow-sm">Google Cloud Arcade</span>
              </div>
              
              <h1 className="text-4xl font-black mb-5 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-[0_2px_15px_rgba(250,204,21,0.4)]">
                THE ARCADE
              </h1>

              {/* Premium Glassmorphism Card */}
              <div className="w-full max-w-md border border-white/20 bg-white/5 rounded-2xl p-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Inner card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-blue-400/50">»</div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-blue-400/50">«</div>
                
                <div className="relative z-10">
                  <div className="bg-slate-900/80 rounded-full py-1.5 px-8 mx-auto inline-block mb-3 border border-white/10 shadow-inner">
                    <span className="font-extrabold text-xl text-white tracking-wide">{name}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="text-yellow-400/80 w-6 h-6" />
                    <div className="text-[72px] font-black text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tighter">
                      {points}
                    </div>
                    <Sparkles className="text-yellow-400/80 w-6 h-6" />
                  </div>
                  
                  <div className="text-[11px] text-blue-300 font-bold tracking-[0.25em] uppercase mb-4 mt-1">
                    Arcade Points
                  </div>

                  <div className="border-t border-white/10 pt-4 flex flex-col items-center">
                    <div className="inline-block border border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 rounded-lg px-6 py-1.5 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                      <span className="font-black text-yellow-400 tracking-widest uppercase text-lg">{tier}</span>
                    </div>
                    <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1.5 font-semibold">Prize Tier</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Swag Elements */}
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg">
                  <span className="text-xl filter drop-shadow-md">☁️</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg">
                  <span className="text-sm filter drop-shadow-md">🏆</span>
                </div>
              </div>
              
              <div className="absolute bottom-5 right-6 flex items-center gap-2 filter drop-shadow-xl bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                 <span className="text-2xl hover:scale-110 transition-transform">🎒</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">👕</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">☕</span> 
                 <span className="text-2xl hover:scale-110 transition-transform">🖊️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
          >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Generating...' : 'Download Poster'}
          </button>

          <div className="flex-1 flex gap-2">
            {typeof navigator.share !== 'undefined' ? (
               <button 
                onClick={handleNativeShare}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
               >
                 <Share2 className="w-5 h-5" />
                 Share Poster
               </button>
            ) : (
               <>
                 <a 
                   href={socialLinks.twitter} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-bold py-3 px-2 rounded-xl flex items-center justify-center transition-colors"
                   title="Share on Twitter"
                 >
                   <Twitter className="w-5 h-5" />
                 </a>
                 <a 
                   href={socialLinks.linkedin} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] font-bold py-3 px-2 rounded-xl flex items-center justify-center transition-colors"
                   title="Share on LinkedIn"
                 >
                   <Linkedin className="w-5 h-5" />
                 </a>
                 <a 
                   href={socialLinks.facebook} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-bold py-3 px-2 rounded-xl flex items-center justify-center transition-colors"
                   title="Share on Facebook"
                 >
                   <Facebook className="w-5 h-5" />
                 </a>
               </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
