# Setup & Deployment – Zwiegespräch Theater Website

Diese Anleitung führt einmal komplett durch: von leeren Accounts bis zur
laufenden Produktivseite auf zwiegespraech-theater.de.

Betroffene Dienste: **GitHub** (Code), **Netlify** (Hosting), **Resend**
(Kontaktformular-Mails), **PayPal** (Spenden-Button).

> Warum Netlify statt Vercel: Vercels kostenloser Hobby-Plan erlaubt laut
> [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)
> nur nicht-kommerzielle Nutzung – Spenden sind davon ausdrücklich
> ausgenommen, ein künftiger Ticketverkauf aber nicht mehr. Netlifys
> Free-Plan schränkt die Nutzung nicht nach Zweck ein, nur nach
> Ressourcenverbrauch (s. Schritt 6).

---

## 0. Vorher: Repo aufräumen

`git status` zeigt aktuell noch offene Löschungen der alten `backup/`- und
`old/`-Ordner aus der Vor-Next.js-Version der Seite. Vor dem ersten Deploy
entweder committen (Löschung bestätigen) oder verwerfen – nicht unentschieden
liegen lassen.

## 1. Voraussetzungen

- Node.js 20 LTS oder neuer, npm
- Git-Zugriff auf `https://github.com/luislessing/zwiegespraech`
- Ein Account bei: [netlify.com](https://netlify.com), [resend.com](https://resend.com), [developer.paypal.com](https://developer.paypal.com)
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
5. Den Key als `RESEND_API_KEY` in Netlify hinterlegen (Schritt 6)

Ohne verifizierte Domain schlägt der Versand fehl, weil die Absenderadresse
`kontakt@zwiegespraech-theater.de` sonst nicht als legitim gilt.

## 4. PayPal einrichten (Spenden-Button)

Code: `src/components/PayPalDonateButton.tsx` + `src/app/api/paypal/*`.

**Erst Sandbox, dann Live:**

1. PayPal-Business-Account vorhanden/anlegen
2. [developer.paypal.com/dashboard](https://developer.paypal.com/dashboard) →
   oben links Modus auf **Sandbox** stellen → **Apps & Credentials → Create App**
3. Client ID und Secret kopieren
4. In Netlify (oder lokal in `.env.local`) setzen:
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=<Sandbox Client ID>
   PAYPAL_CLIENT_SECRET=<Sandbox Secret>
   NEXT_PUBLIC_PAYPAL_ENVIRONMENT=sandbox
   ```
5. Testen: `/unterstuetzen` öffnen, Betrag wählen, "mit PayPal spenden"
   klicken. Einloggen mit einem Sandbox-Testkäufer aus
   **Sandbox → Accounts** im Dashboard (nicht mit eurem echten PayPal-Login).
6. Läuft der Testkauf durch → im Dashboard oben auf **Live** umschalten, dort
   erneut **Create App** für eine Live-App, deren Live-Zugangsdaten in Netlify
   eintragen und `NEXT_PUBLIC_PAYPAL_ENVIRONMENT=production` setzen.

⚠️ Ohne Schritt 6 (Umschalten auf `production`) läuft der Button dauerhaft im
Sandbox-Modus – echte Spenden würden dann nicht ankommen.

## 5. Bankdaten für die Überweisungs-Karte

`src/lib/donations.ts` → `BANK_DETAILS.iban` und `.bic` mit den echten Werten
ersetzen, committen, deployen. (`kontoinhaber` ist bereits korrekt gesetzt.)

## 6. Netlify-Site anlegen

Das Repo bringt bereits eine `netlify.toml` mit (Build-Command +
`@netlify/plugin-nextjs`), Netlify braucht also praktisch keine manuelle
Konfiguration.

1. Bei [netlify.com](https://netlify.com) mit GitHub anmelden
2. **Add new site → Import an existing project** → GitHub → Repo
   `luislessing/zwiegespraech` auswählen
3. Base directory leer lassen (Repo-Root), Build-Command/Publish-Directory
   werden aus `netlify.toml` übernommen
4. **Site settings → Environment variables** eintragen (gilt automatisch für
   alle Deploy-Contexts, lässt sich pro Context aber auch einschränken):
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `NEXT_PUBLIC_PAYPAL_ENVIRONMENT`
5. **Deploy site** klicken

⚠️ Der Free-Plan hat ein Credit-Budget statt getrennter Limits – **jeder
Production-Deploy kostet 15 Credits** von den 300 Credits/Monat. In Phasen
mit vielen Commits (wie gerade jetzt) lohnt sich ein Blick auf **Site
overview → Usage**, damit die Seite nicht mitten in einer Spielankündigung
wegen aufgebrauchter Credits offline geht.

## 7. Domain verbinden

1. Netlify-Site → **Domain management → Add a domain** →
   `zwiegespraech-theater.de` (und `www.zwiegespraech-theater.de`) hinzufügen
2. Die von Netlify angezeigten DNS-Einträge (meist per Netlify-DNS oder
   A-Record/CNAME auf den eigenen Nameserver) beim Domain-Provider setzen
3. Auf Netlify warten, bis das SSL-Zertifikat (Let's Encrypt) automatisch
   ausgestellt ist

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

- Push auf `main` → Netlify deployt automatisch als Production (kostet
  15 Credits pro Deploy, s. Schritt 6)
- Pull Requests / andere Branches bekommen automatisch einen Deploy Preview
- Änderungen an Bankdaten, PayPal-Beträgen (`PAYPAL_DONATION_PRESETS`) oder
  Vereinsmitgliedern (`src/app/ueber-uns/page.tsx`) sind normale Code-Änderungen
  – committen und pushen reicht, kein manueller Schritt in Netlify nötig
