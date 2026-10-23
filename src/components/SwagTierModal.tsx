import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Gift, Check, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface RevealedSwagItem {
  id: string;
  name: string;
  image: string;
  circleBg: string;
  circleBorder?: string;
  shortDesc?: string;
}

export interface SwagTierDetailData {
  key: string;
  tierName: string;
  milestonePoints: string;
  pointsNumber: number;
  subtitle: string;
  groupImage: string;
  fallbackImage: string;
  revealedItems: RevealedSwagItem[];
}

export const SWAG_TIER_DETAILS: Record<string, SwagTierDetailData> = {
  trooper: {
    key: 'trooper',
    tierName: 'Trooper Tier Swags',
    milestonePoints: '50 PTS REQUIRED',
    pointsNumber: 50,
    subtitle: 'Official merchandise and rewards for Trooper Tier.',
    groupImage: 'https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/swags/2k26/trooper/group-v2.png',
    fallbackImage: '/swags/trooper-group.png',
    revealedItems: [
      {
        id: 'magic-mug',
        name: 'Arcade Magic Mug',
        image: '/mug.png',
        circleBg: '#FDE68A',
        circleBorder: '#FCD34D',
        shortDesc: 'Heat-activated color reveal ceramic mug'
      },
      {
        id: 'travel-bottle',
        name: 'Arcade Travel Bottle',
        image: '/bottle.png',
        circleBg: '#FCA5A5',
        circleBorder: '#F87171',
        shortDesc: 'Stainless steel leak-proof travel flask'
      }
    ]
  },
  ranger: {
    key: 'ranger',
    tierName: 'Ranger Tier Swags',
    milestonePoints: '75 PTS REQUIRED',
    pointsNumber: 75,
    subtitle: 'Official merchandise and rewards for Ranger Tier.',
    groupImage: 'https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/swags/2k26/ranger/group-v2.png',
    fallbackImage: '/swags/ranger-group.png',
    revealedItems: [
      {
        id: 'magic-mug',
        name: 'Arcade Magic Mug',
        image: '/mug.png',
        circleBg: '#FDE68A',
        circleBorder: '#FCD34D'
      },
      {
        id: 'travel-bottle',
        name: 'Arcade Travel Bottle',
        image: '/bottle.png',
        circleBg: '#FCA5A5',
        circleBorder: '#F87171'
      },
      {
        id: 'backpack',
        name: 'The Arcade Performance Backpack',
        image: 'https://res.cloudinary.com/dqj9yaa0g/image/upload/v1790234352/ChatGPT_Image_Sep_24_2026_12_44_20_PM_iss75e.png',
        circleBg: '#BBF7D0',
        circleBorder: '#86EFAC'
      }
    ]
  },
  champion: {
    key: 'champion',
    tierName: 'Champion Tier Swags',
    milestonePoints: '95 PTS REQUIRED',
    pointsNumber: 95,
    subtitle: 'Official merchandise and rewards for Champion Tier.',
    groupImage: 'https://cdn.jsdelivr.net/gh/deepanshu-prajapati01/image-host@main/ArcadeCalc/swags/2k26/champion/group-v1.png',
    fallbackImage: '/swags/champion-group.png',
    revealedItems: [
      {
        id: 'popup-pro',
        name: 'The Arcade PopUp Pro',
        image: '/pop-up-pro.png',
        circleBg: '#BFDBFE',
        circleBorder: '#93C5FD'
      },
      {
        id: 'jacket',
        name: 'The Arcade Weather-Shield Jacket',
        image: 'https://res.cloudinary.com/dqj9yaa0g/image/upload/v1789493091/ChatGPT_Image_Sep_15_2026_10_52_46_PM_gwx7aq.png',
        circleBg: '#FDE68A',
        circleBorder: '#FCD34D'
      }
    ]
  },
  legend: {
    key: 'legend',
    tierName: 'Legend Tier Swags',
    milestonePoints: '120+ PTS REQUIRED',
    pointsNumber: 120,
    subtitle: 'Official merchandise and rewards for Legend Tier.',
    groupImage: 'https://raw.githubusercontent.com/deepanshu-prajapati01/image-host/main/ArcadeCalc/swags/2k26/legend/group-v1.png',
    fallbackImage: '/swags/legend-group.png',
    revealedItems: [
      {
        id: 'popup-pro',
        name: 'The Arcade PopUp Pro',
        image: '/pop-up-pro.png',
        circleBg: '#BFDBFE',
        circleBorder: '#93C5FD'
      },
      {
        id: 'jacket',
        name: 'The Arcade Weather-Shield Jacket',
        image: 'https://res.cloudinary.com/dqj9yaa0g/image/upload/v1789493091/ChatGPT_Image_Sep_15_2026_10_52_46_PM_gwx7aq.png',
        circleBg: '#FDE68A',
        circleBorder: '#FCD34D'
      }
    ]
  }
};

interface SwagTierModalProps {
  tierKey: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SwagTierModal({ tierKey, isOpen, onClose }: SwagTierModalProps) {
  const navigate = useNavigate();

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !tierKey || typeof document === 'undefined') return null;

  const detail = SWAG_TIER_DETAILS[tierKey.toLowerCase()] || SWAG_TIER_DETAILS.trooper;

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    navigate('/swags');
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      style={{
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div 
        className="relative w-full max-w-[480px] sm:max-w-[510px] rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] p-4 sm:p-5 animate-scale-up"
        onClick={e => e.stopPropagation()}
        style={{
          boxSizing: 'border-box'
        }}
      >
        {/* Header - Compact */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight truncate">
                {detail.tierName}
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {detail.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Required Points Pill */}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-[#3B82F6] text-white shadow-xs">
              {detail.milestonePoints}
            </span>

            {/* Checkmark circle badge */}
            <div className="w-5 h-5 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Group Image Card - Compact height so NO scrolling needed */}
        <div className="my-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-2.5 sm:p-3 flex items-center justify-center h-[175px] sm:h-[195px] overflow-hidden">
          <img
            src={detail.groupImage}
            alt={`${detail.tierName} Group Preview`}
            className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== detail.fallbackImage) {
                target.src = detail.fallbackImage;
              }
            }}
          />
        </div>

        {/* Revealed Items Section - Compact */}
        <div>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              REVEALED ITEMS ({detail.revealedItems.length})
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80">
              More swags to come
            </span>
          </div>

          {/* Revealed Items Grid - Compact cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {detail.revealedItems.map((item) => (
              <div
                key={item.id}
                onClick={handleItemClick}
                className="rounded-xl border border-blue-100/80 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/40 p-2.5 flex flex-col items-center text-center justify-between hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer group"
              >
                {/* Colored Circle Avatar - Compact */}
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-1.5 mb-1.5 shadow-inner transition-transform group-hover:scale-108 duration-300"
                  style={{
                    backgroundColor: item.circleBg,
                    border: item.circleBorder ? `1.5px solid ${item.circleBorder}` : 'none'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                </div>

                <div className="w-full">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight line-clamp-1 mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10.5px] font-semibold text-[#3B82F6] dark:text-blue-400 inline-flex items-center gap-0.5 group-hover:underline">
                    View Details
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
