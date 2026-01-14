import React, { useState } from 'react';
import { ViewMode, Language } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onScrollTo: (id: string) => void;
  isScrolled: boolean;
  lang: Language;
  onLangChange: (lang: Language) => void;
  ui: any;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onScrollTo, isScrolled, lang, onLangChange, ui }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Define action type: 'view' changes the page, 'scroll' goes to a section
  const navItems = [
    { label: ui.work, action: 'view', target: ViewMode.WorkIndex },
    { label: ui.services, action: 'scroll', target: 'services' },
    { label: ui.contact, action: 'scroll', target: 'contact' },
  ];

  const handleNavClick = (item: any) => {
    if (item.action === 'scroll') {
      onScrollTo(item.target);
    } else {
      onViewChange(item.target);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-5 border-b border-white/5 shadow-lg' : 'bg-transparent py-8 md:py-10'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex md:grid md:grid-cols-3 justify-between items-center">
          
          {/* Left: Logo */}
          <div 
            onClick={() => onViewChange(ViewMode.Home)} 
            className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] cursor-pointer uppercase justify-self-start relative z-[60] hover:text-neutral-300 transition-colors"
          >
            BigBoy Productions
          </div>
          
          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-16 justify-self-center">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-400 hover:text-white transition-all hover:tracking-[0.4em]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Language & CTA */}
          <div className="hidden md:flex items-center justify-end gap-10 justify-self-end">
            <div className="flex gap-4 items-center border-r border-white/10 pr-8">
              <button 
                onClick={() => onLangChange('en')} 
                className={`text-[9px] font-bold transition-colors ${lang === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-300'}`}
              >EN</button>
              <button 
                onClick={() => onLangChange('nl')} 
                className={`text-[9px] font-bold transition-colors ${lang === 'nl' ? 'text-white' : 'text-neutral-600 hover:text-neutral-300'}`}
              >NL</button>
            </div>

            <button onClick={() => onScrollTo('contact')} className="group relative px-8 py-3 bg-white text-black overflow-hidden">
               <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-300">{ui.inquire}</span>
               <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 z-[60]">
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-12 transition-transform duration-500 md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {navItems.map(item => (
          <button 
            key={item.label} 
            onClick={() => handleNavClick(item)} 
            className="text-3xl font-light tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            {item.label}
          </button>
        ))}
        
        <div className="flex gap-8 mt-8 border-t border-white/10 pt-10">
          <button onClick={() => onLangChange('en')} className={`text-sm tracking-widest ${lang === 'en' ? 'text-white font-bold' : 'text-neutral-600'}`}>ENGLISH</button>
          <button onClick={() => onLangChange('nl')} className={`text-sm tracking-widest ${lang === 'nl' ? 'text-white font-bold' : 'text-neutral-600'}`}>DUTCH</button>
        </div>

        <button onClick={() => { onScrollTo('contact'); setIsOpen(false); }} className="mt-8 px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.4em]">
          {ui.inquire}
        </button>
      </div>
    </>
  );
};