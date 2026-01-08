import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendToEchoDesk, formatEchoDeskPayload } from '@/lib/echo-desk';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req?.json?.();
    const { name, email, phone, service, subject, message, source } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse?.json?.(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to database (existing functionality)
    const submission = await prisma?.contactSubmission?.create?.({
      data: {
        name,
        email,
        phone: phone ?? '',
        service: service ?? '',
        subject: subject ?? '',
        message,
        source: source ?? 'website',
        status: 'new',
      },
    });

    // Send to Echo Desk webhook (new functionality)
    // Run in background - don't wait for completion or fail form submission if it fails
    sendToEchoDesk(formatEchoDeskPayload({
      name,
      email,
      phone,
      service,
      subject,
      message,
      source,
    })).then((response) => {
      if (response.success) {
        console.log(`[Contact Form] Echo Desk webhook sent successfully for submission ${submission?.id}`);
      } else {
        console.error(`[Contact Form] Echo Desk webhook failed for submission ${submission?.id}:`, response.error);
      }
    }).catch((error) => {
      console.error(`[Contact Form] Echo Desk webhook error for submission ${submission?.id}:`, error);
    });

    return NextResponse?.json?.(
      { message: 'Thank you! We\'ll contact you soon.', submissionId: submission?.id },
      { status: 200 }
    );
  } catch (error) {
    console?.error?.('Contact form error:', error);
    return NextResponse?.json?.(
      { error: 'Failed to submit form. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await prisma?.contactSubmission?.findMany?.({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse?.json?.(submissions ?? []);
  } catch (error) {
    console?.error?.('Error fetching submissions:', error);
    return NextResponse?.json?.(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
