import { SiteData, Language } from './types';

export const TRANSLATIONS: Record<Language, SiteData> = {
  nl: {
    branding: {
      name: "BIGBOY PRODUCTIONS",
      description: "Visual storytelling door Liam van Woudenberg. Utrecht & Randstad."
    },
    hero: {
      titleTop: "BIGBOY",
      titleBottom: "PRODUCTIONS",
      subtitle: "Jouw merk verdient cinematische beelden. Wij realiseren high-end video en fotografie die impact maakt. Van concept tot eindproduct.",
      backgroundUrl: "https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/portrait/DSC09186.jpg",
      showreelVideoUrl: "https://youtu.be/fmchWI8hVSA"
    },
    contact: {
      email: "liamvwoudenberg@gmail.com",
      location: "Utrecht / Randstad",
      placeholders: {
        name: "Je Naam",
        email: "E-mailadres",
        dates: "Gewenste Datum / Periode",
        message: "Vertel kort over je project of idee...",
        submit: "Verstuur Aanvraag",
        successTitle: "Aanvraag Ontvangen!",
        successSubtitle: "Bedankt. Ik heb je bericht in goede orde ontvangen en neem binnen 24 uur contact met je op."
      }
    },
    ui: {
      work: "Werk",
      services: "Diensten",
      contact: "Contact",
      explore: "Bekijk Portfolio",
      showreel: "Showreel",
      back: "Terug",
      inquire: "Offerte Aanvragen",
      allProductions: "Alle Projecten",
      rates: "Tarieven",
      customProposal: "Maatwerk Nodig?"
    },
    projects: [
      { id: 'vid-1', title: 'When the World Sleeps', category: 'Cinematography', thumbnail: 'https://img.youtube.com/vi/fmchWI8hVSA/maxresdefault.jpg', description: 'Visuele verkenning van de nacht.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=fmchWI8hVSA' },
      { id: 'vid-3', title: 'Inrichting op Maat', category: 'Commercial', thumbnail: 'https://img.youtube.com/vi/c_vPvZcodhY/maxresdefault.jpg', description: 'Strakke promo voor high-end interieur.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=c_vPvZcodhY' },
      { id: 'vid-2', title: 'Family Christmas', category: 'Documentary', thumbnail: 'https://img.youtube.com/vi/txDD8UdMlJM/maxresdefault.jpg', description: 'Emotionele en intieme storytelling.', year: '2023', videoUrl: 'https://www.youtube.com/watch?v=txDD8UdMlJM' },
      { id: 'vid-4', title: 'Jean-Pierre: The Artist', category: 'Cinematography', thumbnail: 'https://img.youtube.com/vi/crk9L3lpGoI/maxresdefault.jpg', description: 'Artistiek portret in motion.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=crk9L3lpGoI' }
    ],
    packages: [
      // Photography (Low -> High)
      { 
        id: 'p0', 
        name: 'The Headshot', 
        category: 'Photography', 
        price: '€225', 
        description: 'De essentie. Kort en krachtig voor je profielfoto.', 
        features: ['30 Min Sessie', '3 High-End Edits', 'Studio Setting', 'Directe Selectie'] 
      },
      { 
        id: 'p1', 
        name: 'Personal Brand', 
        category: 'Photography', 
        price: '€350', 
        description: 'Professionele portretten voor LinkedIn & Website.', 
        features: ['1 Uur Studio/Locatie', '10 High-End Edits', 'Online Galerij', 'Zakelijk & Social'] 
      },
      { 
        id: 'p2', 
        name: 'Event Report', 
        category: 'Photography', 
        price: '€950', 
        oldPrice: '€1.150', 
        discountTag: 'MEEST GEKOZEN', 
        description: 'Complete verslaglegging van jouw event of lancering.', 
        features: ['4 Uur Fotografie', '100+ Nabewerkte Foto’s', 'Sfeer & Highlights', 'Binnen 3 Dagen Geleverd'], 
        recommended: true 
      },
      { 
        id: 'p3', 
        name: 'Full Campaign', 
        category: 'Photography', 
        price: '€2.250', 
        description: 'High-end beelden voor advertenties en lookbooks.', 
        features: ['Volledige Productiedag', 'Art Direction', 'Commerciële Licentie', 'High-End Retouching'] 
      },

      // Videography (Low -> High)
      { 
        id: 'v0', 
        name: 'The Teaser', 
        category: 'Videography', 
        price: '€495', 
        description: 'Korte, krachtige teaser om de aandacht te grijpen.', 
        features: ['15-20s Highlight Edit', '1 Uur Opname', 'Geen Audio/Spraak', 'Perfect voor Ads'] 
      },
      { 
        id: 'v1', 
        name: 'Social Content', 
        category: 'Videography', 
        price: '€750', 
        description: 'Snelle, engaging content voor TikTok & Reels.', 
        features: ['3x Vertical Video (9:16)', 'Dynamische Edit', 'Trending Audio', '2 Revisierondes'] 
      },
      { 
        id: 'v2', 
        name: 'Event Film', 
        category: 'Videography', 
        price: '€1.450', 
        oldPrice: '€1.650', 
        discountTag: 'POPULAR', 
        description: 'De energie van jouw event in een cinematische edit.', 
        features: ['Halve Dag Filmen', 'Cinematische Edit (90s)', 'Licentie Muziek', 'Color Grading'], 
        recommended: true 
      },
      { 
        id: 'v3', 
        name: 'Brand Movie', 
        category: 'Videography', 
        price: '€3.450', 
        description: 'Een premium film die jouw merkverhaal vertelt.', 
        features: ['Concept & Script', 'Volledige Crew', 'Voice-over & Sound', '4K Cinema Kwaliteit'] 
      },

      // Combo (Low -> High)
      { 
        id: 'c0', 
        name: 'The Quickfire', 
        category: 'Combo', 
        price: '€850', 
        description: 'Instap content pack. Snel resultaat.', 
        features: ['1 Reel / Short', '5 Portrait Photos', '1 Hour Shoot', 'Efficient & Fast'] 
      },
      { 
        id: 'c1', 
        name: 'Social Kickstart', 
        category: 'Combo', 
        price: '€1.050', 
        description: 'Boost je online aanwezigheid in één keer.', 
        features: ['3x Reels Video', '10x Portrait Photos', 'Halve Dag Opname', 'Social Ready'] 
      },
      { 
        id: 'c2', 
        name: 'Event All-In', 
        category: 'Combo', 
        price: '€1.950', 
        oldPrice: '€2.400', 
        discountTag: '-20% DEAL', 
        description: 'Foto én video van jouw evenement.', 
        features: ['1 Videograaf + 1 Fotograaf', 'Aftermovie + 75 Foto’s', 'Volledige Dekking', 'Efficiënte Workflow'], 
        recommended: true 
      },
      { 
        id: 'c3', 
        name: 'Brand Launch', 
        category: 'Combo', 
        price: '€4.950', 
        description: 'Alles wat je nodig hebt voor een nieuwe start.', 
        features: ['Brand Movie', '5 Social Shorts', '30 Campaign Foto’s', 'Strategie Sessie'] 
      }
    ]
  },
  en: {
    branding: {
      name: "BIGBOY PRODUCTIONS",
      description: "Visual storytelling by Liam van Woudenberg. Utrecht & Netherlands."
    },
    hero: {
      titleTop: "BIGBOY",
      titleBottom: "PRODUCTIONS",
      subtitle: "Your brand deserves cinematic visuals. We create high-end video and photography that drives impact. From concept to final cut.",
      backgroundUrl: "https://raw.githubusercontent.com/liamvwoudenberg-lang/portfolio/main/portrait/DSC09186.jpg",
      showreelVideoUrl: "https://youtu.be/fmchWI8hVSA"
    },
    contact: {
      email: "liamvwoudenberg@gmail.com",
      location: "Utrecht / NL",
      placeholders: {
        name: "Your Name",
        email: "Email Address",
        dates: "Preferred Dates",
        message: "Tell me about your project...",
        submit: "Send Inquiry",
        successTitle: "Inquiry Received",
        successSubtitle: "Thanks. I've received your details and will get back to you within 24 hours."
      }
    },
    ui: {
      work: "Work",
      services: "Services",
      contact: "Contact",
      explore: "View Portfolio",
      showreel: "Showreel",
      back: "Back",
      inquire: "Request Quote",
      allProductions: "All Projects",
      rates: "Rates",
      customProposal: "Need Custom Work?"
    },
    projects: [
      { id: 'vid-1', title: 'When the World Sleeps', category: 'Cinematography', thumbnail: 'https://img.youtube.com/vi/fmchWI8hVSA/maxresdefault.jpg', description: 'Visual exploration of the night.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=fmchWI8hVSA' },
      { id: 'vid-3', title: 'Custom Fitting', category: 'Commercial', thumbnail: 'https://img.youtube.com/vi/c_vPvZcodhY/maxresdefault.jpg', description: 'Sleek promo for interior design.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=c_vPvZcodhY' },
      { id: 'vid-2', title: 'Family Christmas', category: 'Documentary', thumbnail: 'https://img.youtube.com/vi/txDD8UdMlJM/maxresdefault.jpg', description: 'Intimate family storytelling.', year: '2023', videoUrl: 'https://www.youtube.com/watch?v=txDD8UdMlJM' },
      { id: 'vid-4', title: 'Jean-Pierre: The Artist', category: 'Cinematography', thumbnail: 'https://img.youtube.com/vi/crk9L3lpGoI/maxresdefault.jpg', description: 'Artistic portrait in motion.', year: '2024', videoUrl: 'https://www.youtube.com/watch?v=crk9L3lpGoI' }
    ],
    packages: [
      { id: 'p0', name: 'The Headshot', category: 'Photography', price: '€225', description: 'The essentials. Short and powerful for profiles.', features: ['30 Min Session', '3 Pro Retouches', 'Studio Setting', 'Direct Selection'] },
      { id: 'p1', name: 'Personal Brand', category: 'Photography', price: '€350', description: 'Professional headshots & personal branding.', features: ['1 Hour Session', '10 Pro Retouches', 'Studio or Location', 'Online Gallery'] },
      { id: 'p2', name: 'Event Report', category: 'Photography', price: '€950', oldPrice: '€1.150', discountTag: 'POPULAR', description: 'Complete coverage of your event.', features: ['4 Hours Coverage', '100+ Edited Photos', 'Fast Delivery', 'High Resolution'], recommended: true },
      { id: 'p3', name: 'Full Campaign', category: 'Photography', price: '€2.250', description: 'High-end advertising & editorial photography.', features: ['Full Day Production', 'Art Direction', 'Commercial License', 'High-End Retouching'] },
      
      { id: 'v0', name: 'The Teaser', category: 'Videography', price: '€495', description: 'Short, punchy teaser to grab attention.', features: ['15-20s Highlight Edit', '1 Hour Shoot', 'No Voice/Audio', 'Perfect for Ads'] },
      { id: 'v1', name: 'Social Content', category: 'Videography', price: '€750', description: 'Fast, engaging content for TikTok & Reels.', features: ['3x Vertical Video (9:16)', 'Dynamic Editing', 'Trending Audio', '2 Revision Rounds'] },
      { id: 'v2', name: 'Event Film', category: 'Videography', price: '€1.450', oldPrice: '€1.650', discountTag: 'POPULAR', description: 'Capture the energy of your event.', features: ['Half Day Filming', 'Cinematic Edit (90s)', 'Music License', 'Color Grading'], recommended: true },
      { id: 'v3', name: 'Brand Movie', category: 'Videography', price: '€3.450', description: 'A premium film that defines your brand.', features: ['Concept & Script', 'Full Crew', 'Voice-over & Sound', '4K Cinema Quality'] },
      
      { id: 'c0', name: 'The Quickfire', category: 'Combo', price: '€850', description: 'Entry-level content pack. Fast results.', features: ['1 Reel / Short', '5 Portrait Photos', '1 Hour Shoot', 'Efficient & Fast'] },
      { id: 'c1', name: 'Social Kickstart', category: 'Combo', price: '€1.050', description: 'Boost your online presence at once.', features: ['3x Reels Video', '10x Portrait Photos', 'Half Day Shoot', 'Social Ready'] },
      { id: 'c2', name: 'Event All-In', category: 'Combo', price: '€1.950', oldPrice: '€2.400', discountTag: '-20% DEAL', description: 'Photo & Video of your event.', features: ['1 Videographer + 1 Photographer', 'Aftermovie + 75 Photos', 'Full Coverage', 'Efficient Workflow'], recommended: true },
      { id: 'c3', name: 'Brand Launch', category: 'Combo', price: '€4.950', description: 'Everything you need for a new start.', features: ['Brand Movie', '5 Social Shorts', '30 Campaign Photos', 'Strategy Session'] }
    ]
  }
};

export const DEFAULT_DATA = TRANSLATIONS.nl;