
import React, { useState, useMemo, useEffect } from 'react';
import { Project, UIConfig } from '../types';
// Fix: Added missing 'cn' import from utils to resolve "Cannot find name 'cn'" on line 99
import { getYouTubeId, cn } from '../utils';

interface PortfolioProps {
  data: Project[];
  ui: UIConfig;
  title?: string;
  previewOnly?: boolean;
  onShowMore?: () => void;
  onBack?: () => void;
  onInquire?: (project: Project) => void;
  isLoading?: boolean;
}

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <article 
      onClick={onClick}
      className="group relative cursor-pointer bg-black overflow-hidden aspect-video border border-white/10 hover:border-white/25 transition-all duration-700"
    >
      <img 
        src={project.thumbnail} 
        alt={project.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-black/70 opacity-100 group-hover:opacity-0 transition-all duration-700 flex flex-col justify-end p-8 md:p-10">
        <span className="text-[10px] tracking-[0.5em] text-white/60 uppercase mb-4 font-bold block">{project.category}</span>
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-6 leading-none text-white max-w-sm">{project.title}</h3>
        <div className="w-16 h-[2px] bg-white"></div>
      </div>
    </article>
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
    const yid = getYouTubeId(p.videoUrl || '');
    if (yid) {
      return (
        <div className="w-full aspect-video bg-black shadow-2xl border border-white/5 relative">
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${yid}?autoplay=1&rel=0&modestbranding=1&color=white`} title={p.title} frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="absolute inset-0 w-full h-full"></iframe>
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
              <button onClick={onBack} className="text-[9px] uppercase tracking-[0.5em] text-white/50 hover:text-white transition-colors group flex items-center gap-3">
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> {ui.back}
              </button>
            )}
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">{title || ui.work}</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/40 animate-pulse">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-4"></i>
            <span className="text-[10px] uppercase tracking-[0.3em]">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
          </div>
        )}

        {previewOnly && data.length > 6 && (
          <div className="mt-24 text-center">
            <button onClick={onShowMore} className="px-12 py-6 border border-white/20 text-[9px] font-bold uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all duration-500">
              {ui.allProductions}
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <button onClick={() => setSelected(null)} className="fixed top-8 right-8 text-white/40 hover:text-white z-[110] bg-white/5 p-4 rounded-full"><i className="fa-solid fa-xmark text-2xl"></i></button>
          <div className={cn("w-full max-w-7xl animate-fade", selected.category === 'Photography' ? 'flex justify-center' : 'grid lg:grid-cols-5 gap-16')}>
            <div className={selected.category === 'Photography' ? 'w-full flex justify-center' : 'lg:col-span-3'}>{renderMedia(selected)}</div>
            {selected.category !== 'Photography' && (
              <div className="lg:col-span-2 flex flex-col justify-center space-y-12">
                <div className="space-y-6">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/50 font-bold">{selected.category} &bull; {selected.year}</span>
                  <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">{selected.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed text-lg italic">"{selected.description}"</p>
                </div>
                <button onClick={() => { onInquire?.(selected); setSelected(null); }} className="py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-neutral-200">{ui.inquire}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
