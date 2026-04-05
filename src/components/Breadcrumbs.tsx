import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-6 flex-wrap">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: allItems.map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: item.label,
              item: item.href ? `https://simplehome.ca${item.href}` : undefined,
            })),
          }),
        }}
      />
    </>
  );
}
