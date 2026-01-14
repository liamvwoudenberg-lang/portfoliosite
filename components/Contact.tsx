
import React, { useState, useEffect } from 'react';

interface ContactProps {
  data: {
    email: string;
    location: string;
  };
  initialContext?: {
    type: 'package' | 'project' | 'general';
    name?: string;
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ data, initialContext }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [subjectLine, setSubjectLine] = useState('');

  // Pre-fill form based on props
  useEffect(() => {
    if (initialContext) {
      if (initialContext.type === 'package') {
        setSubjectLine(`Inquiry: ${initialContext.name} Package`);
        setMessage(`Hi Liam,\n\nI'm interested in booking the ${initialContext.name} package. \n\nMy project details:\n`);
      } else if (initialContext.type === 'project') {
        setSubjectLine(`Reference: ${initialContext.name}`);
        setMessage(`Hi Liam,\n\nI saw your work on '${initialContext.name}' and would love something similar for my brand.\n\nHere is what I have in mind:\n`);
      } else {
        setSubjectLine('Custom Inquiry');
        setMessage('');
      }
    }
  }, [initialContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/liamvwoudenberg@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          dates,
          message,
          _subject: subjectLine || "New Inquiry from BigBoy Productions Site",
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setDates('');
        setMessage('');
      } else {
        alert("Something went wrong with the submission. Please email directly.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("Something went wrong. Please email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 blur-[150px] rounded-full pointer-events-none opacity-20"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
        <div className="space-y-16">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-neutral-600 mb-8">Get In Touch</h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 uppercase leading-[0.85]">Let's Create <br /> <span className="text-white/20 italic">Together</span></h3>
            <p className="text-xl text-neutral-500 font-light max-w-md leading-relaxed">
              Based in {data.location}, available for projects across the Netherlands and worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.5em] text-neutral-700 block">Direct Email</span>
              <a href={`mailto:${data.email}`} className="text-xl hover:text-neutral-400 transition-colors border-b border-white/5 pb-2">{data.email}</a>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.5em] text-neutral-700 block">Location</span>
              <span className="text-xl">{data.location}</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-950/50 backdrop-blur-xl p-8 md:p-12 border border-white/5 relative">
          {submitted ? (
            <div className="text-center py-24 space-y-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <i className="fa-solid fa-check text-2xl text-white"></i>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold uppercase tracking-tight">Message Received</h4>
                <p className="text-neutral-500 font-light">Thanks {name}, I'll get back to you within 24 hours.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 hover:text-white transition-colors"
              >
                Send New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Subject Line (Hidden or Displayed as Context) */}
              {subjectLine && (
                <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold border-l-2 border-emerald-500 pl-4 py-1">
                  {subjectLine}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors font-light text-sm" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors font-light text-sm" 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">Preferred Dates (Optional)</label>
                <input 
                  type="text" 
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="e.g. 12th May, 15th June, or any Tuesday in July"
                  className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors font-light text-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">Project Vision & Details</label>
                <textarea 
                  required 
                  rows={6} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-800 py-3 focus:border-white outline-none transition-colors resize-none font-light text-sm" 
                  placeholder="Describe your project goals, style preferences..." 
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
