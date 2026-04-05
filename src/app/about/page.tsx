import { Metadata } from 'next';
import { Building2, Target, Users, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SimpleHome.ca',
  description: 'Learn about SimpleHome.ca — Toronto\'s premier pre-construction and resale real estate platform.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">About SimpleHome.ca</h1>

        <div className="text-muted leading-relaxed space-y-4 mb-12">
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

        {/* Mission/Values */}
        <h2 className="text-2xl font-bold text-primary mb-6">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Target, title: 'Transparency', desc: 'We present real data with honest context. No inflated claims, no pressure — just the information you need.' },
            { icon: Building2, title: 'Quality', desc: 'We curate the best developments from Toronto\'s most reputable builders. Every project on our platform is vetted.' },
            { icon: Users, title: 'Accessibility', desc: 'Real estate shouldn\'t be confusing. We design our platform and content to be clear, helpful, and jargon-free.' },
            { icon: Heart, title: 'Community', desc: 'Toronto is our home. We\'re invested in the neighborhoods we cover and the people who live in them.' },
          ].map((value) => (
            <div key={value.title} className="bg-surface rounded-xl p-6">
              <value.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Team placeholder */}
        <h2 className="text-2xl font-bold text-primary mb-6">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[
            { name: 'Tal', role: 'Founder & CEO' },
            { name: 'Sarah K.', role: 'Head of Operations' },
            { name: 'James L.', role: 'Market Research' },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 bg-surface2 rounded-full mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-accent">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-primary">{member.name}</h3>
              <p className="text-sm text-muted">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Office */}
        <div className="bg-surface rounded-xl p-6">
          <h2 className="text-xl font-bold text-primary mb-3">Our Office</h2>
          <p className="text-muted text-sm">
            SimpleHome.ca<br />
            Toronto, Ontario, Canada<br />
            <a href="mailto:hello@simplehome.ca" className="text-accent hover:underline">hello@simplehome.ca</a>
          </p>
        </div>
      </div>
    </div>
  );
}
