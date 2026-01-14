
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin';
import { ViewMode, SiteData, Package, Project } from './types';
import { DEFAULT_DATA } from './data';
import { fetchGitHubFolder } from './services/github';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Home);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_DATA);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Photography' | 'Cinematography'>('All');
  
  // State to hold inquiry context (which package or project was clicked)
  const [inquiryContext, setInquiryContext] = useState<{ type: 'package' | 'project' | 'general', name?: string } | null>(null);
  
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Robust navigation handler
  const handleViewChange = (newView: ViewMode) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset context if navigating away from Contact manually, unless we are navigating TO contact
    if (newView !== ViewMode.Contact) {
      setInquiryContext(null);
    }
  };

  const handlePackageBooking = (pkg: Package) => {
    setInquiryContext({ type: 'package', name: pkg.name });
    handleViewChange(ViewMode.Contact);
  };

  const handleProjectInquiry = (project: Project) => {
    setInquiryContext({ type: 'project', name: project.title });
    handleViewChange(ViewMode.Contact);
  };

  const handleCustomInquiry = () => {
    setInquiryContext({ type: 'general' });
    handleViewChange(ViewMode.Contact);
  }

  useEffect(() => {
    // 1. Load Initial Data (Local Storage or Default)
    const saved = localStorage.getItem('bigboy_site_data_v2');
    let currentData = DEFAULT_DATA;
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        currentData = parsed;
      } catch (e) {
        console.error("Failed to load site data", e);
      }
    }
    setSiteData(currentData);

    // 2. Fetch Dynamic Content from GitHub
    const loadDynamicContent = async () => {
      // Define the folders you want to pull from your repo
      // Based on your prompt: /concert and /clothing
      const concertPhotos = await fetchGitHubFolder('concert', 'Photography');
      const clothingPhotos = await fetchGitHubFolder('clothing', 'Photography');
      
      const newProjects = [...concertPhotos, ...clothingPhotos];

      if (newProjects.length > 0) {
        setSiteData(prevData => {
          // Create a Set of existing IDs to prevent duplicates
          const existingIds = new Set(prevData.projects.map(p => p.id));
          
          // Only add projects that don't already exist
          const uniqueNewProjects = newProjects.filter(p => !existingIds.has(p.id));
          
          if (uniqueNewProjects.length === 0) return prevData;

          return {
            ...prevData,
            projects: [...prevData.projects, ...uniqueNewProjects]
          };
        });
      }
    };

    loadDynamicContent();

    // 3. Scroll Listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('bigboy_site_data_v2', JSON.stringify(newData));
  };

  const handleDisciplineSelect = (discipline: 'Photography' | 'Cinematography') => {
    setActiveFilter(discipline);
    if (view === ViewMode.Home && portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView(ViewMode.Work);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    if (view === ViewMode.Admin) {
      return <AdminDashboard data={siteData} onSave={saveSiteData} onExit={() => handleViewChange(ViewMode.Home)} />;
    }

    switch (view) {
      case ViewMode.Home:
        return (
          <>
            <Hero data={siteData.hero} onCtaClick={() => handleViewChange(ViewMode.Work)} />
            
            {/* Discipline Selection Section */}
            <section className="bg-black py-20 px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                  onClick={() => handleDisciplineSelect('Cinematography')}
                  className="split-card-hover relative h-[60vh] overflow-hidden cursor-pointer group border border-white/5"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200" 
                    className="bg-image absolute inset-0 w-full h-full object-cover grayscale opacity-40 transition-all duration-1000"
                    alt="Cinematography Category"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-4xl font-bold uppercase tracking-tighter mb-4">Cinematography</h3>
                    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 group-hover:text-white transition-colors">Enter Motion Archive</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => handleDisciplineSelect('Photography')}
                  className="split-card-hover relative h-[60vh] overflow-hidden cursor-pointer group border border-white/5"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200" 
                    className="bg-image absolute inset-0 w-full h-full object-cover grayscale opacity-40 transition-all duration-1000"
                    alt="Photography Category"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-4xl font-bold uppercase tracking-tighter mb-4">Photography</h3>
                    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 group-hover:text-white transition-colors">Enter Still Archive</p>
                  </div>
                </div>
              </div>
            </section>

            <div ref={portfolioRef}>
              <Portfolio 
                data={siteData.projects} 
                previewOnly 
                externalFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onShowMore={() => handleViewChange(ViewMode.Work)}
                onInquire={handleProjectInquiry} 
              />
            </div>
            <Services 
              data={siteData.packages} 
              onBook={handlePackageBooking} 
              onCustomInquiry={handleCustomInquiry} 
            />
            <Contact data={siteData.contact} initialContext={inquiryContext} />
          </>
        );
      case ViewMode.Work:
        return (
          <Portfolio 
            data={siteData.projects} 
            externalFilter={activeFilter} 
            onFilterChange={setActiveFilter}
            onInquire={handleProjectInquiry}
          />
        );
      case ViewMode.Services:
        return (
          <Services 
            data={siteData.packages} 
            onBook={handlePackageBooking}
            onCustomInquiry={handleCustomInquiry}
          />
        );
      case ViewMode.Contact:
        return <Contact data={siteData.contact} initialContext={inquiryContext} />;
      default:
        return <Hero data={siteData.hero} onCtaClick={() => handleViewChange(ViewMode.Work)} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {view !== ViewMode.Admin && (
        <Navbar 
          currentView={view} 
          onViewChange={handleViewChange} 
          isScrolled={isScrolled} 
        />
      )}
      
      <main className="transition-all duration-500 min-h-screen">
        {renderContent()}
      </main>

      {view !== ViewMode.Admin && (
        <Footer data={siteData} onViewChange={handleViewChange} />
      )}
    </div>
  );
};

export default App;
