
import React, { useState } from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Work', view: ViewMode.Work },
    { label: 'Deals', view: ViewMode.Services },
    { label: 'Contact', view: ViewMode.Contact },
  ];

  const handleNavClick = (view: ViewMode) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 py-5' : 'bg-transparent py-10'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div 
            onClick={() => handleNavClick(ViewMode.Home)}
            className="text-sm font-bold tracking-[0.4em] cursor-pointer hover:opacity-60 transition-opacity uppercase relative z-[60]"
          >
            BIGBOY PRODUCTIONS
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-[9px] tracking-[0.3em] uppercase transition-all hover:text-white ${currentView === item.view ? 'text-white font-bold underline underline-offset-8' : 'text-neutral-500'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(ViewMode.Contact)}
              className="px-8 py-3 bg-white text-black text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-200 transition-all"
            >
              Start Inquiry
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white relative z-[60] w-10 h-10 flex items-center justify-center focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <i className="fa-solid fa-xmark text-2xl"></i>
            ) : (
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-50 flex flex-col justify-center items-center gap-10 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => handleNavClick(item.view)}
            className={`text-2xl font-light tracking-[0.3em] uppercase transition-all ${currentView === item.view ? 'text-white' : 'text-neutral-500'}`}
          >
            {item.label}
          </button>
        ))}
        <button 
          onClick={() => handleNavClick(ViewMode.Contact)}
          className="mt-8 px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em]"
        >
          Start Inquiry
        </button>
      </div>
    </>
  );
};
