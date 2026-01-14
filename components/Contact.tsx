import React, { useState, useEffect } from 'react';

interface ContactProps {
  data: {
    email: string;
    location: string;
    placeholders: any;
  };
  ui: any;
  initialContext?: {
    type: 'package' | 'project' | 'general';
    name?: string;
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ data, ui, initialContext }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (initialContext) {
      if (initialContext.type === 'package') {
        setSubjectLine(`Offerte Aanvraag: ${initialContext.name}`);
        setMessage(`Beste Liam,\n\nInteresse in '${initialContext.name}'.\n\nProject details:\n`);
      } else if (initialContext.type === 'project') {
        setSubjectLine(`Referentie: ${initialContext.name}`);
        setMessage(`Beste Liam,\n\nInteresse n.a.v. werk: '${initialContext.name}'.\n\nDetails:\n`);
      }
    }
  }, [initialContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setLoading(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${data.email}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          dates, 
          message, 
          _subject: subjectLine || "BigBoy Productions Inquiry", 
          _template: "table", 
          _captcha: "false" 
        })
      });
      if (response.ok) {
        setSubmitted(true);
        setName(''); setEmail(''); setDates(''); setMessage('');
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-neutral-600 mb-8 font-bold">{ui.contact}</h2>
          <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 uppercase leading-none">Let's <br /> <span className="text-white/20 italic">Create</span></h3>
          <p className="text-xl text-neutral-500 font-light max-w-md">{data.location}</p>
        </div>

        <div className={`bg-[#050505] p-8 md:p-12 border shadow-2xl transition-colors duration-500 ${submitted ? 'border-emerald-500/30' : 'border-white/5'}`}>
          {submitted ? (
            <div className="text-center py-24 animate-fade">
              <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-6">
                 <i className="fa-solid fa-check text-2xl text-emerald-500"></i>
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4 text-white">{data.placeholders.successTitle}</h4>
              <p className="text-neutral-500 max-w-xs mx-auto leading-relaxed">{data.placeholders.successSubtitle}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <input type="text" className="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors" placeholder={data.placeholders.name} />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors" placeholder={data.placeholders.email} />
              </div>
              <input value={dates} onChange={(e) => setDates(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors" placeholder={data.placeholders.dates} />
              <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none resize-none transition-colors" placeholder={data.placeholders.message} />
              <button type="submit" disabled={loading} className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-colors disabled:opacity-50">
                {loading ? 'SENDING...' : data.placeholders.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};