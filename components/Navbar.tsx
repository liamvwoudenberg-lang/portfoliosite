
import React, { useState, useEffect } from 'react';
import { ViewMode, Language, UIConfig } from '../types';
import { cn } from '../utils';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onScrollTo: (id: string) => void;
  isScrolled: boolean;
  lang: Language;
  onLangChange: (lang: Language) => void;
  ui: UIConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onScrollTo, isScrolled, lang, onLangChange, ui }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: ui.work, action: 'view' as const, target: ViewMode.WorkIndex },
    { label: ui.services, action: 'scroll' as const, target: 'services' },
    { label: ui.contact, action: 'scroll' as const, target: 'contact' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.action === 'scroll') {
      onScrollTo(item.target as string);
    } else {
      onViewChange(item.target as ViewMode);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-700 pointer-events-none",
        isScrolled ? 'bg-black/95 backdrop-blur-2xl py-4 md:py-5 border-b border-white/10' : 'bg-transparent py-6 md:py-10'
      )}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center md:grid md:grid-cols-3 pointer-events-auto">
          <div 
            onClick={() => onViewChange(ViewMode.Home)} 
            className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] cursor-pointer uppercase justify-self-start z-[60]"
          >
            BigBoy Productions
          </div>
          
          <div className="hidden md:flex items-center justify-center gap-16 justify-self-center">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/70 hover:text-white transition-all hover:tracking-[0.4em]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end gap-10 justify-self-end">
            <div className="flex gap-4 items-center border-r border-white/20 pr-8">
              {(['en', 'nl'] as const).map(l => (
                <button 
                  key={l}
                  onClick={() => onLangChange(l)} 
                  className={cn("text-[9px] font-bold transition-colors", lang === l ? 'text-white' : 'text-white/40 hover:text-white')}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={() => onScrollTo('contact')} className="group relative px-8 py-3 bg-white text-black overflow-hidden shadow-xl">
               <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-300">{ui.inquire}</span>
               <div className="absolute inset-0 bg-neutral-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 z-[60] focus:outline-none pointer-events-auto">
            <i className={cn("fa-solid text-xl transition-transform duration-300", isOpen ? 'fa-xmark rotate-90' : 'fa-bars-staggered')}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-transform duration-500 md:hidden h-[100dvh]",
        isOpen ? 'translate-y-0' : '-translate-y-full'
      )}>
        <div className="flex flex-col items-center gap-8">
          {navItems.map(item => (
            <button key={item.label} onClick={() => handleNavClick(item)} className="text-2xl font-light tracking-[0.2em] uppercase text-white/60 hover:text-white">
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex gap-8 mt-12 border-t border-white/10 pt-8 mb-8">
          <button onClick={() => onLangChange('en')} className={cn("text-xs tracking-widest", lang === 'en' ? 'text-white font-bold' : 'text-white/40')}>ENGLISH</button>
          <button onClick={() => onLangChange('nl')} className={cn("text-xs tracking-widest", lang === 'nl' ? 'text-white font-bold' : 'text-white/40')}>DUTCH</button>
        </div>
        <button onClick={() => { onScrollTo('contact'); setIsOpen(false); }} className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em]">
          {ui.inquire}
        </button>
      </div>
    </>
  );
};
