'use client'

import Image from 'next/image'
import MobileMenu from '@/components/mobile-menu/MobileMenu';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"

import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LenguageToggle';

import { useTranslation } from '@/../hooks/useTranlation';

export default function NavBar() {

  // console.log(currentUser)
  const t = useTranslation();
  const router = useRouter();

  //logica de posicion de navbar despues de hacer scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${scrolled ? 'fixed backdrop-blur-md bg-opacity-10' : 'block'} top-0 z-40 w-full border-b`}>
      <div className='container flex h-16 items-center justify-between py-4 px-4 md:px-6 w-full'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <div className='flex items-center space-x-1 rtl:space-x-reverse'>
              <Image
                src='/assets/insignia_degrade.png'
                alt='ctahlkesd'
                width={20}
                height={20}
                // style={{
                //   width: '100%', // Ocupa el 100% del contenedor
                //   height: 'auto', // Mantiene la relación de aspecto
                // }}
              />
              <span className='text-xl font-bold'>CATHALE<span className='text-slate-400'>IA</span></span>
            </div>
          </Link>
        </div>
        <MobileMenu />
        <nav className='hidden md:flex items-center gap-2 lg:gap-6'>
          {t.header.nav.map((nav) => (
            <Link key={nav.id} href={`#${nav.id}`} className='text-sm font-medium hover:text-primary'>
              {nav.title}
            </Link>
          ))}
        </nav>
        <div className='flex items-center'>
          <div className='mr-2'>|</div>
              <Button
                  type="button"
                  size="lg" className='p-x-1'
                  onClick={() => {
                      router.push('/signup');
                  }}
              >
                SignUp
              </Button>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}