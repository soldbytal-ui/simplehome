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
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs
        items={[
          { label: 'Pre-Construction', href: '/pre-construction' },
          { label: hood.name },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2">
          <p className="text-label uppercase text-copper mb-3">Neighborhood</p>
          <h1 className="font-serif text-section-sm md:text-section text-primary">
            New Pre-Construction Condos in {hood.name}
          </h1>
          <p className="text-muted font-light mt-3">
            {areaProjects.length} projects &middot; {priceRange}
          </p>

          {/* Description */}
          <div className="mt-8 text-muted font-light leading-relaxed">
            <p>{hood.description}</p>
          </div>

          {/* Projects grid */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {areaProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {areaProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted font-light">No projects listed in {hood.name} yet. Check back soon.</p>
            </div>
          )}

          {/* Top Developers */}
          {topDevs.length > 0 && (
            <section className="mt-24">
              <p className="text-label uppercase text-copper mb-3">Builders</p>
              <h2 className="font-serif text-section-sm text-primary mb-14">Top Developers in {hood.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {topDevs.map((dev) => (
                  <Link
                    key={dev.id}
                    href={`/developers/${dev.slug}`}
                    className="border border-black/[0.06] p-5 hover:border-copper/30 transition-colors text-center"
                  >
                    <div className="w-12 h-12 border border-black/[0.06] mx-auto flex items-center justify-center mb-3">
                      <span className="text-lg font-serif text-copper">{dev.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-serif text-primary text-sm">{dev.name}</h3>
                    <p className="text-xs text-muted font-light mt-1">{dev.projectCount} projects</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <div className="mt-24">
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
