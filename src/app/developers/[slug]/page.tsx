import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Globe, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectCard from '@/components/ProjectCard';
import { developers } from '@/data/developers';
import { projects } from '@/data/projects';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return developers.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const dev = developers.find((d) => d.slug === params.slug);
  if (!dev) return { title: 'Not Found' };
  return {
    title: `${dev.name} | Toronto Pre-Construction Developer`,
    description: dev.bio.slice(0, 160),
  };
}

export default function DeveloperPage({ params }: Props) {
  const dev = developers.find((d) => d.slug === params.slug);
  if (!dev) notFound();

  const devProjects = projects.filter(
    (p) => p.developer === dev.name || p.developerId === dev.slug
  );
  const neighborhoodList = Array.from(new Set(devProjects.map((p) => p.neighborhood)));
  const priceMin = Math.min(...devProjects.map((p) => p.priceMin || Infinity));

  const otherDevelopers = developers.filter((d) => d.id !== dev.id).slice(0, 6);

  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs
        items={[
          { label: 'Developers', href: '/developers' },
          { label: dev.name },
        ]}
      />

      <div className="flex items-start gap-6 mt-8 mb-14">
        <div className="w-20 h-20 border border-black/[0.06] flex items-center justify-center flex-shrink-0">
          <span className="text-3xl font-serif text-copper">{dev.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="font-serif text-section-sm md:text-section text-primary">{dev.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted font-light">
            {dev.headquarters && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                {dev.headquarters}
              </span>
            )}
            {dev.foundedYear && <span>Est. {dev.foundedYear}</span>}
          </div>
          {dev.website && (
            <a
              href={dev.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-copper mt-2 hover:text-primary transition-colors"
            >
              <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-14">
        <div className="border border-black/[0.06] p-5">
          <div className="text-2xl font-serif text-copper">{devProjects.length}</div>
          <div className="text-meta uppercase text-muted mt-1">Projects</div>
        </div>
        <div className="border border-black/[0.06] p-5">
          <div className="text-2xl font-serif text-copper">{neighborhoodList.length}</div>
          <div className="text-meta uppercase text-muted mt-1">Neighborhoods</div>
        </div>
        <div className="border border-black/[0.06] p-5">
          <div className="text-2xl font-serif text-copper">
            {priceMin < Infinity ? `$${(priceMin / 1000).toFixed(0)}K+` : 'TBA'}
          </div>
          <div className="text-meta uppercase text-muted mt-1">Starting From</div>
        </div>
      </div>

      {/* Bio */}
      <div className="text-muted font-light leading-relaxed mb-14 max-w-3xl">
        <p>{dev.bio}</p>
      </div>

      {/* Projects */}
      {devProjects.length > 0 && (
        <section className="py-24 border-t border-black/[0.06]">
          <p className="text-label uppercase text-copper mb-3">Portfolio</p>
          <h2 className="font-serif text-section-sm text-primary mb-14">
            Projects by {dev.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Other Developers */}
      <section className="py-24 border-t border-black/[0.06]">
        <p className="text-label uppercase text-copper mb-3">Explore</p>
        <h2 className="font-serif text-section-sm text-primary mb-14">Other Developers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {otherDevelopers.map((d) => (
            <Link
              key={d.id}
              href={`/developers/${d.slug}`}
              className="border border-black/[0.06] p-4 text-center hover:border-copper/30 transition-colors"
            >
              <div className="w-12 h-12 border border-black/[0.06] mx-auto flex items-center justify-center mb-2">
                <span className="text-lg font-serif text-copper">{d.name.charAt(0)}</span>
              </div>
              <h3 className="font-serif text-primary text-xs">{d.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
