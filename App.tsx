
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin';
import { CategoryNav } from './components/CategoryNav';
import { SectionHeader } from './components/Shared';
import { ViewMode, SiteData, Package, Project, Language } from './types';
import { TRANSLATIONS } from './data';
import { fetchGitHubFolder } from './services/github';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Home);
  const [lang, setLang] = useState<Language>('nl');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [inquiryContext, setInquiryContext] = useState<{ type: 'package' | 'project' | 'general', name?: string } | null>(null);
  
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [loadingFolder, setLoadingFolder] = useState(false);
  const [siteDataMap, setSiteDataMap] = useState<Record<Language, SiteData>>(TRANSLATIONS);

  const siteData = useMemo(() => siteDataMap[lang], [siteDataMap, lang]);

  useEffect(() => {
    document.title = `${siteData.branding.name} | ${lang.toUpperCase()}`;
  }, [lang, siteData.branding.name]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeFolder && view === ViewMode.WorkGallery) {
      const hasProjects = dynamicProjects.some(p => p.folder === activeFolder);
      if (!hasProjects) {
        setLoadingFolder(true);
        fetchGitHubFolder(activeFolder, 'Photography')
          .then(projects => {
            setDynamicProjects(prev => {
              const existingIds = new Set(prev.map(p => p.id));
              return [...prev, ...projects.filter(p => !existingIds.has(p.id))];
            });
          })
          .catch(console.error)
          .finally(() => setLoadingFolder(false));
      }
    }
  }, [activeFolder, view, dynamicProjects]);

  const navigate = useCallback((newView: ViewMode, folder: string | null = null) => {
    setView(newView);
    setActiveFolder(folder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (view !== ViewMode.Home) {
      setView(ViewMode.Home);
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

  const handleBooking = (pkg: Package) => {
    setInquiryContext({ type: 'package', name: pkg.name });
    scrollToSection('contact');
  };

  const views = {
    [ViewMode.Admin]: () => <AdminDashboard data={siteData} onSave={d => setSiteDataMap(p => ({ ...p, [lang]: d }))} onExit={() => navigate(ViewMode.Home)} />,
    [ViewMode.WorkIndex]: () => (
      <CategoryNav 
        title={siteData.ui.work}
        onBack={() => navigate(ViewMode.Home)}
        items={[
          { id: 'cine', title: 'MOTION', subtitle: 'Cinematography', image: siteData.projects[0].thumbnail, onClick: () => navigate(ViewMode.WorkGallery) },
          { id: 'photo', title: 'STILLS', subtitle: 'Photography', image: siteData.hero.backgroundUrl, onClick: () => navigate(ViewMode.WorkPhotography) }
        ]}
      />
    ),
    [ViewMode.WorkPhotography]: () => (
      <CategoryNav 
        title="Photography"
        onBack={() => navigate(ViewMode.WorkIndex)}
        items={[
          { f: 'concert', t: 'Concerts', s: 'Live', img: 'https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/concert/_FOM7995-Enhanced-NR.jpg' },
          { f: 'clothing', t: 'Fashion', s: 'Campaigns', img: 'https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/clothing/DSC08391.jpg' },
          { f: 'product', t: 'Product', s: 'Commercial', img: 'https://img.youtube.com/vi/c_vPvZcodhY/maxresdefault.jpg' },
          { f: 'portrait', t: 'Portraits', s: 'Pro', img: siteData.hero.backgroundUrl }
        ].map(c => ({ id: c.f, title: c.t, subtitle: c.s, image: c.img, onClick: () => navigate(ViewMode.WorkGallery, c.f) }))}
      />
    ),
    [ViewMode.WorkGallery]: () => {
      const galleryData = activeFolder 
        ? [...siteData.projects, ...dynamicProjects].filter(p => p.folder === activeFolder) 
        : siteData.projects.filter(p => p.category !== 'Photography');
      return (
        <Portfolio 
          data={galleryData} ui={siteData.ui}
          title={activeFolder?.toUpperCase() || "Motion"}
          onBack={() => navigate(activeFolder ? ViewMode.WorkPhotography : ViewMode.WorkIndex)}
          onInquire={p => { setInquiryContext({ type: 'project', name: p.title }); navigate(ViewMode.Home); setTimeout(() => scrollToSection('contact'), 150); }}
          isLoading={loadingFolder && galleryData.length === 0}
        />
      );
    },
    [ViewMode.Home]: () => (
      <div className="page-transition">
        <Hero data={siteData.hero} ui={siteData.ui} onCtaClick={() => navigate(ViewMode.WorkIndex)} />
        
        {/* Featured Video Section - Refined for Cinematic Clarity */}
        <section className="py-32 md:py-64 px-6 md:px-12 bg-black relative overflow-hidden">
          {/* Cinematic Parallax Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.012] select-none pointer-events-none uppercase z-0 tracking-tighter leading-none">
            {lang === 'nl' ? "BEELD" : "VISION"}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeader 
              title={lang === 'nl' ? "Nieuwste Productie" : "Latest Release"} 
              subtitle={lang === 'nl' ? "Onze meest recente cinematische release. Een verkenning van modern beeld en geluid." : "Our most recent cinematic release. An exploration of modern image and sound."}
              topLabel="FEATURED WORK" alignment="center" className="mb-24"
            />
            
            <div className="relative aspect-video w-full bg-neutral-900 border border-white/10 shadow-[0_0_120px_rgba(255,255,255,0.03)] overflow-hidden group rounded-sm ring-1 ring-white/5">
               <div className="absolute inset-0 z-20 pointer-events-none border border-white/5 group-hover:border-white/20 transition-colors duration-1000"></div>
               <iframe 
                 width="100%" height="100%" 
                 src="https://www.youtube.com/embed/LyGzBkXwBY8?rel=0&modestbranding=1&color=white" 
                 title="Featured" frameBorder="0" allowFullScreen
                 className="absolute inset-0 w-full h-full transition-all duration-1000 group-hover:scale-[1.002]"
               ></iframe>
            </div>
            
            <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
               <div className="flex gap-16">
                 <div>
                   <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Direction</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Liam v. Woudenberg</span>
                 </div>
                 <div>
                   <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Camera</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Sony FX3 Cinema</span>
                 </div>
               </div>
               <button onClick={() => navigate(ViewMode.WorkIndex)} className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all">
                 {siteData.ui.allProductions} <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
               </button>
            </div>
          </div>
        </section>

        <div id="services">
          <Services data={siteData.packages} ui={siteData.ui} onBook={handleBooking} onCustomInquiry={() => { setInquiryContext({ type: 'general' }); scrollToSection('contact'); }} />
        </div>
        <div id="contact">
          <Contact data={siteData.contact} ui={siteData.ui} initialContext={inquiryContext} />
        </div>
      </div>
    )
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {view !== ViewMode.Admin && (
        <Navbar 
          currentView={view} onViewChange={navigate} onScrollTo={scrollToSection}
          isScrolled={isScrolled} lang={lang} onLangChange={setLang} ui={siteData.ui}
        />
      )}
      <main>{views[view]?.() || views[ViewMode.Home]()}</main>
      {view !== ViewMode.Admin && <Footer data={siteData} onViewChange={navigate} />}
    </div>
  );
};

export default App;
