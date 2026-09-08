import { NextResponse } from 'next/server';
import { CheckoutPaymentIntent, OrdersController } from '@paypal/paypal-server-sdk';
import { getPaypalClient } from '@/lib/paypalServerClient';

export async function POST(request: Request) {
  const { amount } = await request.json();
  const value = Number(amount);

  if (!Number.isFinite(value) || value < 1 || value > 5000) {
    return NextResponse.json({ error: 'Ungültiger Spendenbetrag.' }, { status: 400 });
  }

  let ordersController: OrdersController;
  try {
    ordersController = new OrdersController(getPaypalClient());
  } catch {
    return NextResponse.json({ error: 'PayPal ist serverseitig nicht konfiguriert.' }, { status: 503 });
  }

  const { result, statusCode } = await ordersController.createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          description: 'Spende an Zwiegespräch e.V.',
          amount: {
            currencyCode: 'EUR',
            value: value.toFixed(2),
          },
        },
      ],
    },
    prefer: 'return=minimal',
  });

  if (statusCode >= 400) {
    return NextResponse.json({ error: 'Spende konnte nicht angelegt werden.' }, { status: 502 });
  }

  return NextResponse.json({ id: result.id });
}
