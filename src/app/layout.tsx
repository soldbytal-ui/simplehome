import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: {
    default: 'SimpleHome.ca | Toronto Pre-Construction Condos & New Developments',
    template: '%s | SimpleHome.ca',
  },
  description:
    'Explore Toronto\'s best pre-construction condos and new developments. Browse 200+ projects across the GTA with pricing, floor plans, and expert insights.',
  keywords: [
    'Toronto pre-construction',
    'Toronto condos',
    'GTA new developments',
    'pre-construction condos Toronto',
    'new condos Toronto',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://simplehome.ca',
    siteName: 'SimpleHome.ca',
    title: 'SimpleHome.ca | Toronto Pre-Construction Condos & New Developments',
    description:
      'Explore Toronto\'s best pre-construction condos and new developments across the GTA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimpleHome.ca | Toronto Pre-Construction Condos',
    description:
      'Explore Toronto\'s best pre-construction condos and new developments across the GTA.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://simplehome.ca',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SimpleHome.ca',
              url: 'https://simplehome.ca',
              description:
                "Toronto's premier pre-construction and resale real estate platform.",
              areaServed: {
                '@type': 'City',
                name: 'Toronto',
                containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans bg-background text-primary">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
