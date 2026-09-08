import { Client, Environment, LogLevel } from '@paypal/paypal-server-sdk';

// Client ID is not secret (it's also shipped to the browser for the JS SDK),
// only the secret must stay server-side. See src/lib/donations.ts for the
// donation amounts / PayPal env var docs.
//
// Built lazily (not at module load) so a half-configured deployment fails with
// a clean JSON error from the route handler instead of crashing the whole
// module graph the moment either API route file is imported.
let cachedClient: Client | null = null;

export function getPaypalClient(): Client {
  if (cachedClient) return cachedClient;

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing PayPal credentials: set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.'
    );
  }

  // Defaults to Sandbox so nobody accidentally takes real payments before the
  // integration is verified. Set NEXT_PUBLIC_PAYPAL_ENVIRONMENT=production to go live.
  // (Public because the client-side SDK needs to pick the same sandbox/live host;
  // which environment you're in isn't sensitive, only the client secret is.)
  const environment =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production'
      ? Environment.Production
      : Environment.Sandbox;

  cachedClient = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
    timeout: 0,
    environment,
    logging: {
      logLevel: LogLevel.Info,
      logRequest: { logBody: true },
      logResponse: { logHeaders: true },
    },
  });
  return cachedClient;
}
