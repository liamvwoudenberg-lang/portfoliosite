import React, { useState } from 'react';
import { Package } from '../types';

interface ServicesProps {
  data: Package[];
  ui: any;
  onBook: (pkg: Package) => void;
  onCustomInquiry: () => void;
}

export const Services: React.FC<ServicesProps> = ({ data, ui, onBook, onCustomInquiry }) => {
  const [activeTab, setActiveTab] = useState<'Videography' | 'Photography' | 'Combo'>('Videography');
  const filtered = data.filter(p => p.category === activeTab);

  return (
    <section className="py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[9px] uppercase tracking-[0.6em] text-neutral-500 font-bold block mb-4">Pricing & Packages</span>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12">{ui.services}</h3>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-white/5 max-w-lg mx-auto px-4">
            {(['Videography', 'Photography', 'Combo'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`text-[10px] md:text-xs uppercase tracking-[0.3em] pb-4 transition-all relative ${activeTab === tab ? 'text-white font-bold' : 'text-neutral-600 hover:text-white'}`}
              >
                {tab}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Changed to strictly 2 columns (md:grid-cols-2) for the 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {filtered.map(pkg => (
            <div 
              key={pkg.id} 
              className={`relative p-8 md:p-10 border flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-2 ${pkg.recommended ? 'bg-[#0a0a0a] border-white/20 shadow-2xl shadow-white/5 z-10' : 'bg-[#050505] border-white/5 hover:border-white/10'}`}
            >
              {/* Discount Tag */}
              {pkg.discountTag && (
                <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 z-20">
                  {pkg.discountTag}
                </div>
              )}
              
              <div>
                <h4 className="text-lg md:text-xl font-bold uppercase mb-2 text-white tracking-widest">{pkg.name}</h4>
                
                <div className="flex flex-col items-start mb-6">
                  {pkg.oldPrice && (
                    <span className="text-neutral-500 text-sm line-through decoration-red-500 decoration-1 mb-1">{pkg.oldPrice}</span>
                  )}
                  <div className="text-2xl md:text-3xl font-light text-neutral-200">{pkg.price}</div>
                </div>

                <p className="text-sm text-neutral-400 mb-8 italic min-h-[40px] leading-relaxed">{pkg.description}</p>
                <div className="w-full h-[1px] bg-white/10 mb-8"></div>
                <ul className="space-y-4 mb-12">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center gap-4 text-neutral-300">
                      <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => onBook(pkg)} 
                className={`w-full py-4 text-[9px] font-bold uppercase tracking-[0.5em] transition-all duration-300 ${pkg.recommended ? 'bg-white text-black hover:bg-neutral-200' : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'}`}
              >
                {ui.inquire}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Inquiry CTA */}
        <div className="mt-16 text-center animate-fade">
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-4">Project past niet in een pakket?</p>
          <button 
            onClick={onCustomInquiry} 
            className="text-white border-b border-white/30 pb-1 hover:border-white hover:text-neutral-300 transition-colors uppercase tracking-[0.2em] text-xs font-bold"
          >
            Vraag een offerte op maat
          </button>
        </div>
      </div>
    </section>
  );
};