import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import { blogPosts } from '@/data/blog-posts';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-12">
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        {/* Article */}
        <article className="lg:col-span-2">
          <div className="mb-6">
            <span className="text-label uppercase text-copper">
              {post.category}
            </span>
          </div>

          <h1 className="font-serif text-section-sm md:text-section text-primary leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted font-light mb-10">
            <span>SimpleHome.ca Editorial</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readingTime} min read
            </span>
          </div>

          <div className="relative aspect-[2/1] overflow-hidden mb-10">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted prose-p:font-light prose-a:text-copper prose-strong:text-primary">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Author */}
          <div className="mt-14 pt-10 border-t border-black/[0.06]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-black/[0.06] flex items-center justify-center">
                <span className="text-copper font-serif text-lg">S</span>
              </div>
              <div>
                <div className="font-serif text-primary">SimpleHome.ca Editorial</div>
                <div className="text-sm text-muted font-light">
                  Expert insights on Toronto&apos;s pre-construction and real estate market.
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <InquiryForm source="blog" />

            {/* Quick links */}
            <div className="border border-black/[0.06] p-6">
              <h3 className="font-serif text-primary text-sm mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/pre-construction" className="block text-sm text-copper hover:text-primary transition-colors">
                  Browse Pre-Construction
                </Link>
                <Link href="/developers" className="block text-sm text-copper hover:text-primary transition-colors">
                  View Developers
                </Link>
                <Link href="/blog" className="block text-sm text-copper hover:text-primary transition-colors">
                  All Articles
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 border-t border-black/[0.06] mt-14">
          <p className="text-label uppercase text-copper mb-3">Continue Reading</p>
          <h2 className="font-serif text-section-sm text-primary mb-14">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden mb-4">
                  <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                </div>
                <h3 className="font-serif text-primary group-hover:text-copper transition-colors text-lg line-clamp-2">{p.title}</h3>
                <div className="text-xs text-muted font-light mt-2">{p.readingTime} min read</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.imageUrl,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Organization',
              name: 'SimpleHome.ca',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SimpleHome.ca',
              url: 'https://simplehome.ca',
            },
          }),
        }}
      />
    </div>
  );
}
