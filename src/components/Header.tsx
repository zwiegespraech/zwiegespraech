'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark text-light shadow-md py-2' : 'bg-transparent text-light py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-display hover:text-slate transition-colors">
            Zw[i:]g[ə]spräch
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 font-text font-semibold uppercase tracking-widest text-[0.95rem]">
            <li><Link href="/" className="hover:text-slate transition-colors py-2 px-2">Starts[a]ite</Link></li>
            <li><Link href="/produktion" className="hover:text-slate transition-colors py-2 px-2">Aktuelle Produkti[oː]n</Link></li>
            <li><Link href="/ueber-uns" className="hover:text-slate transition-colors py-2 px-2">Über [ˈʊ]ns</Link></li>
            <li><Link href="/kalender" className="hover:text-slate transition-colors py-2 px-2">Kal[ɛ]nd[ɐ]</Link></li>
            <li><Link href="/archiv" className="hover:text-slate transition-colors py-2 px-2">Arch[i:]v</Link></li>
            <li><Link href="/kontakt" className="hover:text-slate transition-colors py-2 px-2">K[ɔ]ntakt</Link></li>
            <li><Link href="/unterstuetzen" className="hover:text-slate transition-colors py-2 px-2">[ˌʊ]nterst[ʏ]tzen</Link></li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-dark text-light overflow-hidden transition-all duration-500 ${
        menuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4 font-text font-semibold uppercase tracking-widest text-[0.95rem]">
            <li><Link href="/" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Starts[a]ite</Link></li>
            <li><Link href="/produktion" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Aktuelle Produkti[oː]n</Link></li>
            <li><Link href="/ueber-uns" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Über [ˈʊ]ns</Link></li>
            <li><Link href="/kalender" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Kal[ɛ]nd[ɐ]</Link></li>
            <li><Link href="/archiv" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Arch[i:]v</Link></li>
            <li><Link href="/kontakt" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>K[ɔ]ntakt</Link></li>
            <li><Link href="/unterstuetzen" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>[ˌʊ]nterst[ʏ]tzen</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
