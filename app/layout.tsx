import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navigation from './components/navigation';
import Footer from './components/footer';
import { EchoDeskChatWidget } from './components/chat-widget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Properly Inspected | Professional Home Inspection Tampa Bay',
  description:
    'Certified home inspection services in Tampa Bay with 360° photos, same-day reports, and 11 month warranty. InterNACHI CPI Lloyd Tillmann, FL Licensed #HI13452.',
  keywords: [
    'home inspection Tampa',
    'home inspector Tampa Bay',
    '4-point inspection',
    'wind mitigation',
    'new construction inspection',
    'Clearwater home inspector',
    'St Petersburg home inspector',
  ],
  openGraph: {
    title: 'Properly Inspected | Professional Home Inspection Tampa Bay',
    description:
      'Certified home inspection services in Tampa Bay with 360° photos, same-day reports, and 11 month warranty.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Properly Inspected',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter?.variable}>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <EchoDeskChatWidget />
        </Providers>
      </body>
    </html>
  );
}
