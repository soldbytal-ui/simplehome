'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Pre-Construction', href: '/pre-construction' },
  { name: 'Resale', href: '/resale' },
  { name: 'Portfolio', href: '/portfolio' },
  {
    name: 'Explore',
    href: '#',
    children: [
      { name: 'Neighborhoods', href: '/areas/downtown-core' },
      { name: 'Developers', href: '/developers' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 font-bold text-xl tracking-tight">
            <span className="text-accent">SIMPLE</span>
            <span className="text-primary">HOME</span>
            <span className="text-muted">.CA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setExploreOpen(!exploreOpen)}
                    onBlur={() => setTimeout(() => setExploreOpen(false), 200)}
                    className="flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {exploreOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-card-hover border border-black/[0.08] py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted hover:text-primary hover:bg-surface transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-primary"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/[0.08] bg-white">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="space-y-2">
                  <span className="block text-sm font-medium text-primary">{item.name}</span>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block pl-4 text-sm text-muted hover:text-primary"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-muted hover:text-primary"
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
