import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, Tag, Search, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Home Inspection Blog | Tips & Insights | Properly Inspected',
  description: 'Expert home inspection tips, buyer guides, and Florida-specific advice from Tampa Bay\'s most trusted home inspector. Learn about inspections, maintenance, and more.',
  keywords: 'home inspection blog, Tampa Bay real estate, buyer tips, seller tips, Florida home inspection, home maintenance',
};

interface BlogPageProps {
  searchParams?: { category?: string; search?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const category = searchParams?.category;
  const searchQuery = searchParams?.search;

  // Fetch all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      ...(category && { category }),
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { excerpt: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
        ],
      }),
    },
    orderBy: { publishedAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  // Get all unique categories for filter
  const allPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { category: true },
  });

  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/family_house.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Home Inspection Insights & Tips
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert advice from Lloyd Tillmann and the Properly Inspected team. Learn about home inspections, maintenance, and Tampa Bay real estate.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !category
                    ? 'bg-accent-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                All Posts
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-accent-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Search (for future enhancement) */}
            {/* <form className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search articles..."
                  defaultValue={searchQuery}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </form> */}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No posts found matching your criteria.</p>
              <Link
                href="/blog"
                className="inline-block mt-6 text-accent-600 hover:text-accent-700 font-medium"
              >
                View all posts →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  {/* Category Badge */}
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-3">
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Tag className="h-4 w-4" />
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Draft'}
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
                    >
                      Read Full Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-accent-500 to-accent-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Schedule Your Inspection?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get peace of mind with Tampa Bay's most trusted home inspector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-accent-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Schedule Online
            </a>
            <a
              href="tel:7274256300"
              className="inline-block px-8 py-4 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-lg"
            >
              Call (727) 425-6300
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
