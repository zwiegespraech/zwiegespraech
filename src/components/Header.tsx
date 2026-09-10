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
          <ul className="flex items-center space-x-6 font-text font-semibold uppercase tracking-widest text-[0.95rem]">
            <li><Link href="/" className="hover:text-slate transition-colors py-2 px-2">Starts<span className="normal-case">[a]</span>ite</Link></li>
            <li className="relative group">
              <Link href="/was-wir-machen" className="hover:text-slate transition-colors py-2 px-2">Was w<span className="normal-case">[i:]</span>r machen</Link>
              <ul className="absolute left-0 top-full min-w-[10rem] bg-dark text-light shadow-md rounded-md overflow-hidden opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <li><Link href="/was-wir-machen/theater" className="block px-4 py-3 hover:bg-steel transition-colors normal-case tracking-normal font-normal">The[ˈaː]ter</Link></li>
                <li><Link href="/was-wir-machen/impro" className="block px-4 py-3 hover:bg-steel transition-colors normal-case tracking-normal font-normal">[ˈɪ]mpro</Link></li>
                <li><Link href="/was-wir-machen/hoerspiel" className="block px-4 py-3 hover:bg-steel transition-colors normal-case tracking-normal font-normal">H[øː]rspiel</Link></li>
              </ul>
            </li>
            <li><Link href="/ueber-uns" className="hover:text-slate transition-colors py-2 px-2">Über <span className="normal-case">[ˈʊ]</span>ns</Link></li>
            <li><Link href="/kalender" className="hover:text-slate transition-colors py-2 px-2">Kal<span className="normal-case">[ɛ]</span>nd<span className="normal-case">[ɐ]</span></Link></li>
            <li><Link href="/archiv" className="hover:text-slate transition-colors py-2 px-2">Arch<span className="normal-case">[i:]</span>v</Link></li>
            <li><Link href="/kontakt" className="hover:text-slate transition-colors py-2 px-2">K<span className="normal-case">[ɔ]</span>ntakt</Link></li>
            <li><Link href="/unterstuetzen" className="hover:text-slate transition-colors py-2 px-2"><span className="normal-case">[ʊ]</span>nt<span className="normal-case">[ɐ]</span>stützen</Link></li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-dark text-light overflow-hidden transition-all duration-500 ${
        menuOpen ? 'max-h-[36rem]' : 'max-h-0'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4 font-text font-semibold uppercase tracking-widest text-[0.95rem]">
            <li><Link href="/" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Starts<span className="normal-case">[a]</span>ite</Link></li>
            <li>
              <Link href="/was-wir-machen" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Was w<span className="normal-case">[i:]</span>r machen</Link>
              <ul className="pl-4 flex flex-col space-y-2 normal-case tracking-normal font-normal text-[0.9rem]">
                <li><Link href="/was-wir-machen/theater" className="block py-1 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>The[ˈaː]ter</Link></li>
                <li><Link href="/was-wir-machen/impro" className="block py-1 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>[ˈɪ]mpro</Link></li>
                <li><Link href="/was-wir-machen/hoerspiel" className="block py-1 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>H[øː]rspiel</Link></li>
              </ul>
            </li>
            <li><Link href="/ueber-uns" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Über <span className="normal-case">[ˈʊ]</span>ns</Link></li>
            <li><Link href="/kalender" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Kal<span className="normal-case">[ɛ]</span>nd<span className="normal-case">[ɐ]</span></Link></li>
            <li><Link href="/archiv" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>Arch<span className="normal-case">[i:]</span>v</Link></li>
            <li><Link href="/kontakt" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}>K<span className="normal-case">[ɔ]</span>ntakt</Link></li>
            <li><Link href="/unterstuetzen" className="block py-2 hover:text-slate transition-colors" onClick={() => setMenuOpen(false)}><span className="normal-case">[ʊ]</span>nt<span className="normal-case">[ɐ]</span>stützen</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
