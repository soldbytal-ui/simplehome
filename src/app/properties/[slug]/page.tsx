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
import { formatPriceRange, getStatusColor, getStatusLabel } from '@/lib/utils';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Pre-Construction', href: '/pre-construction' },
          { label: project.neighborhood, href: `/areas/${project.neighborhoodSlug}` },
          { label: project.name },
        ]}
      />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{project.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-muted text-sm">
              <MapPin className="w-4 h-4" />
              {project.address}
            </span>
            <span className={`${getStatusColor(project.status)} px-2.5 py-0.5 rounded-full text-xs font-medium`}>
              {getStatusLabel(project.status)}
            </span>
          </div>
          <p className="text-sm text-muted mt-1">
            By{' '}
            <Link href={`/developers/${project.developerId || '#'}`} className="text-accent hover:underline">
              {project.developer}
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
        <Image
          src={project.mainImageUrl}
          alt={`${project.name} - Pre-Construction in ${project.neighborhood}, Toronto`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, label: 'Price Range', value: formatPriceRange(project.priceMin, project.priceMax) },
              { icon: Building2, label: 'Total Units', value: project.units ? `${project.units} Units` : 'TBA' },
              { icon: Building2, label: 'Floors', value: project.floors ? `${project.floors} Storeys` : 'TBA' },
              { icon: Calendar, label: 'Est. Completion', value: project.completionYear?.toString() || 'TBA' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface rounded-xl p-4">
                <stat.icon className="w-5 h-5 text-accent mb-2" />
                <div className="text-xs text-muted">{stat.label}</div>
                <div className="font-semibold text-primary text-sm mt-0.5">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Content sections */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-3">Building Overview</h2>
            <p className="text-muted leading-relaxed">{project.description}</p>
            {project.amenities && project.amenities.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-primary text-sm mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {project.amenities.map((amenity) => (
                    <span key={amenity} className="bg-surface text-muted text-xs px-3 py-1.5 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">Location & Neighborhood</h2>
            <p className="text-muted leading-relaxed">
              {project.name} is located in {project.neighborhood}, one of Toronto&apos;s most sought-after
              neighborhoods. The area offers excellent transit connectivity, with nearby TTC subway and bus
              routes providing easy access to downtown Toronto and the broader GTA. Residents enjoy proximity
              to local parks, restaurants, shopping, and entertainment venues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">Investment Potential</h2>
            <p className="text-muted leading-relaxed">
              With {project.neighborhood}&apos;s strong rental demand and continued population growth,
              {project.name} presents a compelling investment opportunity. Pre-construction pricing allows
              buyers to lock in current market rates with a structured deposit schedule. The area&apos;s
              transit expansion plans and development pipeline suggest continued appreciation potential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">About the Developer</h2>
            <p className="text-muted leading-relaxed">
              {project.developer} is one of Toronto&apos;s established developers with a proven track record
              of delivering quality residential projects across the Greater Toronto Area. Their portfolio
              includes award-winning developments known for design excellence and build quality.
            </p>
            <Link href={`/developers/${project.developerId || '#'}`} className="inline-flex items-center gap-1 text-sm text-accent font-medium mt-2 hover:underline">
              View Developer Profile <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </section>

          {/* Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.name} gallery image ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
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
          <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
            <h2 className="text-xl font-bold text-primary mb-2">Schedule a Private Showing</h2>
            <p className="text-muted text-sm mb-4">
              Get exclusive access to floor plans, pricing sheets, and VIP incentives. A licensed Ontario
              real estate professional will guide you through the process.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Users className="w-4 h-4" />
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <InquiryForm projectName={project.name} projectId={project.id} source="property-page" />
            <p className="text-xs text-muted leading-relaxed">
              * All pricing, specifications, and images are approximate and subject to change without notice.
              E.&amp;O.E. Contact a licensed real estate professional for the most current information.
            </p>
          </div>
        </div>
      </div>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">More in {project.neighborhood}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

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
