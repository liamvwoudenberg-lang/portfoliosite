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
  ui: any;
  onCtaClick: () => void;
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const Hero: React.FC<HeroProps> = ({ data, ui, onCtaClick }) => {
  const [showReel, setShowReel] = useState(false);

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img src={data.backgroundUrl} className="w-full h-full object-cover object-center grayscale opacity-30" alt="Hero background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl pt-24 md:pt-32">
        <div className="inline-block mb-8 px-5 py-2 border border-white/10 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.4em] bg-black/40 backdrop-blur-xl text-white/60 font-medium">
          DP & Photographer
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-10 leading-[0.85] uppercase text-white break-words">
          {data.titleTop} <br />
          <span className="text-white/20 font-light italic">{data.titleBottom}</span>
        </h1>
        
        <p className="text-sm md:text-xl text-neutral-400 mb-14 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          {data.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button onClick={onCtaClick} className="px-14 py-6 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-all w-full sm:w-auto">
            {ui.explore}
          </button>
          {data.showreelVideoUrl && (
            <button onClick={() => setShowReel(true)} className="px-14 py-6 border border-white/10 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 transition-all w-full sm:w-auto">
              {ui.showreel}
            </button>
          )}
        </div>
      </div>

      {showReel && data.showreelVideoUrl && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-fade" onClick={(e) => e.target === e.currentTarget && setShowReel(false)}>
          <button onClick={() => setShowReel(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110]"><i className="fa-solid fa-xmark text-4xl"></i></button>
          <div className="w-full max-w-7xl aspect-video bg-black shadow-2xl overflow-hidden border border-white/5">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYouTubeId(data.showreelVideoUrl)}?autoplay=1&modestbranding=1&rel=0`} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
          </div>
        </div>
      )}
    </header>
  );
};