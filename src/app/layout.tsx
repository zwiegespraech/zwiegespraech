import type { Metadata } from 'next';
import { Sanchez, Barlow_Semi_Condensed } from 'next/font/google';
import './globals.css';

const sanchez = Sanchez({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-sanchez',
  display: 'swap',
});

const barlow = Barlow_Semi_Condensed({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zwiegespräch Theater',
  description: 'Schauspielkollektiv Zwiegespräch aus Paderborn. Experimentelles Theater, Dialog und Reflexion. Aktuelle Produktionen und Aufführungstermine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${sanchez.variable} ${barlow.variable}`}>
      <body className="font-text">
        {children}
      </body>
    </html>
  );
}
