import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';

interface PortfolioProps {
  data: Project[];
  ui: any;
  title?: string;
  previewOnly?: boolean;
  onShowMore?: () => void;
  onBack?: () => void;
  onInquire?: (project: Project) => void;
  isLoading?: boolean;
}

// Robust YouTube ID extractor handling Shorts, Embeds, and full iframe strings
const getYouTubeId = (url: string) => {
  if (!url) return null;
  
  // Handle if user pasted full iframe tag
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["'](.*?)["']/);
    if (srcMatch) url = srcMatch[1];
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  
  // ID is typically 11 chars, but we allow 10-12 to be safe
  return (match && match[2].length >= 10) ? match[2] : null;
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer bg-[#050505] overflow-hidden aspect-video border border-white/5 hover:border-white/20 transition-all duration-700"
    >
      <img 
        src={project.thumbnail} 
        alt={project.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-60' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
        <span className="text-[8px] tracking-[0.6em] text-neutral-500 uppercase mb-3 font-bold">{project.category}</span>
        <h4 className="text-xl font-bold uppercase tracking-tighter mb-4 leading-none">{project.title}</h4>
        <div className="flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.5em] text-white/70">
          <div className="w-8 h-[1px] bg-white/30 group-hover:w-16 group-hover:bg-white transition-all duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ data, ui, title, previewOnly, onShowMore, onBack, onInquire, isLoading }) => {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  const displayProjects = useMemo(() => previewOnly ? data.slice(0, 6) : data, [data, previewOnly]);

  const renderMedia = (p: Project) => {
    const yid = p.videoUrl ? getYouTubeId(p.videoUrl) : null;
    if (yid) {
      return (
        <div className="w-full aspect-video bg-black shadow-2xl border border-white/5 relative">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${yid}?autoplay=1&rel=0&modestbranding=1&color=white&playsinline=1`} 
            title={p.title}
            frameBorder="0" 
            allowFullScreen 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      );
    }
    return <img src={p.thumbnail} alt={p.title} className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10" />;
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 relative z-10">
            {onBack && (
              <button onClick={onBack} className="text-[9px] uppercase tracking-[0.5em] text-neutral-500 hover:text-white transition-colors group flex items-center gap-3">
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> {ui.back}
              </button>
            )}
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">{title || ui.work}</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500 animate-pulse">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-4"></i>
            <span className="text-[10px] uppercase tracking-[0.3em]">Loading Gallery...</span>
          </div>
        ) : displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500 border border-white/5 bg-neutral-900/20 rounded-xl">
             <i className="fa-regular fa-image text-3xl mb-4 opacity-50"></i>
             <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2">No Images Found</p>
             <p className="text-[10px] max-w-xs text-center leading-relaxed">Ensure the folder "{title?.toLowerCase()}" exists in the GitHub repository.</p>
          </div>
        )}

        {previewOnly && data.length > 6 && (
          <div className="mt-24 text-center">
            <button onClick={onShowMore} className="px-12 py-6 border border-white/10 text-[9px] font-bold uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all duration-500">
              {ui.allProductions}
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-y-auto animate-fade" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <button onClick={() => setSelected(null)} className="fixed top-8 right-8 text-white/30 hover:text-white z-[110] transition-colors bg-black/50 p-4 rounded-full backdrop-blur-md">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
          <div className={`w-full max-w-7xl animate-fade ${selected.category === 'Photography' ? 'flex justify-center' : 'grid lg:grid-cols-5 gap-16'}`}>
            <div className={`${selected.category === 'Photography' ? 'w-full flex justify-center' : 'lg:col-span-3'}`}>{renderMedia(selected)}</div>
            {selected.category !== 'Photography' && (
              <div className="lg:col-span-2 flex flex-col justify-center space-y-12">
                <div className="space-y-6">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-neutral-500 font-bold">{selected.category} &bull; {selected.year}</span>
                  <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">{selected.title}</h3>
                  <p className="text-neutral-400 font-light leading-relaxed text-lg italic">"{selected.description}"</p>
                </div>
                <button onClick={() => { onInquire?.(selected); setSelected(null); }} className="py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-neutral-200 transition-colors">{ui.inquire}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};