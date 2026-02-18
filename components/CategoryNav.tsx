import React from 'react';

export interface NavItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}

interface CategoryNavProps {
  items: NavItem[];
  title: string;
  onBack?: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ items, title, onBack }) => {
  return (
    <section className="min-h-screen bg-black py-40 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-16 border-b border-white/10 pb-8">
          {onBack && (
            <button onClick={onBack} className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white mb-6 transition-colors flex items-center gap-2">
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
          )}
          <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white">{title}</h2>
        </header>

        <div className={`grid gap-8 ${items.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'}`}>
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={item.onClick}
              className="group relative h-[60vh] overflow-hidden cursor-pointer border border-white/10 bg-neutral-900"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out opacity-30 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700">
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 group-hover:-translate-y-2 transition-transform duration-700 text-white drop-shadow-lg">{item.title}</h3>
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/80 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 font-bold">
                  {item.subtitle}
                </p>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};