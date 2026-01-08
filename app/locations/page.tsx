import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Service Areas Tampa Bay | Home Inspector Coverage Map',
  description: 'Serving Odessa, Westchase, Palm Harbor, Trinity, Clearwater, Tarpon Springs, St. Petersburg and all of Tampa Bay.',
};

export default async function LocationsPage() {
  const locations = await prisma?.location?.findMany?.({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            We Serve <span className="text-accent-600">All of Tampa Bay</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Professional home inspection services across Pinellas, Hillsborough, Pasco, Hernando, and Manatee Counties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations?.map?.((location) => (
            <Link
              key={location?.id}
              href={`/locations/${location?.slug}`}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <MapPin className="w-8 h-8 text-accent-600" />
                <span className="text-xs font-semibold text-gray-500 uppercase">{location?.county} County</span>
              </div>
              <h2 className="text-2xl font-bold text-primary-800 mb-3 group-hover:text-accent-600 transition-colors">
                {location?.city}, {location?.state}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{location?.description}</p>
              {location?.neighborhoods && location?.neighborhoods?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {location?.neighborhoods?.slice?.(0, 3)?.map?.((n) => (
                    <span key={n} className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-accent-50 border border-accent-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary-800 mb-4">Don't See Your Area?</h3>
          <p className="text-gray-600 mb-6">
            We serve all of Tampa Bay! If your city isn't listed, we likely still cover it.
          </p>
          <a
            href="tel:7274256300"
            className="inline-flex items-center justify-center bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Call (727) 425-6300 to Confirm
          </a>
        </div>
      </div>
    </div>
  );
}
