import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get counts
    const [blogPosts, services, testimonials, contactSubmissions] = await Promise.all([
      prisma.blogPost.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.contactSubmission.count(),
    ]);

    // Get recent contact submissions
    const recentContacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json({
      blogPosts,
      services,
      testimonials,
      contactSubmissions,
      recentContacts,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
