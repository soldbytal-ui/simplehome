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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <div className="mb-6">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted mb-8">
            <span>SimpleHome.ca Editorial</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
          </div>

          <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-muted prose-a:text-accent prose-strong:text-primary">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Author */}
          <div className="mt-10 pt-8 border-t border-black/[0.08]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-lg">S</span>
              </div>
              <div>
                <div className="font-semibold text-primary">SimpleHome.ca Editorial</div>
                <div className="text-sm text-muted">
                  Expert insights on Toronto&apos;s pre-construction and real estate market.
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <InquiryForm source="blog" />

            {/* Quick links */}
            <div className="bg-surface rounded-xl p-5">
              <h3 className="font-semibold text-primary text-sm mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/pre-construction" className="block text-sm text-accent hover:underline">
                  Browse Pre-Construction
                </Link>
                <Link href="/developers" className="block text-sm text-accent hover:underline">
                  View Developers
                </Link>
                <Link href="/blog" className="block text-sm text-accent hover:underline">
                  All Articles
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors text-sm line-clamp-2">{p.title}</h3>
                    <div className="text-xs text-muted mt-2">{p.readingTime} min read</div>
                  </div>
                </div>
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
