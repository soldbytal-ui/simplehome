import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, MapPin, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import MapHero from '@/components/MapHero';
import ProjectCard from '@/components/ProjectCard';
import FAQ from '@/components/FAQ';
import { projects } from '@/data/projects';
import { neighborhoods } from '@/data/neighborhoods';
import { blogPosts } from '@/data/blog-posts';

const featuredProjects = projects.filter((_, i) => i < 6);
const featuredNeighborhoods = neighborhoods.slice(0, 8);
const latestPosts = blogPosts.slice(0, 3);

const topDevelopers = [
  { name: 'Menkes', slug: 'menkes' },
  { name: 'Tridel', slug: 'tridel' },
  { name: 'Daniels', slug: 'daniels' },
  { name: 'CentreCourt', slug: 'centrecourt' },
  { name: 'Concord Adex', slug: 'concord-adex' },
  { name: 'Great Gulf', slug: 'great-gulf' },
];

const homeFAQ = [
  {
    question: 'What is a pre-construction condo?',
    answer: 'A pre-construction condo is a residential unit purchased before it is built. Buyers purchase based on floor plans, renderings, and the developer\'s reputation. This allows buyers to lock in today\'s prices for a unit that will be completed in 3-5 years, often with a structured deposit schedule.',
  },
  {
    question: 'How much deposit do I need in Toronto?',
    answer: 'Typically, pre-construction condos in Toronto require a 15-20% deposit spread over 12-24 months. A common structure is 5% on signing, 5% in 30 days, 5% in 90-180 days, and the final 5% on occupancy. Some developers offer extended deposit structures of up to 36 months.',
  },
  {
    question: 'Can foreigners buy pre-construction in Ontario?',
    answer: 'As of January 2023, the federal Prohibition on the Purchase of Residential Property by Non-Canadians Act restricts foreign buyers. However, there are exemptions for permanent residents, certain work permit holders, and refugee claimants. Consult a licensed real estate professional for current rules.',
  },
  {
    question: 'What are occupancy fees?',
    answer: 'Occupancy fees are monthly payments made between when you move into your unit and when the condo is officially registered. These fees typically include estimated property taxes, maintenance fees, and interest on the unpaid balance. They usually last 3-12 months.',
  },
  {
    question: 'How long does pre-construction take?',
    answer: 'From purchase to move-in, pre-construction typically takes 3-5 years in Toronto. This includes approvals, construction, and occupancy. High-rise condos generally take longer than low-rise developments. Timeline can vary based on project complexity and market conditions.',
  },
  {
    question: 'Can I sell my assignment before closing?',
    answer: 'Yes, assignment sales are common in Toronto\'s pre-construction market. You can sell your purchase agreement to another buyer before the building is complete. However, you\'ll need to check your purchase agreement for any restrictions and typically pay an assignment fee to the developer.',
  },
  {
    question: 'Do I need a realtor to buy pre-construction?',
    answer: 'While not legally required, working with a licensed realtor experienced in pre-construction is highly recommended. They can negotiate on your behalf, review contracts, and often have access to priority or VIP pricing before projects launch to the general public.',
  },
  {
    question: 'What is the HST rebate on new condos?',
    answer: 'In Ontario, buyers of new condos may qualify for an HST new housing rebate of up to $24,000. The rebate applies to homes priced under $450,000 (partial rebate up to $450,000). If you plan to rent the unit, you may qualify for the full rental rebate regardless of price.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* 3D Map Hero */}
      <MapHero projects={projects} />

      {/* Featured Developments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary">Featured Developments</h2>
            <p className="text-muted mt-2">Handpicked pre-construction projects across Toronto</p>
          </div>
          <Link
            href="/pre-construction"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/pre-construction"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-3">Explore Toronto&apos;s Neighborhoods</h2>
          <p className="text-muted mb-10">Find your perfect neighborhood across the Greater Toronto Area</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredNeighborhoods.map((hood) => (
              <Link
                key={hood.id}
                href={`/areas/${hood.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={hood.imageUrl}
                  alt={`${hood.name} neighborhood`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-sm">{hood.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{hood.projectCount} projects</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-primary mb-6">Toronto Pre-Construction Market Overview</h2>
        <div className="max-w-4xl text-muted leading-relaxed space-y-4">
          <p>
            Toronto&apos;s pre-construction market continues to be one of the most dynamic real estate sectors
            in North America. With a metropolitan population exceeding 6.2 million and growing by over 100,000
            residents annually, the demand for new housing in the Greater Toronto Area shows no signs of slowing.
            The city&apos;s diversified economy, world-class universities, and status as Canada&apos;s financial
            capital make it a magnet for domestic and international buyers alike.
          </p>
          <p>
            Major transit expansions are reshaping the development landscape. The Eglinton Crosstown LRT,
            Ontario Line, and Scarborough Subway Extension are creating new corridors of growth, with developers
            launching projects near future transit stations. Neighborhoods like Leslieville, the Junction, and
            Midtown are seeing a surge in pre-construction activity as transit accessibility improves.
          </p>
          <p>
            For investors, Toronto pre-construction offers a compelling proposition: structured deposit schedules
            that allow leverage, appreciation during the construction period, and strong rental demand upon
            completion. The average condo price in Toronto has appreciated significantly over the past decade,
            and population growth forecasts suggest continued demand. Whether you&apos;re a first-time buyer
            looking to get into the market or a seasoned investor expanding your portfolio, pre-construction
            provides a pathway to ownership in one of the world&apos;s most resilient real estate markets.
          </p>
        </div>
      </section>

      {/* Top Neighborhoods */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8">Top Pre-Construction Neighborhoods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Downtown Core', slug: 'downtown-core', desc: 'The epicenter of Toronto\'s condo boom, with unparalleled transit access and walkability. Home to the Financial District, Entertainment District, and some of the tallest residential towers in Canada.' },
              { name: 'King West', slug: 'king-west', desc: 'Toronto\'s trendiest neighborhood blends Victorian architecture with modern glass towers. Known for its restaurant scene, nightlife, and proximity to the financial core.' },
              { name: 'Yorkville', slug: 'yorkville', desc: 'Toronto\'s luxury enclave featuring high-end boutiques, galleries, and the city\'s most prestigious addresses. Pre-construction here commands premium prices but offers unmatched prestige.' },
              { name: 'Mississauga', slug: 'mississauga', desc: 'The GTA\'s second-largest city is rapidly urbanizing around its downtown core. With the Hurontario LRT under construction and prices significantly below Toronto proper, it\'s a top pick for value.' },
            ].map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="group block bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">{area.name}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{area.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-accent font-medium mt-3">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Pre-Construction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-primary mb-8">Why Buy Pre-Construction in Toronto</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: TrendingUp, title: 'Price Appreciation', desc: 'Lock in today\'s prices for delivery 3-5 years out. Historically, Toronto pre-construction buyers have seen significant equity gains by completion.' },
            { icon: Shield, title: 'Tarion Warranty', desc: 'All new homes in Ontario are protected by Tarion warranty, covering defects in materials and workmanship for up to 7 years.' },
            { icon: Clock, title: 'Flexible Deposits', desc: 'Spread your deposit over 12-24 months instead of a large lump sum. Typical structures start at just 5% on signing.' },
            { icon: Building2, title: 'Brand New Everything', desc: 'Move into a home with brand new appliances, finishes, and building amenities. No renovation headaches or surprise repairs.' },
            { icon: Users, title: 'Choice of Units', desc: 'Early buyers get first pick of floor plans, views, and finishes. Higher floors and corner units go first.' },
            { icon: MapPin, title: 'Transit-Oriented', desc: 'New developments are strategically located near subway stations, LRT lines, and GO Transit for maximum connectivity.' },
          ].map((item) => (
            <div key={item.title} className="bg-surface rounded-xl p-6">
              <item.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Developers */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary">Featured Developers</h2>
              <p className="text-muted mt-2">Toronto&apos;s most trusted builders</p>
            </div>
            <Link
              href="/developers"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              All Developers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topDevelopers.map((dev) => (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}`}
                className="bg-white rounded-xl p-5 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-surface2 rounded-full mx-auto flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-accent">
                    {dev.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium text-primary text-sm">{dev.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FAQ items={homeFAQ} title="Frequently Asked Questions" />
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary">Latest Market Insights</h2>
              <p className="text-muted mt-2">Expert analysis of the Toronto real estate market</p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent text-white px-2.5 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted">
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-accent rounded-2xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Whether you&apos;re a first-time buyer or seasoned investor, we&apos;ll connect you with the
            right pre-construction project and a licensed Ontario real estate professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pre-construction"
              className="bg-white text-accent px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Browse Projects
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
