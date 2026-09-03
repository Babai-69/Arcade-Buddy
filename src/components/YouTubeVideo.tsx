import React from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailUrl?: string;
}

export function YouTubeVideo({ videoId, title, className = '' }: YouTubeVideoProps) {
  return (
    <div className={`w-full relative overflow-hidden bg-slate-900 ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      ></iframe>
    </div>
  );
}
