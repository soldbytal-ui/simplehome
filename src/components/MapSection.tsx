'use client';

import MapHero from './MapHero';
import { Project } from '@/types';

export default function MapSection({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-surface-dark">
      <div className="max-w-container mx-auto px-6 lg:px-10 pt-20 pb-0">
        <span className="text-label uppercase text-white/40 block mb-3">Interactive</span>
        <h2 className="font-serif text-section text-white mb-4">Explore the Market</h2>
        <p className="text-white/50 font-light max-w-xl mb-10">
          Navigate Toronto&apos;s pre-construction landscape. Every column represents
          a development — click to explore.
        </p>
      </div>
      <div style={{ height: '60vh' }}>
        <MapHero projects={projects} embedded />
      </div>
    </section>
  );
}
