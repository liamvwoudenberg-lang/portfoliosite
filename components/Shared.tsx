
import React from 'react';
import { cn } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  tracking?: 'normal' | 'wide' | 'widest';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  tracking = 'widest',
  className,
  ...props 
}) => {
  const base = "px-10 py-5 font-bold uppercase transition-all duration-300 relative overflow-hidden text-[9px] md:text-[10px]";
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white/40 hover:text-white"
  };
  const trackings = {
    normal: "tracking-[0.2em]",
    wide: "tracking-[0.4em]",
    widest: "tracking-[0.6em]"
  };

  return (
    <button 
      className={cn(base, variants[variant], trackings[tracking], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const SectionHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  topLabel?: string;
  alignment?: 'left' | 'center';
  className?: string;
}> = ({ title, subtitle, topLabel, alignment = 'left', className }) => (
  <div className={cn("mb-12 md:mb-20", alignment === 'center' ? 'text-center' : '', className)}>
    {topLabel && (
      <span className="text-[9px] uppercase tracking-[0.6em] text-neutral-500 font-bold block mb-4">
        {topLabel}
      </span>
    )}
    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-none text-white">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export const AdminInput: React.FC<{ 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  textarea?: boolean; 
  compact?: boolean;
  rows?: number;
}> = ({ label, value, onChange, textarea, compact, rows = 4 }) => (
  <div className={cn("space-y-2", compact ? 'space-y-1' : '')}>
    <label className={cn("uppercase tracking-[0.3em] text-white/30 font-bold ml-1", compact ? 'text-[8px]' : 'text-[9px]')}>
      {label}
    </label>
    {textarea ? (
      <textarea 
        className="w-full bg-black border border-white/5 rounded-xl p-4 text-[11px] leading-relaxed text-white focus:border-white outline-none transition-all resize-none"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input 
        className={cn("w-full bg-black border border-white/5 rounded-xl text-white focus:border-white outline-none transition-all", compact ? 'p-2.5 text-[10px]' : 'p-4 text-[11px]')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);
