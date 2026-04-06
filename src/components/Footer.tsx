import Link from 'next/link';

const neighborhoodLinks = [
  { name: 'Downtown Core', href: '/areas/downtown-core' },
  { name: 'King West', href: '/areas/king-west' },
  { name: 'Yorkville', href: '/areas/yorkville' },
  { name: 'Midtown', href: '/areas/midtown' },
  { name: 'North York', href: '/areas/north-york' },
  { name: 'Mississauga', href: '/areas/mississauga' },
];

const serviceLinks = [
  { name: 'Pre-Construction', href: '/pre-construction' },
  { name: 'Resale Listings', href: '/resale' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Downsize with Steve', href: '/downsize' },
  { name: 'Market Insights', href: '/blog' },
  { name: 'All Developers', href: '/developers' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 tracking-tight mb-6">
              <span className="text-white font-semibold text-lg">SIMPLE</span>
              <span className="text-white font-light text-lg">HOME</span>
              <span className="text-white/40 font-light text-lg">.CA</span>
            </Link>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Toronto&apos;s premier destination for pre-construction developments
              and luxury resale properties.
            </p>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="text-label uppercase text-white/60 mb-5">
              Neighborhoods
            </h3>
            <ul className="space-y-3">
              {neighborhoodLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-light text-white/40 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-label uppercase text-white/60 mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-light text-white/40 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-label uppercase text-white/60 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-light text-white/40 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/25 font-light leading-relaxed max-w-4xl">
            SimpleHome.ca is an informational platform that partners with licensed Ontario real estate professionals.
            We are not a licensed real estate brokerage. All pricing and project details are approximate and subject
            to change. Consult a licensed real estate professional before making any decisions.
          </p>
          <p className="text-[11px] text-white/20 mt-4 font-light">
            &copy; {new Date().getFullYear()} SimpleHome.ca. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
