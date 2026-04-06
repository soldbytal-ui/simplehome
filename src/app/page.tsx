import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import MapSection from '@/components/MapSection';
import ProjectCard from '@/components/ProjectCard';
import FAQ from '@/components/FAQ';
import { projects } from '@/data/projects';
import { neighborhoods } from '@/data/neighborhoods';
import { blogPosts } from '@/data/blog-posts';

const featuredProjects = projects.slice(0, 6);
const featuredNeighborhoods = neighborhoods.slice(0, 10);
const latestPosts = blogPosts.slice(0, 3);

const homeFAQ = [
  { question: 'What is a pre-construction condo?', answer: 'A pre-construction condo is a residential unit purchased before it is built. Buyers purchase based on floor plans and renderings, locking in today\'s prices for a unit completed in 3-5 years with a structured deposit schedule.' },
  { question: 'How much deposit do I need in Toronto?', answer: 'Typically 15-20% spread over 12-24 months. A common structure is 5% on signing, 5% in 30 days, 5% in 90-180 days, and the final 5% on occupancy.' },
  { question: 'Can foreigners buy pre-construction in Ontario?', answer: 'The federal Prohibition on the Purchase of Residential Property by Non-Canadians Act restricts foreign buyers, with exemptions for permanent residents and certain work permit holders. Consult a licensed professional for current rules.' },
  { question: 'What are occupancy fees?', answer: 'Monthly payments made between moving in and official condo registration. These typically include estimated property taxes, maintenance fees, and interest on the unpaid balance, lasting 3-12 months.' },
  { question: 'How long does pre-construction take?', answer: 'From purchase to move-in, typically 3-5 years. This includes approvals, construction, and occupancy. High-rise condos generally take longer than low-rise developments.' },
  { question: 'Do I need a realtor to buy pre-construction?', answer: 'While not legally required, a licensed realtor experienced in pre-construction can negotiate on your behalf, review contracts, and often access VIP pricing before public launch.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── CINEMATIC HERO ── */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517090504332-e627240fc10b?w=1920&q=85"
          alt="Toronto skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-label uppercase text-white/50 tracking-[0.2em] block mb-6">
            Toronto &middot; GTA &middot; Ontario
          </span>
          <h1 className="font-serif text-hero-mobile md:text-hero text-white">
            Toronto&apos;s Finest<br />New Developments
          </h1>
          <p className="text-white/60 font-light mt-6 text-lg max-w-xl mx-auto leading-relaxed">
            Pre-construction condos, luxury resale, and bespoke advisory for
            the city&apos;s most discerning buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/pre-construction"
              className="bg-white text-primary px-8 py-3.5 text-nav uppercase hover:bg-white/90 transition-colors duration-300"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-8 py-3.5 text-nav uppercase hover:bg-white/10 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
          <span className="text-meta uppercase text-white/30 tracking-[0.2em]">Scroll</span>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section className="border-b border-black/[0.06]">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/[0.06]">
            {[
              { label: 'Pre-Construction', desc: 'New developments', href: '/pre-construction' },
              { label: 'Resale', desc: 'Live MLS listings', href: '/resale' },
              { label: 'Portfolio', desc: 'Curated properties', href: '/portfolio' },
              { label: 'Downsize', desc: 'With Steve Wagman', href: '/downsize' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group py-6 px-6 text-center hover:bg-surface transition-colors duration-300"
              >
                <span className="text-label uppercase text-muted group-hover:text-copper transition-colors duration-300">
                  {item.label}
                </span>
                <span className="block text-sm font-light text-muted/60 mt-1">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DEVELOPMENTS ── */}
      <section className="max-w-container mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-label uppercase text-copper block mb-3">Featured</span>
            <h2 className="font-serif text-section-sm md:text-section text-primary">
              New Developments
            </h2>
          </div>
          <Link
            href="/pre-construction"
            className="hidden md:flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-300"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial grid — first card large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
              {i === 0 ? (
                <Link href={`/properties/${project.slug}`} className="group block h-full">
                  <div className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-surface">
                    <Image
                      src={project.mainImageUrl}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                      sizes="66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="text-label uppercase text-white/50">{project.neighborhood}</span>
                      <h3 className="font-serif text-3xl text-white mt-2">{project.name}</h3>
                      <p className="text-white/60 font-light mt-2">{project.developer}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <ProjectCard project={project} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/pre-construction" className="text-sm text-muted hover:text-primary transition-colors">
            View All Projects <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </section>

      {/* ── RESALE TEASER ── */}
      <section className="bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-label uppercase text-copper block mb-3">Resale</span>
              <h2 className="font-serif text-section-sm md:text-section text-primary">
                Luxury Resale<br />Properties
              </h2>
              <p className="text-muted font-light leading-relaxed mt-6 max-w-md">
                Browse live MLS listings across Toronto&apos;s most coveted neighborhoods.
                From waterfront penthouses to Rosedale estates, discover resale
                opportunities curated by our team.
              </p>
              <Link
                href="/resale"
                className="inline-block bg-primary text-white px-8 py-3.5 text-nav uppercase mt-8 hover:bg-primary/80 transition-colors duration-300"
              >
                View Resale Listings
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
                alt="Luxury interior"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOODS ── */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-10 mb-12">
          <span className="text-label uppercase text-copper block mb-3">Explore</span>
          <h2 className="font-serif text-section-sm md:text-section text-primary">
            Neighborhoods
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto horizontal-scroll px-6 lg:px-10 pb-4">
          {featuredNeighborhoods.map((hood) => (
            <Link
              key={hood.id}
              href={`/areas/${hood.slug}`}
              className="group flex-shrink-0 w-[280px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={hood.imageUrl}
                  alt={hood.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl text-white">{hood.name}</h3>
                  <p className="text-meta uppercase text-white/40 mt-1">{hood.projectCount} Projects</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3D MAP SECTION ── */}
      <MapSection projects={projects} />

      {/* ── DOWNSIZE WITH STEVE ── */}
      <section className="bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface2">
              <Image
                src="https://d101qgvxw5fp3p.cloudfront.net/site/99016401/assets/uploads/agentphoto/webphoto_04012024162342.jpg"
                alt="Steve Wagman"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <span className="text-label uppercase text-copper block mb-3">Advisory</span>
              <h2 className="font-serif text-section-sm md:text-section text-primary">
                Downsize<br />with Steve
              </h2>
              <p className="text-muted font-light leading-relaxed mt-6 max-w-md">
                Transitioning from a family home to a right-sized residence is one of life&apos;s
                most significant decisions. Steve Wagman brings decades of Toronto real estate
                expertise to guide you through every step — from valuation to closing.
              </p>
              <Link
                href="/downsize"
                className="inline-block bg-primary text-white px-8 py-3.5 text-nav uppercase mt-8 hover:bg-primary/80 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SIMPLEHOME ── */}
      <section className="max-w-container mx-auto px-6 lg:px-10 py-24">
        <div className="text-center mb-16">
          <span className="text-label uppercase text-copper block mb-3">Why Us</span>
          <h2 className="font-serif text-section-sm md:text-section text-primary">
            The SimpleHome Difference
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Full-Service Advisory', desc: 'From pre-construction VIP access to luxury resale and downsizing — a complete real estate concierge under one roof.' },
            { title: 'Market Intelligence', desc: 'Deep neighborhood knowledge, data-driven insights, and relationships with Toronto\'s top developers give our clients an edge.' },
            { title: 'Licensed Professionals', desc: 'Every transaction is guided by RECO-registered agents with a fiduciary duty to protect your interests.' },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-serif text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-muted font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARKET INSIGHTS ── */}
      <section className="bg-surface py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-label uppercase text-copper block mb-3">Insights</span>
              <h2 className="font-serif text-section-sm md:text-section text-primary">
                Market Intelligence
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-300"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface2 mb-4">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                </div>
                <span className="text-label uppercase text-copper">{post.category}</span>
                <h3 className="font-serif text-card-title text-primary mt-2 group-hover:text-copper transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-meta uppercase text-muted mt-3 block">
                  {new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-container mx-auto px-6 lg:px-10 py-24">
        <div className="max-w-2xl mx-auto">
          <FAQ items={homeFAQ} title="Frequently Asked Questions" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-dark">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-24 text-center">
          <span className="text-label uppercase text-white/30 tracking-[0.2em] block mb-4">Ready?</span>
          <h2 className="font-serif text-section-sm md:text-section text-white">
            Begin Your Search
          </h2>
          <p className="text-white/40 font-light mt-4 max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re investing in pre-construction, searching for your next home,
            or right-sizing your life — we&apos;re here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/pre-construction"
              className="bg-white text-primary px-8 py-3.5 text-nav uppercase hover:bg-white/90 transition-colors duration-300"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 text-white px-8 py-3.5 text-nav uppercase hover:bg-white/10 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
