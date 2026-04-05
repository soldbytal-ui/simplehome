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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <h1 className="text-3xl font-bold text-primary mb-3">Market Insights & Guides</h1>
      <p className="text-muted mb-10">Expert analysis of the Toronto and GTA real estate market.</p>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-12">
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
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
          <div className="p-6 flex flex-col justify-center">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium w-fit">
              {featured.category}
            </span>
            <h2 className="text-2xl font-bold text-primary mt-3 group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
            <p className="text-muted mt-3 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted">
              <span>{new Date(featured.publishedAt).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>{featured.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent text-white px-2.5 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-muted">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
