
import React, { useState, useCallback } from 'react';
import { SiteData } from '../types';
import { AdminInput, SectionHeader, Button } from './Shared';
import { cn } from '../utils';

interface AdminDashboardProps {
  data: SiteData;
  onSave: (data: SiteData) => void;
  onExit: () => void;
}

type Tab = 'overview' | 'branding' | 'portfolio' | 'services';

const SidebarItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500",
      active ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-white/40 hover:text-white hover:bg-white/5'
    )}
  >
    <i className={cn("fa-solid w-6 text-center", icon)}></i>
    {label}
  </button>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onSave, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localData, setLocalData] = useState<SiteData>(() => structuredClone(data));
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bigboyadmin') setIsAuthenticated(true);
  };

  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    onSave(localData);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, [localData, onSave]);

  const updateField = <T extends keyof SiteData>(section: T, key: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [key]: value }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black p-6">
        <form onSubmit={handleLogin} className="max-w-sm w-full bg-neutral-900 border border-white/10 p-10 rounded-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-[0.3em] uppercase mb-2">CMS ACCESS</h1>
            <p className="text-[9px] text-white/30 uppercase tracking-widest">Secure Environment</p>
          </div>
          <input type="password" placeholder="Admin Password" className="w-full bg-black border border-white/10 rounded-lg p-4 text-center text-white" value={password} onChange={e => setPassword(e.target.value)} />
          <Button className="w-full" type="submit">Unlock</Button>
          <button type="button" onClick={onExit} className="w-full text-[9px] text-neutral-600 hover:text-white uppercase tracking-widest mt-4">Return Home</button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#050505] text-white overflow-hidden">
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col justify-between z-20">
        <div>
          <div className="p-8 border-b border-white/5 font-bold text-xs tracking-[0.4em] uppercase">BigBoy CMS</div>
          <nav className="p-4 space-y-2">
            <SidebarItem icon="fa-chart-pie" label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon="fa-palette" label="Branding" active={activeTab === 'branding'} onClick={() => setActiveTab('branding')} />
            <SidebarItem icon="fa-camera-retro" label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
            <SidebarItem icon="fa-list-check" label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          </nav>
        </div>
        <div className="p-4 border-t border-white/5">
           <button onClick={onExit} className="flex items-center gap-3 w-full px-4 py-3 text-[9px] text-white/30 hover:text-white uppercase tracking-widest font-bold">
             <i className="fa-solid fa-power-off"></i> Exit Admin
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#080808]">
        <header className="h-20 bg-black/80 border-b border-white/5 flex items-center justify-between px-10">
          <span className="text-xs font-bold uppercase tracking-widest">{activeTab}</span>
          <Button onClick={handleSave} disabled={saveStatus === 'saving'} className="py-3">
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Changes Applied' : 'Commit Changes'}
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 lg:p-16 custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-fade max-w-5xl">
              <SectionHeader title="Dashboard" subtitle="Direct access to live site configurations." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-12 border border-white/5 bg-neutral-900/20 rounded-2xl">
                   <div className="text-5xl font-bold mb-2">{localData.projects.length}</div>
                   <div className="text-[9px] uppercase tracking-widest text-white/20">Production Entries</div>
                 </div>
                 <div className="p-12 border border-white/5 bg-neutral-900/20 rounded-2xl">
                   <div className="text-5xl font-bold mb-2">{localData.packages.length}</div>
                   <div className="text-[9px] uppercase tracking-widest text-white/20">Service Modules</div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="max-w-4xl space-y-12 animate-fade">
              <SectionHeader title="Branding" subtitle="Global visual and SEO identity." />
              <AdminInput label="Business Name" value={localData.branding.name} onChange={v => updateField('branding', 'name', v)} />
              <AdminInput label="Meta Description" value={localData.branding.description} onChange={v => updateField('branding', 'description', v)} textarea />
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-10 animate-fade">
              <div className="flex justify-between items-center border-b border-white/5 pb-10">
                <SectionHeader title="Portfolio" subtitle="Motion and still capture repository." />
                <Button onClick={() => setLocalData(prev => ({ ...prev, projects: [{ id: `p-${Date.now()}`, title: 'Draft Project', category: 'Cinematography', thumbnail: '', description: '', year: '2025' }, ...prev.projects]}))}>New Entry</Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {localData.projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 space-y-6">
                    <AdminInput label="Production Title" value={proj.title} onChange={v => { const p = [...localData.projects]; p[idx].title = v; setLocalData({...localData, projects: p}); }} compact />
                    <AdminInput label="Image Endpoint" value={proj.thumbnail} onChange={v => { const p = [...localData.projects]; p[idx].thumbnail = v; setLocalData({...localData, projects: p}); }} compact />
                    <button onClick={() => setLocalData({...localData, projects: localData.projects.filter(p => p.id !== proj.id)})} className="text-red-500/30 hover:text-red-500 text-[8px] uppercase font-bold tracking-[0.2em] transition-colors">Discard</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
