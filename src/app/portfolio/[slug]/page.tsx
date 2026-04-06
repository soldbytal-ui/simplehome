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
    <div>
      {/* Full-width hero */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-container mx-auto px-6 lg:px-10">
          <h1 className="text-white font-serif text-section-sm md:text-section">{item.name}</h1>
          <p className="text-white/70 mt-2 font-light">{item.neighborhood} &middot; {item.address}</p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs
          items={[
            { label: 'Portfolio', href: '/portfolio' },
            { label: item.name },
          ]}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-14">
          {item.status === 'sold' && item.soldPrice && (
            <div className="border border-black/[0.06] p-5">
              <div className="text-meta uppercase text-muted">Sold Price</div>
              <div className="font-serif text-xl text-primary mt-1">{formatPriceFull(item.soldPrice)}</div>
            </div>
          )}
          {item.originalPrice && (
            <div className="border border-black/[0.06] p-5">
              <div className="text-meta uppercase text-muted">{item.status === 'sold' ? 'Asking Price' : 'Listed Price'}</div>
              <div className="font-serif text-xl text-primary mt-1">{formatPriceFull(item.originalPrice)}</div>
            </div>
          )}
          {item.daysOnMarket && (
            <div className="border border-black/[0.06] p-5">
              <div className="text-meta uppercase text-muted">Days on Market</div>
              <div className="font-serif text-xl text-primary mt-1">{item.daysOnMarket}</div>
            </div>
          )}
          {item.sqft && (
            <div className="border border-black/[0.06] p-5">
              <div className="text-meta uppercase text-muted">Square Feet</div>
              <div className="font-serif text-xl text-primary mt-1">{item.sqft.toLocaleString()}</div>
            </div>
          )}
        </div>

        {/* The Story */}
        <section className="max-w-3xl mb-14">
          <p className="text-label uppercase text-copper mb-3">The Story</p>
          <h2 className="font-serif text-section-sm text-primary mb-6">The Story</h2>
          <p className="text-muted font-light leading-relaxed italic text-lg mb-6">&quot;{item.tagline}&quot;</p>
          {item.storyContent ? (
            <div className="text-muted font-light leading-relaxed whitespace-pre-line">{item.storyContent}</div>
          ) : (
            <p className="text-muted font-light leading-relaxed">
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
          <section className="mb-14">
            <p className="text-label uppercase text-copper mb-3">Gallery</p>
            <h2 className="font-serif text-section-sm text-primary mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {item.galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={img} alt={`${item.name} photo ${i + 1}`} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="py-24 border-t border-black/[0.06]">
            <p className="text-label uppercase text-copper mb-3">Explore</p>
            <h2 className="font-serif text-section-sm text-primary mb-14">Related Properties</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-black/[0.06]">
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-serif text-lg">{p.name}</h3>
                      <p className="text-white/70 text-sm font-light">{p.neighborhood}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
