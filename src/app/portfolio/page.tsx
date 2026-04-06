'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio';
import { formatPriceFull } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PortfolioPage() {
  const [tab, setTab] = useState<'for_sale' | 'sold'>('for_sale');

  const filtered = portfolioItems.filter((item) =>
    tab === 'for_sale'
      ? item.status === 'for_sale' || item.status === 'under_contract'
      : item.status === 'sold'
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'for_sale': return 'bg-primary text-white';
      case 'sold': return 'bg-copper text-white';
      case 'under_contract': return 'bg-primary/60 text-white';
      default: return 'bg-muted text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'for_sale': return 'For Sale';
      case 'sold': return 'Sold';
      case 'under_contract': return 'Under Contract';
      default: return status;
    }
  };

  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs items={[{ label: 'Portfolio' }]} />

      <div className="mt-8 mb-14">
        <p className="text-label uppercase text-copper mb-3">Collection</p>
        <h1 className="font-serif text-section-sm md:text-section text-primary mb-4">Our Portfolio</h1>
        <p className="text-muted font-light max-w-2xl">
          A curated collection of notable properties — from exclusive pre-construction opportunities
          to successfully closed transactions across the Greater Toronto Area.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-12 border-b border-black/[0.06]">
        <button
          onClick={() => setTab('for_sale')}
          className={`pb-3 px-1 text-nav uppercase border-b-2 transition-colors ${
            tab === 'for_sale'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          For Sale
        </button>
        <button
          onClick={() => setTab('sold')}
          className={`pb-3 px-1 text-nav uppercase border-b-2 transition-colors ${
            tab === 'sold'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          Sold / Completed
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-black/[0.06]">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status badge */}
              <div className="absolute top-3 left-3">
                <span className={`${getStatusBadge(item.status)} px-3 py-1 text-meta uppercase`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>

              {/* Neighborhood tag */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-meta uppercase">
                  {item.neighborhood}
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-serif text-xl leading-tight">{item.name}</h3>
                <p className="text-white/70 text-sm mt-1 font-light line-clamp-1">{item.tagline}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white font-serif">
                    {item.status === 'sold' && item.soldPrice
                      ? `Sold for ${formatPriceFull(item.soldPrice)}`
                      : item.originalPrice
                        ? formatPriceFull(item.originalPrice)
                        : 'Price on Request'}
                  </span>
                  {item.beds && (
                    <span className="text-white/70 text-xs font-light">
                      {item.beds} BD &middot; {item.baths} BA
                      {item.sqft ? ` · ${item.sqft.toLocaleString()} sqft` : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-muted font-light">
          No properties in this category yet.
        </div>
      )}
    </div>
  );
}
