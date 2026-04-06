import Link from 'next/link';
import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { developers } from '@/data/developers';

export const metadata: Metadata = {
  title: 'Pre-Construction Developers in Toronto',
  description: 'Explore Toronto\'s top pre-construction condo developers. View profiles, project portfolios, and track records.',
};

export default function DevelopersPage() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs items={[{ label: 'Developers' }]} />

      <div className="mt-8 mb-14">
        <p className="text-label uppercase text-copper mb-3">Our Partners</p>
        <h1 className="font-serif text-section-sm md:text-section text-primary mb-4">Pre-Construction Developers</h1>
        <p className="text-muted font-light max-w-2xl">
          Toronto&apos;s leading developers shaping the city&apos;s skyline. From luxury high-rises to
          transit-oriented communities, these builders are behind the GTA&apos;s most anticipated projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <Link
            key={dev.id}
            href={`/developers/${dev.slug}`}
            className="group border border-black/[0.06] p-6 hover:border-copper/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 border border-black/[0.06] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-serif text-copper">{dev.name.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-primary group-hover:text-copper transition-colors">
                  {dev.name}
                </h2>
                <p className="text-xs text-muted font-light mt-0.5">{dev.projectCount} projects</p>
                {dev.headquarters && (
                  <p className="text-xs text-muted font-light">{dev.headquarters}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted font-light mt-4 line-clamp-3 leading-relaxed">{dev.bio}</p>
            {dev.website && (
              <div className="mt-4 flex items-center gap-1 text-xs text-copper">
                <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                <span>Website</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
