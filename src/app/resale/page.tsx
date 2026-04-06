import { Metadata } from 'next';
import Image from 'next/image';
import { BedDouble, Bath, Maximize } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import { formatPriceFull } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Resale Listings | Luxury Properties in Toronto',
  description: 'Browse luxury resale condos, houses, and townhomes in Toronto and the GTA. Live MLS listings curated by our team.',
};

const resaleListings = [
  { id: '1', name: '36 Park Lawn Rd #2105', type: 'Condo', price: 689000, beds: 2, baths: 2, sqft: 850, neighborhood: 'Etobicoke', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', mls: 'W1234567' },
  { id: '2', name: '100 Harbour St #3301', type: 'Condo', price: 825000, beds: 2, baths: 2, sqft: 920, neighborhood: 'Waterfront', imageUrl: 'https://images.unsplash.com/photo-1560448204771-d5118743eef2?w=800&q=80', mls: 'C2345678' },
  { id: '3', name: '55 Bremner Blvd #1602', type: 'Condo', price: 595000, beds: 1, baths: 1, sqft: 620, neighborhood: 'CityPlace', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', mls: 'C3456789' },
  { id: '4', name: '15 Iceboat Terrace #2408', type: 'Condo', price: 1150000, beds: 3, baths: 2, sqft: 1200, neighborhood: 'Fort York', imageUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', mls: 'C4567890' },
  { id: '5', name: '85 Queens Wharf Rd #711', type: 'Condo', price: 549000, beds: 1, baths: 1, sqft: 580, neighborhood: 'Fort York', imageUrl: 'https://images.unsplash.com/photo-1556909172-8c2f3e8f1c0a?w=800&q=80', mls: 'C5678901' },
  { id: '6', name: '28 Linden St', type: 'House', price: 2350000, beds: 4, baths: 3, sqft: 2800, neighborhood: 'Rosedale', imageUrl: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80', mls: 'C6789012' },
];

export default function ResalePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface-dark py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <span className="text-label uppercase text-white/30 tracking-[0.2em] block mb-4">Resale</span>
          <h1 className="font-serif text-hero-mobile md:text-[3.5rem] text-white leading-tight">
            Luxury Resale<br />Properties
          </h1>
          <p className="text-white/40 font-light mt-4 max-w-lg">
            Curated resale listings across Toronto&apos;s most sought-after neighborhoods.
            IDX integration coming soon for live MLS data.
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-6 lg:px-10 py-6">
        <Breadcrumbs items={[{ label: 'Resale Listings' }]} />
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* IDX Placeholder */}
            <div className="border border-dashed border-copper/30 p-8 mb-12 text-center">
              <span className="text-label uppercase text-copper block mb-2">Coming Soon</span>
              <h2 className="font-serif text-xl text-primary mb-2">Live IDX Integration</h2>
              <p className="text-sm text-muted font-light max-w-md mx-auto">
                We&apos;re integrating live MLS listings directly into this page.
                In the meantime, browse our curated selection below or contact us for
                real-time availability.
              </p>
            </div>

            {/* Listings */}
            <div className="grid md:grid-cols-2 gap-8">
              {resaleListings.map((listing) => (
                <div key={listing.id} className="group transition-all duration-500 ease-luxury hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={listing.imageUrl}
                      alt={listing.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 text-meta uppercase">
                        {listing.type}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <span className="text-label uppercase text-muted">{listing.neighborhood}</span>
                    <h3 className="font-serif text-card-title text-primary mt-1">{listing.name}</h3>
                    <div className="text-lg font-serif text-primary mt-2">
                      {formatPriceFull(listing.price)}
                    </div>
                    <div className="flex items-center gap-5 mt-2 text-sm text-muted font-light">
                      <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" strokeWidth={1} />{listing.beds} Bed</span>
                      <span className="flex items-center gap-1"><Bath className="w-4 h-4" strokeWidth={1} />{listing.baths} Bath</span>
                      <span className="flex items-center gap-1"><Maximize className="w-4 h-4" strokeWidth={1} />{listing.sqft} sqft</span>
                    </div>
                    <p className="text-meta uppercase text-muted mt-2">MLS# {listing.mls}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <InquiryForm source="resale" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
