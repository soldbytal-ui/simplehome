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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Developers', href: '/developers' },
          { label: dev.name },
        ]}
      />

      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 bg-surface2 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-3xl font-bold text-accent">{dev.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">{dev.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted">
            {dev.headquarters && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
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
              className="inline-flex items-center gap-1 text-sm text-accent mt-2 hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface rounded-xl p-4">
          <div className="text-2xl font-bold text-accent">{devProjects.length}</div>
          <div className="text-xs text-muted mt-1">Projects</div>
        </div>
        <div className="bg-surface rounded-xl p-4">
          <div className="text-2xl font-bold text-accent">{neighborhoodList.length}</div>
          <div className="text-xs text-muted mt-1">Neighborhoods</div>
        </div>
        <div className="bg-surface rounded-xl p-4">
          <div className="text-2xl font-bold text-accent">
            {priceMin < Infinity ? `$${(priceMin / 1000).toFixed(0)}K+` : 'TBA'}
          </div>
          <div className="text-xs text-muted mt-1">Starting From</div>
        </div>
      </div>

      {/* Bio */}
      <div className="text-muted leading-relaxed mb-10 max-w-3xl">
        <p>{dev.bio}</p>
      </div>

      {/* Projects */}
      {devProjects.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">
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
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Other Developers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {otherDevelopers.map((d) => (
            <Link
              key={d.id}
              href={`/developers/${d.slug}`}
              className="bg-white rounded-xl p-4 text-center shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="w-12 h-12 bg-surface2 rounded-full mx-auto flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-accent">{d.name.charAt(0)}</span>
              </div>
              <h3 className="font-medium text-primary text-xs">{d.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
