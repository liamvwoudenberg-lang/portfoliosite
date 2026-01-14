export type Language = 'en' | 'nl';

export interface Project {
  id: string;
  title: string;
  category: 'Photography' | 'Cinematography' | 'Commercial' | 'Documentary';
  folder?: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  year: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  discountTag?: string;
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
    placeholders: {
      name: string;
      email: string;
      dates: string;
      message: string;
      submit: string;
      successTitle: string;
      successSubtitle: string;
    };
  };
  projects: Project[];
  packages: Package[];
  ui: {
    work: string;
    services: string;
    contact: string;
    explore: string;
    showreel: string;
    back: string;
    inquire: string;
    allProductions: string;
    rates: string;
    customProposal: string;
  };
}

export enum ViewMode {
  Home = 'home',
  WorkIndex = 'work_index',
  WorkPhotography = 'work_photo',
  WorkGallery = 'work_gallery',
  Services = 'services',
  Contact = 'contact',
  Admin = 'admin'
}