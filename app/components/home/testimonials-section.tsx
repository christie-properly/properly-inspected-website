import { prisma } from '@/lib/prisma';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export default async function TestimonialsSection() {
  const testimonials = await prisma?.testimonial?.findMany?.({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-800 mb-6">
            What Our{' '}
            <span className="text-accent-600">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-accent-600 text-accent-600" />
            ))}
          </div>
          <p className="text-2xl font-bold text-primary-800 mb-2">4.8 Stars on Google</p>
          <p className="text-xl text-gray-600 mb-6">Based on 91 Reviews</p>
          <a
            href="https://www.google.com/search?q=properly+inspected+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent-600 hover:text-accent-700 font-bold text-lg transition-colors"
          >
            Read All Reviews on Google →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map?.((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <Quote className="w-12 h-12 text-accent-600 mb-4" />
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(Math.floor(testimonial?.rating ?? 5))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-600 text-accent-600" />
                ))}
              </div>

              <p className="text-gray-700 text-base mb-6 leading-relaxed italic">
                "{testimonial?.reviewText}"
              </p>

              <div>
                <p className="font-bold text-primary-800 text-lg">
                  {testimonial?.reviewerName}
                </p>
                {testimonial?.badge && (
                  <p className="text-accent-600 text-sm font-semibold">
                    {testimonial.badge}
                  </p>
                )}
                {testimonial?.service && (
                  <p className="text-gray-500 text-sm mt-1">
                    {testimonial.service}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
