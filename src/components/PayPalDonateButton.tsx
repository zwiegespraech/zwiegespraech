'use client';

import { useEffect, useRef, useState } from 'react';
import { PAYPAL_DONATION_PRESETS } from '@/lib/donations';

// Minimal shape of the bits of the PayPal Web SDK v6 (window.paypal) we use.
// The SDK ships no official TS types yet, so we keep this narrow and cast at the edge.
interface PayPalOneTimePaymentSession {
  start: (
    options: { presentationMode: 'auto' | 'popup' | 'modal' | 'redirect' },
    orderPromise: Promise<{ orderId: string }>
  ) => Promise<void>;
}
interface PayPalSdkInstance {
  createPayPalOneTimePaymentSession: (options: {
    onApprove: (data: { orderId: string }) => void | Promise<void>;
    onCancel?: () => void;
    onError?: (error: unknown) => void;
  }) => PayPalOneTimePaymentSession;
}
declare global {
  interface Window {
    paypal?: {
      createInstance: (options: {
        clientId: string;
        components: string[];
      }) => Promise<PayPalSdkInstance>;
    };
  }
}

const SDK_SRC =
  process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production'
    ? 'https://www.paypal.com/web-sdk/v6/core'
    : 'https://www.sandbox.paypal.com/web-sdk/v6/core';

type Status = 'loading-sdk' | 'ready' | 'processing' | 'success' | 'error' | 'unconfigured';

function loadPayPalSdk(): Promise<void> {
  if (window.paypal) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SDK_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('PayPal SDK failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = SDK_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('PayPal SDK failed to load'));
    document.body.appendChild(script);
  });
}

export default function PayPalDonateButton() {
  const [amount, setAmount] = useState<number>(PAYPAL_DONATION_PRESETS[1]);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [status, setStatus] = useState<Status>('loading-sdk');
  const sessionRef = useRef<PayPalOneTimePaymentSession | null>(null);

  const effectiveAmount = useCustom ? Number(customAmount.replace(',', '.')) : amount;
  const amountIsValid = Number.isFinite(effectiveAmount) && effectiveAmount >= 1;

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setStatus('unconfigured');
      return;
    }

    let cancelled = false;

    loadPayPalSdk()
      .then(() => {
        if (cancelled || !window.paypal) return;
        return window.paypal.createInstance({ clientId, components: ['paypal-payments'] });
      })
      .then((sdkInstance) => {
        if (cancelled || !sdkInstance) return;
        sessionRef.current = sdkInstance.createPayPalOneTimePaymentSession({
          onApprove: async (data) => {
            setStatus('processing');
            try {
              const res = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderId }),
              });
              setStatus(res.ok ? 'success' : 'error');
            } catch {
              setStatus('error');
            }
          },
          onCancel: () => setStatus('ready'),
          onError: () => setStatus('error'),
        });
        setStatus('ready');
      })
      .catch(() => setStatus('error'));

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDonate() {
    if (!sessionRef.current || !amountIsValid) return;
    setStatus('processing');
    try {
      await sessionRef.current.start(
        { presentationMode: 'auto' },
        (async () => {
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: effectiveAmount }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          return { orderId: data.id as string };
        })()
      );
    } catch {
      setStatus('error');
    }
  }

  if (status === 'unconfigured') {
    return (
      <p className="text-mist text-sm">
        PayPal ist noch nicht eingerichtet (fehlende Umgebungsvariablen). Siehe{' '}
        <code className="text-xs">src/lib/donations.ts</code>.
      </p>
    );
  }

  if (status === 'success') {
    return <p className="text-slate font-semibold">Vielen Dank für deine Spende! 💚</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {PAYPAL_DONATION_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setUseCustom(false);
              setAmount(preset);
            }}
            className={`py-2 px-4 rounded-md border font-semibold transition-colors ${
              !useCustom && amount === preset
                ? 'bg-dark text-light border-dark'
                : 'border-silver text-dark hover:border-slate'
            }`}
          >
            {preset}€
          </button>
        ))}
        <input
          type="text"
          inputMode="decimal"
          placeholder="anderer Betrag"
          value={customAmount}
          onFocus={() => setUseCustom(true)}
          onChange={(e) => {
            setUseCustom(true);
            setCustomAmount(e.target.value);
          }}
          className={`py-2 px-4 rounded-md border w-32 focus:outline-none transition-colors ${
            useCustom ? 'border-slate' : 'border-silver'
          }`}
        />
      </div>

      <button
        type="button"
        onClick={handleDonate}
        disabled={!amountIsValid || status === 'loading-sdk' || status === 'processing'}
        className="w-full inline-block text-center bg-dark hover:bg-steel text-light font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-colors disabled:opacity-50"
      >
        {status === 'processing'
          ? 'Wird verarbeitet…'
          : status === 'loading-sdk'
          ? 'Lädt…'
          : `${amountIsValid ? effectiveAmount + '€ ' : ''}mit PayPal spenden`}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-3 text-center">
          Da ist etwas schiefgelaufen. Bitte versuch es erneut.
        </p>
      )}
    </div>
  );
}
