import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Downsize with Steve | Expert Downsizing Advisory',
  description: 'Steve Wagman brings decades of Toronto real estate expertise to help you transition from your family home to the perfect right-sized residence.',
};

const downsizeFAQ = [
  { question: 'When is the right time to downsize?', answer: 'The right time varies for everyone. Common triggers include children moving out, retirement, lifestyle changes, or simply wanting less maintenance. A consultation with Steve can help you evaluate your timing based on market conditions and personal goals.' },
  { question: 'Should I sell first or buy first?', answer: 'This depends on your financial situation and market conditions. In a seller\'s market, buying first may be wise. Steve typically recommends a bridge strategy — securing your new home with conditions tied to the sale of your current one.' },
  { question: 'What are the tax implications of selling a family home?', answer: 'Your principal residence is generally exempt from capital gains tax in Canada. However, if you\'ve used part of your home for business or rental, partial capital gains may apply. Steve works with tax professionals to ensure you understand the full picture.' },
  { question: 'Can I downsize into a pre-construction condo?', answer: 'Absolutely. Many downsizers purchase pre-construction to lock in pricing and customize finishes. The 3-5 year timeline also gives you time to prepare emotionally and logistically for the move.' },
  { question: 'What neighborhoods are best for downsizers?', answer: 'It depends on your lifestyle priorities. Yorkville and Midtown offer walkability and culture. Waterfront provides resort-style living. North York gives space and transit access. Steve helps match your lifestyle to the right neighborhood.' },
];

export default function DownsizePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=85"
          alt="Luxury living space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 pb-16 w-full">
          <span className="text-label uppercase text-white/40 tracking-[0.2em] block mb-3">Advisory Service</span>
          <h1 className="font-serif text-hero-mobile md:text-hero text-white">
            Downsize<br />with Steve
          </h1>
        </div>
      </section>

      <div className="max-w-container mx-auto px-6 lg:px-10 py-6">
        <Breadcrumbs items={[{ label: 'Downsize with Steve' }]} />
      </div>

      {/* Intro */}
      <section className="max-w-container mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Content — 3 cols */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl">
              <p className="text-lg text-muted font-light leading-relaxed mb-8">
                Transitioning from a family home to a right-sized residence is one of life&apos;s
                most significant decisions. It&apos;s not just about square footage — it&apos;s about
                reimagining your lifestyle, protecting your equity, and finding a home that
                fits who you are today.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://d101qgvxw5fp3p.cloudfront.net/site/99016401/assets/uploads/agentphoto/webphoto_04012024162342.jpg"
                    alt="Steve Wagman"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-serif text-2xl text-primary mb-4">Steve Wagman</h2>
                  <p className="text-sm text-muted font-light leading-relaxed">
                    With decades of experience in Toronto real estate, Steve combines
                    old-fashioned relationship building with modern market intelligence.
                    His approach is consultative, not transactional — he takes the time
                    to understand your life, your goals, and your timeline before making
                    a single recommendation.
                  </p>
                  <p className="text-sm text-muted font-light leading-relaxed mt-4">
                    Steve has helped hundreds of Toronto homeowners navigate the transition
                    from family homes to condos, townhomes, and boutique residences.
                    His philosophy: the best investment in your lifetime deserves the best guidance.
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-section-sm text-primary mb-8">The Downsizing Process</h2>

              <div className="space-y-10">
                {[
                  { num: '01', title: 'Discovery Consultation', desc: 'We begin with a deep conversation about your lifestyle goals, financial picture, and timeline. No pressure, no sales pitch — just honest guidance.' },
                  { num: '02', title: 'Home Valuation & Strategy', desc: 'Steve provides a comprehensive market analysis of your current property, along with a customized selling strategy to maximize your equity.' },
                  { num: '03', title: 'Curated Property Search', desc: 'Based on your preferences, Steve curates a selection of right-sized properties — from pre-construction condos to resale boutique residences.' },
                  { num: '04', title: 'Coordinated Transition', desc: 'Steve manages the entire process: staging and selling your current home, negotiating your purchase, coordinating timelines, and ensuring a smooth move.' },
                  { num: '05', title: 'Settled & Supported', desc: 'Even after closing, Steve remains your real estate advisor. Property management referrals, renovation contacts, or market updates — he\'s always a call away.' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <span className="text-3xl font-serif text-copper/30 flex-shrink-0 w-12">{step.num}</span>
                    <div>
                      <h3 className="font-serif text-lg text-primary mb-2">{step.title}</h3>
                      <p className="text-sm text-muted font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Neighborhoods */}
              <div className="mt-16">
                <h2 className="font-serif text-section-sm text-primary mb-6">
                  Popular Neighborhoods for Downsizers
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'Yorkville', desc: 'Culture, dining, and walkability — Toronto\'s most prestigious address.', href: '/areas/yorkville' },
                    { name: 'Midtown', desc: 'Quiet streets, top schools, and excellent TTC connections.', href: '/areas/midtown' },
                    { name: 'Waterfront', desc: 'Resort-style lakefront living minutes from downtown.', href: '/areas/waterfront' },
                    { name: 'King West', desc: 'Vibrant nightlife and restaurant scene for active retirees.', href: '/areas/king-west' },
                  ].map((area) => (
                    <Link
                      key={area.name}
                      href={area.href}
                      className="group block border border-black/[0.06] p-5 hover:border-copper/30 transition-colors duration-300"
                    >
                      <h3 className="font-serif text-lg text-primary group-hover:text-copper transition-colors duration-300">{area.name}</h3>
                      <p className="text-sm text-muted font-light mt-1">{area.desc}</p>
                      <span className="flex items-center gap-1 text-label uppercase text-copper mt-3">
                        Explore <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQ items={downsizeFAQ} title="Downsizing FAQ" />
              </div>
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <InquiryForm source="downsize" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
