'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import FAQ from '@/components/FAQ';
import { projects } from '@/data/projects';
import { neighborhoods } from '@/data/neighborhoods';
const statusOptions = ['All', 'pre-construction', 'under-construction', 'completed', 'selling'];
const typeOptions = ['All', 'condo', 'townhome', 'detached', 'mixed'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Completion Date', value: 'completion' },
];

const faqItems = [
  { question: 'How do I buy a pre-construction condo in Toronto?', answer: 'Start by researching projects and neighborhoods that match your budget and preferences. Work with a licensed real estate agent who specializes in pre-construction. They can get you VIP access to launches, review contracts, and negotiate terms. You\'ll typically need a 15-20% deposit spread over 12-24 months.' },
  { question: 'What are the 4 phases of pre-construction?', answer: 'The four phases are: 1) Planning & Approvals (zoning, site plan approval), 2) Marketing & Sales (VIP launches, public sales), 3) Construction (breaking ground through completion), and 4) Occupancy & Registration (interim occupancy then final closing). The entire process typically takes 3-5 years.' },
  { question: 'What deposit structure should I expect?', answer: 'A typical Toronto deposit structure is: 5% on signing, 5% in 30 days, 5% in 90-180 days, and 5% on occupancy, totaling 20%. Some developers offer extended structures. Your deposit is held in trust by the developer\'s lawyer and protected under Ontario\'s Tarion warranty program.' },
  { question: 'What should I look for in a pre-construction project?', answer: 'Key factors include: developer reputation and track record, location and transit access, unit layout efficiency, price per square foot relative to the area, completion timeline, deposit structure, assignment policy, and capping of development charges. Always review the Agreement of Purchase and Sale with a real estate lawyer.' },
];

export default function PreConstructionPage() {
  const [search, setSearch] = useState('');
  const [neighborhood, setNeighborhood] = useState('All');
  const [status, setStatus] = useState('All');
  const [buildingType, setBuildingType] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...projects];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q)
      );
    }
    if (neighborhood !== 'All') {
      result = result.filter((p) => p.neighborhoodSlug === neighborhood);
    }
    if (status !== 'All') {
      result = result.filter((p) => p.status === status);
    }
    if (buildingType !== 'All') {
      result = result.filter((p) => p.buildingType === buildingType);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.priceMax || 0) - (a.priceMax || 0));
        break;
      case 'completion':
        result.sort((a, b) => (a.completionYear || 9999) - (b.completionYear || 9999));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, neighborhood, status, buildingType, sort]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Pre-Construction Condos & New Developments in Toronto (2026-2032)
        </h1>
        <p className="text-muted mt-4 max-w-3xl leading-relaxed">
          Toronto&apos;s pre-construction market offers buyers a unique opportunity to secure new homes at
          today&apos;s prices with flexible deposit structures. From luxury Yorkville penthouses to
          transit-oriented North York condos, explore {projects.length}+ developments across the Greater
          Toronto Area.
        </p>

        {/* Filter bar */}
        <div className="mt-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search by name, neighborhood, or developer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-black/[0.08] text-sm font-medium text-muted hover:text-primary hover:border-black/20 transition-colors md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${showFilters ? '' : 'hidden md:grid'}`}>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="All">All Neighborhoods</option>
              {neighborhoods.map((n) => (
                <option key={n.slug} value={n.slug}>{n.name}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mt-6 mb-4">
          Showing {filtered.length} of {projects.length} projects
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted">No projects match your filters. Try adjusting your criteria.</p>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-20 max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Toronto Pre-Construction Buying Guide</h2>
          <div className="text-muted leading-relaxed space-y-4">
            <p>
              Buying pre-construction in Toronto follows a structured process that differs significantly from
              purchasing resale property. Understanding the four phases of development — planning, sales,
              construction, and occupancy — is essential for making informed decisions.
            </p>
            <p>
              During the planning phase, developers secure zoning approvals and site plan agreements from the
              City of Toronto. This process can take 1-3 years and determines the building&apos;s height, density,
              and design. Savvy buyers monitor applications through the city&apos;s development tracker to
              identify opportunities early.
            </p>
            <p>
              The sales phase typically begins with VIP events for registered agents and their clients, followed
              by public launches. Prices are lowest during VIP access and increase in subsequent phases. Working
              with an experienced pre-construction agent is the best way to access VIP pricing and incentives.
            </p>
            <p>
              During construction, your deposit is held in trust and protected by Ontario&apos;s Tarion warranty
              program. This period is when assignment sales occur — selling your purchase agreement to another
              buyer before the building completes. Assignment sales have become increasingly common in Toronto&apos;s
              market.
            </p>
            <p>
              Finally, interim occupancy occurs when the building is substantially complete but not yet registered
              as a condominium corporation. During this period (typically 3-12 months), you pay occupancy fees
              instead of a mortgage. Once the building is registered, you complete the final closing and begin
              regular mortgage payments.
            </p>
          </div>
        </div>

        {/* Price Guide */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Price Guide by Neighborhood</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.08]">
                  <th className="text-left py-3 font-semibold text-primary">Neighborhood</th>
                  <th className="text-left py-3 font-semibold text-primary">Avg. Price/sqft</th>
                  <th className="text-left py-3 font-semibold text-primary">1-Bed From</th>
                  <th className="text-left py-3 font-semibold text-primary">2-Bed From</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Yorkville', psf: '$1,800+', one: '$850K', two: '$1.4M' },
                  { name: 'Downtown Core', psf: '$1,400', one: '$650K', two: '$950K' },
                  { name: 'King West', psf: '$1,350', one: '$600K', two: '$900K' },
                  { name: 'Midtown', psf: '$1,200', one: '$550K', two: '$850K' },
                  { name: 'Liberty Village', psf: '$1,100', one: '$500K', two: '$750K' },
                  { name: 'North York', psf: '$950', one: '$450K', two: '$680K' },
                  { name: 'Scarborough', psf: '$800', one: '$400K', two: '$580K' },
                  { name: 'Mississauga', psf: '$900', one: '$420K', two: '$620K' },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-black/[0.04]">
                    <td className="py-3 text-primary font-medium">{row.name}</td>
                    <td className="py-3 text-muted">{row.psf}</td>
                    <td className="py-3 text-muted">{row.one}</td>
                    <td className="py-3 text-muted">{row.two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-3">* Prices are approximate and subject to change. Based on available listings as of 2026.</p>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FAQ items={faqItems} title="Pre-Construction FAQ" />
        </div>
      </div>
    </>
  );
}
