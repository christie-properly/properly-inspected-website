import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Phone } from 'lucide-react';

export const dynamic = 'force-dynamic';

const SPECTORA_LINK = 'https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c';

export default async function LocationDetailPage({ params }: { params: { slug: string } }) {
  const location = await prisma?.location?.findUnique?.({ where: { slug: params?.slug } });
  if (!location) notFound();

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-accent-600 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-sm font-semibold">{location?.county} County</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Home Inspector in {location?.city}, {location?.state}</h1>
          <p className="text-xl mb-6">{location?.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={SPECTORA_LINK} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold">
              <Calendar className="w-6 h-6" />
              <span>Schedule Inspection</span>
            </a>
            <a href="tel:7274256300"
               className="inline-flex items-center justify-center space-x-2 bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20">
              <Phone className="w-6 h-6" />
              <span>(727) 425-6300</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {location?.neighborhoods && location?.neighborhoods?.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Neighborhoods We Serve in {location?.city}</h2>
            <div className="flex flex-wrap gap-3">
              {location?.neighborhoods?.map?.((n) => (
                <span key={n} className="bg-accent-100 text-accent-700 px-4 py-2 rounded-lg">{n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
