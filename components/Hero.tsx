
import React, { useState } from 'react';

interface HeroProps {
  data: {
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    backgroundUrl: string;
    backgroundVideoUrl?: string;
    showreelVideoUrl?: string;
  };
  onCtaClick: () => void;
}

// Helper to extract YouTube ID (includes support for Shorts)
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const Hero: React.FC<HeroProps> = ({ data, onCtaClick }) => {
  const [showReel, setShowReel] = useState(false);

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {data.backgroundVideoUrl ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            poster={data.backgroundUrl}
            className="w-full h-full object-cover grayscale-[30%] opacity-60 transition-transform duration-[15s]"
            aria-hidden="true"
          >
            <source src={data.backgroundVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={data.backgroundUrl} 
            alt="Production Atmosphere"
            className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-[15s]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl pt-40 md:pt-0">
        
        {/* Badge / Eyebrow - Moved ABOVE title to fix overlap issues */}
        <div className="inline-block mb-6 px-4 py-1.5 border border-white/20 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] bg-black/30 backdrop-blur-md animate-fade text-neutral-200 shadow-xl" style={{ animationDelay: '0.1s' }}>
          Utrecht-Based Production House
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase animate-fade text-white drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
          {data.titleTop} <br />
          <span className="text-white/30 font-light italic">{data.titleBottom}</span>
        </h1>
        
        <p className="text-base md:text-lg text-neutral-300 mb-12 max-w-lg mx-auto font-light leading-relaxed tracking-wide animate-fade drop-shadow-md" style={{ animationDelay: '0.3s' }}>
          {data.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={onCtaClick}
            className="group px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[9px] hover:bg-neutral-200 transition-all flex items-center gap-4 shadow-2xl"
            aria-label="View our production portfolio"
          >
            Explore Work
            <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
          </button>
          
          {data.showreelVideoUrl && (
            <button 
              onClick={() => setShowReel(true)}
              className="px-12 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.3em] text-[9px] hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm flex items-center gap-3 shadow-xl"
              aria-label="Watch BigBoy Productions Showreel"
            >
              <i className="fa-solid fa-play text-[8px]"></i>
              Watch Showreel
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 hidden md:flex flex-col items-center gap-4 animate-fade" style={{ animationDelay: '1s' }}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* Showreel Lightbox */}
      {showReel && data.showreelVideoUrl && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fade" 
          role="dialog" 
          aria-modal="true"
          onClick={(e) => {
            // Close if clicking the backdrop
            if (e.target === e.currentTarget) setShowReel(false);
          }}
        >
          <button 
            onClick={() => setShowReel(false)}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            aria-label="Close showreel"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>
          <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl overflow-hidden border border-white/10 rounded-sm">
            {getYouTubeId(data.showreelVideoUrl) ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(data.showreelVideoUrl)}?autoplay=1`}
                title="Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            ) : (
              <video 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                <source src={data.showreelVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
