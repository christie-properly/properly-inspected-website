import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Home Inspection Services Tampa Bay | Full Service List',
  description:
    'Comprehensive home inspection services including buyer inspections, 4-point, wind mitigation, new construction, and more. Tampa Bay certified inspector.',
};

const SPECTORA_LINK = 'https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c';

export default async function ServicesPage() {
  const services = await prisma?.service?.findMany?.({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Comprehensive <span className="text-accent-600\">Inspection Services</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            From standard buyer's inspections to specialized services, we provide thorough evaluations using advanced technology and certified expertise.
          </p>
          <a
            href={SPECTORA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-accent-600 hover:bg-accent-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl hover:shadow-xl transform hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            <span>Schedule Your Inspection</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="grid md:grid-cols-2 gap-8">
          {services?.map?.((service) => (
            <Link
              key={service?.id}
              href={`/services/${service?.slug}`}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-accent-600"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-800 group-hover:text-accent-600 transition-colors">
                  {service?.name}
                </h3>
                <ChevronRight className="w-7 h-7 text-accent-600 group-hover:translate-x-1 transition-transform\" />
              </div>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">{service?.shortDescription}</p>
              {service?.pricing && (
                <p className="text-xl font-bold text-accent-600 mb-2">{service?.pricing}</p>
              )}
              {service?.duration && (
                <p className="text-sm text-gray-500 font-medium">Duration: {service?.duration}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
