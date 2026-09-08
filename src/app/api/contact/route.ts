import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Kontaktformular <kontakt@zwiegespraech-theater.de>',
    to: ['info@zwiegespraech-theater.de'],
    replyTo: email,
    subject: `Neue Nachricht von ${name}`,
    text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'Fehler beim Senden der Nachricht.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
