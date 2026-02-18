
import React, { useState } from 'react';
import { cn } from '../utils';

interface CalendarProps {
  selectedDates: Date[];
  onDateChange: (dates: Date[]) => void;
  onConfirm: () => void;
  isTbd: boolean;
  onSetTbd: () => void;
  customValue: string;
  onCustomChange: (val: string) => void;
  isCustomMode: boolean;
  onSetCustom: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  selectedDates, onDateChange, onConfirm, isTbd, onSetTbd, 
  customValue, onCustomChange, isCustomMode, onSetCustom 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0,0,0,0);
    const exists = selectedDates.find(d => d.getTime() === clickedDate.getTime());
    if (exists) {
      onDateChange(selectedDates.filter(d => d.getTime() !== clickedDate.getTime()));
    } else {
      onDateChange([...selectedDates, clickedDate]);
    }
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysCount = daysInMonth(year, month);
  const firstDay = (startDayOfMonth(year, month) + 6) % 7; 
  const today = new Date();
  today.setHours(0,0,0,0);

  const monthName = currentMonth.toLocaleString('nl-NL', { month: 'long', year: 'numeric' });
  const dayLabels = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

  return (
    <div className="flex flex-col bg-black border border-white/10 shadow-2xl animate-fade origin-top backdrop-blur-3xl overflow-hidden rounded-sm">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{monthName}</span>
          <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayLabels.map(label => (
            <div key={label} className="text-[8px] uppercase text-neutral-600 font-bold text-center">{label}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          
          {Array.from({ length: daysCount }).map((_, i) => {
            const day = i + 1;
            const dateObj = new Date(year, month, day);
            dateObj.setHours(0,0,0,0);
            const isPast = dateObj < today;
            const isSelected = selectedDates.some(d => d.getTime() === dateObj.getTime());

            return (
              <button
                key={day}
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "aspect-square flex items-center justify-center text-[10px] rounded-full transition-all duration-300",
                  isPast ? 'text-neutral-800 cursor-not-allowed' : 'text-neutral-400 hover:bg-white hover:text-black hover:scale-110',
                  isSelected ? 'bg-white text-black font-bold scale-110' : ''
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/5 p-4 bg-white/[0.02] space-y-3">
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={onSetTbd}
            className={cn("flex-1 py-2 text-[8px] uppercase tracking-widest font-bold border transition-all", isTbd ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30')}
          >
            TBD
          </button>
          <button 
            type="button" 
            onClick={onSetCustom}
            className={cn("flex-1 py-2 text-[8px] uppercase tracking-widest font-bold border transition-all", isCustomMode ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30')}
          >
            Custom
          </button>
        </div>
        
        {isCustomMode && (
          <div className="animate-fade">
            <input 
              autoFocus
              type="text"
              placeholder="Specifieer periode..."
              value={customValue}
              onChange={(e) => onCustomChange(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-sm p-3 text-[10px] text-white outline-none focus:border-white transition-all placeholder:text-white/20"
            />
          </div>
        )}
        
        <button 
          type="button"
          onClick={onConfirm}
          className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[8px] uppercase tracking-[0.2em] font-bold transition-all"
        >
          Bevestig Selectie
        </button>
      </div>
    </div>
  );
};
