# Setup & Deployment – Zwiegespräch Theater Website

Diese Anleitung führt einmal komplett durch: von leeren Accounts bis zur
laufenden Produktivseite auf zwiegespraech-theater.de.

Betroffene Dienste: **GitHub** (Code), **Vercel** (Hosting), **Resend**
(Kontaktformular-Mails), **PayPal** (Spenden-Button).

---

## 0. Vorher: Repo aufräumen

`git status` zeigt aktuell noch offene Löschungen der alten `backup/`- und
`old/`-Ordner aus der Vor-Next.js-Version der Seite. Vor dem ersten Deploy
entweder committen (Löschung bestätigen) oder verwerfen – nicht unentschieden
liegen lassen.

## 1. Voraussetzungen

- Node.js 20 LTS oder neuer, npm
- Git-Zugriff auf `https://github.com/luislessing/zwiegespraech`
- Ein Account bei: [vercel.com](https://vercel.com), [resend.com](https://resend.com), [developer.paypal.com](https://developer.paypal.com)
- Zugriff auf die DNS-Verwaltung von `zwiegespraech-theater.de`

## 2. Projekt lokal einrichten

```bash
git clone https://github.com/luislessing/zwiegespraech.git
cd zwiegespraech
npm install
```

Lokale Umgebungsvariablen in `.env.local` (Datei liegt im Repo-Root, wird von
Git ignoriert) anlegen:

```bash
RESEND_API_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
NEXT_PUBLIC_PAYPAL_ENVIRONMENT=sandbox
```

Ohne diese Variablen läuft die Seite trotzdem – Kontaktformular und
PayPal-Button zeigen dann nur eine Fehlermeldung/Hinweis statt zu funktionieren.

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

## 3. Resend einrichten (Kontaktformular)

Code: `src/app/api/contact/route.ts` – sendet von `kontakt@zwiegespraech-theater.de`
an `info@zwiegespraech-theater.de`.

1. Account auf [resend.com](https://resend.com) anlegen
2. **Domains → Add Domain** → `zwiegespraech-theater.de` eintragen
3. Die angezeigten DNS-Einträge (SPF, DKIM, ggf. DMARC) beim Domain-Provider
   eintragen, dann in Resend auf **Verify** warten (kann bis zu 24h dauern,
   meist deutlich schneller)
4. **API Keys → Create API Key** (reicht mit Send-Berechtigung)
5. Den Key als `RESEND_API_KEY` in Vercel hinterlegen (Schritt 6)

Ohne verifizierte Domain schlägt der Versand fehl, weil die Absenderadresse
`kontakt@zwiegespraech-theater.de` sonst nicht als legitim gilt.

## 4. PayPal einrichten (Spenden-Button)

Code: `src/components/PayPalDonateButton.tsx` + `src/app/api/paypal/*`.

**Erst Sandbox, dann Live:**

1. PayPal-Business-Account vorhanden/anlegen
2. [developer.paypal.com/dashboard](https://developer.paypal.com/dashboard) →
   oben links Modus auf **Sandbox** stellen → **Apps & Credentials → Create App**
3. Client ID und Secret kopieren
4. In Vercel (oder lokal in `.env.local`) setzen:
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=<Sandbox Client ID>
   PAYPAL_CLIENT_SECRET=<Sandbox Secret>
   NEXT_PUBLIC_PAYPAL_ENVIRONMENT=sandbox
   ```
5. Testen: `/unterstuetzen` öffnen, Betrag wählen, "mit PayPal spenden"
   klicken. Einloggen mit einem Sandbox-Testkäufer aus
   **Sandbox → Accounts** im Dashboard (nicht mit eurem echten PayPal-Login).
6. Läuft der Testkauf durch → im Dashboard oben auf **Live** umschalten, dort
   erneut **Create App** für eine Live-App, deren Live-Zugangsdaten in Vercel
   eintragen und `NEXT_PUBLIC_PAYPAL_ENVIRONMENT=production` setzen.

⚠️ Ohne Schritt 6 (Umschalten auf `production`) läuft der Button dauerhaft im
Sandbox-Modus – echte Spenden würden dann nicht ankommen.

## 5. Bankdaten für die Überweisungs-Karte

`src/lib/donations.ts` → `BANK_DETAILS.iban` und `.bic` mit den echten Werten
ersetzen, committen, deployen. (`kontoinhaber` ist bereits korrekt gesetzt.)

## 6. Vercel-Projekt anlegen

1. Bei [vercel.com](https://vercel.com) mit GitHub anmelden
2. **Add New… → Project** → Repo `luislessing/zwiegespraech` importieren
3. **Root Directory: `.`** (Repo-Root – *nicht* `zwiegespraech-website/`,
   das war ein älterer Stand des Projekts und stimmt nicht mehr)
4. Framework Preset **Next.js** wird automatisch erkannt
5. **Environment Variables** eintragen (für *Production* und *Preview*):
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `NEXT_PUBLIC_PAYPAL_ENVIRONMENT`
6. **Deploy** klicken

## 7. Domain verbinden

1. Vercel-Projekt → **Settings → Domains** → `zwiegespraech-theater.de`
   (und `www.zwiegespraech-theater.de`) hinzufügen
2. Die von Vercel angezeigten DNS-Einträge (A-Record/CNAME) beim
   Domain-Provider setzen
3. Auf Vercel warten, bis das SSL-Zertifikat automatisch ausgestellt ist

## 8. Nach dem Deploy prüfen

- [ ] Startseite lädt unter der echten Domain
- [ ] Kontaktformular (`/kontakt`) sendet eine Mail, die bei info@ ankommt
- [ ] `/ueber-uns` zeigt alle Mitglieder mit Fotos
- [ ] `/unterstuetzen`: Mitgliedsantrag- und Vereinssatzung-PDF laden herunter
      und lassen sich am PC ausfüllen
- [ ] `/unterstuetzen`: PayPal-Spende **im Sandbox-Modus** einmal komplett
      durchklicken, bevor auf `production` umgestellt wird
- [ ] Footer-Link "Per PayPal spenden" springt zum Spenden-Bereich

## 9. Laufender Betrieb

- Push auf `main` → Vercel deployt automatisch als Production
- Pull Requests / andere Branches bekommen automatisch eine Preview-URL
- Änderungen an Bankdaten, PayPal-Beträgen (`PAYPAL_DONATION_PRESETS`) oder
  Vereinsmitgliedern (`src/app/ueber-uns/page.tsx`) sind normale Code-Änderungen
  – committen und pushen reicht, kein manueller Schritt in Vercel nötig
