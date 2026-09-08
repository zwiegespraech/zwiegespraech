"use client";

import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { BANK_DETAILS } from '@/lib/donations';
import { Download } from 'lucide-react';
import PayPalDonateButton from '@/components/PayPalDonateButton';

export default function UnterstuetzenPage() {
  const ngoSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Zwiegespräch Theater",
    "description": "Theaterverein aus Paderborn – Mitglied werden oder das Theater mit einer Spende unterstützen.",
    "url": "https://zwiegespräch-theater.de/unterstuetzen/",
  };

  return (
    <>
      <SEO
        title="Unterstützen - Zwiegespräch Theater"
        description="Werde Mitglied bei Zwiegespräch e.V. oder unterstütze unser Theater mit einer Spende – per Überweisung oder PayPal."
        canonical="/unterstuetzen/"
        keywords="Theater Verein unterstützen, Mitglied werden Theater Paderborn, Theater spenden, Zwiegespräch Spende"
        schema={ngoSchema}
      />

      <div className="min-h-screen bg-light text-dark flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-dark text-light">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display mb-6 text-center">[ˌʊ]nterst[ʏ]tzen</h1>
            <p className="text-xl text-center text-mist max-w-2xl mx-auto">
              Werde Teil von Zw[i:]g[ə]spräch oder hilf uns mit einer Spende, Theater in Paderborn lebendig zu halten.
            </p>
          </div>
        </section>

        <main className="flex-grow">
          {/* Mitglied werden Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-display mb-6">Mitglied werden</h2>
                <p className="text-lg text-slate mb-4">
                  Ob auf der Bühne, hinter den Kulissen oder einfach als Unterstützer*in im Hintergrund –
                  als Mitglied wirst du Teil eines Vereins, der Theater in all seinen Facetten lebt und
                  gemeinsam mit dir weiterentwickelt.
                </p>
                <p className="text-lg text-slate mb-8">
                  Schreib uns einfach eine Nachricht und wir melden uns mit allen weiteren Infos zurück.
                </p>
                <a
                  href="mailto:vorstand@zwiegespraech-theater.de?subject=Mitgliedschaft%20bei%20Zwiegespr%C3%A4ch%20e.V."
                  className="inline-block bg-dark hover:bg-steel text-light font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors"
                >
                  Jetzt Mitglied werden
                </a>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/downloads/mitgliedsantrag.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 border border-dark text-dark hover:bg-dark hover:text-light font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors"
                  >
                    <Download size={18} />
                    Mitgliedsantrag
                  </a>
                  <a
                    href="/downloads/vereinssatzung.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 border border-dark text-dark hover:bg-dark hover:text-light font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors"
                  >
                    <Download size={18} />
                    Vereinssatzung
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Spenden Section */}
          <section id="spenden" className="py-16 bg-light">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-display mb-6">Spenden</h2>
                <p className="text-lg text-slate">
                  Bühnenbild, Kostüme, Technik und Proberäume – jede Produktion lebt von Ressourcen, die
                  wir uns als Verein selbst erarbeiten. Mit einer Spende hilfst du uns, weiterhin
                  Theater zu machen, das etwas bewegt.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Bank Transfer Card */}
                <div className="bg-white p-8 rounded-md shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Per Überweisung</h3>
                  <ul className="space-y-3">
                    <li>
                      <span className="font-medium block text-sm uppercase tracking-wider text-mist">Kontoinhaber</span>
                      <span>{BANK_DETAILS.kontoinhaber}</span>
                    </li>
                    <li>
                      <span className="font-medium block text-sm uppercase tracking-wider text-mist">IBAN</span>
                      <span className="font-mono">{BANK_DETAILS.iban}</span>
                    </li>
                    <li>
                      <span className="font-medium block text-sm uppercase tracking-wider text-mist">BIC</span>
                      <span className="font-mono">{BANK_DETAILS.bic}</span>
                    </li>
                    <li>
                      <span className="font-medium block text-sm uppercase tracking-wider text-mist">Verwendungszweck</span>
                      <span>Spende – Dein Name</span>
                    </li>
                  </ul>
                </div>

                {/* PayPal Card */}
                <div className="bg-white p-8 rounded-md shadow-md flex flex-col">
                  <h3 className="text-xl font-semibold mb-4">Per PayPal</h3>
                  <p className="text-slate mb-6">
                    Schnell und unkompliziert per PayPal spenden – ganz ohne Überweisung.
                  </p>
                  <PayPalDonateButton />
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-dark text-light">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-display mb-6">Fragen zur Unterstützung?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-mist">
                Melde dich gerne, wenn du Fragen zur Mitgliedschaft oder zu Spenden hast.
              </p>
              <a href="/kontakt" className="inline-block bg-light hover:bg-ice text-dark font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors">
                Zum Kontakt
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
