import React, { useState } from 'react';
import { Share2, Plus, Github, Linkedin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SOCIAL_LINKS = [
  {
    name: 'X (Twitter)',
    icon: <Twitter className="w-5 h-5" />,
    url: 'https://twitter.com/intent/tweet?url=https://arcadebuddy.app',
    color: 'text-slate-900 dark:text-white',
    hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-800'
  },
  {
    name: 'Reddit',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.207-.872 2.9-1.455 4.757-1.503l.871-4.084a.555.555 0 0 1 .655-.429l3.076.643c.123-.391.492-.686.938-.686h.023zm-7.616 5.86c-1.127 0-2.044.918-2.044 2.045 0 1.127.917 2.044 2.044 2.044 1.127 0 2.044-.917 2.044-2.044 0-1.127-.917-2.044-2.044-2.044zm5.2 0c-1.127 0-2.044.918-2.044 2.045 0 1.127.917 2.044 2.044 2.044 1.127 0 2.044-.917 2.044-2.044 0-1.127-.917-2.044-2.044-2.044zm-2.607 5.163c-1.57 0-2.716.48-2.736.488a.545.545 0 0 0-.274.743c.146.28.487.382.76.24.022-.012 1.015-.403 2.25-.403 1.234 0 2.227.391 2.249.402.274.143.615.04.761-.24a.545.545 0 0 0-.273-.742c-.02-.008-1.166-.488-2.737-.488z"/>
      </svg>
    ),
    url: 'https://reddit.com/submit?url=https://arcadebuddy.app',
    color: 'text-[#FF4500]',
    hoverBg: 'hover:bg-[#FF4500]/10'
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
    url: 'https://www.linkedin.com/sharing/share-offsite/?url=https://arcadebuddy.app',
    color: 'text-[#0077b5]',
    hoverBg: 'hover:bg-[#0077b5]/10'
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    url: 'https://instagram.com',
    color: 'text-[#E1306C]',
    hoverBg: 'hover:bg-[#E1306C]/10'
  },
  {
    name: 'GitHub',
    icon: <Github className="w-5 h-5" />,
    url: 'https://github.com/Arcade-With-Us',
    color: 'text-slate-900 dark:text-white',
    hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-800'
  },
  {
    name: 'YouTube',
    icon: <Youtube className="w-5 h-5" />,
    url: 'https://youtube.com',
    color: 'text-[#FF0000]',
    hoverBg: 'hover:bg-[#FF0000]/10'
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    url: 'https://www.facebook.com/sharer/sharer.php?u=https://arcadebuddy.app',
    color: 'text-[#1877F2]',
    hoverBg: 'hover:bg-[#1877F2]/10'
  },
  {
    name: 'WhatsApp',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
    url: 'https://wa.me/?text=Check%20out%20Arcade%20Buddy%20at%20https://arcadebuddy.app',
    color: 'text-[#25D366]',
    hoverBg: 'hover:bg-[#25D366]/10'
  }
];

export function MagicSocialShare() {
  const [isOpen, setIsOpen] = useState(false);
  const RADIUS = 110; // Distance of icons from center

  return (
    <div className="relative flex items-center justify-center h-[300px]">
      {/* Container for the icons */}
      <AnimatePresence>
        {isOpen && SOCIAL_LINKS.map((link, index) => {
          const angle = (index * (360 / SOCIAL_LINKS.length)) * (Math.PI / 180);
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;

          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x, 
                y,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.035
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.3, 
                x: 0, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: (SOCIAL_LINKS.length - 1 - index) * 0.035
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Share on ${link.name}`}
              className={`absolute flex items-center justify-center w-[44px] h-[44px] bg-white dark:bg-slate-900 rounded-full shadow-md border border-slate-200 dark:border-slate-800 transition-colors ${link.color} ${link.hoverBg}`}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {link.icon}
            </motion.a>
          );
        })}
      </AnimatePresence>

      {/* Center Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute z-10 flex items-center justify-center w-[60px] h-[60px] bg-white dark:bg-slate-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white outline-none focus:outline-none"
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Toggle Share Menu"
      >
        {isOpen ? <Plus className="w-8 h-8" /> : <Share2 className="w-7 h-7" />}
      </motion.button>
    </div>
  );
}
