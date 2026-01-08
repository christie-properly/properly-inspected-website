import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Home,
  ClipboardCheck,
  Wind,
  HardHat,
  Waves,
  Shield,
  Thermometer,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Home,
  ClipboardCheck,
  Wind,
  HardHat,
  Waves,
  Shield,
  Thermometer,
  AlertTriangle,
};

export default async function ServicesOverview() {
  const services = await prisma?.service?.findMany?.({ 
    where: { featured: true, published: true },
    orderBy: { order: 'asc' },
    take: 8,
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-800 mb-6">
            Comprehensive{' '}
            <span className="text-accent-600">Inspection Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From buyer's inspections to specialized services, we provide thorough
            evaluations for every need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services?.map?.((service) => {
            const Icon = iconMap?.[service?.icon ?? ''] ?? Home;
            return (
              <Link
                key={service?.id}
                href={`/services/${service?.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-accent-600 h-full">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary-800 group-hover:to-accent-600 transition-all">
                    <Icon className="w-8 h-8 text-primary-800 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-accent-600 transition-colors">
                    {service?.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {service?.shortDescription}
                  </p>
                  <p className="text-lg font-bold text-accent-600">
                    {service?.pricing}
                  </p>
                  <div className="mt-4 flex items-center text-primary-800 group-hover:text-accent-600 transition-colors">
                    <span className="font-semibold">Learn More</span>
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center space-x-3 bg-accent-600 hover:bg-accent-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span>View All Services</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
