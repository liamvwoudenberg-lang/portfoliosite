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

export const Hero: React.FC<HeroProps> = ({ data, ui, onCtaClick }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {data.backgroundVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover object-center grayscale transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
          >
            <source src={data.backgroundVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={data.backgroundUrl} 
            className="w-full h-full object-cover object-center grayscale opacity-30" 
            alt="Hero background" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl pt-20 md:pt-32">
        <h1 className="text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-8 md:mb-10 leading-[0.9] md:leading-[0.85] uppercase text-white break-words">
          {data.titleTop} <br />
          <span className="text-white/20 font-light italic">{data.titleBottom}</span>
        </h1>
        
        <p className="text-xs md:text-xl text-neutral-400 mb-10 md:mb-14 max-w-xs md:max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          {data.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <button onClick={onCtaClick} className="px-10 py-5 md:px-14 md:py-6 bg-white text-black font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] hover:bg-neutral-200 transition-all w-full sm:w-auto">
            {ui.explore}
          </button>
        </div>
      </div>
    </header>
  );
};
