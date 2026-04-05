import { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import { formatPriceFull } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Resale Listings in Toronto',
  description: 'Browse resale condos, houses, and townhomes in Toronto and the GTA. Find your next home with SimpleHome.ca.',
};

const resaleListings = [
  { id: '1', name: '36 Park Lawn Rd #2105', slug: '36-park-lawn-2105', type: 'Condo', price: 689000, beds: 2, baths: 2, sqft: 850, neighborhood: 'Etobicoke', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', mls: 'W1234567' },
  { id: '2', name: '100 Harbour St #3301', slug: '100-harbour-3301', type: 'Condo', price: 825000, beds: 2, baths: 2, sqft: 920, neighborhood: 'Waterfront', imageUrl: 'https://images.unsplash.com/photo-1560448204771-d5118743eef2?w=800&q=80', mls: 'C2345678' },
  { id: '3', name: '55 Bremner Blvd #1602', slug: '55-bremner-1602', type: 'Condo', price: 595000, beds: 1, baths: 1, sqft: 620, neighborhood: 'CityPlace', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', mls: 'C3456789' },
  { id: '4', name: '15 Iceboat Terrace #2408', slug: '15-iceboat-2408', type: 'Condo', price: 1150000, beds: 3, baths: 2, sqft: 1200, neighborhood: 'Fort York', imageUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', mls: 'C4567890' },
  { id: '5', name: '85 Queens Wharf Rd #711', slug: '85-queens-wharf-711', type: 'Condo', price: 549000, beds: 1, baths: 1, sqft: 580, neighborhood: 'Fort York', imageUrl: 'https://images.unsplash.com/photo-1556909172-8c2f3e8f1c0a?w=800&q=80', mls: 'C5678901' },
  { id: '6', name: '28 Linden St', slug: '28-linden-st', type: 'House', price: 2350000, beds: 4, baths: 3, sqft: 2800, neighborhood: 'Rosedale', imageUrl: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80', mls: 'C6789012' },
];

export default function ResalePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Resale Listings' }]} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-primary mb-3">Resale Listings</h1>
          <p className="text-muted mb-8">
            Browse resale condos, houses, and townhomes across the Greater Toronto Area.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {resaleListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      {listing.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary">{listing.name}</h3>
                  <div className="flex items-center gap-1 text-muted text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {listing.neighborhood}
                  </div>
                  <div className="font-semibold text-accent text-lg mt-2">
                    {formatPriceFull(listing.price)}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{listing.beds} Bed</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{listing.baths} Bath</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{listing.sqft} sqft</span>
                  </div>
                  <p className="text-xs text-muted mt-2">MLS# {listing.mls}</p>
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
  );
}
