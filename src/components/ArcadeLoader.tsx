import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ArcadeLoader() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const colors = ['#378ADD', '#D85A30', '#EF9F27', '#639922', '#D4537E'];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex gap-3">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-6 h-6 rounded-md shadow-sm"
            style={{ backgroundColor: color }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
          />
        ))}
      </div>
      <div className="font-mono font-bold text-slate-500 dark:text-slate-400 tracking-widest text-sm flex items-center justify-center w-24">
        LOADING{dots}
      </div>
    </div>
  );
}
