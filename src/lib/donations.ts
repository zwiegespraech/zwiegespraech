// Zentrale Stelle für Spenden-/Bankdaten – hier einmal eintragen, überall aktuell.

// TODO: Bankverbindung ergänzen, sobald vorhanden – aktuell nur Platzhalter
export const BANK_DETAILS = {
  kontoinhaber: 'Zwiegespräch e.V.',
  iban: 'DE91 4765 0130 1010 2638 28',
  bic: 'WELADE3LXXX',
  bank: '',
};

// Auswahlbeträge für den PayPal-Spenden-Button (in Euro).
export const PAYPAL_DONATION_PRESETS = [10, 25, 50];

// PayPal-Zugangsdaten kommen aus Umgebungsvariablen, nicht aus dem Code:
//   NEXT_PUBLIC_PAYPAL_CLIENT_ID   – Client-ID (öffentlich, wird auch im Browser geladen)
//   PAYPAL_CLIENT_SECRET           – Secret (bleibt serverseitig, s. src/lib/paypalServerClient.ts)
//   NEXT_PUBLIC_PAYPAL_ENVIRONMENT – "production" für echte Zahlungen, sonst Sandbox (Standard)
// Alle drei in Netlify unter Site settings → Environment variables eintragen.
