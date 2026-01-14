
export interface Project {
  id: string;
  title: string;
  category: 'Photography' | 'Cinematography' | 'Commercial' | 'Documentary';
  thumbnail: string;
  videoUrl?: string;
  description: string;
  year: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  category: 'Photography' | 'Videography' | 'Combo';
}

export interface SiteData {
  branding: {
    name: string;
    description: string;
  };
  hero: {
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    backgroundUrl: string;
    backgroundVideoUrl?: string;
    showreelVideoUrl?: string;
  };
  contact: {
    email: string;
    location: string;
  };
  projects: Project[];
  packages: Package[];
}

export enum ViewMode {
  Home = 'home',
  Work = 'work',
  Services = 'services',
  Contact = 'contact',
  Admin = 'admin'
}
