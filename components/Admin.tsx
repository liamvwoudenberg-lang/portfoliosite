
import React, { useState } from 'react';
import { SiteData, Project, Package } from '../types';

interface AdminDashboardProps {
  data: SiteData;
  onSave: (data: SiteData) => void;
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onSave, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localData, setLocalData] = useState<SiteData>(data);
  const [activeTab, setActiveTab] = useState<'General' | 'Portfolio' | 'Services' | 'Contact'>('General');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bigboyadmin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    onSave(localData);
    alert('Changes saved successfully!');
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setLocalData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Photography',
      thumbnail: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?auto=format&fit=crop&q=80&w=800',
      description: 'Project description',
      year: new Date().getFullYear().toString()
    };
    setLocalData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const deleteProject = (id: string) => {
    setLocalData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950 p-6">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-neutral-900 p-12 border border-white/5 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-widest uppercase">Admin Login</h1>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">BigBoy Productions Backend</p>
          </div>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="w-full bg-black border border-neutral-800 p-4 outline-none focus:border-white transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs">Access Dashboard</button>
          <button type="button" onClick={onExit} className="w-full text-xs text-neutral-600 hover:text-white uppercase tracking-widest">Back to Site</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Header */}
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold tracking-[0.3em] uppercase">BigBoy Admin</h1>
          <nav className="flex gap-8 ml-12">
            {(['General', 'Portfolio', 'Services', 'Contact'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase tracking-widest font-bold pb-2 transition-all ${activeTab === tab ? 'border-b-2 border-white text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex gap-4">
          <button onClick={handleSave} className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200">Save Changes</button>
          <button onClick={onExit} className="px-8 py-3 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5">Exit</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto max-w-6xl mx-auto w-full">
        {activeTab === 'General' && (
          <div className="space-y-12 animate-fade">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Business Name</label>
                <input 
                  value={localData.branding.name} 
                  onChange={(e) => setLocalData({...localData, branding: {...localData.branding, name: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Hero Title Top</label>
                <input 
                  value={localData.hero.titleTop} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, titleTop: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Hero Title Bottom</label>
                <input 
                  value={localData.hero.titleBottom} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, titleBottom: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Hero Subtitle</label>
                <textarea 
                  rows={3}
                  value={localData.hero.subtitle} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, subtitle: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white resize-none"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Hero Background URL (Image Fallback)</label>
                <input 
                  value={localData.hero.backgroundUrl} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, backgroundUrl: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Hero Background Video URL (e.g., content/video/hero-bg.mp4)</label>
                <input 
                  value={localData.hero.backgroundVideoUrl || ''} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, backgroundVideoUrl: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Showreel Video URL (e.g., content/video/showreel.mp4)</label>
                <input 
                  value={localData.hero.showreelVideoUrl || ''} 
                  onChange={(e) => setLocalData({...localData, hero: {...localData.hero, showreelVideoUrl: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Portfolio' && (
          <div className="space-y-12 animate-fade">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-widest">Project Archive</h2>
              <button onClick={addProject} className="px-6 py-2 border border-white/10 text-[9px] uppercase tracking-widest hover:bg-white/5">+ Add New Project</button>
            </div>
            <div className="space-y-8">
              {localData.projects.map(project => (
                <div key={project.id} className="bg-neutral-900 p-8 border border-white/5 flex gap-8">
                  <div className="w-48 h-32 flex-shrink-0 bg-black">
                    <img src={project.thumbnail} className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Title"
                      value={project.title} 
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      className="bg-black border border-neutral-800 p-2 text-xs"
                    />
                    <select 
                      value={project.category} 
                      onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                      className="bg-black border border-neutral-800 p-2 text-xs"
                    >
                      <option>Photography</option>
                      <option>Cinematography</option>
                      <option>Commercial</option>
                      <option>Documentary</option>
                    </select>
                    <input 
                      placeholder="Thumbnail URL"
                      value={project.thumbnail} 
                      onChange={(e) => updateProject(project.id, 'thumbnail', e.target.value)}
                      className="bg-black border border-neutral-800 p-2 text-xs col-span-2"
                    />
                    <input 
                      placeholder="Video URL (Optional)"
                      value={project.videoUrl || ''} 
                      onChange={(e) => updateProject(project.id, 'videoUrl', e.target.value)}
                      className="bg-black border border-neutral-800 p-2 text-xs col-span-2"
                    />
                    <textarea 
                      placeholder="Description"
                      value={project.description} 
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      className="bg-black border border-neutral-800 p-2 text-xs col-span-2 h-16 resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => deleteProject(project.id)} className="p-4 bg-red-900/20 text-red-500 hover:bg-red-900/40 text-xs">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Services' && (
          <div className="space-y-12 animate-fade">
            {localData.packages.map((pkg, idx) => (
              <div key={pkg.id} className="bg-neutral-900 p-8 border border-white/5 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Package Name</label>
                    <input 
                      value={pkg.name} 
                      onChange={(e) => {
                        const newPacks = [...localData.packages];
                        newPacks[idx].name = e.target.value;
                        setLocalData({...localData, packages: newPacks});
                      }}
                      className="w-full bg-black border border-neutral-800 p-4 text-xs"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Price</label>
                    <input 
                      value={pkg.price} 
                      onChange={(e) => {
                        const newPacks = [...localData.packages];
                        newPacks[idx].price = e.target.value;
                        setLocalData({...localData, packages: newPacks});
                      }}
                      className="w-full bg-black border border-neutral-800 p-4 text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500">Description</label>
                  <textarea 
                    value={pkg.description} 
                    onChange={(e) => {
                      const newPacks = [...localData.packages];
                      newPacks[idx].description = e.target.value;
                      setLocalData({...localData, packages: newPacks});
                    }}
                    className="w-full bg-black border border-neutral-800 p-4 text-xs resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Contact' && (
          <div className="space-y-12 animate-fade">
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Public Email</label>
                <input 
                  value={localData.contact.email} 
                  onChange={(e) => setLocalData({...localData, contact: {...localData.contact, email: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">Location Base</label>
                <input 
                  value={localData.contact.location} 
                  onChange={(e) => setLocalData({...localData, contact: {...localData.contact, location: e.target.value}})}
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 outline-none focus:border-white"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
