import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: {
    default: 'SimpleHome.ca | Toronto Pre-Construction & Luxury Real Estate',
    template: '%s | SimpleHome.ca',
  },
  description:
    'Toronto\'s premier destination for pre-construction developments and luxury resale properties. Curated by the city\'s top real estate professionals.',
  keywords: [
    'Toronto pre-construction',
    'Toronto luxury real estate',
    'GTA new developments',
    'Toronto condos',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://simplehome.ca',
    siteName: 'SimpleHome.ca',
    title: 'SimpleHome.ca | Toronto Pre-Construction & Luxury Real Estate',
    description:
      'Toronto\'s premier destination for pre-construction developments and luxury resale properties.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimpleHome.ca | Toronto Luxury Real Estate',
    description:
      'Toronto\'s premier destination for pre-construction and luxury resale properties.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://simplehome.ca' },
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
                "Toronto's premier pre-construction and luxury real estate platform.",
              areaServed: {
                '@type': 'City',
                name: 'Toronto',
                containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
