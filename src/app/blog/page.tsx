import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Toronto Real Estate Blog | Market Insights & Guides',
  description: 'Expert insights on Toronto\'s pre-construction market, buying guides, neighborhood comparisons, and investment strategies.',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="mt-8 mb-14">
        <p className="text-label uppercase text-copper mb-3">Journal</p>
        <h1 className="font-serif text-section-sm md:text-section text-primary mb-4">Market Insights & Guides</h1>
        <p className="text-muted font-light">Expert analysis of the Toronto and GTA real estate market.</p>
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-16">
        <div className="grid md:grid-cols-2 gap-0 border border-black/[0.06] overflow-hidden">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="50vw"
              priority
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-label uppercase text-copper">
              {featured.category}
            </span>
            <h2 className="font-serif text-section-sm text-primary mt-4 group-hover:text-copper transition-colors">
              {featured.title}
            </h2>
            <div className="mt-4 text-sm text-muted font-light">
              <span>{new Date(featured.publishedAt).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <div className="relative aspect-[16/9] overflow-hidden mb-4">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className="text-label uppercase text-copper">
              {post.category}
            </span>
            <h3 className="font-serif text-xl text-primary mt-2 group-hover:text-copper transition-colors line-clamp-2">
              {post.title}
            </h3>
            <div className="mt-3 text-xs text-muted font-light">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
