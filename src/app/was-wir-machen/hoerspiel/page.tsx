"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function HoerspielPage() {
  return (
    <div className="min-h-screen bg-light text-dark flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-dark text-light">
        <div className="container mx-auto px-4">
          <a href="/was-wir-machen" className="block text-sm uppercase tracking-widest text-mist hover:text-light transition-colors text-center mb-6">
            ← Was w[i:]r machen
          </a>
          <h1 className="text-4xl md:text-5xl font-display mb-6 text-center">H[øː]rspiel</h1>
          <p className="text-3xl font-display text-center text-mist">Geschichten für die Ohren</p>
        </div>
      </section>

      <main className="flex-grow">
        {/* Coming Soon Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">Seite im Aufbau</h2>
              <div className="mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mx-auto text-mist" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-xl mb-6">
                Hier stellen wir bald unsere Hörspielproduktionen vor.
              </p>
              <p className="text-lg mb-12">
                Diese Seite befindet sich derzeit im Aufbau. Schauen Sie bald wieder vorbei,
                um mehr über unsere Hörspiel-Arbeit bei Zw[i:]g[ə]spräch e.V. zu erfahren.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/was-wir-machen" className="inline-block bg-dark hover:bg-steel text-light font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors">
                  Zu „Was wir machen"
                </a>
                <a href="/kontakt" className="inline-block bg-light hover:bg-ice text-dark font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors border border-dark">
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
