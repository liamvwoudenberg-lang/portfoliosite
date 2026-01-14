
import React, { useState } from 'react';
import { Package } from '../types';

interface ServicesProps {
  data: Package[];
  onBook: (pkg: Package) => void;
  onCustomInquiry: () => void;
}

export const Services: React.FC<ServicesProps> = ({ data, onBook, onCustomInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<'Videography' | 'Photography' | 'Combo'>('Videography');

  const filteredPackages = data.filter(pkg => pkg.category === activeCategory);

  return (
    <section className="py-40 px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-10 font-bold">Rates & Packages</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 uppercase italic text-white/90">Work With Me</h3>
          
          {/* Category Tabs */}
          <div className="flex justify-center gap-8 md:gap-16 border-b border-white/5 pb-1 max-w-lg mx-auto">
            {(['Videography', 'Photography', 'Combo'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] md:text-xs uppercase tracking-[0.3em] pb-4 transition-all ${activeCategory === cat ? 'text-white border-b-2 border-white font-bold' : 'text-neutral-600 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-20">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative p-12 flex flex-col justify-between border transition-all duration-700 h-full ${pkg.recommended ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/5 hover:border-white/20'}`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] uppercase font-bold px-6 py-2 tracking-[0.3em] rounded-full shadow-2xl">
                  Best Value
                </div>
              )}
              
              <div>
                <span className={`block text-[8px] uppercase tracking-[0.4em] mb-4 ${pkg.recommended ? 'text-neutral-500' : 'text-neutral-500'}`}>{pkg.category}</span>
                <h4 className={`text-xl font-bold mb-4 uppercase tracking-tight ${pkg.recommended ? 'text-black' : 'text-white'}`}>{pkg.name}</h4>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl lg:text-5xl font-light tracking-tighter">{pkg.price}</span>
                </div>
                <p className={`mb-12 text-sm leading-relaxed font-light ${pkg.recommended ? 'text-black/80' : 'text-neutral-400'}`}>
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-12">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                      <div className={`w-1 h-1 mt-1.5 rounded-full flex-shrink-0 ${pkg.recommended ? 'bg-black' : 'bg-neutral-600'}`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onBook(pkg)}
                className={`w-full py-5 font-bold uppercase tracking-[0.4em] text-[9px] transition-all ${pkg.recommended ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}
              >
                Book Now
              </button>
            </div>
          ))}
          {filteredPackages.length === 0 && (
            <div className="col-span-full text-center py-12 text-neutral-500 text-sm tracking-widest uppercase">
              No packages available in this category.
            </div>
          )}
        </div>

        {/* Custom Quote Section */}
        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-neutral-400 text-sm font-light mb-6">Can't find what you're looking for? Need a custom production?</p>
          <button 
            onClick={onCustomInquiry}
            className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
          >
            Request Custom Offerte
          </button>
        </div>
      </div>
    </section>
  );
};
