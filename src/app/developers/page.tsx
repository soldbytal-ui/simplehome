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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Developers' }]} />

      <h1 className="text-3xl font-bold text-primary mb-3">Pre-Construction Developers</h1>
      <p className="text-muted mb-10 max-w-2xl">
        Toronto&apos;s leading developers shaping the city&apos;s skyline. From luxury high-rises to
        transit-oriented communities, these builders are behind the GTA&apos;s most anticipated projects.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <Link
            key={dev.id}
            href={`/developers/${dev.slug}`}
            className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-accent">{dev.name.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-primary group-hover:text-accent transition-colors">
                  {dev.name}
                </h2>
                <p className="text-xs text-muted mt-0.5">{dev.projectCount} projects</p>
                {dev.headquarters && (
                  <p className="text-xs text-muted">{dev.headquarters}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted mt-3 line-clamp-3 leading-relaxed">{dev.bio}</p>
            {dev.website && (
              <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                <ExternalLink className="w-3 h-3" />
                <span>Website</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
