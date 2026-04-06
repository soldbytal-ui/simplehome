import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Building2, Calendar, DollarSign, Users, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import ProjectCard from '@/components/ProjectCard';
import FAQ from '@/components/FAQ';
import { projects } from '@/data/projects';
import { formatPriceRange, getStatusLabel } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Not Found' };
  return {
    title: project.metaTitle || `${project.name} | Pre-Construction in ${project.neighborhood}`,
    description: project.metaDescription || project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.mainImageUrl],
    },
  };
}

export default function PropertyPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.neighborhoodSlug === project.neighborhoodSlug && p.id !== project.id)
    .slice(0, 3);

  return (
    <div>
      {/* Full-width hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={project.mainImageUrl}
          alt={`${project.name} - Pre-Construction in ${project.neighborhood}, Toronto`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs
          items={[
            { label: 'Pre-Construction', href: '/pre-construction' },
            { label: project.neighborhood, href: `/areas/${project.neighborhoodSlug}` },
            { label: project.name },
          ]}
        />

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mt-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-meta uppercase text-primary/60">
                {getStatusLabel(project.status)}
              </span>
            </div>
            <h1 className="font-serif text-section-sm md:text-section text-primary">{project.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-muted text-sm font-light">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                {project.address}
              </span>
            </div>
            <p className="text-sm text-muted font-light mt-2">
              By{' '}
              <Link href={`/developers/${project.developerId || '#'}`} className="text-copper hover:text-primary transition-colors">
                {project.developer}
              </Link>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: 'Price Range', value: formatPriceRange(project.priceMin, project.priceMax) },
                { icon: Building2, label: 'Total Units', value: project.units ? `${project.units} Units` : 'TBA' },
                { icon: Building2, label: 'Floors', value: project.floors ? `${project.floors} Storeys` : 'TBA' },
                { icon: Calendar, label: 'Est. Completion', value: project.completionYear?.toString() || 'TBA' },
              ].map((stat) => (
                <div key={stat.label} className="border border-black/[0.06] p-4">
                  <stat.icon className="w-5 h-5 text-copper mb-2" strokeWidth={1.5} />
                  <div className="text-meta uppercase text-muted">{stat.label}</div>
                  <div className="font-serif text-lg text-primary mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Content sections */}
            <section>
              <p className="text-label uppercase text-copper mb-3">Overview</p>
              <h2 className="font-serif text-section-sm text-primary mb-4">Building Overview</h2>
              <p className="text-muted font-light leading-relaxed">{project.description}</p>
              {project.amenities && project.amenities.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-serif text-lg text-primary mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.map((amenity) => (
                      <span key={amenity} className="border border-black/[0.06] text-muted text-xs px-3 py-1.5">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section>
              <p className="text-label uppercase text-copper mb-3">Location</p>
              <h2 className="font-serif text-section-sm text-primary mb-4">Location & Neighborhood</h2>
              <p className="text-muted font-light leading-relaxed">
                {project.name} is located in {project.neighborhood}, one of Toronto&apos;s most sought-after
                neighborhoods. The area offers excellent transit connectivity, with nearby TTC subway and bus
                routes providing easy access to downtown Toronto and the broader GTA. Residents enjoy proximity
                to local parks, restaurants, shopping, and entertainment venues.
              </p>
            </section>

            <section>
              <p className="text-label uppercase text-copper mb-3">Investment</p>
              <h2 className="font-serif text-section-sm text-primary mb-4">Investment Potential</h2>
              <p className="text-muted font-light leading-relaxed">
                With {project.neighborhood}&apos;s strong rental demand and continued population growth,
                {project.name} presents a compelling investment opportunity. Pre-construction pricing allows
                buyers to lock in current market rates with a structured deposit schedule. The area&apos;s
                transit expansion plans and development pipeline suggest continued appreciation potential.
              </p>
            </section>

            <section>
              <p className="text-label uppercase text-copper mb-3">Developer</p>
              <h2 className="font-serif text-section-sm text-primary mb-4">About the Developer</h2>
              <p className="text-muted font-light leading-relaxed">
                {project.developer} is one of Toronto&apos;s established developers with a proven track record
                of delivering quality residential projects across the Greater Toronto Area. Their portfolio
                includes award-winning developments known for design excellence and build quality.
              </p>
              <Link href={`/developers/${project.developerId || '#'}`} className="inline-flex items-center gap-1 text-sm text-copper font-light mt-3 hover:text-primary transition-colors">
                View Developer Profile <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </section>

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <section>
                <p className="text-label uppercase text-copper mb-3">Gallery</p>
                <h2 className="font-serif text-section-sm text-primary mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.name} gallery image ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {project.faqJson && project.faqJson.length > 0 && (
              <FAQ items={project.faqJson} title={`${project.name} FAQ`} />
            )}

            {/* Schedule CTA */}
            <div className="border border-black/[0.06] p-8">
              <p className="text-label uppercase text-copper mb-3">Private Access</p>
              <h2 className="font-serif text-section-sm text-primary mb-3">Schedule a Private Showing</h2>
              <p className="text-muted font-light text-sm mb-6">
                Get exclusive access to floor plans, pricing sheets, and VIP incentives. A licensed Ontario
                real estate professional will guide you through the process.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 text-nav uppercase hover:bg-primary/80 transition-colors"
              >
                <Users className="w-4 h-4" strokeWidth={1.5} />
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <InquiryForm projectName={project.name} projectId={project.id} source="property-page" />
              <p className="text-xs text-muted font-light leading-relaxed">
                * All pricing, specifications, and images are approximate and subject to change without notice.
                E.&amp;O.E. Contact a licensed real estate professional for the most current information.
              </p>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-24">
            <p className="text-label uppercase text-copper mb-3">Explore</p>
            <h2 className="font-serif text-section-sm md:text-section text-primary mb-14">More in {project.neighborhood}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: project.name,
            description: project.description,
            url: `https://simplehome.ca/properties/${project.slug}`,
            image: project.mainImageUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: project.address,
              addressLocality: project.neighborhood,
              addressRegion: 'Ontario',
              addressCountry: 'CA',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: project.latitude,
              longitude: project.longitude,
            },
            offers: project.priceMin
              ? {
                  '@type': 'Offer',
                  priceCurrency: 'CAD',
                  price: project.priceMin,
                }
              : undefined,
          }),
        }}
      />
    </div>
  );
}
