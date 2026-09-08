import { NextResponse } from 'next/server';
import { OrdersController } from '@paypal/paypal-server-sdk';
import { getPaypalClient } from '@/lib/paypalServerClient';

export async function POST(request: Request) {
  const { orderId } = await request.json();

  if (!orderId || typeof orderId !== 'string') {
    return NextResponse.json({ error: 'Ungültige Bestell-ID.' }, { status: 400 });
  }

  let ordersController: OrdersController;
  try {
    ordersController = new OrdersController(getPaypalClient());
  } catch {
    return NextResponse.json({ error: 'PayPal ist serverseitig nicht konfiguriert.' }, { status: 503 });
  }

  const { result, statusCode } = await ordersController.captureOrder({
    id: orderId,
    prefer: 'return=minimal',
  });

  if (statusCode >= 400) {
    return NextResponse.json({ error: 'Spende konnte nicht abgeschlossen werden.' }, { status: 502 });
  }

  return NextResponse.json({ status: result.status });
}
