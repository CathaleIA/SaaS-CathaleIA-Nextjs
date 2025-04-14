// context/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir el tipo para el contexto
type LanguageContextType = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
};

// Crear el contexto con un valor predeterminado
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
});

// Proveedor del contexto
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en'); // Idioma predeterminado

  // Cargar el idioma guardado en localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Cambiar el idioma
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => useContext(LanguageContext);