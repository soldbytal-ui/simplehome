import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { portfolioItems } from '@/data/portfolio';
import { formatPriceFull } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = portfolioItems.find((p) => p.slug === params.slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: `${item.name} | Portfolio`,
    description: item.tagline,
  };
}

export default function PortfolioItemPage({ params }: Props) {
  const item = portfolioItems.find((p) => p.slug === params.slug);
  if (!item) notFound();

  const related = portfolioItems.filter((p) => p.id !== item.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Portfolio', href: '/portfolio' },
          { label: item.name },
        ]}
      />

      {/* Hero */}
      <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-white text-3xl font-bold">{item.name}</h1>
          <p className="text-white/70 mt-1">{item.neighborhood} &middot; {item.address}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {item.status === 'sold' && item.soldPrice && (
          <div className="bg-surface rounded-xl p-4">
            <div className="text-xs text-muted">Sold Price</div>
            <div className="font-bold text-primary text-lg">{formatPriceFull(item.soldPrice)}</div>
          </div>
        )}
        {item.originalPrice && (
          <div className="bg-surface rounded-xl p-4">
            <div className="text-xs text-muted">{item.status === 'sold' ? 'Asking Price' : 'Listed Price'}</div>
            <div className="font-bold text-primary text-lg">{formatPriceFull(item.originalPrice)}</div>
          </div>
        )}
        {item.daysOnMarket && (
          <div className="bg-surface rounded-xl p-4">
            <div className="text-xs text-muted">Days on Market</div>
            <div className="font-bold text-primary text-lg">{item.daysOnMarket}</div>
          </div>
        )}
        {item.sqft && (
          <div className="bg-surface rounded-xl p-4">
            <div className="text-xs text-muted">Square Feet</div>
            <div className="font-bold text-primary text-lg">{item.sqft.toLocaleString()}</div>
          </div>
        )}
      </div>

      {/* The Story */}
      <section className="max-w-3xl mb-10">
        <h2 className="text-2xl font-bold text-primary mb-4">The Story</h2>
        <p className="text-muted leading-relaxed italic text-lg mb-4">&quot;{item.tagline}&quot;</p>
        {item.storyContent ? (
          <div className="text-muted leading-relaxed whitespace-pre-line">{item.storyContent}</div>
        ) : (
          <p className="text-muted leading-relaxed">
            Located in the heart of {item.neighborhood}, this {item.beds}-bedroom,
            {item.baths}-bathroom residence represents the best of Toronto living.
            {item.status === 'sold'
              ? ` This property sold for ${formatPriceFull(item.soldPrice)} after ${item.daysOnMarket} days on market, demonstrating the continued strength of the ${item.neighborhood} real estate market.`
              : ' This exceptional property offers a rare opportunity for discerning buyers seeking quality and location.'}
          </p>
        )}
      </section>

      {/* Gallery */}
      {item.galleryImages && item.galleryImages.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {item.galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img} alt={`${item.name} photo ${i + 1}`} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Related Properties</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/portfolio/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-semibold">{p.name}</h3>
                    <p className="text-white/70 text-sm">{p.neighborhood}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
