import React, { useState, useEffect } from 'react';
import { SiteData, Project, Package } from '../types';

interface AdminDashboardProps {
  data: SiteData;
  onSave: (data: SiteData) => void;
  onExit: () => void;
}

type Tab = 'overview' | 'branding' | 'portfolio' | 'services' | 'contact' | 'code';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onSave, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localData, setLocalData] = useState<SiteData>(data);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState('');

  // Sync data when entering Code mode
  useEffect(() => {
    if (activeTab === 'code') {
      setJsonString(JSON.stringify(localData, null, 2));
    }
  }, [activeTab, localData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bigboyadmin') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const handleSave = () => {
    if (activeTab === 'code') {
      try {
        const parsed = JSON.parse(jsonString);
        setLocalData(parsed);
        onSave(parsed);
        setJsonError(null);
        alert('Code changes saved successfully!');
      } catch (e) {
        setJsonError((e as Error).message);
        return;
      }
    } else {
      onSave(localData);
      alert('Visual changes saved successfully!');
    }
  };

  const updateField = (section: keyof SiteData, key: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }));
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black p-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80')] bg-cover opacity-20 blur-sm"></div>
        <form onSubmit={handleLogin} className="relative max-w-sm w-full bg-neutral-900/80 backdrop-blur-xl p-10 border border-white/10 shadow-2xl rounded-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="text-3xl mb-4"><i className="fa-solid fa-lock text-white"></i></div>
            <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white">CMS Login</h1>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">BigBoy Productions</p>
          </div>
          <div className="space-y-4">
             <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-center text-white outline-none focus:border-white/50 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-colors">
              Enter Dashboard
            </button>
          </div>
          <button type="button" onClick={onExit} className="w-full text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest">Return to Site</button>
        </form>
      </div>
    );
  }

  // --- Dashboard Layout ---
  return (
    <div className="h-screen flex bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="p-8 border-b border-white/5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Admin Panel</div>
            <div className="font-bold text-lg tracking-wider">BIGBOY CMS</div>
          </div>
          <nav className="p-4 space-y-1">
            <SidebarItem icon="fa-chart-simple" label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <div className="pt-6 pb-2 px-4 text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Content</div>
            <SidebarItem icon="fa-pen-nib" label="Branding & Hero" active={activeTab === 'branding'} onClick={() => setActiveTab('branding')} />
            <SidebarItem icon="fa-images" label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
            <SidebarItem icon="fa-tags" label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
            <SidebarItem icon="fa-address-card" label="Contact Info" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
            <div className="pt-6 pb-2 px-4 text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Advanced</div>
            <SidebarItem icon="fa-code" label="Developer (JSON)" active={activeTab === 'code'} onClick={() => setActiveTab('code')} />
          </nav>
        </div>
        <div className="p-4 border-t border-white/5">
           <button onClick={onExit} className="flex items-center gap-3 w-full px-4 py-3 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout / Exit
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar */}
        <header className="h-16 bg-black/50 backdrop-blur border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
          <div className="text-xs uppercase tracking-widest text-neutral-400">
            Editing: <span className="text-white font-bold ml-2">{activeTab.replace('_', ' ')}</span>
          </div>
          <button 
            onClick={handleSave} 
            className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-floppy-disk"></i> Save Changes
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-5xl mx-auto animate-fade">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Projects" value={localData.projects.length} icon="fa-camera" />
                <StatCard label="Active Packages" value={localData.packages.length} icon="fa-box-open" />
                <StatCard label="Language" value="NL / EN" icon="fa-globe" />
              </div>
              <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-8 text-center">
                <h3 className="text-xl font-light mb-4">Welcome back, Liam.</h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto">Select a section from the sidebar to start editing your portfolio content. Changes are applied instantly to the current session.</p>
              </div>
            </div>
          )}

          {/* BRANDING TAB */}
          {activeTab === 'branding' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade">
              <SectionHeader title="Branding" description="Global site identity and metadata" />
              <div className="grid gap-6">
                <Input label="Business Name" value={localData.branding.name} onChange={(v) => updateField('branding', 'name', v)} />
                <Input label="Site Description" value={localData.branding.description} onChange={(v) => updateField('branding', 'description', v)} textarea />
              </div>
              <div className="w-full h-[1px] bg-white/5 my-8"></div>
              <SectionHeader title="Hero Section" description="The first thing visitors see" />
              <div className="grid gap-6">
                 <div className="grid grid-cols-2 gap-6">
                    <Input label="Top Title" value={localData.hero.titleTop} onChange={(v) => updateField('hero', 'titleTop', v)} />
                    <Input label="Bottom Title" value={localData.hero.titleBottom} onChange={(v) => updateField('hero', 'titleBottom', v)} />
                 </div>
                 <Input label="Subtitle" value={localData.hero.subtitle} onChange={(v) => updateField('hero', 'subtitle', v)} textarea />
                 <Input label="Background Image URL" value={localData.hero.backgroundUrl} onChange={(v) => updateField('hero', 'backgroundUrl', v)} />
                 <div className="grid grid-cols-2 gap-6">
                    <Input label="Background Video URL (Optional)" value={localData.hero.backgroundVideoUrl || ''} onChange={(v) => updateField('hero', 'backgroundVideoUrl', v)} />
                    <Input label="Showreel URL (YouTube)" value={localData.hero.showreelVideoUrl || ''} onChange={(v) => updateField('hero', 'showreelVideoUrl', v)} />
                 </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-fade">
              <div className="flex justify-between items-end">
                <SectionHeader title="Portfolio Projects" description="Manage your case studies and gallery" />
                <button 
                  onClick={() => {
                    const newProj: Project = { id: Date.now().toString(), title: 'New Project', category: 'Cinematography', thumbnail: '', description: '', year: '2024' };
                    setLocalData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-bold uppercase tracking-widest rounded transition-colors"
                >
                  + Add Project
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localData.projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
                    <div className="relative aspect-video bg-black">
                      {proj.thumbnail ? <img src={proj.thumbnail} className="w-full h-full object-cover opacity-60" /> : <div className="flex items-center justify-center h-full text-neutral-700">No Image</div>}
                      <button 
                        onClick={() => {
                          const newProjs = localData.projects.filter(p => p.id !== proj.id);
                          setLocalData(prev => ({ ...prev, projects: newProjs }));
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <input 
                        className="w-full bg-transparent border-b border-transparent hover:border-white/20 focus:border-white outline-none font-bold text-sm uppercase tracking-wide"
                        value={proj.title}
                        onChange={(e) => {
                           const updated = [...localData.projects];
                           updated[idx].title = e.target.value;
                           setLocalData(prev => ({ ...prev, projects: updated }));
                        }}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          className="bg-black/30 border border-white/5 rounded px-2 py-1 text-[10px] uppercase text-neutral-400 outline-none"
                          value={proj.category}
                          onChange={(e) => {
                             const updated = [...localData.projects];
                             updated[idx].category = e.target.value as any;
                             setLocalData(prev => ({ ...prev, projects: updated }));
                          }}
                        >
                          <option>Cinematography</option>
                          <option>Photography</option>
                          <option>Commercial</option>
                          <option>Documentary</option>
                        </select>
                        <input 
                          className="bg-black/30 border border-white/5 rounded px-2 py-1 text-[10px] text-neutral-400 outline-none"
                          value={proj.year}
                          onChange={(e) => {
                             const updated = [...localData.projects];
                             updated[idx].year = e.target.value;
                             setLocalData(prev => ({ ...prev, projects: updated }));
                          }}
                        />
                      </div>
                      <input 
                          className="w-full bg-black/30 border border-white/5 rounded px-2 py-1 text-[10px] text-neutral-500 outline-none"
                          placeholder="Thumbnail URL"
                          value={proj.thumbnail}
                          onChange={(e) => {
                             const updated = [...localData.projects];
                             updated[idx].thumbnail = e.target.value;
                             setLocalData(prev => ({ ...prev, projects: updated }));
                          }}
                        />
                         <input 
                          className="w-full bg-black/30 border border-white/5 rounded px-2 py-1 text-[10px] text-neutral-500 outline-none"
                          placeholder="Video URL"
                          value={proj.videoUrl || ''}
                          onChange={(e) => {
                             const updated = [...localData.projects];
                             updated[idx].videoUrl = e.target.value;
                             setLocalData(prev => ({ ...prev, projects: updated }));
                          }}
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-fade">
              <SectionHeader title="Services & Pricing" description="Edit your packages and offers" />
              <div className="space-y-6">
                {localData.packages.map((pkg, idx) => (
                  <div key={pkg.id} className="bg-neutral-900 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-4 w-full">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label="Package Name" value={pkg.name} onChange={(v) => {
                            const updated = [...localData.packages];
                            updated[idx].name = v;
                            setLocalData(prev => ({...prev, packages: updated}));
                          }} />
                          <div className="flex gap-2">
                             <Input label="Price" value={pkg.price} onChange={(v) => {
                                const updated = [...localData.packages];
                                updated[idx].price = v;
                                setLocalData(prev => ({...prev, packages: updated}));
                              }} />
                              <Input label="Old Price" value={pkg.oldPrice || ''} onChange={(v) => {
                                const updated = [...localData.packages];
                                updated[idx].oldPrice = v;
                                setLocalData(prev => ({...prev, packages: updated}));
                              }} />
                          </div>
                       </div>
                       <Input label="Description" value={pkg.description} onChange={(v) => {
                            const updated = [...localData.packages];
                            updated[idx].description = v;
                            setLocalData(prev => ({...prev, packages: updated}));
                          }} textarea />
                       
                       <div>
                         <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">Features (Comma separated)</label>
                         <textarea 
                           className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-sm focus:border-white/50 outline-none transition-colors"
                           rows={2}
                           value={pkg.features.join(', ')}
                           onChange={(e) => {
                             const updated = [...localData.packages];
                             updated[idx].features = e.target.value.split(',').map(s => s.trim());
                             setLocalData(prev => ({...prev, packages: updated}));
                           }}
                         />
                       </div>
                    </div>
                    
                    <div className="w-full md:w-48 space-y-4 bg-black/20 p-4 rounded-lg">
                       <div className="flex items-center gap-3">
                         <input type="checkbox" checked={pkg.recommended} onChange={(e) => {
                            const updated = [...localData.packages];
                            updated[idx].recommended = e.target.checked;
                            setLocalData(prev => ({...prev, packages: updated}));
                         }} />
                         <span className="text-xs uppercase tracking-widest text-neutral-400">Recommended</span>
                       </div>
                       <Input label="Discount Tag" value={pkg.discountTag || ''} onChange={(v) => {
                            const updated = [...localData.packages];
                            updated[idx].discountTag = v;
                            setLocalData(prev => ({...prev, packages: updated}));
                       }} />
                       <div className="text-[10px] text-neutral-600 uppercase tracking-widest">ID: {pkg.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
             <div className="max-w-4xl mx-auto space-y-8 animate-fade">
               <SectionHeader title="Contact Settings" description="Where should inquiries go?" />
               <div className="grid gap-6">
                 <Input label="Primary Email" value={localData.contact.email} onChange={(v) => updateField('contact', 'email', v)} />
                 <Input label="Location String" value={localData.contact.location} onChange={(v) => updateField('contact', 'location', v)} />
                 <div className="w-full h-[1px] bg-white/5 my-4"></div>
                 <h4 className="text-xs font-bold uppercase tracking-widest">Form Placeholders</h4>
                 <div className="grid grid-cols-2 gap-6">
                   <Input label="Name Placeholder" value={localData.contact.placeholders.name} onChange={(v) => setLocalData(prev => ({...prev, contact: {...prev.contact, placeholders: {...prev.contact.placeholders, name: v}}}))} />
                   <Input label="Email Placeholder" value={localData.contact.placeholders.email} onChange={(v) => setLocalData(prev => ({...prev, contact: {...prev.contact, placeholders: {...prev.contact.placeholders, email: v}}}))} />
                   <Input label="Success Title" value={localData.contact.placeholders.successTitle} onChange={(v) => setLocalData(prev => ({...prev, contact: {...prev.contact, placeholders: {...prev.contact.placeholders, successTitle: v}}}))} />
                 </div>
               </div>
             </div>
          )}

          {/* CODE TAB */}
          {activeTab === 'code' && (
            <div className="h-full flex flex-col space-y-4 animate-fade">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold font-mono">raw_data.json</h3>
                    <p className="text-xs text-neutral-500 font-mono mt-1">Directly edit the site state. Invalid JSON will prevent saving.</p>
                 </div>
              </div>
              {jsonError && (
                <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 rounded text-xs font-mono">
                  Error: {jsonError}
                </div>
              )}
              <textarea 
                className="flex-1 w-full bg-[#111] border border-white/10 rounded-lg p-6 font-mono text-sm text-green-400 focus:outline-none focus:border-white/30 resize-none leading-relaxed"
                value={jsonString}
                onChange={(e) => {
                   setJsonString(e.target.value);
                   setJsonError(null);
                }}
                spellCheck={false}
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const SidebarItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-medium transition-all duration-200 ${active ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
  >
    <div className="w-5 text-center"><i className={`fa-solid ${icon}`}></i></div>
    {label}
  </button>
);

const StatCard: React.FC<{ label: string; value: string | number; icon: string }> = ({ label, value, icon }) => (
  <div className="bg-neutral-900 border border-white/5 p-6 rounded-xl flex items-center justify-between">
    <div>
      <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50">
      <i className={`fa-solid ${icon}`}></i>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-light mb-1">{title}</h2>
    <p className="text-sm text-neutral-500">{description}</p>
  </div>
);

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; textarea?: boolean }> = ({ label, value, onChange, textarea }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">{label}</label>
    {textarea ? (
      <textarea 
        className="w-full bg-black border border-neutral-800 rounded-lg p-4 text-sm focus:border-white/50 outline-none transition-colors resize-none"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input 
        className="w-full bg-black border border-neutral-800 rounded-lg p-4 text-sm focus:border-white/50 outline-none transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);