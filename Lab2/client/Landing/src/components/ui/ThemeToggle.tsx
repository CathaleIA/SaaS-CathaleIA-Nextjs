'use client';

import { FaRegMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // Cambia la clase 'dark' en el elemento <html>
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Aplica la clase 'dark' si el tema guardado es 'dark'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    setTheme(savedTheme);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-2 rounded"
    >
      {theme === 'light' ? (
        <FaRegMoon className="h-5 w-5 md:h-6 md:w-6 " />
      ) : (
        <FaSun className="h-5 w-5 md:h-6 md:w-6 " />
      )}
    </button>
  );
}