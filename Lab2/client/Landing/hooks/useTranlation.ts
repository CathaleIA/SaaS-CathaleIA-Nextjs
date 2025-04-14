// hooks/useTranslation.ts
'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Description } from '@radix-ui/react-dialog';

// Definir el tipo para las traducciones
type Translations = {
  header: {
    title: string;
    nav: { id: string; title: string }[];
    buttons: {
      login: string;
      signup: string;
    };
  };
  hero: {
    title: string;
    description: string;
    buttons: {
      getStarted: string;
      demo: string;
    };
  };
  features: {
    head: String,
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  dashboard: {
    head: String,
    title: string;
    description: string;
    tabs: { 
      title: string; 
      value: string;
      title2: string;
      description: string;
      keys: string[];
    }[];
    demo: {
      watch: string;
      try: string;
    };
  };
  integrations: {
    head: String,
    title: string;
    description: string;
    api: {
      title: string;
      description: string;
      features: string[];
    };
    process: {
      title: string;
      steps: { title: string; description: string }[];
    };
  };
  security: {
    head: String,
    title: string;
    description: string;
    features: { title: string; description: string }[];
    oursecurity: {
      title: String;
      description: String;
      listsecurity: String[];
    };
    finaltext: String;
  };
  testimonials: {
    head: String,
    title: string;
    description: string;
    items: { quote: string; author: string; role: string }[];
  };
  pricing: {
    head: String,
    title: string;
    description: string;
    topics: String[];
    add: String;
    button: String;
    plans: {
      name: string;
      monthlyPrice: number;
      description: string;
      features: string[];
      popular: boolean;
    }[];
  };
  cta: {
    title: String,
    description: String,
    button: String[],
  },
  footer: {
    copyright: string;
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({
    header: {
      title: '',
      nav: [],
      buttons: {
        login: '',
        signup: '',
      },
    },
    hero: {
      title: '',
      description: '',
      buttons: {
        getStarted: '',
        demo: '',
      },
    },
    features: {
      head: '',
      title: '',
      description: '',
      items: [],
    },
    dashboard: {
      head: '',
      title: '',
      description: '',
      tabs: [],
      demo: {
        watch: '',
        try: '',
      },
    },
    integrations: {
      head: '',
      title: '',
      description: '',
      api: {
        title: '',
        description: '',
        features: [],
      },
      process: {
        title: '',
        steps: [],
      },
    },
    security: {
      head: '',
      title: '',
      description: '',
      features: [],
      oursecurity: {
        title: '',
        description: '',
        listsecurity: [],
      },
      finaltext: '',
    },
    testimonials: {
      head: '',
      title: '',
      description: '',
      items: [],
    },
    pricing: {
      head: '',
      title: '',
      description: '',
      topics: [],
      add: '',
      button: '',
      plans: [],
    },
    cta: {
      title: '',
      description: '',
      button: [],
    },
    footer: {
      copyright: '',
      social: {
        twitter: '',
        linkedin: '',
        github: '',
      },
    },
  });

  // Cargar las traducciones según el idioma
  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await import(`@/../locales/${language}.json`);
      setTranslations(translations.default);
    };
    loadTranslations();
  }, [language]);

  return translations;
};