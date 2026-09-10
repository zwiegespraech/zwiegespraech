"use client";

import { useState } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function KontaktPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Zwiegespräch Theater",
    "email": "info@zwiegespraech-theater.de",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paderborn",
      "addressRegion": "Nordrhein-Westfalen",
      "addressCountry": "DE"
    },
  };

  const inputClass = "w-full bg-light border border-silver rounded-md px-4 py-3 text-dark placeholder-mist focus:outline-none focus:border-slate transition-colors";

  return (
    <>
      <SEO
        title="Kontakt - Zwiegespräch Theater Paderborn"
        description="Kontaktieren Sie Zwiegespräch e.V.. Anfragen für Aufführungen, Termine und Kooperationen. Theater aus Paderborn."
        canonical="/kontakt/"
        keywords="Theater Kontakt Paderborn, Schauspiel anfragen, Aufführungen buchen"
        schema={localBusinessSchema}
      />
      <div className="min-h-screen bg-light text-dark flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-dark text-light">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display mb-6 text-center">K[ɔ]ntakt</h1>
            <p className="text-xl text-center text-mist">Wir freuen uns über Nachrichten</p>
          </div>
        </section>

        <main className="flex-grow">
          {/* Contact Form Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dein Name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      E-Mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.de"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Deine Nachricht..."
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-dark hover:bg-steel text-light font-semibold uppercase tracking-wider py-3 px-8 transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
                  </button>

                  {status === 'success' && (
                    <p className="text-slate text-center font-semibold">
                      Deine Nachricht wurde erfolgreich gesendet. Wir melden uns bald!
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-600 text-center">
                      Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut oder schreib uns direkt an{' '}
                      <a href="mailto:info@zwiegespraech-theater.de" className="underline">info@zwiegespraech-theater.de</a>.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="py-16 bg-light">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-display mb-8 text-center">So erreichen Sie uns</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8">
                    <h3 className="text-xl font-semibold mb-4">Kontaktdaten</h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-medium mr-2">E-Mail:</span>
                        <a href="mailto:info@zwiegespraech-theater.de" className="text-slate hover:underline">
                          info@zwiegespraech-theater.de
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-8">
                    <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-medium mr-2">Instagram:</span>
                        <a href="https://www.instagram.com/zwiegespraech_theater" target="_blank" rel="noreferrer noopener" className="text-slate hover:underline">
                          @zwiegespraech_theater
                        </a>
                      </li>
                      <li className="flex">
                        <span className="font-medium mr-2">YouTube:</span>
                        <a href="https://www.youtube.com/@Zwiegespraech_theater" target="_blank" rel="noreferrer noopener" className="text-slate hover:underline">
                          @Zwiegespraech_theater
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-dark text-light">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-display mb-6">Möchten Sie uns live erleben?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-mist">
                Besuchen Sie unsere aktuelle Produktion und erleben Sie Theater hautnah!
              </p>
              <a href="/was-wir-machen/theater" className="inline-block bg-light hover:bg-ice text-dark font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors">
                Zur aktuellen Produktion
              </a>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}
