import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({ value, duration = 1800, delay = 0, className = '', prefix = '', suffix = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          setTimeout(() => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              
              // easeOutQuart
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              setDisplayValue(Math.floor(easeProgress * value));
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setDisplayValue(value);
                setIsGlowing(true);
                setTimeout(() => setIsGlowing(false), 600); // subtle pulse duration
              }
            };
            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value, duration, delay, hasAnimated]);

  return (
    <span 
      ref={ref} 
      className={`inline-block transition-all duration-[800ms] ease-out transform-gpu ${hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} ${isGlowing ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] scale-110 text-white' : ''} ${className}`}
    >
      {prefix}{displayValue}{suffix}
    </span>
  );
}
