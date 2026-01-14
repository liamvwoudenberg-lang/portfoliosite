import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin';
import { CategoryNav } from './components/CategoryNav';
import { ViewMode, SiteData, Package, Project, Language } from './types';
import { TRANSLATIONS } from './data';
import { fetchGitHubFolder } from './services/github';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Home);
  const [lang, setLang] = useState<Language>('nl');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [inquiryContext, setInquiryContext] = useState<{ type: 'package' | 'project' | 'general', name?: string } | null>(null);

  // Lifted State: Initialize with static data, but allow updates
  const [siteDataMap, setSiteDataMap] = useState<Record<Language, SiteData>>(TRANSLATIONS);

  // Derived state for current language
  const siteData = useMemo(() => siteDataMap[lang], [siteDataMap, lang]);

  useEffect(() => {
    const baseTitle = siteData.branding.name || "BigBoy Productions";
    document.title = `${baseTitle} | ${lang.toUpperCase()}`;
  }, [view, lang, siteData.branding.name]);

  // Handle Scroll Logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin Data Update Handler
  const handleAdminSave = (newData: SiteData) => {
    setSiteDataMap(prev => ({
      ...prev,
      [lang]: newData
    }));
  };

  // Navigation Handler
  const navigate = useCallback((newView: ViewMode, folder: string | null = null) => {
    setView(newView);
    setActiveFolder(folder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Smooth Scroll to Section (even across views)
  const scrollToSection = useCallback((sectionId: string) => {
    if (view !== ViewMode.Home) {
      setView(ViewMode.Home);
      // Wait for render then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

  // Handle "Book Now" clicks from Services
  const handleBooking = (pkg: Package) => {
    setInquiryContext({ type: 'package', name: pkg.name });
    scrollToSection('contact');
  };

  const handleProjectInquiry = (project: Project) => {
    setInquiryContext({ type: 'project', name: project.title });
    setView(ViewMode.Home);
    setTimeout(() => {
       const el = document.getElementById('contact');
       if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderView = () => {
    if (view === ViewMode.Admin) {
      return (
        <AdminDashboard 
          data={siteData} 
          onSave={handleAdminSave} 
          onExit={() => navigate(ViewMode.Home)} 
        />
      );
    }

    // Detail Views (Work Gallery etc)
    if (view === ViewMode.WorkIndex) {
      return (
        <CategoryNav 
          title={siteData.ui.work}
          items={[
            { id: 'cine', title: 'Motion', subtitle: 'Cinematography & Commercial', image: siteData.projects[0].thumbnail, onClick: () => navigate(ViewMode.WorkGallery) },
            { id: 'photo', title: 'Stills', subtitle: 'Photography Collections', image: siteData.hero.backgroundUrl, onClick: () => navigate(ViewMode.WorkPhotography) }
          ]}
          onBack={() => navigate(ViewMode.Home)}
        />
      );
    }

    if (view === ViewMode.WorkPhotography) {
        const photoCats = [
          { f: 'concert', t: 'Concerts', s: 'Live performance', img: 'https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/concert/_FOM7995-Enhanced-NR.jpg' },
          { f: 'clothing', t: 'Fashion', s: 'Campaigns', img: 'https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/clothing/DSC08391.jpg' },
          { f: 'portrait', t: 'Portraits', s: 'Professional', img: siteData.hero.backgroundUrl }
        ];
        return (
          <CategoryNav 
            title="Photography"
            onBack={() => navigate(ViewMode.WorkIndex)}
            items={photoCats.map(c => ({ id: c.f, title: c.t, subtitle: c.s, image: c.img, onClick: () => navigate(ViewMode.WorkGallery, c.f) }))}
          />
        );
    }

    if (view === ViewMode.WorkGallery) {
        const galleryData = activeFolder 
          ? siteData.projects.filter(p => p.folder === activeFolder) 
          : siteData.projects.filter(p => p.category !== 'Photography');
        return (
          <Portfolio 
            data={galleryData} 
            ui={siteData.ui}
            title={activeFolder ? activeFolder.toUpperCase() : "Motion"}
            onBack={() => navigate(activeFolder ? ViewMode.WorkPhotography : ViewMode.WorkIndex)}
            onInquire={handleProjectInquiry}
          />
        );
    }

    // Default: Home View (One Page Scroll)
    return (
      <div className="page-transition">
        <Hero data={siteData.hero} ui={siteData.ui} onCtaClick={() => scrollToSection('portfolio')} />
        <div id="portfolio">
          <Portfolio 
            data={siteData.projects} 
            ui={siteData.ui}
            previewOnly 
            onShowMore={() => navigate(ViewMode.WorkIndex)}
            onInquire={handleProjectInquiry} 
          />
        </div>
        <div id="services">
          <Services 
            data={siteData.packages} 
            ui={siteData.ui} 
            onBook={handleBooking} 
            onCustomInquiry={() => { setInquiryContext({ type: 'general' }); scrollToSection('contact'); }} 
          />
        </div>
        <div id="contact">
          <Contact data={siteData.contact} ui={siteData.ui} initialContext={inquiryContext} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {view !== ViewMode.Admin && (
        <Navbar 
          currentView={view} 
          onViewChange={navigate} 
          onScrollTo={scrollToSection}
          isScrolled={isScrolled} 
          lang={lang}
          onLangChange={setLang}
          ui={siteData.ui}
        />
      )}
      <main>{renderView()}</main>
      {view !== ViewMode.Admin && <Footer data={siteData} onViewChange={navigate} />}
    </div>
  );
};

export default App;