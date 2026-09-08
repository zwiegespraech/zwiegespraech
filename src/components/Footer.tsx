'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, Youtube, HandCoins } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left flex-1">
            <h2 className="text-2xl font-display mb-4">Zw[i:]g[ə]spräch e.V.</h2>
            <p className="text-mist">Alles Weitere wird Kunst</p>
          </div>

          <div className="mb-8 md:mb-0 text-center flex-1">
            <h3 className="text-lg font-semibold mb-4">Folge uns</h3>
            <div className="flex space-x-4 justify-center">
              <a href="https://www.instagram.com/zwiegespraech_theater?igsh=azRjendnMjllMjlm" className="hover:text-slate transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com/@Zwiegespraech_theater" className="hover:text-slate transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube size={24} />
              </a>
              <a href="mailto:info@zwiegespraech-theater.de" className="hover:text-slate transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right flex-1">
            <Link
              href="/unterstuetzen#spenden"
              className="flex items-center justify-center md:justify-end gap-2 text-mist hover:text-light transition-colors mb-3"
            >
              <HandCoins size={20} />
              Per PayPal spenden
            </Link>
            <Link href="/impressum" className="text-mist hover:text-light transition-colors">Impressum</Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-steel text-center text-mist text-sm">
          <p>© {new Date().getFullYear()} Zwiegespräch e.V. | Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
