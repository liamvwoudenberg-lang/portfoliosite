
import React from 'react';
import { SiteData, ViewMode } from '../types';

interface FooterProps {
  data: SiteData;
  onViewChange: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onViewChange }) => {
  return (
    <footer className="py-24 px-6 border-t border-neutral-900 bg-black relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        <div className="text-left">
          <h2 className="text-2xl font-bold tracking-[0.3em] mb-4 uppercase">{data.branding.name}</h2>
          <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
            {data.branding.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-8 text-neutral-400">
            <a 
              href="https://instagram.com/obesieliam" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-white transition-colors duration-300"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
          <button 
            onClick={() => onViewChange(ViewMode.Admin)}
            className="text-[8px] text-neutral-800 uppercase tracking-widest hover:text-neutral-500 transition-colors"
          >
            Admin Login
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-neutral-900 text-neutral-600 text-[10px] uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} {data.branding.name}. All Rights Reserved.</p>
        <address className="not-italic flex gap-8">
          <span className="hover:text-white transition-colors cursor-default">{data.contact.location}</span>
          <a href={`mailto:${data.contact.email}`} className="hover:text-white transition-colors">{data.contact.email}</a>
        </address>
      </div>
    </footer>
  );
};
