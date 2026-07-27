import React, { useEffect, useState } from 'react';

export function AnimatedTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate.getTime() - new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft < 0) return (
     <div className="text-[#6FE3D6] font-mono text-sm tracking-widest uppercase font-bold animate-neon-pulse">Time's Up</div>
  );

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-3xl font-mono text-[#6FE3D6] font-bold tabular-nums animate-neon-pulse">{String(days).padStart(2, '0')}</span>
        <span className="text-[9px] sm:text-[10px] text-[#5B6478] tracking-widest uppercase mt-1">Days</span>
      </div>
      <span className="text-xl sm:text-2xl text-[#6FE3D6]/50 pb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-3xl font-mono text-[#6FE3D6] font-bold tabular-nums animate-neon-pulse">{String(hours).padStart(2, '0')}</span>
        <span className="text-[9px] sm:text-[10px] text-[#5B6478] tracking-widest uppercase mt-1">Hours</span>
      </div>
      <span className="text-xl sm:text-2xl text-[#6FE3D6]/50 pb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-3xl font-mono text-[#6FE3D6] font-bold tabular-nums animate-neon-pulse">{String(minutes).padStart(2, '0')}</span>
        <span className="text-[9px] sm:text-[10px] text-[#5B6478] tracking-widest uppercase mt-1">Mins</span>
      </div>
      <span className="text-xl sm:text-2xl text-[#6FE3D6]/50 pb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-3xl font-mono text-[#6FE3D6] font-bold tabular-nums animate-neon-pulse">{String(seconds).padStart(2, '0')}</span>
        <span className="text-[9px] sm:text-[10px] text-[#5B6478] tracking-widest uppercase mt-1">Secs</span>
      </div>
    </div>
  );
}
