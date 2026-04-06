import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <nav className="flex items-center gap-2 text-label uppercase text-muted mb-10 flex-wrap">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted/40">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors duration-300">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary">{item.label}</span>
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
