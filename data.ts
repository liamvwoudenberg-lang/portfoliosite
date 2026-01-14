
import { SiteData } from './types';

export const DEFAULT_DATA: SiteData = {
  branding: {
    name: "BIGBOY PRODUCTIONS",
    description: "Founded by Liam van Woudenberg. An independent creative studio based in Utrecht, serving clients across the Randstad (Amsterdam, Rotterdam, The Hague) with high-fidelity visuals."
  },
  hero: {
    titleTop: "BIGBOY",
    titleBottom: "PRODUCTIONS",
    subtitle: "Independent Director of Photography & Photographer. Crafting high-end visual narratives for brands in the Randstad and beyond.",
    backgroundUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1920",
    backgroundVideoUrl: "content/video/hero-bg.mp4",
    showreelVideoUrl: "https://youtu.be/fmchWI8hVSA"
  },
  contact: {
    email: "liamvwoudenberg@gmail.com",
    location: "Utrecht / Randstad, NL"
  },
  projects: [
    // CINEMATOGRAPHY (YouTube Integrated)
    { 
      id: 'vid-1', 
      title: 'When the World Sleeps', 
      category: 'Cinematography', 
      thumbnail: 'https://img.youtube.com/vi/fmchWI8hVSA/maxresdefault.jpg', 
      description: 'A technical and artistic showcase of low-light cinematography. This piece captures the serene nocturnal atmosphere of the city, utilizing high-sensitivity sensors to reveal the beauty of the world when most are asleep.', 
      year: '2024', 
      videoUrl: 'https://youtu.be/fmchWI8hVSA' 
    },
    { 
      id: 'vid-2', 
      title: 'Family Christmas', 
      category: 'Documentary', 
      thumbnail: 'https://img.youtube.com/vi/txDD8UdMlJM/maxresdefault.jpg', 
      description: 'A heartwarming documentary capturing the intimate moments of a family gathering. This piece focuses on raw emotion, candid interactions, and the warmth of the holiday season, demonstrating the ability to preserve fleeting memories into a cinematic legacy.', 
      year: '2023', 
      videoUrl: 'https://youtu.be/txDD8UdMlJM' 
    },
    { 
      id: 'vid-3', 
      title: 'Inrichting op Maat', 
      category: 'Commercial', 
      thumbnail: 'https://img.youtube.com/vi/c_vPvZcodhY/maxresdefault.jpg', 
      description: 'Commercial brand film for high-end interior design. Focuses on texture, material details, and craftsmanship to showcase custom furniture solutions in a visually compelling way.', 
      year: '2024', 
      videoUrl: 'https://youtu.be/c_vPvZcodhY' 
    },
    { 
      id: 'vid-4', 
      title: 'Jean-Pierre: The Artist', 
      category: 'Cinematography', 
      thumbnail: 'https://img.youtube.com/vi/crk9L3lpGoI/maxresdefault.jpg', 
      description: 'A narrative-driven short film blending humor with cinematic aesthetics. This character study explores creativity and ambition through a quirky lens, demonstrating versatility in directing and storytelling.', 
      year: '2024', 
      videoUrl: 'https://youtube.com/shorts/crk9L3lpGoI?feature=share' 
    },
    
    // PHOTOGRAPHY
    { 
      id: 'photo-1', 
      title: 'Dom Tower Portrait', 
      category: 'Photography', 
      thumbnail: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?auto=format&fit=crop&q=80&w=800&h=1200', 
      description: 'Architectural study in the heart of Utrecht.', 
      year: '2023' 
    },
    { 
      id: 'photo-2', 
      title: 'Studio Minimal', 
      category: 'Photography', 
      thumbnail: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800&h=800', 
      description: 'High-contrast studio lighting techniques.', 
      year: '2023' 
    },
    { 
      id: 'photo-3', 
      title: 'Neon Nights', 
      category: 'Photography', 
      thumbnail: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800', 
      description: 'Low light event photography capturing the atmosphere.', 
      year: '2024' 
    },
    { 
      id: 'photo-4', 
      title: 'Corporate Headshots', 
      category: 'Photography', 
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', 
      description: 'Clean, professional branding imagery for LinkedIn.', 
      year: '2024' 
    },
     { 
      id: 'photo-5', 
      title: 'Product Detail', 
      category: 'Photography', 
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', 
      description: 'Macro photography for e-commerce.', 
      year: '2023' 
    }
  ],
  packages: [
    // PHOTOGRAPHY
    {
      id: 'photo-portrait',
      name: 'Essential Portrait',
      category: 'Photography',
      price: '€350',
      description: 'Sharp, professional headshots and lifestyle portraits on location. Ideal for LinkedIn, About pages, and artist profiles.',
      features: ['2 Hour Session', 'Natural Light or Flash', '15 Retouched Images', 'Utrecht Location']
    },
    {
      id: 'photo-event',
      name: 'Event Coverage',
      category: 'Photography',
      price: '€750',
      description: 'Documentary-style coverage for corporate events, launches, or parties. We capture the atmosphere, not just the attendees.',
      features: ['Half Day (4 Hours)', '50+ Edited High-Res Images', 'Fast 48h Delivery', 'Online Gallery']
    },
    
    // VIDEOGRAPHY
    {
      id: 'video-social',
      name: 'Social Reels',
      category: 'Videography',
      price: '€595',
      description: 'Vertical video content designed to stop the scroll. Perfect for Instagram Reels and TikTok campaigns.',
      features: ['Half Day Shoot', '3x Edited Reels (9:16)', 'Cinema Rig + Color Grade', 'Royalty-Free Music']
    },
    {
      id: 'video-brand',
      name: "Brand Film",
      category: 'Videography',
      price: '€1.495',
      description: 'A cinematic 60-90s film that tells your brand story. High production value with professional lighting and audio.',
      features: ['Full Day Production', 'Approx 60-90 Seconds', 'Pro Cinema Rig + Lighting', 'Pro Audio & Sound Mix', 'Advanced Color Grading'],
      recommended: true
    },

    // COMBO
    {
      id: 'combo-creator',
      name: 'The Full Stack',
      category: 'Combo',
      price: '€1.895',
      description: 'The ultimate content refresh. I switch between photo and video throughout the day to build a complete library for your website and socials.',
      features: ['Full Day Hybrid Shoot', '1x Brand Film (No Pro Audio)', '30+ Pro Photos', '3x Social Snippets', 'Color Grading Included']
    }
  ]
};
