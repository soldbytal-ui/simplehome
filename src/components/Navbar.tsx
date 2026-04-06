'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Pre-Construction', href: '/pre-construction' },
  { name: 'Resale', href: '/resale' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Downsize', href: '/downsize' },
  { name: 'Developers', href: '/developers' },
  { name: 'Insights', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-luxury ${
        scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'
      } border-b border-black/[0.06]`}
    >
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 tracking-tight">
            <span className="text-primary font-semibold text-lg">SIMPLE</span>
            <span className="text-primary font-light text-lg">HOME</span>
            <span className="text-muted font-light text-lg">.CA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-nav uppercase text-muted hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contact"
              className="text-nav uppercase text-muted hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-2.5 text-nav uppercase hover:bg-primary/80 transition-colors duration-300"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-primary"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white animate-slide-down">
          <div className="px-6 py-8 space-y-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-nav uppercase text-muted hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-5 border-t border-black/[0.06]">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block bg-primary text-white px-6 py-3 text-nav uppercase text-center"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
