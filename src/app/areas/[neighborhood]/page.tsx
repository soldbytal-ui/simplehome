import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import InquiryForm from '@/components/InquiryForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import { projects } from '@/data/projects';
import { neighborhoods } from '@/data/neighborhoods';
import { developers } from '@/data/developers';
import { formatPriceFull } from '@/lib/utils';

interface Props {
  params: { neighborhood: string };
}

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ neighborhood: n.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const hood = neighborhoods.find((n) => n.slug === params.neighborhood);
  if (!hood) return { title: 'Not Found' };
  return {
    title: `New Pre-Construction Condos in ${hood.name} | SimpleHome.ca`,
    description: `Explore ${hood.projectCount}+ pre-construction condos in ${hood.name}. Browse new developments, pricing, and floor plans.`,
  };
}

export default function NeighborhoodPage({ params }: Props) {
  const hood = neighborhoods.find((n) => n.slug === params.neighborhood);
  if (!hood) notFound();

  const areaProjects = projects.filter((p) => p.neighborhoodSlug === hood.slug);
  const priceRange = areaProjects.length > 0
    ? `${formatPriceFull(Math.min(...areaProjects.map((p) => p.priceMin || Infinity)))} - ${formatPriceFull(Math.max(...areaProjects.map((p) => p.priceMax || 0)))}`
    : 'TBA';

  const areaDevelopers = Array.from(new Set(areaProjects.map((p) => p.developer)));
  const topDevs = developers.filter((d) => areaDevelopers.includes(d.name)).slice(0, 6);

  const faqItems = [
    { question: `What is the average condo price in ${hood.name}?`, answer: `The average pre-construction condo price in ${hood.name} ranges from ${priceRange}. Prices vary based on unit size, floor level, and finishes. Contact a licensed agent for the most current pricing.` },
    { question: `Is ${hood.name} a good area for investment?`, answer: `${hood.name} has seen strong demand for new residential development. Factors like transit accessibility, local amenities, and population growth contribute to the area's investment appeal. Consult a licensed real estate professional for personalized investment advice.` },
    { question: `What transit options are available in ${hood.name}?`, answer: `${hood.name} is served by TTC bus and subway routes, with connections to the broader GTA transit network. Many new developments are strategically located near transit hubs. Check specific project pages for detailed transit information.` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Pre-Construction', href: '/pre-construction' },
          { label: hood.name },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-primary">
            New Pre-Construction Condos in {hood.name}
          </h1>
          <p className="text-muted mt-2">
            {areaProjects.length} projects &middot; {priceRange}
          </p>

          {/* Description */}
          <div className="mt-6 text-muted leading-relaxed">
            <p>{hood.description}</p>
          </div>

          {/* Projects grid */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {areaProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {areaProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted">No projects listed in {hood.name} yet. Check back soon.</p>
            </div>
          )}

          {/* Top Developers */}
          {topDevs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6">Top Developers in {hood.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {topDevs.map((dev) => (
                  <Link
                    key={dev.id}
                    href={`/developers/${dev.slug}`}
                    className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-surface2 rounded-full mx-auto flex items-center justify-center mb-2">
                      <span className="text-lg font-bold text-accent">{dev.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-medium text-primary text-sm">{dev.name}</h3>
                    <p className="text-xs text-muted mt-1">{dev.projectCount} projects</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <div className="mt-16">
            <FAQ items={faqItems} title={`${hood.name} Pre-Construction FAQ`} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <InquiryForm source={`area-${hood.slug}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
