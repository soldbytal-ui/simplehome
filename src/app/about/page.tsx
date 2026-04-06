import { Metadata } from 'next';
import { Building2, Target, Users, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SimpleHome.ca',
  description: 'Learn about SimpleHome.ca — Toronto\'s premier pre-construction and resale real estate platform.',
};

export default function AboutPage() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="max-w-3xl mt-8">
        <p className="text-label uppercase text-copper mb-3">Our Story</p>
        <h1 className="font-serif text-section-sm md:text-section text-primary mb-8">About SimpleHome.ca</h1>

        <div className="text-muted font-light leading-relaxed space-y-6 mb-24">
          <p>
            SimpleHome.ca was built with a simple mission: make Toronto&apos;s pre-construction
            real estate market accessible, transparent, and easy to navigate. Whether you&apos;re a
            first-time buyer, a seasoned investor, or someone exploring the idea of owning a home
            in one of the world&apos;s most vibrant cities, we&apos;re here to help.
          </p>
          <p>
            We aggregate data from across the Greater Toronto Area&apos;s pre-construction landscape,
            bringing together project details, pricing, developer profiles, and neighborhood insights
            in one clean, modern platform. Our goal is to give you the information you need to make
            confident decisions — and connect you with licensed Ontario real estate professionals
            who can guide you through the process.
          </p>
          <p>
            SimpleHome.ca is an informational technology platform. We partner with licensed real
            estate professionals registered with the Real Estate Council of Ontario (RECO) to
            provide buyers with expert guidance and representation.
          </p>
        </div>
      </div>

      {/* Mission/Values */}
      <section className="py-24 border-t border-black/[0.06]">
        <div className="text-center mb-14">
          <p className="text-label uppercase text-copper mb-3">Principles</p>
          <h2 className="font-serif text-section-sm text-primary">Our Values</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 max-w-3xl mx-auto">
          {[
            { icon: Target, title: 'Transparency', desc: 'We present real data with honest context. No inflated claims, no pressure — just the information you need.' },
            { icon: Building2, title: 'Quality', desc: 'We curate the best developments from Toronto\'s most reputable builders. Every project on our platform is vetted.' },
            { icon: Users, title: 'Accessibility', desc: 'Real estate shouldn\'t be confusing. We design our platform and content to be clear, helpful, and jargon-free.' },
            { icon: Heart, title: 'Community', desc: 'Toronto is our home. We\'re invested in the neighborhoods we cover and the people who live in them.' },
          ].map((value) => (
            <div key={value.title} className="text-center">
              <value.icon className="w-7 h-7 text-copper mx-auto mb-4" strokeWidth={1} />
              <h3 className="font-serif text-xl text-primary mb-3">{value.title}</h3>
              <p className="text-sm text-muted font-light leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 border-t border-black/[0.06]">
        <div className="text-center mb-14">
          <p className="text-label uppercase text-copper mb-3">People</p>
          <h2 className="font-serif text-section-sm text-primary">Our Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 max-w-2xl mx-auto">
          {[
            { name: 'Tal', role: 'Founder & CEO' },
            { name: 'Sarah K.', role: 'Head of Operations' },
            { name: 'James L.', role: 'Market Research' },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 border border-black/[0.06] mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl font-serif text-copper">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-serif text-primary">{member.name}</h3>
              <p className="text-sm text-muted font-light mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office */}
      <section className="py-24 border-t border-black/[0.06]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-label uppercase text-copper mb-3">Location</p>
          <h2 className="font-serif text-section-sm text-primary mb-6">Our Office</h2>
          <p className="text-muted font-light">
            SimpleHome.ca<br />
            Toronto, Ontario, Canada<br />
            <a href="mailto:hello@simplehome.ca" className="text-copper hover:text-primary transition-colors">hello@simplehome.ca</a>
          </p>
        </div>
      </section>
    </div>
  );
}
