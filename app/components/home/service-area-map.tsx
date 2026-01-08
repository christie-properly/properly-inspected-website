import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';

export default async function ServiceAreaMap() {
  const locations = await prisma?.location?.findMany?.({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-800 mb-6">
            Proudly Serving{' '}
            <span className="text-accent-600">Tampa Bay</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional home inspection services throughout Pinellas, Hillsborough, Pasco, Hernando, and Manatee Counties.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {locations?.map?.((location) => (
            <Link
              key={location?.id}
              href={`/locations/${location?.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-accent-600 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-800 group-hover:to-accent-600 transition-all">
                    <MapPin className="w-6 h-6 text-primary-800 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                    {location?.county} County
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">
                  {location?.city}, {location?.state}
                </h3>
                
                {location?.neighborhoods && location.neighborhoods.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 font-medium mb-2">Neighborhoods:</p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {location.neighborhoods.slice(0, 3).join(', ')}
                      {location.neighborhoods.length > 3 && '...'}
                    </p>
                  </div>
                )}

                <div className="flex items-center text-primary-800 group-hover:text-accent-600 transition-colors mt-4">
                  <span className="font-semibold">View Details</span>
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/locations"
            className="inline-flex items-center space-x-3 bg-accent-600 hover:bg-accent-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span>View All Service Areas</span>
            <span>→</span>
          </Link>
        </div>

        <div className="mt-12 bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center">
          <p className="text-lg text-primary-800 font-medium mb-3">
            Don't see your city listed?
          </p>
          <p className="text-base text-gray-600 mb-6">
            We serve many areas throughout Tampa Bay. Give us a call to see if we cover your location!
          </p>
          <a
            href="tel:7274256300"
            className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
          >
            <span>Call (727) 425-6300</span>
          </a>
        </div>
      </div>
    </section>
  );
}
