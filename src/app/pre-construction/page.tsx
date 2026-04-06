'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import MapHero from '@/components/MapHero';
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
  { question: 'How do I buy a pre-construction condo in Toronto?', answer: 'Start by researching projects and neighborhoods. Work with a licensed agent who specializes in pre-construction for VIP access, contract review, and negotiation. You\'ll typically need a 15-20% deposit spread over 12-24 months.' },
  { question: 'What are the 4 phases of pre-construction?', answer: 'Planning & Approvals, Marketing & Sales (VIP launches, public sales), Construction, and Occupancy & Registration. The entire process typically takes 3-5 years.' },
  { question: 'What deposit structure should I expect?', answer: 'Typically 5% on signing, 5% in 30 days, 5% in 90-180 days, and 5% on occupancy — totaling 20%. Your deposit is held in trust and protected under Ontario\'s Tarion warranty.' },
];

export default function PreConstructionPage() {
  const [search, setSearch] = useState('');
  const [neighborhood, setNeighborhood] = useState('All');
  const [status, setStatus] = useState('All');
  const [buildingType, setBuildingType] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let result = [...projects];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q) || p.developer.toLowerCase().includes(q));
    }
    if (neighborhood !== 'All') result = result.filter((p) => p.neighborhoodSlug === neighborhood);
    if (status !== 'All') result = result.filter((p) => p.status === status);
    if (buildingType !== 'All') result = result.filter((p) => p.buildingType === buildingType);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0)); break;
      case 'price-desc': result.sort((a, b) => (b.priceMax || 0) - (a.priceMax || 0)); break;
      case 'completion': result.sort((a, b) => (a.completionYear || 9999) - (b.completionYear || 9999)); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [search, neighborhood, status, buildingType, sort]);

  return (
    <>
      {/* 3D Map Hero */}
      <div style={{ height: '65vh' }}>
        <MapHero projects={projects} />
      </div>

      {/* Filters — sticky */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-black/[0.06]">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-6 pr-4 py-2 border-0 border-b border-black/10 text-sm font-light focus:outline-none focus:border-primary bg-transparent"
              />
            </div>
            <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="border-0 border-b border-black/10 py-2 text-sm font-light text-muted focus:outline-none focus:border-primary bg-transparent cursor-pointer">
              <option value="All">All Neighborhoods</option>
              {neighborhoods.map((n) => (<option key={n.slug} value={n.slug}>{n.name}</option>))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border-0 border-b border-black/10 py-2 text-sm font-light text-muted focus:outline-none focus:border-primary bg-transparent cursor-pointer">
              {statusOptions.map((s) => (<option key={s} value={s}>{s === 'All' ? 'All Statuses' : s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>))}
            </select>
            <select value={buildingType} onChange={(e) => setBuildingType(e.target.value)} className="border-0 border-b border-black/10 py-2 text-sm font-light text-muted focus:outline-none focus:border-primary bg-transparent cursor-pointer">
              {typeOptions.map((t) => (<option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 border-b border-black/10 py-2 text-sm font-light text-muted focus:outline-none focus:border-primary bg-transparent cursor-pointer">
              {sortOptions.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-container mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-section-sm text-primary">Pre-Construction</h1>
            <p className="text-sm text-muted font-light mt-2">
              {filtered.length} of {projects.length} developments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted font-light">No projects match your criteria.</p>
          </div>
        )}

        <div className="mt-24 max-w-2xl">
          <FAQ items={faqItems} title="Pre-Construction FAQ" />
        </div>
      </div>
    </>
  );
}
