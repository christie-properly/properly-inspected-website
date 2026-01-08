import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: ['Lloyd Tillmann'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Fetch related posts from the same category
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      category: post.category,
      id: { not: post.id },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const currentUrl = `https://properlyinspected.com/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 rounded-full text-sm font-medium">
              <Tag className="h-4 w-4" />
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author?.name || 'Lloyd Tillmann'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Draft'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content */}
          <div className="flex-1">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200 italic">
                {post.excerpt}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                  a: ({ node, ...props }) => (
                    <a className="text-accent-600 hover:text-accent-700 underline" {...props} />
                  ),
                  strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Share This Article
              </h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                  Share
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                  Tweet
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  Share
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-8">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-lg p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-3">Ready to Schedule?</h3>
              <p className="mb-6 text-white/90">
                Get your professional home inspection with 360° photos, same-day reports, and our 120-day warranty.
              </p>
              <div className="space-y-3">
                <a
                  href="https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-white text-accent-600 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                >
                  Schedule Online
                </a>
                <a
                  href="tel:7274256300"
                  className="block w-full px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold text-center hover:bg-navy-800 transition-colors"
                >
                  Call (727) 425-6300
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-3">
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Tag className="h-4 w-4" />
                      {relatedPost.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
                    >
                      Read More
                      <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt || '',
            image: post.coverImage || '',
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            author: {
              '@type': 'Person',
              name: post.author?.name || 'Lloyd Tillmann',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Properly Inspected',
              logo: {
                '@type': 'ImageObject',
                url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/HHS_Office_of_Inspector_General_logo_grayscale.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': currentUrl,
            },
          }),
        }}
      />
    </article>
  );
}
