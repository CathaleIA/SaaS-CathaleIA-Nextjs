// components/LanguageSwitcher.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { FaGlobe } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground relative z-50"
      >
        <FaGlobe className="w-4 h-4" />
        <span>{languages[language]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-background border border-input z-50">
          <div className="py-1">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                  language === code ? 'bg-accent/50' : ''
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}