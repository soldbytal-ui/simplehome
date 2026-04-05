import Link from 'next/link';

const neighborhoodLinks = [
  { name: 'Downtown Core', href: '/areas/downtown-core' },
  { name: 'King West', href: '/areas/king-west' },
  { name: 'Liberty Village', href: '/areas/liberty-village' },
  { name: 'Yorkville', href: '/areas/yorkville' },
  { name: 'Midtown', href: '/areas/midtown' },
  { name: 'North York', href: '/areas/north-york' },
  { name: 'Mississauga', href: '/areas/mississauga' },
  { name: 'Vaughan', href: '/areas/vaughan' },
];

const resourceLinks = [
  { name: 'Pre-Construction Guide', href: '/blog/guide-to-buying-pre-construction-in-ontario' },
  { name: 'Market Forecast', href: '/blog/toronto-condo-market-forecast-2026-2030' },
  { name: 'HST Rebate Guide', href: '/blog/hst-rebate-on-pre-construction-condos-explained' },
  { name: 'All Developers', href: '/developers' },
  { name: 'Blog', href: '/blog' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 font-bold text-xl tracking-tight mb-4">
              <span className="text-accent">SIMPLE</span>
              <span className="text-white">HOME</span>
              <span className="text-white/50">.CA</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Toronto&apos;s premier pre-construction and resale real estate platform.
              Connecting buyers with the best new developments across the GTA.
            </p>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Neighborhoods
            </h3>
            <ul className="space-y-2">
              {neighborhoodLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed max-w-4xl">
            SimpleHome.ca is an informational platform that partners with licensed Ontario real estate professionals.
            We are not a licensed real estate brokerage. All pricing and project details are approximate and subject
            to change. Consult a licensed real estate professional before making any decisions.
          </p>
          <p className="text-xs text-white/30 mt-4">
            &copy; {new Date().getFullYear()} SimpleHome.ca. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
