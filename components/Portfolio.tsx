
import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';

interface PortfolioProps {
  data: Project[];
  previewOnly?: boolean;
  onShowMore?: () => void;
  externalFilter?: 'All' | 'Photography' | 'Cinematography';
  onFilterChange?: (filter: 'All' | 'Photography' | 'Cinematography') => void;
  onInquire?: (project: Project) => void;
}

// Helper to extract YouTube ID (includes support for Shorts)
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Sub-component for individual project cards to handle image loading state independently
const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article 
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden bg-neutral-950 border border-white/5 aspect-[4/5] md:aspect-square lg:aspect-[16/10]"
    >
      {/* Loading Skeleton */}
      <div 
        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'}`} 
      />

      <img 
        src={project.thumbnail} 
        alt={`${project.title} - ${project.category}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out transform
          ${isLoaded ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105' : 'opacity-0 scale-105'}`}
      />
      
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
        <span className="text-[8px] uppercase tracking-[0.5em] text-neutral-400 mb-4">{project.category}</span>
        <h4 className="text-3xl font-bold mb-8 uppercase tracking-tighter">{project.title}</h4>
        <div className="flex items-center gap-5 text-[8px] font-bold uppercase tracking-[0.4em]">
          <span>{project.videoUrl ? 'Watch Film' : 'View Work'}</span>
          <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all"></div>
        </div>
      </div>
      {project.videoUrl && (
        <div className="absolute top-8 right-8 text-white/40">
          <i className="fa-brands fa-youtube text-2xl"></i>
        </div>
      )}
    </article>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ 
  data, 
  previewOnly, 
  onShowMore, 
  externalFilter = 'All',
  onFilterChange,
  onInquire
}) => {
  const [internalFilter, setInternalFilter] = useState<'All' | 'Photography' | 'Cinematography'>(externalFilter);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync internal state with external filter if provided
  useEffect(() => {
    setInternalFilter(externalFilter);
  }, [externalFilter]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const activeFilter = onFilterChange ? externalFilter : internalFilter;
  const setFilter = onFilterChange || setInternalFilter;

  const filteredProjects = useMemo(() => {
    let list = data;
    if (activeFilter === 'Photography') list = data.filter(p => p.category === 'Photography');
    if (activeFilter === 'Cinematography') list = data.filter(p => p.category === 'Cinematography' || p.category === 'Commercial' || p.category === 'Documentary');
    return previewOnly ? list.slice(0, 4) : list;
  }, [activeFilter, data, previewOnly]);

  const renderMedia = (project: Project) => {
    const youtubeId = project.videoUrl ? getYouTubeId(project.videoUrl) : null;

    if (youtubeId) {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={project.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      );
    }

    if (project.videoUrl) {
      return (
        <video controls autoPlay className="w-full h-full object-contain">
          <source src={project.videoUrl} type="video/mp4" />
        </video>
      );
    }

    return (
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="w-full h-full object-contain bg-black"
      />
    );
  };

  return (
    <section id="portfolio" className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <header>
            <h2 className="text-[9px] uppercase tracking-[0.6em] text-neutral-600 mb-6 font-bold">The Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">Curated Archive</h3>
          </header>
          
          <nav className="flex gap-8 border-b border-white/5 pb-4 w-full md:w-auto overflow-x-auto">
            {['All', 'Photography', 'Cinematography'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all ${activeFilter === cat ? 'text-white font-bold underline underline-offset-8' : 'text-neutral-600 hover:text-white'}`}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>

        {previewOnly && data.length > 4 && (
          <div className="mt-24 text-center">
            <button 
              onClick={onShowMore}
              className="px-12 py-5 border border-white/10 text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all"
            >
              See All Productions
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto" 
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <button 
            onClick={() => setSelectedProject(null)}
            className="fixed top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-[110]"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-4xl"></i>
          </button>
          
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-20 py-12 md:py-24 pointer-events-none">
            <div className="lg:col-span-3 bg-neutral-900 aspect-video shadow-2xl relative group overflow-hidden border border-white/5 pointer-events-auto">
              {renderMedia(selectedProject)}
            </div>
            
            <div className="lg:col-span-2 space-y-8 md:space-y-12 pointer-events-auto">
              <header>
                <span className="text-[9px] uppercase tracking-[0.6em] text-neutral-500 mb-5 block">{selectedProject.category} &bull; {selectedProject.year}</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tighter leading-tight">{selectedProject.title}</h2>
                <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed italic border-l-2 border-white/10 pl-6">
                  {selectedProject.description}
                </p>
              </header>
              <button 
                onClick={() => {
                  if (onInquire) onInquire(selectedProject);
                  setSelectedProject(null);
                }}
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-200 transition-colors"
              >
                Inquire About Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
