
import React, { useState, useEffect, useRef } from 'react';
import { ContactPlaceholders, UIConfig } from '../types';
import { Calendar } from './Calendar';
import { SectionHeader, Button } from './Shared';

interface ContactProps {
  data: {
    email: string;
    location: string;
    placeholders: ContactPlaceholders;
  };
  ui: UIConfig;
  initialContext?: {
    type: 'package' | 'project' | 'general';
    name?: string;
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ data, ui, initialContext }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: '' });
  const [dates, setDates] = useState<{ selected: Date[], isTbd: boolean, isCustom: boolean, customValue: string }>({
    selected: [], isTbd: false, isCustom: false, customValue: ''
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      if (initialContext.type === 'package') {
        setForm(f => ({ ...f, subject: `Offerte: ${initialContext.name}`, message: `Interesse in '${initialContext.name}'.\n` }));
      } else if (initialContext.type === 'project') {
        setForm(f => ({ ...f, subject: `Referentie: ${initialContext.name}`, message: `Vraag n.a.v. werk: '${initialContext.name}'.\n` }));
      }
    }
  }, [initialContext]);

  const getDisplayDate = () => {
    if (dates.isTbd) return "Nog overeen te komen";
    if (dates.isCustom && dates.customValue) return dates.customValue;
    return dates.selected.length > 0 
      ? dates.selected.map(d => d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' })).join(', ')
      : "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${data.email}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...form, 
          dates: getDisplayDate(), 
          _subject: form.subject || "BigBoy Inquiry" 
        })
      });

      if (!response.ok) throw new Error("Submission failed");
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Er is iets misgegaan. Probeer het later opnieuw of mail direct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        <div>
          <SectionHeader title="Let's Create" subtitle={data.location} topLabel={ui.contact} />
        </div>

        <div className="bg-[#050505] p-8 md:p-12 border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-24 animate-fade">
              <i className="fa-solid fa-check text-2xl text-emerald-500 mb-6 block"></i>
              <h4 className="text-2xl font-bold uppercase mb-4 text-white">{data.placeholders.successTitle}</h4>
              <p className="text-white/50 max-w-xs mx-auto">{data.placeholders.successSubtitle}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{data.placeholders.name}</label>
                   <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white text-white" />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{data.placeholders.email}</label>
                   <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white text-white" />
                </div>
              </div>

              <div className="relative" ref={calendarRef}>
                <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{data.placeholders.dates}</label>
                <div onClick={() => setShowCalendar(!showCalendar)} className="w-full bg-transparent border-b border-white/10 py-3 cursor-pointer flex justify-between items-center group">
                  <span className={getDisplayDate() ? 'text-white' : 'text-white/20'}>{getDisplayDate() || "Selecteer datum(s)"}</span>
                  <i className="fa-regular fa-calendar text-white/20 group-hover:text-white"></i>
                </div>
                {showCalendar && (
                  <div className="absolute top-full left-0 w-full mt-4 z-50">
                    <Calendar 
                      selectedDates={dates.selected}
                      onDateChange={d => setDates({...dates, selected: d, isTbd: false, isCustom: false})}
                      onConfirm={() => setShowCalendar(false)}
                      isTbd={dates.isTbd}
                      onSetTbd={() => setDates({...dates, isTbd: true, isCustom: false, selected: []})}
                      isCustomMode={dates.isCustom}
                      customValue={dates.customValue}
                      onCustomChange={v => setDates({...dates, customValue: v})}
                      onSetCustom={() => setDates({...dates, isCustom: true, isTbd: false, selected: []})}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                 <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Bericht</label>
                 <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-3 outline-none resize-none focus:border-white text-white" placeholder={data.placeholders.message} />
              </div>

              {error && (
                <div className="text-[10px] uppercase tracking-widest text-red-500 font-bold animate-fade">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full py-6">
                {loading ? 'SENDING...' : data.placeholders.submit}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
