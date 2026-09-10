"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function WasWirMachenPage() {
  const areas = [
    {
      title: "The[ˈaː]ter",
      href: "/was-wir-machen/theater",
      teaser: 'Aktuelle Produktion: „Kunst"',
      description: 'Klassische Bühnenproduktionen - von Komödie bis Drama. Aktuell auf der Bühne: die wortgewandte Komödie „Kunst" von Yasmina Reza.',
      image: "/images/Kunst/IMG_8897.webp"
    },
    {
      title: "[ˈɪ]mpro",
      href: "/was-wir-machen/impro",
      teaser: "Improtheater",
      description: "Ungeskriptet, spontan und im direkten Austausch: unser Improtheater.",
      image: "/images/Kunst/IMG_8700.webp"
    },
    {
      title: "H[øː]rspiel",
      href: "/was-wir-machen/hoerspiel",
      teaser: "Geschichten für die Ohren",
      description: "Erzählte Geschichten, die ganz ohne Bühne auskommen: unsere Hörspielproduktionen.",
      image: "/images/Kunst/IMG_8747.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-light text-dark flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-dark text-light">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6 text-center">Was w[i:]r machen</h1>
          <p className="text-3xl font-display text-center text-mist">Theater, Impro und Hörspiel</p>
        </div>
      </section>

      <main className="flex-grow">
        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-xl max-w-4xl mx-auto text-center">
              Wir wollen Geschichten auf viele Arten erzählen. Geschichten, die nicht nur für euch,
              sondern auch mit euch stattfinden. Auf der Bühne, improvisiert oder nur für die Ohren.
            </p>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="py-16 bg-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {areas.map((area) => (
                <a
                  key={area.title}
                  href={area.href}
                  className="group bg-white rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="relative pt-[66%] bg-ice overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-display mb-2">{area.title}</h2>
                    <p className="text-slate font-semibold mb-4">{area.teaser}</p>
                    <p className="text-slate mb-6">{area.description}</p>
                    <span className="mt-auto inline-block text-dark font-semibold uppercase tracking-wider group-hover:underline">
                      Mehr erfahren →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-dark text-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display mb-6">Fragen zu unserer Arbeit?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-mist">
              Nehmen Sie gerne Kontakt mit uns auf.
            </p>
            <a href="/kontakt" className="inline-block bg-light hover:bg-ice text-dark font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors">
              Kontakt aufnehmen
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
